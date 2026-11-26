import { describe, expect, it } from "vitest"
import { loadTurnTimesData, turnTimesDataSchema } from "../content/turn-times"
import { formatHoursMinutesValue, formatTurnTimeTileValue } from "./turn-times-display"

const validPayload = {
  asOf: "2026-11-25",
  asOfLabel: "November 25, 2026",
  tiles: [
    {
      key: "setup",
      title: "Setup to underwriting",
      value: "2:45",
      unit: "hours:minutes",
      basis: "typical business time",
      description: "File set up and in front of an underwriter",
      rangeLow: "1:01",
      rangeHigh: "7:14",
      rangeUnit: "hours:minutes",
    },
    {
      key: "uw",
      title: "Underwriting decision",
      value: "6:13",
      unit: "hours:minutes",
      basis: "typical business time",
      description: "From submission to first decision",
      rangeLow: "4:15",
      rangeHigh: "9:22",
      rangeUnit: "hours:minutes",
    },
    {
      key: "ctc",
      title: "Clear to close",
      value: "12.1",
      unit: "business days",
      basis: "typical business time",
      description: "After approval, once conditions are received",
      rangeLow: "8.3",
      rangeHigh: "15.3",
      rangeUnit: "business days",
    },
  ],
}

describe("turn-times display formatting", () => {
  it("formats hours:minutes values for display", () => {
    expect(formatHoursMinutesValue("2:45")).toBe("2h 45m")
    expect(formatHoursMinutesValue("6:13")).toBe("6h 13m")
    expect(formatHoursMinutesValue("0:05")).toBe("0h 5m")
  })

  it("leaves non-colon values unchanged", () => {
    expect(formatHoursMinutesValue("12.1")).toBe("12.1")
    expect(formatTurnTimeTileValue("12.1", "business days")).toBe("12.1")
  })
})

describe("turn-times.json loader", () => {
  it("parses the documented shape", () => {
    const data = loadTurnTimesData(validPayload)
    expect(data.asOf).toBe("2026-11-25")
    expect(data.tiles).toHaveLength(3)
    expect(data.tiles.map((t) => t.key)).toEqual(["setup", "uw", "ctc"])
  })

  it("loads the committed JSON file", () => {
    const data = loadTurnTimesData()
    expect(turnTimesDataSchema.safeParse(data).success).toBe(true)
    expect(data.asOfLabel).toMatch(/^\w+ \d{1,2}, \d{4}$/)
  })

  it("rejects wrong tile count", () => {
    const bad = {
      ...validPayload,
      tiles: validPayload.tiles.slice(0, 2),
    }
    expect(() => loadTurnTimesData(bad)).toThrow()
  })
})