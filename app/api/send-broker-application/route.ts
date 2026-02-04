import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json()

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'UFF Broker Applications <applications@uff.loans>',
      to: ['mark.ramirez@uff.loans'], // Change this to your actual email
      replyTo: formData.email,
      subject: `New Broker Application: ${formData.companyName}`,
      html: `
        <h2>New Broker Partnership Application</h2>
        
        <h3>Company Information</h3>
        <ul>
          <li><strong>Company Name:</strong> ${formData.companyName}</li>
          <li><strong>DBA:</strong> ${formData.dba || 'N/A'}</li>
          <li><strong>NMLS License:</strong> ${formData.licenseNumber}</li>
          <li><strong>Years in Business:</strong> ${formData.yearsInBusiness}</li>
          <li><strong>Address:</strong> ${formData.businessAddress}</li>
          <li><strong>City:</strong> ${formData.city}</li>
          <li><strong>State:</strong> ${formData.state}</li>
          <li><strong>ZIP:</strong> ${formData.zip}</li>
        </ul>

        <h3>Primary Contact</h3>
        <ul>
          <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName}</li>
          <li><strong>Title:</strong> ${formData.title}</li>
          <li><strong>Individual NMLS:</strong> ${formData.nmlsIndividual}</li>
          <li><strong>Phone:</strong> ${formData.phone}</li>
          <li><strong>Email:</strong> ${formData.email}</li>
        </ul>

        <h3>Business Details</h3>
        <ul>
          <li><strong>Monthly Volume:</strong> ${formData.monthlyVolume}</li>
          <li><strong>Number of Loan Officers:</strong> ${formData.loanOfficers}</li>
          <li><strong>Loan Types:</strong> ${formData.loanTypes?.join(', ') || 'N/A'}</li>
          <li><strong>Current Lenders:</strong> ${formData.currentLenders || 'N/A'}</li>
        </ul>

        <h3>Additional Information</h3>
        <p>${formData.additionalInfo || 'None provided'}</p>

        <h3>Marketing Consent</h3>
        <p>${formData.marketingConsent ? 'Yes' : 'No'}</p>

        <hr>
        <p><small>Submitted: ${new Date().toLocaleString()}</small></p>
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
