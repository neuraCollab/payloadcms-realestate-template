# CLAUDE.md

Guidance for Claude Code (or any AI agent) working in this repository.
Read this first. For a one-screen orientation optimized for a fresh
context window, see [llms.txt](llms.txt). For a file-by-file map, see
[PROJECT_MAP.md](PROJECT_MAP.md).

## What this is

MegaDomic — a Russian-language real estate listings platform. Next.js
16 (App Router) + Payload CMS v3 (Postgres/Drizzle) + pgvector-backed
AI search. Five listing types (`flats`, `commercial`, `lands`,
`residential-complexes`, `houses`), a public catalog with SEO city
landing pages, a user cabinet for self-serve listing submission and
realtor messaging, and a CMS-driven page builder for marketing pages.

All user-facing text is Russian. There is no i18n layer — don't add
one unless asked; just write Russian strings directly like the rest
of the codebase does.

## Quick start

```bash
pnpm install
cp .env.example .env   # fill in DATABASE_URI, PAYLOAD_SECRET, etc.
pnpm payload migrate    # apply migrations to an empty Postgres + pgvector DB
pnpm dev                # http://localhost:3000, Turbopack
```

Full setup detail (Docker vs local, env vars): [SETUP.md](SETUP.md),
[START_GUIDE.md](START_GUIDE.md).

First admin user: there's no `/admin` first-user wizard shortcut in
this fork's flow that reliably works headless — easiest path in a
fresh dev DB is the Payload Local API:

```ts
const payload = await getPayload({ config })
await payload.create({ collection: 'users', data: { email, password, name, role: 'admin' }, overrideAccess: true })
```

Seed content (dev/local only — these endpoints are open when
`NODE_ENV !== 'production'`, Bearer `CRON_SECRET` gated otherwise):
`POST /next/seed-globals`, `/next/seed-pages`, `/next/seed-cities`,
`/next/seed-photos`, `/next/seed-posts`, `/next/seed-spb-listings`.
Order matters: globals and an admin user before posts/photos (they
need an author and at least one Media doc).

## Verifying a change before you call it done

Run what's relevant to what you touched — this is not a "run
everything every time" checklist:

- `pnpm test:unit` — fast, no DB needed for most of them. **Must be
  100% green.** (It was silently broken — one test crashing the whole
  process — until this file's introducing commit; don't let it rot
  again.)
- `pnpm test:e2e` — needs a running dev server + seeded DB.
- `NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json` —
  the build skips type errors (`ignoreBuildErrors` in
  `next.config.js`, to save RAM on a small VPS), so this is the only
  thing that actually catches them. Two pre-existing, unrelated
  errors are known (`playwright.config.ts`, `src/endpoints/seed/index.ts`)
  — don't let the count grow beyond that baseline.
