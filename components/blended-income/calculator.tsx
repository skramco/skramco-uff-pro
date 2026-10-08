"use client"

import { useMemo, useState, type ReactNode } from "react"
import {
  type BlendedIncomeResult,
  type BorrowerInput,
  type WarningCode,
  calculate,
  completedAge,
  isRetirementAge,
  matrixReserveMonths,
  round2,
} from "@/lib/calculators/blendedIncome"
import { DtiGauge } from "@/components/blended-income/dti-gauge"
import { formatMoney, parseMoney } from "@/components/blended-income/money"

const INCOME_TYPES = [
  ["bank-personal", "12-month bank statements (personal)"],
  ["bank-business", "12-month bank statements (business)"],
  ["bank-blended", "12-month blended accounts"],
  ["full-doc", "Full doc (paystubs and W-2)"],
  ["other", "Other documented income"],
  ["none", "None: asset depletion only"],
] as const

type PartyForm = {
  dob: string
  incomeType: string
  income: string
  cash: string
  securities: string
  retirement: string
  trust: string
}

const borrowerPrefill: PartyForm = {
  dob: "1974-03-12",
  incomeType: "bank-personal",
  income: "13,550.25",
  cash: "5,800.00",
  securities: "34,000.00",
  retirement: "85,000.00",
  trust: "0.00",
}

const coBorrowerPrefill: PartyForm = {
  dob: "1978-08-02",
  incomeType: "bank-personal",
  income: "6,500.00",
  cash: "6,300.00",
  securities: "47,500.00",
  retirement: "115,000.00",
  trust: "0.00",
}

const WARNING_TEXT: Record<WarningCode, string> = {
  borrowerDob:
    "Borrower date of birth is missing. Retirement assets are counted at 70% until a date of birth shows age 59½ or older.",
  coBorrowerDob:
    "Co-borrower date of birth is missing. Retirement assets are counted at 70% until a date of birth shows age 59½ or older.",
  belowMinLoan: "Loan amount is below the $100,000 program minimum.",
  aboveMaxLoan: "Loan amount is above the $3,500,000 program maximum.",
}

function money(value: number): string {
  return `$${formatMoney(value)}`
}

function percentLabel(ratio: number | null): string {
  if (ratio === null) return "n/a"
  return `${formatMoney(round2(ratio * 100))}%`
}

function toBorrower(form: PartyForm): BorrowerInput {
  const none = form.incomeType === "none"
  return {
    dob: form.dob,
    income: none ? 0 : parseMoney(form.income),
    cash: parseMoney(form.cash),
    securities: parseMoney(form.securities),
    retirement: parseMoney(form.retirement),
    trust: parseMoney(form.trust),
  }
}

function verdict(result: BlendedIncomeResult): { tone: "pass" | "fail" | "idle"; text: string } {
  const { dtiBefore, dtiAfter, payments, incomeAfter } = result
  if (dtiBefore !== null && dtiBefore > 0.5 && dtiAfter !== null && dtiAfter <= 0.5) {
    return { tone: "pass", text: "Asset depletion brings this file under the 50% DTI limit." }
  }
  if (dtiAfter !== null && dtiAfter <= 0.5) {
    return { tone: "pass", text: "Within the 50% DTI limit." }
  }
  if (dtiAfter !== null && dtiAfter > 0.5) {
    const reduceBy = round2(payments - 0.5 * incomeAfter)
    const addIncome = round2(payments / 0.5 - incomeAfter)
    return {
      tone: "fail",
      text: `Still over 50% DTI. Reduce ${money(reduceBy)} in monthly payments or add ${money(addIncome)} in monthly income.`,
    }
  }
  return { tone: "idle", text: "Enter documented income or eligible assets to calculate DTI." }
}

function FieldLabel({ id, children }: { id: string; children: string }) {
  return (
    <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-[var(--bi-ink)]">
      {children}
    </label>
  )
}

function Helper({ children }: { children: string }) {
  return <p className="mt-1 text-xs text-[var(--bi-muted)]">{children}</p>
}

const inputClass =
  "h-10 w-full rounded-md border border-[var(--bi-rule)] bg-[var(--bi-paper)] px-3 text-sm text-[var(--bi-ink)] bi-nums disabled:cursor-not-allowed disabled:opacity-50"

