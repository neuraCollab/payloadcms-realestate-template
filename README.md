# Real Estate Template (Next.js + Payload CMS)

A modern real estate website template based on Next.js 15, Payload CMS, and Tailwind CSS. Suitable as a starter project for real estate agencies and marketplaces: a property catalog, project pages, blog, search, and integration with the Payload admin panel.

### Click on image to watch demo
[![Demo Video](assets/image.png)](https://www.youtube.com/watch?v=jh0KOi1ZXtg)


## Key technologies
- **Next.js 15** (App Router, RSC)
- **React 19** + **TypeScript**
- **Payload CMS** (+ plugins: SEO, Search, Redirects, Nested Docs, Form Builder, Admin Bar, Live Preview)
- **PostgreSQL** (adapter `@payloadcms/db-postgres`)
- **Tailwind CSS** (+ `tailwindcss-animate`, `@tailwindcss/typography`)
- **UI**: Radix UI, Lucide Icons, Flowbite
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

## Project Structure
- `src/app/(frontend)` — client pages
- `page.tsx` — main page
- `properties` `posts`, `search`, `[slug]` — key sections
- `(realestate)` — listings by type: `flats`, `commercial`, `lands`, `residential-complexes`
- `(sitemaps)` — `pages-sitemap.xml`, `posts-sitemap.xml`
- `next/exit-preview`, `next/preview`, `next/seed` — utility routes
- `src/collections` — Payload collections: `Properties`, `Agents`, `Flats`, `Commercial`, `Lands`, `ResidentialComplex`, `Pages`, `Posts`, `Categories`, `Media`, `Testimonials`, `Reviews`, `Messages`, `Users`
- `src/blocks` — page block constructor (base, forms, property blocks)
- `src/Header`, `src/Footer` — global zones with Payload configs
- `src/payload.config.ts` — Payload configuration (PostgreSQL, plugins, collections, globals)

## Quick Start (pnpm)
1) Install dependencies
```bash
pnpm install
```

2) Create `.env` in the root
```env
PAYLOAD_SECRET=your-strong-secret
DATABASE_URI=postgres://user:password@localhost:5432/dbname
# Optional for previews and cron jobs
CRON_SECRET=some-cron-token
```

3) Start the infrastructure (PostgreSQL and web interface)
```bash
docker compose up -d --build
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

6) Seeding demo data (optional)
- Open: `GET http://localhost:3000/next/seed`

## Run in Docker
`Dockerfile` and `docker-compose.yml` are provided.

Quick start:
```bash
# Fill in .env as in the example above
docker compose up -d --build
```
- The application and admin panel will be available at `http://localhost:3000` (check the mappings in `docker-compose.yml`).

## Database Import/Export (PostgreSQL in Docker)

### Import from a local SQL backup `./db/mydb_backup.sql`
```bash
# Copy file to container
docker cp ./db/mydb_backup.sql my_postgres:/tmp/mydb_backup.sql

# Import into database (replace user/DB if necessary)
docker exec -it my_postgres psql -U admin -d mydb -f /tmp/mydb_backup.sql
```

### Export backup from container

1. Create dump inside container
```bash
docker exec -t my_postgres pg_dump -U admin -d mydb -f /tmp/mydb_backup.sql
```

2. Copy to host
```bash
docker cp my_postgres:/tmp/mydb_backup.sql ./mydb_backup.sql
```

## Main Collections (Payload CMS)
- **Properties** — real estate properties (fields: price, area, bedrooms/baths, address, media, features)
- **Flats / Commercial / Lands / Residential Complex** — typed sections and listings
- **Agents** — agents and contact information
- **Pages** — static pages from blocks
- **Posts / Categories** — blog
- **Media** — media files
- **Testimonials / Reviews** — reviews and ratings
- **Messages** — incoming messages from forms
- **Users** — admin users

## Pages and Functionality
- **Home**: promo blocks, property selections
- **Catalog**: `/(frontend)/properties`, filters and pagination
- **Object details**: `/(frontend)/properties/[slug]`
- **Search**: `/(frontend)/search`
- **Blog**: `/(frontend)/posts` and `/(frontend)/posts/[slug]`
- **CMS pages**: `/[slug]`
- **Sitemaps**: `/(frontend)/(sitemaps)/...`

## Scripts
- `pnpm dev` — start development (Turbopack)
- `pnpm build` — build
- `pnpm start` — start prod mode
- `pnpm generate:types` — generate payload types
- `pnpm generate:importmap` — generate import map for the admin panel
- `pnpm lint` / `pnpm lint:fix` — linting

## Configuration notes
- Database: The PostgreSQL adapter (`DATABASE_URI`) is configured by default. The code contains a commented example of a MongoDB adapter.
