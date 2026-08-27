import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Get Approved — Instant Portal Access | UFF Wholesale",
  description:
    "Self-sign up for United Fidelity Funding wholesale access. Create your account and start using PRO Portal without waiting on an approval queue.",
  path: "/get-approved",
})

export default function GetApprovedLayout({ children }: { children: ReactNode }) {
  return children
}
