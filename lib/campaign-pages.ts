import fs from "fs"
import path from "path"
import type { CampaignLandingPageData } from "./campaign-landing-types"

const CONTENT_DIR = path.join(process.cwd(), "content", "campaigns")

export function getCampaignContentDir(): string {
  return CONTENT_DIR
}

export function listCampaignSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return []
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
}

export function loadCampaignPage(slug: string): CampaignLandingPageData | null {
  const file = path.join(CONTENT_DIR, `${slug}.json`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, "utf8")
  return JSON.parse(raw) as CampaignLandingPageData
}
