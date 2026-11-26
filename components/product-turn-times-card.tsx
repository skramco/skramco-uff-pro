"use client"

import { turnTimesData } from "@/content/turn-times"
import { formatTurnTimeTileValue } from "@/lib/turn-times-display"
import { TurnTimesDialog } from "@/components/turn-times-dialog"

/** Small sticky-rail card: recent turn times, reusing the same data and formatter as the home hero. */
export function ProductTurnTimesCard() {
  const tile = turnTimesData.tiles.find((item) => item.key === "uw") ?? turnTimesData.tiles[0]
  const displayValue = formatTurnTimeTileValue(tile.value, tile.unit)

  return (
    <div className="panel p-5">
      <p className="caption">Turn times</p>
      <p className="mt-2 text-2xl font-extrabold tabular-nums tracking-tight text-ink">{displayValue}</p>
      <p className="mt-1 text-xs text-ink-muted">{tile.title}</p>
      <p className="mt-2 text-xs text-ink-muted">Recent 60-day median, not a guarantee.</p>
      <TurnTimesDialog
        data={turnTimesData}
        triggerClassName="mt-3 inline-flex text-sm font-semibold text-accent hover:underline"
        triggerContent={<>See all turn times</>}
      />
    </div>
  )
}
