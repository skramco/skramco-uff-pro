import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { ProductDetailPage } from "@/components/product-detail-page"
import { getProduct, productCatalog } from "@/content/products"
import { pageMetadata } from "@/lib/seo"

export async function generateStaticParams() {
  return productCatalog.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return {}

  return pageMetadata({
    title: `${product.name} | Loan Products | UFF Wholesale`,
    description: product.positioning,
    path: `/loan-products/${product.slug}`,
  })
}

export default async function LoanProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()

  return <ProductDetailPage product={product} />
}
