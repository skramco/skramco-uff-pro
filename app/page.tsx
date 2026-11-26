import { HomeHero } from "@/components/home-hero"
import { HomeStartSteps } from "@/components/home-start-steps"

/** Regenerate homepage HTML so header/metadata adjacent content can refresh on a schedule. */
export const revalidate = 3600

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <HomeStartSteps />
    </div>
  )
}
