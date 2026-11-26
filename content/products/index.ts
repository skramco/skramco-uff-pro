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
  matrices: [product.matrix, ...(product.extraMatrices ?? [])].filter(
    (matrix): matrix is NonNullable<typeof matrix> => Boolean(matrix),
  ),
}))

export function getProduct(slug: string): ProductDetail | undefined {
  return productCatalog.find((product) => product.slug === slug)
}

export function relatedProducts(product: ProductDetail): ProductDetail[] {
  return product.relatedSlugs
    .map((slug) => getProduct(slug))
    .filter((item): item is ProductDetail => Boolean(item))
}

export type KeyFact = { label: string; value: string }

/**
 * 5-up key-facts strip: FICO / LTV / DTI / down payment / occupancy, pulled
 * straight from each product's existing `parameters` rows. A fact is omitted
 * entirely when the product's data doesn't have a matching row — never
 * invent a value here.
 */
const KEY_FACT_MATCHERS: { label: string; pattern: RegExp }[] = [
  { label: "FICO", pattern: /fico/i },
  { label: "LTV", pattern: /\bltv\b/i },
  { label: "DTI", pattern: /\bdti\b/i },
  { label: "Down payment", pattern: /down payment/i },
  { label: "Occupancy", pattern: /occupancy/i },
]

export function keyFacts(product: ProductDetail): KeyFact[] {
  const facts: KeyFact[] = []
  for (const matcher of KEY_FACT_MATCHERS) {
    const row = product.parameters.find((parameter) => matcher.pattern.test(parameter.label))
    if (row) facts.push({ label: matcher.label, value: row.value })
  }
  return facts
}

export type LookElsewhereItem = { slug: string; href: string; name: string; reason: string }

/**
 * "Look elsewhere" bullets reuse each related product's existing
 * `idealBorrower` one-liner — no new guideline copy is written here.
 */
export function lookElsewhere(product: ProductDetail): LookElsewhereItem[] {
  return relatedProducts(product).map((related) => ({
    slug: related.slug,
    href: related.href,
    name: related.name,
    reason: related.idealBorrower,
  }))
}
