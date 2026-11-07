import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PiperHero } from "@/components/piper-hero"
import { PiperHighlight } from "@/components/piper-highlight"
import { pageMetadata } from "@/lib/seo"
import { PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

export const metadata = pageMetadata({
  title: "Piper | AI Pipeline Assistant for Mortgage Brokers",
  description:
    "Piper is UFF's AI Pipeline Assistant for mortgage brokers. She watches lock risk, LE dates, conditions, and stalled files, and tells you the next step you own.",
  path: "/piper",
})

export default function PiperPage() {
  return (
    <div>
      <PiperHero />
      <PiperHighlight showIntro={false} />

      <section className="band-nav">
        <div className="container mx-auto px-4">
          <h2 className="text-white">Use Piper on your next file</h2>
          <p className="mt-3 max-w-[40rem] text-white/70">
            Create a broker account and Piper is on the pipeline, the pricer, and the loan.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Create your account
              </a>
            </Button>
            <Button asChild variant="outline" className="btn-on-dark">
              <Link href="/pro-portal">See PRO Portal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
