import Link from "next/link"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HomeTurnTimesCard } from "@/components/home-turn-times-card"
import { NMLS_ID } from "@/content/disclosures"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

const trustItems = [`Self sign-up`, `United Fidelity Funding Corp · NMLS #${NMLS_ID}`] as const

export function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero-glow" aria-hidden />
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12">
          <div className="max-w-[40rem]">
            <p className="home-hero-kicker">
              <span className="home-hero-kicker-dash" aria-hidden />
              UFF Wholesale · For mortgage brokers
            </p>
            <h1 className="home-hero-title">Fast underwriting turn times. Less waiting around.</h1>
            <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-white/75">
              If you broker with UFF, you start with the product. Originate it in PRO Portal. Piper stays on the file
              from first price through funded.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                    Create your broker account
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="btn-on-dark">
                  <Link href="/products">See loan products</Link>
                </Button>
              </div>
              <a
                href={PRO_PORTAL_LOGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-white/85 underline-offset-4 hover:text-white hover:underline"
              >
                Already a UFF broker? Log in
              </a>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/70">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-white" aria-hidden />
                  {item}
                </li>
              ))}
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-white" aria-hidden />
                <Link href="/licensing" className="underline decoration-white/40 underline-offset-2 hover:text-white">
                  Licensing by state
                </Link>
              </li>
            </ul>
          </div>

          <HomeTurnTimesCard />
        </div>
      </div>
    </section>
  )
}
