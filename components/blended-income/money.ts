export function formatMoney(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function parseMoney(raw: string): number {
  const cleaned = raw.replace(/,/g, "").trim()
  if (cleaned === "" || cleaned === "." || cleaned === "-" || cleaned === "-.") return 0
  const value = Number(cleaned)
  return Number.isFinite(value) ? value : 0
}

export function formatPercent(ratio: number | null): string {
  if (ratio === null) return "n/a"
  return `${formatMoney(ratio * 100)}%`
}
