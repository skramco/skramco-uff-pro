import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { detailRows, wrapUffBrokerEmail } from '@/lib/uffEmailLayout'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    const html = wrapUffBrokerEmail({
      heading: "New PRO Portal beta signup",
      preheader: `${formData.firstName || ""} ${formData.lastName || ""} requested beta access.`.trim(),
      kicker: "INTERNAL NOTICE",
      bodyHtml: `
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          ${detailRows([
            ["Name", `${formData.firstName || ""} ${formData.lastName || ""}`.trim()],
            ["Email", formData.email || ""],
            ["Phone", formData.phone || ""],
            ["Company", formData.company || ""],
            ["Title / role", formData.title || ""],
            ["Monthly volume", formData.volume || ""],
            ["Submitted", new Date().toLocaleString()],
          ])}
        </table>
        <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#37474f;margin:16px 0 0;line-height:1.65;">${formData.interest || "No additional comments provided."}</p>
      `,
    })

    const { data, error } = await resend.emails.send({
      from: 'UFF Beta Program <beta@uff.loans>',
      to: ['mark.ramirez@uff.loans'],
      replyTo: formData.email,
      subject: `New PRO Portal Beta Signup: ${formData.firstName} ${formData.lastName}`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ success: true, messageId: data?.id })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
