import Image from "next/image"
import Link from "next/link"

export type DestinationCardProps = {
  href: string
  title: string
  blurb: string
  imageSrc: string
  imageAlt: string
}

export function DestinationCard({ href, title, blurb, imageSrc, imageAlt }: DestinationCardProps) {
  return (
    <Link href={href} className="panel group block overflow-hidden duration-150 hover:border-accent">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={1200}
          height={750}
          className="h-full w-full object-cover duration-150 group-hover:scale-[1.02]"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{blurb}</p>
        <p className="mt-3 text-sm font-semibold text-accent">Open {title}</p>
      </div>
    </Link>
  )
}
