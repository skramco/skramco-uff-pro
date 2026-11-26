"use client"

import type { ReactNode } from "react"
import { Clock } from "lucide-react"
import type { TurnTimesData } from "@/content/turn-times"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatHoursMinutesValue, formatTurnTimeTileValue } from "@/lib/turn-times-display"
import { cn } from "@/lib/utils"

function formatUnitLabel(unit: string): string {
  if (unit === "hours:minutes") return "hours"
  if (unit === "business days") return "business days"
  return unit
}

function formatRangeSegment(value: string, unit: string): string {
  if (unit === "hours:minutes") {
    return formatHoursMinutesValue(value)
  }
  if (unit === "business days") {
    return `${value} business days`
  }
  return value
}

function TurnTimeTileCard({ tile }: { tile: TurnTimesData["tiles"][number] }) {
  const displayValue = formatTurnTimeTileValue(tile.value, tile.unit)
  const unitLabel = tile.unit === "hours:minutes" ? null : formatUnitLabel(tile.unit)
  const rangeText = `${formatRangeSegment(tile.rangeLow, tile.rangeUnit)}–${formatRangeSegment(tile.rangeHigh, tile.rangeUnit)}`

  return (
    <article
      className="flex flex-col rounded-[var(--radius-card)] border border-hairline bg-surface p-4 text-left"
      aria-label={`${tile.title}: ${displayValue}${unitLabel ? ` ${unitLabel}` : ""}`}
    >
      <h3 className="text-sm font-semibold text-ink">{tile.title}</h3>
      <p className="mt-3 text-3xl font-extrabold tabular-nums tracking-tight text-ink">{displayValue}</p>
      {unitLabel ? (
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink-muted">{unitLabel}</p>
      ) : null}
      <p className="mt-2 text-xs text-ink-muted">{tile.basis}</p>
      <p className="mt-3 flex-1 text-sm leading-snug text-ink-secondary">{tile.description}</p>
      <p className="mt-4 text-xs text-ink-muted tabular-nums">
        Middle half of files: {rangeText}
      </p>
    </article>
  )
}

type TurnTimesDialogProps = {
  data: TurnTimesData
  triggerClassName?: string
  triggerContent?: ReactNode
}

export function TurnTimesDialog({ data, triggerClassName, triggerContent }: TurnTimesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1.5 font-semibold text-white underline-offset-2 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--nav)]",
            triggerClassName,
          )}
          aria-haspopup="dialog"
        >
          {triggerContent ?? (
            <>
              <Clock className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
              Recent UW turn times
            </>
          )}
        </button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[90vh] max-w-3xl overflow-y-auto border-hairline bg-surface-raised p-6 sm:max-w-4xl"
        aria-describedby="turn-times-footnote"
      >
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl font-bold text-ink">Recent turn times</DialogTitle>
          <DialogDescription className="text-sm text-ink-muted">As of {data.asOfLabel}</DialogDescription>
        </DialogHeader>

        <p className="text-xs leading-relaxed text-ink-muted">
          Times are historical and not a guarantee of future turn times.
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.tiles.map((tile) => (
            <TurnTimeTileCard key={tile.key} tile={tile} />
          ))}
        </div>

        <p id="turn-times-footnote" className="text-xs leading-relaxed text-ink-muted">
          Typical = 60-day median. Middle half of files = middle half of files. Business time = Mon–Fri, 8 AM–5 PM
          Central, excluding federal holidays.
        </p>
      </DialogContent>
    </Dialog>
  )
}