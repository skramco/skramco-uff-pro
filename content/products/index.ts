import { conventional } from "./conventional"
import { fha } from "./fha"
import { hfa } from "./hfa"
import { investor } from "./investor"
import { nonQm } from "./non-qm"
import { usda } from "./usda"
import { va } from "./va"
import type { ProductDetail, ProductListing } from "./types"

export type { ProductDetail, ProductListing, ProductMatrix, ProductParameter } from "./types"

export const productCatalog: ProductDetail[] = [conventional, fha, va, usda, nonQm, investor, hfa]

export const products: ProductListing[] = productCatalog.map((product) => ({
  slug: product.slug,
  name: product.name,
  offerings: product.offerings,
  summary: product.summary,
  image: product.image,
}))

export function getProduct(slug: string): ProductDetail | undefined {
  return productCatalog.find((product) => product.slug === slug)
}

export function relatedProducts(product: ProductDetail): ProductDetail[] {
  return product.relatedSlugs
    .map((slug) => getProduct(slug))
    .filter((item): item is ProductDetail => Boolean(item))
}
