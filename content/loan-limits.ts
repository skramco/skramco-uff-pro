/** 2026 agency loan limits. Import this file instead of hardcoding amounts in JSX. */
export const loanLimits = {
  year: 2026,
  conforming: 832_750,
  highCostCeiling: 1_249_125,
  fhaLowCostFloor: 541_287,
  fhaSpecialExceptionCeiling: 1_873_625,
  source: "FHFA / HUD",
  asOf: "January 1, 2026",
} as const

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}
