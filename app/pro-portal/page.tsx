import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PageHero } from "@/components/page-hero"
import { peoplePhotos } from "@/content/people-photos"
import { PortalFeatures } from "@/components/portal-features"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

export default function ProPortalPage() {
  return (
    <div>
      <PageHero
        logo={{ src: "/images/pro-portal-logo.png", alt: "PRO Portal", width: 1132, height: 228 }}
        title="From first price to funded."
        image={peoplePhotos.collaborate}
        actions={
          <>
            <Button asChild>
              <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Create your account
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Log in
              </a>
            </Button>
            <Button asChild variant="outline">
              <Link href="#features">Features</Link>
            </Button>
          </>
        }
      >
        <p>
          Create an account and start the same day. Price, lock, originate, upload, clear conditions, request a COC,
          and take post-lock actions through funding. Piper is on the file the whole way.
        </p>
      </PageHero>

      <PortalFeatures />

      <section className="band-nav">
        <div className="container mx-auto px-4">
          <h2 className="text-white">Create your account</h2>
          <p className="mt-3 max-w-[40rem] text-white/70">
            UFF wholesale runs in PRO Portal. Self-sign up. Same-day access. Start a file today and take it through
            funded.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild>
              <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Create your account
              </a>
            </Button>
            <Button asChild variant="outline" className="btn-on-dark">
              <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Log in
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
