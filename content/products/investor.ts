import type { ProductDetail } from "./types"

export const investor: ProductDetail = {
  slug: "investor",
  name: "Investor loans",
  href: "/products/investor",
  positioning: "DSCR investor loans underwritten to the property's cash flow, not W-2 income.",
  summary:
    "Investor loans are for real-estate investors, not owner-occupants. Qualification is based on the property's rental cash flow (DSCR), not the borrower's personal DTI, and interest-only is available. Use this when the file is an investment property and rents, not W-2s, tell the story.",
  idealBorrower: "Investors using rental cash flow (DSCR) instead of personal income.",
  idealBorrowerProfile:
    "Real estate investors buying or refinancing investment property. Qualification is based on debt service coverage from rents, not the borrower's personal DTI.",
  keyLimit: "See DSCR matrix",
  offerings: ["DSCR", "Interest-Only"],
  highlights: ["DSCR"],
  image: {
    src: "/images/products/investor.png",
    alt: "An investor standing in front of a duplex rental property",
  },
  matrix: {
    href: "/pdfs/uff-matrix-nonqm-dscr-2025.pdf",
    label: "DSCR matrix",
    fileSize: "PDF",
    lastUpdated: "August 1, 2026",
  },
  parameters: [
    { label: "Program", value: "DSCR (Non-QM)" },
    { label: "Occupancy", value: "Investment" },
    { label: "Qualification", value: "Property cash flow / rental income" },
    { label: "Maximum LTV", value: "See DSCR matrix" },
  ],
  documentation: [
    "Lease and rent documentation",
    "Property cash flow sufficient for the DSCR overlay",
    "Investment occupancy",
  ],
  relatedSlugs: ["non-qm", "conventional"],
}
