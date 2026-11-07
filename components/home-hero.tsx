import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { portalScreens } from "@/content/portal-screens"
import { PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

export function HomeHero() {
  const pipeline = portalScreens[0]
  const pricing = portalScreens.find((shot) => shot.label === "Pricing") ?? portalScreens[3]

  return (
    <section className="home-hero">
      <div className="home-hero-glow" aria-hidden />
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
          <div className="max-w-[40rem]">
            <p className="home-hero-kicker">For mortgage brokers</p>
            <h1 className="home-hero-title">Approved in minutes. Not weeks.</h1>
            <p className="mt-5 max-w-[36rem] text-[17px] leading-relaxed text-white/75">
              If you broker with UFF, you start with the product. Originate it in PRO Portal. Piper stays on the file
              from first price through funded.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  Create your account
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-on-dark">
                <Link href="/pro-portal">Learn more</Link>
              </Button>
            </div>
          </div>

          <div className="home-hero-stage">
            <div className="home-hero-window">
              <div className="home-hero-chrome">
                <span className="home-hero-dot" />
                <span className="home-hero-dot" />
                <span className="home-hero-dot" />
                <span className="home-hero-chrome-title">PRO Portal · Pipeline</span>
              </div>
              <Image
                src={pipeline.src}
                alt={pipeline.alt}
                width={1440}
                height={860}
                priority
                className="h-auto w-full"
              />
            </div>

            <div className="home-hero-float home-hero-float-pricing">
              <div className="home-hero-window">
                <div className="home-hero-chrome">
                  <span className="home-hero-dot" />
                  <span className="home-hero-dot" />
                  <span className="home-hero-dot" />
                  <span className="home-hero-chrome-title">Pricing · Piper&apos;s Pick</span>
                </div>
                <Image src={pricing.src} alt={pricing.alt} width={900} height={540} className="h-auto w-full" />
              </div>
            </div>

            <div className="home-hero-float home-hero-float-piper">
              <p className="caption text-white/55">Piper</p>
              <p className="mt-1 text-sm font-semibold leading-snug text-white">
                On every file. She tells you the next step you own.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
