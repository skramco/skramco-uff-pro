import { Clock } from "lucide-react"
import { LockDeskChip } from "@/components/lock-desk-chip"
import { TurnTimesDialog } from "@/components/turn-times-dialog"
import { PROFESSIONAL_USE_NOTICE } from "@/content/disclosures"
import { turnTimesData } from "@/content/turn-times"
import { formatTurnTimeTileValue } from "@/lib/turn-times-display"

export function UtilityBar() {
  const uwTile = turnTimesData.tiles.find((tile) => tile.key === "uw")
  const uwDisplayValue = uwTile ? formatTurnTimeTileValue(uwTile.value, uwTile.unit) : "—"

  return (
    <div className="bg-nav text-sm text-white">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-2 lg:flex-row lg:items-center lg:justify-between">
        <p className="caption text-white/55">{PROFESSIONAL_USE_NOTICE}</p>
        <div className="flex flex-wrap items-center gap-2">
          <TurnTimesDialog
            data={turnTimesData}
            triggerClassName="gap-1.5 whitespace-nowrap rounded-pill border border-white/15 bg-white/5 px-3 py-1.5 hover:bg-white/10 hover:no-underline"
            triggerContent={
              <>
                <Clock className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                <span className="text-white/70">
                  UW<span className="hidden sm:inline"> decision</span>
                </span>
                <span className="data-num font-bold">{uwDisplayValue}</span>
                <span className="hidden text-white/70 sm:inline">typical</span>
              </>
            }
          />
          <LockDeskChip />
        </div>
      </div>
    </div>
  )
}
