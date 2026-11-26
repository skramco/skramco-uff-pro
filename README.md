# uff.pro

Marketing site for **United Fidelity Funding** wholesale mortgage brokerage (NMLS #34381). It introduces loan products, PRO Portal, Piper, broker resources, and campaign landing pages for mortgage brokers.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- React 19, TypeScript, Tailwind CSS
- Hosted on [Netlify](https://www.netlify.com) via `@netlify/plugin-nextjs` (see `netlify.toml`)

## Local development

```bash
pnpm install
pnpm dev
```

Other scripts:

```bash
pnpm test    # Vitest
pnpm build   # production build
pnpm lint
```

## Environment and content

- **Environment variables:** see [ENV_SETUP.md](./ENV_SETUP.md) (e.g. `RESEND_API_KEY` for form emails). Do not commit secrets.
- **Placeholder stats and copy to replace:** see [CONTENT-NEEDED.md](./CONTENT-NEEDED.md).

## Deploy

Production builds run on Netlify using the build command in `netlify.toml` (`pnpm install && pnpm run build`).