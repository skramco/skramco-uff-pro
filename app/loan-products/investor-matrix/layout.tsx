import type { ReactNode } from "react"
import { Archivo, IBM_Plex_Mono } from "next/font/google"
import "./nqm-print.css"

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-archivo",
  display: "swap",
})

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

export default function InvestorMatrixLayout({ children }: { children: ReactNode }) {
  return <div className={`${archivo.variable} ${plex.variable} nqm-matrix-route`}>{children}</div>
}
