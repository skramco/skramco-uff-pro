import { describe, expect, it } from "vitest"
import { formatTurnTimeAsOf } from "./turn-time-as-of"

const stamp = (central: string) => formatTurnTimeAsOf(new Date(central))

describe("formatTurnTimeAsOf", () => {
  it("shows the current weekday once 8:00 AM CT has passed", () => {
    expect(stamp("2026-11-06T08:00:00-06:00")).toBe("November 6, 2026, 8:00 AM CT")
    expect(stamp("2026-11-06T13:01:00-06:00")).toBe("November 6, 2026, 8:00 AM CT")
    expect(stamp("2026-11-06T23:59:00-06:00")).toBe("November 6, 2026, 8:00 AM CT")
  })

  it("keeps the previous weekday before 8:00 AM CT", () => {
    expect(stamp("2026-11-06T07:59:59-06:00")).toBe("November 5, 2026, 8:00 AM CT")
    expect(stamp("2026-11-10T07:00:00-06:00")).toBe("November 9, 2026, 8:00 AM CT")
    expect(stamp("2026-11-10T08:00:00-06:00")).toBe("November 10, 2026, 8:00 AM CT")
  })

  it("stays on Friday through the weekend", () => {
    expect(stamp("2026-11-07T00:30:00-06:00")).toBe("November 6, 2026, 8:00 AM CT")
    expect(stamp("2026-11-07T15:00:00-06:00")).toBe("November 6, 2026, 8:00 AM CT")
    expect(stamp("2026-11-08T23:59:00-06:00")).toBe("November 6, 2026, 8:00 AM CT")
  })

  it("keeps Friday until Monday 8:00 AM CT", () => {
    expect(stamp("2026-11-09T00:00:00-06:00")).toBe("November 6, 2026, 8:00 AM CT")
    expect(stamp("2026-11-09T07:59:00-06:00")).toBe("November 6, 2026, 8:00 AM CT")
    expect(stamp("2026-11-09T08:00:00-06:00")).toBe("November 9, 2026, 8:00 AM CT")
  })

  it("crosses month and year boundaries on the weekday calendar", () => {
    expect(stamp("2026-03-02T07:30:00-06:00")).toBe("February 27, 2026, 8:00 AM CT")
    expect(stamp("2026-01-01T07:00:00-06:00")).toBe("December 31, 2025, 8:00 AM CT")
    expect(stamp("2026-01-01T08:00:00-06:00")).toBe("January 1, 2026, 8:00 AM CT")
    expect(stamp("2026-01-03T10:00:00-06:00")).toBe("January 2, 2026, 8:00 AM CT")
    expect(stamp("2026-01-05T07:59:00-06:00")).toBe("January 2, 2026, 8:00 AM CT")
    expect(stamp("2026-01-05T08:00:00-06:00")).toBe("January 5, 2026, 8:00 AM CT")
  })

  it("uses Central Time across daylight-saving changes", () => {
    expect(stamp("2026-08-27T07:59:00-05:00")).toBe("August 26, 2026, 8:00 AM CT")
    expect(stamp("2026-08-27T08:00:00-05:00")).toBe("August 27, 2026, 8:00 AM CT")
    expect(stamp("2026-03-09T07:30:00-05:00")).toBe("March 6, 2026, 8:00 AM CT")
    expect(stamp("2026-03-09T08:00:00-05:00")).toBe("March 9, 2026, 8:00 AM CT")
    expect(stamp("2026-11-01T01:30:00-05:00")).toBe("October 30, 2026, 8:00 AM CT")
    expect(stamp("2026-11-01T01:30:00-06:00")).toBe("October 30, 2026, 8:00 AM CT")
  })

  it("still advances on a weekday holiday", () => {
    expect(stamp("2026-11-26T09:00:00-06:00")).toBe("November 26, 2026, 8:00 AM CT")
  })
})
