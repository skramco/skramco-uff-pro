import type { AssetCategory, BorrowerRole } from "@/types/non-qm-income-analysis"

const ELIGIBILITY_BY_TYPE: Record<AssetCategory, number> = {
  CheckingSavings: 1,
  StocksBondsMutualFunds: 0.7,
  IRA401k403b: 0.7,
  Other: 0.7,
}

export function mapMismoAssetType(assetType: string): AssetCategory {
  const normalized = assetType.toLowerCase()

  if (
    normalized.includes("checking") ||
    normalized.includes("savings") ||
    normalized.includes("moneymarket") ||
    normalized.includes("money_market") ||
    normalized.includes("certificateofdeposit") ||
    normalized.includes("certificate_of_deposit") ||
    normalized.includes("cd")
  ) {
    return "CheckingSavings"
  }

  if (
    normalized.includes("retirement") ||
    normalized.includes("401") ||
    normalized.includes("403") ||
    normalized.includes("ira") ||
    normalized.includes("pension")
  ) {
    return "IRA401k403b"
  }

  if (
    normalized.includes("stock") ||
    normalized.includes("bond") ||
    normalized.includes("mutual") ||
    normalized.includes("investment") ||
    normalized.includes("brokerage") ||
    normalized.includes("trustaccount")
  ) {
    return "StocksBondsMutualFunds"
  }

  return "Other"
}

export function getEligiblePercent(assetType: AssetCategory, age?: number): number {
  const base = ELIGIBILITY_BY_TYPE[assetType]

  if (assetType === "IRA401k403b" && age !== undefined && age >= 59.5) {
    return 1
  }

  return base
}

export function calculateEligibleAmount(cashValue: number, eligiblePercent: number): number {
  return Math.round(cashValue * eligiblePercent * 100) / 100
}

export function assetCategoryLabel(category: AssetCategory): string {
  switch (category) {
    case "CheckingSavings":
      return "Checking / Savings / CD"
    case "StocksBondsMutualFunds":
      return "Stocks / Bonds / Mutual Funds"
    case "IRA401k403b":
      return "IRA / 401k / 403b"
    default:
      return "Other Liquid Asset"
  }
}

export function sumEligibleByBorrower(
  assets: Array<{ borrowerRole: BorrowerRole; eligibleAmount: number; isReserve: boolean }>,
  role: BorrowerRole,
  excludeReserves = false,
): number {
  return assets
    .filter((asset) => asset.borrowerRole === role && (!excludeReserves || !asset.isReserve))
    .reduce((sum, asset) => sum + asset.eligibleAmount, 0)
}
