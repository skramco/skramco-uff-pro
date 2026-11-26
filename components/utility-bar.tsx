import { TurnTimesDialog } from "@/components/turn-times-dialog"
import { lockDesk } from "@/content/lock-desk"
import { turnTimesData } from "@/content/turn-times"
import { PROFESSIONAL_USE_NOTICE } from "@/content/disclosures"

export function UtilityBar() {
  return (
    <div className="bg-nav text-[13px] text-white">
      <div className="container mx-auto flex flex-col gap-2 px-4 py-2 lg:flex-row lg:items-center lg:justify-between">
        <p className="caption text-white/55">{PROFESSIONAL_USE_NOTICE}</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 tabular-nums">
          <TurnTimesDialog data={turnTimesData} />
          <span className="hidden text-white/30 sm:inline" aria-hidden>
            ·
          </span>
          <span>
            Lock desk:{" "}
            <span className="font-semibold text-white">
              {lockDesk.hours} {lockDesk.timezone}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}