import { readFile } from "node:fs/promises"
import path from "node:path"
import { pageMetadata } from "@/lib/seo"
import { CheatSheetRouter, CheatSheetVersions, CheatSheetView } from "@/components/cheat-sheet-view"

export const metadata = pageMetadata({
  title: "Non-QM Product Cheat Sheet | UFF Wholesale",
  description:
    "Line-item Non-QM guideline comparison across Den, Core, Pace, and Crest for United Fidelity Funding wholesale brokers.",
  path: "/resources/cheat-sheets/non-qm",
})

const NON_QM_ROUTES = [
  {
    to: "DEN",
    why: "Recent credit event — BK, FC, short sale inside 4 years",
    detail: "Eligible from day 1 out of BK (purchase, primary, 70% LTV, $1MM). Nobody else goes inside 24 months.",
  },
  {
    to: "DEN",
    why: "ITIN, DACA, EAD-only, or foreign-national wage earner",
    detail: "ITIN to 90% LTV full doc primary — only ITIN execution in the lineup.",
  },
  {
    to: "DEN",
    why: "FICO 600–659 on full doc / bank statements",
    detail: "Den floors at 600; Pace at 620 (NQM3); Core & Crest stop at 660.",
  },
  {
    to: "DEN",
    why: "Condotel, mixed-use, manufactured, or co-op collateral",
    detail: "Only guide that takes condotels (75%) and mixed-use on the consumer-purpose side.",
  },
  {
    to: "DEN",
    why: "Lean-expense service business on bank statements",
    detail: "15% expense factor for zero-employee service businesses.",
  },
  {
    to: "CORE",
    why: "Thin credit with a 700+ score",
    detail: "Tradeline requirement waived entirely at 700+ qualifying FICO.",
  },
  {
    to: "CORE",
    why: "Reserve-sensitive borrower with lots of REO",
    detail: "Reserves on subject property only — zero reserves for other REO.",
  },
  {
    to: "PACE",
    why: "Jumbo checks to $4.5MM",
    detail: "NQM3 reaches $4.5MM and adds unlimited cash-in-hand.",
  },
  {
    to: "CREST",
    why: "DTI to 55% on a strong-credit primary",
    detail: "Expanded Prime Plus: 55% DTI at 700+/80% with 1.5x residual income.",
  },
]

export default async function NonQmCheatSheetPage() {
  const tableHtml = await readFile(path.join(process.cwd(), "content", "cheat-sheets", "non-qm-table.html"), "utf8")

  return (
    <CheatSheetView
      id="non-qm"
      title="Non-QM Product Cheat Sheet"
      titleAccent="Broker Edition"
      subtitle="Line-item guideline comparison across UFF's four Non-QM executions. Use it to place the loan in the right bucket before you price it. Every figure is pulled directly from the current underwriting guides listed at right."
      versions={<CheatSheetVersions />}
      router={<CheatSheetRouter routes={NON_QM_ROUTES} />}
      tableHtml={tableHtml}
      footnotes={
        <>
          <b>How to read this sheet.</b> Green-starred cells mark the strongest or only execution for that line item;
          amber cells flag terms materially tighter than the rest of the lineup; hatched blank cells mean the
          underwriting guide is silent on the topic — it neither permits nor prohibits, so treat it as a scenario-desk
          question. Pace figures reference the specific rate sheet (NQM 1/2/3/4/13/15) where terms differ; the
          best-execution sheet is selected at pricing. Crest figures reference the credit grade (Expanded Prime Plus /
          Sharp A+ / Sharp A−) where terms differ.
          <br />
          <br />
          <b>Sources.</b> Den Non-QM Program Underwriting Guidelines v1.1 (May 18, 2026, incl. Exhibits B–F matrices) ·
          Core Non-QM Underwriting Guides v07.15.2026 (Residential matrix eff. 7/15/26) plus 1-Year P&amp;L supplement
          §8.5 (eff. 9/22/2025) · Pace Non-QM Program Guide v17 (July 28, 2026, Appendix B matrices) · Crest Seller
          Program Underwriting Guidelines v9.0 (Aug 3, 2026, §16 matrices).
          <div className="disc">
            <b>Internal broker reference only — not a commitment to lend.</b> United Fidelity Funding Corp, NMLS #34381.
            All terms subject to the full underwriting guidelines, current rate sheets, LLPAs, and state restrictions in
            effect at lock. Where this sheet and the source guide conflict, the guide governs.
          </div>
        </>
      }
    />
  )
}
