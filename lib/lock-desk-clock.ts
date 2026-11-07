import { lockDesk } from "@/content/lock-desk"

const TZ = "America/Chicago"

type ZonedParts = {
  weekday: string
  year: number
  month: number
  day: number
  hour: number
  minute: number
  second: number
}

export type LockDeskClock =
  | {
      kind: "open"
      remainingMs: number
      headline: string
      detail: string
      urgency: "ok" | "soon"
    }
  | {
      kind: "closed"
      remainingMs: number
      headline: string
      detail: string
      urgency: "ok"
    }

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function ymd(year: number, month: number, day: number) {
  return `${year}-${pad(month)}-${pad(day)}`
}

function getZonedParts(date: Date, timeZone = TZ): ZonedParts {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hourCycle: "h23",
  }).formatToParts(date)
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === type)?.value ?? "0"
  return {
    weekday: get("weekday"),
    year: Number(get("year")),
    month: Number(get("month")),
    day: Number(get("day")),
    hour: Number(get("hour")),
    minute: Number(get("minute")),
    second: Number(get("second")),
  }
}

function zonedLocalToUtcMs(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  second = 0,
) {
  const utc = Date.UTC(year, month - 1, day, hour, minute, second)
  const asTz = getZonedParts(new Date(utc))
  const tzAsUtc = Date.UTC(asTz.year, asTz.month - 1, asTz.day, asTz.hour, asTz.minute, asTz.second)
  return utc - (tzAsUtc - utc)
}

function addCalendarDays(year: number, month: number, day: number, delta: number) {
  const utc = Date.UTC(year, month - 1, day + delta)
  return {
    year: new Date(utc).getUTCFullYear(),
    month: new Date(utc).getUTCMonth() + 1,
    day: new Date(utc).getUTCDate(),
  }
}

function weekdayIndex(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month - 1, day)).getUTCDay()
}

function isWeekend(year: number, month: number, day: number) {
  const d = weekdayIndex(year, month, day)
  return d === 0 || d === 6
}

function isHoliday(year: number, month: number, day: number) {
  return (lockDesk.holidays as readonly string[]).includes(ymd(year, month, day))
}

function previousWeekday(year: number, month: number, day: number) {
  let next = addCalendarDays(year, month, day, -1)
  while (isWeekend(next.year, next.month, next.day)) {
    next = addCalendarDays(next.year, next.month, next.day, -1)
  }
  return next
}

function isEarlyCloseDay(year: number, month: number, day: number) {
  return (lockDesk.holidays as readonly string[]).some((iso) => {
    const [hy, hm, hd] = iso.split("-").map(Number)
    const prev = previousWeekday(hy, hm, hd)
    return prev.year === year && prev.month === month && prev.day === day
  })
}

function isDeskClosedAllDay(year: number, month: number, day: number) {
  return isWeekend(year, month, day) || isHoliday(year, month, day)
}

function nextOpenDay(year: number, month: number, day: number) {
  let next = { year, month, day }
  for (let i = 0; i < 14; i += 1) {
    if (!isDeskClosedAllDay(next.year, next.month, next.day)) return next
    next = addCalendarDays(next.year, next.month, next.day, 1)
  }
  return next
}

function closeHourFor(year: number, month: number, day: number) {
  if (isEarlyCloseDay(year, month, day)) {
    return { hour: lockDesk.earlyCloseHour, minute: lockDesk.earlyCloseMinute }
  }
  return { hour: lockDesk.closeHour, minute: lockDesk.closeMinute }
}

export function formatDuration(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000))
  const hours = Math.floor(total / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return {
    hours,
    minutes,
    seconds,
    label: `${hours}h ${pad(minutes)}m ${pad(seconds)}s`,
    short: `${hours} hr ${minutes} min`,
  }
}

export function getLockDeskClock(now = new Date()): LockDeskClock {
  const p = getZonedParts(now)
  const todayClosed = isDeskClosedAllDay(p.year, p.month, p.day)
  const close = closeHourFor(p.year, p.month, p.day)
  const openMs = zonedLocalToUtcMs(p.year, p.month, p.day, lockDesk.openHour, lockDesk.openMinute)
  const closeMs = zonedLocalToUtcMs(p.year, p.month, p.day, close.hour, close.minute)
  const nowMs = now.getTime()

  if (!todayClosed && nowMs >= openMs && nowMs < closeMs) {
    const remainingMs = closeMs - nowMs
    const clock = formatDuration(remainingMs)
    return {
      kind: "open",
      remainingMs,
      headline: clock.short,
      detail: `left to lock a loan today in PRO Portal. Desk closes ${close.hour === 14 ? "2:00 PM" : "6:00 PM"} CT.`,
      urgency: remainingMs <= 60 * 60 * 1000 ? "soon" : "ok",
    }
  }

  let openDay = { year: p.year, month: p.month, day: p.day }
  if (todayClosed || nowMs >= closeMs) {
    openDay = nextOpenDay(addCalendarDays(p.year, p.month, p.day, 1).year, addCalendarDays(p.year, p.month, p.day, 1).month, addCalendarDays(p.year, p.month, p.day, 1).day)
  } else if (nowMs < openMs && !todayClosed) {
    openDay = { year: p.year, month: p.month, day: p.day }
  }

  const nextOpenMs = zonedLocalToUtcMs(openDay.year, openDay.month, openDay.day, lockDesk.openHour, lockDesk.openMinute)
  const remainingMs = Math.max(0, nextOpenMs - nowMs)
  const clock = formatDuration(remainingMs)
  const when = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(nextOpenMs))

  return {
    kind: "closed",
    remainingMs,
    headline: clock.short,
    detail: `until you can lock a loan in PRO Portal. Desk opens ${when} CT.`,
    urgency: "ok",
  }
}

export function getMonthEndCountdown(now = new Date()) {
  const p = getZonedParts(now)
  const lastDay = new Date(Date.UTC(p.year, p.month, 0)).getUTCDate()
  const daysLeft = Math.max(0, lastDay - p.day)
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: TZ }).format(now)
  const elapsedPct = Math.round((p.day / lastDay) * 100)

  if (daysLeft === 0) {
    return {
      daysLeft,
      monthName,
      year: p.year,
      elapsedPct,
      headline: "Last day",
      detail: `of ${monthName}. Fund files today and make this the best closing month since 2020.`,
    }
  }

  return {
    daysLeft,
    monthName,
    year: p.year,
    elapsedPct,
    headline: `${daysLeft} day${daysLeft === 1 ? "" : "s"}`,
    detail: `left in ${monthName} to have your best closing month since 2020. Start the file in PRO Portal now.`,
  }
}
