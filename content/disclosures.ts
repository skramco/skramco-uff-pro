export const PROFESSIONAL_USE_NOTICE =
  "For mortgage professionals only. Not intended for distribution to consumers."

export const NMLS_ID = "34381"

export const COMPANY_ADDRESS_LINES = [
  "1300 NW Briarcliff Pkwy #275",
  "Kansas City, MO 64116",
] as const

export const COMPANY_PHONE = "(855) 95-EAGLE"

/**
 * Full legal copy for /licensing only.
 * TODO(UFF): legal review of the replacement "advertisement" wording below.
 */
export const FULL_DISCLOSURES = {
  licensing:
    "United Fidelity Funding Corp is licensed as a mortgage lender/broker in multiple states. Not all products and services are available in all states. Credit and collateral are subject to approval. Terms and conditions apply. Programs, rates, terms and conditions are subject to change without notice.",
  federal:
    "This company is an Equal Housing Lender. We do not discriminate on the basis of race, color, religion, national origin, sex, handicap, familial status, or age in the origination of mortgage loans. Complaints may be filed with the Consumer Financial Protection Bureau at consumerfinance.gov or by calling (855) 411-2372.",
  // Replaces the contradictory "this is not an advertisement" line.
  important:
    "TODO(UFF): legal review. This website describes wholesale mortgage products and services for licensed mortgage professionals. It is not a commitment to lend. All loans are subject to underwriting approval. Restrictions may apply. Interest rates and program terms are subject to change without notice.",
  privacy:
    "We are committed to protecting your privacy. Information collected may be shared with affiliates and third parties as described in our Privacy Policy. By providing your information, you consent to be contacted regarding mortgage services.",
} as const
