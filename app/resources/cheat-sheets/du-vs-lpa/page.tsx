import { cheatSheets } from "@/content/cheat-sheets"
import { pageMetadata } from "@/lib/seo"
import Link from "next/link"

const PDF_HREF = "/pdfs/matrices/UFF-DU-vs-LPA-Comparison.pdf"

export const metadata = pageMetadata({
  title: "DU vs LPA Comparison Cheat Sheet | UFF Wholesale",
  description:
    "Side-by-side comparison of UFF Conventional Desktop Underwriter (DU) and Loan Product Advisor (LPA) overlays for wholesale brokers.",
  path: "/resources/cheat-sheets/du-vs-lpa",
})

export default function DuVsLpaCheatSheetPage() {
  return (
    <div className="cheat-sheet">
      <div className="sheet-head">
        <div className="wrap">
          <div className="sheet-switch">
            {cheatSheets.map((sheet) => (
              <Link
                key={sheet.href}
                href={sheet.href}
                className={sheet.href === "/resources/cheat-sheets/du-vs-lpa" ? "is-active" : undefined}
              >
                {sheet.label}
              </Link>
            ))}
          </div>
          <h1>
            DU vs LPA Comparison <span>· Broker Edition</span>
          </h1>
          <p className="hdr-sub">
            Line-item overlay comparison between Desktop Underwriter and Loan Product Advisor. Use it next to the DU and
            LPA matrices to pick the agency engine before you price.
          </p>
          <p className="hdr-sub" style={{ marginTop: 12 }}>
            <a href={PDF_HREF} target="_blank" rel="noopener noreferrer">
              Download PDF
            </a>
          </p>
        </div>
      </div>
      <div className="wrap" style={{ paddingBottom: 48 }}>
        <iframe
          src={PDF_HREF}
          title="DU vs LPA Comparison"
          className="mt-6 w-full"
          style={{ height: "80vh", border: "1px solid var(--cs-line)", borderRadius: 8 }}
        />
      </div>
    </div>
  )
}
