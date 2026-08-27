import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Licensing & Disclosures | UFF",
  description:
    "NMLS ID 34381, state licensing, Equal Housing Lender statement, and full legal disclosures for United Fidelity Funding Corp.",
  path: "/licensing",
})

export default function LicensingLayout({ children }: { children: ReactNode }) {
  return children
}
