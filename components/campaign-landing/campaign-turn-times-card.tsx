import { turnTimesData } from "@/content/turn-times"
import { formatTurnTimeTileValue } from "@/lib/turn-times-display"

function tileUnitSuffix(unit: string): string {
  if (unit === "business days") return "days"
  if (unit === "hours:minutes") return ""
  return unit
}

export function CampaignTurnTimesCard() {
  const { tiles, asOfLabel } = turnTimesData

  return (
    <aside
      className="rounded-[var(--radius-card)] border border-hairline bg-surface-raised p-4"
      aria-label="Recent underwriting turn times"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-ink">Recent turn times</p>
        <p className="text-xs text-ink-muted">As of {asOfLabel}</p>
      </div>
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {tiles.map((tile) => {
          const suffix = tileUnitSuffix(tile.unit)
          const display = formatTurnTimeTileValue(tile.value, tile.unit)
          return (
            <div key={tile.key} className="rounded-md border border-hairline bg-surface px-3 py-2 text-center">
              <p className="text-xl font-extrabold tabular-nums tracking-tight text-ink">
                {display}
                {suffix ? ` ${suffix}` : null}
              </p>
              <p className="mt-1 text-xs leading-snug text-ink-muted">{tile.title}</p>
            </div>
          )
        })}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-muted">Recent 60-day median, not a guarantee</p>
    </aside>
  )
}