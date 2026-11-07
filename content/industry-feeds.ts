export type IndustrySourceId = "housingwire" | "nmn" | "mnd"

export type IndustryFeed = {
  id: IndustrySourceId
  name: string
  href: string
  rssUrl: string
  perSource: number
}

/** Public RSS sources. Headlines are third-party industry news, not UFF notices. */
export const industryFeeds: IndustryFeed[] = [
  {
    id: "housingwire",
    name: "HousingWire",
    href: "https://www.housingwire.com/category/mortgage/",
    rssUrl: "https://www.housingwire.com/category/mortgage/feed",
    perSource: 8,
  },
  {
    id: "nmn",
    name: "National Mortgage News",
    href: "https://www.nationalmortgagenews.com/",
    rssUrl: "https://www.nationalmortgagenews.com/feed?rss=true",
    perSource: 8,
  },
  {
    id: "mnd",
    name: "Mortgage News Daily",
    href: "https://www.mortgagenewsdaily.com/news",
    rssUrl: "https://www.mortgagenewsdaily.com/rss/news",
    perSource: 8,
  },
]
