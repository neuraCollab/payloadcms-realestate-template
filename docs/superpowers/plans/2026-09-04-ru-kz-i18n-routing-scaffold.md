# RU/KZ i18n — Phase 1: Routing Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Get the app booting and fully navigable on both `/` (Russian, default) and `/kz/...` (Kazakh) URLs via next-intl, with content still 100% Russian on both — this plan proves the routing/navigation plumbing works in isolation, before any string translation happens.

**Architecture:** next-intl with `localePrefix: 'as-needed'` (default locale `ru` unprefixed, `kz` prefixed). Visitor-facing routes move under a new `src/app/(frontend)/[locale]/` segment; operational routes (`next/*` seed/preview endpoints, `(sitemaps)/*`, `robots.txt`) stay where they are, outside the locale segment, untouched. Every `next/link`/`next/navigation` import across the frontend switches to next-intl's locale-aware equivalents so in-app navigation preserves the active locale.

**Tech Stack:** Next.js 16 App Router, next-intl 4.x, TypeScript.

**Spec:** [docs/superpowers/specs/2026-09-04-ru-kz-i18n-design.md](../specs/2026-09-04-ru-kz-i18n-design.md) — this plan implements spec §5.1 (UI strings architecture, routing half only — message-catalog population is a later plan) and the routing prerequisite that §5.3 (Payload Localization) and the future string-extraction plan both depend on.

## Global Constraints

- Locale codes: `ru` (default, no URL prefix) and `kz` (prefixed `/kz/...`) — exact strings, not `kk`. (Spec §4.)
- `(payload)` route group (`/admin`, `/api/*`) is never locale-prefixed. (Spec §5.1.)
- Existing Russian-language URLs must keep working unprefixed after this change (`localePrefix: 'as-needed'` on `ru` as default locale guarantees this).
- No string translation happens in this plan — every page must render byte-for-byte the same Russian text it does today, on both `/` and `/kz/...`. Translation is a separate, later plan.

---

## File Structure

**Create:**
- `src/i18n/routing.ts` — next-intl locale/prefix config
- `src/i18n/request.ts` — per-request message loading
- `src/i18n/navigation.ts` — locale-aware `Link`/`redirect`/`usePathname`/`useRouter` (re-exported from `createNavigation`)
- `src/middleware.ts` — next-intl middleware, scoped to skip `/admin`, `/api`, `/next`, sitemap routes, `robots.txt`, static files
- `messages/ru.json`, `messages/kz.json` — message catalogs, one placeholder key each (`"_scaffold": "ok"`) to prove the pipeline end-to-end; real keys are populated by the later string-extraction plan

**Modify:**
- `next.config.js` — wrap with `next-intl/plugin`
- `src/app/(frontend)/layout.tsx` — moves to `src/app/(frontend)/[locale]/layout.tsx`, becomes locale-aware (`<html lang={locale}>`, `NextIntlClientProvider`, `setRequestLocale`, `generateStaticParams`)
- 70 files under `src/app`, `src/components`, `src/blocks`, `src/Header`, `src/Footer` — `next/link`/`next/navigation` imports become `@/i18n/navigation` imports (full file list in Task 6)

**Move (git mv, content unchanged) into `src/app/(frontend)/[locale]/`:**
`page.tsx`, `error.tsx`, `not-found.tsx`, `(realestate)/`, `[slug]/`, `agents/`, `cabinet/`, `compare/`, `posts/`, `privacy/`, `realtors/`, `search/`, `terms/`

**Stay put (outside `[locale]`, unaffected):**
`(sitemaps)/`, `next/`, `robots.txt/`

---

### Task 1: Install next-intl and create the i18n config scaffold

