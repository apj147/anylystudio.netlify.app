import { NextRequest, NextResponse } from 'next/server'

// US-only geo restriction. Vercel sets x-vercel-ip-country on every request
// (its proxy overwrites any client-sent value, so it can't be spoofed).
// Disable without a code change by setting GEO_RESTRICT=off in Vercel env.

const EXEMPT_PREFIXES = [
  '/.well-known/',        // Android app verification (assetlinks.json)
  '/api/paypal/webhook',  // PayPal may call this from non-US IPs
  '/manifest.webmanifest', // keep installed apps from breaking on update checks
  '/sw.js',
  '/icons/',
]

const BLOCK_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Anyly Studio</title>
<style>
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
         background: #FAF7F2; color: #2C2C2C; font-family: system-ui, -apple-system, sans-serif; }
  .card { text-align: center; padding: 3rem 1.5rem; max-width: 28rem; }
  h1 { font-family: Georgia, 'Times New Roman', serif; font-weight: 600; font-size: 2rem; margin: 0 0 1rem; }
  h1 span { color: #C9A959; }
  p { line-height: 1.7; color: #555; font-size: .95rem; margin: 0 0 .75rem; }
  a { color: #C9A959; }
</style>
</head>
<body>
  <div class="card">
    <h1>Anyly<span>Studio</span></h1>
    <p>We're sorry — Anyly Studio is currently available to visitors in the United States only.</p>
    <p>For inquiries, reach us at <a href="mailto:contact@anylystudio.com">contact@anylystudio.com</a>.</p>
  </div>
</body>
</html>`

export function middleware(request: NextRequest) {
  if (process.env.GEO_RESTRICT === 'off') return NextResponse.next()

  const { pathname } = request.nextUrl
  if (EXEMPT_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next()
  }

  const country = request.headers.get('x-vercel-ip-country')
  // No header means we're not behind Vercel's proxy (local dev) — allow
  if (!country || country === 'US') return NextResponse.next()

  return new NextResponse(BLOCK_HTML, {
    status: 451,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  })
}

export const config = {
  // Skip Next's static assets entirely; everything else goes through the check
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
