/** Display `hours:minutes` JSON values (e.g. `2:45`) as `2h 45m`. */
export function formatHoursMinutesValue(value: string): string {
  const match = /^(\d+):(\d{2})$/.exec(value.trim())
  if (!match) return value
  const hours = Number(match[1])
  const minutes = Number(match[2])
  return `${hours}h ${minutes}m`
}

export function formatTurnTimeTileValue(value: string, unit: string): string {
  if (unit === "hours:minutes") {
    return formatHoursMinutesValue(value)
  }
  return value
}

/** Unit label shown under the headline value. `hours:minutes` is self-evident from the `Xh Ym` format, so it has none. */
export function formatTurnTimeUnitLabel(unit: string): string | null {
  if (unit === "hours:minutes") return null
  if (unit === "business days") return "business days"
  return unit
}

/** Render a range endpoint (`rangeLow` / `rangeHigh`) in the same style as the headline value. */
export function formatTurnTimeRangeSegment(value: string, unit: string): string {
  if (unit === "hours:minutes") {
    return formatHoursMinutesValue(value)
  }
  if (unit === "business days") {
    return `${value} business days`
  }
  return value
}

/** Parse a tile value's numeric magnitude: `hours:minutes` becomes total minutes, everything else is a plain number. */
function parseTurnTimeMagnitude(value: string, unit: string): number {
  if (unit === "hours:minutes") {
    const match = /^(\d+):(\d{2})$/.exec(value.trim())
    if (!match) return Number(value) || 0
    return Number(match[1]) * 60 + Number(match[2])
  }
  return Number(value)
}

/**
 * Position of `value` between `rangeLow` and `rangeHigh`, as a 0-100 percent for a range bar.
 * Clamped to `[0, 100]`; defaults to the midpoint when the range has no width.
 */
export function turnTimeRangeBarPercent(
  value: string,
  rangeLow: string,
  rangeHigh: string,
  rangeUnit: string,
): number {
  const low = parseTurnTimeMagnitude(rangeLow, rangeUnit)
  const high = parseTurnTimeMagnitude(rangeHigh, rangeUnit)
  if (high === low) return 50
  const current = parseTurnTimeMagnitude(value, rangeUnit)
  const percent = ((current - low) / (high - low)) * 100
  return Math.min(100, Math.max(0, percent))
}
