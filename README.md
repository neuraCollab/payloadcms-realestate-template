# Real Estate Template (Next.js + Payload CMS)

A modern real estate website template based on Next.js 15, Payload CMS, and Tailwind CSS. Suitable as a starter project for real estate agencies and marketplaces: a property catalog, project pages, blog, search, and integration with the Payload admin panel.

## Key technologies
- **Next.js 15** (App Router, RSC)
- **React 19** + **TypeScript**
- **Payload CMS** (+ plugins: SEO, Search, Redirects, Nested Docs, Form Builder, Admin Bar, Live Preview)
- **PostgreSQL** (adapter `@payloadcms/db-postgres`)
- **Tailwind CSS** (+ `tailwindcss-animate`, `@tailwindcss/typography`)
- **UI**: Radix UI, Lucide Icons
- **Images**: `sharp`
- **Map**: Leaflet + React Leaflet
- **Sitemap**: `next-sitemap`

## What's included
- **Real Estate Catalog**: properties, types (apartments, commercial, land, residential complexes), agents, reviews
- **Pages and Blog**: posts, categories, pagination, SEO
- **Search and Filters**: search pages and listings by type
- **SEO and Redirects**: Payload plugins for SEO and redirects
- **Content Seeding**: API route for quickly populating demo data
- **Payload Admin**: `Header` and `Footer` globals, collections, and media
- **Sitemap**: maps for pages and posts

> **PRO FEATURE**: The repository supports advanced AI features, including semantic search via pgvector/embeddings, Anthropic Claude integration for recommendation explanations, and OpenAI GPT-4o-mini bulk SEO text generation. These features are available in the **Pro version**. By default, the `NEXT_PUBLIC_ENABLE_AI` flag is set to `false`, and the app falls back gracefully to standard keyword search and manual SEO management.

## Quick Start (pnpm)
1) Install dependencies
```bash
pnpm install
```

2) Create `.env` in the root
```bash
cp .env.example .env
```
Ensure you set the required secrets: `PAYLOAD_SECRET`, `CRON_SECRET`, `PREVIEW_SECRET`, and database credentials.

3) Start the infrastructure (PostgreSQL)
```bash
docker compose up -d --build postgres pgadmin
```

4) Run in dev mode
```bash
pnpm dev
```
- Frontend: http://localhost:3000
- Admin Payload: http://localhost:3000/admin

5) Build and Prod mode
```bash
pnpm build
pnpm start
```

## Contributing
We welcome pull requests for bug fixes and new features. Please ensure your code follows the existing style, and run `pnpm lint` and `pnpm test:e2e:smoke` before submitting a PR.

## License
MIT License. See the `LICENSE` file for details.
