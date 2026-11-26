import { z } from "zod"
import turnTimesJson from "./turn-times.json"

export type TurnTimeStatus = "on-time" | "extended" | "unknown"

export type TurnTimeRow = {
  product: string
  milestone: string
  value: string
  status: TurnTimeStatus
}

const tileKeySchema = z.enum(["setup", "uw", "ctc"])

const turnTimeTileSchema = z.object({
  key: tileKeySchema,
  title: z.string().min(1),
  value: z.string().min(1),
  unit: z.string().min(1),
  basis: z.string().min(1),
  description: z.string().min(1),
  rangeLow: z.string().min(1),
  rangeHigh: z.string().min(1),
  rangeUnit: z.string().min(1),
})

export const turnTimesDataSchema = z.object({
  asOf: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  asOfLabel: z.string().min(1),
  tiles: z.array(turnTimeTileSchema).length(3),
})

export type TurnTimeTile = z.infer<typeof turnTimeTileSchema>
export type TurnTimesData = z.infer<typeof turnTimesDataSchema>

export function loadTurnTimesData(raw: unknown = turnTimesJson): TurnTimesData {
  return turnTimesDataSchema.parse(raw)
}

export const turnTimesData = loadTurnTimesData()

function tileDisplayValue(tile: TurnTimeTile): string {
  if (tile.unit === "hours:minutes") {
    return tile.value
  }
  if (tile.unit === "business days") {
    return `${tile.value} days`
  }
  return tile.value
}

function rowFromTile(tile: TurnTimeTile, milestone: string): TurnTimeRow {
  return {
    product: "All products",
    milestone,
    value: tileDisplayValue(tile),
    status: "on-time",
  }
}

const uwTile = turnTimesData.tiles.find((tile) => tile.key === "uw")
const ctcTile = turnTimesData.tiles.find((tile) => tile.key === "ctc")

/** @deprecated Legacy row shape; values are derived from `turn-times.json`. */
export const turnTimes = {
  rows: [
    ...(uwTile ? [rowFromTile(uwTile, "Underwriting")] : []),
    ...(ctcTile ? [rowFromTile(ctcTile, "Clear to close")] : []),
  ] satisfies TurnTimeRow[],
}

export function underwritingTurnTime(): TurnTimeRow | undefined {
  return turnTimes.rows.find((row) => row.milestone === "Underwriting")
}

export function clearToCloseTurnTime(): TurnTimeRow | undefined {
  return turnTimes.rows.find((row) => row.milestone === "Clear to close")
}