- If you touched a **collection's fields**: run `pnpm payload
  migrate:create` and commit the generated migration. Never hand-edit
  a merged migration file — write a new one. See "Schema drift" below
  for how to verify config and DB actually agree. Nothing applies
  migrations automatically anywhere (not on boot, not in the
  Dockerfile, not in CI/CD) — locally that's `pnpm payload migrate`;
  in production, the deployed image has no CLI inside the container,
  so it's `POST /api/admin/migrate` (Bearer `CRON_SECRET`) instead.
  Someone always has to trigger it by hand after a deploy.
- If you touched a **Payload Block** (`src/blocks/**/config.ts`): see
  "Every Block needs `interfaceName`" below — this is the single most
  expensive mistake to make in this codebase.
- If you touched anything in the request path of a real page: actually
  load it in a browser (or headless via Playwright) with real seeded
  data, not just `curl` for a 200. Several of the worst bugs found in
  this codebase only 500'd once a *field was actually populated*
  (e.g. a listing had a `realtor` set) — empty/default data hid them
  completely. Don't trust a clean crawl over empty seed data.

## Critical gotchas (read before touching these areas)

These cost real debugging time to find. Each is a specific, narrow
trap — not general advice.

**Every Payload Block needs `interfaceName`.** Without it, Payload
names the Block's GraphQL type from its bare `slug`
(`slug: 'agents'` → GraphQL type `Agents`). If any collection has the
same slug (`agents`, `testimonials`, `properties` all did), GraphQL
schema construction throws `Schema must contain uniquely named types`
and **the entire `/api/graphql` endpoint 500s on every query** — not
just the conflicting type. This has happened twice in this repo's
history. Every Block in `src/blocks/**/config.ts` now sets
`interfaceName: '<Name>Block'` — keep doing that for every new one,
even if nothing collides today. A third-party plugin can introduce the
collision too (`@payloadcms/plugin-form-builder` ships its own
`message` field-type block) — if you can't rename the plugin's block,
rename your own collection's type instead via
`graphQL: { singularName, pluralName }` (see `src/collections/Messages/index.ts`).

**A Block registered in `Pages.layout` must also be registered in
`RenderBlocks.tsx`.** These are two separate lists that have to stay
in sync by hand: `src/collections/Pages/index.ts` controls what an
editor can *add* in the admin page builder; `src/blocks/RenderBlocks.tsx`'s
`blockComponents` map controls what actually *renders*. A block in the
first list but not the second is silently addable and silently
renders nothing — no error, just an empty gap on the page. Check both
whenever you add or remove a block.

**Relationship fields with `filterOptions` reject a string ID.**
`payload.create({ data: { someRelationField: '2' } })` throws
`"This relationship field has the following invalid relationships"`
if the field has `filterOptions` set — even when the ID resolves to a
real document matching those options. Payload's `filterOptions`
validation query needs a number. Any API route that takes an ID from
`FormData` or a JSON body (always a string, or ambiguous) and passes
it straight into a relationship field with `filterOptions` will hit
this — always `Number(id)` first. Bit twice already
(`src/app/(payload)/api/messages/route.ts`, `.../reviews/route.ts`);
`.../leads/route.ts` had it right from the start — copy that pattern.

**Migrations are hand-written, not auto-diffed against config —
verify they match.** `push: false` is set on the Postgres adapter
specifically so dev never auto-syncs schema (see comment in
`src/payload.config.ts`), which means nothing catches a collection
field whose migration was never written or was written wrong. This
repo has shipped at least two real drift bugs this way: a `boolean
is_active` column when the config field was `status: select`, and an
`array` field (`faq`) that got a `jsonb` column instead of the child
table Payload actually expects — both broke the feature outright at
the DB level with zero compile-time signal. After writing or changing
a migration, verify it against Payload's own expected schema:

```ts
// Compares payload.db.tables (what config expects) against
// information_schema.columns (what's actually in Postgres).
// Zero output on both loops = no drift.
const payload = await getPayload({ config })
const db = payload.db
for (const tableName of Object.keys(db.tables)) {
  const table = db.tables[tableName]
  const drizzleName = table[Symbol.for('drizzle:Name')] || tableName
  // ... query information_schema.columns for drizzleName, diff column names
}
```
(Full script was used ad hoc during past cleanups — reconstruct it
from `db.tables` + `information_schema.columns` rather than trusting
migrations by inspection alone.)

**Russian pluralization needs `pluralizeRu`, not a binary ternary.**
Russian has three plural forms selected by the count's last digit(s)
(one/few/many — e.g. "1 объект", "3 объекта", "5 объектов"), not two
like English. `n === 1 ? 'объект' : 'объектов'` is wrong for every
count in the 2–4 (and often 0, 11–14) range. Use
`pluralizeRu(n, [one, few, many])` from
`src/utilities/pluralizeRu.ts` — it's the single shared
implementation; don't reintroduce a local copy or a naive ternary.

**Server Components cannot take DOM event handlers.** A plain
`<div onClick={...}>` inside a Server Component (any file without
`'use client'` at the top, including one rendered from a page.tsx)
throws `Event handlers cannot be passed to Client Component props` —
but only when that code path actually executes, so it can sit unnoticed
until real data reaches it. If you need to stop a click from bubbling
inside a Server Component tree, either make that one small piece a
Client Component, or (often simpler) push the `stopPropagation()` into
a child Client Component's own handler — a descendant's
`stopPropagation()` before the event reaches a parent `<Link>` is
usually enough on its own, no wrapper needed.

**`pnpm install` needs `pnpm.onlyBuiltDependencies` in `package.json`.**
pnpm 10 blocks native postinstall scripts (`sharp`, `esbuild`,
`unrs-resolver`) by default; in a non-interactive install (Docker, CI,
this repo's own `pnpm i --no-frozen-lockfile` in `Dockerfile`) that
means `sharp` silently never gets its native binary, and every image
upload/resize breaks. It's already set in `package.json` — if
`pnpm install` ever reports "Ignored build scripts", something
regenerated `package.json` without it; put it back.

## Architecture at a glance

Five listing collections, each its own Payload collection with its
own field shape (not a shared "Property" base — see below):
`flats`, `commercial`, `lands`, `residential-complexes`, `houses`.
Public catalog + detail routes exist for the first four
(`/flats`, `/commercial`, `/lands`, `/residential-complexes` +
`/[type]/[slug]`); `houses` has a working submission flow (cabinet →
admin moderation) but **no public catalog route** — submitted house
listings currently have nowhere to be browsed. That's a known gap,
not a bug to silently "fix" by guessing a UX — flag it if asked to
touch houses.

There is no generic `Property` base collection — an earlier attempt
at one (`properties`, with three Blocks built against it) was dead
code and was removed. Don't reintroduce that pattern; each listing
type's fields genuinely differ enough (rooms/floor for flats vs.
purpose/communications for lands) that Payload collections per type is
the right call here, not premature-DRY.

- `src/collections/` — Payload collections (schema ground truth).
  One directory per collection; `index.ts` (or `.tsx` if it has admin
  UI components) exports the config.
- `src/globals/`, `src/Header/`, `src/Footer/` — singleton documents
  (LegalInfo, HomeSeo, Header nav, Footer nav).
- `src/app/(frontend)/` — public Next.js routes. Server Components by
  default; `'use client'` only for actual interactivity (forms, maps,
  filters).
- `src/app/(payload)/` — `/admin` (Payload's own UI) and `/api/*`
  (both Payload's auto-generated REST/GraphQL and this app's own
  custom routes, side by side in the same directory).
- `src/blocks/` — Payload page-builder Blocks (`base/` = generic
  starter-template blocks — hero, CTA, FAQ, content; `house/` =
  domain-specific — property listings grid, agents, amenities). Every
  Block has a `config.ts` (Payload field schema) and a
  `component.tsx`/`Component.tsx` (the render). See the two gotchas
  above before adding one.
- `src/components/` — reusable UI, mostly Client Components
  (favorites, compare, filters, cabinet forms, map widgets).
- `src/lib/` — cross-cutting logic: `embeddings/` (pgvector store +
  query parsing), `recommend/` (AI recommendation engine), `seo/`
  (bulk landing-page generation), `telegram/` (per-city channel
  publishing), `cabinet/` (UGC listing validation), `listings-parser/`
  (feed import + a deliberately-disabled scraper skeleton — see its
  own file header before touching it).
- `src/migrations/` — hand-written Drizzle SQL, registered in
  `index.ts`. See "Migrations are hand-written" above.
- `src/utilities/` — small pure helpers (`pluralizeRu`, `formatPrice`,
  `formatDate`, `secureCompare`, `getURL`, ...).
- `tests/unit/` (Node's built-in test runner, `pnpm test:unit`),
  `tests/e2e/` (Playwright, `pnpm test:e2e`).

Full per-file breakdown: [PROJECT_MAP.md](PROJECT_MAP.md).

## Conventions

- Import alias `@/` → `src/`.
- Server Components by default; add `'use client'` only when the
  component needs state, effects, or browser APIs.
- API routes return JSON only: `{ error: 'code', message?: 'human' }`
  with the right HTTP status on failure, `{ success: true, ... }` (or
  a resource body) on success.
- `Bearer <CRON_SECRET>` auth on `/api/admin/*` and `/next/seed-*` in
  production; open in dev (see `src/utilities/seedAuth.ts`).
- A relationship ID coming from `FormData` or an untyped JSON body is
  a string until proven otherwise — coerce with `Number()` before
  handing it to Payload if the field has `filterOptions` (see gotcha
  above); harmless to do it unconditionally either way.
- Currency is RUB everywhere in new code.
- When a component needs the *count-aware* Russian word for something,
  reach for `pluralizeRu` — don't hand-roll pluralization logic again.

## Known pre-existing issues (not yours to silently fix, but don't add to them)

- `playwright.config.ts` and `src/endpoints/seed/index.ts` have
  pre-existing `tsc` errors unrelated to any recent change (duplicate
  object property; a couple of seed fixtures typed against a stricter
  `Post`/global shape than they populate). Leave them unless
  specifically asked to clean up seed scripts.
- `houses` has no public catalog route (see above).
- `Agents` and `Testimonials` are real, wired-in Payload collections
  (used by `AgentsBlock`/`TestimonialsBlock` in the page builder) that
  currently have no seeded content anywhere — functional, just empty.
  Don't confuse them with `Users` (`role: 'realtor'`), which is the
  collection actually driving realtor cards, messaging, and the
  `/realtors`/`/agents` pages.

## Where to look next

- [llms.txt](llms.txt) — condensed orientation (stack, domain model,
  auth model, deploy). Keep both this file and that one in sync when
  either changes — llms.txt drifting from reality already caused
  confusion once (it referenced files and directories that no longer
  existed).
- [PROJECT_MAP.md](PROJECT_MAP.md) — every collection, route, and lib
  module with a one-line purpose.
- [docs/](docs/) — deploy, CI/CD, analytics, email setup.
- [SETUP.md](SETUP.md) / [START_GUIDE.md](START_GUIDE.md) — full local
  dev setup (Docker and non-Docker paths).
