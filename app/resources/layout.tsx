import type { ReactNode } from "react"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Broker Resources, Forms & Rate Sheets | UFF Wholesale",
  description:
    "Non-QM and DSCR cheat sheet, product guidelines, and downloadable forms for United Fidelity Funding wholesale broker partners.",
  path: "/resources",
})

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return children
}
