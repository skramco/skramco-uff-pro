export const lockDesk = {
  hours: "8:00 AM – 6:00 PM",
  timezone: "CT",
  openHour: 8,
  openMinute: 0,
  closeHour: 18,
  closeMinute: 0,
  earlyCloseHour: 14,
  earlyCloseMinute: 0,
  /** Federal holidays the lock desk is closed. YYYY-MM-DD in Central Time. */
  holidays: [
    "2026-09-07",
    "2026-11-26",
    "2026-12-25",
    "2027-01-01",
    "2027-05-31",
    "2027-07-04",
    "2027-09-06",
    "2027-11-25",
    "2027-12-25",
  ],
  holidayNote:
    "Closed New Year's Day, Memorial Day, Independence Day, Labor Day, Thanksgiving, and Christmas. Early close at 2:00 PM CT the weekday before a holiday.",
  asOf: "August 2026",
} as const
