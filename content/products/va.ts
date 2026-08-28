import { formatUsd, loanLimits } from "../loan-limits"
import type { ProductDetail } from "./types"

export const va: ProductDetail = {
  slug: "va",
  name: "VA",
  href: "/products/va",
  positioning: "VA purchase and IRRRL for veterans and active duty. $0 down with full entitlement.",
  summary:
    "VA is for veterans, active duty, Guard and Reserve, and eligible surviving spouses. Purchase and high-balance work when entitlement supports a $0-down primary residence. IRRRLs refinance an existing VA loan in Standard and High Balance, Fixed and ARM.",
  idealBorrower: "Veterans and active duty with full entitlement and $0 down.",
  idealBorrowerProfile:
    "Veterans, active duty, Guard/Reserve, and eligible surviving spouses. Primary residence. Use this when the borrower has a Certificate of Eligibility and you want $0 down with no PMI.",
  keyLimit: `${formatUsd(loanLimits.conforming)} conforming reference (${loanLimits.year})`,
  matrix: {
    href: "/pdfs/uff-matrix-va-2025.pdf",
    label: "VA matrix",
    fileSize: "1.4 MB",
    lastUpdated: "August 15, 2026",
  },
  parameters: [
    { label: `Conforming reference (${loanLimits.year})`, value: formatUsd(loanLimits.conforming) },
    { label: `High-cost ceiling (${loanLimits.year})`, value: formatUsd(loanLimits.highCostCeiling) },
    { label: "Full entitlement", value: "No VA county loan limit" },
    { label: "Minimum down payment", value: "$0" },
    { label: "Maximum LTV", value: "100%" },
    { label: "Minimum FICO", value: "580" },
    { label: "Maximum DTI", value: "60%" },
    { label: "VA funding fee", value: "2.15%–3.3% (exempt if disabled)" },
    { label: "Occupancy", value: "Primary residence; occupy within 60 days" },
  ],
  offerings: [
    "Standard Fixed & ARMs",
    "High Balance Fixed & ARMs",
    "IRRRL Standard Fixed & ARMs",
    "IRRRL High Balance Fixed & ARMs",
  ],
  highlights: ["IRRRL"],
  image: {
    src: "/images/products/va.png",
    alt: "A veteran and family in the yard of their home",
  },
  documentation: [
    "Certificate of Eligibility",
    "VA appraisal",
    "Property must meet VA minimum property requirements",
    "No private mortgage insurance",
    "No prepayment penalty; loan is assumable",
  ],
  relatedSlugs: ["conventional", "fha"],
}
