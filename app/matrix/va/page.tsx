import { Breadcrumbs } from "@/components/breadcrumbs"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "VA Standard & IRRRL Matrix | United Fidelity Funding Corp",
  description:
    "UFF VA Standard and IRRRL program matrix — occupancy, LTV, CLTV, reserves, and DTI by loan purpose for mortgage professionals.",
  path: "/matrix/va",
})

export default function VAMatrixPage() {
  return (
    <div className="section-pad">
      <div className="container mx-auto px-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Loan products", href: "/products" }, { label: "VA Matrix" }]} />

        <div className="panel p-6 sm:p-8">
          <div className="mb-8">
            <h1 className="display">VA Standard &amp; IRRRL Matrix</h1>
            <p className="prose-body mt-2 text-sm">
              United Fidelity Funding Corp. NMLS #34381. Equal Housing Lender.
            </p>
            <p className="prose-body mt-4 text-sm">
              VA has no strict Min FICO; lender overlays apply (e.g., 620 typical). Full entitlement allows 100% LTV.
            </p>
          </div>

          <div className="overflow-x-auto rounded-card border border-hairline">
            <table className="min-w-[760px] w-full border-collapse text-sm">
              <thead className="bg-uff-ink text-white">
                <tr>
                  <th className="border-b border-hairline px-4 py-3 text-left">Occupancy</th>
                  <th className="border-b border-hairline px-4 py-3 text-left">Loan Purpose</th>
                  <th className="border-b border-hairline px-4 py-3 text-left">Units</th>
                  <th className="border-b border-hairline px-4 py-3 text-left">Amortization Type</th>
                  <th className="border-b border-hairline px-4 py-3 text-left">Min FICO (Typical)</th>
                  <th className="border-b border-hairline px-4 py-3 text-left">Max LTV</th>
                  <th className="border-b border-hairline px-4 py-3 text-left">Max CLTV</th>
                  <th className="border-b border-hairline px-4 py-3 text-left">Reserves (Months)</th>
                  <th className="border-b border-hairline px-4 py-3 text-left">Max DTI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-muted">
                  <td className="border-b border-hairline px-4 py-2 text-ink">Principal Residence</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">Purchase</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">1-4</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">Fixed</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">620 (overlay)</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">100%</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">100%</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">UW discretion</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">41%</td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="border-b border-hairline px-4 py-2 text-ink">Principal Residence</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">Cash-Out Refi (Type I)</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">1-4</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">Fixed/ARM</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">620</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">100%</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">100%</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">UW discretion</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">41%</td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="border-b border-hairline px-4 py-2 text-ink">Principal Residence</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">Cash-Out Refi (Type II)</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">1-4</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">Fixed/ARM</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">620</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">100%</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">100%</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">UW discretion</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">41%</td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="border-b border-hairline px-4 py-2 text-ink">Principal Residence</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">IRRRL</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">1-4</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">Fixed/ARM</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">No min (unless qual)</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">Unlimited (balance + fees)</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">N/A</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">None</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">N/A (if no qual)</td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="border-b border-hairline px-4 py-2 text-ink">Second Homes</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">Purchase/Cash-Out</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">1</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">Fixed</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">620</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">90%</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">90%</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">UW discretion</td>
                  <td className="border-b border-hairline px-4 py-2 text-ink">41%</td>
                </tr>
                <tr className="hover:bg-muted">
                  <td className="px-4 py-2 text-ink">Investment Property</td>
                  <td className="px-4 py-2 text-ink">Purchase/Cash-Out</td>
                  <td className="px-4 py-2 text-ink">1-4</td>
                  <td className="px-4 py-2 text-ink">Fixed</td>
                  <td className="px-4 py-2 text-ink">620</td>
                  <td className="px-4 py-2 text-ink">90%</td>
                  <td className="px-4 py-2 text-ink">90%</td>
                  <td className="px-4 py-2 text-ink">3-6</td>
                  <td className="px-4 py-2 text-ink">41%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 panel bg-surface p-6">
            <h3 className="text-base font-bold text-ink">Notes:</h3>
            <p className="prose-body mt-3 text-sm">
              IRRRL requires net tangible benefit (0.5% rate reduction; fee recoup ≤36 months). No appraisal for
              IRRRL. Higher DTI OK with residuals.
            </p>
            <p className="prose-body mt-2 text-sm">
              <strong className="text-ink">Source:</strong> VA Pamphlet 26-7 (October 2024 update)
            </p>
          </div>

          <div className="mt-6 border-t border-hairline pt-6 text-xs text-ink-muted">
            <p>
              This matrix is provided for informational purposes only and does not constitute a commitment to lend
              or an offer to extend credit. All loan approvals are subject to credit review, underwriting
              guidelines, program eligibility, interest rates, and terms, which are subject to change without notice
              based on applicant qualifications, market conditions, and regulatory requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
