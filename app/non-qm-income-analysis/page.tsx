import { notFound } from "next/navigation"
import NonQmIncomeAnalysisTool from "@/components/non-qm-income-analysis"
import { isNonQmIncomeAnalysisEnabled } from "@/lib/feature-flags"
import { pageMetadata } from "@/lib/seo"
import { PageHero } from "@/components/page-hero"
import { Calculator, FileSpreadsheet, TrendingUp } from "lucide-react"

export const metadata = pageMetadata({
  title: "Non-QM Income Analysis | United Fidelity Funding Corp",
  description:
    "Upload a MISMO 3.4 file to analyze asset depletion income, bank statement income, and No Ratio eligibility for Non-QM restructure scenarios.",
  path: "/non-qm-income-analysis",
})

export default function NonQmIncomeAnalysisPage() {
  if (!isNonQmIncomeAnalysisEnabled()) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero eyebrow="Broker tool" title="Non-QM Income Analysis">
        <p>
          Upload a MISMO 3.4 export to evaluate asset depletion income, bank statement income, and No Ratio eligibility.
        </p>
      </PageHero>

      <section className="container mx-auto px-4 py-8">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border bg-white p-4">
            <FileSpreadsheet className="mb-2 h-5 w-5 text-red-600" />
            <h2 className="font-semibold">MISMO 3.4 Import</h2>
            <p className="mt-1 text-sm text-gray-600">
              Extract borrower, asset, liability, and loan data from Encompass or your LOS export.
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <Calculator className="mb-2 h-5 w-5 text-red-600" />
            <h2 className="font-semibold">Asset Depletion Engine</h2>
            <p className="mt-1 text-sm text-gray-600">
              Calculate 36- and 84-month depletion income with eligible asset haircuts by asset type.
            </p>
          </div>
          <div className="rounded-lg border bg-white p-4">
            <TrendingUp className="mb-2 h-5 w-5 text-red-600" />
            <h2 className="font-semibold">No Ratio Screening</h2>
            <p className="mt-1 text-sm text-gray-600">
              Compare total eligible assets against note amount plus reserve requirements.
            </p>
          </div>
        </div>

        <NonQmIncomeAnalysisTool />
      </section>
    </div>
  )
}
