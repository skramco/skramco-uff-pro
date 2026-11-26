import type { OverlayCardData } from "@/lib/data/nqm-matrix"

export function OverlayCard({ data }: { data: OverlayCardData }) {
  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-surface-raised shadow-[0_1px_2px_rgba(19,19,19,.05),0_8px_22px_rgba(19,19,19,.06)]">
      <div className="bg-uff-red px-3.5 py-[11px] text-xs font-bold uppercase tracking-[0.16em] text-white print:print-color-adjust-exact">
        Program limitations · Overlays
      </div>
      <div>
        {data.items.map((item) => (
          <div
            key={item.label}
            className="flex justify-between gap-3 border-b border-hairline px-3.5 py-2.5 text-sm last:border-b-0"
          >
            <span>{item.label}</span>
            <span
              className={`text-xs font-semibold ${
                item.tone === "red" || item.tone === "no" ? "text-uff-red" : "text-uff-ink"
              } ${item.tone === "no" ? "whitespace-normal text-right" : "whitespace-nowrap"}`}
            >
              {item.limit}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-hairline bg-surface px-3.5 py-2.5 text-xs text-ink-muted">{data.note}</div>
    </div>
  )
}
