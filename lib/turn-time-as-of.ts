const TIME_ZONE = "America/Chicago"
const UPDATE_HOUR = 8

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

type CivilDate = {
  year: number
  month: number
  day: number
}

function chicagoParts(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(now)

  const read = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((part) => part.type === type)?.value ?? "0")

  const hour = read("hour")

  return {
    year: read("year"),
    month: read("month"),
    day: read("day"),
    hour: hour === 24 ? 0 : hour,
  }
}

function addDays(date: CivilDate, delta: number): CivilDate {
  const utc = new Date(Date.UTC(date.year, date.month - 1, date.day + delta))
  return {
    year: utc.getUTCFullYear(),
    month: utc.getUTCMonth() + 1,
    day: utc.getUTCDate(),
  }
}

function isWeekend(date: CivilDate) {
  const weekday = new Date(Date.UTC(date.year, date.month - 1, date.day)).getUTCDay()
  return weekday === 0 || weekday === 6
}

/**
 * Latest weekday 8:00 AM America/Chicago at or before `now`.
 * Saturday and Sunday stay on the previous Friday. A weekday before 8:00 AM
 * stays on the previous weekday, so Monday morning still shows Friday.
 */
export function formatTurnTimeAsOf(now = new Date()): string {
  const parts = chicagoParts(now)
  let date: CivilDate = { year: parts.year, month: parts.month, day: parts.day }

  if (!isWeekend(date) && parts.hour < UPDATE_HOUR) {
    date = addDays(date, -1)
  }

  while (isWeekend(date)) {
    date = addDays(date, -1)
  }

  return `${MONTHS[date.month - 1]} ${date.day}, ${date.year}, 8:00 AM CT`
}
