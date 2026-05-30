import NonQmIncomeAnalysisTool from "@/components/non-qm-income-analysis"
import { Badge } from "@/components/ui/badge"
import { Calculator, FileSpreadsheet, TrendingUp } from "lucide-react"

export const metadata = {
  title: "Non-QM Income Analysis | United Fidelity Funding Corp",
  description:
    "Upload a MISMO 3.4 file to analyze asset depletion income, bank statement income, and No Ratio eligibility for Non-QM restructure scenarios.",
}

export default function NonQmIncomeAnalysisPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-red-600 via-red-500 to-red-700 text-white py-16">
        <div className="container mx-auto px-4">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/20">Broker Tool</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Non-QM Income Analysis</h1>
          <p className="text-xl text-red-100 max-w-3xl">
            Upload a MISMO 3.4 export to evaluate asset depletion income, bank statement income, and
            No Ratio eligibility. Restructure dead Agency files into viable Non-QM scenarios.
          </p>
        </div>
      </section>

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
