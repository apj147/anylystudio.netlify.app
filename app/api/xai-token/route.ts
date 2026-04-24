import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('Origin')
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://anylystudio.com'
  // allow same-origin browser requests and server-side calls (no Origin header)
  return !origin || origin === siteUrl
}

export async function POST(request: NextRequest) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'Voice not configured' }, { status: 503 })
  }

  const resp = await fetch('https://api.x.ai/v1/realtime/client_secrets', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ expires_after: { seconds: 300 } }),
  })

  if (!resp.ok) {
    return NextResponse.json({ error: 'Token mint failed' }, { status: resp.status })
  }

  const { value, expires_at } = await resp.json()
  return NextResponse.json({ token: value, expires_at })
}
