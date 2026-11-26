import type { MetadataRoute } from "next"
import { listCampaignSlugs } from "@/lib/campaign-pages"

const BASE_URL = "https://uff.pro"

/** Public static app routes (excludes API, feature-flagged, and redirect-only paths). */
const STATIC_ROUTES = [
  "/",
  "/contact",
  "/industry-news",
  "/licensing",
  "/products",
  "/pro-portal",
  "/piper",
  "/resources",
  "/resources/cheat-sheets/dscr",
  "/resources/cheat-sheets/du-vs-lpa",
  "/resources/cheat-sheets/non-qm",
  "/calculators/non-qm/core/blended-income",
  "/loan-products/conventional",
  "/loan-products/fha",
  "/loan-products/va",
  "/loan-products/usda",
  "/loan-products/non-qm",
  "/loan-products/investor",
  "/loan-products/hfa",
  "/loan-products/non-qm-core",
  "/matrix/va",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((path) => ({
    url: path === "/" ? BASE_URL : `${BASE_URL}${path}`,
    lastModified,
  }))

  const campaignEntries: MetadataRoute.Sitemap = listCampaignSlugs().map((slug) => ({
    url: `${BASE_URL}/lp/${slug}`,
    lastModified,
  }))

  return [...staticEntries, ...campaignEntries]
}