import { XMLParser } from "fast-xml-parser"
import type {
  AssetRow,
  BorrowerInfo,
  BusinessIncomeRow,
  IncomeAnalysisInput,
  LoanSummary,
} from "@/types/non-qm-income-analysis"
import {
  calculateEligibleAmount,
  getEligiblePercent,
  mapMismoAssetType,
} from "@/lib/asset-eligibility"
import { calculateAge } from "@/lib/asset-depletion-calculator"

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
  removeNSPrefix: true,
  trimValues: true,
  parseTagValue: true,
  parseAttributeValue: true,
})

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

function findNodes(node: unknown, tagName: string): unknown[] {
  if (!node || typeof node !== "object") return []

  const results: unknown[] = []
  const record = node as Record<string, unknown>

  for (const [key, value] of Object.entries(record)) {
    if (key === tagName) {
      results.push(...asArray(value))
    } else if (value && typeof value === "object") {
      results.push(...findNodes(value, tagName))
    }
  }

  return results
}

function firstString(node: unknown, keys: string[]): string {
  if (!node || typeof node !== "object") return ""

  const record = node as Record<string, unknown>
  for (const key of keys) {
    const value = record[key]
    if (value !== undefined && value !== null && typeof value !== "object") {
      return toString(value)
    }
  }

  for (const value of Object.values(record)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nested = firstString(value, keys)
      if (nested) return nested
    }
  }

  return ""
}

function firstNumber(node: unknown, keys: string[]): number {
  if (!node || typeof node !== "object") return 0

  const record = node as Record<string, unknown>
  for (const key of keys) {
    const value = record[key]
    if (value !== undefined && value !== null && typeof value !== "object") {
      return toNumber(value)
    }
  }

  for (const value of Object.values(record)) {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      const nested = firstNumber(value, keys)
      if (nested) return nested
    }
  }

  return 0
}

function createId(prefix: string, index: number): string {
  return `${prefix}-${index}-${Math.random().toString(36).slice(2, 8)}`
}

function getNodeLabel(node: unknown): string {
  if (!node || typeof node !== "object") return ""
  const record = node as Record<string, unknown>
  return toString(record.label ?? record["xlink:label"] ?? "")
}

function buildAssetBorrowerRoleMap(parsed: unknown): Map<string, BorrowerInfo["role"]> {
  const map = new Map<string, BorrowerInfo["role"]>()
  const relationships = findNodes(parsed, "RELATIONSHIP")

  relationships.forEach((relationship) => {
    const arcrole = firstString(relationship, ["arcrole", "xlink:arcrole"]).toLowerCase()
    if (!arcrole.includes("asset_isassociatedwith_role")) return

    const assetLabel = firstString(relationship, ["from", "xlink:from"])
    const roleLabel = firstString(relationship, ["to", "xlink:to"]).toLowerCase()

    if (!assetLabel) return

    const borrowerRole: BorrowerInfo["role"] =
      roleLabel.includes("coborrower") ||
      roleLabel.includes("borrower_2") ||
      roleLabel.includes("borrower2")
        ? "C"
        : "B"

    map.set(assetLabel, borrowerRole)
  })

  return map
}

function parseBorrowers(parties: unknown[]): BorrowerInfo[] {
  const borrowers: BorrowerInfo[] = []

  parties.forEach((party) => {
    const roles = findNodes(party, "ROLE")
    const borrowerRoles = roles.filter((role) => {
      const roleType = firstString(role, ["PartyRoleType", "RoleType"]).toLowerCase()
      return roleType.includes("borrower")
    })

    const rolesToProcess = borrowerRoles.length > 0 ? borrowerRoles : roles

    rolesToProcess.forEach((role, roleIndex) => {
      const roleType = firstString(role, ["PartyRoleType", "RoleType"]).toLowerCase()
      if (roleType && !roleType.includes("borrower")) return

      const borrowerNode = findNodes(role, "BORROWER")[0] ?? role
      const individual = (party as Record<string, unknown>).INDIVIDUAL ?? party
      const nameNode =
        (individual as Record<string, unknown>).NAME ??
        findNodes(party, "NAME")[0] ??
        party

      const firstName = firstString(nameNode, ["FirstName", "FirstNameText"])
      const lastName = firstString(nameNode, ["LastName", "LastNameText"])
      const dateOfBirth =
        firstString(borrowerNode, ["BorrowerBirthDate", "BirthDate"]) ||
        firstString(party, ["BorrowerBirthDate", "BirthDate"])

      const selfEmployedIndicator = [
        firstString(borrowerNode, ["SelfEmployedIndicator"]),
        firstString(party, ["SelfEmployedIndicator", "EmploymentBorrowerSelfEmployedIndicator"]),
        ...findNodes(party, "EMPLOYMENT").map((employment) =>
          firstString(employment, ["EmploymentBorrowerSelfEmployedIndicator"]),
        ),
      ]
        .join(" ")
        .toLowerCase()

      const isCoBorrower =
        roleType.includes("co") ||
        getNodeLabel(role).toLowerCase().includes("coborrower") ||
        getNodeLabel(role).toLowerCase().includes("borrower_2")

      const roleAssignment: BorrowerInfo["role"] =
        isCoBorrower || (borrowers.length > 0 && roleIndex > 0) ? "C" : "B"

      if (!firstName && !lastName && !dateOfBirth) return

      borrowers.push({
        role: roleAssignment,
        firstName,
        lastName,
        dateOfBirth: dateOfBirth || undefined,
        age: calculateAge(dateOfBirth || undefined),
        isSelfEmployed:
          selfEmployedIndicator.includes("true") || selfEmployedIndicator.includes("y"),
      })
    })
  })

  if (borrowers.length === 0) {
    borrowers.push({
      role: "B",
      firstName: "",
      lastName: "",
      isSelfEmployed: false,
    })
  }

  return borrowers
}

