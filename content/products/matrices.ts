import type { ProductMatrix } from "./types"

const LAST_UPDATED = "September 4, 2026"

export function matrixPdf(file: string, label: string, fileSize: string): ProductMatrix {
  return {
    href: `/pdfs/matrices/${file}`,
    label,
    fileSize,
    lastUpdated: LAST_UPDATED,
  }
}