**Files:**
- Modify: `package.json` (adds `next-intl` dependency)
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/request.ts`
- Create: `src/i18n/navigation.ts`
- Create: `messages/ru.json`
- Create: `messages/kz.json`
- Test: `tests/unit/i18n-routing.test.ts`

**Interfaces:**
- Produces: `routing` (exported from `src/i18n/routing.ts`) — consumed by `src/middleware.ts` (Task 3) and `src/i18n/navigation.ts`.
- Produces: `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` (exported from `src/i18n/navigation.ts`) — consumed by every file in Task 6.

- [ ] **Step 1: Install next-intl**

```bash
pnpm add next-intl
```

- [ ] **Step 2: Create the routing config**

`src/i18n/routing.ts`:

```typescript
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['ru', 'kz'],
  defaultLocale: 'ru',
  localePrefix: 'as-needed',
})
```

- [ ] **Step 3: Create the navigation helpers**

`src/i18n/navigation.ts`:

```typescript
import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
```

- [ ] **Step 4: Create the request-scoped message loader**

`src/i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { routing } from './routing'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
```

- [ ] **Step 5: Create placeholder message catalogs**

`messages/ru.json`:

```json
{
  "_scaffold": "ok"
}
```

`messages/kz.json`:

```json
{
  "_scaffold": "ok"
}
```

- [ ] **Step 6: Write a test proving the routing config is well-formed**

`tests/unit/i18n-routing.test.ts`:

```typescript
import { test, describe } from 'node:test'
import * as assert from 'node:assert/strict'

import { routing } from '../../src/i18n/routing.js'

describe('i18n routing config', () => {
  test('declares ru as default and kz as the only other locale', () => {
    assert.deepEqual(routing.locales, ['ru', 'kz'])
    assert.equal(routing.defaultLocale, 'ru')
  })

  test('uses as-needed prefix so ru URLs stay unprefixed', () => {
    assert.equal(routing.localePrefix, 'as-needed')
  })
})
```

- [ ] **Step 7: Run the test to verify it passes**

Run: `NODE_OPTIONS=--no-deprecation node --import tsx --test tests/unit/i18n-routing.test.ts`
Expected: PASS, 2 tests.

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml src/i18n messages tests/unit/i18n-routing.test.ts
git commit -m "feat: add next-intl routing config scaffold (ru default, kz prefixed)"
```

---

### Task 2: Wire next.config.js with the next-intl plugin

**Files:**
- Modify: `next.config.js`

**Interfaces:**
- Consumes: nothing new (wraps the existing `nextConfig`/`withPayload` composition).
- Produces: nothing consumed by other tasks — this only affects the build pipeline picking up `src/i18n/request.ts`.

- [ ] **Step 1: Add the plugin import and wrap the exported config**

In `next.config.js`, add near the top (after the existing imports):

```javascript
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')
```

Change the final export line from:

```javascript
export default withPayload(nextConfig, { devBundleServerPackages: false })
```

to:

```javascript
export default withNextIntl(withPayload(nextConfig, { devBundleServerPackages: false }))
```

- [ ] **Step 2: Verify the dev server still boots**

Run: `pnpm dev` (background), then `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000`
Expected: `200` (homepage still renders — locale routing isn't active yet since nothing consumes it until Task 3-4, this step only confirms the config wrapping itself doesn't crash the build).

Stop the dev server after checking.

- [ ] **Step 3: Commit**

```bash
git add next.config.js
git commit -m "feat: wire next-intl plugin into next.config.js"
```

---

### Task 3: Create the locale-detection middleware

**Files:**
- Create: `src/middleware.ts`

**Interfaces:**
- Consumes: `routing` from `src/i18n/routing.ts` (Task 1).
- Produces: nothing consumed by other tasks — middleware runs at the edge, independent of app code.

- [ ] **Step 1: Write the middleware**

`src/middleware.ts`:

```typescript
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // Skip: /admin, /api/*, /next/* (seed/preview/operational routes),
  // Next.js internals, any file with an extension (static assets,
  // robots.txt), and the three *-sitemap.xml routes.
  matcher: ['/((?!admin|api|next|_next|.*\\..*|.*-sitemap\\.xml).*)'],
}
```

- [ ] **Step 2: Write a test proving the matcher excludes operational paths**

`tests/unit/i18n-middleware-matcher.test.ts`:

