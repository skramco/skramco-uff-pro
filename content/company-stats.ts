/** Single source of truth for company statistics. Do not hardcode stats in JSX.
 * Placeholder figures — replace with verified numbers. */
export const companyStats = {
  loansFunded: { value: "$4.2B", asOf: "T12M through July 31, 2026" },
  brokerPartners: { value: "1,240", asOf: "August 1, 2026" },
  yearsInBusiness: { value: "25", asOf: null },
  avgDaysToClose: { value: "24 days", asOf: "Q2 2026 funded files" },
  satisfactionRate: { value: "96%", asOf: "Q2 2026 broker survey, n=186" },
} as const
