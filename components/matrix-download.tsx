import type { ProductMatrix } from "@/content/products"

export function MatrixDownload({ matrix }: { matrix: ProductMatrix }) {
  return (
    <a
      href={matrix.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-ink-muted hover:text-ink duration-150"
    >
      {matrix.label}
      <span className="ml-1 font-data tabular-nums text-xs">
        ({matrix.fileSize} · {matrix.lastUpdated})
      </span>
    </a>
  )
}