```typescript
import { test, describe } from 'node:test'
import * as assert from 'node:assert/strict'

import { config } from '../../src/middleware.js'

const pattern = new RegExp(`^${config.matcher[0]}$`)

describe('i18n middleware matcher', () => {
  test('excludes /admin, /api, /next, sitemaps, and static files', () => {
    assert.equal(pattern.test('/admin'), false)
    assert.equal(pattern.test('/admin/collections/flats'), false)
    assert.equal(pattern.test('/api/leads'), false)
    assert.equal(pattern.test('/next/seed-globals'), false)
    assert.equal(pattern.test('/listings-sitemap.xml'), false)
    assert.equal(pattern.test('/robots.txt'), false)
    assert.equal(pattern.test('/favicon.ico'), false)
  })

  test('matches real visitor-facing routes', () => {
    assert.equal(pattern.test('/'), true)
    assert.equal(pattern.test('/flats'), true)
    assert.equal(pattern.test('/kz/flats'), true)
    assert.equal(pattern.test('/kz/flats/some-slug'), true)
  })
})
```

- [ ] **Step 3: Run the test to verify it passes**

Run: `NODE_OPTIONS=--no-deprecation node --import tsx --test tests/unit/i18n-middleware-matcher.test.ts`
Expected: PASS, 2 tests. If the exclusion test fails, fix the regex (common mistake: forgetting to escape `.` before `.*` in the file-extension clause) before moving on — this matcher is what stops the Payload admin panel and API from ever being locale-prefixed.

- [ ] **Step 4: Commit**

```bash
git add src/middleware.ts tests/unit/i18n-middleware-matcher.test.ts
git commit -m "feat: add next-intl middleware, scoped away from admin/api/operational routes"
```

---

### Task 4: Move the frontend root files under `[locale]` and make the layout locale-aware

**Files:**
- Move: `src/app/(frontend)/layout.tsx` → `src/app/(frontend)/[locale]/layout.tsx`
- Move: `src/app/(frontend)/page.tsx` → `src/app/(frontend)/[locale]/page.tsx`
- Move: `src/app/(frontend)/error.tsx` → `src/app/(frontend)/[locale]/error.tsx`
- Move: `src/app/(frontend)/not-found.tsx` → `src/app/(frontend)/[locale]/not-found.tsx`
- Modify: `src/app/(frontend)/[locale]/layout.tsx` (after the move)

**Interfaces:**
- Consumes: `routing` (Task 1).
- Produces: nothing new consumed elsewhere — `page.tsx`/`error.tsx`/`not-found.tsx` content is untouched by this task (only their path changes; Task 6 touches their imports if they use `next/link`).

- [ ] **Step 1: Move the four files**

```bash
mkdir -p "src/app/(frontend)/[locale]"
git mv "src/app/(frontend)/layout.tsx" "src/app/(frontend)/[locale]/layout.tsx"
git mv "src/app/(frontend)/page.tsx" "src/app/(frontend)/[locale]/page.tsx"
git mv "src/app/(frontend)/error.tsx" "src/app/(frontend)/[locale]/error.tsx"
git mv "src/app/(frontend)/not-found.tsx" "src/app/(frontend)/[locale]/not-found.tsx"
```

- [ ] **Step 2: Make the layout locale-aware**

In `src/app/(frontend)/[locale]/layout.tsx`, add these imports near the top (alongside the existing ones):

```typescript
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
```

Change the function signature from:

```typescript
export default async function RootLayout({ children }: { children: React.ReactNode }) {
```

to:

```typescript
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)
```

Change `<html className={cn(inter.variable)} lang="ru" suppressHydrationWarning>` to:

```tsx
<html className={cn(inter.variable)} lang={locale} suppressHydrationWarning>
```

Wrap the existing `<Providers>...</Providers>` block (inside `<body>`) with `NextIntlClientProvider`:

```tsx
<body>
  <NextIntlClientProvider>
    <Providers>
      <Header />
      {children}
      <Footer />
      <CookieConsent />
      <CompareTray />
    </Providers>
    <Analytics />
  </NextIntlClientProvider>
</body>
```

(`Analytics` moves inside the provider too — simplest single wrap point, and it renders no translated copy either way.)

Add, after the `RootLayout` function (before `export const metadata`):

