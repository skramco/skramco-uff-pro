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