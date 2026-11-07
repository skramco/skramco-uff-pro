import { readFile } from "node:fs/promises"
import path from "node:path"
import { pageMetadata } from "@/lib/seo"
import { CheatSheetRouter, CheatSheetVersions, CheatSheetView } from "@/components/cheat-sheet-view"

export const metadata = pageMetadata({
  title: "DSCR Product Cheat Sheet | UFF Wholesale",
  description:
    "Line-item DSCR guideline comparison across Den, Core, Pace, and Crest investor cash-flow programs for United Fidelity Funding wholesale brokers.",
  path: "/resources/cheat-sheets/dscr",
})

const DSCR_ROUTES = [
  {
    to: "CORE",
    why: "DSCR purchase on a vacant / unleased property",
    detail: "No LTV reduction on unleased purchases; qualifies off market rent.",
  },
  {
    to: "CORE",
    why: "Reserve-sensitive borrower with lots of REO",
    detail: "Reserves on subject property only — zero reserves for other REO.",
  },
  {
    to: "PACE",
    why: "Jumbo checks to $4.5MM",
    detail: "DSCR3 reaches $4.5MM — the largest DSCR check in the lineup.",
  },
  {
    to: "PACE",
    why: "Reserve-light DSCR to $2.5MM",
    detail: "DSCR3 requires zero reserves at ≤80% LTV — nobody else goes to none.",
  },
  {
    to: "CREST",
    why: "No-Ratio DSCR or a short-term-rental refi",
    detail: "Only No-Ratio execution in the lineup — dedicated grid to 75% LTV.",
  },
  {
    to: "DEN",
    why: "Condotel or mixed-use investor collateral",
    detail: "Only guide that takes condotels (75%) and mixed-use (DSCR ≥1.15).",
  },
  {
    to: "DEN",
    why: "Foreign-national DSCR without US credit",
    detail: "FN grid to 75% purchase / 65% cash-out, $3MM; 999 FICO path; AirDNA allowed.",
  },
]

export default async function DscrCheatSheetPage() {
  const tableHtml = await readFile(path.join(process.cwd(), "content", "cheat-sheets", "dscr-table.html"), "utf8")

  return (
    <CheatSheetView
      id="dscr"
      title="DSCR Product Cheat Sheet"
      titleAccent="Broker Edition"
      subtitle="Line-item guideline comparison across UFF's four investor cash-flow executions. Use it to place the loan in the right bucket before you price it. Every figure is pulled directly from the current underwriting guides listed at right."
      versions={<CheatSheetVersions />}
      router={<CheatSheetRouter routes={DSCR_ROUTES} />}
      tableHtml={tableHtml}
      footnotes={
        <>
          <b>How to read this sheet.</b> Green-starred cells mark the strongest or only execution for that line item;
          amber cells flag terms materially tighter than the rest of the lineup; hatched blank cells mean the
          underwriting guide is silent on the topic — it neither permits nor prohibits, so treat it as a scenario-desk
          question. Pace figures reference the specific rate sheet (DSCR 1/2/3/4/11/13/15) where terms differ; the
          best-execution sheet is selected at pricing.
          <br />
          <br />
          <b>Sources.</b> Den Non-QM Program Underwriting Guidelines v1.1 (May 18, 2026, incl. Exhibit D investor
          cash-flow matrix) · Core Non-QM Underwriting Guides v07.15.2026 (Investor NQM matrix eff. 7/15/26) · Pace DSCR
          Program Guide v16 (July 28, 2026, Appendix C matrices) · Crest Seller Program Underwriting Guidelines v9.0
          (Aug 3, 2026, §16 matrices).
          <div className="disc">
            <b>Internal broker reference only — not a commitment to lend.</b> United Fidelity Funding Corp, NMLS #34381.
            All terms subject to the full underwriting guidelines, current rate sheets, LLPAs, and state restrictions in
            effect at lock. Where this sheet and the source guide conflict, the guide governs. Business-purpose (DSCR)
            loans are not for personal, family, or household use.
          </div>
        </>
      }
    />
  )
}
