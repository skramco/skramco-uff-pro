import { XMLParser } from "fast-xml-parser"
import { industryFeeds, type IndustryFeed, type IndustrySourceId } from "@/content/industry-feeds"

export type IndustryHeadline = {
  title: string
  href: string
  publishedAt: string
  publishedMs: number
  summary: string
  imageUrl?: string
  isVideo: boolean
  sourceId: IndustrySourceId
  sourceName: string
  sourcePostId?: string
}

export type IndustryNewsResult = {
  items: IndustryHeadline[]
  failedSources: string[]
  fetchedAt: string
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  removeNSPrefix: true,
  trimValues: true,
  parseTagValue: false,
})

const FETCH_MS = 8_000
const SNIPPET_CHARS = 150

function asArray<T>(value: T | T[] | undefined | null): T[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function asText(value: unknown): string {
  if (typeof value === "string") return value.trim()
  if (typeof value === "number") return String(value)
  if (value && typeof value === "object" && "#text" in value) {
    return asText((value as { "#text": unknown })["#text"])
  }
  return ""
}

function asAttr(value: unknown, key: string): string {
  if (!value || typeof value !== "object") return ""
  return asText((value as Record<string, unknown>)[key])
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim()
}

function clipSummary(text: string): string {
  if (text.length <= SNIPPET_CHARS) return text
  const slice = text.slice(0, SNIPPET_CHARS)
  const lastSpace = slice.lastIndexOf(" ")
  const clipped = (lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trim()
  return `${clipped}...`
}

function looksLikeImage(url: string, type = ""): boolean {
  if (!url.startsWith("http")) return false
  const lowerType = type.toLowerCase()
  if (lowerType.startsWith("video/") || lowerType.startsWith("audio/")) return false
  if (lowerType.startsWith("image/")) return true
  if (lowerType && lowerType !== "image") return false
  return /\.(avif|gif|jpe?g|png|svg|webp)(\?|$)/i.test(url) || /\/image\//i.test(url) || type === "image"
}

function looksLikeVideo(url: string, type = ""): boolean {
  const lowerType = type.toLowerCase()
  if (lowerType.startsWith("video/")) return true
  return /youtube\.com|youtu\.be|vimeo\.com|\.mp4(\?|$)/i.test(url)
}

function youtubeThumb(url: string): string | undefined {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/i)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : undefined
}

function firstImgSrc(html: string): string | undefined {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match?.[1]
}

function extractImage(item: Record<string, unknown>): { imageUrl?: string; isVideo: boolean } {
  const html = asText(item.description) + " " + asText(item.encoded)

  for (const enclosure of asArray(item.enclosure)) {
    const url = asAttr(enclosure, "@_url") || asText(enclosure)
    const type = asAttr(enclosure, "@_type")
    if (looksLikeVideo(url, type)) {
      return { imageUrl: youtubeThumb(url) || url, isVideo: true }
    }
    if (looksLikeImage(url, type)) {
      return { imageUrl: url, isVideo: false }
    }
  }

  for (const media of [...asArray(item.thumbnail), ...asArray(item.content)]) {
    const url = asAttr(media, "@_url") || asText(media)
    const type = asAttr(media, "@_type") || asAttr(media, "@_medium")
    if (looksLikeVideo(url, type)) {
      return { imageUrl: youtubeThumb(url) || url, isVideo: true }
    }
    if (looksLikeImage(url, type) || (url.startsWith("http") && !type)) {
      return { imageUrl: url, isVideo: false }
    }
  }

  const imgSrc = asText(item.imgSrc)
  if (looksLikeImage(imgSrc)) {
    return { imageUrl: imgSrc, isVideo: false }
  }

  const fromHtml = firstImgSrc(html)
  if (fromHtml) {
    return { imageUrl: fromHtml, isVideo: /youtube|vimeo|video/i.test(html) }
  }

  return { imageUrl: undefined, isVideo: false }
}

function formatDate(value: string): { label: string; ms: number } {
  const parsed = Date.parse(value)
  if (Number.isNaN(parsed)) {
    return { label: value, ms: 0 }
  }
  const label = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Chicago",
  }).format(parsed)
  return { label, ms: parsed }
}

