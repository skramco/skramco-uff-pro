import { ProductCard } from "@/components/product-card"
import { PageHero } from "@/components/page-hero"
import { Button } from "@/components/ui/button"
import { peoplePhotos } from "@/content/people-photos"
import { products } from "@/content/products"
import { pageMetadata } from "@/lib/seo"
import { PRO_PORTAL_LOGIN_URL, PRO_PORTAL_SIGNUP_URL } from "@/lib/pro-portal-url"

export const metadata = pageMetadata({
  title: "Loan Products | UFF Wholesale",
  description:
    "Wholesale loan products for every situation: Conventional, FHA, VA, USDA, Non-QM, DSCR investor, and HFA with DPA. United Fidelity Funding.",
  path: "/products",
})

export default function ProductsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Loan products"
        title="A product for every situation."
        image={peoplePhotos.phone}
        actions={
          <>
            <Button asChild>
              <a href={PRO_PORTAL_SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                Create your account
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={PRO_PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                Price a loan
              </a>
            </Button>
          </>
        }
      >
        <p>
          Loan products are the foundation of UFF. Conventional through government, Non-QM, investor DSCR, and HFA
          with down payment assistance. PRO Portal is how you originate them. Piper stays on the file.
        </p>
      </PageHero>

      <section className="section-pad">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
