import { describe, expect, it } from "vitest"
import type { CampaignLandingPageData } from "./campaign-landing-types"
import {
  campaignHeroVisual,
  campaignProductFacts,
  isProPortalCampaign,
  resolveCampaignProductSlug,
} from "./campaign-product-map"
import { getProduct } from "@/content/products"

function campaign(partial: Partial<CampaignLandingPageData> & Pick<CampaignLandingPageData, "slug" | "title">) {
  return {
    subtitle: "",
    campaignId: "test",
    campaignType: "custom_prompt",
    publishedAt: "2026-01-01T00:00:00.000Z",
    keyTakeaways: [],
    sections: [],
    ctaLabel: "Log in",
    metaDescription: "test",
    ...partial,
  } satisfies CampaignLandingPageData
}

describe("resolveCampaignProductSlug", () => {
  it("maps product spotlight campaign types", () => {
    expect(
      resolveCampaignProductSlug(
        campaign({ slug: "x", title: "y", campaignType: "fha_product_spotlight" }),
      ),
    ).toBe("fha")
    expect(
      resolveCampaignProductSlug(
        campaign({ slug: "x", title: "y", campaignType: "conventional_product_spotlight" }),
      ),
    ).toBe("conventional")
    expect(
      resolveCampaignProductSlug(
        campaign({ slug: "x", title: "y", campaignType: "non_qm_product_spotlight" }),
      ),
    ).toBe("non-qm")
  })

  it("infers non-qm from DSCR in slug", () => {
    expect(
      resolveCampaignProductSlug(
        campaign({
          slug: "dscr-vs-conventional-today-s-market-dynamics-02fc834e",
          title: "DSCR vs. Conventional",
        }),
      ),
    ).toBe("non-qm")
  })

  it("returns null when no clear product", () => {
    expect(
      resolveCampaignProductSlug(
        campaign({ slug: "smooth-operator", title: "Smooth operator", campaignType: "operational_tip" }),
      ),
    ).toBeNull()
  })
})

describe("isProPortalCampaign", () => {
  it("detects feature spotlight and slug hints", () => {
    expect(
      isProPortalCampaign(
        campaign({
          slug: "accelerate-loan-closures-with-pro-portal-s-one-click-rate-lo-fd9b2ce8",
          title: "Accelerate",
          campaignType: "pro_portal_feature_spotlight",
        }),
      ),
    ).toBe(true)
    expect(
      isProPortalCampaign(
        campaign({
          slug: "enhance-your-workflow-with-pro-portal-6467420c",
          title: "Enhance Your Workflow with PRO Portal",
          campaignType: "operational_tip",
        }),
      ),
    ).toBe(true)
  })
})

describe("campaignHeroVisual", () => {
  it("uses portal screenshots instead of stock art for PRO Portal campaigns", () => {
    const visual = campaignHeroVisual(
      campaign({
        slug: "frictionless-loan-closings-with-pro-portal-s-ai-document-upl-616c6847",
        title: "Frictionless loan closings with PRO Portal document upload",
        campaignType: "pro_portal_feature_spotlight",
        heroImageUrl: "https://example.com/stock.png",
      }),
    )
    expect(visual?.useStockHero).toBe(false)
    expect(visual?.src).toContain("/images/pro-portal-")
  })

  it("keeps remote hero for non-portal campaigns", () => {
    const url = "https://example.com/stock.png"
    const visual = campaignHeroVisual(
      campaign({
        slug: "the-market-is-loud-be-the-signal-38570af8",
        title: "The market is loud",
        heroImageUrl: url,
      }),
    )
    expect(visual).toEqual({ src: url, alt: "The market is loud", useStockHero: true })
  })
})

describe("campaignProductFacts", () => {
  it("returns at most three parameter rows", () => {
    const fha = getProduct("fha")
    expect(fha).toBeDefined()
    const facts = campaignProductFacts(fha!, 3)
    expect(facts).toHaveLength(3)
    expect(facts[0]).toMatchObject({ label: expect.any(String), value: expect.any(String) })
  })
})