import type { ReactNode } from "react"
import Link from "next/link"
import { cheatSheets } from "@/content/cheat-sheets"

export type CheatSheetId = "du-lpa" | "non-qm" | "dscr"

type CheatSheetViewProps = {
  id: CheatSheetId
  title: string
  titleAccent: string
  subtitle: string
  versions: ReactNode
  router: ReactNode
  tableHtml: string
  footnotes: ReactNode
}

const SHEETS: { id: CheatSheetId; href: string; label: string }[] = cheatSheets.map((sheet) => ({
  id:
    sheet.href === "/resources/cheat-sheets/du-vs-lpa"
      ? "du-lpa"
      : sheet.href === "/resources/cheat-sheets/non-qm"
        ? "non-qm"
        : "dscr",
  href: sheet.href,
  label: sheet.label,
}))

export function CheatSheetView({
  id,
  title,
  titleAccent,
  subtitle,
  versions,
  router,
  tableHtml,
  footnotes,
}: CheatSheetViewProps) {
  return (
    <div className="cheat-sheet">
      <div className="sheet-head">
        <div className="wrap">
          <div className="sheet-switch">
            {SHEETS.map((sheet) => (
              <Link key={sheet.id} href={sheet.href} className={sheet.id === id ? "is-active" : undefined}>
                {sheet.label}
              </Link>
            ))}
          </div>
          <div className="hdr-row">
            <div>
              <h1>
                {title} <span>· {titleAccent}</span>
              </h1>
              <div className="hdr-sub">{subtitle}</div>
            </div>
            <div className="versions">{versions}</div>
          </div>
          <div className="legend">
            <span className="chip">
              <span className="sw win" />
              <span>
                <span className="star">★</span> Standout advantage — best or unique in the lineup
              </span>
            </span>
            <span className="chip">
              <span className="sw watch" /> Watch-out — materially tighter than the others
            </span>
            <span className="chip">
              <span className="sw blank" /> Blank — the guide does not address this topic
            </span>
            <span className="chip">LTV figures are LTV/CLTV unless noted</span>
          </div>
        </div>
      </div>

      <div className="wrap">
        {router}
        <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
        <div className="foot">{footnotes}</div>
      </div>
    </div>
  )
}

export function CheatSheetVersions({ extra }: { extra?: ReactNode }) {
  return (
    <>
      <b>Den</b> — Non-QM UW Guidelines v1.1 (May 18, 2026)
      <br />
      <b>Core</b> — Non-QM Guides v07.15.2026 + 1-Yr P&amp;L supplement (eff. 09.22.2025)
      <br />
      <b>Pace</b> — Non-QM Guide v17 + DSCR Guide v16 (Jul 28, 2026)
      <br />
      <b>Crest</b> — Seller Program Guidelines v9.0 (Aug 3, 2026)
      {extra}
    </>
  )
}

type RouteItem = { to: string; why: string; detail: string }

export function CheatSheetRouter({ routes }: { routes: RouteItem[] }) {
  const midpoint = Math.ceil(routes.length / 2)
  const columns = [routes.slice(0, midpoint), routes.slice(midpoint)]

  return (
    <div className="router">
      <h2>
        Route the loan <em>in ten seconds</em>
      </h2>
      <p className="lead">
        Fastest-path placement based on the single attribute driving the file. Confirm against the full grid below —
        layered risk (FICO × LTV × event seasoning) always prices and qualifies off the matrix.
      </p>
      <div className="routes">
        {columns.map((column, index) => (
          <div key={index}>
            {column.map((route) => (
              <div className="route" key={`${route.to}-${route.why}`}>
                <div className="to">{route.to}</div>
                <div className="why">
                  {route.why}
                  <small>{route.detail}</small>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
