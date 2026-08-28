import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MatrixDownload } from "@/components/matrix-download"
import { PageHero } from "@/components/page-hero"
import { ScenarioFitForm } from "@/components/scenario-fit-form"
import { relatedProducts, type ProductDetail } from "@/content/products"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

export function ProductDetailPage({ product }: { product: ProductDetail }) {
  const related = relatedProducts(product)

  return (
    <div>
      <PageHero
        eyebrow="Loan products"
        title={product.name}
        actions={
          <>
            <Button asChild>
              <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Price a loan
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Create your account
              </a>
            </Button>
          </>
        }
      >
        <p>{product.positioning}</p>
      </PageHero>

      <section className="section-pad">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[minmax(0,68ch)_1fr]">
          <div>
            <h2>Ideal borrower</h2>
            <p className="prose-body mt-4">{product.idealBorrowerProfile}</p>

            <h2 className="mt-10">Programs</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-muted">
              {product.offerings.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {product.highlights && product.highlights.length > 0 ? (
              <p className="mt-4 text-sm text-ink">
                Unique in this family: {product.highlights.join(", ")}.
              </p>
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

            <h2 className="mt-10">Documentation</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-ink-muted">
              {product.documentation.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <div className="panel p-5">
              <p className="caption">Matrix</p>
              {product.matrix ? (
                <div className="mt-3 space-y-2">
                  <MatrixDownload matrix={product.matrix} />
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
    </div>
  )
}
