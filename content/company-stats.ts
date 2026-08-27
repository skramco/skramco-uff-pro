/** Single source of truth for company statistics. Do not hardcode stats in JSX. */
export const companyStats = {
  loansFunded: { value: "TODO(UFF): total funded volume", asOf: "TODO(UFF): date" },
  brokerPartners: { value: "TODO(UFF): active broker partner count", asOf: "TODO(UFF): date" },
  yearsInBusiness: { value: "TODO(UFF): confirm founding year", asOf: null },
  avgDaysToClose: { value: "TODO(UFF): avg days, with source", asOf: "TODO(UFF): period" },
  satisfactionRate: { value: "TODO(UFF): satisfaction rate, with source", asOf: "TODO(UFF): period" },
} as const
