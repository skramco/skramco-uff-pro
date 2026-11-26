import { z } from "zod"
import turnTimesJson from "./turn-times.json"

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