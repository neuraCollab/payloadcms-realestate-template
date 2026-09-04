# Project map

File-by-file reference. Start at [CLAUDE.md](CLAUDE.md) for
conventions and gotchas; this file is for "where is X" lookups.
Everything is relative to `src/` unless stated otherwise.

## Collections (`collections/`)

Listing types (public catalog + detail routes, except `houses`):

| Slug | Directory | Notes |
|---|---|---|
| `flats` | `Flat/` | Apartments. Largest field set: rooms, area, floor, building type, amenities. |
| `commercial` | `Commercial/` | Offices, warehouses, retail. |
| `lands` | `Lands/` | Land plots — purpose, communications. |
| `residential-complexes` | `ResidentialComplex/` | ЖК developments; flats can reference one via `residentialComplex`. |
| `houses` | `Houses/` | Private houses. Full UGC submission + admin moderation flow works; **no public catalog route exists** for it. |

Other domain collections:

| Slug | Directory | Purpose |
|---|---|---|
| `users` | `Users/` | Both CMS admins and realtors — `role: 'admin' \| 'realtor'`. See CLAUDE.md re: admin access not actually being role-gated. |
| `agents` | `Agents/` | CMS page-builder content collection for `AgentsBlock`. Not the same as realtor `users` — currently unpopulated. |
| `testimonials` | `Testimonials/` | CMS page-builder content for `TestimonialsBlock`. Currently unpopulated. |
| `reviews` | `Reviews.tsx` | Public reviews of a realtor (`realtor` → `users`), moderated (`status: pending/approved`). |
| `leads` | `Leads/` | Contact-form/callback submissions from `ContactDialog`/`ContactCTA`. |
| `messages` | `Messages/` | Realtor↔buyer chat messages (`/cabinet/chats`). GraphQL type renamed to `ChatMessage`/`ChatMessages` — see CLAUDE.md's interfaceName gotcha. |
| `saved-searches` | `SavedSearches/` | Email digest subscriptions on a filter set; cron-driven (`/api/cron/saved-search-digest`). |
| `telegram-channels` | `TelegramChannels/` | Per-city Telegram channel bindings (`cityName`, `channelId`, `status: active/inactive`). Field is `status`, not `isActive` — this has bitten API code before. |
| `cities` | `Cities/` | City landing pages (`/[citySlug]`), `isActive` gates visibility (this collection *does* use `isActive`, unlike telegram-channels — don't assume the pattern). |
| `seo-landings` | `SeoLandings/` | Bulk-LLM-generated city×filter SEO pages, layered onto `/[slug]/[filterSlug]`. Has an array field `faq` — array fields need a child table, not a `jsonb` column (drifted once, see migration `20260611_seo_landings_faq`). |
| `pages` | `Pages/` | CMS page-builder pages (block-based layout). See "Blocks" below for the addable-vs-renderable sync requirement. |
| `posts` | `Posts/` | Blog posts. |
| `categories` | `Categories/` | Post categories (nested-docs plugin). |
| `media` | `Media.ts` | Uploads; Sharp-generated image sizes. |

Removed: a `properties` collection (generic demo scaffold, zero real
usage) was deleted along with everything built against it — see
`src/migrations/20260613_drop_properties.ts` for the full list of what
went with it. Don't recreate this pattern; see CLAUDE.md.

## Globals

| Slug | File | Purpose |
|---|---|---|
| `header` | `Header/config.ts` | Top nav items. |
| `footer` | `Footer/config.ts` | Footer nav items. |
| `legal-info` | `globals/LegalInfo/config.ts` | Company legal details — footer, /privacy, /terms, JSON-LD. |
| `home-seo` | `globals/HomeSeo/config.ts` | Homepage SEO title/description overrides. |

## Frontend routes (`app/(frontend)/[locale]/`)

Routes below live under the next-intl `[locale]` segment (`ru` —
default, unprefixed — and `kz`, prefixed `/kz/...`; see
`src/i18n/routing.ts`). Paths shown are locale-relative.

- `/` — `page.tsx`. Hero, category tiles, featured listings, recently-viewed, map, city SEO blurbs, FAQ.
- `/flats`, `/commercial`, `/lands`, `/residential-complexes` — `(realestate)/<type>/page.tsx`. Catalog: filters + split list/map view (`PropertyListingPage` + `CatalogClient`).
- `/flats/[slug]` etc. — `(realestate)/<type>/[slug]/page.tsx`. Detail page (`PropertyDetailPage`): gallery, specs, mortgage calculator, realtor card, reviews, FAQ, related listings.
- `/[slug]` — CMS `pages` collection OR a city landing page (tries `cities` first by slug, falls back to `pages`). See `queryCityBySlug`/`queryPageBySlug` in this file.
- `/[slug]/[filterSlug]` — `seo-landings` city×filter combo pages.
- `/agents` — realtor directory (queries `users` where `role=realtor`, **not** the `agents` collection).
- `/realtors/[slug]` — individual realtor profile (reviews, active/sold listings, review form). Linked from `/agents`; no `/realtors` index route exists (by design — `/agents` is the index).
- `/posts`, `/posts/[slug]`, `/posts/page/[pageNumber]` — blog.
- `/search` — keyword + AI (`?ai=1`) search results.
- `/compare` — up to 4 listings side by side (localStorage-backed, `lib/compare.ts`).
- `/privacy`, `/terms` — legal pages.
- `/cabinet/*` — gated by the `realty_email` cookie (magic-link/OAuth), not Payload auth:
  - `login` — magic-link + OAuth entry.
  - `profile`, `favorites`, `recent`, `saved-searches` — self-explanatory, each backed by localStorage or a `contactEmail`-scoped query.
  - `listings`, `listings/new`, `listings/new/[collection]`, `listings/[id]/edit`, `listings/[id]/preview` — UGC submission flow. `[collection]` is validated against `flats/houses/commercial/lands` only (no `residential-complexes` — those are admin/developer-listed, not self-serve).
  - `chats`, `chats/[threadId]` — realtor messaging.

## Payload API routes (`app/(payload)/api/`)

Payload-generated (per collection, via `[...slug]/route.ts`): standard
REST CRUD at `/api/<collection-slug>`. Plus `/api/graphql` and
`/api/graphql-playground`.

This app's own routes:

| Route | Purpose |
|---|---|
| `auth/magic-link`, `auth/verify` | Cabinet passwordless login. |
| `auth/oauth/[provider]/start`, `.../callback` | Cabinet OAuth (google/yandex/mailru). |
| `cabinet/session` | Resolve current cabinet identity from cookie. |
| `cabinet/listings`, `cabinet/listings/[id]`, `.../photos`, `.../submit` | UGC listing CRUD + photo upload + moderation submit. |
| `cabinet/messages` | Realtor chat send/list. |
| `messages` | Contact-a-realtor popup (`MessagePopup`/`MessageButton`) — distinct from `cabinet/messages`. |
| `reviews` | Public review submission. |
| `leads` | Contact form / callback request submission. |
| `saved-searches` | CRUD for saved-search subscriptions. |
| `recommend` | AI recommendation engine (`RecommendModal`). |
| `search`, `search/suggestions` | Keyword search + autocomplete. |
| `ai-search` | Natural-language search (embeddings + Claude Haiku query parsing). Rate-limited. |
| `map-items` | GeoJSON-ish listing points for map views. |
| `upload` | Generic media upload (used by cabinet photo uploader). |
| `telegram/webhook` | Telegram bot command handler (`/channels`, `/channel`, `/register_channel`). |
| `cron/saved-search-digest` | Bearer-`CRON_SECRET`-gated digest email sender. |
| `admin/generate-description`, `admin/seo/generate` | LLM content generation (listing descriptions, bulk SEO landings). |
| `admin/import-feed`, `admin/import-listings` | Bulk listing ingestion (`lib/listings-parser/`). |
| `admin/reindex-embeddings` | Rebuild pgvector embeddings for AI search/recommendations. |
| `admin/maintenance` | Misc admin housekeeping tasks. |
| `admin/migrate` | **The real production migration mechanism.** The deployed image is a Next standalone build with no `pnpm`/Payload CLI available inside the container, so this HTTP endpoint applies pending migrations from `src/migrations/` instead — idempotent, tracks `payload_migrations`. Bearer `CRON_SECRET` or an admin session. `{ dryRun: true }` to preview. Still has to be called by hand after a deploy; nothing invokes it automatically. |
| `admin/telegram-setup` | Registers the Telegram bot webhook. |

Also `/robots.txt`, `/(sitemaps)/pages-sitemap.xml`,
`/listings-sitemap.xml`, `/posts-sitemap.xml` — all under
`app/(frontend)/`, not `(payload)`. Unlike the routes above, these
stay outside the `[locale]` segment (unprefixed, single-locale) — see
`src/proxy.ts`'s matcher.

## `lib/` — cross-cutting logic

- `llm.ts` — unified Anthropic/OpenAI chat wrapper.
- `embeddings/` — pgvector store (`store.ts`, table `property_embeddings`), query embedding + NL query parsing (`queryParser.ts`), serialization/stemming helpers.
- `recommend/` — AI recommendation engine (ANN search + Claude explanation generation).
- `seo/generate.ts` — bulk SEO landing-page generation (`discoverCombos` + gpt-4o-mini).
- `telegram/` — bot client (`client.ts`), per-city publish-on-create (`publish.ts`), session state for bot commands (`sessions.ts`).
- `auth/oauth/` — Google/Yandex/Mail.ru OAuth flows for cabinet.
- `cabinet/listingValidator.ts` — UGC field validation + slugify for all 4 self-serve listing types. Slugs are allowed to stay Cyrillic (deliberate — see the `slugify` regex).
- `listings-parser/` — `feed-import.ts` (structured feed ingestion), `ingest.ts`, `city-upsert.ts`, `providers/playwright-skeleton.ts` (**deliberately disabled** scraper reference implementation — read its own header before touching).
- `rateLimit.ts` — shared in-memory rate limiter + honeypot helper used by every public-facing POST route.
- `compare.ts`, `favorites.ts`, `recentlyViewed.ts` — localStorage-backed, per-browser, near-identical API shape (`list/toggle/clear`). `compare.ts` caps at 4 items and only within one collection type.
- `threadId.ts` — deterministic realtor+email → chat thread ID.
- `cityUrls.ts`, `mapItems.ts`, `propertyMetadata.ts`, `marketAnalytics.ts`, `describeFlat.ts`, `csv.ts`, `speller.ts`, `geoip.ts`, `email.ts` (Resend wrapper), `analytics.ts` — smaller single-purpose helpers, self-explanatory from name + a quick read.

## `utilities/` — small pure helpers

`pluralizeRu.ts` (Russian 3-form pluralization — use this, not a
ternary), `formatPrice.ts`, `formatDate(Time).ts`, `secureCompare.ts`
(timing-safe compare for bearer tokens), `getURL.ts` (server/client
base URL resolution), `seo.ts` (JSON-LD builders), `generateMeta.ts`,
`geocode.ts`, `toKebabCase.ts`, `seedAuth.ts` (dev-open /
prod-Bearer-gated check for seed & admin endpoints), `ui.ts` (`cn()`
classname merge).

## `components/` — reusable UI

Domain-specific: `PropertyCard`, `PropertyListingPage` (+
`CatalogClient`), `PropertyDetailPage`, `PropertyFilters`, `CatalogMap`
(Mapbox GL catalog map), `PropertyMap.tsx` (single/multi-marker map
used by `MapBlock` and "nearby" widgets — note the literal `.tsx` in
the *directory* name), `CityLandingPage`, `SearchFilters`,
`ImageGallery`.

User-state widgets (each pairs with a `lib/*.ts` localStorage or API
module of the same concept): `FavoriteButton`, `CompareButton` +
`CompareTray`, `SavedSearch`, `LoginNudge`.

Forms/contact: `LeadForm` (`ContactCTA`/`ContactDialog` — the
"Call me" popup), `OAuthButtons`, `ConsentCheckbox`, `RecommendModal`
(AI helper, cabinet-auth-gated), `RichTextEditor` (Tiptap wrapper for
cabinet listing descriptions — StarterKit's built-in `link` extension
must stay disabled here, see CLAUDE.md-adjacent comment in the file).

Payload-admin-slot components (registered by string path in
`payload.config.ts`, not imported directly — grep
`payload.config.ts`/collection `admin.components` before assuming one
is unused): `BeforeDashboard`, `BeforeLogin`.

Generic/Payload-website-template carryovers: `Card`, `CollectionArchive`,
`Pagination`/`PageRange`, `Link`, `Media`, `RichText`,
`LivePreviewListener`, `PayloadRedirects`, `Logo`, `ThemeToggle`,
`CookieConsent`, `Analytics` (Yandex Metrika + GA4, no-ops without
env), `Forms` (form-builder plugin renderer), `ui/` (shadcn
primitives), `icons/` (`BrandIcons.tsx` — lucide-react dropped brand
icons; hand-rolled Instagram/Facebook/Twitter/Linkedin live here
instead).

`Home/` — homepage-specific composition (Hero, FeaturedListings,
CategoryTiles(+Client), MapNearby(+Client), WhyUs, FaqSection,
SeoSections).

## `blocks/` — Payload page-builder Blocks

**Before adding one: every Block needs `interfaceName` in its config,
and must be registered in both `collections/Pages/index.ts` (addable
in admin) and `blocks/RenderBlocks.tsx`'s `blockComponents` map
(actually renders) — see CLAUDE.md, this has broken production twice.**

- `base/` — generic, content-agnostic (from the Payload website
  starter template): `HeroBlock`, `CallToAction`, `Content`,
  `MediaBlock`, `ArchiveBlock`, `BlogBlock`, `FAQ`, `Navbar`, `Code`
  and `Banner` (both only used as inline RichText/Lexical block nodes
  via `components/RichText/`, not as page-layout blocks — don't expect
  to find them in `RenderBlocks.tsx`).
- `house/` — domain-specific: `HeroSearch`, `PropertiesBlock`
  (curated/related listings grid, `relationTo` spans all 4 public
  listing collections), `MapBlock` (single static "office marker" map
  only — its original curated-listings mode pointed at the removed
  `properties` collection and a `/properties` route that never
  existed; don't resurrect that shape without designing it properly
  against the real 5-collection domain model), `Agents`,
  `Testimonials`, `Amenities`, `FeatureBlock`, `HowItWorksBlock`,
  `VisionBlock`/`VisionMission`, `QuickNav`, `HouseFilter` (rendered
  as `UniversalFilterTabs` — name doesn't match the directory, check
  `RenderBlocks.tsx` if grepping for it fails), `ContactHero`,
  `ContactUsForm`, `CallToActionNew`, `AboutHero`, `RecentlyViewed`
  (also used directly, hardcoded, on the homepage — not only via the
  block picker).
- `Form/` — form-builder plugin's field-type blocks (`Text`,
  `Textarea`, `Select`, `Checkbox`, `Email`, `Number`, `Country`,
  `State`, `Message`, `Error`, `Width`) — rendered inside `FormBlock`,
  not individually in `RenderBlocks.tsx`. Its `Message` block is the
  one that collided with this app's own `messages` collection GraphQL
  type — see CLAUDE.md.

