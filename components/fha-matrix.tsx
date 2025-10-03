"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FHAMatrix() {
  return (
    <div className="space-y-8 p-6">
      {/* Header with Download Button */}
      <div className="border-b pb-4 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">FHA Loan Matrix</h2>
          <p className="text-sm text-gray-600">Government-Backed Loans - 2025 Guidelines</p>
        </div>
        <Button
          onClick={() => {
            const link = document.createElement("a")
            link.href = "/pdfs/uff-matrix-fha-2025.pdf"
            link.download = "UFF_Matrix_FHA_2025.pdf"
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

      {/* FHA 203(b) Standard Matrix */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">FHA 203(b) Standard Matrix</h3>

        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-900 mb-3">Available Terms</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Fixed-Rate Terms:</strong> 15-year, 20-year, 25-year, 30-year
            </li>
            <li>
              <strong>ARM Terms:</strong> 1/1, 3/1, 5/1, 7/1, 10/1 (hybrid ARMs with initial fixed periods, then annual
              adjustments)
            </li>
            <li>
              <strong>IO Terms:</strong> Available on ARMs during the initial fixed period
            </li>
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
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Min FICO</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max LTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max CLTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Reserves
                  <br />
                  (Months)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Max DTI
                  <br />
                  (Manual)
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">96.5%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">96.5%</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">500-579</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Rate/Term Refi</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">97.75%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">97.75%</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2">80%</td>
                <td className="border border-gray-300 px-4 py-2">80%</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Purchase/Refi</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2">96.5%</td>
                <td className="border border-gray-300 px-4 py-2">96.5%</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2 font-semibold">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Purchase/Refi</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-gray-50 p-4 rounded text-sm text-gray-700">
          <p>
            <strong>Notes:</strong> AUS (TOTAL Scorecard) allows higher DTI (up to 56.99%). High-balance follows same
            LTV. County limits vary (2025 floor $524,225, ceiling $1,209,750 for 1-unit).
          </p>
          <p className="mt-2">
            <strong>Source:</strong> HUD FHA Limits (2025)
          </p>
        </div>
      </div>

      {/* FHA Streamline Matrix */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">FHA Streamline Refinance Matrix</h3>

        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-900 mb-3">Available Terms</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Fixed-Rate Terms:</strong> 15-year or 30-year
            </li>
            <li>
              <strong>ARM Terms:</strong> 1/1, 3/1, 5/1, 7/1, 10/1 (must meet net tangible benefit requirements)
            </li>
            <li>
              <strong>IO Terms:</strong> Available if original loan had IO
            </li>
          </ul>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-green-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Occupancy</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Loan Purpose</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Units</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Min FICO
                  <br />
                  (Non-Credit)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                  Min FICO
                  <br />
                  (Credit Qual)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max LTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Reserves</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max DTI</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Streamline (Non-Credit)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">None</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">Unlimited</td>
                <td className="border border-gray-300 px-4 py-2">None</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Streamline (Credit Qual)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2">Unlimited</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43% (AUS 56%)</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Streamline (Non-Credit)</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">None</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">Unlimited</td>
                <td className="border border-gray-300 px-4 py-2">None</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Streamline (Credit Qual)</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2">Unlimited</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43% (AUS 56%)</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Streamline (Non-Credit)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">None</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">Unlimited</td>
                <td className="border border-gray-300 px-4 py-2">None</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Streamline (Credit Qual)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2">Unlimited</td>
                <td className="border border-gray-300 px-4 py-2">3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43% (AUS 56%)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-gray-50 p-4 rounded text-sm text-gray-700">
          <p>
            <strong>Notes:</strong> No appraisal required. Net tangible benefit: 0.5% rate reduction for fixed-to-fixed.
            Credit qualifying required if adding/removing borrowers or cash-out {">"}$500. MIP reduced if original
            endorsement ≤3 years.
          </p>
          <p className="mt-2">
            <strong>Sources:</strong> HUD SFH Policy Handbook 4000.1 (2025), FHA Streamline Guide (July 2025)
          </p>
        </div>
      </div>

      {/* FHA 203k Renovation Matrix */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">FHA 203k Renovation Matrix</h3>

        <div className="bg-purple-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-gray-900 mb-3">Available Terms</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Fixed-Rate Terms:</strong> 15-year or 30-year
            </li>
            <li>
              <strong>ARM Terms:</strong> 1/1, 3/1, 5/1, 7/1, 10/1
            </li>
            <li>
              <strong>IO Terms:</strong> Available on ARMs during initial fixed period
            </li>
            <li className="mt-3">
              <strong>Standard 203k:</strong> Major rehab {">"}$5k, structural OK
            </li>
            <li>
              <strong>Limited 203k:</strong> Non-structural ≤$35k
            </li>
          </ul>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-purple-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Occupancy</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Loan Purpose</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Units</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Type</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Min FICO</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max LTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max CLTV</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Reserves</th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Max DTI</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase (Standard)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">96.5%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">96.5%</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase (Limited)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">96.5%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">96.5%</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Refi (Standard)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">97.75%</td>
                <td className="border border-gray-300 px-4 py-2 font-semibold text-green-600">97.75%</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Primary Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out (Standard)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-yellow-50">
                <td className="border border-gray-300 px-4 py-2">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Purchase/Refi</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2">96.5%</td>
                <td className="border border-gray-300 px-4 py-2">96.5%</td>
                <td className="border border-gray-300 px-4 py-2">1-3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
              <tr className="hover:bg-gray-50 bg-red-50">
                <td className="border border-gray-300 px-4 py-2">Investment Property</td>
                <td className="border border-gray-300 px-4 py-2">Purchase/Refi</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">580</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">85%</td>
                <td className="border border-gray-300 px-4 py-2">3</td>
                <td className="border border-gray-300 px-4 py-2">31%/43%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-gray-50 p-4 rounded text-sm text-gray-700">
          <p>
            <strong>Notes:</strong> For FICO 500-579: 90% LTV purchase. AUS allows higher DTI (up to 56%). Rehab costs:
            Min $5k Standard, max 75% ARV. Completion: 6 months both types. Consultant required for Standard. Condos:
            Interior only.
          </p>
          <p className="mt-2">
            <strong>Source:</strong> HUD SFH Policy Handbook (May 2024 update, effective 2025)
          </p>
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