function parseItems(xml: string, feed: IndustryFeed): IndustryHeadline[] {
  const cleaned = xml.replace(/^\uFEFF/, "")
  const doc = parser.parse(cleaned) as {
    rss?: { channel?: { item?: unknown } }
  }
  const rawItems = asArray(doc.rss?.channel?.item) as Record<string, unknown>[]

  const seen = new Set<string>()
  const headlines: IndustryHeadline[] = []

  for (const item of rawItems) {
    const title = stripHtml(asText(item.title))
    const href = asText(item.link)
    if (!title || !href || seen.has(href)) continue
    seen.add(href)

    const pub = asText(item.pubDate) || asText(item.date)
    const { label, ms } = formatDate(pub)
    const { imageUrl, isVideo } = extractImage(item)

    headlines.push({
      title,
      href,
      publishedAt: label,
      publishedMs: ms,
      summary: clipSummary(stripHtml(asText(item.description))),
      imageUrl,
      isVideo,
      sourceId: feed.id,
      sourceName: feed.name,
      sourcePostId: asText(item["post-id"]) || undefined,
    })

    if (headlines.length >= feed.perSource) break
  }

  return headlines
}

async function fetchFeed(feed: IndustryFeed): Promise<IndustryHeadline[]> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_MS)

  try {
    const response = await fetch(feed.rssUrl, {
      signal: controller.signal,
      headers: {
        Accept: "application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8",
        "User-Agent": "UFFPro/1.0 (https://uff.pro; industry news for wholesale brokers)",
      },
      next: { revalidate: 1800 },
    })

    if (!response.ok) {
      throw new Error(`${feed.id} RSS ${response.status}`)
    }

    const xml = await response.text()
    return parseItems(xml, feed)
  } finally {
    clearTimeout(timer)
  }
}

/** HousingWire's RSS omits featured images. Pull them from the public WordPress API. */
async function attachHousingWireImages(items: IndustryHeadline[]): Promise<IndustryHeadline[]> {
  const ids = items
    .filter((item) => item.sourceId === "housingwire" && !item.imageUrl && item.sourcePostId)
    .map((item) => item.sourcePostId) as string[]

  if (ids.length === 0) return items

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), FETCH_MS)
    const response = await fetch(
      `https://www.housingwire.com/wp-json/wp/v2/posts?include=${ids.join(",")}&per_page=${ids.length}&_fields=link,jetpack_featured_media_url`,
      {
        signal: controller.signal,
        headers: { "User-Agent": "UFFPro/1.0 (https://uff.pro)" },
        next: { revalidate: 1800 },
      },
    )
    clearTimeout(timer)
    if (!response.ok) return items

    const rows = (await response.json()) as { link?: string; jetpack_featured_media_url?: string }[]
    const byLink = new Map(
      rows
        .filter((row) => row.link && row.jetpack_featured_media_url)
        .map((row) => [row.link!.replace(/\/$/, ""), row.jetpack_featured_media_url!]),
    )

    return items.map((item) => {
      const imageUrl = item.imageUrl || byLink.get(item.href.replace(/\/$/, ""))
      return imageUrl ? { ...item, imageUrl } : item
    })
  } catch {
    return items
  }
}

export async function getIndustryNews(): Promise<IndustryNewsResult> {
  const settled = await Promise.allSettled(industryFeeds.map((feed) => fetchFeed(feed)))
  const items: IndustryHeadline[] = []
  const failedSources: string[] = []

  settled.forEach((result, index) => {
    const feed = industryFeeds[index]
    if (result.status === "fulfilled") {
      items.push(...result.value)
    } else {
      failedSources.push(feed.name)
    }
  })

  const withImages = await attachHousingWireImages(items)
  withImages.sort((a, b) => b.publishedMs - a.publishedMs)

  return {
    items: withImages,
    failedSources,
    fetchedAt: new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Chicago",
      timeZoneName: "short",
    }).format(new Date()),
  }
}
