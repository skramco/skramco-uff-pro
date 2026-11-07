export const EFFECTIVE_DATE = "2026-07-22"
export const REVISED_DATE = "2026-08-20"
export const MIN_LOAN_AMOUNT = 100_000
export const PRODUCT_NAME = "Non-QM Core"

export type ProgramId = "dscr" | "full"
export type LoanPurpose = "purch" | "rt" | "co"
export type Occupancy = "inv" | "second" | "primary"

export type DscrFicoRow = {
  fico: number
  purch: number
  rt: number
  co: number
}

export type DscrTier = {
  max: number
  minDscr: number
  reserves: string
  rows: DscrFicoRow[]
}

export type FullLtvSet = {
  prt: number | null
  co: number | null
}

export type FullFicoRow = {
  fico: number
  primary: FullLtvSet
  inv: FullLtvSet
}

export type FullTier = {
  max: number
  dti: number
  reserves: string
  rows: FullFicoRow[]
}

export type WorksheetAdj = {
  id: string
  label: string
  cap?: number
  red?: number
  refiOnly?: boolean
  refiCap?: number
  minFico?: number
  minAmt?: number
  block?: "inv"
}

export type OverlayItem = {
  label: string
  limit: string
  tone?: "red" | "no"
}

export type OverlayCardData = {
  items: OverlayItem[]
  note: string
}

export type GuidelineSpan = string | { em: string }

export type GuidelineEntry = {
  term: string
  text?: string
  spans?: GuidelineSpan[]
  items?: string[]
}

export type GuidelineBlock = {
  title: string
  entries: GuidelineEntry[]
}

export const DSCR_TIERS: DscrTier[] = [
  {
    max: 1_500_000,
    minDscr: 0.75,
    reserves: "3 mos PITI ≤ $1M / 6 mos > $1M",
    rows: [
      { fico: 740, purch: 80, rt: 80, co: 75 },
      { fico: 700, purch: 80, rt: 80, co: 75 },
      { fico: 680, purch: 75, rt: 75, co: 70 },
      { fico: 660, purch: 75, rt: 70, co: 60 },
    ],
  },
  {
    max: 2_000_000,
    minDscr: 0.75,
    reserves: "6 mos PITI",
    rows: [
      { fico: 700, purch: 75, rt: 75, co: 70 },
      { fico: 680, purch: 70, rt: 70, co: 65 },
    ],
  },
  {
    max: 2_500_000,
    minDscr: 1.0,
    reserves: "6 mos PITI",
    rows: [
      { fico: 700, purch: 70, rt: 70, co: 65 },
      { fico: 680, purch: 65, rt: 65, co: 60 },
    ],
  },
]

export const FULL_DOC_TIERS: FullTier[] = [
  {
    max: 1_500_000,
    dti: 50,
    reserves: "6 months",
    rows: [
      { fico: 720, primary: { prt: 89.99, co: 80 }, inv: { prt: 85, co: 80 } },
      { fico: 680, primary: { prt: 85, co: 80 }, inv: { prt: 80, co: 75 } },
      { fico: 660, primary: { prt: 80, co: 75 }, inv: { prt: 75, co: 70 } },
    ],
  },
  {
    max: 2_000_000,
    dti: 50,
    reserves: "6 months",
    rows: [
      { fico: 700, primary: { prt: 85, co: 80 }, inv: { prt: 75, co: 75 } },
      { fico: 660, primary: { prt: 80, co: 75 }, inv: { prt: 70, co: 70 } },
    ],
  },
  {
    max: 2_500_000,
    dti: 50,
    reserves: "9 months",
    rows: [
      { fico: 700, primary: { prt: 80, co: 75 }, inv: { prt: 75, co: 70 } },
      { fico: 660, primary: { prt: 75, co: 70 }, inv: { prt: 70, co: 65 } },
    ],
  },
  {
    max: 3_000_000,
    dti: 50,
    reserves: "12 months",
    rows: [
      { fico: 700, primary: { prt: 80, co: 75 }, inv: { prt: 70, co: 65 } },
      { fico: 680, primary: { prt: 75, co: 70 }, inv: { prt: 65, co: 60 } },
    ],
  },
  {
    max: 3_500_000,
    dti: 50,
    reserves: "12 months",
    rows: [{ fico: 700, primary: { prt: 70, co: null }, inv: { prt: null, co: null } }],
  },
]

