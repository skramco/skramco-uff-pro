import Link from "next/link"
import type { ReactNode } from "react"
import { productCatalog } from "@/content/products"
import { PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

function StepBadge({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent-quiet text-sm font-bold text-accent-dark">
      {children}
    </span>
  )
}

/** Below-the-fold "get started" strip: create an account, find the product, price and submit — all in PRO Portal. */
export function HomeStartSteps() {
  return (
    <section className="section-pad border-t border-hairline">
      <div className="container mx-auto px-4">
        <div className="max-w-[46rem]">
          <h2>Start brokering with UFF</h2>
          <p className="prose-body mt-3">
            Three steps from this page to a priced file. No guesswork about where to go next.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="panel p-5">
            <StepBadge>1</StepBadge>
            <h3 className="mt-3.5 text-lg font-bold tracking-tight text-ink">Create your account</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
              Self sign-up for PRO Portal. Have your company NMLS ID and licensing details handy.
            </p>
            <a
              href={PRO_PORTAL_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-semibold text-accent-dark hover:underline"
            >
              Create account →
            </a>
          </div>

          <div className="panel p-5">
            <StepBadge>2</StepBadge>
            <h3 className="mt-3.5 text-lg font-bold tracking-tight text-ink">Find the product</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
              Matrices, key parameters and overlays for every program, in one place.
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {productCatalog.map((product) => (
                <Link
                  key={product.slug}
                  href={product.href}
                  className="inline-flex items-center rounded-pill bg-muted px-2.5 py-1 text-xs font-semibold text-ink-secondary duration-150 hover:bg-accent-quiet hover:text-accent-dark"
                >
                  {product.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="panel p-5">
            <StepBadge>3</StepBadge>
            <h3 className="mt-3.5 text-lg font-bold tracking-tight text-ink">Price and submit</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
              Price, lock and upload in PRO Portal. Piper flags the next step you own on every file.
            </p>
            <Link href="/pro-portal" className="mt-3 inline-block text-sm font-semibold text-accent-dark hover:underline">
              See PRO Portal →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
