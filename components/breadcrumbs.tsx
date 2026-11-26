import Link from "next/link"

export type BreadcrumbItem = { label: string; href?: string }

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 text-xs text-ink-muted">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {item.href ? (
              <Link href={item.href} className="hover:text-ink hover:underline duration-150">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-ink">
                {item.label}
              </span>
            )}
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