## `migrations/`

Hand-written Drizzle SQL, registered in `index.ts` in order. Naming:
`YYYYMMDD_description.ts`. Each exports `up`/`down`; write a new file
rather than editing a merged one. See CLAUDE.md for how to verify a
migration actually matches the collection config it's meant to
implement — this has drifted silently more than once.

## `endpoints/`

Local-API seed scripts, split by concern: `seed/` (posts, pages, forms
— the original Payload-template seed), `seed-pages/` (this app's
custom marketing pages — home-v2, about, agents, blogs, contact),
`seed-globals/` (header/footer/legal-info). Invoked via
`/next/seed*` routes in `app/(frontend)/next/`, not listed separately
above since there are ~10 of them, all following the same pattern —
`grep -rl "seed-" src/app/(frontend)/next` to enumerate.

## `tests/`

- `unit/` — Node's built-in test runner (`pnpm test:unit`), no DB
  needed for most (pure functions: `formatDate`, `cityUrls`, `csv`,
  `threadId`, `speller`, `geocode`, `htmlToLexical`/`lexicalToHtml`,
  `houses`, `authenticated` access rule, the `playwright-skeleton`
  parser, `seed-globals`, `llm.ts`, `marketAnalytics`).
- `e2e/` — Playwright (`pnpm test:e2e`), needs a running dev server +
  seeded DB: `lead-flow`, `listings-and-search`, `cabinet`, `forms`.
- `load/ai-search.js` — k6 load test (`pnpm test:load:ai-search`).

## Scripts (`scripts/`)

`deploy.sh` (manual prod deploy over SSH), `dc.sh` (docker-compose
wrapper with env injection), `daily-backup.sh`/`backup.sh` (+
`db/backup.sh`, `db/restore.sh`), `certbot-renew.sh`,
`infisical-import-env.sh` (one-shot local `.env` → Infisical
migration), `snapshot.ps1`/`.sh` (Windows/Unix full backup).
