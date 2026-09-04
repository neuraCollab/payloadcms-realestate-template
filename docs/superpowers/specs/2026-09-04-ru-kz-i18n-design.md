# RU/KZ i18n — Design Spec

**Date:** 2026-09-04
**Scope:** Add a live RU/KZ language switcher to the public frontend, localize Payload-authored content, and (best-effort) localize the `/admin` interface — so this template can be sold/delivered as turnkey real-estate agency sites for the Kazakhstan market.

---

## 1. Context

This is a Payload CMS 3 + Next.js 16 (App Router) real-estate template (see `CLAUDE.md`, `llms.txt`). All user-facing text is currently Russian, hardcoded directly in JSX and in CMS-seeded content — there is no i18n layer at all (`localization` is not configured in `payload.config.ts`; no translation library is installed).

The business context (from conversation): the owner is repositioning this codebase as a sellable boilerplate for turnkey real-estate agency websites, targeting both Russia and Kazakhstan. Kazakhstan clients need visitors to be able to read the site in Russian or Kazakh, switching live on one domain.

## 2. Goals

- A visitor on a Kazakhstan deployment can switch between Russian and Kazakh on any page, URL reflects the language (`/kz/...` prefix for Kazakh, unprefixed for Russian — existing RU URLs stay unchanged).
- Every string currently hardcoded in JSX (nav, buttons, forms, error/empty states, filters, etc.) is extracted into RU/KZ message catalogs and rendered through a translation function — full coverage, not just a subset.
- CMS-authored content an agency edits in `/admin` (pages built via the page-builder, blog posts, header/footer nav labels, legal text, listing title/description) can hold independent RU and KZ values via Payload's built-in `localization`.
- `/admin` itself is, best-effort, usable in Kazakh for non-technical KZ agency staff (open risk — see §9).
- Kazakh text throughout (UI strings + seeded demo content) is machine-translated by Claude as a first pass; the spec assumes a native speaker reviews it before it reaches a real paying client, not before this repo's own CI/tests pass.

## 3. Non-goals (explicitly out of scope for this pass)

- Any language beyond `ru`/`kz`.
- Auto-translating listings pulled in through the feed-import parsers (`src/lib/listings-parser`) — imported content stays Russian-only; an agency can manually add a Kazakh version afterward like any other listing.
- Auto-generating Kazakh versions of the bulk AI-generated SEO landing pages (`/api/admin/seo/generate`, currently OpenAI/RU-only) — schema will support a `kz` value, but the generator itself is not touched.
- Per-listing localized `slug`, `location.city`, `location.district`, `location.address` — addresses stay as the agency typed them, in whichever language, shared across both locale URLs for the same listing (one canonical slug, not two). Revisit only if a real client asks.
- Localizing enum *option labels* (property type, transaction type, rooms, building type, status, amenities...) via Payload's `localized` field mechanism — see §5.3, these go through the UI message catalog instead, not per-record duplication.
- Cabinet auth flows, Telegram bot text, email templates — unless caught incidentally while extracting a shared component's strings, these are not a deliberate target of this pass and can be swept up in a follow-up.

## 4. Decisions taken during brainstorm

| Question | Choice |
|---|---|
| Live switcher vs. one language per deployment | **Live switcher**, one domain, both locales always present. |
| URL scheme | **Path prefix** — `/kz/...` for Kazakh, no prefix for Russian (default locale, existing URLs unchanged). |
| What needs translating | Public site (UI chrome + CMS content) **and** `/admin` interface. |
| v1 coverage | **Full** — every hardcoded string, not a partial pass with the rest deferred. |
| Kazakh translation source | Claude translates directly; native-speaker review happens before a real client, not before this repo's tests pass. |
| Locale code | `kz` (not the ISO-639 `kk`) — deliberately: this is a market code the business and its future clients already think in, not a linguistics exercise. |

## 5. Architecture

### 5.1 UI strings — next-intl

Chosen over a hand-rolled dictionary+middleware (more custom routing/redirect edge-case risk to get right) and over storing chrome strings as Payload content (turns compile-time constants into a DB dependency for zero benefit at this layer).

- `src/app/(frontend)` moves to `src/app/[locale]/(frontend)` — every existing route file shifts down one directory level, imports unaffected (path alias `@/` unchanged). `(payload)` route group (`/admin`, `/api/*`) is **not** touched — those stay unprefixed.
- `src/middleware.ts` — next-intl middleware, `localePrefix: 'as-needed'` (default locale `ru` gets no prefix, `kz` gets `/kz`).
- `src/i18n/routing.ts` — `defineRouting({ locales: ['ru', 'kz'], defaultLocale: 'ru' })`.
- `src/i18n/request.ts` — loads the message catalog for the active locale.
- `messages/ru.json`, `messages/kz.json` — flat-namespaced message catalogs (e.g. `catalog.mapToggle`, `leadForm.phoneRequired`). Populated by extracting every hardcoded string found across `src/app/(frontend)`, `src/components`, `src/blocks`, `src/Header`, `src/Footer`.
- Components read strings via `useTranslations()` (client) / `getTranslations()` (server); no component keeps a raw Russian string literal in its JSX once this pass is done.
- Root layout wraps children in `NextIntlClientProvider`.

### 5.2 Pluralization

`src/utilities/pluralizeRu.ts` (documented in `CLAUDE.md` as the one canonical implementation — must stay the single source, not be duplicated) becomes `src/utilities/pluralize.ts`, exporting `pluralize(n, locale, forms)`. Russian keeps its existing one/few/many CLDR-style branching unchanged. Kazakh is added as a second, much simpler branch — Kazakh nouns don't change form after a numeral (`5 үй`, not `5 үйлер`), so `pluralizeKz` is effectively a passthrough to the base form. All ~existing call sites of `pluralizeRu` get a locale param threaded through (from the active `next-intl` locale) instead of hardcoding `'ru'`.

