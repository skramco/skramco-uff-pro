import { formatUsd, loanLimits } from "../loan-limits"
import { matrixPdf } from "./matrices"
import type { ProductDetail } from "./types"

export const fha: ProductDetail = {
  slug: "fha",
  name: "FHA",
  href: "/products/fha",
  positioning: "FHA purchase, streamline, renovation, and Section 184. 3.5% down and credit as low as 580 on 203(b).",
  summary:
    "FHA is built for first-time and repeat buyers who need a lower down payment and more flexible credit than conventional. 203(b) covers standard and high-balance purchases. Streamlines, 203(k) renovation, and Section 184 Indian Housing serve refinance, rehab, and Native American housing files that will not fit a vanilla agency box.",
  idealBorrower: "First-time and repeat buyers who need 3.5% down and flexible credit.",
  idealBorrowerProfile:
    "First-time and repeat buyers who need 3.5% down, gift funds, or a 580+ FICO. Primary residence. Use this when conventional overlays would decline the file and you still have a documented income story.",
  keyLimit: `${formatUsd(loanLimits.fhaLowCostFloor)} floor (${loanLimits.year})`,
  matrix: matrixPdf("UFF-FHA-Standard-High-Balance-Program-Matrix.pdf", "Standard / High Balance", "137 KB"),
  extraMatrices: [matrixPdf("UFF-FHA-Streamline-Program-Matrix.pdf", "Streamline", "130 KB")],
  parameters: [
    { label: `Low-cost floor (${loanLimits.year})`, value: formatUsd(loanLimits.fhaLowCostFloor) },
    { label: `High-cost ceiling (${loanLimits.year})`, value: formatUsd(loanLimits.highCostCeiling) },
    {
      label: `Special-exception ceiling (${loanLimits.year})`,
      value: formatUsd(loanLimits.fhaSpecialExceptionCeiling),
    },
    { label: "Minimum down payment", value: "3.5%" },
    { label: "Maximum LTV", value: "96.5%" },
    { label: "Minimum FICO", value: "580 with 3.5% down" },
    { label: "Maximum DTI", value: "56.9%" },
    { label: "Occupancy", value: "Primary residence" },
  ],
  offerings: [
    "203(b) Standard Fixed & ARMs",
    "203(b) High Balance Fixed & ARMs",
    "Streamlines",
    "203(k) Renovation",
    "Section 184 Indian Housing",
  ],
  highlights: ["203(k) Renovation", "Section 184 Indian Housing"],
  image: {
    src: "/images/products/fha.png",
    alt: "First-time homebuyers on the porch of a starter house",
  },
  documentation: [
    "Upfront mortgage insurance premium (UFMIP)",
    "Annual mortgage insurance premium (MIP)",
    "MIP removal after 11 years when down payment is 10% or more",
    "Lifetime MIP when down payment is under 10%",
    "Gift funds allowed for down payment",
  ],
  relatedSlugs: ["conventional", "hfa"],
}
