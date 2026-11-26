import type { ReactNode } from "react"
import "./nqm-print.css"

export default function InvestorMatrixLayout({ children }: { children: ReactNode }) {
  return <div className="nqm-matrix-route">{children}</div>
}
