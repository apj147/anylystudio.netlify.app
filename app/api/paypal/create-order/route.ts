import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/paypal'
import { CATALOG } from '@/lib/catalog'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { sku } = await request.json()
    if (!sku || !CATALOG[sku]) {
      return NextResponse.json({ error: 'Unknown item' }, { status: 400 })
    }
    const order = await createOrder(sku)
    return NextResponse.json({ id: order.id })
  } catch (err: unknown) {
    console.error('PayPal create-order error:', err)
    const message = err instanceof Error ? err.message : 'Could not create order'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
