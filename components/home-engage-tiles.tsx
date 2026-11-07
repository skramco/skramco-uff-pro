"use client"

import { useEffect, useState } from "react"
import { CalendarDays, Lock, TrendingUp } from "lucide-react"
import { RateLockAdvisorModal } from "@/components/rate-lock-advisor-modal"
import { formatDuration, getLockDeskClock, getMonthEndCountdown } from "@/lib/lock-desk-clock"
import { PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

function useNow(intervalMs = 1000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])
  return now
}

export function HomeEngageTiles() {
  const now = useNow()
  const desk = getLockDeskClock(now)
  const month = getMonthEndCountdown(now)
  const tick = formatDuration(desk.remainingMs)
  const [advisorOpen, setAdvisorOpen] = useState(false)

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 [&>*]:shadow-[0_12px_32px_rgba(31,41,46,0.12)]">
        <a
          href={PRO_PORTAL_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="panel group relative overflow-hidden p-4 duration-150 hover:border-accent"
        >
          <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden />
          <p className="caption flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-accent" />
            {desk.kind === "open" ? "Lock desk is open" : "Lock desk is closed"}
          </p>
          <p
            aria-live="polite"
            className={`data-num mt-2 text-2xl font-extrabold tracking-tight tabular-nums ${desk.urgency === "soon" ? "text-accent" : "text-ink"}`}
          >
            {tick.hours}
            <span className="text-lg">h</span> {String(tick.minutes).padStart(2, "0")}
            <span className="text-lg">m</span> {String(tick.seconds).padStart(2, "0")}
            <span className="text-lg">s</span>
          </p>
          <p className="mt-2 text-sm leading-snug text-ink-muted">{desk.detail}</p>
          <p className="mt-3 text-sm font-semibold text-accent">Create an account and lock today</p>
        </a>

        <button
          type="button"
          onClick={() => setAdvisorOpen(true)}
          className="panel group relative overflow-hidden p-4 text-left duration-150 hover:border-accent"
        >
          <span className="absolute inset-y-0 left-0 w-1 bg-ink" aria-hidden />
          <p className="caption flex items-center gap-1.5">
            <TrendingUp className="h-3.5 w-3.5 text-accent" />
            Rate Lock Advisor
          </p>
          <div className="mt-3 flex gap-2">
            <span className="inline-flex items-center rounded-md bg-accent px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-white">
              LOCK
            </span>
            <span className="inline-flex items-center rounded-md border border-hairline bg-surface px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-ink">
              FLOAT
            </span>
          </div>
          <p className="mt-3 text-sm font-bold tracking-tight text-ink">Should you lock this file or wait?</p>
          <p className="mt-2 text-sm leading-snug text-ink-muted">
            Open the advisor brokers use in PRO Portal. Treasury, 30-year, Fed funds, and a lock-or-float call.
          </p>
          <p className="mt-3 text-sm font-semibold text-accent">Open Rate Lock Advisor</p>
        </button>

        <a
          href={PRO_PORTAL_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="panel group relative overflow-hidden p-4 duration-150 hover:border-accent"
        >
          <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden />
          <p className="caption flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5 text-accent" />
            {month.monthName} close
          </p>
          <p className="data-num mt-2 text-2xl font-extrabold tracking-tight text-ink">{month.headline}</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-pill bg-muted">
            <div className="h-full bg-accent" style={{ width: `${month.elapsedPct}%` }} />
          </div>
          <p className="mt-2 text-sm leading-snug text-ink-muted">{month.detail}</p>
          <p className="mt-3 text-sm font-semibold text-accent">Start a file before month end</p>
        </a>
      </div>

      <RateLockAdvisorModal open={advisorOpen} onOpenChange={setAdvisorOpen} />
    </>
  )
}
