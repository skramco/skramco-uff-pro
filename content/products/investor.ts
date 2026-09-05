import { matrixPdf } from "./matrices"
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
  matrix: matrixPdf("UFF-NonQM-Den-DSCR-Program-Matrix.pdf", "Den DSCR", "107 KB"),
  extraMatrices: [
    matrixPdf("UFF-NonQM-Core-DSCR-Program-Matrix.pdf", "Core DSCR", "104 KB"),
    matrixPdf("UFF-NonQM-Crest-DSCR-Program-Matrix.pdf", "Crest DSCR", "107 KB"),
    matrixPdf("UFF-Pace-1-DSCR-Program-Matrix.pdf", "Pace 1 DSCR", "25 KB"),
    matrixPdf("UFF-Pace-2-DSCR-Program-Matrix.pdf", "Pace 2 DSCR", "25 KB"),
    matrixPdf("UFF-Pace-3-DSCR-Program-Matrix.pdf", "Pace 3 DSCR", "25 KB"),
    matrixPdf("UFF-Pace-4-DSCR-Program-Matrix.pdf", "Pace 4 DSCR", "25 KB"),
    matrixPdf("UFF-Pace-13-DSCR-Program-Matrix.pdf", "Pace 13 DSCR", "25 KB"),
    matrixPdf("UFF-Pace-15-DSCR-Program-Matrix.pdf", "Pace 15 DSCR", "25 KB"),
  ],
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
