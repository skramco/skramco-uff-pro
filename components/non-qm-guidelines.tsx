"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Download, FileText, DollarSign, Home, CreditCard } from "lucide-react"

/**
 * NonQMGuidelines - Comprehensive Non-QM Loan Guidelines
 * Features detailed program information, eligibility requirements, and documentation standards
 */
export default function NonQMGuidelines() {
  /* -------- PDF helper -------- */
  const handleDownload = async () => {
    const { jsPDF } = await import("jspdf")
    const doc = new jsPDF()

    // Add logo to PDF
    try {
      const logoImg = await fetch("/images/uff-logo.png").then((res) => res.blob())
      const imgProps = await doc.getImageProperties(logoImg)
      const scaleFactor = 60 / imgProps.width
      const imgHeight = imgProps.height * scaleFactor

      doc.addImage(logoImg, "PNG", 10, 10, 60, imgHeight) // Maintaining aspect ratio
    } catch (error) {
      console.log("Logo could not be added to PDF")
    }

    // Add comprehensive content to PDF
    doc.setFontSize(16)
    doc.text("Non-QM Loan Guidelines - Complete Guide", 10, 30)

    doc.setFontSize(12)
    doc.text("Program Overview:", 10, 45)

    const content = [
      "• Bank Statement Programs (12 & 24 month)",
      "• Asset Depletion Programs (36 & 84 month)",
      "• DSCR (Debt Service Coverage Ratio)",
      "• Interest-Only Options Available",
      "• Foreign National Programs",
      "• Loan Amounts: $100,000 - $3,000,000+",
      "• Down Payment: 10% - 25% minimum",
      "• Credit Score: 620+ (varies by program)",
      "• Property Types: 1-4 units, condos, SFR, townhomes",
    ]

    doc.setFontSize(10)
    content.forEach((line, i) => {
      if (i > 0 && i % 25 === 0) {
        doc.addPage()
        const logoImg = fetch("/images/uff-logo.png").then((res) => res.blob())
        const imgProps = doc.getImageProperties(logoImg)
        const scaleFactor = 60 / imgProps.width
        const imgHeight = imgProps.height * scaleFactor
        doc.addImage(logoImg, "PNG", 10, 10, 60, imgHeight)
      }
      doc.text(line, 14, 60 + (i % 25) * 7)
    })

    doc.save("UFF-NonQM-Complete-Guidelines.pdf")
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-4 bg-white">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-red-600" />
          <h2 className="text-xl font-semibold">Non-QM Loan Guidelines</h2>
        </div>
        <Button size="sm" onClick={handleDownload} className="bg-red-600 hover:bg-red-700">
          <Download className="mr-2 h-4 w-4" />
          Download Complete PDF
        </Button>
      </div>

      {/* Navigation Tabs - Now below header */}
      <Tabs defaultValue="overview" className="flex flex-col flex-1">
        <div className="border-b bg-gray-50 px-4 py-2">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 gap-1 w-full bg-transparent h-auto">
            {[
              ["overview", "Overview"],
              ["bank-statement", "Bank Statement"],
              ["asset-depletion", "Asset Depletion"],
              ["dscr", "DSCR"],
              ["foreign-national", "Foreign National"],
              ["credit-requirements", "Credit"],
              ["income-calculation", "Income"],
              ["property-guidelines", "Property"],
              ["documentation", "Documentation"],
              ["pricing-adjustments", "Pricing"],
            ].map(([val, label]) => (
              <TabsTrigger
                key={val}
                value={val}
                className="text-xs px-2 py-2 data-[state=active]:bg-red-50 data-[state=active]:text-red-700 whitespace-nowrap"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab panels */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* PROGRAM OVERVIEW */}
          <TabsContent value="overview" className="space-y-6 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <h3 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Loan Amounts
                </h3>
                <ul className="text-sm space-y-1">
                  <li>• Minimum: $100,000</li>
                  <li>• Maximum: $3,000,000</li>
                  <li>• Super Jumbo: Up to $5M (by exception)</li>
                  <li>• No conforming loan limits</li>
                </ul>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Property Types
                </h3>
                <ul className="text-sm space-y-1">
                  <li>• Single Family Residence</li>
                  <li>• 2-4 Unit Properties</li>
                  <li>• Condominiums (warrantable & non-warrantable)</li>
                  <li>• Townhomes & PUDs</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Available Programs</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-red-600 mb-2">Bank Statement</h4>
                  <p className="text-sm text-gray-600">12 or 24 month personal/business bank statements</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-red-600 mb-2">Asset Depletion</h4>
                  <p className="text-sm text-gray-600">36 or 84 month asset-based qualification</p>
                </div>
                <div className="bg-white p-4 rounded border">
                  <h4 className="font-medium text-red-600 mb-2">DSCR</h4>
                  <p className="text-sm text-gray-600">Debt Service Coverage Ratio for investors</p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* BANK STATEMENT PROGRAMS */}
          <TabsContent value="bank-statement" className="space-y-6 mt-0">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="bs-overview">
                <AccordionTrigger className="text-lg font-semibold">Bank Statement Program Overview</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-gray-700">
                    Bank Statement programs are designed for self-employed borrowers who cannot provide traditional tax
                    returns or W-2 documentation. Income is calculated based on bank deposits over 12 or 24 months.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">12-Month Program</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Higher pricing adjustment</li>
                        <li>• Minimum 620 credit score</li>
                        <li>• 20% minimum down payment</li>
                        <li>• 6 months reserves required</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">24-Month Program</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Better pricing than 12-month</li>
                        <li>• Minimum 620 credit score</li>
                        <li>• 15% minimum down payment</li>
                        <li>• 4 months reserves required</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bs-income-calc">
                <AccordionTrigger>Income Calculation Methods</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <h4 className="font-semibold text-yellow-800 mb-2">Personal Bank Statements</h4>
                    <p className="text-sm">
                      Average monthly deposits × 12 months. Business expenses deducted at 50% unless CPA letter
                      provided.
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Business Bank Statements</h4>
                    <p className="text-sm">
                      Average monthly deposits × 12 months. Default 50% expense ratio applied unless CPA provides
                      different percentage.
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">CPA Letter Option</h4>
                    <p className="text-sm">
                      Licensed CPA can provide expense ratio letter to reduce default 50% business expense deduction.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="bs-requirements">
                <AccordionTrigger>Documentation Requirements</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Complete bank statements for required period (12 or 24 months)</li>
                    <li>• All pages must be included (no missing pages)</li>
                    <li>• Statements must be consecutive months</li>
                    <li>• Business license (if using business statements)</li>
                    <li>• CPA letter (optional, for expense ratio adjustment)</li>
                    <li>• Profit & Loss statement (current year)</li>
                    <li>• Business tax returns (most recent year)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* ASSET DEPLETION PROGRAMS */}
          <TabsContent value="asset-depletion" className="space-y-6 mt-0">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="ad-overview">
                <AccordionTrigger className="text-lg font-semibold">Asset Depletion Overview</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-gray-700">
                    Asset Depletion programs qualify borrowers based on their liquid assets rather than income. Assets
                    are divided by the loan term to determine qualifying income.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-2">36-Month Program</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Assets ÷ 36 months = qualifying income</li>
                        <li>• Higher qualifying income calculation</li>
                        <li>• 25% minimum down payment</li>
                        <li>• 12 months reserves required</li>
                      </ul>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                      <h4 className="font-semibold text-indigo-800 mb-2">84-Month Program</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Assets ÷ 84 months = qualifying income</li>
                        <li>• Lower qualifying income calculation</li>
                        <li>• 20% minimum down payment</li>
                        <li>• 6 months reserves required</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="ad-eligible-assets">
                <AccordionTrigger>Eligible Assets</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-green-600 mb-2">100% Eligible Assets</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Checking accounts</li>
                          <li>• Savings accounts</li>
                          <li>• Money market accounts</li>
                          <li>• CDs</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-600 mb-2">70% Eligible Assets</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Stocks and bonds</li>
                          <li>• Mutual funds</li>
                          <li>• 401(k) / IRA (if under 59½)</li>
                          <li>• Investment accounts</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">Ineligible Assets</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Real estate equity</li>
                        <li>• Business assets</li>
                        <li>• Cryptocurrency</li>
                        <li>• Collectibles</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* DSCR PROGRAMS */}
          <TabsContent value="dscr" className="space-y-6 mt-0">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="dscr-overview">
                <AccordionTrigger className="text-lg font-semibold">DSCR Program Overview</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-gray-700">
                    Debt Service Coverage Ratio (DSCR) loans are designed for real estate investors. Qualification is
                    based on the property's rental income rather than the borrower's personal income.
                  </p>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">DSCR Calculation</h4>
                    <p className="text-sm">DSCR = Net Operating Income ÷ Total Debt Service</p>
                    <p className="text-sm mt-2">Minimum DSCR: 1.00 (break-even) | Preferred DSCR: 1.25+</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dscr-requirements">
                <AccordionTrigger>DSCR Requirements</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Minimum Requirements</h4>
                        <ul className="text-sm space-y-1">
                          <li>• 20% minimum down payment</li>
                          <li>• 620 minimum credit score</li>
                          <li>• Investment property only</li>
                          <li>• 6 months PITIA reserves</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Property Requirements</h4>
                        <ul className="text-sm space-y-1">
                          <li>• 1-4 unit investment properties</li>
                          <li>• Current lease agreement required</li>
                          <li>• Market rent analysis</li>
                          <li>• Property management allowed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* FOREIGN NATIONAL */}
          <TabsContent value="foreign-national" className="space-y-6 mt-0">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="fn-overview">
                <AccordionTrigger className="text-lg font-semibold">Foreign National Program</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <p className="text-gray-700">
                    Foreign National loans are available for non-U.S. citizens and non-permanent residents looking to
                    purchase U.S. real estate.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Key Features</h4>
                    <ul className="text-sm space-y-1">
                      <li>• No U.S. credit history required</li>
                      <li>• No Social Security Number needed</li>
                      <li>• Individual Tax ID Number (ITIN) acceptable</li>
                      <li>• Foreign income documentation accepted</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fn-requirements">
                <AccordionTrigger>Foreign National Requirements</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Down Payment & LTV</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Primary residence: 30% down (70% LTV)</li>
                          <li>• Second home: 35% down (65% LTV)</li>
                          <li>• Investment property: 35% down (65% LTV)</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Documentation</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Valid passport</li>
                          <li>• Visa (if applicable)</li>
                          <li>• Foreign credit report</li>
                          <li>• Income documentation (translated)</li>
                          <li>• 12 months reserves required</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* CREDIT REQUIREMENTS */}
          <TabsContent value="credit-requirements" className="space-y-6 mt-0">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="credit-scores">
                <AccordionTrigger className="text-lg font-semibold">Credit Score Requirements</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">740+ Credit</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Best pricing available</li>
                          <li>• All programs available</li>
                          <li>• Minimum reserves</li>
                        </ul>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-2">680-739 Credit</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Standard pricing</li>
                          <li>• Most programs available</li>
                          <li>• Standard reserves</li>
                        </ul>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">620-679 Credit</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Pricing adjustments apply</li>
                          <li>• Limited programs</li>
                          <li>• Higher reserves required</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="credit-events">
                <AccordionTrigger>Major Credit Events</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Waiting Periods (from discharge/completion date)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">24 Months Required</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Chapter 7 Bankruptcy</li>
                            <li>• Chapter 13 Bankruptcy</li>
                            <li>• Foreclosure</li>
                            <li>• Deed in Lieu</li>
                            <li>• Short Sale</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">12 Months Required</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Loan Modification</li>
                            <li>• Forbearance</li>
                            <li>• Payment Plan</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* INCOME CALCULATION */}
          <TabsContent value="income-calculation" className="space-y-6 mt-0">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="income-types">
                <AccordionTrigger className="text-lg font-semibold">Income Types & Calculations</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-3">W-2 Income (Full Doc)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Most recent 30 days pay stubs</li>
                        <li>• Most recent W-2</li>
                        <li>• YTD earnings verification</li>
                        <li>• Overtime/bonus: 2-year average if &gt;25% of income</li>
                      </ul>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3">Self-Employed Income (Full Doc)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 2 years personal tax returns</li>
                        <li>• 2 years business tax returns (if applicable)</li>
                        <li>• YTD Profit & Loss (if &gt;120 days into year)</li>
                        <li>• Business license</li>
                        <li>• CPA prepared returns preferred</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3">Bank Statement Income (Alt Doc)</h4>
                      <ul className="text-sm space-y-1">
                        <li>• 12 or 24 months bank statements</li>
                        <li>• Average monthly deposits calculated</li>
                        <li>• 50% expense ratio applied (unless CPA letter)</li>
                        <li>• Business statements preferred over personal</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="dti-calculations">
                <AccordionTrigger>Debt-to-Income Ratios</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-yellow-800 mb-2">Maximum DTI Ratios</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Full Doc: 50% max DTI</li>
                          <li>• Bank Statement: 45% max DTI</li>
                          <li>• Asset Depletion: 45% max DTI</li>
                          <li>• DSCR: No personal DTI (property based)</li>
                        </ul>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h4 className="font-semibold text-orange-800 mb-2">DTI Calculation</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Include all monthly debt payments</li>
                          <li>• Include proposed mortgage payment</li>
                          <li>• Include property taxes and insurance</li>
                          <li>• Include HOA fees (if applicable)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* PROPERTY GUIDELINES */}
          <TabsContent value="property-guidelines" className="space-y-6 mt-0">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="eligible-properties">
                <AccordionTrigger className="text-lg font-semibold">Eligible Property Types</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">✓ Eligible Properties</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Single Family Residence</li>
                          <li>• 2-4 Unit Properties</li>
                          <li>• Warrantable Condominiums</li>
                          <li>• Non-warrantable Condominiums</li>
                          <li>• Townhomes</li>
                          <li>• Planned Unit Developments (PUD)</li>
                          <li>• Properties up to 10 acres</li>
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">✗ Ineligible Properties</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Cooperative units (Co-ops)</li>
                          <li>• Condotels</li>
                          <li>• Manufactured homes</li>
                          <li>• Mixed-use properties (&gt;49% commercial)</li>
                          <li>• Properties with environmental issues</li>
                          <li>• Properties in flood zones (case-by-case)</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="occupancy-types">
                <AccordionTrigger>Occupancy Types & LTV Limits</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Primary Residence</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Max LTV: 90%</li>
                          <li>• Min Down: 10%</li>
                          <li>• Occupancy within 60 days</li>
                          <li>• Lower reserves required</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Second Home</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Max LTV: 80%</li>
                          <li>• Min Down: 20%</li>
                          <li>• No rental income allowed</li>
                          <li>• Higher reserves required</li>
                        </ul>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-800 mb-2">Investment Property</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Max LTV: 80%</li>
                          <li>• Min Down: 20%</li>
                          <li>• Rental income considered</li>
                          <li>• 6+ months reserves</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* DOCUMENTATION */}
          <TabsContent value="documentation" className="space-y-6 mt-0">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="required-docs">
                <AccordionTrigger className="text-lg font-semibold">Required Documentation Checklist</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Universal Requirements (All Programs)
                      </h4>
                      <ul className="text-sm space-y-1">
                        <li>• Completed loan application (1003)</li>
                        <li>• Credit report (tri-merge)</li>
                        <li>• Photo identification</li>
                        <li>• Social Security card or ITIN letter</li>
                        <li>• Purchase contract (if purchase)</li>
                        <li>• Appraisal</li>
                        <li>• Title report/commitment</li>
                        <li>• Homeowner's insurance</li>
                        <li>• Asset statements (2 months)</li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Bank Statement Programs</h4>
                        <ul className="text-sm space-y-1">
                          <li>• 12 or 24 months bank statements</li>
                          <li>• Business license (if business statements)</li>
                          <li>• CPA letter (optional)</li>
                          <li>• Current P&L statement</li>
                        </ul>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <h4 className="font-semibold text-green-800 mb-2">Asset Depletion Programs</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Complete asset statements</li>
                          <li>• Investment account statements</li>
                          <li>• Retirement account statements</li>
                          <li>• Asset verification letters</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="doc-standards">
                <AccordionTrigger>Documentation Standards</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <h4 className="font-semibold text-yellow-800 mb-2">Document Quality Requirements</h4>
                      <ul className="text-sm space-y-1">
                        <li>• All documents must be legible and complete</li>
                        <li>• No missing pages or statements</li>
                        <li>• Documents must be dated within required timeframes</li>
                        <li>• Foreign documents must be translated by certified translator</li>
                        <li>• Electronic statements acceptable if from official source</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          {/* PRICING & ADJUSTMENTS */}
          <TabsContent value="pricing-adjustments" className="space-y-6 mt-0">
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="base-pricing">
                <AccordionTrigger className="text-lg font-semibold">Base Pricing Structure</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-2">Interest Rate Structure</h4>
                      <p className="text-sm mb-2">Base rates are determined by:</p>
                      <ul className="text-sm space-y-1">
                        <li>• Program type (Bank Statement, Asset Depletion, DSCR)</li>
                        <li>• Loan-to-Value ratio</li>
                        <li>• Credit score</li>
                        <li>• Property type and occupancy</li>
                        <li>• Loan amount</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pricing-adjustments">
                <AccordionTrigger>Pricing Adjustments</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold text-red-800 mb-2">Rate Increases</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Credit score 620-679: +0.25% - 0.75%</li>
                          <li>• Investment property: +0.125% - 0.25%</li>
                          <li>• Non-warrantable condo: +0.25%</li>
                          <li>• Cash-out refinance: +0.25%</li>
                          <li>• 12-month bank statement: +0.50%</li>
                        </ul>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-2">Rate Decreases</h4>
                        <ul className="text-sm space-y-1">
                          <li>• Credit score 740+: -0.125% - 0.25%</li>
                          <li>• Primary residence: Base rate</li>
                          <li>• Lower LTV ratios: Better pricing</li>
                          <li>• 24-month bank statement: Better than 12-month</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="fees">
                <AccordionTrigger>Fees & Costs</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-3">Typical Fees</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Lender Fees</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Origination fee: 1.0% - 2.0%</li>
                            <li>• Processing fee: $500 - $1,000</li>
                            <li>• Underwriting fee: $500 - $800</li>
                            <li>• Document preparation: $200 - $400</li>
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-700 mb-2">Third-Party Fees</h5>
                          <ul className="text-sm space-y-1">
                            <li>• Appraisal: $500 - $800</li>
                            <li>• Credit report: $50 - $100</li>
                            <li>• Title insurance: Varies by state</li>
                            <li>• Attorney fees: $500 - $1,500</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
