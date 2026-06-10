import { NextResponse } from 'next/server'
import { captureOrder, notifyTelegram } from '@/lib/paypal'

export const dynamic = 'force-dynamic'

type Capture = {
  id: string
  status: string
  payer?: { name?: { given_name?: string; surname?: string }; email_address?: string }
  purchase_units?: Array<{
    reference_id?: string
    payments?: { captures?: Array<{ id: string; amount?: { value?: string } }> }
  }>
}

export async function POST(request: Request) {
  try {
    const { orderID } = await request.json()
    if (!orderID || typeof orderID !== 'string') {
      return NextResponse.json({ error: 'Missing orderID' }, { status: 400 })
    }
    const capture = (await captureOrder(orderID)) as Capture

    if (capture.status === 'COMPLETED') {
      const payer = capture.payer
      const name = [payer?.name?.given_name, payer?.name?.surname].filter(Boolean).join(' ') || 'Unknown'
      const email = payer?.email_address ?? 'Unknown'
      const unit = capture.purchase_units?.[0]
      const amount = unit?.payments?.captures?.[0]?.amount?.value ?? '?'
      const item = unit?.reference_id ?? 'item'
      // Fire-and-forget — a notification failure must never fail the sale
      notifyTelegram(
        `🎨 <b>New Sale — Anyly Studio (PayPal)</b>\n\n` +
        `🖼 ${item}\n👤 ${name}\n📧 ${email}\n💰 $${amount}\n` +
        `🔗 Order ${capture.id}`
      )
    }

    return NextResponse.json({ id: capture.id, status: capture.status })
  } catch (err: unknown) {
    console.error('PayPal capture-order error:', err)
    const message = err instanceof Error ? err.message : 'Could not capture order'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
