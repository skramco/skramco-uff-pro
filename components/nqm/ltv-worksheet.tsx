"use client"

import { useEffect, useMemo, useState } from "react"
import {
  adjustmentsForProgram,
  calcMaxLtv,
  formatPct,
  formatUsd,
  parseAmount,
  type LoanPurpose,
  type Occupancy,
  type ProgramId,
} from "@/lib/data/nqm-matrix"

const fieldClass =
  "w-full rounded-[2px] border border-white/18 bg-white/[.07] px-[11px] py-2.5 font-plex text-sm text-white focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-uff-red"
const labelClass = "mb-1.5 block font-plex text-[10.5px] uppercase tracking-[0.14em] text-[#9C9CA3]"
const selectClass = `${fieldClass} appearance-none bg-[length:5px_5px,5px_5px] bg-[position:calc(100%-18px)_50%,calc(100%-13px)_50%] bg-no-repeat [background-image:linear-gradient(45deg,transparent_50%,#9C9CA3_50%),linear-gradient(135deg,#9C9CA3_50%,transparent_50%)]`

export function LtvWorksheet({ program }: { program: ProgramId }) {
  const [amountRaw, setAmountRaw] = useState("$1,250,000")
  const [fico, setFico] = useState("720")
  const [purpose, setPurpose] = useState<LoanPurpose>("purch")
  const [occupancy, setOccupancy] = useState<Occupancy>("inv")
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  const adjustments = adjustmentsForProgram(program)

  useEffect(() => {
    setChecked({})
  }, [program])

  const result = useMemo(
    () =>
      calcMaxLtv({
        program,
        amount: parseAmount(amountRaw),
        fico: parseInt(fico, 10) || 0,
        purpose,
        occupancy,
        checked,
      }),
    [program, amountRaw, fico, purpose, occupancy, checked],
  )

  function formatAmountOnBlur() {
    const n = parseAmount(amountRaw)
    if (n > 0) setAmountRaw(formatUsd(n))
  }

  return (
    <div className="nqm-worksheet mb-11 mt-[26px] overflow-hidden rounded text-white shadow-[0_1px_2px_rgba(19,19,19,.05),0_8px_22px_rgba(19,19,19,.06)] bg-uff-ink print:hidden">
      <div className="flex flex-wrap items-center gap-3.5 border-b border-white/12 px-[22px] py-4">
        <h2 className="m-0 font-archivo text-[19px] font-extrabold uppercase tracking-[-0.01em]">
          Max LTV <span className="text-uff-red">Worksheet</span>
        </h2>
        <p className="m-0 text-[12.5px] text-[#9C9CA3]">
          Enter the scenario. The ledger shows the base LTV from the grid, then every cap and reduction applied.
        </p>
      </div>

      <div className="grid grid-cols-1 min-[901px]:grid-cols-[1.12fr_.88fr]">
        <div className="px-[22px] pb-6 pt-5">
          <div className="mb-3.5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="nqm-amt">
                Loan amount
              </label>
              <input
                id="nqm-amt"
                type="text"
                inputMode="numeric"
                value={amountRaw}
                onChange={(e) => setAmountRaw(e.target.value)}
                onBlur={formatAmountOnBlur}
                className={fieldClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="nqm-fico">
                Qualifying FICO
              </label>
              <input
                id="nqm-fico"
                type="number"
                min={500}
                max={850}
                step={1}
                value={fico}
                onChange={(e) => setFico(e.target.value)}
                className={fieldClass}
              />
            </div>
          </div>

          <div className="mb-3.5 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="nqm-purpose">
                Loan purpose
              </label>
              <select
                id="nqm-purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value as LoanPurpose)}
                className={selectClass}
              >
                <option value="purch" className="text-uff-ink">
                  Purchase
                </option>
                <option value="rt" className="text-uff-ink">
                  Rate &amp; term refinance
                </option>
                <option value="co" className="text-uff-ink">
                  Cash-out refinance
                </option>
              </select>
            </div>
            {program === "full" ? (
              <div>
                <label className={labelClass} htmlFor="nqm-occ">
                  Occupancy
                </label>
                <select
                  id="nqm-occ"
                  value={occupancy}
                  onChange={(e) => setOccupancy(e.target.value as Occupancy)}
                  className={selectClass}
                >
                  <option value="inv" className="text-uff-ink">
                    Investment property
                  </option>
                  <option value="second" className="text-uff-ink">
                    Second home
                  </option>
                  <option value="primary" className="text-uff-ink">
                    Primary residence
                  </option>
                </select>
              </div>
            ) : null}
          </div>

          <div className="mb-2 mt-[18px] font-plex text-[10.5px] uppercase tracking-[0.14em] text-[#9C9CA3]">
            Caps &amp; adjustments
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-[7px] min-[480px]:grid-cols-2">
            {adjustments.map((a) => (
              <label key={a.id} className="flex cursor-pointer items-start gap-2 text-[12.5px] leading-[1.35] text-[#E4E4E7]">
                <input
                  type="checkbox"
                  className="mt-0.5 accent-uff-red"
                  checked={Boolean(checked[a.id])}
                  onChange={(e) => setChecked((prev) => ({ ...prev, [a.id]: e.target.checked }))}
                />
                <span>{a.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col border-t border-white/10 bg-[#1B1B1F] px-[22px] pb-6 pt-5 min-[901px]:border-l min-[901px]:border-t-0">
          <div
            className={`rounded-[2px] border border-l-[5px] px-4 py-3.5 ${
              result.ok
                ? "border-uff-red bg-[rgba(213,20,15,.12)]"
                : "border-[#6E6E75] border-l-[#6E6E75] bg-white/5"
            }`}
          >
            <div className="font-plex text-[10.5px] uppercase tracking-[0.14em] text-[#F3B3B0]">Maximum LTV</div>
            <div className="mt-1 font-archivo text-[54px] font-extrabold leading-none tracking-[-0.03em]">
              {result.ok ? (
                <>
                  {formatPct(result.ltv).replace("%", "")}
                  <small className="text-[22px] tracking-normal text-uff-red">%</small>
                </>
              ) : (
                "—"
              )}
            </div>
            <div className="mt-[7px] text-[12.5px] text-[#DEDEE2]">{result.ok ? result.note : result.message}</div>
          </div>

          <div className="mt-4 flex-1 font-plex text-xs">
            {result.ok
              ? result.ledger.map((line, i) => (
                  <div
                    key={`${line.label}-${i}`}
                    className="flex justify-between gap-2.5 border-b border-dotted border-white/14 py-1.5"
                  >
                    <span className={line.cls === "total" ? "font-bold text-white" : "text-[#9C9CA3]"}>
                      {line.label}
                    </span>
                    <span
                      className={
                        line.cls === "sub"
                          ? "text-[#FF8C86]"
                          : line.cls === "cap"
                            ? "text-[#F3B3B0]"
                            : line.cls === "total"
                              ? "font-bold text-white"
                              : ""
                      }
                    >
                      {line.value}
                    </span>
                  </div>
                ))
              : null}
          </div>
          <p className="mt-3.5 text-[11.5px] leading-[1.45] text-[#8A8A91]">
            Guide only — not a credit decision, commitment to lend, or rate lock. Program guidelines and UFF
            underwriting govern in all cases.
          </p>
        </div>
      </div>
    </div>
  )
}
