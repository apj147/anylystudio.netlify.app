import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(RESEND_API_KEY)

      await Promise.all([
        // Notify April
        resend.emails.send({
          from: 'Anyly Studio <onboarding@resend.dev>',
          to: 'contact@anylystudio.com',
          subject: `New collector list signup: ${email}`,
          html: `
            <div style="font-family:Georgia,serif;max-width:480px;margin:0 auto;color:#2C2C2C;">
              <div style="background:#1A1A1A;padding:24px 32px;border-radius:12px 12px 0 0;">
                <h2 style="color:#C9A959;margin:0;font-size:20px;font-weight:400;">New Subscriber</h2>
              </div>
              <div style="background:#FAF7F2;padding:24px 32px;border-radius:0 0 12px 12px;">
                <p style="font-family:sans-serif;font-size:14px;color:#555;">Someone joined the collector&apos;s list:</p>
                <p style="font-family:sans-serif;font-size:16px;color:#C9A959;font-weight:500;">${email}</p>
              </div>
            </div>
          `,
        }),

        // Welcome email to subscriber
        resend.emails.send({
          from: 'April Johnson — Anyly Studio <onboarding@resend.dev>',
          to: email,
          replyTo: 'contact@anylystudio.com',
          subject: 'Welcome to the collector\'s list',
          html: `
            <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;color:#2C2C2C;background:#FAF7F2;">
              <div style="background:#0D0D0D;padding:36px 40px;">
                <h1 style="color:#C9A959;margin:0;font-size:28px;font-weight:400;letter-spacing:-0.02em;">
                  Anyly<span style="color:#F5F0E8;">Studio</span>
                </h1>
                <p style="color:#6A6055;margin:8px 0 0;font-family:sans-serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;">
                  Collector&apos;s List
                </p>
              </div>
              <div style="padding:40px;">
                <p style="font-size:22px;color:#1A1A1A;font-weight:400;margin:0 0 20px;font-style:italic;line-height:1.4;">
                  Thank you for joining.
                </p>
                <p style="font-family:sans-serif;font-size:14px;color:#555;line-height:1.8;margin:0 0 16px;">
                  I&apos;m April Johnson — fine artist, 18+ years in practice, based in Glen Flora, Wisconsin.
                  You&apos;ll hear from me when new work is available, commission slots open, or something worth
                  sharing comes out of the studio.
                </p>
                <p style="font-family:sans-serif;font-size:14px;color:#555;line-height:1.8;margin:0 0 32px;">
                  No noise. Just art.
                </p>
                <a
                  href="https://anylystudio.com/portfolio"
                  style="display:inline-block;background:#C9A959;color:#0D0D0D;text-decoration:none;padding:12px 28px;border-radius:4px;font-family:sans-serif;font-size:11px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;"
                >
                  View Portfolio
                </a>
                <hr style="border:none;border-top:1px solid #E8D5A3;margin:40px 0 24px;" />
                <p style="font-family:sans-serif;font-size:12px;color:#aaa;margin:0;">
                  Questions? Reply to this email or reach me at
                  <a href="mailto:contact@anylystudio.com" style="color:#C9A959;">contact@anylystudio.com</a>
                </p>
              </div>
            </div>
          `,
        }),
      ])
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json({ error: 'Failed to process signup' }, { status: 500 })
  }
}
