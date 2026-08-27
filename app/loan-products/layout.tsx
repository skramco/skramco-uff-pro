import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Loan Products & Matrices | UFF Wholesale",
  description:
    "Conventional, FHA, VA, USDA, and Non-QM wholesale loan products and eligibility matrices from United Fidelity Funding.",
  path: "/loan-products",
})

export default function LoanProductsLayout({ children }: { children: ReactNode }) {
  return children
}
