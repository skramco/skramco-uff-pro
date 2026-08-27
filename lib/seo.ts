import type { Metadata } from "next"

export const SITE_URL = "https://uff.pro"

type PageSeo = {
  title: string
  description: string
  path: string
}

export function pageMetadata({ title, description, path }: PageSeo): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "United Fidelity Funding",
      type: "website",
      // TODO(UFF): dedicated 1200x630 OG image
      images: [{ url: `${SITE_URL}/images/uff-logo.svg`, alt: "United Fidelity Funding Corp" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}
