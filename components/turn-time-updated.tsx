"use client"

import { useEffect, useRef } from "react"
import { formatTurnTimeAsOf } from "@/lib/turn-time-as-of"

const REFRESH_MS = 60_000

export function TurnTimeUpdated({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // React leaves a mismatched server date in the DOM under
    // suppressHydrationWarning, so write the view-time stamp directly.
    const update = () => {
      node.textContent = `updated ${formatTurnTimeAsOf(new Date())}`
    }

    update()
    const id = window.setInterval(update, REFRESH_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      updated {formatTurnTimeAsOf(new Date())}
    </span>
  )
}
