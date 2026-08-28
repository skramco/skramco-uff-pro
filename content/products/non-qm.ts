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
  matrix: {
    href: "/loan-products/non-qm-core",
    label: "Non-QM Core matrix",
    fileSize: "HTML",
    lastUpdated: "August 1, 2026",
  },
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
  extraMatrices: [
    {
      href: "/pdfs/uff-matrix-nonqm-residential-2025.pdf",
      label: "Non-QM residential matrix",
      fileSize: "PDF",
      lastUpdated: "August 1, 2026",
    },
  ],
  documentation: [
    "Bank statements (personal or business, 12 or 24 months)",
    "DSCR: lease and rent documentation",
    "Asset depletion: 36- or 84-month calculation",
    "P&L statements or CPA letter where the overlay requires it",
  ],
  relatedSlugs: ["conventional", "investor"],
}
