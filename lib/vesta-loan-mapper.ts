import { mergeExternalAnalysis } from "@/lib/mismo-parser"
import {
  calculateEligibleAmount,
  getEligiblePercent,
  mapMismoAssetType,
} from "@/lib/asset-eligibility"
import { calculateAge } from "@/lib/asset-depletion-calculator"
import type {
  AssetRow,
  BorrowerInfo,
  BusinessIncomeRow,
  IncomeAnalysisInput,
  LoanSummary,
} from "@/types/non-qm-income-analysis"

function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0
  if (typeof value === "string") {
    const parsed = Number(value.replace(/[$,]/g, ""))
    return Number.isFinite(parsed) ? parsed : 0
  }
  return 0
}

function toString(value: unknown): string {
  if (value === undefined || value === null) return ""
  return String(value).trim()
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value)
}

function pickArray(root: Record<string, unknown>, keys: string[]): unknown[] {
  for (const key of keys) {
    const value = root[key]
    if (value !== undefined) return asArray(value)
  }
  return []
}

function pickNumber(obj: Record<string, unknown>, keys: string[]): number {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && typeof obj[key] !== "object") {
      return toNumber(obj[key])
    }
  }
  return 0
}

function pickString(obj: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    if (obj[key] !== undefined && obj[key] !== null && typeof obj[key] !== "object") {
      return toString(obj[key])
    }
  }
  return ""
}

function createId(prefix: string, index: number): string {
  return `${prefix}-vesta-${index}-${Math.random().toString(36).slice(2, 8)}`
}

function resolveLoanRoot(external: unknown): Record<string, unknown> | null {
  if (!isRecord(external)) return null

  if (isRecord(external.analysis)) {
    return external.analysis
  }

  if (isRecord(external.loan)) {
    return external.loan
  }

  if (isRecord(external.data)) {
    return external.data
  }

  return external
}

function mapVestaBorrowers(loan: Record<string, unknown>, local: BorrowerInfo[]): BorrowerInfo[] {
  const rawBorrowers = pickArray(loan, [
    "borrowers",
    "Borrowers",
    "parties",
    "Parties",
    "applicants",
    "Applicants",
  ])

  if (rawBorrowers.length === 0) return local.borrowers

  const mapped = rawBorrowers
    .map((entry, index): BorrowerInfo | null => {
      if (!isRecord(entry)) return null

      const roleType = pickString(entry, ["partyRoleType", "PartyRoleType", "roleType", "type"]).toLowerCase()
      if (roleType && !roleType.includes("borrower")) return null

      const firstName = pickString(entry, ["firstName", "FirstName", "givenName"])
      const lastName = pickString(entry, ["lastName", "LastName", "familyName"])
      const dateOfBirth = pickString(entry, [
        "dateOfBirth",
        "DateOfBirth",
        "borrowerBirthDate",
        "BorrowerBirthDate",
        "birthDate",
      ])

      if (!firstName && !lastName && !dateOfBirth) return null

      const isCoBorrower =
        roleType.includes("co") ||
        pickString(entry, ["borrowerType", "BorrowerType"]).toLowerCase().includes("co")

      return {
        role: isCoBorrower ? "C" : index === 0 ? "B" : "C",
        firstName,
        lastName,
        dateOfBirth: dateOfBirth || undefined,
        age: calculateAge(dateOfBirth || undefined),
        isSelfEmployed:
          pickString(entry, ["selfEmployedIndicator", "SelfEmployedIndicator", "isSelfEmployed"]).toLowerCase() ===
            "true" || pickString(entry, ["isSelfEmployed"]).toLowerCase() === "true",
      }
    })
    .filter((borrower): borrower is BorrowerInfo => borrower !== null)

  if (mapped.length === 0) return local.borrowers

  const hasPrimary = mapped.some((borrower) => borrower.role === "B")
  if (!hasPrimary) mapped[0].role = "B"

  return mapped
}

