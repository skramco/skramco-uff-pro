import { CircleDollarSign, FileCheck2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

const steps = [
  {
    icon: UserPlus,
    title: "Create your account",
    description: "Self sign-up in PRO Portal. There is no application queue to wait on.",
  },
  {
    icon: FileCheck2,
    title: "Get approved and set up",
    description: "Complete broker approval and company setup inside PRO Portal.",
  },
  {
    icon: CircleDollarSign,
    title: "Price and lock in PRO Portal",
    description: "Run a scenario, compare Piper's Pick, and lock from the same screen.",
  },
] as const

/** Below-the-fold onboarding strip. No approval or timing promises — just the three steps brokers move through. */
export function HomeStartSteps() {
  return (
    <section className="section-pad border-t border-hairline">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-[46rem]">
          <p className="caption">Getting started</p>
          <h2 className="mt-3">Start brokering with UFF</h2>
          <p className="prose-body mt-3">Self sign-up. From account to your first lock, all in PRO Portal.</p>
        </div>

        <ol className="grid gap-4 sm:grid-cols-3">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li key={title} className="panel relative overflow-hidden p-5">
              <span className="absolute inset-y-0 left-0 w-1 bg-accent" aria-hidden />
              <div className="flex items-center gap-2.5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-quiet text-xs font-extrabold text-accent">
                  {index + 1}
                </span>
                <Icon className="h-4 w-4 text-accent" aria-hidden />
              </div>
              <h3 className="mt-4 text-base font-bold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{description}</p>
            </li>
          ))}
        </ol>

        <div className="mt-6">
          <Button asChild>
            <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              Create your broker account
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