export const DSCR_ADJUSTMENTS: WorksheetAdj[] = [
  { id: "fn", label: "Foreign national", cap: 65 },
  { id: "fti", label: "First time investor", cap: 75 },
  { id: "io", label: "Interest only (min DSCR 1.00)", cap: 75 },
  { id: "nwc", label: "Non-warrantable condo", cap: 75 },
  { id: "rural", label: "Rural property", cap: 65 },
  { id: "vac", label: "Unleased / vacant (refi only)", cap: 70, refiOnly: true },
  { id: "lowd", label: "DSCR < 1.00x (0.75x min)", red: 5, minFico: 680, minAmt: 200000 },
  { id: "decl", label: "Declining market", red: 5 },
]

export const FULL_DOC_ADJUSTMENTS: WorksheetAdj[] = [
  { id: "io2", label: "Interest only / 2–4 units", cap: 80 },
  { id: "ad", label: "Asset depletion", cap: 80 },
  { id: "nwc2", label: "Non-warrantable condo", cap: 80 },
  { id: "rur2", label: "Rural property", cap: 75, refiCap: 70 },
  { id: "fthb", label: "First time home buyer", block: "inv" },
  { id: "decl2", label: "Declining market", red: 5 },
]

export const DSCR_OVERLAYS: OverlayCardData = {
  items: [
    { label: "Foreign national", limit: "65% LTV" },
    { label: "First time investors", limit: "75% LTV" },
    { label: "Interest only", limit: "75% LTV · Min DSCR 1.00" },
    { label: "DSCR < 1.00x (0.75x min)", limit: "5% LTV reduction", tone: "red" },
    { label: "DSCR < 1.00x floor", limit: "Min 680 FICO · Min $200,000" },
    { label: "Non-warrantable condos", limit: "75% LTV" },
    { label: "Rural (long-term rent only, DSCR > 1.0x)", limit: "65% LTV" },
    { label: "Unleased / vacant — refinance", limit: "70% LTV" },
    { label: "Declining market per appraisal", limit: "5% LTV reduction", tone: "red" },
  ],
  note: "Unleased properties: no LTV reduction on purchases. 2–4 units: max one vacant unit on refinances.",
}

export const FULL_DOC_OVERLAYS: OverlayCardData = {
  items: [
    { label: "Interest only / 2–4 units", limit: "80% LTV" },
    { label: "Asset depletion", limit: "80% LTV" },
    { label: "Non-warrantable condos", limit: "80% LTV" },
    { label: "Rural properties — purchase", limit: "75% LTV" },
    { label: "Rural properties — R&T & C/O", limit: "70.00%" },
    { label: "Residual income", limit: "$2,500.00" },
    { label: "First time home buyers", limit: "Investment home not allowed", tone: "no" },
    { label: "Declining market per appraisal", limit: "5% LTV reduction", tone: "red" },
  ],
  note: "Investment properties: subordinate financing not allowed and max cash out $1,000,000.",
}

export const DSCR_TABLE_NOTE =
  "Reserves: 3 mos PITI when loan amount ≤ $1M · 6 mos PITI when loan amount > $1M · 6 mos PITI whenever DSCR < 1.00x. Cash proceeds may be used to meet the requirement."

export const FULL_DOC_TABLE_NOTE =
  "** Up to 90%; max 89.99%. Cash proceeds may be used to meet the reserve requirement."

export const DSCR_TAGS = [
  "Investment properties only",
  "30-yr fixed & 10-yr I/O",
  "Min loan $100,000",
] as const

