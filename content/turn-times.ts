// The header "updated" stamp is not stored here. formatTurnTimeAsOf computes
// the latest weekday 8:00 AM CT when the page is viewed.

export type TurnTimeStatus = "on-time" | "extended" | "unknown"

export type TurnTimeRow = {
  product: string
  milestone: string
  value: string
  status: TurnTimeStatus
}

export const turnTimes = {
  rows: [
    {
      product: "All products",
      milestone: "Underwriting",
      value: "18 hrs",
      status: "on-time" as const,
    },
    {
      product: "All products",
      milestone: "Clear to close",
      value: "22 days",
      status: "on-time" as const,
    },
  ] satisfies TurnTimeRow[],
}

export function underwritingTurnTime(): TurnTimeRow | undefined {
  return turnTimes.rows.find((row) => row.milestone === "Underwriting")
}

export function clearToCloseTurnTime(): TurnTimeRow | undefined {
  return turnTimes.rows.find((row) => row.milestone === "Clear to close")
}
