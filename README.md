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

## Backup & Restore

The current state of the app — Postgres data **and** the media files referenced by it — is preserved in the repo so you can stand up an identical copy on another server.

What's tracked in git:
- `db/dump.sql` — full PostgreSQL dump (schema + data, produced with `pg_dump --clean --if-exists`)
- `public/media/` — image binaries referenced by the `media` collection
- `db/restore.sh` — one-shot restore against the running `postgres` container
- `db/backup.sh` — refreshes `db/dump.sql` from the live database

What's **not** tracked: `.env` (secrets), `node_modules`, `.next`, the Docker volumes themselves. You re-create those on the target server.

### Restore on a fresh server (full deployment)

```bash
# 1. Clone the repo
git clone https://github.com/neuraCollab/payloadcms-realestate-template.git
cd payloadcms-realestate-template

# 2. Create .env (start from the example, then edit secrets)
cp .env.example .env
$EDITOR .env   # set PAYLOAD_SECRET, CRON_SECRET, PREVIEW_SECRET, POSTGRES_PASSWORD, PGADMIN_DEFAULT_PASSWORD

# 3. Bring up the stack (builds the Next.js dev container and starts postgres + pgadmin)
docker compose up -d --build

# 4. Wait until postgres reports healthy
docker compose ps   # postgres should show "(healthy)"

# 5. Restore the database from the committed dump
./db/restore.sh

# 6. (Media is already on disk via the git checkout — nothing else to copy.)

# 7. Verify
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/        # → 200
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin   # → 200
```

After step 5 the app at `http://localhost:3000` and the Payload admin at `http://localhost:3000/admin` will reflect the exact state captured in the repo — pages, posts, media references, agents, properties, forms, and globals (header/footer).

> **Windows note** — `db/restore.sh` and `db/backup.sh` are bash scripts. On Windows run them through Git Bash, WSL, or Docker's bundled bash. The equivalent one-liner without the script is:
> ```bash
> docker exec -i my_postgres psql -U admin -d mydb < db/dump.sql
> ```

### Refresh the snapshot

Anytime you add/edit content in `/admin` and want the change to travel with the next deployment, refresh the dump and commit:

```bash
./db/backup.sh
git add db/dump.sql public/media/
git commit -m "Refresh demo content snapshot"
```

### Just the DB, without the scripts

```bash
# Export
docker exec my_postgres pg_dump -U admin -d mydb --clean --if-exists --no-owner --no-privileges > db/dump.sql

# Import
docker exec -i my_postgres psql -U admin -d mydb < db/dump.sql
```

### Seeding demo pages from blocks

A separate dev-only endpoint upserts the Realestic-modeled demo pages (`/home-v2`, `/about`, `/agents`, `/blogs`, `/contact`, `/demo`) by composing house/base blocks. Safe to re-run — it doesn't wipe any other collection.

```bash
curl -X POST http://localhost:3000/next/seed-pages
# → {"success":true,"created":[],"updated":["demo","home-v2","about","agents","blogs","contact"]}
```

Page factories live under `src/endpoints/seed-pages/`. Edit a `*-page.ts` file, re-curl, refresh the route — done.

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

## End-to-end testing (Playwright)

Tests live in `tests/e2e/` and target `http://localhost:3000` (override with `PLAYWRIGHT_BASE_URL`).

### HTTP smoke (runs anywhere, ~17 s)

The `smoke.spec.ts` file uses Playwright's HTTP `request` API and doesn't need a browser. It runs in the existing Alpine-based dev container:

```bash
docker compose exec app pnpm test:e2e:smoke
# → 15 passed (17 s) — every route returns 200, /flats/<bad-slug> returns 404
```

### Browser UI tests (require a Debian base)

The Alpine dev image cannot run headless Chromium (Playwright's binary is glibc/Debian, Alpine is musl). Run the UI specs via the official Playwright image on the host:

```bash
# From the repo root, with the dev stack already up:
docker run --rm --network host \
  -v "$PWD":/work -w /work \
  mcr.microsoft.com/playwright:v1.60.0-jammy \
  bash -c "pnpm install --no-frozen-lockfile && pnpm test:e2e --project=chromium"
```

Alternatively, run on the host directly:

```bash
pnpm install
pnpm exec playwright install chromium
pnpm test:e2e
```

## Course documentation

- [docs/practical-work.md](docs/practical-work.md) — практические работы по ГОСТу для дисциплины «Качество и тестирование ПО»: ТЗ, ручное и автоматическое тестирование, метрическая оценка, тестирование Web-приложения.

## Scripts
- `pnpm dev` — start development (Turbopack)
- `pnpm build` — build
- `pnpm start` — start prod mode
- `pnpm generate:types` — generate payload types
- `pnpm generate:importmap` — generate import map for the admin panel
- `pnpm lint` / `pnpm lint:fix` — linting
- `pnpm test:e2e` — Playwright e2e suite (all projects)
- `pnpm test:e2e:smoke` — HTTP-only smoke (~17 s)
- `pnpm test:e2e:headed` — run with browser visible
- `pnpm test:e2e:report` — open the last HTML report

## Configuration notes
- Database: The PostgreSQL adapter (`DATABASE_URI`) is configured by default. The code contains a commented example of a MongoDB adapter.
