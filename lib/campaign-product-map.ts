import type { CampaignLandingPageData } from "@/lib/campaign-landing-types"
import type { ProductDetail } from "@/content/products/types"
import { getProduct } from "@/content/products"
import { portalScreenByLabel } from "@/content/portal-screens"

const CAMPAIGN_TYPE_TO_PRODUCT_SLUG: Record<string, string> = {
  fha_product_spotlight: "fha",
  conventional_product_spotlight: "conventional",
  non_qm_product_spotlight: "non-qm",
}

const TEXT_PRODUCT_RULES: { pattern: RegExp; slug: string }[] = [
  { pattern: /\bdscr\b|bank-statement|asset-depletion|non-qm|non qm/, slug: "non-qm" },
  { pattern: /\bfha\b/, slug: "fha" },
  { pattern: /\bva\b/, slug: "va" },
  { pattern: /\busda\b/, slug: "usda" },
  { pattern: /\bconventional\b/, slug: "conventional" },
  { pattern: /\binvestor\b/, slug: "investor" },
  { pattern: /\bhfa\b/, slug: "hfa" },
]

function campaignHaystack(data: Pick<CampaignLandingPageData, "slug" | "title">): string {
  return `${data.slug} ${data.title}`.toLowerCase()
}

export function resolveCampaignProductSlug(data: CampaignLandingPageData): string | null {
  const fromType = CAMPAIGN_TYPE_TO_PRODUCT_SLUG[data.campaignType]
  if (fromType) return fromType

  const hay = campaignHaystack(data)
  for (const rule of TEXT_PRODUCT_RULES) {
    if (rule.pattern.test(hay)) return rule.slug
  }

  return null
}

export function campaignProduct(data: CampaignLandingPageData): ProductDetail | undefined {
  const slug = resolveCampaignProductSlug(data)
  return slug ? getProduct(slug) : undefined
}

export function campaignProductFacts(product: ProductDetail, limit = 3): { label: string; value: string }[] {
  return product.parameters.slice(0, limit)
}

export function isProPortalCampaign(data: CampaignLandingPageData): boolean {
  if (data.campaignType === "pro_portal_feature_spotlight") return true
  const hay = campaignHaystack(data)
  return hay.includes("pro-portal") || hay.includes("pro portal")
}

function proPortalScreenLabel(data: CampaignLandingPageData): string {
  const hay = campaignHaystack(data)
  if (hay.includes("document") || hay.includes("upload")) return "Loan File"
  if (hay.includes("rate") || hay.includes("pricing") || hay.includes("one-click")) return "Pricing"
  if (hay.includes("pipeline") || hay.includes("workflow") || hay.includes("dashboard")) return "Pipeline"
  return "Overview"
}

export function campaignHeroVisual(
  data: CampaignLandingPageData,
): { src: string; alt: string; useStockHero: boolean } | null {
  if (isProPortalCampaign(data)) {
    const label = proPortalScreenLabel(data)
    const shot = portalScreenByLabel(label) ?? portalScreenByLabel("Overview")
    if (!shot) return null
    return { src: shot.src, alt: shot.alt, useStockHero: false }
  }

  if (data.heroImageUrl) {
    return { src: data.heroImageUrl, alt: data.title, useStockHero: true }
  }

  return null
}