### 5.3 Payload Localization — CMS content

`payload.config.ts` gets `localization: { locales: ['ru', 'kz'], defaultLocale: 'ru', fallback: true }`. `fallback: true` matters in practice: an agency will not translate every listing/page into Kazakh the moment they create it, so a `kz` visitor viewing a not-yet-translated record must see the Russian text (via Payload's automatic fallback), never a blank field. This is the default for new content until someone fills in the Kazakh value.

**Rule for marking a field `localized: true`:** the field holds copy a human wrote/reads (headline, body text, label, alt text) that plausibly differs by language. Fields holding data (numbers, dates, URLs, media references, coordinates, IDs, enum/`select` values) are **not** localized — enum values are a fixed, small, repeating vocabulary, so their *display label* is translated once in the UI message catalog (§5.1) keyed by the enum's value, not duplicated per record.

Worked example (`src/blocks/base/HeroBlock/config.ts`): `badgeText`, `headline`, `highlight`, `subheadline` → `localized: true`. `image` (an upload relationship) → untouched.

Worked example (`src/collections/Flat/index.ts`): `title`, `description` (richText), `images[].alt` → localized. `propertyCategory`, `transactionType`, `rooms`, `currency`, `buildingType`, `status`, `rentalSubtype` (all `select`) → not localized, translated via message catalog instead. `location.*`, `coordinates`, `area`, `floorInfo`, `priceHistory`, `video`, `moderationNote` (internal-only) → not localized. `amenities[].amenity` is currently free text — **flagged for a call at implementation kickoff**: converting it to a fixed multiselect (translated via catalog, like the other enums) is the cleaner fit for the "admin adds a listing in 2–3 minutes" goal from the earlier feature checklist, versus asking every listing to carry duplicate-language amenity text.

Collections/globals in scope: `Pages` (every block's copy fields, per §5.1's rule applied block-by-block), `Posts` (title, content, excerpt/meta), `Header`/`Footer` (nav item labels), `LegalInfo`, `HomeSeo`, `Flat`/`Commercial`/`Lands`/`ResidentialComplex`/`Houses` (title/description/image-alt only, per above), `Agents`/`Testimonials` (name stays as-is, bio/quote localized).

**Migration:** generated via `payload migrate:create` (never hand-written for this — the field-level `localized` diff is exactly what the generator is for), then verified against the drift-check procedure already documented in `CLAUDE.md` before it's trusted.

**Frontend data fetching:** every `payload.find`/`payload.findByID` call in `src/app/[locale]/(frontend)/**` passes `locale` (from the route's `[locale]` param) through to Payload so it returns the right language's field values.

**Seed scripts:** `seed-pages`, `seed-posts`, `seed-globals`, `seed-home-seo` (the ones writing localized fields) change from writing a bare string to writing `{ ru: '...', kz: '...' }` for each localized field, so the demo/seed flow described in the earlier "Day 1 demo" conversation produces a bilingual demo out of the box.

### 5.4 `/admin` interface — best-effort Kazakh

`@payloadcms/translations` gets installed and wired via `i18n.supportedLanguages` in `payload.config.ts`. **Open risk, not yet confirmed:** whether the package ships a Kazakh (`kk`) translation out of the box. First implementation step under this section is checking that — if it's missing, a custom translation resource covering Payload's own admin vocabulary (~200-400 strings: "Save", "Publish", field-level chrome, confirmation dialogs) needs to be authored, following Payload's documented custom-translation shape. This is a separate, smaller string set from the site's own `messages/kz.json`.

## 6. Testing

- Extend `tests/unit/` with a `pluralize.test.ts` covering both `ru` and `kz` branches (replacing/extending whatever currently covers `pluralizeRu`, if anything does).
- Spot-check via the running dev server: home, catalog, listing detail, a Page-builder page, and `/admin` collection list — each viewed once as `ru` (default) and once as `/kz/...` — confirming no raw Russian leaks through on the `kz` path and no broken layout from longer/shorter Kazakh strings.
- Run the project's standard verification (`pnpm test:unit`, `npx eslint .`, `tsc --noEmit` against the existing documented baseline) before considering the change done, per `CLAUDE.md`.

## 7. Rollout ordering (for the implementation plan)

Roughly in this order, since later steps depend on earlier ones existing:
1. Install `next-intl`, routing/middleware scaffold, move `(frontend)` under `[locale]` — get the app booting on both locales with **unchanged (still-Russian) strings** before touching content, to isolate routing risk from translation risk.
2. Enable Payload `localization`, mark fields, generate + verify migration, update seed scripts, update frontend data-fetching to pass `locale`.
3. Extract UI strings into `messages/ru.json` + author `messages/kz.json` — this is the largest step by file count and is a natural fit for parallel/subagent-driven work once the scaffold from step 1 is stable, since most files are independent of each other.
4. `/admin` Kazakh (§5.4), including resolving the open risk about built-in Kazakh support.
5. Full pass per §6.

## 8. Known gaps / accepted limitations (carried forward from §3, restated for visibility)

- Imported feed listings and AI-generated SEO landings stay Russian-only.
- One slug/address per listing, shared across both locale URLs.
- `/admin` Kazakh coverage depends on an unverified third-party package assumption.
- Machine-translated Kazakh needs native review before real client use.

## 9. Open items to resolve at implementation kickoff

- Confirm `@payloadcms/translations` Kazakh support (§5.4).
- Decide `amenities` free-text → enum conversion (§5.3) — affects both this spec's field-localization plan and the existing admin UX.
