"use client"

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="cursor-pointer rounded-md border border-hairline bg-surface-raised px-[18px] py-[11px] text-xs font-bold uppercase tracking-[0.08em] text-ink hover:bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uff-ink print:hidden"
    >
      Print / Save PDF
    </button>
  )
}
