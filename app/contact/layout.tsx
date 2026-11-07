import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Contact UFF Wholesale",
  description:
    "Contact United Fidelity Funding in Kansas City, MO. Phone (855) 95-EAGLE. For mortgage professionals only.",
  path: "/contact",
})

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
