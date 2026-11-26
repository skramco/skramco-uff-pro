import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"
import type { CampaignLandingPageData } from "@/lib/campaign-landing-types"
import {
  campaignHeroVisual,
  campaignProduct,
  campaignProductFacts,
} from "@/lib/campaign-product-map"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"
import { CampaignTurnTimesCard } from "@/components/campaign-landing/campaign-turn-times-card"

interface Props {
  data: CampaignLandingPageData
}

export function CampaignLandingPage({ data }: Props) {
  const product = campaignProduct(data)
  const facts = product ? campaignProductFacts(product) : []
  const heroVisual = campaignHeroVisual(data)

  return (
    <div className="min-h-screen bg-surface">
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="caption mb-4">UFF Wholesale · Broker resource</p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{data.title}</h1>
            <p className="prose-body mt-4">{data.subtitle}</p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-10">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          {heroVisual ? (
            <div className="-mt-6 overflow-hidden border border-hairline">
              {heroVisual.useStockHero ? (
                <Image
                  src={heroVisual.src}
                  alt={heroVisual.alt}
                  width={1536}
                  height={1024}
                  sizes="(min-width: 896px) 896px, 100vw"
                  className="h-auto w-full object-cover"
                />
              ) : (
                <Image
                  src={heroVisual.src}
                  alt={heroVisual.alt}
                  width={1200}
                  height={720}
                  sizes="(min-width: 896px) 896px, 100vw"
                  className="h-auto w-full object-cover"
                />
              )}
            </div>
          ) : null}

          {facts.length > 0 ? (
            <div>
              <h2 className="text-lg font-bold text-ink">{product!.name} at a glance</h2>
              <dl className="mt-3 grid gap-3 sm:grid-cols-3">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-[var(--radius-card)] border border-hairline bg-surface-raised px-4 py-3"
                  >
                    <dt className="text-xs font-medium uppercase tracking-wide text-ink-muted">{fact.label}</dt>
                    <dd className="mt-1 text-base font-semibold text-ink">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <CampaignTurnTimesCard />

          {product ? (
            <p>
              <Link
                href={product.href}
                className="text-sm font-semibold text-accent underline-offset-2 hover:underline"
              >
                View {product.name} product details
                <ArrowRight className="ml-1 inline h-4 w-4" aria-hidden />
              </Link>
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 border-y border-hairline py-6">
            <Button asChild>
              <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Create your broker account
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <a
              href={PRO_PORTAL_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-accent underline-offset-2 hover:underline"
            >
              Log in
            </a>
          </div>
        </div>
      </section>

      {data.keyTakeaways.length > 0 ? (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-center text-3xl font-bold text-ink">Key takeaways for brokers</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {data.keyTakeaways.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-lg border border-hairline bg-surface-raised p-5 shadow-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-6 w-6 flex-shrink-0 text-accent" />
                    <p className="leading-relaxed text-ink-secondary">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-surface-raised py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-10">
            {data.sections.map((section) => (
              <Card key={section.heading} className="border-l-4 border-l-accent shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-ink">{section.heading}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="whitespace-pre-line leading-relaxed text-ink-muted">{section.body}</p>
                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="space-y-2 text-ink-muted">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="font-bold text-accent">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}