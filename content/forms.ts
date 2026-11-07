export type FormEntry = {
  name: string
  description: string
  source: string
  url?: string
  apiUrl?: string
  isForm?: boolean
  lastUpdated: string | null
}

export type FormSection = {
  id: string
  title: string
  forms: FormEntry[]
}

/** Broker form library. No unpublished / Coming Soon entries. */
export const formSections: FormSection[] = [
  {
    id: "general",
    title: "General Forms",
    forms: [
      {
        name: "Uniform Residential Loan Application (URLA 1003)",
        description:
          "Standard mortgage application form required by Fannie Mae and Freddie Mac for all residential loan applications",
        url: "https://singlefamily.fanniemae.com/delivering/uniform-mortgage-data-program/uniform-residential-loan-application",
        source: "Fannie Mae",
        lastUpdated: null,
      },
      {
        name: "Inquiry Letter",
        description:
          "Letter template for brokers to formally inquire about loan products, programs, or specific transaction scenarios with United Fidelity Funding",
        apiUrl: "/pdfs/Inquiry-Letter.pdf",
        source: "UFF",
        lastUpdated: "January 15, 2026",
      },
      {
        name: "Borrower Acknowledgment of Intent to Proceed",
        description:
          "Borrower certification confirming receipt of Loan Estimate and intent to proceed with the loan application according to disclosed terms",
        apiUrl: "/pdfs/Borrower-Acknowledgment-of-Intent-to-Proceed.pdf",
        source: "UFF",
        lastUpdated: "January 15, 2026",
      },
    ],
  },
  {
    id: "disclosure",
    title: "Disclosure Forms",
    forms: [
      {
        name: "Loan Estimate (LE) Sample",
        description: "Three-page form that provides borrowers with important details about the requested mortgage loan",
        url: "https://www.consumerfinance.gov/owning-a-home/loan-estimate/",
        source: "CFPB",
        lastUpdated: null,
      },
      {
        name: "Closing Disclosure (CD) Sample",
        description:
          "Five-page form detailing the final terms and costs of the mortgage, provided at least 3 days before closing",
        url: "https://www.consumerfinance.gov/owning-a-home/closing-disclosure/",
        source: "CFPB",
        lastUpdated: null,
      },
      {
        name: "ECOA/Adverse Action Notice Information",
        description:
          "Information about Equal Credit Opportunity Act rights and adverse action notification requirements",
        url: "https://www.consumerfinance.gov/compliance/compliance-resources/other-applicable-requirements/equal-credit-opportunity-act/model-credit-application-and-sample-notification-forms/",
        source: "CFPB",
        lastUpdated: null,
      },
    ],
  },
  {
    id: "fha",
    title: "FHA Forms",
    forms: [
      {
        name: "FHA Connection Information",
        description: "Access FHA Connection portal for case number requests, appraisal ordering, and loan processing",
        url: "https://entp.hud.gov/clas/index.cfm",
        source: "HUD",
        lastUpdated: null,
      },
      {
        name: "FHA Amendatory Clause & Real Estate Certification",
        description: "Required FHA form certifying property value and protecting borrowers in purchase transactions",
        url: "https://www.hud.gov/sites/dfiles/SFH/documents/amendatory_clause_model_document.pdf",
        source: "HUD",
        lastUpdated: null,
      },
      {
        name: "FHA Case Number Request Form",
        description:
          "Submit request to obtain an FHA case number for new loan applications through United Fidelity Funding",
        apiUrl: "/api/forms/fha-case-number",
        isForm: true,
        source: "UFF",
        lastUpdated: null,
      },
    ],
  },
  {
    id: "va",
    title: "VA Forms",
    forms: [
      {
        name: "VA Form 26-1880 - Request for Certificate of Eligibility",
        description:
          "Apply for VA loan eligibility certificate to determine entitlement for VA-guaranteed home loan benefits",
        url: "https://www.va.gov/forms/26-1880/",
        source: "VA",
        lastUpdated: null,
      },
      {
        name: "VA Form 26-1820 - Report and Certification of Loan Disbursement",
        description:
          "Required at VA loan closing. VA discontinued Form 26-1802a (HUD/VA Addendum to URLA) and folded it into 26-1820.",
        url: "https://www.va.gov/find-forms/about-form-26-1820/",
        source: "VA",
        lastUpdated: null,
      },
      {
        name: "VA Funding Fee Information",
        description: "Details about VA funding fee rates, exemptions, and payment options for VA loans",
        url: "https://www.va.gov/housing-assistance/home-loans/funding-fee-and-closing-costs/",
        source: "VA",
        lastUpdated: null,
      },
      {
        name: "VA Nearest Living Relative Statement",
        description:
          "Required form for veterans to provide name, address, and contact information of their nearest living relative for VA loan processing",
        apiUrl: "/pdfs/VA-Nearest-Relative-Statement.pdf",
        source: "UFF",
        lastUpdated: "January 15, 2026",
      },
      {
        name: "VA Allowable Closing Costs",
        description:
          "Comprehensive guide detailing allowable and unallowable closing costs for VA loans, including fee limitations and restrictions based on origination fee",
        apiUrl: "/pdfs/VA-Allowable-Closing-Costs.pdf",
        source: "UFF",
        lastUpdated: "January 15, 2026",
      },
      {
        name: "VA Sponsorship Form",
        description:
          "Application form for mortgage brokers to obtain VA sponsorship through United Fidelity Funding, including state licensing information and $100 fee",
        apiUrl: "/pdfs/VA-Sponsorship-Form.pdf",
        source: "UFF",
        lastUpdated: "January 15, 2026",
      },
    ],
  },
  {
    id: "appraisal",
    title: "Appraisal Forms",
    forms: [
      {
        name: "Uniform Residential Appraisal Report (Form 1004)",
        description: "Standard appraisal form for single-family properties, detailing property value and condition",
        url: "https://selling-guide.fanniemae.com/sel/b4-1.2-01/appraisal-report-forms-and-exhibits",
        source: "Fannie Mae",
        lastUpdated: null,
      },
      {
        name: "Appraisal Transfer & Independence Certification",
        description:
          "Lender certification form confirming compliance with appraisal independence regulations (AIR) and federal/state laws, including attestation of no improper influence on appraisal process",
        apiUrl: "/pdfs/Appraisal-Transfer.pdf",
        source: "UFF",
        lastUpdated: "January 15, 2026",
      },
    ],
  },
  {
    id: "condo",
    title: "Condo Forms",
    forms: [
      {
        name: "Fannie Mae Condo Project Manager",
        description: "Search and verify FHA and Fannie Mae approved condominium projects for loan eligibility",
        url: "https://singlefamily.fanniemae.com/applications-technology/condo-project-manager",
        source: "Fannie Mae",
        lastUpdated: null,
      },
    ],
  },
  {
    id: "nonqm",
    title: "Non-QM Forms",
    forms: [
      {
        name: "Business Narrative Form",
        description:
          "Required form for self-employed borrowers to document their business profile, operations, revenue generation, and any recent disruptions for Ability to Repay (ATR) calculation",
        apiUrl: "/pdfs/NonQM-Business-Narrative-Form.pdf",
        source: "UFF",
        lastUpdated: "January 15, 2026",
      },
    ],
  },
  {
    id: "other",
    title: "Other Forms",
    forms: [
      {
        name: "Credit Report Inquiry Certification",
        description:
          "Borrower certification form documenting all recent credit inquiries within 120 days, including creditor names, dates, purposes, and whether new accounts were opened",
        apiUrl: "/pdfs/Credit-Report-Inquiry-Certification.pdf",
        source: "UFF",
        lastUpdated: "January 15, 2026",
      },
    ],
  },
]
