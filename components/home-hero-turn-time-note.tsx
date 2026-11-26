"use client"

import { TurnTimesDialog } from "@/components/turn-times-dialog"
import { turnTimesData } from "@/content/turn-times"
import { formatTurnTimeTileValue } from "@/lib/turn-times-display"

type HomeHeroTurnTimeNoteProps = {
  uwDisplayValue: string
}

export function HomeHeroTurnTimeNote({ uwDisplayValue }: HomeHeroTurnTimeNoteProps) {
  return (
    <p className="mt-3 text-sm text-white/65">
      Recent UW decision:{" "}
      <TurnTimesDialog
        data={turnTimesData}
        triggerClassName="text-sm text-white/85"
        triggerContent={<span className="underline decoration-white/40 underline-offset-2">{uwDisplayValue}</span>}
      />{" "}
      typical (60-day median, not a guarantee)
    </p>
  )
}