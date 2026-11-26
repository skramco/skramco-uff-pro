"use client"

import { getLockDeskStatus } from "@/lib/lock-desk-clock"
import { useClientNow } from "@/lib/use-client-now"

function formatChangeTime(ms: number, includeWeekday: boolean) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    ...(includeWeekday ? { weekday: "short" as const } : {}),
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(ms))
}

/** Utility-bar pill mirroring the mockup's lock-desk chip: a status dot plus a short "opens/closes" time, Central. */
export function LockDeskChip() {
  const now = useClientNow(30_000)
  const status = now ? getLockDeskStatus(now) : null
  const isOpen = status?.kind === "open"

  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-pill border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-semibold">
      <span
        className={`h-2 w-2 shrink-0 rounded-full ${isOpen ? "bg-[#7bd389]" : "bg-[#f4a14a]"}`}
        aria-hidden
      />
      <span className="text-white/70">Lock desk</span>
      <span className="text-white" suppressHydrationWarning>
        {status ? (isOpen ? "Open" : "Closed") : "\u2014"}
      </span>
      {status ? (
        <span className="hidden text-white/70 sm:inline" suppressHydrationWarning>
          · {isOpen ? "closes" : "opens"} {formatChangeTime(status.changeAtMs, !isOpen)} CT
        </span>
      ) : null}
    </span>
  )
}
