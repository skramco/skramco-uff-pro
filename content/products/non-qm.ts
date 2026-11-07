import { matrixPdf } from "./matrices"
import type { ProductDetail } from "./types"

export const nonQm: ProductDetail = {
  slug: "non-qm",
  name: "Non-QM",
  href: "/products/non-qm",
  positioning: "Full doc, bank statement, P&L, and asset depletion for self-employed borrowers.",
  summary:
    "Non-QM is for self-employed and other borrowers whose income will not fit agency documentation. Full doc is available when they can document it. Bank statements (personal and/or business), P&L, and asset depletion cover files where tax returns understate cash flow, with interest-only available on these executions.",
  idealBorrower: "Self-employed borrowers using full doc, bank statements, P&L, or asset depletion.",
  idealBorrowerProfile:
    "Self-employed borrowers and files that will not fit agency documentation. Use full doc, bank statements (personal and/or business), P&L, or asset depletion. Investor DSCR is its own family.",
  keyLimit: "See Non-QM Core matrix",
  matrix: matrixPdf("UFF-NonQM-Den-Program-Matrix.pdf", "Den", "122 KB"),
  extraMatrices: [
    matrixPdf("UFF-NonQM-Core-Program-Matrix.pdf", "Core", "107 KB"),
    matrixPdf("UFF-NonQM-Pace1-Program-Matrix.pdf", "Pace 1", "102 KB"),
    matrixPdf("UFF-NonQM-Pace2-Program-Matrix.pdf", "Pace 2", "102 KB"),
    matrixPdf("UFF-NonQM-Pace3-Program-Matrix.pdf", "Pace 3", "106 KB"),
    matrixPdf("UFF-NonQM-Pace4-Program-Matrix.pdf", "Pace 4", "102 KB"),
    matrixPdf("UFF-NonQM-Pace13-Program-Matrix.pdf", "Pace 13", "103 KB"),
    matrixPdf("UFF-NonQM-Pace15-Program-Matrix.pdf", "Pace 15", "105 KB"),
  ],
  parameters: [
    { label: "Loan amounts", value: "Up to $3M+" },
    { label: "Down payment", value: "10%–25%" },
    { label: "Minimum FICO", value: "660+ typical" },
    { label: "Maximum DTI", value: "50% (bank statement); DSCR N/A" },
    { label: "Maximum LTV", value: "90% primary / 80% DSCR" },
    { label: "Occupancy", value: "Primary, second home, investment — by program" },
    { label: "Income options", value: "Bank statement, DSCR, asset depletion, full doc" },
  ],
  offerings: ["Full Doc", "Bank Statements (personal and/or business)", "P&L", "Asset Depletion", "Interest-Only"],
  highlights: ["Bank Statements", "P&L", "Asset Depletion"],
  image: {
    src: "/images/products/non-qm.png",
    alt: "A self-employed business owner reviewing paperwork in a workshop",
  },
  documentation: [
    "Bank statements (personal or business, 12 or 24 months)",
    "DSCR: lease and rent documentation",
    "Asset depletion: 36- or 84-month calculation",
    "P&L statements or CPA letter where the overlay requires it",
  ],
  relatedSlugs: ["conventional", "investor"],
}
