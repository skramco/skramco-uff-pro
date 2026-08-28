export type ProductMatrix = {
  href: string
  label: string
  fileSize: string
  lastUpdated: string
}

export type ProductParameter = {
  label: string
  value: string
}

export type ProductDetail = {
  slug: string
  name: string
  href: string
  positioning: string
  summary: string
  idealBorrower: string
  idealBorrowerProfile: string
  keyLimit: string
  offerings: string[]
  highlights?: string[]
  image: {
    src: string
    alt: string
  }
  matrix: ProductMatrix | null
  extraMatrices?: ProductMatrix[]
  parameters: ProductParameter[]
  documentation: string[]
  relatedSlugs: string[]
}

export type ProductListing = Pick<ProductDetail, "slug" | "name" | "offerings" | "summary" | "image">
