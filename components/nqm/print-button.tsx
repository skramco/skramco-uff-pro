"use client"

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="cursor-pointer rounded-[2px] bg-uff-red px-[18px] py-[11px] font-archivo text-xs font-bold uppercase tracking-[0.08em] text-white hover:bg-uff-red-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-uff-ink print:hidden"
    >
      Print / Save PDF
    </button>
  )
}
