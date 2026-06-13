import { NextResponse } from 'next/server'
import { generateClientToken } from '@/lib/braintree'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const clientToken = await generateClientToken()
    return NextResponse.json({ clientToken })
  } catch (err) {
    // Not configured / not eligible — the client renders nothing on failure.
    console.error('Braintree client-token error:', err)
    return NextResponse.json({ error: 'unavailable' }, { status: 503 })
  }
}
