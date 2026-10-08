/* Non-QM Core blended income and asset depletion. Pure logic, no DOM.
   Rules: Retirement Account Distribution and Asset Depletion; No Ratio Loan. */

export const RULES = {
  factors: { cash: 1.0, securities: 0.7, trust: 1.0, retirementAge: 1.0, retirementUnder: 0.7 },
  retirementAgeMonths: 714, // 59.5 years
  divisorBlended: 36,
  divisorAdOnly: 84,
  maxDti: 0.5,
  noRatioPaymentMonths: 12,
  adMaxLtv: 0.8,
  minLoan: 100000,
  maxLoan: 3500000,
  reserveTiers: [
    [2000000, 6],
    [2500000, 9],
    [3500000, 12],
  ] as const,
}

export type WarningCode = "borrowerDob" | "coBorrowerDob" | "belowMinLoan" | "aboveMaxLoan"

export type BorrowerInput = {
  dob: string
  income: number
  cash: number
  securities: number
  retirement: number
  trust: number
}

export type BlendedIncomeInput = {
  borrower: BorrowerInput
  coBorrower: BorrowerInput | null
  loanAmount: number
  pitia: number
  interestOnly: boolean
  ioPayment: number
  otherDebts: number
  reserveMonths: number | null
}

export type AssetLines = {
  cash: number
  securities: number
  retirement: number
  trust: number
}

export type BorrowerResult = {
  retirementAge: boolean | null
  retFactor: number
  lines: AssetLines
  eligible: number
  otherIncome: number
  ad: number
  ad36: number
  ad84: number
  total: number
}

export type BlendedIncomeResult = {
  borrower: BorrowerResult
  coBorrower: BorrowerResult | null
  blended: boolean
  divisor: number
  otherIncome: number
  adTotal: number
  incomeAfter: number
  lift: number
  ad84Total: number
  ad36Total: number
  payments: number
  dtiBefore: number | null
  dtiAfter: number | null
  dtiBeforePass: boolean
  dtiAfterPass: boolean
  eligibleTotal: number
  matrixMonths: number | null
  reserveMonths: number
  reservePayment: number
  reserves: number
  paymentsCover: number
  noRatioRequired: number
  noRatioPass: boolean
  noRatioGap: number
  warnings: WarningCode[]
}

export const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100

// QUESTION: month-end birthdays can roll forward when 6 months is added with Date
// (May 31 becomes December 1). This matches the reference date math as specified.
export function isRetirementAge(dobISO: string, asOf: Date): boolean | null {
  if (!dobISO) return null
  const d = new Date(dobISO + "T00:00:00")
  if (isNaN(d.getTime())) return null
  const t = new Date(d.getFullYear(), d.getMonth() + 6, d.getDate())
  t.setFullYear(t.getFullYear() + 59)
  const a = new Date(asOf.getFullYear(), asOf.getMonth(), asOf.getDate())
  return t <= a
}

export function matrixReserveMonths(loan: number): number | null {
  if (!(loan > 0)) return null
  for (const [cap, m] of RULES.reserveTiers) if (loan <= cap) return m
  return null
}

export function completedAge(dobISO: string, asOf: Date): number | null {
  if (!dobISO) return null
  const d = new Date(dobISO + "T00:00:00")
  if (isNaN(d.getTime())) return null
  let age = asOf.getFullYear() - d.getFullYear()
  const monthDiff = asOf.getMonth() - d.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && asOf.getDate() < d.getDate())) age -= 1
  return age
}

function borrowerCalc(b: BorrowerInput, asOf: Date): Omit<BorrowerResult, "ad" | "ad36" | "ad84" | "total"> {
  const age = isRetirementAge(b.dob, asOf)
  const retFactor = age ? RULES.factors.retirementAge : RULES.factors.retirementUnder
  const lines = {
    cash: (b.cash || 0) * RULES.factors.cash,
    securities: (b.securities || 0) * RULES.factors.securities,
    retirement: (b.retirement || 0) * retFactor,
    trust: (b.trust || 0) * RULES.factors.trust,
  }
  const eligible = round2(lines.cash + lines.securities + lines.retirement + lines.trust)
  return { retirementAge: age, retFactor, lines, eligible, otherIncome: b.income || 0 }
}

