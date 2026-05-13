# Frontend Material Redesign — Design Spec

**Date:** 2026-05-13
**Worktree:** `claude/romantic-kowalevski-09754c`
**Scope:** Visual rewrite of `src/app/(frontend)`, `src/components`, `src/Header`, `src/Footer` in a Google-like minimalistic Material 3 style, plus a small information-architecture cleanup that consolidates the four near-identical realestate listing pages into one shared template.

---

## 1. Context

The current frontend is a Payload CMS 3 + Next.js 15 (App Router) template with a `(frontend)` route group covering a realestate vertical (`(realestate)` sub-group with flats, commercial, lands, residential complexes) plus posts, properties, realtors, and search. Styling is a mix of Tailwind classes, daisyUI synthwave theme, custom HSL CSS variables, and shadcn-style primitives in `src/components/ui/*`. The result is inconsistent: card radii, button styles, type scale, and color usage all vary across pages.

## 2. Goals

- Replace the current mixed styling with a single Material 3 token system.
- Visually unify every page in `src/app/(frontend)` so card surfaces, buttons, inputs, and type are identical across realestate listings, post pages, search, and realtor pages.
- Eliminate the four duplicated listing pages by extracting a shared `<PropertyListingPage>` template and four thin per-type wrappers.
- Keep all behavior, routing, Payload integration, URL params, and copy unchanged. Backend untouched.

## 3. Non-goals

- Payload collections, fields, hooks, blocks, or admin (`(payload)` group).
- Routes, redirects, sitemaps, robots, image-domain config.
- Yandex map tile logic (only the wrapping card surface is restyled).
- i18n infrastructure (copy stays Russian).
- Performance optimization (image formats, ISR, prefetch) and test coverage (no tests currently exist).
- Polished dark mode — only a stub palette is shipped.

## 4. Decisions taken during brainstorm

| Question | Choice |
|---|---|
| Scope of rewrite | **B** — visual rewrite plus IA cleanup (consolidate the 4 listing pages). No route changes. |
| Visual direction | **B** — Material 3 tonal: soft tonal surfaces, white cards with subtle elevation, light blue tonal accents, 16-28 px radii, filled primary button. |
| Light/dark | **C** — light first-class, dark stub (toggle works, palette is unpolished). |
| Identity tokens | **A** — Google Blue M3 primary `#0B57D0`, Inter font via `next/font/google`, Russian copy preserved verbatim. |
| Execution approach | **A** — token-first → primitive-retheme → shared shells → page composition. |

## 5. Design tokens

All tokens live in `src/app/(frontend)/globals.css` on `:root` (light) and `html[data-theme="dark"]` (dark stub). Tailwind utility aliases are added in `tailwind.config.mjs`.

### 5.1 Color — semantic roles (light)

| Role | Hex |
|---|---|
| `primary` | `#0B57D0` |
| `primary-container` | `#D3E3FD` |
| `on-primary-container` | `#001A41` |
| `on-surface` | `#1F1F1F` |
| `on-surface-variant` | `#44474E` |
| `error` | `#BA1A1A` |
| `surface` | `#FDFCFF` |
| `surface-container-low` | `#F4F6FB` |
| `surface-container` | `#EEF0F5` |
| `surface-container-high` | `#E8EAEF` |
| `surface-container-highest` | `#E2E4E9` |
| `outline` | `#C4C6CF` |

Dark stub uses the same role names with M3-tonal inversions; quality is "good enough, not polished."

### 5.2 Typography — Inter, M3 scale subset

| Token | Size / line-height / weight |
|---|---|
| `display` | 36 / 44 / 400 |
| `headline` | 28 / 36 / 400 |
| `title-lg` | 22 / 28 / 500 |
| `title` | 16 / 24 / 500 |
| `body` | 16 / 24 / 400 |
| `body-sm` | 14 / 20 / 400 |
| `label` | 12 / 16 / 500 |

`headline` downsizes to `title-lg` at `<sm` via CSS `clamp()`.

### 5.3 Shape

| Alias | Radius |
|---|---|
| `rounded-sm` | 4 |
| `rounded` | 8 |
| `rounded-md` | 12 *(cards)* |
| `rounded-lg` | 16 |
| `rounded-xl` | 24 *(hero, sheets)* |
| `rounded-full` | 9999 *(pills, chips, FAB)* |

### 5.4 Elevation — 4 tiers

| Tier | Treatment |
|---|---|
| `shadow-e0` | 1 px `outline` border, no shadow |
| `shadow-e1` | `0 1px 2px rgba(0,0,0,.06), 0 1px 3px 1px rgba(0,0,0,.04)` *(cards)* |
| `shadow-e2` | `0 1px 2px rgba(0,0,0,.08), 0 2px 6px 2px rgba(0,0,0,.06)` *(raised cards on hover)* |
| `shadow-e3` | `0 4px 8px 3px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.1)` *(sheets, menus)* |