export const FULL_DOC_TAGS = [
  "Primary, second home & investment",
  "Max DTI 50%",
  "30 / 40-yr fixed & 10-yr I/O",
] as const

export const DSCR_GUIDELINES: GuidelineBlock[] = [
  {
    title: "Credit",
    entries: [
      { term: "BK / FC / DIL / SS", text: "36 months seasoned" },
      { term: "Mortgage history", spans: [{ em: "0 x 30 x 12" }] },
      {
        term: "Qualifying FICO",
        text: "Highest middle of 3, or lower of 2 scores, of all applicants.",
      },
    ],
  },
  {
    title: "Program highlights",
    entries: [
      { term: "Occupancy", text: "Investment properties only" },
      {
        term: "Property types",
        text: "SFR, PUD, townhome, 2–4 units, condos, non-warrantable condos (max 75% LTV — see guidelines).\nRural: max 65% LTV on purchase, R/T and C/O (long-term rent only and DSCR > 1.0x); max 10 acres, no agricultural and/or farm use.",
      },
      {
        term: "Loan program",
        text: "Fully amortized — 30-year fixed\nInterest only — 30-year fixed, 10-year I/O",
      },
      {
        term: "DSCR calculation",
        text: "Fully amortized: gross rents ÷ new PITIA\nInterest only: gross rents ÷ new ITIA",
      },
      {
        term: "Gross rents defined",
        text: "Lesser of market rents from the 1007 or the lease agreement. Use the current lease amount when documenting 3 months of receipt.",
      },
      {
        term: "Short term rentals",
        text: "12-month history of short-term rental income required via bank statements or VRBO / Airbnb ledger to use short-term rental income for qualification.",
      },
      {
        term: "Unleased / vacant homes",
        items: [
          "Gross rents determined from average market rents on the appraisal.",
          "Max 70% LTV on refinances; no LTV reduction on purchase transactions.",
          "2+ units: max one vacant unit on refinances.",
        ],
      },
      {
        term: "Eligible payoffs",
        text: "Any mortgage lien, property taxes and insurance — including delinquent property taxes or prepaids on any rental property.",
      },
      {
        term: "First time investors",
        text: "Borrowers without a 12-month rental property history over the most recent 12 months.",
      },
      {
        term: "Max cash out",
        spans: [
          { em: "$1,000,000" },
          " with LTV ≤ 65% · ",
          { em: "$500,000" },
          " if LTV > 65%",
        ],
      },
      {
        term: "Prepayment penalty",
        text: "Investment property only. Flat 5% penalty amount, or standard (% of amount prepaid, partial or full): 5-year with 5/4/3/2/1 stepdown; 4-year with 4/3/2/1; 3-year with 3/2/1; 2-year with 2/1; or 1-year with 1%. See the operational prepayment penalty matrices for state restrictions.",
      },
    ],
  },
  {
    title: "Other",
    entries: [
      {
        term: "Citizenship",
        text: "US citizens; permanent resident aliens; non-permanent resident aliens (with US credit); foreign nationals (see overlay above).",
      },
      { term: "Escrows", text: "Not required" },
      {
        term: "Reserves",
        text: "3 mos PITI (loan amount ≤ $1M) · 6 mos PITI (loan amount > $1M) · 6 mos PITI when DSCR < 1.00x. Cash proceeds may be used to meet the requirement.",
      },
      { term: "Subordinate financing", text: "Not allowed" },
      { term: "Minimum loan amount", spans: [{ em: "$100,000" }] },
      { term: "Seller concessions", spans: [{ em: "2%" }] },
      {
        term: "Appraisal requirements",
        items: [
          "Loan amount < $2M: one full appraisal with a supportive secondary valuation source — see guidelines.",
          "Full second appraisal required when (i) loan amount > $2M, or (ii) purpose is cash-out and loan amount > $1.5MM.",
        ],
      },
      {
        term: "Declining markets",
        text: "If the property is in a declining market as indicated by the appraisal, max LTV is reduced by 5%.",
      },
    ],
  },
]