```typescript
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
```

- [ ] **Step 3: Verify the file still type-checks in isolation**

Run: `NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json 2>&1 | grep "app/(frontend)/\[locale\]/layout.tsx"`
Expected: no output (no new errors attributed to this file). The command will still exit non-zero because of this repo's pre-existing ~130-error baseline (see `CLAUDE.md`) — that's expected; only check that this specific file isn't a new offender.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(frontend)/[locale]"
git commit -m "feat: move frontend root layout under [locale], wire NextIntlClientProvider"
```

---

### Task 5: Move the remaining route directories under `[locale]`

**Files:**
- Move (git mv, whole directories, content unchanged): `(realestate)/`, `[slug]/`, `agents/`, `cabinet/`, `compare/`, `posts/`, `privacy/`, `realtors/`, `search/`, `terms/`

**Interfaces:**
- Consumes: nothing.
- Produces: nothing new — pure path relocation, no content changes.

- [ ] **Step 1: Move every route directory**

```bash
git mv "src/app/(frontend)/(realestate)" "src/app/(frontend)/[locale]/(realestate)"
git mv "src/app/(frontend)/[slug]" "src/app/(frontend)/[locale]/[slug]"
git mv "src/app/(frontend)/agents" "src/app/(frontend)/[locale]/agents"
git mv "src/app/(frontend)/cabinet" "src/app/(frontend)/[locale]/cabinet"
git mv "src/app/(frontend)/compare" "src/app/(frontend)/[locale]/compare"
git mv "src/app/(frontend)/posts" "src/app/(frontend)/[locale]/posts"
git mv "src/app/(frontend)/privacy" "src/app/(frontend)/[locale]/privacy"
git mv "src/app/(frontend)/realtors" "src/app/(frontend)/[locale]/realtors"
git mv "src/app/(frontend)/search" "src/app/(frontend)/[locale]/search"
git mv "src/app/(frontend)/terms" "src/app/(frontend)/[locale]/terms"
```

- [ ] **Step 2: Confirm nothing was left behind**

Run: `find "src/app/(frontend)" -maxdepth 1 -type d`
Expected: only `[locale]`, `(sitemaps)`, `next` remain as directories directly under `(frontend)`.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(frontend)"
git commit -m "feat: move remaining frontend routes under [locale]"
```

---

### Task 6: Migrate navigation imports to next-intl equivalents

**Files:**
- Modify: all 70 files listed below — swap `next/link`'s default `Link` import and `next/navigation`'s `usePathname`/`useRouter`/`redirect` imports for the equivalents from `@/i18n/navigation` (Task 1). `useSearchParams` and `useParams` are **not** re-exported by next-intl and stay imported from `next/navigation` unchanged — this task never touches those two.

**Interfaces:**
- Consumes: `Link`, `usePathname`, `useRouter`, `redirect` from `@/i18n/navigation` (Task 1).
- Produces: nothing new consumed elsewhere.

**The rule** (apply identically to every file in the list):
1. If the file imports `Link` from `'next/link'` → change to `import { Link } from '@/i18n/navigation'`.
2. If the file imports `usePathname`, `useRouter`, and/or `redirect` from `'next/navigation'` → move only those named imports to `@/i18n/navigation`; leave any `useSearchParams`/`useParams` from the same file's `'next/navigation'` import where it is (split into two import lines if the file uses both a migrated and a non-migrated hook from `next/navigation`).
3. No other line in any of these files changes in this task.

**Worked example A — default `Link` import only** (`src/components/PropertyCard/index.tsx:2`):

Before:
```typescript
import Link from 'next/link'
```
After:
```typescript
import { Link } from '@/i18n/navigation'
```

**Worked example B — mixed `Link` + `usePathname`, with a non-migrated hook alongside** (`src/Header/Nav/index.tsx:4-5`):

Before:
```typescript
import Link from 'next/link'
import { usePathname } from 'next/navigation'
```
After:
```typescript
import { Link, usePathname } from '@/i18n/navigation'
```

