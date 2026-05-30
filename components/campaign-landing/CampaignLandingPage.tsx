import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowRight } from "lucide-react"
import type { CampaignLandingPageData } from "@/lib/campaign-landing-types"
import { PRO_PORTAL_LOGIN_URL } from "@/lib/pro-portal-url"

interface Props {
  data: CampaignLandingPageData
}

export function CampaignLandingPage({ data }: Props) {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-red-600 via-red-700 to-gray-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/15 text-white border-white/20 hover:bg-white/20">
              UFF Wholesale · Broker Resource
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{data.title}</h1>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">{data.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-red-600 hover:bg-red-50 font-semibold">
                <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                  {data.ctaLabel}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent"
              >
                <Link href="/get-approved">{data.secondaryCtaLabel ?? "Become a Partner"}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {data.heroImageUrl && (
        <section className="container mx-auto px-4 -mt-10 relative z-10">
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border-4 border-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.heroImageUrl} alt={data.title} className="w-full h-auto object-cover" />
          </div>
        </section>
      )}

      {data.keyTakeaways.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key takeaways for brokers</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {data.keyTakeaways.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-lg border border-red-100 bg-white p-5 shadow-sm"
                  >
                    <CheckCircle2 className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-10">
            {data.sections.map((section) => (
              <Card key={section.heading} className="border-l-4 border-l-red-500 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-900">{section.heading}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.body}</p>
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="space-y-2 text-gray-600">
                      {section.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span className="text-red-600 font-bold">•</span>
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

      <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to put this into action?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Log in to PRO Portal to submit loans, track conditions, and access UFF&apos;s full wholesale toolkit.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                {data.ctaLabel}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-gray-500 text-white hover:bg-white/10">
              <Link href="/pro-portal">Learn about PRO Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t bg-gray-50">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>United Fidelity Funding Corp · NMLS #34381 · Equal Housing Lender</p>
          <p className="mt-2">
            <Link href="/contact" className="text-red-600 hover:underline">
              Contact your AE
            </Link>
            {" · "}
            <Link href="/licensing" className="text-red-600 hover:underline">
              Licensing
            </Link>
          </p>
        </div>
      </footer>
    </div>
  )
}
