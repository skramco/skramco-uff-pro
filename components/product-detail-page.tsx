import Link from "next/link"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { Button } from "@/components/ui/button"
import { MatrixDownload } from "@/components/matrix-download"
import { PageHero } from "@/components/page-hero"
import { ProductMobileBar } from "@/components/product-mobile-bar"
import { ProductTurnTimesCard } from "@/components/product-turn-times-card"
import { ScenarioFitForm } from "@/components/scenario-fit-form"
import { keyFacts, lookElsewhere, relatedProducts, type ProductDetail } from "@/content/products"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

export function ProductDetailPage({ product }: { product: ProductDetail }) {
  const related = relatedProducts(product)
  const facts = keyFacts(product)
  const elsewhere = lookElsewhere(product)
  const hasMatrix = Boolean(product.matrix) || Boolean(product.extraMatrices?.length)

  return (
    <div className="pb-16 lg:pb-0">
      <div className="border-b border-hairline bg-surface-raised">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "Loan products", href: "/products" }, { label: product.name }]}
          />
        </div>
      </div>

      <PageHero eyebrow="Loan products" title={product.name}>
        <p>{product.positioning}</p>
      </PageHero>

      <section className="border-b border-hairline bg-surface-raised py-5">
        <div className="container mx-auto px-4">
          <p className="caption mb-3">Programs</p>
          <ul className="flex flex-wrap gap-2">
            {product.offerings.map((item) => (
              <li
                key={item}
                className="rounded-pill border border-hairline bg-surface px-3 py-1 text-xs font-medium text-ink-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {facts.length > 0 ? (
        <section className="border-b border-hairline">
          <div className="container mx-auto grid grid-cols-2 gap-px bg-hairline px-4 sm:grid-cols-3 lg:grid-cols-5">
            {facts.map((fact) => (
              <div key={fact.label} className="bg-surface-raised p-4 text-center sm:text-left">
                <p className="caption">{fact.label}</p>
                <p className="data-num mt-1 text-lg font-bold text-ink">{fact.value}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-pad">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[minmax(0,68ch)_20rem]">
          <div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="panel p-5">
                <h2 className="text-base">Who it fits</h2>
                <p className="prose-body mt-3 text-sm">{product.idealBorrowerProfile}</p>
              </div>
              <div className="panel p-5">
                <h2 className="text-base">Look elsewhere</h2>
                {elsewhere.length > 0 ? (
                  <ul className="mt-3 space-y-3 text-sm">
                    {elsewhere.map((item) => (
                      <li key={item.slug}>
                        <Link href={item.href} className="font-medium text-accent hover:underline duration-150">
                          {item.name}
                        </Link>
                        <span className="ml-1 text-ink-muted">— {item.reason}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="prose-body mt-3 text-sm">
                    Ask Piper or the scenario desk if this borrower doesn&apos;t fit the profile above.
                  </p>
                )}
              </div>
            </div>

            {product.highlights && product.highlights.length > 0 ? (
              <p className="mt-6 text-sm text-ink">Unique in this family: {product.highlights.join(", ")}.</p>
            ) : null}

            <h2 className="mt-10">Key parameters</h2>
            <div className="mt-4 overflow-x-auto panel">
              <table className="w-full text-sm">
                <tbody>
                  {product.parameters.map((row) => (
                    <tr key={row.label} className="border-b border-hairline last:border-0">
                      <th className="px-4 py-2 text-left font-medium text-ink-muted">{row.label}</th>
                      <td className="data-num px-4 py-2 text-right">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-ink-muted">Matrix governs; guidelines subject to change.</p>

            <h2 className="mt-10">Documentation</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-muted">
              {product.documentation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div id="matrix-downloads" className="panel p-5">
              <p className="caption">Matrix</p>
              {hasMatrix ? (
                <div className="mt-3 space-y-2">
                  {product.matrix ? <MatrixDownload matrix={product.matrix} /> : null}
                  {product.extraMatrices?.map((matrix) => (
                    <div key={matrix.href}>
                      <MatrixDownload matrix={matrix} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-ink-muted">
                  Price this scenario in PRO Portal for current overlays and eligibility.
                </p>
              )}
            </div>

            <div id="price-panel" className="panel p-5">
              <Button asChild className="w-full">
                <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                  Price in PRO Portal
                </a>
              </Button>
              <div className="mt-3 flex items-center justify-between gap-3 border-t border-hairline pt-3 text-sm">
                <span className="text-ink-muted">New to UFF?</span>
                <a
                  href={PRO_PORTAL_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent hover:underline duration-150"
                >
                  Create account
                </a>
              </div>
            </div>

            <ProductTurnTimesCard />

            <p className="text-sm">
              <Link href="/piper" className="font-medium text-accent hover:underline duration-150">
                Ask Piper
              </Link>
              <span className="ml-1 text-ink-muted">when a scenario sits between two boxes.</span>
            </p>

            <ScenarioFitForm productName={product.name} productSlug={product.slug} />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="section-pad border-t border-hairline">
          <div className="container mx-auto px-4">
            <h2 className="mb-4">Related products</h2>
            <ul className="flex flex-wrap gap-4 text-sm">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={item.href} className="font-medium text-accent hover:underline duration-150">
                    {item.name}
                  </Link>
                  <span className="ml-2 text-ink-muted">{item.idealBorrower}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <ProductMobileBar />
    </div>
  )
}
