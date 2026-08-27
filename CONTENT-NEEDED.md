# Content needed (UFF)

Items collected from `TODO(UFF)` tokens during the Phase 1 credibility triage. Fill these in; do not invent numbers, names, or quotes.

| Item | What’s required | Where it surfaces | Owner |
|---|---|---|---|
| Total funded volume | Verified loans-funded figure with an as-of date | `content/company-stats.ts` → Home, About | Finance / Ops |
| Active broker partner count | Verified count with an as-of date | `content/company-stats.ts` → Home, About | Ops |
| Founding year / years in business | Confirm founding year (NMLS 34381 likely predates “15+ years”) | `content/company-stats.ts` → About | Legal / Ops |
| Average days to close | Average with source and period | `content/company-stats.ts` → Home | Ops |
| Satisfaction rate | Rate with source and period, or cut the stat | `content/company-stats.ts` → Home, About | Ops |
| Broker testimonials | Real quotes only. Required: first name, company, city, and either a specific outcome or a date. Do not invent. | `/pro-portal` placeholder | Marketing |
| Legal review of disclosure wording | Review replacement of the old “not an advertisement” line | `content/disclosures.ts` → `/licensing` | Legal |
| OG image | Dedicated 1200×630 social image (logo SVG is a temporary stand-in) | `lib/seo.ts` | Marketing |
| Broker Compensation Acknowledgement PDF | File missing from `/public/pdfs`; restore to the Resource Library when ready | `content/roadmap-internal.ts` | Ops |
| Privacy Policy / Terms of Service pages | Footer links to `/privacy` and `/terms` were removed because those routes do not exist | — | Legal |
| 2026 product matrix PDFs | On-page limits are 2026; downloadable matrices are still named `*-2025.pdf` | `/loan-products` | Ops / Capital Markets |

Internal (not rendered) backlog of unpublished forms and PRO Portal features lives in `content/roadmap-internal.ts`. Do not import that file from any public route.
