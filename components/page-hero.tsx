import type { ReactNode } from "react"
import Image from "next/image"

type PageHeroProps = {
  eyebrow?: string
  title: string
  children?: ReactNode
  actions?: ReactNode
  logo?: {
    src: string
    alt: string
    width: number
    height: number
  }
  image?: {
    src: string
    alt: string
  }
}

export function PageHero({ eyebrow, title, children, actions, logo, image }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container mx-auto px-4">
        <div className={image ? "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]" : "max-w-[68ch]"}>
          <div className="max-w-[68ch]">
            {logo ? (
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                priority
                className="mb-6 h-auto w-[22rem] max-w-full sm:w-[28rem] lg:w-[36rem]"
              />
            ) : null}
            {eyebrow ? <p className="caption mb-3">{eyebrow}</p> : null}
            <h1 className="display">{title}</h1>
            {children ? <div className="prose-body mt-4">{children}</div> : null}
            {actions ? <div className="mt-6 flex flex-wrap gap-3">{actions}</div> : null}
          </div>
          {image ? (
            <div className="shot-frame hidden overflow-hidden lg:block">
              <Image src={image.src} alt={image.alt} width={900} height={720} className="h-auto w-full object-cover" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
