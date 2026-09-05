export type ResourceGuide = {
  name: string
  description: string
  href: string
  lastUpdated: string
}

/** Standalone HTML product guides linked from Resources. */
export const resourceGuides: ResourceGuide[] = [
  {
    name: "Non-QM & DSCR Product Cheat Sheet",
    description:
      "Line-item guideline comparison across Den, Core, Pace, and Crest. Route the loan, then confirm against the full Non-QM and DSCR grids.",
    href: "/resources/non-qm-dscr-cheat-sheet",
    lastUpdated: "August 3, 2026",
  },
]
