import type { IncomeAnalysisInput, IncomeAnalysisResults } from "@/types/non-qm-income-analysis"
import { sumEligibleByBorrower } from "@/lib/asset-eligibility"

function round(value: number): number {
  return Math.round(value * 100) / 100
}

function calculateBusinessIncome(rows: IncomeAnalysisInput["businessIncomeRows"]): number {
  return rows
    .filter((row) => row.included)
    .reduce((sum, row) => sum + row.monthlyBusinessIncome, 0)
}

function calculateMonthlyBusinessIncome(
  monthlyDeposits: number,
  expenseFactor: number,
  ownershipPercent: number,
): number {
  const netDeposits = monthlyDeposits * (1 - expenseFactor / 100)
  return round(netDeposits * (ownershipPercent / 100))
}

export function recalculateBusinessRow(
  row: IncomeAnalysisInput["businessIncomeRows"][number],
): IncomeAnalysisInput["businessIncomeRows"][number] {
  const expenseFactor = row.accountType === "Personal" ? 0 : row.expenseFactor
  return {
    ...row,
    expenseFactor,
    monthlyBusinessIncome: calculateMonthlyBusinessIncome(
      row.monthlyDeposits,
      expenseFactor,
      row.ownershipPercent,
    ),
  }
}

export function calculateIncomeAnalysis(input: IncomeAnalysisInput): IncomeAnalysisResults {
  const bankStatementIncome = calculateBusinessIncome(input.businessIncomeRows)

  const borrowerEligible = round(sumEligibleByBorrower(input.assets, "B"))
  const coBorrowerEligible = round(sumEligibleByBorrower(input.assets, "C"))
  const totalEligibleAssetsAll = round(borrowerEligible + coBorrowerEligible)

  const borrowerDepletion36 = round(borrowerEligible / 36)
  const coBorrowerDepletion36 = round(coBorrowerEligible / 36)
  const borrowerDepletion84 = round(borrowerEligible / 84)
  const coBorrowerDepletion84 = round(coBorrowerEligible / 84)

  const assetIncome =
    input.residentialDepletionMonths === 84
      ? round(borrowerDepletion84 + coBorrowerDepletion84)
      : round(borrowerDepletion36 + coBorrowerDepletion36)

  const totalQualifyingIncome = round(
    input.loan.baseQualifyingIncome + bankStatementIncome + assetIncome,
  )

  const totalMonthlyDebt =
    input.loan.pitiaMonthly + input.loan.totalMonthlyLiabilities

  const nonQmDti =
    totalQualifyingIncome > 0 ? round((totalMonthlyDebt / totalQualifyingIncome) * 100) : 0

  const dscrRatio =
    totalMonthlyDebt > 0
      ? round(input.loan.baseQualifyingIncome / totalMonthlyDebt)
      : 0

  const reservesRequiredAmount = round(input.loan.pitiaMonthly * input.reserveMonthsRequired)
  const noRatioRequiredAssets = round(input.loan.noteAmount + reservesRequiredAmount)
  const noRatioEligible = totalEligibleAssetsAll >= noRatioRequiredAssets

  const selfEmployed = input.borrowers.some((borrower) => borrower.isSelfEmployed)

  return {
    nonQmDti,
    dscrRatio,
    noRatioEligible,
    noRatioStatus: noRatioEligible ? "Pass" : "Fail",
    assetIncome,
    bankStatementIncome,
    selfEmployed,
    totalEligibleAssetsBorrower: borrowerEligible,
    totalEligibleAssetsCoBorrower: coBorrowerEligible,
    totalEligibleAssetsAll,
    borrowerDepletion36,
    coBorrowerDepletion36,
    borrowerDepletion84,
    coBorrowerDepletion84,
    reservesRequiredAmount,
    noRatioRequiredAssets,
    totalQualifyingIncome,
  }
}

export function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatPercent(value: number): string {
  return `${value.toFixed(3)}%`
}

export function calculateAge(dateOfBirth?: string): number | undefined {
  if (!dateOfBirth) return undefined

  const dob = new Date(dateOfBirth)
  if (Number.isNaN(dob.getTime())) return undefined

  const today = new Date()
  const years = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  const dayDiff = today.getDate() - dob.getDate()

  const age = years + (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? -1 : 0)
  const fractional =
    (today.getTime() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000)

  return Math.round(fractional * 100) / 100
}