function mapVestaAssets(
  loan: Record<string, unknown>,
  borrowers: BorrowerInfo[],
  local: AssetRow[],
): AssetRow[] {
  const rawAssets = pickArray(loan, ["assets", "Assets", "assetCatalog", "AssetCatalog"])

  if (rawAssets.length === 0) return local.assets

  return rawAssets.map((entry, index): AssetRow => {
    if (!isRecord(entry)) {
      return local.assets[index] ?? {
        id: createId("asset", index),
        assetType: "Other",
        cashValue: 0,
        borrowerRole: "B",
        eligiblePercent: 0.7,
        eligibleAmount: 0,
        assetName: "",
        accountNumber: "",
        notes: "",
        isReserve: false,
      }
    }

    const assetTypeRaw = pickString(entry, [
      "assetType",
      "AssetType",
      "type",
      "assetTypeOtherDescription",
    ])
    const category = mapMismoAssetType(assetTypeRaw)
    const cashValue = pickNumber(entry, [
      "cashValue",
      "CashValue",
      "assetCashOrMarketValueAmount",
      "AssetCashOrMarketValueAmount",
      "marketValue",
      "amount",
    ])

    const borrowerRoleRaw = pickString(entry, [
      "borrowerRole",
      "BorrowerRole",
      "ownerType",
      "holderType",
    ]).toLowerCase()
    const borrowerRole: AssetRow["borrowerRole"] =
      borrowerRoleRaw.includes("co") || borrowerRoleRaw === "c" ? "C" : "B"

    const borrowerAge = borrowers.find((borrower) => borrower.role === borrowerRole)?.age
    const eligiblePercent = getEligiblePercent(category, borrowerAge)
    const institutionName = pickString(entry, [
      "institutionName",
      "FinancialInstitutionName",
      "assetHolderName",
      "holderName",
      "name",
    ])
    const accountNumber = pickString(entry, [
      "accountNumber",
      "AccountNumber",
      "assetAccountIdentifier",
      "AssetAccountIdentifier",
    ])
    const notes = pickString(entry, ["notes", "Notes", "description", "Description"])

    return {
      id: createId("asset", index),
      assetType: category,
      cashValue,
      borrowerRole,
      eligiblePercent,
      eligibleAmount: calculateEligibleAmount(cashValue, eligiblePercent),
      assetName: institutionName || assetTypeRaw || "Asset",
      accountNumber,
      notes,
      isReserve: notes.toLowerCase().includes("reserve"),
    }
  })
}

function mapVestaLiabilities(loan: Record<string, unknown>): number {
  const rawLiabilities = pickArray(loan, ["liabilities", "Liabilities", "debts", "Debts"])

  return rawLiabilities.reduce((sum, entry) => {
    if (!isRecord(entry)) return sum
    return (
      sum +
      pickNumber(entry, [
        "monthlyPaymentAmount",
        "MonthlyPaymentAmount",
        "liabilityMonthlyPaymentAmount",
        "LiabilityMonthlyPaymentAmount",
        "monthlyPayment",
      ])
    )
  }, 0)
}

