export type BorrowerRole = "B" | "C"

export type AssetCategory =
  | "CheckingSavings"
  | "StocksBondsMutualFunds"
  | "IRA401k403b"
  | "Other"

export interface BorrowerInfo {
  role: BorrowerRole
  firstName: string
  lastName: string
  dateOfBirth?: string
  age?: number
  isSelfEmployed: boolean
}

export interface BusinessIncomeRow {
  id: string
  included: boolean
  companyName: string
  ownershipPercent: number
  businessType: string
  monthlyDeposits: number
  accountType: "Business" | "Personal"
  employeeCount: string
  productServiceSold: string
  expenseFactor: number
  monthlyBusinessIncome: number
}

export interface AssetRow {
  id: string
  assetType: AssetCategory
  cashValue: number
  borrowerRole: BorrowerRole
  eligiblePercent: number
  eligibleAmount: number
  assetName: string
  accountNumber: string
  notes: string
  isReserve: boolean
}

export interface LoanSummary {
  noteAmount: number
  pitiaMonthly: number
  totalMonthlyLiabilities: number
  baseQualifyingIncome: number
  propertyAddress?: string
  loanPurpose?: string
}

export interface IncomeAnalysisInput {
  borrowers: BorrowerInfo[]
  businessIncomeRows: BusinessIncomeRow[]
  assets: AssetRow[]
  loan: LoanSummary
  reserveMonthsRequired: number
  residentialDepletionMonths: 36 | 84
}

export interface IncomeAnalysisResults {
  nonQmDti: number
  dscrRatio: number
  noRatioEligible: boolean
  noRatioStatus: "Pass" | "Fail"
  assetIncome: number
  bankStatementIncome: number
  selfEmployed: boolean
  totalEligibleAssetsBorrower: number
  totalEligibleAssetsCoBorrower: number
  totalEligibleAssetsAll: number
  borrowerDepletion36: number
  coBorrowerDepletion36: number
  borrowerDepletion84: number
  coBorrowerDepletion84: number
  reservesRequiredAmount: number
  noRatioRequiredAssets: number
  totalQualifyingIncome: number
}

export interface MismoParseResponse {
  source: "local" | "external"
  raw?: Record<string, unknown>
  analysis: IncomeAnalysisInput
}
