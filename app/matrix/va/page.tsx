export default function VAMatrixPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">VA Standard & IRRRL Matrix</h1>
          <p className="text-sm text-gray-600">
            United Fidelity Funding Corp. NMLS #34381. Equal Housing Lender.
          </p>
          <p className="text-sm text-gray-700 mt-4">
            VA has no strict Min FICO; lender overlays apply (e.g., 620 typical). Full entitlement allows 100% LTV.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-3 text-left">Occupancy</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Loan Purpose</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Units</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Amortization Type</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Min FICO (Typical)</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Max LTV</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Max CLTV</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Reserves (Months)</th>
                <th className="border border-gray-300 px-4 py-3 text-left">Max DTI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Principal Residence</td>
                <td className="border border-gray-300 px-4 py-2">Purchase</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">620 (overlay)</td>
                <td className="border border-gray-300 px-4 py-2">100%</td>
                <td className="border border-gray-300 px-4 py-2">100%</td>
                <td className="border border-gray-300 px-4 py-2">UW discretion</td>
                <td className="border border-gray-300 px-4 py-2">41%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Principal Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi (Type I)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2">100%</td>
                <td className="border border-gray-300 px-4 py-2">100%</td>
                <td className="border border-gray-300 px-4 py-2">UW discretion</td>
                <td className="border border-gray-300 px-4 py-2">41%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Principal Residence</td>
                <td className="border border-gray-300 px-4 py-2">Cash-Out Refi (Type II)</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2">100%</td>
                <td className="border border-gray-300 px-4 py-2">100%</td>
                <td className="border border-gray-300 px-4 py-2">UW discretion</td>
                <td className="border border-gray-300 px-4 py-2">41%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Principal Residence</td>
                <td className="border border-gray-300 px-4 py-2">IRRRL</td>
                <td className="border border-gray-300 px-4 py-2">1-4</td>
                <td className="border border-gray-300 px-4 py-2">Fixed/ARM</td>
                <td className="border border-gray-300 px-4 py-2">No min (unless qual)</td>
                <td className="border border-gray-300 px-4 py-2">Unlimited (balance + fees)</td>
                <td className="border border-gray-300 px-4 py-2">N/A</td>
                <td className="border border-gray-300 px-4 py-2">None</td>
                <td className="border border-gray-300 px-4 py-2">N/A (if no qual)</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Second Homes</td>
                <td className="border border-gray-300 px-4 py-2">Purchase/Cash-Out</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">Fixed</td>
                <td className="border border-gray-300 px-4 py-2">620</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">90%</td>
                <td className="border border-gray-300 px-4 py-2">UW discretion</td>
                <td className="border border-gray-300 px-4 py-2">41%</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Investment Property</td>
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

        <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">Notes:</h3>
          <p className="text-sm text-gray-700 mb-2">
            IRRRL requires net tangible benefit (0.5% rate reduction; fee recoup ≤36 months). No appraisal for IRRRL. Higher DTI OK with residuals.
          </p>
          <p className="text-sm text-gray-700">
            <strong>Source:</strong> VA Pamphlet 26-7 (October 2024 update)
          </p>
        </div>

        <div className="mt-6 text-xs text-gray-500 border-t pt-6">
          <p>
            This matrix is provided for informational purposes only and does not constitute a commitment to lend or an offer to extend credit. 
            All loan approvals are subject to credit review, underwriting guidelines, program eligibility, interest rates, and terms, which are 
            subject to change without notice based on applicant qualifications, market conditions, and regulatory requirements.
          </p>
        </div>
      </div>
    </div>
  )
}
