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
        {product.matrices.length > 0 ? (
          <div className="mt-4 border-t border-hairline pt-4">
            <p className="caption">Matrices</p>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              {product.matrices.map((matrix) => {
                const isPdf = matrix.href.endsWith(".pdf")
                return (
                  <li key={matrix.href}>
                    <a
                      href={matrix.href}
                      target={isPdf ? "_blank" : undefined}
                      rel={isPdf ? "noopener noreferrer" : undefined}
                      className="text-sm font-medium text-accent hover:underline duration-150"
                    >
                      {matrix.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  )
}
