"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function VAMatrix() {
  return (
    <div className="space-y-8 p-6">
      {/* Header with Download Button */}
      <div className="border-b pb-4 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">VA Loan Matrix</h2>
          <p className="text-sm text-gray-600">Veterans Affairs Loans - 2025 Guidelines</p>
        </div>
        <Button
          onClick={() => {
            const link = document.createElement("a")
            link.href = "/pdfs/uff-matrix-va-2025.pdf"
            link.download = "UFF_Matrix_VA_2025.pdf"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
          }}
          className="bg-red-600 hover:bg-red-700 flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {/* VA Standard & IRRRL Matrix */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">VA Standard & IRRRL Matrix</h3>

        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-900 mb-3">Key Information</h4>
          <ul className="space-y-2 text-sm">
            <li>VA has no strict minimum FICO; lender overlays typically apply (620 is common)</li>
            <li>Full entitlement allows 100% LTV financing</li>
            <li>No private mortgage insurance (PMI) required</li>
            <li>VA funding fee applies (can be financed into loan)</li>
            <li>Certificate of Eligibility (COE) required</li>
          </ul>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Occupancy</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Loan Purpose</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Units</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Amortization
                  <br />
                  Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Min FICO
                  <br />
                  (Typical)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max LTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max CLTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Reserves
                  <br />
                  (Months)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max DTI</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">100%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">100%</td>
                <td className="border border-gray-300 px-4 py-2">UW discretion</td>
                <td className="border border-gray-300 px-4 py-2">41%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi (Type I)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">100%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">100%</td>
                <td className="border border-gray-300 px-4 py-2">UW discretion</td>
                <td className="border border-gray-300 px-4 py-2">41%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi (Type II)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">100%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">100%</td>
                <td className="border border-gray-300 px-4 py-2">UW discretion</td>
                <td className="border border-gray-300 px-4 py-2">41%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-green-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold">IRRRL (Streamline)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">No min</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">Unlimited</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">None</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Purchase/Cash-Out</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">UW discretion</td>
                <td className="border border-gray-300 px-4 py-2">41%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Purchase/Cash-Out</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">3-6</td>
                <td className="border border-gray-300 px-4 py-2">41%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-gray-50 p-4 rounded text-sm text-gray-700">
          <p>
            <strong>Notes:</strong> IRRRL (Interest Rate Reduction Refinance Loan) requires net tangible benefit (0.5%
            rate reduction; fee recoup ≤36 months). No appraisal required for IRRRL. Higher DTI acceptable with adequate
            residual income. Occupancy within 60 days required for primary residence.
          </p>
          <p className="mt-2">
            <strong>Source:</strong> VA Pamphlet 26-7 (October 2024 update)
          </p>
        </div>
      </div>

      {/* VA Loan Limits */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">VA Loan Limits & Funding Fees</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">2025 Loan Limits</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Loan Limit:</span>
                <span className="font-semibold">$806,500</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">High-Cost Areas:</span>
                <span className="font-semibold">Up to $1,209,750</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Down Payment:</span>
                <span className="font-semibold text-green-600">0% Required</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">PMI:</span>
                <span className="font-semibold text-green-600">None</span>
              </div>
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">VA Funding Fees</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">First-time Use (0% down):</span>
                <span className="font-semibold">2.15%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">First-time Use (5%+ down):</span>
                <span className="font-semibold">1.25%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subsequent Use:</span>
                <span className="font-semibold">3.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">IRRRL:</span>
                <span className="font-semibold">0.5%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Disabled Veterans:</span>
                <span className="font-semibold text-green-600">Fee Exempt</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Requirements */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Eligibility Requirements</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-300 rounded-lg p-4 bg-blue-50">
            <h4 className="font-semibold text-gray-900 mb-3">Eligible Veterans</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Veterans with qualifying service (90+ days active wartime or 181+ days peacetime)</li>
              <li>• Active duty service members (90+ days of continuous service)</li>
              <li>• National Guard members (6+ years of service)</li>
              <li>• Reserve members (6+ years of service)</li>
              <li>• Surviving spouses of service members who died in service or from service-related disability</li>
            </ul>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-green-50">
            <h4 className="font-semibold text-gray-900 mb-3">Property Requirements</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Must be primary residence</li>
              <li>• Veteran must occupy within 60 days</li>
              <li>• Property must meet VA Minimum Property Requirements (MPRs)</li>
              <li>• VA appraisal required (includes health and safety inspection)</li>
              <li>• 1-4 unit properties eligible</li>
              <li>• Condos must be VA-approved</li>
            </ul>
          </div>
        </div>
      </div>

      {/* IRRRL Details */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">VA IRRRL (Interest Rate Reduction Refinance Loan)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• No appraisal required</li>
              <li>• No income verification required</li>
              <li>• No credit check in most cases</li>
              <li>• Lower funding fee (0.5%)</li>
              <li>• Streamlined process</li>
              <li>• Can refinance up to 100% of home value</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Must currently have a VA loan</li>
              <li>• Must result in lower interest rate (with exceptions)</li>
              <li>• Must show net tangible benefit</li>
              <li>• Cannot receive cash back {">"}$6,000</li>
              <li>• Must be current on existing VA loan</li>
              <li>• Must certify occupancy or prior occupancy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer/Disclaimer */}
      <div className="border-t pt-6 text-xs text-gray-500">
        <p className="mb-2">
          <strong>United Fidelity Funding Corp. NMLS #34381.</strong> Equal Housing Lender.
        </p>
        <p>
          This matrix is provided for informational purposes only and does not constitute a commitment to lend or an
          offer to extend credit. All loan approvals are subject to credit review, underwriting guidelines, program
          eligibility, interest rates, and terms, which are subject to change without notice based on applicant
          qualifications, market conditions, and regulatory requirements. Rates, fees, and programs may vary by state.
          Not all products or options are available in all states. Consult a licensed loan officer for details.
        </p>
        <p className="mt-2">
          Licensed as a residential mortgage lender in almost every state. For state-specific licensing information,
          visit www.nmlsconsumeraccess.org.
        </p>
        <p className="mt-2">© 2025 United Fidelity Funding Corp. All rights reserved.</p>
      </div>
    </div>
  )
}
