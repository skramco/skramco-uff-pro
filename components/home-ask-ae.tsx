import Image from "next/image"
import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { COMPANY_SUPPORT_EMAIL, COMPANY_PHONE } from "@/content/disclosures"
import { peoplePhotos } from "@/content/people-photos"

/**
 * Routes brokers to the scenario desk / their AE. No named AE directory exists in repo content yet
 * (see CONTENT-NEEDED.md), so this stays general — real phone/email only, no invented people.
 */
export function HomeAskAe() {
  return (
    <section className="section-pad border-t border-hairline">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
          <div className="shot-frame hidden overflow-hidden sm:block">
            <Image
              src={peoplePhotos.phone.src}
              alt={peoplePhotos.phone.alt}
              width={900}
              height={720}
              className="h-auto w-full object-cover"
            />
          </div>

          <div>
            <p className="caption">Have a scenario?</p>
            <h2 className="mt-3">Ask your AE, or the scenario desk</h2>
            <p className="prose-body mt-3">
              Already work with a UFF account executive? Route the scenario to them the way you do today. New to
              UFF? Send it to the Kansas City scenario desk and a licensed originator picks it up.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/contact?topic=scenario">Send to the scenario desk</Link>
              </Button>
              <Button asChild variant="outline">
                <a href="tel:8559532453">
                  <Phone className="h-4 w-4" aria-hidden />
                  {COMPANY_PHONE}
                </a>
              </Button>
            </div>
            <p className="mt-4 flex items-center gap-1.5 text-sm text-ink-muted">
              <Mail className="h-3.5 w-3.5" aria-hidden />
              <a href={`mailto:${COMPANY_SUPPORT_EMAIL}`} className="hover:text-ink hover:underline">
                {COMPANY_SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
