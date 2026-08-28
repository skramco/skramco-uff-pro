import Image from "next/image"
import type { ProductListing } from "@/content/products"

export function ProductCard({ product }: { product: ProductListing }) {
  return (
    <article className="panel flex h-full flex-col overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          width={960}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{product.name}</h3>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink">
          {product.offerings.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{product.summary}</p>
      </div>
    </article>
  )
}
