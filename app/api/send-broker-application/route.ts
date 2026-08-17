import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { detailRows, wrapUffBrokerEmail } from '@/lib/uffEmailLayout'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    const html = wrapUffBrokerEmail({
      heading: "New broker partnership application",
      preheader: `${formData.companyName || "A company"} submitted a broker application.`,
      kicker: "INTERNAL NOTICE",
      bodyHtml: `
        <p style="font-family:Arial,Helvetica,sans-serif;font-size:16px;color:#37474f;margin:0 0 16px;line-height:1.65;">A new broker partnership application was submitted from uff.pro.</p>
        <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#1f292e;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.08em;">Company</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
          ${detailRows([
            ["Company name", formData.companyName || ""],
            ["DBA", formData.dba || ""],
            ["NMLS license", formData.licenseNumber || ""],
            ["Years in business", String(formData.yearsInBusiness || "")],
            ["Address", formData.businessAddress || ""],
            ["City", formData.city || ""],
            ["State", formData.state || ""],
            ["ZIP", formData.zip || ""],
          ])}
        </table>
        <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#1f292e;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.08em;">Primary contact</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
          ${detailRows([
            ["Name", `${formData.firstName || ""} ${formData.lastName || ""}`.trim()],
            ["Title", formData.title || ""],
            ["Individual NMLS", formData.nmlsIndividual || ""],
            ["Phone", formData.phone || ""],
            ["Email", formData.email || ""],
          ])}
        </table>
        <p style="font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;color:#1f292e;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.08em;">Business details</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
          ${detailRows([
            ["Monthly volume", formData.monthlyVolume || ""],
            ["Loan officers", String(formData.loanOfficers || "")],
            ["Loan types", formData.loanTypes?.join(", ") || ""],
            ["Current lenders", formData.currentLenders || ""],
            ["Marketing consent", formData.marketingConsent ? "Yes" : "No"],
            ["Submitted", new Date().toLocaleString()],
          ])}
        </table>
        <p style="font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#37474f;line-height:1.65;">${formData.additionalInfo || "No additional information provided."}</p>
      `,
    })

    const { data, error } = await resend.emails.send({
      from: 'UFF Broker Applications <applications@uff.loans>',
      to: ['mark.ramirez@uff.loans'],
      replyTo: formData.email,
      subject: `New Broker Application: ${formData.companyName}`,
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
