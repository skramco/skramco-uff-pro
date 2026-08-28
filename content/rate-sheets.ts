export type RateSheet = {
  id: string
  region: string
  href: string
  publishedAt: string
  fileSize: string
}

/**
 * Rate sheet PDFs. Change href / publishedAt here — do not edit page components
 * to publish a new sheet. Access codes stay in the password dialog (not this file).
 *
 * Canonical West URL is uffwest.com (not the GitHub Pages copy).
 */
export const rateSheets: RateSheet[] = [
  {
    id: "west",
    region: "West",
    href: "https://uffwest.com/rates/UFF-RatesWest.pdf",
    publishedAt: "August 26, 2026",
    fileSize: "1.4 MB",
  },
  {
    id: "east",
    region: "East",
    href: "https://uffrates.github.io/UFFEast-Ratesheet.pdf",
    publishedAt: "August 26, 2026",
    fileSize: "1.3 MB",
  },
]

export function rateSheetById(id: string): RateSheet | undefined {
  return rateSheets.find((sheet) => sheet.id === id)
}
