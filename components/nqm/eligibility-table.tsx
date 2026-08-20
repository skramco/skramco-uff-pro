import { formatDscrLtv, formatFullDocLtv, formatUsd, type DscrTier, type FullTier } from "@/lib/data/nqm-matrix"

type DscrProps = {
  variant: "dscr"
  tiers: DscrTier[]
  note: string
}

type FullProps = {
  variant: "full"
  tiers: FullTier[]
  note: string
}

export function EligibilityTable(props: DscrProps | FullProps) {
  return (
    <div className="overflow-hidden rounded-[3px] border border-[#E3E3E6] bg-white shadow-[0_1px_2px_rgba(19,19,19,.05),0_8px_22px_rgba(19,19,19,.06)]">
      <div className="bg-uff-ink px-3.5 py-[11px] font-archivo text-[11px] font-bold uppercase tracking-[0.16em] text-white print:print-color-adjust-exact">
        Program eligibility · Max LTV
      </div>
      <div className="table-scroll max-[900px]:overflow-x-auto">
        {props.variant === "dscr" ? <DscrGrid tiers={props.tiers} /> : <FullGrid tiers={props.tiers} />}
      </div>
      <div className="border-t border-[#E3E3E6] bg-[#FAFAFB] px-3.5 py-2.5 text-xs text-[#6B6B71]">{props.note}</div>
    </div>
  )
}

function DscrGrid({ tiers }: { tiers: DscrTier[] }) {
  return (
    <table className="w-full border-collapse text-[13.5px] max-[900px]:min-w-[660px] [&_tbody_tr:last-child_td]:border-b-0">
      <thead>
        <tr>
          <th rowSpan={2} className={thClass}>
            Max loan amount
          </th>
          <th rowSpan={2} className={thClass}>
            Reserves
          </th>
          <th rowSpan={2} className={thClass}>
            Min DSCR
          </th>
          <th rowSpan={2} className={thClass}>
            FICO
          </th>
          <th colSpan={3} className={`${thClass} bg-uff-red text-white print:print-color-adjust-exact`}>
            Max LTV
          </th>
        </tr>
        <tr>
          <th className={thClass}>Purchase</th>
          <th className={thClass}>R/T</th>
          <th className={thClass}>C/O</th>
        </tr>
      </thead>
      <tbody>
        {tiers.map((tier) =>
          tier.rows.map((row, i) => (
            <tr key={`${tier.max}-${row.fico}`} className="group">
              {i === 0 ? (
                <td rowSpan={tier.rows.length} className={tierCell}>
                  {formatUsd(tier.max)}
                </td>
              ) : null}
              {i === 0 ? (
                <td rowSpan={tier.rows.length} className={midCell}>
                  See below
                </td>
              ) : null}
              {i === 0 ? (
                <td rowSpan={tier.rows.length} className={midCell}>
                  {tier.minDscr.toFixed(2)}
                </td>
              ) : null}
              <td className={`${numCell} font-semibold`}>{row.fico}</td>
              <td className={invCell}>{formatDscrLtv(row.purch)}</td>
              <td className={invCell}>{formatDscrLtv(row.rt)}</td>
              <td className={invCell}>{formatDscrLtv(row.co)}</td>
            </tr>
          )),
        )}
      </tbody>
    </table>
  )
}

function FullGrid({ tiers }: { tiers: FullTier[] }) {
  return (
    <table className="w-full border-collapse text-[13.5px] max-[900px]:min-w-[660px] [&_tbody_tr:last-child_td]:border-b-0">
      <thead>
        <tr>
          <th rowSpan={2} className={thClass}>
            Max loan amount
          </th>
          <th rowSpan={2} className={thClass}>
            Max DTI
          </th>
          <th rowSpan={2} className={thClass}>
            Reserves
          </th>
          <th rowSpan={2} className={thClass}>
            FICO
          </th>
          <th colSpan={2} className={`${thClass} bg-uff-ink-2 text-white print:print-color-adjust-exact`}>
            Primary residence
          </th>
          <th colSpan={2} className={`${thClass} bg-uff-red text-white print:print-color-adjust-exact`}>
            Second home &amp; investment
          </th>
        </tr>
        <tr>
          <th className={thClass}>Purch / R&amp;T</th>
          <th className={thClass}>Cash-out</th>
          <th className={thClass}>Purch / R&amp;T</th>
          <th className={thClass}>C/O</th>
        </tr>
      </thead>
      <tbody>
        {tiers.map((tier) =>
          tier.rows.map((row, i) => {
            const pPrt = formatFullDocLtv(row.primary.prt)
            const pCo = formatFullDocLtv(row.primary.co)
            const iPrt = formatFullDocLtv(row.inv.prt)
            const iCo = formatFullDocLtv(row.inv.co)
            return (
              <tr key={`${tier.max}-${row.fico}`} className="group">
                {i === 0 ? (
                  <td rowSpan={tier.rows.length} className={tierCell}>
                    {formatUsd(tier.max)}
                  </td>
                ) : null}
                {i === 0 ? (
                  <td rowSpan={tier.rows.length} className={midCell}>
                    {tier.dti}%
                  </td>
                ) : null}
                {i === 0 ? (
                  <td rowSpan={tier.rows.length} className={midCell}>
                    {tier.reserves === "6 months"
                      ? "6 mos"
                      : tier.reserves === "9 months"
                        ? "9 mos"
                        : tier.reserves === "12 months"
                          ? "12 mos"
                          : tier.reserves}
                  </td>
                ) : null}
                <td className={`${numCell} font-semibold`}>{row.fico}</td>
                <td className={`${numCell} ${pPrt.na ? "text-[#A5A5AC]" : ""}`}>{pPrt.text}</td>
                <td className={`${numCell} ${pCo.na ? "text-[#A5A5AC]" : ""}`}>{pCo.text}</td>
                <td className={`${invCell} ${iPrt.na ? "text-[#A5A5AC]" : ""}`}>{iPrt.text}</td>
                <td className={`${invCell} ${iCo.na ? "text-[#A5A5AC]" : ""}`}>{iCo.text}</td>
              </tr>
            )
          }),
        )}
      </tbody>
    </table>
  )
}

const thClass =
  "whitespace-nowrap border-b border-[#E3E3E6] bg-[#EFEFF1] px-2.5 py-[9px] text-center font-archivo text-[10.5px] font-bold uppercase tracking-[0.1em] text-uff-ink"

const numCell =
  "border-b border-[#EEEEF0] px-2.5 py-[9px] text-center font-plex text-[13px] group-hover:bg-[#F6F6F7]"

const invCell =
  "border-b border-[#EEEEF0] bg-[#FFF8F8] px-2.5 py-[9px] text-center font-plex text-[13px] group-hover:bg-uff-red-tint"

const tierCell =
  "border-b border-[#EEEEF0] border-l-4 border-l-uff-red bg-[#FAFAFB] px-2.5 py-[9px] text-left align-middle font-archivo text-[14.5px] font-bold tracking-[-0.01em] group-hover:bg-[#F1F1F3]"

const midCell =
  "border-b border-[#EEEEF0] bg-[#FAFAFB] px-2.5 py-[9px] text-center align-middle font-plex text-[13px] font-medium text-uff-ink-2 group-hover:bg-[#F1F1F3]"