function parseAssets(
  assets: unknown[],
  borrowers: BorrowerInfo[],
  assetBorrowerRoleMap: Map<string, BorrowerInfo["role"]>,
): AssetRow[] {
  return assets.map((asset, index) => {
    const assetDetail = findNodes(asset, "ASSET_DETAIL")[0] ?? asset
    const assetHolder = findNodes(asset, "ASSET_HOLDER")[0]

    const assetTypeRaw =
      firstString(assetDetail, ["AssetType", "AssetTypeOtherDescription"]) ||
      firstString(asset, ["AssetType", "AssetTypeOtherDescription"])
    const category = mapMismoAssetType(assetTypeRaw)
    const cashValue =
      firstNumber(assetDetail, [
        "AssetCashOrMarketValueAmount",
        "AssetCashOrMarketValueAmountValue",
      ]) ||
      firstNumber(asset, ["AssetCashOrMarketValueAmount", "AssetCashOrMarketValueAmountValue"])

    const accountIdentifier =
      firstString(assetDetail, [
        "AssetAccountIdentifier",
        "FinancialInstitutionAccountIdentifier",
      ]) ||
      firstString(asset, ["AssetAccountIdentifier", "FinancialInstitutionAccountIdentifier"])
    const institutionName =
      firstString(assetHolder, ["FullName", "FinancialInstitutionName", "AssetHolderName"]) ||
      firstString(asset, ["FinancialInstitutionName", "AssetHolderName"])
    const assetDescription = firstString(assetDetail, [
      "AssetDescription",
      "AssetTypeOtherDescription",
    ])

    const assetLabel = getNodeLabel(asset)
    const holderRole = firstString(asset, ["AssetHolderType", "PartyRoleType"]).toLowerCase()
    const borrowerRole: AssetRow["borrowerRole"] =
      (assetLabel ? assetBorrowerRoleMap.get(assetLabel) : undefined) ??
      (holderRole.includes("co") || holderRole.includes("secondary") ? "C" : "B")

    const borrowerAge = borrowers.find((b) => b.role === borrowerRole)?.age
    const eligiblePercent = getEligiblePercent(category, borrowerAge)
    const resolvedCashValue =
      cashValue ||
      firstNumber(findNodes(asset, "ASSET_DETAIL")[0] ?? asset, ["AssetCashOrMarketValueAmount"])

    const notes = [assetDescription, institutionName].filter(Boolean).join(" - ")

    return {
      id: createId("asset", index),
      assetType: category,
      cashValue: resolvedCashValue,
      borrowerRole,
      eligiblePercent,
      eligibleAmount: calculateEligibleAmount(resolvedCashValue, eligiblePercent),
      assetName: institutionName || assetTypeRaw || "Asset",
      accountNumber: accountIdentifier,
      notes,
      isReserve: notes.toLowerCase().includes("reserve"),
    }
  })
}

function parseLiabilities(liabilities: unknown[]): number {
  return liabilities.reduce((sum, liability) => {
    const liabilityDetail = findNodes(liability, "LIABILITY_DETAIL")[0] ?? liability
    const monthlyPayment = firstNumber(liabilityDetail, [
      "LiabilityMonthlyPaymentAmount",
      "MonthlyPaymentAmount",
    ])
    return sum + monthlyPayment
  }, 0)
}