export const FULL_DOC_GUIDELINES: GuidelineBlock[] = [
  {
    title: "Credit",
    entries: [
      { term: "BK / FC / DIL / SS", text: "48 months seasoned" },
      { term: "Mortgage history", spans: [{ em: "1 x 30 x 12" }] },
      {
        term: "Qualifying FICO",
        text: "Primary wage earners — middle of 3 or lower of 2. Bank statement program — 50/50 business owners use the highest mid FICO for either applicant.",
      },
      { term: "Max DTI", spans: [{ em: "50%" }] },
    ],
  },
  {
    title: "Program highlights",
    entries: [
      { term: "Occupancy", text: "Primary, secondary homes & investment properties" },
      {
        term: "Property types",
        text: "SFR, PUD, townhome, 2–4 units, condos, rural (max 10 acres, no agricultural and/or farm use)",
      },
      {
        term: "Loan programs",
        text: "Fully amortized — 30-year fixed & 40-year fixed\nInterest only — 40-year fixed, 10-year I/O",
      },
      {
        term: "Qualifying payment — I/O",
        text: "Qualify over the fully amortized period — 360 months",
      },
      {
        term: "Max cash out",
        items: [
          "Primary & second home: LTV ≤ 65% unlimited; LTV > 65% capped at $1,000,000",
          "Investment property: $1,000,000",
          "Cash proceeds may be used to meet the reserve requirement",
        ],
      },
      {
        term: "No ratio",
        text: "Eligible assets must cover 100% of the mortgage note, the minimum reserve requirement, and 12 months of total payments in the DTI determination.",
      },
      {
        term: "Prepayment penalty",
        text: "Investment property only. Flat 5% penalty amount, or standard (% of amount prepaid, partial or full): 5-year with 5/4/3/2/1 stepdown; 4-year with 4/3/2/1; 3-year with 3/2/1; 2-year with 2/1; or 1-year with 1%. See the operational prepayment penalty matrices for state restrictions.",
      },
    ],
  },
  {
    title: "Other",
    entries: [
      {
        term: "Citizenship",
        text: "US citizens; permanent resident aliens; non-permanent resident aliens (with US credit)",
      },
      { term: "Escrows", text: "Required for HPML loans only and LTVs > 85%" },
      {
        term: "Reserves",
        text: "Per the loan amount tier above. Cash proceeds may be used to meet the requirement.",
      },
      {
        term: "Subordinate financing",
        text: "Primary & second homes: allowed to maximum LTV. Investment properties: not allowed.",
      },
      { term: "Minimum loan amount", spans: [{ em: "$100,000" }] },
      { term: "Seller concessions", spans: [{ em: "6%" }] },
      {
        term: "Appraisal requirements",
        items: [
          "Loan amount < $2M: FNMA CU score or FHLMC LCA score of 2.5; or an approved AVM with valuation within 10% of appraised value, confidence factor ≥ 87% and FSD ≤ .13; or a CDA or like-type product with valuation within 10% of appraised value, or a field review.",
          "Loan amount > $2M: full second appraisal required, with the lower of the two values used for eligibility.",
          "AVM required when LTV ≤ 80%; CDA or field review required when LTV > 80%.",
        ],
      },
      {
        term: "Declining markets",
        text: "If the property is in a declining market as indicated by the appraisal, max LTV is reduced by 5%.",
      },
    ],
  },
]

export function formatDateMdY(iso: string): string {
  const [y, m, d] = iso.split("-")
  return `${m}/${d}/${y}`
}

export function effectiveStamp(): string {
  return `Effective ${formatDateMdY(EFFECTIVE_DATE)} · Rev. ${formatDateMdY(REVISED_DATE)}`
}

export function parseAmount(raw: string): number {
  const n = parseFloat(String(raw).replace(/[^0-9.]/g, ""))
  return Number.isNaN(n) ? 0 : n
}

export function formatUsd(n: number): string {
  return "$" + Math.round(n).toLocaleString("en-US")
}

export function formatPct(n: number): string {
  return (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, "") + "%"
}

