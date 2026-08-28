import { PageHero } from "@/components/page-hero"
import { IndustryNewsItem } from "@/components/industry-news-item"
import { industryFeeds } from "@/content/industry-feeds"
import { getIndustryNews } from "@/lib/industry-news"
import { pageMetadata } from "@/lib/seo"

export const revalidate = 1800

export const metadata = pageMetadata({
  title: "Industry News | UFF Wholesale",
  description:
    "Mortgage industry headlines from HousingWire, National Mortgage News, and Mortgage News Daily. For wholesale brokers. Not UFF company notices.",
  path: "/industry-news",
})

export default async function IndustryNewsPage() {
  const news = await getIndustryNews()

  return (
    <div>
      <PageHero eyebrow="Industry" title="Industry news">
        <p>
          Headlines from HousingWire, National Mortgage News, and Mortgage News Daily. These are publisher stories,
          not UFF notices. Each link opens on the publisher's site.
        </p>
      </PageHero>

      <section className="section-pad">
        <div className="container mx-auto px-4">
          <p className="caption mb-6">
            {industryFeeds.map((feed, index) => (
              <span key={feed.id}>
                {index > 0 ? " · " : null}
                <a
                  href={feed.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-ink hover:underline"
                >
                  {feed.name}
                </a>
              </span>
            ))}
          </p>

          {news.items.length === 0 ? (
            <div className="panel border-dashed p-5">
              <p className="caption">Headlines did not load</p>
              <p className="mt-2 text-sm text-ink-muted">
                Open a publisher directly while the feeds are unavailable.
              </p>
              <p className="mt-4 text-sm">
                {industryFeeds.map((feed, index) => (
                  <span key={feed.id}>
                    {index > 0 ? " · " : null}
                    <a
                      href={feed.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent hover:underline"
                    >
                      {feed.name}
                    </a>
                  </span>
                ))}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {news.items.map((item) => (
                <IndustryNewsItem key={item.href} {...item} />
              ))}
            </div>
          )}

          <p className="caption mt-8">
            RSS refreshed about every 30 minutes. Last pull {news.fetchedAt}.
            {news.failedSources.length > 0
              ? ` ${news.failedSources.join(", ")} did not load this round.`
              : null}{" "}
            UFF does not write or endorse these stories.
          </p>
        </div>
      </section>
    </div>
  )
}