function mapVestaLoanSummary(loan: Record<string, unknown>, liabilitiesTotal: number): LoanSummary {
  const housingExpenses = pickArray(loan, ["housingExpenses", "HousingExpenses"])
  const housingTotal = housingExpenses.reduce((sum, expense) => {
    if (!isRecord(expense)) return sum
    const timing = pickString(expense, ["timingType", "HousingExpenseTimingType", "timing"]).toLowerCase()
    if (timing && !timing.includes("proposed") && timing !== "present") return sum
    return (
      sum +
      pickNumber(expense, [
        "paymentAmount",
        "PaymentAmount",
        "housingExpensePaymentAmount",
        "HousingExpensePaymentAmount",
        "amount",
      ])
    )
  }, 0)

  const incomes = pickArray(loan, [
    "currentIncomeItems",
    "CurrentIncomeItems",
    "incomes",
    "Incomes",
    "currentIncome",
  ])
  const baseQualifyingIncome = incomes.reduce((sum, income) => {
    if (!isRecord(income)) return sum
    return (
      sum +
      pickNumber(income, [
        "monthlyAmount",
        "MonthlyAmount",
        "currentIncomeMonthlyTotalAmount",
        "CurrentIncomeMonthlyTotalAmount",
        "amount",
      ])
    )
  }, 0)

  const property = isRecord(loan.property) ? loan.property : isRecord(loan.subjectProperty) ? loan.subjectProperty : null
  const address = property && isRecord(property.address) ? property.address : property

  const propertyAddress = address
    ? [
        pickString(address, ["line1", "Line1", "addressLineText", "AddressLineText"]),
        pickString(address, ["city", "City", "cityName", "CityName"]),
        pickString(address, ["state", "State", "stateCode", "StateCode"]),
        pickString(address, ["zip", "Zip", "postalCode", "PostalCode"]),
      ]
        .filter(Boolean)
        .join(", ")
    : pickString(loan, ["propertyAddress", "PropertyAddress"]) || undefined

  const noteAmount = pickNumber(loan, [
    "baseLoanAmount",
    "BaseLoanAmount",
    "loanAmount",
    "LoanAmount",
    "noteAmount",
    "NoteAmount",
  ])

  const pitiaMonthly = pickNumber(loan, [
    "proposedHousingExpenseTotal",
    "ProposedHousingExpenseTotal",
    "totalMonthlyPaymentAmount",
    "TotalMonthlyPaymentAmount",
    "pitia",
    "PITIA",
  ])

  return {
    noteAmount,
    pitiaMonthly: pitiaMonthly || housingTotal,
    totalMonthlyLiabilities: liabilitiesTotal,
    baseQualifyingIncome,
    propertyAddress,
    loanPurpose: pickString(loan, ["loanPurposeType", "LoanPurposeType", "purpose"]) || undefined,
  }
}

function mapVestaEmployers(loan: Record<string, unknown>): BusinessIncomeRow[] {
  const rawEmployers = pickArray(loan, ["employers", "Employers", "employments", "Employments"])

  return rawEmployers
    .map((entry, index): BusinessIncomeRow | null => {
      if (!isRecord(entry)) return null

      const selfEmployed =
        pickString(entry, [
          "selfEmployedIndicator",
          "SelfEmployedIndicator",
          "employmentBorrowerSelfEmployedIndicator",
          "isSelfEmployed",
        ]).toLowerCase() === "true"

      if (!selfEmployed) return null

      const companyName = pickString(entry, [
        "companyName",
        "CompanyName",
        "employerName",
        "EmployerName",
        "name",
        "fullName",
      ])

      return {
        id: createId("business", index),
        included: true,
        companyName,
        ownershipPercent: pickNumber(entry, ["ownershipPercent", "OwnershipInterestPercent"]) || 100,
        businessType:
          pickString(entry, ["businessType", "BusinessType", "employmentClassificationType"]) || "Other",
        monthlyDeposits: pickNumber(entry, ["monthlyDeposits", "MonthlyDeposits", "monthlyDepositsAmount"]),
        accountType: "Business",
        employeeCount: "0",
        productServiceSold: pickString(entry, ["productServiceSold", "positionDescription"]) || "",
        expenseFactor: 50,
        monthlyBusinessIncome: 0,
      }
    })
    .filter((row): row is BusinessIncomeRow => row !== null)
}

export function mapVestaResponseToAnalysis(
  external: unknown,
  local: IncomeAnalysisInput,
): IncomeAnalysisInput {
  if (!external || typeof external !== "object") return local

  const record = external as Record<string, unknown>

  if (record.analysis && isRecord(record.analysis)) {
    return mergeExternalAnalysis(local, record)
  }

  const loanRoot = resolveLoanRoot(external)
  if (!loanRoot) return local

  const borrowers = mapVestaBorrowers(loanRoot, local)
  const liabilitiesTotal = mapVestaLiabilities(loanRoot)
  const loan = mapVestaLoanSummary(loanRoot, liabilitiesTotal)
  const assets = mapVestaAssets(loanRoot, borrowers, local)
  const businessIncomeRows = mapVestaEmployers(loanRoot)

  return {
    borrowers: borrowers.length ? borrowers : local.borrowers,
    businessIncomeRows: businessIncomeRows.length ? businessIncomeRows : local.businessIncomeRows,
    assets: assets.length ? assets : local.assets,
    loan: { ...local.loan, ...loan },
    reserveMonthsRequired: local.reserveMonthsRequired,
    residentialDepletionMonths: local.residentialDepletionMonths,
  }
}
