import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "About United Fidelity Funding | Wholesale Lender",
  description:
    "United Fidelity Funding Corp is a wholesale mortgage lender in Kansas City, MO (NMLS 34381). Built for mortgage brokers — not consumers.",
  path: "/about",
})

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}