function CurrencyField({
  id,
  label,
  value,
  onChange,
  helper,
  disabled = false,
}: {
  id: string
  label: string
  value: string
  onChange: (next: string) => void
  helper?: string
  disabled?: boolean
}) {
  return (
    <div>
      <FieldLabel id={id}>{label}</FieldLabel>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--bi-muted)]">
          $
        </span>
        <input
          id={id}
          inputMode="decimal"
          autoComplete="off"
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onBlur={() => onChange(formatMoney(parseMoney(value)))}
          className={`${inputClass} pl-7`}
        />
      </div>
      {helper ? <Helper>{helper}</Helper> : null}
    </div>
  )
}

function PartyPanel({
  title,
  idPrefix,
  form,
  onChange,
  asOf,
  includeControl,
  showBody = true,
}: {
  title: string
  idPrefix: string
  form: PartyForm
  onChange: (next: PartyForm) => void
  asOf: Date
  includeControl?: ReactNode
  showBody?: boolean
}) {
  const retired = isRetirementAge(form.dob, asOf)
  const age = completedAge(form.dob, asOf)
  const incomeDisabled = form.incomeType === "none"
  const retirementHelper = retired ? "Counted at 100%" : "Counted at 70%"

  function patch(partial: Partial<PartyForm>) {
    onChange({ ...form, ...partial })
  }

  function setIncomeType(incomeType: string) {
    if (incomeType === "none") {
      onChange({ ...form, incomeType, income: "0.00" })
      return
    }
    onChange({ ...form, incomeType })
  }

  return (
    <fieldset className="rounded-md border border-[var(--bi-rule)] bg-[var(--bi-paper)] p-4">
      <legend className="px-1 font-extrabold tracking-tight text-[var(--bi-ink)]">{title}</legend>
      {includeControl}
      {showBody ? (
      <div className="mt-3 grid gap-4">
        <div>
          <FieldLabel id={`${idPrefix}-dob`}>Date of birth</FieldLabel>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id={`${idPrefix}-dob`}
              type="date"
              value={form.dob}
              onChange={(event) => patch({ dob: event.target.value })}
              className={`${inputClass} max-w-[14rem]`}
            />
            {age !== null ? (
              <span
                className={
                  retired
                    ? "rounded-full bg-[color-mix(in_srgb,var(--bi-pass)_16%,transparent)] px-2.5 py-1 text-xs font-semibold text-[var(--bi-pass)]"
                    : "rounded-full bg-[var(--bi-wash)] px-2.5 py-1 text-xs font-semibold text-[var(--bi-muted)]"
                }
              >
                {retired ? `Age ${age}, 59½+` : `Age ${age}`}
              </span>
            ) : null}
          </div>
        </div>
        <div>
          <FieldLabel id={`${idPrefix}-income-type`}>Income type</FieldLabel>
          <select
            id={`${idPrefix}-income-type`}
            value={form.incomeType}
            onChange={(event) => setIncomeType(event.target.value)}
            className={inputClass}
          >
            {INCOME_TYPES.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <CurrencyField
          id={`${idPrefix}-income`}
          label="Monthly qualifying income"
          value={form.income}
          disabled={incomeDisabled}
          onChange={(income) => patch({ income })}
        />
        <CurrencyField
          id={`${idPrefix}-cash`}
          label="Checking, savings, money market"
          value={form.cash}
          helper="Counted at 100%"
          onChange={(cash) => patch({ cash })}
        />
        <CurrencyField
          id={`${idPrefix}-securities`}
          label="Stocks, bonds, mutual funds"
          value={form.securities}
          helper="Counted at 70%"
          onChange={(securities) => patch({ securities })}
        />
        <CurrencyField
          id={`${idPrefix}-retirement`}
          label="Retirement (IRA, 401(k), 403(b))"
          value={form.retirement}
          helper={retirementHelper}
          onChange={(retirement) => patch({ retirement })}
        />
        <CurrencyField
          id={`${idPrefix}-trust`}
          label="Trust (sole beneficiary)"
          value={form.trust}
          helper="Counted at 100%"
          onChange={(trust) => patch({ trust })}
        />
      </div>
      ) : null}
    </fieldset>
  )
}

function dateFromISO(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  return new Date(year, (month || 1) - 1, day || 1)
}

export function BlendedIncomeCalculator({ asOf }: { asOf: string }) {
  const asOfDate = useMemo(() => dateFromISO(asOf), [asOf])
  const [borrower, setBorrower] = useState<PartyForm>(borrowerPrefill)
  const [includeCoBorrower, setIncludeCoBorrower] = useState(true)
  const [coBorrower, setCoBorrower] = useState<PartyForm>(coBorrowerPrefill)
  const [loanAmount, setLoanAmount] = useState("1,100,000.00")
  const [pitia, setPitia] = useState("8,450.00")
  const [otherDebts, setOtherDebts] = useState("2,150.00")
  const [reserveOverride, setReserveOverride] = useState<string | null>(null)
  const [interestOnly, setInterestOnly] = useState(false)
  const [ioPayment, setIoPayment] = useState("0.00")

  const loanValue = parseMoney(loanAmount)
  const matrixMonths = matrixReserveMonths(loanValue)
  const reserveMonths = reserveOverride == null ? null : Number.parseInt(reserveOverride, 10) || 0

  const result = useMemo(
    () =>
      calculate(
        {
          borrower: toBorrower(borrower),
          coBorrower: includeCoBorrower ? toBorrower(coBorrower) : null,
          loanAmount: loanValue,
          pitia: parseMoney(pitia),
          interestOnly,
          ioPayment: parseMoney(ioPayment),
          otherDebts: parseMoney(otherDebts),
          reserveMonths,
        },
        asOfDate,
      ),
    [asOfDate, borrower, coBorrower, includeCoBorrower, interestOnly, ioPayment, loanValue, otherDebts, pitia, reserveMonths],
  )

  const outcome = verdict(result)
  const reserveDisplay = reserveOverride ?? (matrixMonths == null ? "" : String(matrixMonths))

  return (
    <div className="grid grid-cols-1 items-start gap-8 min-[961px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="grid min-w-0 gap-4">
        <PartyPanel title="Borrower" idPrefix="borrower" form={borrower} onChange={setBorrower} asOf={asOfDate} />

        <PartyPanel
          title="Co-borrower"
          idPrefix="co-borrower"
          form={coBorrower}
          onChange={setCoBorrower}
          asOf={asOfDate}
          showBody={includeCoBorrower}
          includeControl={
            <div className="mt-1 flex items-center gap-2">
              <input
                id="co-borrower-include"
                type="checkbox"
                checked={includeCoBorrower}
                onChange={(event) => setIncludeCoBorrower(event.target.checked)}
                className="h-4 w-4 accent-[var(--bi-brand)]"
              />
              <label htmlFor="co-borrower-include" className="text-sm font-medium">
                Include
              </label>
            </div>
          }
        />

        <fieldset className="rounded-md border border-[var(--bi-rule)] bg-[var(--bi-paper)] p-4">
          <legend className="px-1 font-extrabold tracking-tight">Loan and payments</legend>
          <div className="mt-3 grid gap-4">
            <CurrencyField id="loan-amount" label="Loan amount" value={loanAmount} onChange={setLoanAmount} />
            <CurrencyField
              id="pitia"
              label="Housing payment (PITIA), fully amortized"
              value={pitia}
              onChange={setPitia}
              helper="Used for DTI and for the 12-month No Ratio payment coverage"
            />
            <CurrencyField
              id="other-debts"
              label="Other monthly debts"
              value={otherDebts}
              onChange={setOtherDebts}
              helper="All other credit-report payments"
            />
            <div>
              <FieldLabel id="reserve-months">Reserve months</FieldLabel>
              <input
                id="reserve-months"
                inputMode="numeric"
                value={reserveDisplay}
                onChange={(event) => setReserveOverride(event.target.value.replace(/[^\d]/g, ""))}
                className={inputClass}
              />
              <Helper>
                {matrixMonths == null
                  ? loanValue > 3500000
                    ? "Above the program maximum"
                    : "Enter reserve months"
                  : `matrix: ${matrixMonths} months`}
              </Helper>
              {reserveOverride != null && matrixMonths != null ? (
                <button
                  type="button"
                  className="mt-1 text-sm font-semibold text-[var(--bi-brand-text)] underline-offset-2 hover:underline"
                  onClick={() => setReserveOverride(null)}
                >
                  Use matrix requirement
                </button>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              <input
                id="interest-only"
                type="checkbox"
                checked={interestOnly}
                onChange={(event) => setInterestOnly(event.target.checked)}
                className="h-4 w-4 accent-[var(--bi-brand)]"
              />
              <label htmlFor="interest-only" className="text-sm font-medium">
                Interest-only loan
              </label>
            </div>
            {interestOnly ? (
              <CurrencyField
                id="io-payment"
                label="Interest-only payment (PITIA)"
                value={ioPayment}
                onChange={setIoPayment}
                helper="Used only for the reserve calculation"
              />
            ) : null}
          </div>
        </fieldset>

      </div>

      <aside
        aria-live="polite"
        className="min-w-0 rounded-md bg-[var(--bi-card)] p-5 text-[var(--bi-card-ink)] shadow-sm min-[961px]:sticky min-[961px]:top-24"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--bi-card-muted)]">
          {result.blended ? "Blended with other income: 36 months" : "Asset depletion only: 84 months"}
        </p>

        <dl className="mt-4 grid gap-2 text-sm">
          <ResultRow label="Documented income" value={money(result.otherIncome)} />
          <ResultRow label="Asset depletion, borrower" value={`+${money(result.borrower.ad)}`} />
          {result.coBorrower ? (
            <ResultRow label="Asset depletion, co-borrower" value={`+${money(result.coBorrower.ad)}`} />
          ) : null}
          <ResultRow label="Total monthly payments" value={money(result.payments)} />
        </dl>

        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--bi-card-muted)]">
          Qualifying income
        </p>
        <p className="bi-nums text-4xl font-extrabold tracking-tight">{money(result.incomeAfter)}</p>
        <p className="mt-2 text-sm text-[var(--bi-card-muted)]">
          {result.blended
            ? `+${money(result.lift)}/mo from assets. At 84 months it would be ${money(result.ad84Total)}.`
            : `Add any documented income to switch to the 36-month term (${money(result.ad36Total)}/mo).`}
        </p>

        <DtiGauge before={result.dtiBefore} after={result.dtiAfter} onDark />
        <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-[var(--bi-card-muted)]">DTI without depletion</p>
            <p className={`bi-nums text-lg font-semibold ${result.dtiBefore === null ? "text-[var(--bi-card-muted)]" : result.dtiBeforePass ? "text-[#3cc380]" : "text-[#ff5a4f]"}`}>
              {percentLabel(result.dtiBefore)}
            </p>
          </div>
          <div>
            <p className="text-[var(--bi-card-muted)]">DTI with depletion</p>
            <p className={`bi-nums text-lg font-semibold ${result.dtiAfter === null ? "text-[var(--bi-card-muted)]" : result.dtiAfterPass ? "text-[#3cc380]" : "text-[#ff5a4f]"}`}>
              {percentLabel(result.dtiAfter)}
            </p>
          </div>
        </div>

        <p
          className={
            outcome.tone === "pass"
              ? "mt-4 rounded-md border border-[#3cc380] bg-[#143226] px-3 py-2 text-sm text-[#3cc380]"
              : outcome.tone === "fail"
                ? "mt-4 rounded-md border border-[#e3241c] bg-[#3a1210] px-3 py-2 text-sm text-[#ff5a4f]"
                : "mt-4 rounded-md border border-[#2d3034] px-3 py-2 text-sm text-[var(--bi-card-muted)]"
          }
        >
          {outcome.text}
        </p>

        <div className="mt-5 border-t border-[#2d3034] pt-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-sm font-extrabold">No Ratio test</h3>
            <span
              className={
                result.noRatioPass
                  ? "rounded-full bg-[#143226] px-2.5 py-1 text-xs font-semibold text-[#3cc380]"
                  : "rounded-full bg-[#3a1210] px-2.5 py-1 text-xs font-semibold text-[#ff5a4f]"
              }
            >
              {result.noRatioPass ? "Eligible" : `Short ${money(Math.abs(result.noRatioGap))}`}
            </span>
          </div>
          <dl className="mt-3 grid gap-2 text-sm">
            <ResultRow label="Eligible assets" value={money(result.eligibleTotal)} />
            <ResultRow label="Loan amount" value={money(loanValue)} />
            <ResultRow
              label={`Reserves (${result.reserveMonths} mo × ${money(result.reservePayment)})`}
              value={money(result.reserves)}
            />
            <ResultRow label="12 months of total payments" value={money(result.paymentsCover)} />
            <ResultRow label="Assets needed" value={money(result.noRatioRequired)} />
          </dl>
        </div>

        {result.warnings.length > 0 ? (
          <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-[#ff5a4f]">
            {result.warnings.map((code) => (
              <li key={code}>{WARNING_TEXT[code]}</li>
            ))}
          </ul>
        ) : null}

        <p className="mt-4 text-xs leading-relaxed text-[var(--bi-card-muted)]">
          Estimate for scenario planning. Max DTI 50%. Loans using asset depletion are limited to 80% LTV. Final
          qualifying income is determined by underwriting.
        </p>
      </aside>
    </div>
  )
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-[var(--bi-card-muted)]">{label}</dt>
      <dd className="bi-nums font-semibold">{value}</dd>
    </div>
  )
}