### 5.5 Spacing — Tailwind 4 px scale (unchanged)

Convention: use only `4 / 8 / 12 / 16 / 24 / 32` consistently across components.

## 6. Component inventory and dispositions

### 6.1 Keep + re-theme via CSS only (no JSX changes)

`src/components/ui/*` (button, card, input, select, tabs, checkbox, label, textarea, pagination, avatar, aspect-ratio). `Media`, `RichText`, `Link` (CMSLink), `LivePreviewListener`, `PayloadRedirects`, `AdminBar`, `YandexTileLayer`, `BeforeDashboard`, `BeforeLogin` (latter two are Payload admin slots, technically outside `(frontend)` but listed for clarity).

### 6.2 Rebuild (visual + small structural)

- `Header` → M3 top app bar (hairline border, no backdrop blur), mobile menu via Radix Dialog drawer at `<md` (768 px).
- `Footer` → minimal Material footer on `surface-container`, two-row layout. ThemeSelector becomes a simple light/dark `<ThemeToggle>`.
- `Logo` → keep SVG mark; restyle wordmark in Inter, `text-primary`.
- `PropertyGallery`, `PropertyDetails`, `ImageGallery`, `CollectionArchive`, post `Card`, `Pagination`, `PageRange`, `RelatedProperties` → Material card surfaces and type.
- `Forms/RealtorReviewForm`, `RichMessageForm` → rebuilt on the new `components/ui/*` primitives.

### 6.3 Consolidate

- `FlatFilters` + `Filters/CommercialFilter` + `Filters/LandFilter` + `Filters/ResidentialComplexFilter` + `Filters/UnifiedFilter` → one `<PropertyFilters type="flats|commercial|lands|residential-complexes" />` with per-type field schemas.
- Four `(realestate)/<type>/page.tsx` → one shared `<PropertyListingPage>` template + four wrappers of ~5 lines each.
- Four `(realestate)/<type>/[slug]/page.tsx` → one shared `<PropertyDetailPage>` template + four wrappers.
- Normalize `src/components/PropertyMap.tsx` (file) vs `src/components/PropertyMap.tsx/index.tsx` (folder) into a single location.

### 6.4 New components

- `<PropertyCard>` — single card shape used by every listing and "recent" surface.
- `<SearchBar>` — rounded M3 search field with optional submit button.
- `<FilterChips>` — chip row with one filled "active" state.
- `<ThemeToggle>` — light/dark switch.
- `<PropertyListingPage>`, `<PropertyDetailPage>`, `<HomeHero>`, `<RecentProperties>` — page templates and homepage sections.

### 6.5 Drop

- `daisyui`, `flowbite`, `flowbite-react` packages.
- The synthwave theme block in `globals.css`.
- The dual color system (daisyUI oklch vars + shadcn HSL vars); replaced by a single M3 token block.
- `useHeaderTheme` provider; consumers in `src/heros/*` flagged by grep in phase 3 and refactored to a local prop.

## 7. Page templates

### 7.1 Route map

| Route | Disposition |
|---|---|
| `(frontend)/layout.tsx` | Rebuild — swap GeistSans/Mono for Inter via `next/font/google`. Drop `data-theme` plumbing from `Providers`. |
| `(realestate)/layout.tsx` | Rebuild — surface background, drop inline nav (moves into Header), thin breadcrumb. |
| `(realestate)/page.tsx` | Rebuild — `<HomeHero>` (search + chips), 4-up stats grid, `<RecentProperties>`. |
| `(realestate)/{flats,commercial,lands,residential-complexes}/page.tsx` | Thin wrapper around `<PropertyListingPage type=… />`. |
| `(realestate)/{type}/[slug]/page.tsx` | Thin wrapper around `<PropertyDetailPage type=… />`. |
| `posts/*`, `properties/*` | Light retheme — tokens only, no structural change. |
| `realtors/[slug]/page.tsx` | Light retheme — restyle realtor card and reviews list. |
| `search/page.tsx` | Light retheme — restyle results using `<PropertyCard>` / post `Card`. |
| `not-found.tsx` | Rebuild — small Material empty state. |

### 7.2 `<PropertyListingPage>` structure

- Sticky chip rail under the header (quick filters: transaction type, room count, etc. per schema).
- Title row: `text-headline` page title, `body-sm` count of results.
- `<PropertyFilters>` card.
- Responsive card grid of `<PropertyCard>`.
- Optional `<PropertyMap>` card (unchanged map logic).
- Pagination.

### 7.3 `<PropertyDetailPage>` structure

