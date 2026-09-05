export type ResourceGuide = {
  name: string
  description: string
  href: string
  lastUpdated: string
}

/** Product comparison guides linked from Resources. */
export const resourceGuides: ResourceGuide[] = [
  {
    name: "DU vs LPA Comparison",
    description:
      "Side-by-side Conventional overlay comparison between Desktop Underwriter and Loan Product Advisor.",
    href: "/resources/cheat-sheets/du-vs-lpa",
    lastUpdated: "September 4, 2026",
  },
  {
    name: "Non-QM Product Cheat Sheet",
    description:
      "Line-item guideline comparison across Den, Core, Pace, and Crest for full-doc and alt-doc Non-QM executions.",
    href: "/resources/cheat-sheets/non-qm",
    lastUpdated: "August 3, 2026",
  },
  {
    name: "DSCR Product Cheat Sheet",
    description:
      "Line-item guideline comparison across Den, Core, Pace, and Crest investor cash-flow programs.",
    href: "/resources/cheat-sheets/dscr",
    lastUpdated: "August 3, 2026",
  },
]
