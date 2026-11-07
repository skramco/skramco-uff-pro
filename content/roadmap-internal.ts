/**
 * Internal product/content roadmap. Do not import this file from any public route,
 * layout, or rendered component.
 */

export const internalRoadmap = {
  resourceForms: [
    {
      section: "General Forms",
      name: "Initial Borrower Contact Form",
      description:
        "Document initial contact with borrowers and capture preliminary loan information for processing",
    },
    {
      section: "General Forms",
      name: "Loan Estimate Request Form",
      description:
        "Request form for obtaining a Loan Estimate with detailed terms and estimated costs for the mortgage",
    },
    {
      section: "General Forms",
      name: "Income & Asset Documentation Checklist",
      description: "Comprehensive list of required income and asset documents needed for loan underwriting",
    },
    {
      section: "General Forms",
      name: "Broker Compensation Acknowledgement & Agreement",
      description:
        "Agreement form for borrower to elect whether broker compensation will be paid by borrower or lender. PDF not yet in /public/pdfs.",
    },
    {
      section: "Disclosure Forms",
      name: "TRID Disclosure Forms Package",
      description: "Complete package of TILA-RESPA Integrated Disclosure forms required for mortgage transactions",
    },
    {
      section: "Disclosure Forms",
      name: "Privacy Notice Template",
      description: "Required notice explaining how borrower financial information is collected, used, and protected",
    },
    {
      section: "FHA Forms",
      name: "FHA Borrower Certification & Authorization",
      description: "Borrower certifies occupancy intent and authorizes FHA to verify information for loan approval",
    },
    {
      section: "FHA Forms",
      name: "FHA Identity of Interest Certification",
      description: "Discloses any identity of interest relationships between parties in the transaction",
    },
    {
      section: "VA Forms",
      name: "VA Occupancy Certification",
      description: "Borrower certifies intent to occupy the property as primary residence for VA loan eligibility",
    },
    {
      section: "Appraisal Forms",
      name: "Appraisal Order Form",
      description: "Order professional property appraisal with detailed property information and loan requirements",
    },
    {
      section: "Appraisal Forms",
      name: "Property Inspection Waiver (PIW) Request",
      description: "Request waiver of physical property inspection when eligible based on data and risk assessment",
    },
    {
      section: "Appraisal Forms",
      name: "Desktop Appraisal Request",
      description: "Request desktop appraisal using public records and MLS data without physical property inspection",
    },
    {
      section: "Condo Forms",
      name: "Condo Project Questionnaire (Form 1076)",
      description: "Detailed questionnaire about condo project for determining financing eligibility and approval",
    },
    {
      section: "Condo Forms",
      name: "Condo/PUD Rider",
      description: "Mortgage addendum for condominium or planned unit development properties with specific terms",
    },
    {
      section: "Condo Forms",
      name: "HOA Certification Form",
      description: "Homeowners association provides certification of fees, insurance, and project financial health",
    },
    {
      section: "Other Forms",
      name: "Power of Attorney (POA) Form",
      description: "Legal document authorizing someone to act on borrower's behalf during loan closing process",
    },
    {
      section: "Other Forms",
      name: "Gift Letter Template",
      description: "Document verifying that down payment funds are a gift, not a loan, from family or approved donor",
    },
    {
      section: "Other Forms",
      name: "Explanation of Credit Letter Template",
      description:
        "Template for borrowers to explain credit issues, late payments, or derogatory items on credit report",
    },
    {
      section: "Other Forms",
      name: "Subordination Agreement",
      description: "Legal agreement changing lien priority when refinancing with existing second mortgage or HELOC",
    },
    {
      section: "Other Forms",
      name: "Rate Lock Agreement",
      description: "Agreement securing specific interest rate for defined period during loan processing",
    },
  ],
  proPortalFeatures: [
    {
      name: "Order Appraisal",
      description: "Seamlessly order appraisals directly from the platform with integrated AMC partners.",
    },
    {
      name: "Order Credit",
      description: "Pull credit reports instantly with integrated credit reporting agencies.",
    },
    {
      name: "Digital Verifications",
      description: "Order employment, income, and asset verifications with digital VOE/VOI services.",
    },
    {
      name: "Initial Disclosures",
      description: "Generate and deliver initial loan disclosures automatically upon application.",
    },
  ],
  loanProducts: [
    {
      name: "Additional Non-QM investor programs",
      description: "More Non-QM investor matrices and guidelines as each group is released.",
    },
  ],
} as const
