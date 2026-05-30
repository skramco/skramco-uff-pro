export interface CampaignLandingSection {
  heading: string
  body: string
  bullets?: string[]
}

export interface CampaignLandingPageData {
  slug: string
  title: string
  subtitle: string
  campaignId: string
  campaignType: string
  publishedAt: string
  heroImageUrl?: string | null
  keyTakeaways: string[]
  sections: CampaignLandingSection[]
  ctaLabel: string
  secondaryCtaLabel?: string
  metaDescription: string
}
