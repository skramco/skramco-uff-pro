import type { ProductDetail } from "./types"

export const hfa: ProductDetail = {
  slug: "hfa",
  name: "HFA programs",
  href: "/products/hfa",
  positioning: "Housing Finance Authority programs and down payment assistance for first-time and income-eligible buyers.",
  summary:
    "HFA programs are for first-time and income-eligible buyers who fit a participating Housing Finance Authority. Down payment assistance can cover part or all of the down payment when the HFA overlay allows it. Price the authority on the file in PRO Portal.",
  idealBorrower: "Borrowers who need HFA execution and down payment assistance.",
  idealBorrowerProfile:
    "First-time and income-eligible buyers who fit a participating Housing Finance Authority. DPA can cover part or all of the down payment when the HFA overlay allows it. Price the scenario in PRO Portal for the authority on the file.",
  keyLimit: "Multiple HFAs · DPA",
  offerings: ["Multiple HFAs", "Down Payment Assistance (DPA)"],
  highlights: ["DPA programs"],
  image: {
    src: "/images/products/hfa.png",
    alt: "A parent and children in the living room of a first home",
  },
  matrix: null,
  parameters: [
    { label: "Authorities", value: "Multiple Housing Finance Authorities" },
    { label: "Assistance", value: "DPA programs where the HFA overlay allows" },
    { label: "Occupancy", value: "Typically primary residence" },
  ],
  documentation: [
    "HFA-specific borrower and income limits",
    "DPA worksheets when assistance is used",
    "Price the authority and overlay in PRO Portal",
  ],
  relatedSlugs: ["conventional", "fha"],
}
