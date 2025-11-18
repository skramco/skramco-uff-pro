import { NextResponse } from "next/server"
import PDFDocument from "pdfkit"

export async function GET() {
  try {
    const doc = new PDFDocument({
      size: "LETTER",
      margins: { top: 50, bottom: 50, left: 50, right: 50 },
    })

    const chunks: Buffer[] = []

    doc.on("data", (chunk) => chunks.push(chunk))

    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)))
    })

    // Header
    doc.fontSize(10)
    doc.text("1300 NW Briarcliff Pkwy, Suite 275", { align: "left" })
    doc.text("Kansas City, MO 64150")
    doc.text("(816) 457-6300")
    doc.text("www.uff.pro")
    doc.moveDown()
    doc.text("© 2025 United Fidelity Funding Corp.       Broker Compensation", { align: "center" })
    doc.moveDown(2)

    // Title
    doc.fontSize(14).font("Helvetica-Bold")
    doc.text("BROKER COMPENSATION ACKNOWLEDGEMENT & AGREEMENT", { align: "center" })
    doc.moveDown()

    // Body
    doc.fontSize(10).font("Helvetica")
    doc.text(
      'Borrower\'s mortgage loan application will be submitted to United Fidelity Funding, Corp (Lender) by _____________________________ ("Broker").',
    )
    doc.moveDown()
    doc.text(
      'Broker is an independent contractor, and is not an agent of Lender. Borrower may select whether Broker will be paid by either Borrower or the Lender for the Broker\'s services in this transaction ("Broker Compensation").',
    )
    doc.moveDown()

    // Section One
    doc.fontSize(11).font("Helvetica-Bold")
    doc.text("SECTION ONE - Borrower's Compensation Election.")
    doc.fontSize(10).font("Helvetica")
    doc.text("Borrower(s) must select only one of the options below by checking the box for the corresponding option:")
    doc.moveDown(0.5)

    doc.text("☐ Option A - Borrower Paid:")
    doc.fontSize(9)
    doc.text(
      "By selecting Option A, Borrower(s) acknowledge and agree that (i) only Borrower(s) will pay Broker Compensation; (ii) no additional Broker Compensation associated with this loan has been paid or will be paid to Broker by any other party (including Lender); and (iii) Borrower(s) will not pay Broker Compensation with any portion of any Lender credit for the interest rate chosen, if applicable, for this loan.",
      { indent: 20 },
    )
    doc.moveDown()

    doc.fontSize(10)
    doc.text("OR")
    doc.moveDown(0.5)

    doc.text("☐ Option B - Lender Paid:")
    doc.fontSize(9)
    doc.text(
      "By selecting Option B, Borrower(s) acknowledge and agree that (i) only Lender will pay Broker Compensation; (ii) no Broker Compensation associated with this loan has been paid or will be paid by Borrower to Broker; and (iii) subject to Lender's contractual agreement(s) with Broker, Lender-paid Broker Compensation under this option shall be ______% of the loan amount.",
      { indent: 20 },
    )
    doc.moveDown()

    doc.fontSize(10)
    doc.text("All Borrowers must indicate their election by signing this form.")
    doc.moveDown()

    // Section Two
    doc.fontSize(11).font("Helvetica-Bold")
    doc.text("SECTION TWO - Broker's Certification of Broker Compensation.")
    doc.fontSize(10).font("Helvetica")
    doc.text(
      "Broker hereby certifies that (i) Broker has clearly explained to Borrower(s) the services that Broker has and will provide to Borrower(s); (ii) Broker will be compensated for its services exclusively and only according to the Broker Compensation method selected by the Borrower(s) in SECTION ONE of this Agreement; (iii) Broker has not and will not accept any other form or amount of compensation from any party other than Borrower or Lender, as shown above; (iv) Broker will compensate its loan originator in accordance with applicable state and federal law; and (v) the amount of Broker Compensation agreed to, whether paid by Borrower or Lender, will be accurately disclosed on the initial Good Faith Estimate and any subsequent Good Faith Estimate provided to Borrower(s).",
    )
    doc.moveDown()

    // Section Three
    doc.fontSize(11).font("Helvetica-Bold")
    doc.text("SECTION THREE – Borrower's Interest")
    doc.fontSize(10).font("Helvetica")
    doc.text(
      'Borrower(s) and Broker acknowledge and agree (i) that Broker presented Borrower(s) with loan options for each type of transaction in which Borrower(s) expressed an interest (i.e., fixed-rate, adjustable-rate and/or reverse mortgage); (ii) that the loan options included (a) a loan with the lowest interest rate, (b) a loan with the lowest interest rate and which does not contain negative amortization, a prepayment penalty, a "interest only" feature, a balloon payment in the first 7 years, a demand feature, shared equity/appreciation, or, for a reverse mortgage, a loan without a prepayment penalty or shared equity/appreciation, and (c) a loan with the lowest total dollar amount of origination points/fees and discount points; (iii) that Broker explained and discussed each of the loan options with Borrower(s); and (iv) that Borrower(s), after consideration of each of the options presented, selected the loan product that is most in their interest and best meets their needs.',
    )
    doc.moveDown()
    doc.text(
      "Broker further acknowledges and agrees that the loan options presented to the Borrower(s) were obtained from a significant number of lenders with which Broker regularly does business, as defined by Regulation Z and its Official Staff Commentary; and that, for each option presented, Broker had a good faith belief that the borrower(s) would likely qualify for the loan presented.",
    )
    doc.moveDown()

    // New page for Section Four and Signatures
    doc.addPage()

    // Section Four
    doc.fontSize(11).font("Helvetica-Bold")
    doc.text("SECTION FOUR - Other Terms.")
    doc.fontSize(10).font("Helvetica")
    doc.text("• Borrower understands that this Acknowledgement and Agreement is not a commitment to extend credit.")
    doc.text(
      "• Borrower and Broker agree that Borrower, Broker, and Lender will rely on this Acknowledgement and Agreement for the purposes of administering Broker Compensation.",
    )
    doc.text("• Borrower and Broker have each retained a copy of this signed Acknowledgement and Agreement.")
    doc.text(
      "• Broker shall deliver a fully executed copy of this Acknowledgement and Agreement to Lender with Borrower(s) mortgage loan application.",
    )
    doc.moveDown()

    doc.text(
      "Broker and Borrower(s) acknowledge that each has read this Acknowledgement and Agreement and understand its contents, as evidenced by our signatures below:",
    )
    doc.moveDown()

    doc.text("Executed this ______ day of __________, 20__.")
    doc.moveDown(2)

    // Signature section
    doc.fontSize(11).font("Helvetica-Bold")
    doc.text("Borrower(s):")
    doc.moveDown()

    doc.fontSize(10).font("Helvetica")
    const startX = 50
    const midX = 300

    doc.text("_________________________", startX, doc.y)
    doc.text("_________________________", midX, doc.y - 12)
    doc.moveDown(0.5)
    doc.text("Borrower signature", startX, doc.y, { continued: false })
    doc.text("Borrower signature", midX, doc.y - 12)
    doc.moveDown(2)

    doc.text("_________________________", startX, doc.y)
    doc.text("_________________________", midX, doc.y - 12)
    doc.moveDown(0.5)
    doc.text("Name (print)", startX, doc.y)
    doc.text("Name (print)", midX, doc.y - 12)
    doc.moveDown(2)

    doc.text("_________________________", startX, doc.y)
    doc.text("_________________________", midX, doc.y - 12)
    doc.moveDown(0.5)
    doc.text("Borrower signature", startX, doc.y)
    doc.text("Borrower signature", midX, doc.y - 12)
    doc.moveDown(2)

    doc.text("_________________________", startX, doc.y)
    doc.text("_________________________", midX, doc.y - 12)
    doc.moveDown(0.5)
    doc.text("Name (print)", startX, doc.y)
    doc.text("Name (print)", midX, doc.y - 12)
    doc.moveDown(2)

    doc.fontSize(11).font("Helvetica-Bold")
    doc.text("Broker: ________________________")
    doc.moveDown()

    doc.fontSize(10).font("Helvetica")
    doc.text("_________________________")
    doc.text("Mortgage Loan Officer signature")
    doc.moveDown()
    doc.text("_________________________")
    doc.text("Mortgage Loan Officer Name (print)")

    doc.end()

    const pdfBuffer = await pdfPromise

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="Form-Broker-Comp-Agreement.pdf"',
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
