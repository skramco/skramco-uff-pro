import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "PRO Portal — Price, Lock & Submit | UFF Wholesale",
  description:
    "PRO Portal lets brokers self-sign up, price scenarios, lock rates, and submit loans. Immediate access — no multi-day approval queue.",
  path: "/pro-portal",
})

export default function ProPortalLayout({ children }: { children: ReactNode }) {
  return children
}