function parseLoanSummary(parsed: unknown, liabilitiesTotal: number): LoanSummary {
  const loans = findNodes(parsed, "LOAN")
  const loan = loans[0] ?? {}

  const termsOfLoan = findNodes(loan, "TERMS_OF_LOAN")[0] ?? loan
  const noteAmount = firstNumber(termsOfLoan, ["BaseLoanAmount", "NoteAmount", "LoanAmount"])
  const pitiaMonthly = firstNumber(loan, [
    "TotalMonthlyPaymentAmount",
    "ProposedHousingExpenseTotalMonthlyPaymentAmount",
    "HousingExpenseProposedTotalMonthlyPaymentAmount",
  ])

  const housingExpenses = findNodes(loan, "HOUSING_EXPENSE")
  const housingTotal = housingExpenses.reduce((sum, expense) => {
    const timing = firstString(expense, ["HousingExpenseTimingType", "TimingType"]).toLowerCase()
    if (timing && !timing.includes("proposed")) return sum
    return sum + firstNumber(expense, ["HousingExpensePaymentAmount", "PaymentAmount"])
  }, 0)

  const incomes = findNodes(parsed, "CURRENT_INCOME_ITEM")
  const baseQualifyingIncome = incomes.reduce((sum, income) => {
    const amount = firstNumber(income, [
      "CurrentIncomeMonthlyTotalAmount",
      "IncomeAmount",
      "MonthlyIncomeAmount",
    ])
    return sum + amount
  }, 0)

  const property = findNodes(parsed, "SUBJECT_PROPERTY")[0] ?? findNodes(parsed, "PROPERTY")[0]
  const addressNode = findNodes(property, "ADDRESS")[0] ?? property
  const propertyAddress = [
    firstString(addressNode, ["AddressLineText", "AddressLine1"]),
    firstString(addressNode, ["CityName", "City"]),
    firstString(addressNode, ["StateCode", "State"]),
    firstString(addressNode, ["PostalCode", "ZipCode"]),
  ]
    .filter(Boolean)
    .join(", ")

  return {
    noteAmount,
    pitiaMonthly: pitiaMonthly || housingTotal,
    totalMonthlyLiabilities: liabilitiesTotal,
    baseQualifyingIncome,
    propertyAddress: propertyAddress || undefined,
    loanPurpose: firstString(loan, ["LoanPurposeType", "PurposeType"]) || undefined,
  }
}

function parseBusinessIncome(employers: unknown[]): BusinessIncomeRow[] {
  return employers.map((employer, index) => {
    const legalEntity = findNodes(employer, "LEGAL_ENTITY_DETAIL")[0]
    const companyName =
      firstString(legalEntity ?? employer, ["FullName", "LegalEntityFullName"]) ||
      firstString(employer, ["EmployerName", "FullName"])
    const monthlyDeposits = firstNumber(employer, [
      "MonthlyDepositsAmount",
      "EmploymentMonthlyIncomeAmount",
    ])
    const ownershipPercent = firstNumber(employer, ["OwnershipInterestPercent"]) || 100
    const employment = findNodes(employer, "EMPLOYMENT")[0] ?? employer
    const selfEmployed = firstString(employment, [
      "EmploymentBorrowerSelfEmployedIndicator",
    ]).toLowerCase()

    return {
      id: createId("business", index),
      included: selfEmployed === "true" || selfEmployed === "y",
      companyName,
      ownershipPercent,
      businessType: firstString(employer, ["EmploymentClassificationType", "BusinessType"]) || "Other",
      monthlyDeposits,
      accountType: "Business",
      employeeCount: "0",
      productServiceSold: "",
      expenseFactor: 50,
      monthlyBusinessIncome: 0,
    }
  })
}

export function parseMismoXml(xmlContent: string): IncomeAnalysisInput {
  const parsed = parser.parse(xmlContent)
  const parties = findNodes(parsed, "PARTY")
  const assets = findNodes(parsed, "ASSET")
  const liabilities = findNodes(parsed, "LIABILITY")
  const employers = findNodes(parsed, "EMPLOYER")
  const assetBorrowerRoleMap = buildAssetBorrowerRoleMap(parsed)

  const borrowers = parseBorrowers(parties)
  const loan = parseLoanSummary(parsed, parseLiabilities(liabilities))

  return {
    borrowers,
    businessIncomeRows: parseBusinessIncome(employers),
    assets: parseAssets(assets, borrowers, assetBorrowerRoleMap),
    loan,
    reserveMonthsRequired: 6,
    residentialDepletionMonths: 36,
  }
}

export function mergeExternalAnalysis(
  local: IncomeAnalysisInput,
  external: Record<string, unknown>,
): IncomeAnalysisInput {
  const analysis = (external.analysis ?? external) as Partial<IncomeAnalysisInput>

  return {
    borrowers: analysis.borrowers?.length ? analysis.borrowers : local.borrowers,
    businessIncomeRows: analysis.businessIncomeRows?.length
      ? analysis.businessIncomeRows
      : local.businessIncomeRows,
    assets: analysis.assets?.length ? analysis.assets : local.assets,
    loan: { ...local.loan, ...(analysis.loan ?? {}) },
    reserveMonthsRequired: analysis.reserveMonthsRequired ?? local.reserveMonthsRequired,
    residentialDepletionMonths:
      analysis.residentialDepletionMonths ?? local.residentialDepletionMonths,
  }
}
