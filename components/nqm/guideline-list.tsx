import type { GuidelineBlock, GuidelineSpan } from "@/lib/data/nqm-matrix"

export function GuidelineList({ blocks }: { blocks: GuidelineBlock[] }) {
  return (
    <>
      {blocks.map((block) => (
        <div
          key={block.title}
          className="mt-[18px] overflow-hidden rounded-[3px] border border-[#E3E3E6] bg-white shadow-[0_1px_2px_rgba(19,19,19,.05),0_8px_22px_rgba(19,19,19,.06)] print:break-inside-avoid print:shadow-none"
        >
          <h3 className="m-0 bg-uff-ink px-3.5 py-[11px] font-archivo text-[11px] font-bold uppercase tracking-[0.16em] text-white print:print-color-adjust-exact">
            {block.title}
          </h3>
          <dl className="m-0">
            {block.entries.map((entry) => (
              <div
                key={entry.term}
                className="grid grid-cols-1 border-b border-[#EEEEF0] last:border-b-0 min-[901px]:grid-cols-[214px_1fr]"
              >
                <dt className="border-b border-[#EEEEF0] bg-[#FAFAFB] px-3.5 py-[11px] text-[13px] font-semibold min-[901px]:border-b-0 min-[901px]:border-r">
                  {entry.term}
                </dt>
                <dd className="m-0 px-3.5 py-[11px] text-[13.5px] text-[#2E2E33]">
                  {entry.spans ? <Spans spans={entry.spans} /> : null}
                  {entry.text
                    ? entry.text.split("\n").map((line, i) => (
                        <span key={i}>
                          {i > 0 ? <br /> : null}
                          {line}
                        </span>
                      ))
                    : null}
                  {entry.items ? (
                    <ul className="m-0 list-disc pl-[17px]">
                      {entry.items.map((item) => (
                        <li key={item} className="my-0.5">
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </>
  )
}

function Spans({ spans }: { spans: GuidelineSpan[] }) {
  return (
    <>
      {spans.map((span, i) =>
        typeof span === "string" ? (
          <span key={i}>{span}</span>
        ) : (
          <span key={i} className="font-plex text-[12.5px] font-semibold text-uff-ink">
            {span.em}
          </span>
        ),
      )}
    </>
  )
}