(If a file also used `useSearchParams` on that same original line, e.g. `import { usePathname, useSearchParams } from 'next/navigation'`, the after-state is two lines: `import { usePathname } from '@/i18n/navigation'` and `import { useSearchParams } from 'next/navigation'`.)

- [ ] **Step 1: Apply the rule to every file in this list**

```
src/components/PropertyListingPage/CatalogClient.tsx
src/blocks/house/QuickNav/component.tsx
src/app/(frontend)/[locale]/not-found.tsx
src/utilities/useClickableCard.ts
src/utilities/getMeUser.ts
src/search/Component.tsx
src/lib/useUpdateFilter.ts
src/components/SortSelect/index.tsx
src/components/SavedSearch/SaveSearchButton.tsx
src/components/SearchFilters/index.tsx
src/components/RecommendModal/index.tsx
src/components/PropertyFilters/index.tsx
src/components/PropertyFilters/PropertyFiltersSheet.tsx
src/components/PropertyDetailPage/index.tsx
src/components/PropertyDetailPage/RealtorCard.tsx
src/components/PropertyDetailPage/MessagePopup.tsx
src/components/PropertyCard/index.tsx
src/components/Pagination/index.tsx
src/components/PayloadRedirects/index.tsx
src/components/LoginNudge/index.tsx
src/components/LivePreviewListener/index.tsx
src/components/Link/index.tsx
src/components/ListingsPagination/index.tsx
src/components/LeadForm/ContactDialog.tsx
src/components/Home/SeoSections.tsx
src/components/Home/WhyUs.tsx
src/components/Home/Hero.tsx
src/components/Home/FeaturedListings.tsx
src/components/Home/CategoryTileClient.tsx
src/components/ConsentCheckbox/index.tsx
src/components/CookieConsent/index.tsx
src/components/CompareTray/index.tsx
src/components/CityLandingPage/index.tsx
src/components/Card/index.tsx
src/blocks/house/HeroSearch/component.tsx
src/blocks/base/Navbar/Component.tsx
src/blocks/Form/Component.tsx
src/app/(frontend)/[locale]/search/page.tsx
src/app/(frontend)/[locale]/realtors/[slug]/page.tsx
src/app/(frontend)/[locale]/posts/page/[pageNumber]/page.tsx
src/app/(frontend)/next/preview/route.ts
src/app/(frontend)/[locale]/error.tsx
src/app/(frontend)/[locale]/cabinet/saved-searches/SavedSearchesList.tsx
src/app/(frontend)/[locale]/compare/CompareClient.tsx
src/app/(frontend)/[locale]/cabinet/recent/RecentClient.tsx
src/app/(frontend)/[locale]/cabinet/login/LoginForm.tsx
src/app/(frontend)/[locale]/cabinet/profile/page.tsx
src/app/(frontend)/[locale]/cabinet/listings/new/[collection]/page.tsx
src/app/(frontend)/[locale]/cabinet/listings/new/page.tsx
src/app/(frontend)/[locale]/cabinet/listings/page.tsx
src/app/(frontend)/[locale]/cabinet/listings/[id]/preview/page.tsx
src/app/(frontend)/[locale]/cabinet/listings/[id]/edit/page.tsx
src/app/(frontend)/[locale]/cabinet/listings/[id]/preview/SubmitButton.tsx
src/app/(frontend)/[locale]/cabinet/listings/ListingsList.tsx
src/app/(frontend)/[locale]/cabinet/listings/ListingForm.tsx
src/app/(frontend)/[locale]/cabinet/chats/[threadId]/page.tsx
src/app/(frontend)/[locale]/cabinet/chats/page.tsx
src/app/(frontend)/[locale]/cabinet/favorites/FavoritesClient.tsx
src/app/(frontend)/[locale]/cabinet/chats/[threadId]/ReplyForm.tsx
src/app/(frontend)/[locale]/cabinet/CabinetShell.tsx
src/app/(frontend)/[locale]/cabinet/chats/LogoutLink.tsx
src/app/(frontend)/[locale]/agents/AgentsSearch.tsx
src/app/(frontend)/[locale]/agents/page.tsx
src/app/(frontend)/[locale]/[slug]/page.tsx
src/app/(frontend)/[locale]/[slug]/[filterSlug]/page.tsx
src/Header/MobileNav.tsx
src/Header/Nav/index.tsx
src/Header/Component.client.tsx
src/Header/CabinetLink.tsx
src/Footer/Component.tsx
```

