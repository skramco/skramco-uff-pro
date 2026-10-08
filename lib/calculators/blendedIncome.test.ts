import { describe, expect, it } from "vitest"
import {
  type BlendedIncomeInput,
  type BorrowerInput,
  calculate,
  dtiPercent,
  isRetirementAge,
  matrixReserveMonths,
} from "./blendedIncome"

const asOf = new Date(2026, 9, 7)

const emptyBorrower = (overrides: Partial<BorrowerInput> = {}): BorrowerInput => ({
  dob: "",
  income: 0,
  cash: 0,
  securities: 0,
  retirement: 0,
  trust: 0,
  ...overrides,
})

const loanDefaults = {
  loanAmount: 0,
  pitia: 0,
  interestOnly: false,
  ioPayment: 0,
  otherDebts: 0,
  reserveMonths: null,
}

describe("vector A sample file", () => {
  const input: BlendedIncomeInput = {
    borrower: emptyBorrower({
      dob: "1974-03-12",
      income: 13550.25,
      cash: 5800,
      securities: 34000,
      retirement: 85000,
    }),
    coBorrower: emptyBorrower({
      dob: "1978-08-02",
      income: 6500,
      cash: 6300,
      securities: 47500,
      retirement: 115000,
    }),
    ...loanDefaults,
    loanAmount: 1100000,
    pitia: 8450,
    otherDebts: 2150,
  }

  const result = calculate(input, asOf)

  it("matches eligible assets, depletion, DTI, and No Ratio", () => {
    expect(result.borrower.eligible).toBe(89100)
    expect(result.borrower.ad).toBe(2475)
    expect(result.coBorrower?.eligible).toBe(120050)
    expect(result.coBorrower?.ad).toBe(3334.72)
    expect(result.divisor).toBe(36)
    expect(result.blended).toBe(true)
    expect(result.otherIncome).toBe(20050.25)
    expect(result.incomeAfter).toBe(25859.97)
    expect(result.ad84Total).toBe(2489.88)
    expect(result.payments).toBe(10600)
    expect(dtiPercent(result.dtiBefore)).toBe(52.87)
    expect(dtiPercent(result.dtiAfter)).toBe(40.99)
    expect(result.reserveMonths).toBe(6)
    expect(result.reserves).toBe(50700)
    expect(result.noRatioRequired).toBe(1277900)
    expect(result.noRatioPass).toBe(false)
    expect(result.noRatioGap).toBe(-1068750)
  })
})

describe("vector B asset depletion only, under 59½", () => {
  it("uses the 84-month divisor and a 70% retirement factor", () => {
    const result = calculate(
      {
        borrower: emptyBorrower({
          dob: "1974-03-12",
          income: 0,
          cash: 5800,
          securities: 34000,
          retirement: 85000,
        }),
        coBorrower: null,
        ...loanDefaults,
      },
      asOf,
    )
    expect(result.borrower.retirementAge).toBe(false)
    expect(result.borrower.eligible).toBe(89100)
    expect(result.divisor).toBe(84)
    expect(result.borrower.ad).toBe(1060.71)
    expect(result.blended).toBe(false)
  })
})

describe("vector C retirement age 100% factor", () => {
  it("counts retirement at 100% for a borrower 59½ or older", () => {
    const result = calculate(
      {
        borrower: emptyBorrower({
          dob: "1960-01-01",
          income: 0,
          cash: 5800,
          securities: 34000,
          retirement: 85000,
        }),
        coBorrower: null,
        ...loanDefaults,
      },
      asOf,
    )
    expect(result.borrower.retirementAge).toBe(true)
    expect(result.borrower.retFactor).toBe(1)
    expect(result.borrower.eligible).toBe(114600)
    expect(result.borrower.ad).toBe(1364.29)
    expect(result.divisor).toBe(84)
  })
})

describe("vector D 59½ boundary", () => {
  it("treats 1967-04-07 as 59½ and 1967-04-08 as under", () => {
    expect(isRetirementAge("1967-04-07", asOf)).toBe(true)
    expect(isRetirementAge("1967-04-08", asOf)).toBe(false)
  })
})

describe("vector E No Ratio pass, interest-only", () => {
  it("reserves against the interest-only payment and passes No Ratio", () => {
    const result = calculate(
      {
        borrower: emptyBorrower({
          dob: "1955-01-01",
          income: 0,
          cash: 900000,
          securities: 1000000,
          retirement: 600000,
        }),
        coBorrower: null,
        loanAmount: 1500000,
        pitia: 9800,
        interestOnly: true,
        ioPayment: 8200,
        otherDebts: 500,
        reserveMonths: null,
      },
      asOf,
    )
    expect(result.borrower.eligible).toBe(2200000)
    expect(result.reserves).toBe(49200)
    expect(result.reserveMonths).toBe(6)
    expect(result.reservePayment).toBe(8200)
    expect(result.paymentsCover).toBe(123600)
    expect(result.noRatioRequired).toBe(1672800)
    expect(result.noRatioPass).toBe(true)
    expect(result.noRatioGap).toBe(527200)
    expect(result.divisor).toBe(84)
    expect(result.borrower.ad).toBe(26190.48)
  })
})

describe("vector F reserve tiers and loan limits", () => {
  it("maps loan amount ceilings to reserve months", () => {
    expect(matrixReserveMonths(1500000)).toBe(6)
    expect(matrixReserveMonths(2000000)).toBe(6)
    expect(matrixReserveMonths(2000001)).toBe(9)
    expect(matrixReserveMonths(2500000)).toBe(9)
    expect(matrixReserveMonths(2500001)).toBe(12)
    expect(matrixReserveMonths(3500000)).toBe(12)
    expect(matrixReserveMonths(3500001)).toBe(null)
  })

  it("warns above the program maximum", () => {
    const result = calculate(
      {
        borrower: emptyBorrower({ dob: "1974-03-12" }),
        coBorrower: null,
        ...loanDefaults,
        loanAmount: 3500001,
      },
      asOf,
    )
    expect(result.matrixMonths).toBe(null)
    expect(result.warnings).toContain("aboveMaxLoan")
  })

  it("warns below the program minimum and still assigns the lowest tier", () => {
    const result = calculate(
      {
        borrower: emptyBorrower({ dob: "1974-03-12" }),
        coBorrower: null,
        ...loanDefaults,
        loanAmount: 90000,
      },
      asOf,
    )
    expect(result.matrixMonths).toBe(6)
    expect(result.warnings).toContain("belowMinLoan")
  })
})

describe("missing date of birth", () => {
  it("treats retirement assets as under 59½ and warns", () => {
    const result = calculate(
      {
        borrower: emptyBorrower({ retirement: 1000 }),
        coBorrower: null,
        ...loanDefaults,
      },
      asOf,
    )
    expect(result.borrower.retirementAge).toBe(null)
    expect(result.borrower.retFactor).toBe(0.7)
    expect(result.warnings).toContain("borrowerDob")
  })
})
