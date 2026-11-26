/** Mobile-only sticky bottom bar: jump to the matrix downloads or the pricing panel. */
export function ProductMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-surface-raised/95 backdrop-blur supports-[backdrop-filter]:bg-surface-raised/80 lg:hidden">
      <div className="grid grid-cols-2 divide-x divide-hairline text-sm font-semibold">
        <a href="#matrix-downloads" className="flex items-center justify-center px-4 py-3.5 text-ink duration-150 active:bg-muted">
          Matrices
        </a>
        <a
          href="#price-panel"
          className="flex items-center justify-center bg-primary px-4 py-3.5 text-primary-foreground duration-150 active:bg-accent-dark"
        >
          Price scenario
        </a>
      </div>
    </div>
  )
}
