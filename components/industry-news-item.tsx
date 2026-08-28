import Image from "next/image"
import { ExternalLink, Play } from "lucide-react"
import type { IndustryHeadline } from "@/lib/industry-news"

export function IndustryNewsItem({
  title,
  href,
  publishedAt,
  summary,
  imageUrl,
  isVideo,
  sourceName,
}: IndustryHeadline) {
  return (
    <article className="panel flex h-full flex-col overflow-hidden">
      <a href={href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              unoptimized
              className="object-cover duration-150 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full items-end p-4">
              <p className="caption">{sourceName}</p>
            </div>
          )}
          {isVideo ? (
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-nav/80 px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.04em] text-white">
              <Play className="h-3 w-3" aria-hidden />
              Video
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="caption">
            {sourceName} · {publishedAt}
          </p>
          <h3 className="mt-2 line-clamp-2 min-h-[2.6rem] text-base font-semibold leading-snug tracking-tight text-ink group-hover:underline">
            {title}
          </h3>
          {summary ? (
            <p className="mt-2 line-clamp-3 min-h-[3.9rem] text-sm leading-relaxed text-ink-muted">{summary}</p>
          ) : (
            <p className="mt-2 min-h-[3.9rem]" />
          )}
          <p className="mt-auto flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent">
            Read on {sourceName}
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            <span className="sr-only">(opens on {sourceName})</span>
          </p>
        </div>
      </a>
    </article>
  )
}
