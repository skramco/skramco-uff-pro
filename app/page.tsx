import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DestinationCard } from "@/components/destination-card"
import { peoplePhotos } from "@/content/people-photos"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"
import { HomeHero } from "@/components/home-hero"
import { HomeEngageTiles } from "@/components/home-engage-tiles"

export default function HomePage() {
  return (
    <div>
      <HomeHero />

      <section className="relative z-10 -mt-8 border-b border-hairline pb-12 sm:-mt-10">
        <div className="container mx-auto px-4">
          <HomeEngageTiles />
        </div>
      </section>

      <section className="section-pad">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-[46rem]">
            <h2>How you work with UFF</h2>
            <p className="prose-body mt-3">
              Loan products are the foundation. PRO Portal is the origination tool. Piper is the assistant on every
              file.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <DestinationCard
              href="/products"
              title="Loan products"
              blurb="Conventional, FHA, VA, USDA, Non-QM, investor DSCR, and HFA. A product for every situation, including 203(k), Section 184, and DPA."
              imageSrc={peoplePhotos.phone.src}
              imageAlt={peoplePhotos.phone.alt}
            />
            <DestinationCard
              href="/pro-portal"
              title="PRO Portal"
              blurb="The tool you originate in. Price and lock, upload, underwrite, clear conditions, request a COC, and take the file through funding."
              imageSrc={peoplePhotos.collaborate.src}
              imageAlt={peoplePhotos.collaborate.alt}
            />
            <DestinationCard
              href="/piper"
              title="Piper"
              blurb="The helper on the file. She tells you the next step you own from first price through funded."
              imageSrc={peoplePhotos.desk.src}
              imageAlt={peoplePhotos.desk.alt}
            />
          </div>
        </div>
      </section>

      <section className="section-pad border-t border-hairline bg-surface-raised">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
          <div>
            <h2>UFF wholesale runs in PRO Portal</h2>
            <p className="prose-body mt-3">
              Create an account and run the file here. Pricing is the start, not the product. Documents, conditions,
              COCs, and locks stay on the loan through funding.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
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
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container mx-auto px-4">
          <p className="caption">Also on uff.pro</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            <li>
              <Link href="/industry-news" className="text-accent hover:underline">
                Industry news
              </Link>
            </li>
            <li>
              <Link href="/resources" className="text-accent hover:underline">
                Resources
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-accent hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
