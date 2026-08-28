import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "PRO Portal for Mortgage Brokers | UFF Wholesale",
  description:
    "PRO Portal is how mortgage brokers originate, underwrite, and fund with UFF. Self-sign up, same-day access. Docs, conditions, COCs, post-lock, and live status on every file.",
  path: "/pro-portal",
})

export default function ProPortalLayout({ children }: { children: ReactNode }) {
  return children
}