export function calculate(inp: BlendedIncomeInput, asOf: Date = new Date()): BlendedIncomeResult {
  const borrowerBase = borrowerCalc(inp.borrower, asOf)
  const coBase = inp.coBorrower ? borrowerCalc(inp.coBorrower, asOf) : null

  const otherIncome = round2(borrowerBase.otherIncome + (coBase ? coBase.otherIncome : 0))
  const blended = otherIncome > 0
  const divisor = blended ? RULES.divisorBlended : RULES.divisorAdOnly

  const borrower: BorrowerResult = {
    ...borrowerBase,
    ad: round2(borrowerBase.eligible / divisor),
    ad36: round2(borrowerBase.eligible / 36),
    ad84: round2(borrowerBase.eligible / 84),
    total: 0,
  }
  borrower.total = round2(borrower.otherIncome + borrower.ad)

  let coBorrower: BorrowerResult | null = null
  if (coBase) {
    coBorrower = {
      ...coBase,
      ad: round2(coBase.eligible / divisor),
      ad36: round2(coBase.eligible / 36),
      ad84: round2(coBase.eligible / 84),
      total: 0,
    }
    coBorrower.total = round2(coBorrower.otherIncome + coBorrower.ad)
  }

  const eligibleTotal = round2(borrower.eligible + (coBorrower ? coBorrower.eligible : 0))
  const adTotal = round2(borrower.ad + (coBorrower ? coBorrower.ad : 0))
  const incomeAfter = round2(otherIncome + adTotal)

  const pitia = inp.pitia || 0
  const payments = round2(pitia + (inp.otherDebts || 0))
  const dtiBefore = otherIncome > 0 ? payments / otherIncome : null
  const dtiAfter = incomeAfter > 0 ? payments / incomeAfter : null

  const matrixMonths = matrixReserveMonths(inp.loanAmount)
  const reserveMonths = inp.reserveMonths != null ? inp.reserveMonths : matrixMonths || 0
  const reservePayment = inp.interestOnly && inp.ioPayment > 0 ? inp.ioPayment : pitia
  const reserves = round2(reservePayment * reserveMonths)
  const paymentsCover = round2(payments * RULES.noRatioPaymentMonths)
  const noRatioRequired = round2((inp.loanAmount || 0) + reserves + paymentsCover)
  const noRatioPass = (inp.loanAmount || 0) > 0 && eligibleTotal >= noRatioRequired

  const warnings: WarningCode[] = []
  if (borrower.retirementAge === null && inp.borrower.retirement > 0) warnings.push("borrowerDob")
  if (coBorrower && coBorrower.retirementAge === null && inp.coBorrower && inp.coBorrower.retirement > 0) {
    warnings.push("coBorrowerDob")
  }
  if (inp.loanAmount > 0 && inp.loanAmount < RULES.minLoan) warnings.push("belowMinLoan")
  if (inp.loanAmount > RULES.maxLoan) warnings.push("aboveMaxLoan")

  return {
    borrower,
    coBorrower,
    blended,
    divisor,
    otherIncome,
    adTotal,
    incomeAfter,
    lift: adTotal,
    ad84Total: round2(borrower.ad84 + (coBorrower ? coBorrower.ad84 : 0)),
    ad36Total: round2(borrower.ad36 + (coBorrower ? coBorrower.ad36 : 0)),
    payments,
    dtiBefore,
    dtiAfter,
    dtiBeforePass: dtiBefore !== null && dtiBefore <= RULES.maxDti,
    dtiAfterPass: dtiAfter !== null && dtiAfter <= RULES.maxDti,
    eligibleTotal,
    matrixMonths,
    reserveMonths,
    reservePayment,
    reserves,
    paymentsCover,
    noRatioRequired,
    noRatioPass,
    noRatioGap: round2(eligibleTotal - noRatioRequired),
    warnings,
  }
}

export function dtiPercent(ratio: number | null): number | null {
  if (ratio === null) return null
  return round2(ratio * 100)
}
