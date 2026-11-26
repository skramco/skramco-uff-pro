import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"
import type { CampaignLandingPageData } from "@/lib/campaign-landing-types"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

interface Props {
  data: CampaignLandingPageData
}

export function CampaignLandingPage({ data }: Props) {
  return (
    <div className="min-h-screen bg-surface">
      <section className="page-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <p className="caption mb-4">UFF Wholesale · Broker resource</p>
            <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{data.title}</h1>
            <p className="prose-body mt-4">{data.subtitle}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
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
        </div>
      </section>

      {data.heroImageUrl && (
        <section className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="max-w-4xl overflow-hidden border border-hairline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroImageUrl} alt={data.title} className="w-full h-auto object-cover" />
          </div>
        </section>
      )}

      {data.keyTakeaways.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-ink mb-8 text-center">Key takeaways for brokers</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {data.keyTakeaways.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-lg border border-hairline bg-surface-raised p-5 shadow-sm"
                  >
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-ink-secondary leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-surface-raised">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-10">
            {data.sections.map((section) => (
              <Card key={section.heading} className="border-l-4 border-l-accent shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-ink">{section.heading}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-ink-muted leading-relaxed whitespace-pre-line">{section.body}</p>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 text-ink-muted">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-accent font-bold">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="band-nav">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white">Ready to put this into action?</h2>
          <p className="mx-auto mb-8 mt-4 max-w-2xl text-white/70">
            Log in to PRO Portal to submit loans, track conditions, and access UFF&apos;s full wholesale toolkit.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Create your broker account
              </a>
            </Button>
            <a
              href={PRO_PORTAL_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-white/80 underline-offset-2 hover:text-white hover:underline"
            >
              Log in
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}