Note: `src/app/(frontend)/next/preview/route.ts` lives **outside** `[locale]` (it's an operational route, per the File Structure section) — it still needs the same import-source swap if it uses `Link`/`usePathname`/`useRouter`/`redirect` from the migrated set, because those helpers work regardless of which route calls them; only its own URL path stays unprefixed.

- [ ] **Step 2: Verify no migrated imports remain**

Run:
```bash
grep -rln "from 'next/link'" src/app src/components src/blocks src/Header src/Footer
grep -rlE "from 'next/navigation'" src/app src/components src/blocks src/Header src/Footer | xargs grep -lE "\b(usePathname|useRouter|redirect)\b.*from 'next/navigation'|from 'next/navigation'.*\b(usePathname|useRouter|redirect)\b"
```
Expected: both commands produce empty output. Any remaining match means Step 1 missed a file or a mixed-import case wasn't split correctly (Worked example B).

- [ ] **Step 3: Run the full unit test suite**

Run: `pnpm test:unit`
Expected: all tests pass (same pass count as before this plan, plus the 4 new tests from Tasks 1 and 3) — this task doesn't change runtime logic, so a failure here means an import swap broke something (e.g. a file that used the default-exported `Link` under a different local name).

- [ ] **Step 4: Commit**

```bash
git add src/app src/components src/blocks src/Header src/Footer
git commit -m "feat: migrate next/link and next/navigation imports to locale-aware next-intl equivalents"
```

---

### Task 7: End-to-end verification on both locales

**Files:** none (verification only).

- [ ] **Step 1: Start the dev server**

Run: `pnpm dev` in the background, wait for "Ready".

- [ ] **Step 2: Confirm the Russian (default, unprefixed) site is unchanged**

Load `http://localhost:3000/`, `http://localhost:3000/flats`, and `http://localhost:3000/cabinet/login` in the browser. Confirm each renders exactly as it did before this plan — same Russian copy, no console errors, `<html lang="ru">`.

- [ ] **Step 3: Confirm the Kazakh-prefixed site boots with the same (still-Russian) content**

Load `http://localhost:3000/kz`, `http://localhost:3000/kz/flats`, and `http://localhost:3000/kz/cabinet/login`. Confirm each renders — same Russian copy (translation is a later plan), no console errors, `<html lang="kz">`.

- [ ] **Step 4: Confirm operational routes are untouched by the locale prefix**

Run:
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/robots.txt
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/listings-sitemap.xml
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/admin/login
```
Expected: all three return `200`, and none of them redirected through the locale middleware (check there's no `Location` header pointing at `/ru/...` or similar in the response — `curl -sI` if you need to confirm no redirect happened).

- [ ] **Step 5: Click through in-app navigation on a `/kz/` page**

From `http://localhost:3000/kz/flats`, click into a listing card, then click the header logo/nav back to home, then open the mobile nav (resize to mobile width first) and click a link. Confirm the `/kz` prefix is preserved across every one of those navigations (this is what Task 6 exists to guarantee) — if any click drops back to an unprefixed URL, find which link component still imports from plain `next/link`/`next/navigation` and fix it.

- [ ] **Step 6: Run full verification per CLAUDE.md**

```bash
pnpm test:unit
npx eslint .
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
```
Expected: `test:unit` 100% green; `eslint` no new errors (pre-existing warnings unrelated to files this plan touched are fine); `tsc` error count at or below the documented ~130 baseline (this plan should not add new type errors — if it does, find and fix them before moving on, don't just note the count went up).

- [ ] **Step 7: Stop the dev server, final commit if any fixes were made in this task**

```bash
git add -A
git commit -m "fix: address issues found in end-to-end RU/KZ routing verification"
```

(Skip this commit if Steps 2-6 found nothing to fix.)
