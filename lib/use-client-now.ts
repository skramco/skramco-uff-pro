"use client"

import { useEffect, useState } from "react"

/**
 * Current time for view-time UI. Returns null until mounted so SSR/prerender
 * HTML does not bake in a build-time clock.
 */
export function useClientNow(intervalMs = 1000): Date | null {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = window.setInterval(() => setNow(new Date()), intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return now
}