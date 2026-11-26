import Link from "next/link"
import { productCatalog } from "@/content/products"

/** Chip row linking to each product's dedicated page at /loan-products/{slug}. */
export function HomeProductChips() {
  return (
    <section className="section-pad border-t border-hairline bg-surface-raised">
      <div className="container mx-auto px-4">
        <div className="mb-6 max-w-[46rem]">
          <p className="caption">Loan products</p>
          <h2 className="mt-3">A product for every scenario</h2>
          <p className="prose-body mt-3">
            Conventional through government, Non-QM, investor DSCR, and HFA with down payment assistance.
          </p>
        </div>

        <ul className="flex flex-wrap gap-2.5">
          {productCatalog.map((product) => (
            <li key={product.slug}>
              <Link
                href={product.href}
                className="inline-flex items-center rounded-pill border border-hairline bg-surface px-4 py-2 text-sm font-semibold text-ink duration-150 hover:border-accent hover:text-accent"
              >
                {product.name}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-5">
          <Link href="/products" className="text-sm font-semibold text-accent hover:underline">
            See all loan products
          </Link>
        </p>
      </div>
    </section>
  )
}
