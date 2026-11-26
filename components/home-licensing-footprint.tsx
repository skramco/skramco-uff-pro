import Link from "next/link"
import { Button } from "@/components/ui/button"
import { USMap } from "@/components/us-map"
import { LICENSED_STATE_ABBREVS, NMLS_ID } from "@/content/disclosures"

/** Licensing footprint strip. Reuses the existing USMap and the licensed-state list already in content. */
export function HomeLicensingFootprint() {
  const stateCount = LICENSED_STATE_ABBREVS.split(",").length

  return (
    <section className="section-pad border-t border-hairline">
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <div className="panel overflow-x-auto p-2">
            <USMap />
          </div>

          <div>
            <p className="caption">Where we&apos;re licensed</p>
            <h2 className="mt-3">Licensed in {stateCount} states</h2>
            <p className="prose-body mt-3">
              United Fidelity Funding Corp, NMLS #{NMLS_ID}. Not all products and services are available in every
              licensed state.
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href="/licensing">See licensing by state</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