export function formatDscrLtv(n: number): string {
  return n.toFixed(2) + "%"
}

export function formatFullDocLtv(n: number | null): { text: string; na: boolean } {
  if (n === null) return { text: "N/A", na: true }
  if (n === 89.99) return { text: "90%**", na: false }
  return { text: `${n}%`, na: false }
}

export type LedgerLine = {
  label: string
  value: string
  cls?: "sub" | "cap" | "total"
}

export type CalcInput = {
  program: ProgramId
  amount: number
  fico: number
  purpose: LoanPurpose
  occupancy: Occupancy
  checked: Record<string, boolean>
}

export type CalcResult =
  | { ok: true; ltv: number; note: string; ledger: LedgerLine[] }
  | { ok: false; message: string }

function adjustmentsFor(program: ProgramId): WorksheetAdj[] {
  return program === "dscr" ? DSCR_ADJUSTMENTS : FULL_DOC_ADJUSTMENTS
}

export function calcMaxLtv(input: CalcInput): CalcResult {
  const amt = input.amount
  const fico = input.fico || 0
  const purpose = input.purpose
  const occ = input.program === "full" ? input.occupancy : "inv"
  const isRefi = purpose !== "purch"
  const notes: string[] = []

  if (amt < MIN_LOAN_AMOUNT) {
    return { ok: false, message: "Below the $100,000 minimum loan amount." }
  }

  if (input.program === "dscr") {
    return calcDscr(amt, fico, purpose, isRefi, input.checked, notes)
  }
  return calcFull(amt, fico, purpose, occ, isRefi, input.checked, notes)
}

function calcDscr(
  amt: number,
  fico: number,
  purpose: LoanPurpose,
  isRefi: boolean,
  checked: Record<string, boolean>,
  notes: string[],
): CalcResult {
  let tier: DscrTier | null = null
  for (const t of DSCR_TIERS) {
    if (amt <= t.max) {
      tier = t
      break
    }
  }
  if (!tier) {
    return {
      ok: false,
      message: "Above the program maximum of " + formatUsd(DSCR_TIERS[DSCR_TIERS.length - 1].max) + ".",
    }
  }

  const rows = [...tier.rows].sort((a, b) => b.fico - a.fico)
  const row = rows.find((r) => fico >= r.fico)
  if (!row) {
    return {
      ok: false,
      message: "Minimum FICO for the " + formatUsd(tier.max) + " tier is " + rows[rows.length - 1].fico + ".",
    }
  }

  const base = purpose === "purch" ? row.purch : purpose === "rt" ? row.rt : row.co
  if (base === null || base === undefined) {
    return {
      ok: false,
      message: "Not eligible — this occupancy and purpose is N/A in the " + formatUsd(tier.max) + " tier.",
    }
  }

  const out: LedgerLine[] = [
    { label: "Tier", value: formatUsd(tier.max) },
    { label: "FICO row", value: row.fico + "+" },
    { label: "Reserves", value: tier.reserves },
    { label: "Min DSCR", value: tier.minDscr.toFixed(2) },
    { label: "Base LTV", value: formatPct(base) },
  ]

  return applyAdjustments({
    program: "dscr",
    adj: DSCR_ADJUSTMENTS,
    base,
    amt,
    fico,
    occ: "inv",
    isRefi,
    checked,
    notes,
    out,
    tierMax: tier.max,
    tierMinDscr: tier.minDscr,
    tierDti: null,
  })
}

