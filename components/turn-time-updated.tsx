"use client"

import { useEffect, useRef } from "react"
import { formatTurnTimeAsOf } from "@/lib/turn-time-as-of"

const REFRESH_MS = 60_000

export function TurnTimeUpdated({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Server HTML is empty; stamp is written only in the browser.
    const update = () => {
      node.textContent = `updated ${formatTurnTimeAsOf(new Date())}`
    }

    update()
    const id = window.setInterval(update, REFRESH_MS)
    return () => window.clearInterval(id)
  }, [])

  return <span ref={ref} className={className} suppressHydrationWarning />
}
