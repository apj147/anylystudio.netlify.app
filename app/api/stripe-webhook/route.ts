import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe, STRIPE_WEBHOOK_SECRET } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

async function notifyTelegram(message: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'HTML' }),
  }).catch((err) => console.error('Telegram notify failed:', err))
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const amount = ((session.amount_total ?? 0) / 100).toFixed(2)
    const name = session.customer_details?.name ?? 'Unknown'
    const email = session.customer_details?.email ?? 'Unknown'
    const paymentId = session.payment_intent as string

    await notifyTelegram(
      `🎨 <b>New Sale — Anyly Studio</b>\n\n` +
      `👤 ${name}\n` +
      `📧 ${email}\n` +
      `💰 $${amount}\n` +
      `🔗 <a href="https://dashboard.stripe.com/payments/${paymentId}">View in Stripe</a>`
    )
  }

  if (event.type === 'payment_intent.payment_failed') {
    const pi = event.data.object as Stripe.PaymentIntent
    const email = pi.last_payment_error?.payment_method?.billing_details?.email ?? 'unknown'
    await notifyTelegram(`⚠️ <b>Payment failed</b>\n📧 ${email}\n💬 ${pi.last_payment_error?.message ?? ''}`)
  }

  return NextResponse.json({ received: true })
}
