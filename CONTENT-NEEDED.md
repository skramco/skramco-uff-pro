# Content needed (UFF)

Placeholder stats and dates are live so you can scan the site and correct them. Edit the content files — do not hardcode numbers in page components.

| Item | Placeholder now | File | Owner |
|---|---|---|---|
| Loans funded | $4.2B, T12M through July 31, 2026 | `content/company-stats.ts` | Finance |
| Broker partners | 1,240 as of August 1, 2026 | `content/company-stats.ts` | Ops |
| Years in business | 25 (founded 2001; as-of line hidden) | `content/company-stats.ts` | Legal / Ops |
| Avg days to close | 24 days, Q2 2026 funded files | `content/company-stats.ts` | Ops |
| Satisfaction rate | 96%, Q2 2026 broker survey n=186 | `content/company-stats.ts` | Ops |
| UW / CTC turn times | 18 hrs / 22 days, August 27, 2026 8:00 AM CT | `content/turn-times.ts` | Ops |
| Lock desk | 8:00 AM – 6:00 PM CT; listed federal holidays; early close 2:00 PM CT | `content/lock-desk.ts` | Capital Markets |
| Rate sheets | West/East August 26, 2026; 1.4 MB / 1.3 MB; West URL uffwest.com | `content/rate-sheets.ts` | Capital Markets |
| Product overlays | Conventional 97% LTV; FHA 56.9% DTI; VA 580 / 60%; USDA 640 / 46% / 100% LTV; Non-QM 50% DTI, 90%/80% LTV | `content/products/*.ts` | Capital Markets |
| Matrix dates / sizes | August 15, 2026; 2.1 / 1.9 / 1.6 / 1.4 MB | `content/products/*.ts` | Capital Markets |
| Form last-updated | January 15, 2026 on all UFF PDFs | `content/forms.ts` | Ops |
| Testimonials | Marcus / Elena placeholders with specific outcomes | `content/testimonials.ts` | Marketing |

Industry headlines on `/industry-news` are pulled from HousingWire, National Mortgage News, and Mortgage News Daily RSS. They are not UFF company notices and do not need ops copy.

Still missing (not stats — no fake people or files):

| Item | What’s required | Where |
|---|---|---|
| Account executives | Real names, KC photos, states, direct lines, calendar URLs | `content/team/aes.ts` |
| Leadership photos | Named KC / underwriting-floor photos | `content/team/leadership.ts` |
| USDA matrix PDF | Downloadable matrix (page currently says price in PRO Portal) | `/products/usda` |
| OG image | Dedicated 1200×630 social image | `lib/seo.ts` still uses the logo SVG |
| Broker Compensation Acknowledgement PDF | Restore to Resource Library when ready | `content/roadmap-internal.ts` |
| Privacy / Terms pages | Footer links removed because routes do not exist | Legal |
| 2026 product matrix PDFs | On-page limits are 2026; files still named `*-2025.pdf` | `/products` |
| PRO Portal screen recording | 30-second silent price → lock → submit | Home, `/pro-portal` |
| Legal review | Disclosure wording on `/licensing` | `content/disclosures.ts` |
| Kansas City photography | Real office / floor photos. Generated broker images are stand-ins until then. | Home, `/piper`, `/pro-portal`, `/products` |

Internal unpublished backlog: `content/roadmap-internal.ts`. Do not import that file from any public route.