- Breadcrumb.
- Title + price card.
- Two-column body: gallery + key-facts grid on the left (2/3 width), realtor card + reviews + contact form on the right (1/3 width); collapses to single column below `lg`.
- Description card.
- Location / map card.
- Related properties card.

### 7.4 Responsive rules (apply globally)

- **Card grids and stats grids** — `grid-cols-1` → `sm:grid-cols-2` → `lg:grid-cols-3` (stats: `grid-cols-2 lg:grid-cols-4`).
- **Filter bar** — `grid-cols-1` → `sm:grid-cols-2` with submit spanning full width → `lg:grid-cols-5 + auto` on one row.
- **Header nav** — flex with wrap; below `md` collapses into a Radix Dialog drawer.
- **Page max-width** — 1200 px; gutters `px-4 sm:px-6 lg:px-8`.
- **Touch targets** — minimum 40 px height on all interactive elements (`min-h-10`).
- **Type scale** — `headline` clamps down to `title-lg` at `<sm`.

## 8. Header & Footer

### 8.1 Header

- Sticky top app bar, height 64 desktop / 56 mobile, `bg-surface`, hairline `outline` bottom border.
- Logo (left), nav items pulled from Payload `header` global (center/right), `<ThemeToggle>` (right).
- Active route gets `text-primary` and a 2 px primary underline.
- Mobile menu: Radix Dialog drawer slides from the right at `<md`.
- The `(realestate)/layout.tsx` inline nav is removed; its links (Квартиры, Коммерческая, Участки, ЖК) need to be added to the global Payload `header` collection. This is a one-time content edit by the user via `/admin`, not a code-side data migration.

### 8.2 Footer

- `bg-surface-container`, two rows.
- Row 1: logo + nav links from Payload `footer` global.
- Row 2: small print + `<ThemeToggle>`.

### 8.3 `useHeaderTheme` removal

- `src/providers/HeaderTheme/index.tsx` deleted.
- `src/Header/Component.client.tsx` no longer reads the hook.
- `src/heros/*` references replaced with a local prop or simply dropped if the inverted-header pattern isn't required by the new design.

## 9. Migration phases

Each phase is one commit, validated by visual smoke against the live Docker dev server.

1. **Tokens & dependencies** — rewrite `globals.css`, update `tailwind.config.mjs`, wire Inter, drop Satoshi import, remove `daisyui`/`flowbite`/`flowbite-react` from `package.json` and pnpm lock. Replace the ~15 remaining daisyUI class references (`input-bordered`, `select-bordered`, etc.) in `src/blocks/house/VisionMission/component.tsx`, `src/components/RichMessageForm/index.tsx`, `src/components/Forms/RealtorReviewForm.tsx`, `src/components/PropertyMap.tsx/index.tsx`, `src/blocks/house/PropertyGallery/component.tsx` with the new `components/ui/*` primitives.
2. **Primitive retheme** — sweep `src/components/ui/*`, verify variants resolve against new variables. Zero JSX changes.
3. **Shared shells** — Header, Footer, Logo, `<ThemeToggle>`, `<SearchBar>`, `<FilterChips>`, `<PropertyCard>`. Drop `useHeaderTheme` and clean hero references.
4. **Realestate consolidation** — `<PropertyListingPage>` + `<PropertyDetailPage>` + `<PropertyFilters>`, eight wrapper routes. Restyle `PropertyGallery`, `PropertyDetails`, `ImageGallery`, `RelatedProperties`, `RealtorReviewForm`. Normalize `PropertyMap` duplicate.
5. **Homepage + remaining pages** — realestate homepage, light retheme of posts/properties/realtors/search, rebuild `not-found.tsx`.

**Final validation** — visit every frontend route, plus `/admin`, plus a Payload draft live preview. Run `pnpm build` inside the container to catch type errors.

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Filter schema divergence — the four existing filters have non-identical fields | Read each existing filter component during phase 4 before designing `<PropertyFilters>` schema shape; no field silently dropped. |
| `useHeaderTheme` consumers in `src/heros/*` | Phase 3 starts with a grep; each consumer is refactored before the provider is deleted. |
| Live preview breakage | `LivePreviewListener` preserved untouched; manual smoke from admin draft after phase 3. |
| Payload admin regression | `(payload)` route group out of scope; smoke-test `/admin` loads in final validation. |
| Image-domain config in `next.config.js` | Unchanged. |
| `payload-types.ts` regeneration | Not needed — no collection changes. |
| Rollback granularity | One commit per phase; revert the breaking phase, site falls back to the previous phase's working state. |

## 11. Out of scope

- Payload collections, fields, hooks, blocks (`src/blocks/*`).
- Routes, redirects, sitemaps, robots.
- Yandex map tile logic.
- i18n infrastructure.
- Performance optimization.
- Test coverage.
- Polished dark mode (stub only).
