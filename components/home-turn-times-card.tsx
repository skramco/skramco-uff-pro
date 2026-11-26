import Image from "next/image"
import { TurnTimesDialog } from "@/components/turn-times-dialog"
import { portalScreens } from "@/content/portal-screens"
import { turnTimesData, type TurnTimesData } from "@/content/turn-times"
import {
  formatTurnTimeRangeSegment,
  formatTurnTimeTileValue,
  turnTimeRangeBarPercent,
} from "@/lib/turn-times-display"

/** Short inline suffix for the compact tile value (e.g. "12.1 days"), unlike the dialog's wider "business days" label. */
function shortUnitSuffix(unit: string): string | null {
  if (unit === "business days") return "days"
  return null
}

function TurnTimeTile({ tile }: { tile: TurnTimesData["tiles"][number] }) {
  const displayValue = formatTurnTimeTileValue(tile.value, tile.unit)
  const unitLabel = shortUnitSuffix(tile.unit)
  const rangePercent = turnTimeRangeBarPercent(tile.value, tile.rangeLow, tile.rangeHigh, tile.rangeUnit)
  const rangeText = `${formatTurnTimeRangeSegment(tile.rangeLow, tile.rangeUnit)}–${formatTurnTimeRangeSegment(tile.rangeHigh, tile.rangeUnit)}`

  return (
    <div className="px-3 py-3 sm:px-4">
      <p className="text-sm font-semibold text-ink-secondary">{tile.title}</p>
      <p className="data-num mt-1.5 text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
        {displayValue}
        {unitLabel ? <span className="ml-1 text-sm font-semibold text-ink-secondary">{unitLabel}</span> : null}
      </p>
      <p className="mt-1.5 text-xs tabular-nums text-ink-muted">Middle half of files: {rangeText}</p>
      <div className="relative mt-2.5 h-1.5 rounded-pill bg-muted" aria-hidden>
        <span
          className="absolute inset-y-0 left-0 block rounded-pill bg-[#9fb0b8]"
          style={{ width: `${rangePercent}%` }}
        />
        <span className="absolute -top-1 h-3.5 w-[3px] rounded-sm bg-ink" style={{ left: `${rangePercent}%` }} />
      </div>
    </div>
  )
}

/** The hero's right-column "proof" card: live turn-time tiles, a PRO Portal screenshot, and a link into the full turn-times dialog. */
export function HomeTurnTimesCard() {
  const pipeline = portalScreens[0]

  return (
    <aside
      className="panel overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.25)]"
      aria-labelledby="home-turn-times-heading"
    >
      <div className="flex items-start justify-between gap-3 px-5 pb-1 pt-5">
        <div>
          <h2 id="home-turn-times-heading" className="text-lg font-bold tracking-tight text-ink">
            Recent turn times
          </h2>
          <p className="mt-0.5 text-sm text-ink-muted">Typical business time, 60-day median</p>
        </div>
        <span className="whitespace-nowrap rounded-pill bg-muted px-2.5 py-1 text-xs font-semibold text-ink-secondary">
          Updated {turnTimesData.asOfLabel}
        </span>
      </div>

      <div className="grid grid-cols-1 divide-y divide-hairline px-2 pb-1.5 pt-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {turnTimesData.tiles.map((tile) => (
          <TurnTimeTile key={tile.key} tile={tile} />
        ))}
      </div>

      <div className="mx-4 mb-4 hidden overflow-hidden rounded-card border border-hairline sm:mx-[18px] sm:block">
        <div className="flex items-center gap-1.5 bg-muted px-2.5 py-1.5 text-xs font-semibold text-ink-muted">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-[#cfd6da]" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-[#cfd6da]" aria-hidden />
          <span className="ml-1">PRO Portal · Pipeline</span>
        </div>
        <Image src={pipeline.src} alt={pipeline.alt} width={1440} height={860} className="h-auto w-full" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-hairline bg-surface px-5 py-3.5">
        <p className="max-w-[40ch] text-xs leading-relaxed text-ink-muted">
          Historical medians, Mon–Fri 8 AM–5 PM CT. Not a guarantee of future turn times; individual files vary.
        </p>
        <TurnTimesDialog
          data={turnTimesData}
          triggerClassName="whitespace-nowrap text-sm font-semibold text-accent-dark hover:underline"
          triggerContent={<>How we measure →</>}
        />
      </div>
    </aside>
  )
}
