"use client"

import { ChevronRight, Clock } from "lucide-react"
import { TurnTimesDialog } from "@/components/turn-times-dialog"
import { turnTimesData, type TurnTimesData } from "@/content/turn-times"
import {
  formatTurnTimeRangeSegment,
  formatTurnTimeTileValue,
  formatTurnTimeUnitLabel,
  turnTimeRangeBarPercent,
} from "@/lib/turn-times-display"

function ProofTile({ tile }: { tile: TurnTimesData["tiles"][number] }) {
  const displayValue = formatTurnTimeTileValue(tile.value, tile.unit)
  const unitLabel = formatTurnTimeUnitLabel(tile.unit)
  const rangePercent = turnTimeRangeBarPercent(tile.value, tile.rangeLow, tile.rangeHigh, tile.rangeUnit)

  return (
    <div>
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.04em] text-ink-muted">{tile.title}</p>
      <p className="mt-1.5 text-xl font-extrabold tabular-nums tracking-tight text-ink sm:text-2xl">
        {displayValue}
        {unitLabel ? <span className="ml-1 text-[11px] font-semibold text-ink-muted">{unitLabel}</span> : null}
      </p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-pill bg-muted" aria-hidden>
        <span className="block h-full rounded-pill bg-accent" style={{ width: `${rangePercent}%` }} />
      </div>
      <p className="mt-1.5 text-[10.5px] tabular-nums text-ink-muted">
        {formatTurnTimeRangeSegment(tile.rangeLow, tile.rangeUnit)}–
        {formatTurnTimeRangeSegment(tile.rangeHigh, tile.rangeUnit)}
      </p>
    </div>
  )
}

/** Replaces the old inline "Recent UW decision" note with a clickable proof card in the hero. */
export function HomeHeroProofCard() {
  return (
    <TurnTimesDialog
      data={turnTimesData}
      trigger={
        <button
          type="button"
          className="mt-6 block w-full max-w-[36rem] rounded-[var(--radius-card)] border border-hairline bg-surface-raised p-5 text-left shadow-[0_18px_44px_rgba(0,0,0,0.28)] transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-haspopup="dialog"
        >
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-sm font-bold tracking-tight text-ink">
              <Clock className="h-4 w-4 text-accent" aria-hidden />
              Recent turn times
            </span>
            <ChevronRight className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {turnTimesData.tiles.map((tile) => (
              <ProofTile key={tile.key} tile={tile} />
            ))}
          </div>

          <p className="mt-4 text-xs leading-relaxed text-ink-muted">
            Recent 60-day medians. Historical, not a guarantee.
          </p>
        </button>
      }
    />
  )
}
