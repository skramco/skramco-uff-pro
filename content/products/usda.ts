import { matrixPdf } from "./matrices"
import type { ProductDetail } from "./types"

export const usda: ProductDetail = {
  slug: "usda",
  name: "USDA",
  href: "/products/usda",
  positioning: "USDA Rural Development — 100% financing on eligible rural and suburban properties.",
  summary:
    "USDA is for buyers of a primary home in a USDA-eligible rural or suburban area who meet area income limits. Standard and high-balance give $0-down financing when the property maps as eligible. Streamline and Streamline-Assist serve borrowers who already have a USDA loan and need a simpler refinance.",
  idealBorrower: "Eligible rural and suburban properties with 100% financing.",
  idealBorrowerProfile:
    "Borrowers buying a primary residence in a USDA-eligible area who can meet area income limits. Use this when the property maps as eligible and the borrower needs 100% financing with a published guarantee fee.",
  keyLimit: "100% LTV · 115% AMI",
  matrix: matrixPdf("UFF-USDA-Program-Matrix.pdf", "USDA", "139 KB"),
  extraMatrices: [matrixPdf("UFF-USDA-Streamlined-Assist-Program-Matrix.pdf", "Streamlined Assist", "125 KB")],
  parameters: [
    { label: "Maximum loan amount", value: "No set USDA dollar cap" },
    { label: "Income limit", value: "115% of area median income" },
    { label: "Minimum down payment", value: "$0" },
    { label: "Maximum LTV", value: "100%" },
    { label: "Minimum FICO", value: "640" },
    { label: "Maximum DTI", value: "46%" },
    { label: "Upfront guarantee fee", value: "1.0%" },
    { label: "Annual fee", value: "0.35%" },
    { label: "Occupancy", value: "Primary residence" },
  ],
  offerings: ["Standard Fixed", "High Balance Fixed", "Streamline", "Streamline-Assist"],
  highlights: ["Streamline-Assist"],
  image: {
    src: "/images/products/usda.png",
    alt: "A couple in front of a rural home with a large yard",
  },
  documentation: [
    "Property must be in a USDA-eligible area",
    "Income at or below 115% of area median income",
    "U.S. citizenship or permanent residency",
    "Single-family, condo, or manufactured — confirm overlay",
  ],
  relatedSlugs: ["fha", "conventional"],
}
