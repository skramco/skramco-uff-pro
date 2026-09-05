import { formatUsd, loanLimits } from "../loan-limits"
import { matrixPdf } from "./matrices"
import type { ProductDetail } from "./types"

export const conventional: ProductDetail = {
  slug: "conventional",
  name: "Conventional",
  href: "/products/conventional",
  positioning: "Agency fixed and ARM loans for documented W-2 and self-employed income, as little as 3% down.",
  summary:
    "Conventional is for borrowers who can document income the agency way: W-2s, tax returns, and a credit profile that supports full documentation. Standard and high-balance cover conforming and high-cost markets. First-time homebuyer and affordable housing executions help when the borrower needs a lower down payment or an income overlay conventional affordable programs allow.",
  idealBorrower: "Documented W-2 income, as little as 3% down.",
  idealBorrowerProfile:
    "Borrowers with documented income and a credit score typically 620 or higher. Purchase or refinance on primary, second-home, or investment property. Standard, high balance, first-time homebuyer, and affordable housing options sit in this family.",
  keyLimit: `${formatUsd(loanLimits.conforming)} conforming (${loanLimits.year})`,
  matrix: matrixPdf("UFF-Conventional-DU-Program-Matrix.pdf", "DU", "108 KB"),
  extraMatrices: [
    matrixPdf("UFF-Conventional-LPA-Program-Matrix.pdf", "LPA", "103 KB"),
    {
      href: "/resources/cheat-sheets/du-vs-lpa",
      label: "DU vs LPA",
      fileSize: "HTML",
      lastUpdated: "September 4, 2026",
    },
  ],
  parameters: [
    { label: `Conforming limit (${loanLimits.year})`, value: formatUsd(loanLimits.conforming) },
    { label: "High-cost ceiling", value: formatUsd(loanLimits.highCostCeiling) },
    { label: "Minimum down payment", value: "3%" },
    { label: "Minimum FICO", value: "620 typical" },
    { label: "Maximum DTI", value: "Up to 50%" },
    { label: "Maximum LTV", value: "97%" },
    { label: "Occupancy", value: "Primary, second home, investment" },
  ],
  offerings: [
    "Standard Fixed & ARMs",
    "High Balance Fixed & ARMs",
    "Affordable Housing Fixed",
    "First-Time Homebuyer Fixed & ARMs",
  ],
  highlights: ["First Time Homebuyer", "Affordable Housing"],
  image: {
    src: "/images/products/conventional.png",
    alt: "A couple reviewing papers in the kitchen of a suburban home",
  },
  documentation: [
    "Full income documentation",
    "Two years tax returns and W-2s",
    "Recent pay stubs and bank statements",
    "Credit score typically 620 or higher",
  ],
  relatedSlugs: ["fha", "hfa"],
}