function calcFull(
  amt: number,
  fico: number,
  purpose: LoanPurpose,
  occ: Occupancy,
  isRefi: boolean,
  checked: Record<string, boolean>,
  notes: string[],
): CalcResult {
  let tier: FullTier | null = null
  for (const t of FULL_DOC_TIERS) {
    if (amt <= t.max) {
      tier = t
      break
    }
  }
  if (!tier) {
    return {
      ok: false,
      message: "Above the program maximum of " + formatUsd(FULL_DOC_TIERS[FULL_DOC_TIERS.length - 1].max) + ".",
    }
  }

  const rows = [...tier.rows].sort((a, b) => b.fico - a.fico)
  const row = rows.find((r) => fico >= r.fico)
  if (!row) {
    return {
      ok: false,
      message: "Minimum FICO for the " + formatUsd(tier.max) + " tier is " + rows[rows.length - 1].fico + ".",
    }
  }

  const set = occ === "primary" ? row.primary : row.inv
  const base = purpose === "co" ? set.co : set.prt
  if (base === null || base === undefined) {
    return {
      ok: false,
      message: "Not eligible — this occupancy and purpose is N/A in the " + formatUsd(tier.max) + " tier.",
    }
  }

  const out: LedgerLine[] = [
    { label: "Tier", value: formatUsd(tier.max) },
    { label: "FICO row", value: row.fico + "+" },
    { label: "Reserves", value: tier.reserves },
    { label: "Max DTI", value: tier.dti + "%" },
    { label: "Base LTV", value: formatPct(base) },
  ]

  return applyAdjustments({
    program: "full",
    adj: FULL_DOC_ADJUSTMENTS,
    base,
    amt,
    fico,
    occ,
    isRefi,
    checked,
    notes,
    out,
    tierMax: tier.max,
    tierMinDscr: null,
    tierDti: tier.dti,
  })
}

function applyAdjustments(args: {
  program: ProgramId
  adj: WorksheetAdj[]
  base: number
  amt: number
  fico: number
  occ: Occupancy
  isRefi: boolean
  checked: Record<string, boolean>
  notes: string[]
  out: LedgerLine[]
  tierMax: number
  tierMinDscr: number | null
  tierDti: number | null
}): CalcResult {
  let ltv = args.base
  let blocked: string | null = null

  for (const a of args.adj) {
    if (!args.checked[a.id]) continue
    if (a.block === "inv" && args.occ === "inv") {
      blocked = a.label + " — investment home not allowed."
      continue
    }
    if (a.minFico && args.fico < a.minFico) {
      args.notes.push(a.label + " requires a minimum " + a.minFico + " FICO.")
    }
    if (a.minAmt && args.amt < a.minAmt) {
      args.notes.push(a.label + " requires a minimum loan amount of " + formatUsd(a.minAmt) + ".")
    }
    if (a.id === "lowd" && args.tierMinDscr != null && args.tierMinDscr >= 1.0) {
      args.notes.push("The " + formatUsd(args.tierMax) + " tier requires DSCR ≥ 1.00x.")
    }
    if (a.id === "io" && args.tierMinDscr != null && args.tierMinDscr < 1.0) {
      args.notes.push("Interest only requires DSCR ≥ 1.00x.")
    }

    let cap = a.cap
    if (a.refiCap && args.isRefi) cap = a.refiCap
    if (a.refiOnly && !args.isRefi) continue

    if (cap != null && cap < ltv) {
      ltv = cap
      args.out.push({ label: a.label + " cap", value: formatPct(cap), cls: "cap" })
    } else if (cap != null) {
      args.out.push({ label: a.label + " cap", value: formatPct(cap) + " — n/a", cls: "cap" })
    }
    if (a.red) {
      ltv = ltv - a.red
      args.out.push({ label: a.label, value: "− " + a.red + ".00%", cls: "sub" })
    }
  }

  if (blocked) return { ok: false, message: blocked }

  args.out.push({ label: "Qualified LTV", value: formatPct(ltv), cls: "total" })

  const note = args.notes.length
    ? args.notes.join(" ")
    : "Min value " +
      formatUsd(args.amt / (ltv / 100)) +
      " at this loan amount · " +
      (args.program === "dscr"
        ? "min DSCR " + (args.tierMinDscr as number).toFixed(2)
        : "max DTI " + args.tierDti + "%")

  return { ok: true, ltv, note, ledger: args.out }
}

export function adjustmentsForProgram(program: ProgramId): WorksheetAdj[] {
  return adjustmentsFor(program)
}
