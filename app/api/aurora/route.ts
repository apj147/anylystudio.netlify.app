import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

function isAuthorized(request: NextRequest): boolean {
  const secret = process.env.INTERNAL_API_SECRET
  if (!secret) return false
  return request.headers.get('Authorization') === `Bearer ${secret}`
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { prompt } = await request.json()

    if (!prompt?.trim()) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
    }

    const apiKey = process.env.XAI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Image generation not configured' }, { status: 503 })
    }

    const resp = await fetch('https://api.x.ai/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-imagine-image',
        prompt: prompt.trim(),
        n: 1,
        response_format: 'url',
      }),
    })

    if (!resp.ok) {
      const err = await resp.text()
      console.error('Aurora API error:', err)
      return NextResponse.json({ error: 'Image generation failed' }, { status: resp.status })
    }

    const data = await resp.json()
    return NextResponse.json({ url: data.data[0].url })
  } catch (error) {
    console.error('Aurora route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
