import { NextResponse } from 'next/server'
import { achSale } from '@/lib/braintree'
import { CATALOG } from '@/lib/catalog'
import { notifyTelegram } from '@/lib/paypal'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { nonce, sku, deviceData } = await request.json()
    if (!nonce || !sku || !CATALOG[sku]) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const result = await achSale(sku, nonce, deviceData)

    if (result.success) {
      const t = result.transaction
      // ACH settles asynchronously — status is typically settlement_pending.
      notifyTelegram(
        `🏦 <b>New Sale — Anyly Studio (Bank / ACH)</b>\n\n` +
        `🖼 ${CATALOG[sku].title}\n💰 $${t.amount}\n🔗 ${t.id} (${t.status})`
      )
      return NextResponse.json({ success: true, id: t.id, status: t.status })
    }

    return NextResponse.json(
      { error: result.message || 'Your bank payment was declined.' },
      { status: 402 }
    )
  } catch (err) {
    console.error('Braintree checkout error:', err)
    return NextResponse.json({ error: 'Bank payment could not be processed.' }, { status: 500 })
  }
}
