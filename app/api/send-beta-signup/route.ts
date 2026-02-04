import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'UFF Beta Program <beta@uff.loans>',
      to: ['mark.ramirez@uff.loans'],
      replyTo: formData.email,
      subject: `New PRO Portal Beta Signup: ${formData.firstName} ${formData.lastName}`,
      html: `
        <h2>New PRO Portal Beta Program Signup</h2>
        
        <h3>Contact Information</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
          <li><strong>Phone:</strong> ${formData.phone || 'Not provided'}</li>
          <li><strong>Company:</strong> ${formData.company}</li>
        </ul>

        <h3>Business Details</h3>
        <ul>
          <li><strong>Title/Role:</strong> ${formData.title}</li>
          <li><strong>Monthly Volume:</strong> ${formData.volume || 'Not provided'}</li>
        </ul>

        <h3>Interest</h3>
        <p>${formData.interest || 'No additional comments provided'}</p>

        <hr>
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
        <p><small>Source: PRO Portal Beta Program</small></p>
      `,
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
