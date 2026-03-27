import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const type = formData.get('type') as string
    const message = formData.get('message') as string

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Send via Resend if API key is set
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const TO_EMAIL = process.env.CONTACT_EMAIL || 'hello@anylystudio.com'

    if (RESEND_API_KEY) {
      const { Resend } = await import('resend')
      const resend = new Resend(RESEND_API_KEY)

      await resend.emails.send({
        from: 'Anyly Studio Contact <onboarding@resend.dev>',
        to: TO_EMAIL,
        replyTo: email,
        subject: `New Commission Request — ${type || 'General'} from ${name}`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C2C2C;">
            <div style="background: #1A1A1A; padding: 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: #C9A959; margin: 0; font-size: 28px; font-weight: 400;">
                Anyly<span style="color: #FAF7F2;">Studio</span>
              </h1>
              <p style="color: #888; margin: 8px 0 0; font-family: sans-serif; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase;">
                New Commission Request
              </p>
            </div>
            <div style="background: #FAF7F2; padding: 32px; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; font-family: sans-serif; font-size: 14px;">
                <tr>
                  <td style="color: #999; padding: 6px 0; width: 120px;">Name</td>
                  <td style="color: #2C2C2C; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="color: #999; padding: 6px 0;">Email</td>
                  <td style="color: #C9A959;"><a href="mailto:${email}" style="color: #C9A959;">${email}</a></td>
                </tr>
                <tr>
                  <td style="color: #999; padding: 6px 0;">Commission Type</td>
                  <td style="color: #2C2C2C;">${type || 'Not specified'}</td>
                </tr>
              </table>
              <hr style="border: none; border-top: 1px solid #E8D5A3; margin: 20px 0;" />
              <p style="color: #999; font-family: sans-serif; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; margin: 0 0 8px;">Message</p>
              <p style="color: #2C2C2C; line-height: 1.7; white-space: pre-wrap;">${message}</p>
              <div style="margin-top: 24px; background: white; border: 1px solid #E8D5A3; border-radius: 8px; padding: 16px;">
                <p style="margin: 0; font-family: sans-serif; font-size: 12px; color: #999;">
                  Reply directly to this email to respond to ${name} at ${email}
                </p>
              </div>
            </div>
          </div>
        `,
      })
    }

    // Redirect back to homepage with success param
    return NextResponse.redirect(new URL('/?sent=1#contact', request.url))
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}
