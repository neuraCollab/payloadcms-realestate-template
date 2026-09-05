# RU/KZ i18n — Payload Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Enable Payload CMS's `localization` feature (locales `ru` default / `kz`), mark every visitor-facing copy field across collections, globals, and page-builder blocks as `localized: true`, generate and verify the resulting migration, and thread a `locale` parameter through every server-side data-fetching call site so `/kz/...` pages actually read the `kz` value instead of always silently returning `ru`.

**Architecture:** Payload's Local API (`payload.find`/`findByID`/`findGlobal`/`updateGlobal`) resolves locale per-call from an explicit `locale` argument — there is no per-request auto-resolution the way there is with Payload's REST/GraphQL API. This plan (1) flips on `localization` in `payload.config.ts`, (2) hand-edits every field that carries translatable prose to add `localized: true` (a config-level flag Payload's Postgres adapter turns into an added `_locales` child table per touched parent table), (3) captures that schema delta in one hand-written migration per CLAUDE.md's migration discipline, and (4) threads the current request's locale (from `next-intl`'s `getLocale()` / the route's own `params.locale`) into every one of those Local API calls so each locale actually renders its own content, falling back to `ru` (via `fallback: true`) wherever a `kz` value hasn't been entered yet.

**Tech Stack:** Payload CMS 3 (`@payloadcms/db-postgres`), Next.js 16 App Router Server Components, `next-intl` (already wired — see the routing-scaffold plan), Drizzle-generated SQL migrations, Node's built-in test runner (`node --test`).

**Spec:** [docs/superpowers/specs/2026-09-04-ru-kz-i18n-design.md](../specs/2026-09-04-ru-kz-i18n-design.md) — see especially §3 (non-goals), §4 (decisions table), §5.3 (Payload Localization rule), §7 (rollout ordering — this plan is step 2, "Payload Localization").

## Global Constraints

- Locale codes throughout Payload config, `next-intl` routing, and this plan are the bare strings `'ru'` and `'kz'` — `'kz'` is the deliberate routing/URL identifier from the spec (§4), not a BCP-47 language code; don't "fix" it to `'kk'` anywhere in Payload config (the `LOCALE_TO_BCP47` map for the HTML `lang` attribute is a separate, already-shipped concern — untouched by this plan).
- `defaultLocale: 'ru'`, `fallback: true` — a locale with no `kz` value ever entered must silently show the `ru` value, never blank/`null`. Every task in this plan relies on that fallback; do not disable it.
- Never mark a `select`/`radio` field's options `localized: true`. A `select` field stores the option's `value` code (e.g. `'apartment'`), not its `label` — the label's translation is a UI-message-catalog concern (later phase, next-intl `messages/*.json`), not a Payload-localization concern. Marking a select field localized only makes Payload store the same `value` twice per locale, which is pointless and produces confusing admin UI.
- Never mark a URL/href/slug/relationship/upload/proper-noun (city, district, address, person name, company name) field `localized: true` — see the "Localization Decisions" table below for the exact per-field rule this plan follows.
- Per CLAUDE.md: "Migrations are hand-written, not auto-diffed against config — verify they match." After Task 8's `payload migrate:create`, sanity-check the generated SQL against `payload.db.tables` before trusting it (see Task 8, Step 2).
- Per CLAUDE.md: never hand-edit an already-merged migration file — Task 8 produces exactly one new migration file for this entire phase's schema delta; don't create a second one later for a field you forgot — amend Task 8's file if it hasn't merged yet, or write a fresh migration if it has.

## Localization Decisions (this plan's ruling — not separately re-litigated per field)

The spec left "which fields get `localized: true`" for implementation-time judgment (§5.3 gives the *rule*, not an exhaustive list). This plan applies one consistent rule everywhere: **mark a field localized if and only if it holds prose a human wrote for a visitor to read, and its meaning would need to be re-worded (not just re-encoded) in Kazakh.** Concretely:

| Kind of field | Localized? | Why |
|---|---|---|
| Titles, headings, subheadings, descriptions, body/rich text, testimonial quotes, FAQ Q&A, CTA button text, small "eyebrow" labels above a heading (Payload field name `label` on the house/base blocks — confirmed visible copy, not an internal key, via `HeroSearchBlock`'s and `QuickNavBlock`'s own admin descriptions: "Маленький лейбл сверху") | Yes | Genuine translatable prose |
| Free-text array items a visitor reads (`amenities[].amenity`, `utilities[].utility`, `communications[].communication`, `infrastructure[].item`, block stat/feature/step titles+descriptions) | Yes | Same as above; the amenities/utilities/communications/infrastructure free-text-vs-enum inconsistency across Flats/Commercial/Lands/ResidentialComplex is a real, separate cleanup (Houses already solved it with a fixed `select` enum) — out of scope here, flagged as a follow-up at the end of this plan. For this plan, the free text just becomes localizable text, same as any other prose field. |
| `select`/`radio` field option labels (`propertyCategory`, `status`, `rooms`, `commercialType`, `houseType`, `amenity` on Houses, icon pickers, etc.) | No | Value-coded, not per-document text — see Global Constraints |
| URLs / hrefs / internal link targets (`ctaHref`, `showAllLink`, `buttonLink`, block `href`/`url` fields, `link.url`) | No | Routing paths aren't locale-varying (spec non-goal: shared slug) |
| City, district, street address, metro station, developer/company name, person name (`location.city/district/address/metro`, `coordinates.formattedAddress`, `ResidentialComplex.developer`, `Agents.name`, `Testimonials.name`, `Testimonials.location`, `ContactHero.location`, `MapBlock.officeMarker.address`) | No | Proper nouns / facts, not authored copy |
| Numeric-display stats (`VisionMissionBlock.stats[].value`, e.g. `'98%'`) | No | Digits read the same in both locales |
| Structural identifiers (`blockType`, `HouseFilter` field `name`/`collection`, `HouseFilter` option `value`, icon-name strings like `VisionBlock.items[].icon`) | No | Programmatic keys, never rendered as prose |
| Contact facts (email, phone, working hours, moderation notes, UGC admin-only fields) | No | Not translated content |
| `Users` collection (realtor bios) | No | Out of this plan's scope — CLAUDE.md explicitly separates "Agents collection" (page-builder only, in scope) from "Users role=realtor" (drives `/agents`/`/realtors`, out of scope for content localization) |
| `Cities`, `SeoLandings` collections | No | Out of scope — belong to the separate `src/lib/seo/` bulk-generation subsystem (spec non-goal) |
| `LegalInfo` global | No fields | Legal/factual reference data, not marketing copy — confirmed zero-field ruling, unchanged from the spec |
| `@payloadcms/plugin-seo`'s `meta.title`/`meta.description`/`meta.image` on `Pages` | Already `localized: true` | Built into the plugin's field factories (verified in `node_modules/@payloadcms/plugin-seo`) — no edit needed, Task 1 activates it for free |

## File Structure

This plan touches, but does not create, most files (it's config/field edits to existing collections/blocks/globals, plus threading a `locale` parameter through existing data-fetching code). New files: one migration (generated by Task 8, path decided by the CLI), none else.

- `src/payload.config.ts` — Task 1, add `localization` block.
- `src/fields/link.ts`, `src/heros/config.ts` — Task 2 (shared `label`/`richText` fields reused by many blocks).
- `src/Header/config.ts`, `src/Footer/config.ts`, `src/globals/HomeSeo/config.ts` — Task 3.
- `src/collections/{Pages,Posts}/index.ts` — Task 4.
- `src/collections/{Flat,Commercial,Lands,ResidentialComplex,Houses}/index.ts` — Task 5.
- `src/collections/{Agents,Testimonials}/index.ts` — Task 6.
- `src/blocks/{Form,base/*}/config.ts` (10 files) — Task 7.
- `src/blocks/house/*/config.ts` (18 files) — Task 8.
- One generated migration file under `src/migrations/` + `src/migrations/index.ts` registration — Task 9.
- `src/endpoints/seed-globals/index.ts`, `tests/unit/seed-globals.test.ts` — Task 10.
- `src/utilities/getGlobals.ts`, `src/Header/Component.tsx`, `src/Footer/Component.tsx`, `src/Header/hooks/revalidateHeader.ts`, `src/Footer/hooks/revalidateFooter.ts`, `src/app/(frontend)/[locale]/layout.tsx`, `src/app/(frontend)/[locale]/terms/page.tsx`, `src/app/(frontend)/[locale]/privacy/page.tsx`, `src/app/(frontend)/[locale]/page.tsx` — Task 11.
- 8 catalog route files under `src/app/(frontend)/[locale]/(realestate)/{flats,commercial,lands,residential-complexes}/{page.tsx,[slug]/page.tsx}`, `src/components/PropertyListingPage/index.tsx`, `src/components/PropertyDetailPage/index.tsx`, `src/lib/propertyMetadata.ts` — Task 12.
- `src/app/(frontend)/[locale]/[slug]/page.tsx`, `src/app/(frontend)/[locale]/[slug]/[filterSlug]/page.tsx`, `src/components/CityLandingPage/index.tsx`, `src/app/(frontend)/[locale]/posts/page.tsx`, `src/app/(frontend)/[locale]/posts/page/[pageNumber]/page.tsx`, `src/app/(frontend)/[locale]/posts/[slug]/page.tsx`, `src/app/(frontend)/[locale]/search/page.tsx`, `src/components/Home/{CategoryTiles,FeaturedListings,MapNearby}.tsx`, `src/app/(frontend)/[locale]/cabinet/listings/[id]/{preview,edit}/page.tsx` — Task 13.

---

## Task 1: Enable Payload localization config

**Files:**
- Modify: `src/payload.config.ts:76-87`

**Interfaces:**
- Produces: a top-level `localization: { locales: ['ru', 'kz'], defaultLocale: 'ru', fallback: true }` option on the exported Payload config, consumed by every later task's `localized: true` field flags (which are inert until this exists) and by every `locale`/`fallbackLocale` argument passed to the Local API in Tasks 11-13.

- [ ] **Step 1: Add the `localization` block**

In `src/payload.config.ts`, between the `editor: defaultLexical,` line and the `db: postgresAdapter({...})` block:

```ts
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  // RU (default, unprefixed URLs) / KZ (prefixed `/kz/...`) — see
  // src/i18n/routing.ts for the matching next-intl locale list. `kz` is a
  // deliberate routing identifier, not the ISO-639 code (`kk`) — see
  // src/i18n/routing.ts's LOCALE_TO_BCP47 map for where the real BCP-47
  // code is used (the <html lang> attribute only).
  localization: {
    locales: ['ru', 'kz'],
    defaultLocale: 'ru',
    fallback: true,
  },
  db: postgresAdapter({
```

- [ ] **Step 2: Regenerate types and verify the config parses**

```bash
pnpm generate:types
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
```
Expected: `generate:types` completes without throwing (confirms Payload accepted the new config shape); `tsc` error count is unchanged from the pre-existing ~130 baseline (CLAUDE.md) — don't let this step add new errors.

- [ ] **Step 3: Commit**

```bash
git add src/payload.config.ts src/payload-types.ts
git commit -m "$(cat <<'EOF'
feat(i18n): enable Payload localization (ru default, kz)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Localize the shared `link` and `hero` fields

These two fields are reused by Header, Footer, and several page-builder blocks (Content, CallToAction via `linkGroup`, the `hero` field via `linkGroup`) — fixing them once here means Tasks 7-8's blocks that consume them need no extra edit for their link labels.

**Files:**
- Modify: `src/fields/link.ts:105-114`
- Modify: `src/heros/config.ts:42-55`

**Interfaces:**
- Consumes: Task 1's `localization` config (inert without it).
- Produces: `link()`'s generated `label` text field now carries `localized: true` — every caller (`Header`, `Footer`, `Content` block, `CallToAction`/`hero` via `linkGroup`) inherits it automatically, no per-caller change needed.

- [ ] **Step 1: Localize `link()`'s `label` field**

In `src/fields/link.ts`, inside the `if (!disableLabel)` branch (the `row` pushed at lines 101-115), the `label` field currently reads:

```ts
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
```

Change to:

```ts
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          localized: true,
          required: true,
        },
```

Do **not** touch `type`, `newTab`, `url`, `reference`, or `appearance` in this file — none of those are translatable prose (see Global Constraints).

- [ ] **Step 2: Localize the `hero` field's `richText`**

In `src/heros/config.ts`, the `richText` field (lines 42-55) currently ends:

```ts
      }),
      label: false,
    },
    linkGroup({
```

Change to:

```ts
      }),
      label: false,
      localized: true,
    },
    linkGroup({
```

`hero.type` (select) and `hero.media` (upload) stay untouched.

- [ ] **Step 3: Verify**

```bash
pnpm generate:types
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
```

- [ ] **Step 4: Commit**

```bash
git add src/fields/link.ts src/heros/config.ts src/payload-types.ts
git commit -m "$(cat <<'EOF'
feat(i18n): localize shared link label and hero richText fields

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Localize Header, Footer, HomeSeo globals

**Files:**
- Modify: `src/globals/HomeSeo/config.ts`
- (Header/Footer need no direct edit beyond Task 2's `link.ts` fix — their only field is `navItems` → `link()`.)

**Interfaces:**
- Consumes: Task 1's config, Task 2's `link()` fix.
- Produces: all of `HomeSeo`'s text/textarea fields carry `localized: true`.

- [ ] **Step 1: Localize `HomeSeo`'s meta-tag tab**

In `src/globals/HomeSeo/config.ts`, the `metaTitle` field (lines 25-35):

```ts
            {
              name: 'metaTitle',
              type: 'text',
              label: 'Title (60-70 символов)',
              required: true,
              localized: true,
              defaultValue:
                'Demo Realty — квартиры, дома и коммерческая недвижимость',
              admin: {
                description:
                  'Текст вкладки браузера и заголовок в выдаче. Включите ключевое слово в начало.',
              },
            },
```

And `metaDescription` (lines 37-47):

```ts
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'Description (150-160 символов)',
              required: true,
              localized: true,
              defaultValue:
                'Поиск квартир, домов и коммерческой недвижимости. Проверенные объявления, прозрачные сделки, прямые контакты с собственниками.',
              admin: {
                description:
                  'Сниппет в выдаче. Должен убеждать кликнуть. Без переспама.',
              },
            },
```

- [ ] **Step 2: Localize the "Заголовки на странице" tab**

`h1` (lines 56-64):

```ts
            {
              name: 'h1',
              type: 'text',
              required: true,
              label: 'H1 (главный заголовок)',
              localized: true,
              defaultValue: 'Недвижимость, которой доверяют',
              admin: {
                description:
                  'Должен быть один на странице. Содержит главное ключевое слово.',
              },
            },
```

`subtitle` (lines 66-72):

```ts
            {
              name: 'subtitle',
              type: 'textarea',
              label: 'Подзаголовок под H1',
              localized: true,
              defaultValue:
                'Прозрачные сделки, проверенные объявления, удобный кабинет.',
            },
```

- [ ] **Step 3: Localize `seoBlocks[]`'s prose fields**

Within the `seoBlocks` array's `fields` (lines 94-133), `heading`:

```ts
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                  label: 'H2 заголовок',
                  localized: true,
                  admin: {
                    description:
                      'Например: «Снять квартиру посуточно в Москве без комиссии»',
                  },
                },
```

`body`:

```ts
                {
                  name: 'body',
                  type: 'textarea',
                  required: true,
                  label: 'Текст блока (2-4 предложения)',
                  localized: true,
                },
```

`ctaLabel`:

```ts
                {
                  name: 'ctaLabel',
                  type: 'text',
                  label: 'Кнопка / ссылка',
                  localized: true,
                  defaultValue: 'Смотреть объекты',
                },
```

`highlightKeywords` (must vary per locale — it's matched against the now-localized `body` text to decide what to bold):

```ts
                {
                  name: 'highlightKeywords',
                  type: 'text',
                  localized: true,
                  label:
                    'Ключевые слова (через запятую, для подсветки в bold)',
                },
```

Leave `ctaHref` untouched (URL — see Global Constraints).

- [ ] **Step 4: Localize the FAQ tab**

`faqIntro` (lines 143-147):

```ts
            {
              name: 'faqIntro',
              type: 'text',
              label: 'Заголовок FAQ',
              localized: true,
              defaultValue: 'Частые вопросы',
            },
```

Within `faq[]`'s fields (lines 160-173), `question`:

```ts
                {
                  name: 'question',
                  type: 'text',
                  required: true,
                  label: 'Вопрос',
                  localized: true,
                },
```

`answer`:

```ts
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  label: 'Ответ (2-5 предложений)',
                  localized: true,
                },
```

- [ ] **Step 5: Verify**

```bash
pnpm generate:types
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
```

- [ ] **Step 6: Commit**

```bash
git add src/globals/HomeSeo/config.ts src/payload-types.ts
git commit -m "$(cat <<'EOF'
feat(i18n): localize HomeSeo global's copy fields

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: Localize Pages and Posts collections

**Files:**
- Modify: `src/collections/Pages/index.ts:83-86`
- Modify: `src/collections/Posts/index.ts` (title, excerpt, content, meta.title, meta.description, meta.image)

**Interfaces:**
- Consumes: Task 1's config.
- Produces: `Pages.title`, `Posts.title/excerpt/content/meta.*` all localized.

- [ ] **Step 1: Localize `Pages.title`**

In `src/collections/Pages/index.ts`, lines 82-86:

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
    },
```

Change to:

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
```

(`Pages.hero` was handled in Task 2 via the shared `hero` field. `Pages.layout`'s blocks are handled in Tasks 7-8. `Pages.meta.*` is already localized by `@payloadcms/plugin-seo` — no edit here.)

- [ ] **Step 2: Localize `Posts.title`, `excerpt`, `content`**

In `src/collections/Posts/index.ts`, `title` (lines 13-16):

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
```

`excerpt` (lines 33-37):

```ts
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      localized: true,
    },
```

`content` (lines 38-42):

```ts
    {
      name: 'content',
      type: 'richText',
      required: true,
      localized: true,
    },
```

Leave `image`, `publishedDate`, `categories`, `author`, `status`, `slug` untouched.

- [ ] **Step 3: Localize `Posts.meta.title` / `meta.description` / `meta.image`**

`Posts.meta` (lines 72-89) is hand-written, unlike `Pages.meta` — it does **not** get `localized: true` for free from a plugin. Change:

```ts
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
```

to:

```ts
    {
      name: 'meta',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          localized: true,
        },
      ],
    },
```

(`image` mirrors `Pages.meta.image`'s plugin-driven default — see the Localization Decisions table — so both collections' near-identical `meta` shape behaves consistently: a locale without its own OG image entered falls back to the `ru` one via `fallback: true`, never blank.)

- [ ] **Step 4: Verify**

```bash
pnpm generate:types
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
```

- [ ] **Step 5: Commit**

```bash
git add src/collections/Pages/index.ts src/collections/Posts/index.ts src/payload-types.ts
git commit -m "$(cat <<'EOF'
feat(i18n): localize Pages and Posts copy fields

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Localize the five listing collections

**Files:**
- Modify: `src/collections/Flat/index.ts`
- Modify: `src/collections/Commercial/index.ts`
- Modify: `src/collections/Lands/index.ts`
- Modify: `src/collections/ResidentialComplex/index.ts`
- Modify: `src/collections/Houses/index.ts`

**Interfaces:**
- Consumes: Task 1's config.
- Produces: `title`/`name`, `description`, and free-text amenity/utility/communication/infrastructure array items localized across all five listing collections.

- [ ] **Step 1: Flats (`src/collections/Flat/index.ts`)**

`title` (lines 59-64):

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название объекта',
      localized: true,
    },
```

`description` (lines 325-329):

```ts
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
      localized: true,
    },
```

`amenities[].amenity` (lines 332-343):

```ts
    {
      name: 'amenities',
      type: 'array',
      label: 'Удобства',
      fields: [
        {
          name: 'amenity',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
```

Leave `slug`, `realtor`, `propertyCategory`, `transactionType`, `location.*`, `coordinates.*`, `rooms`, `area.*`, `floorInfo.*`, `price`, `currency`, `priceHistory[]`, `buildingType`, `yearBuilt`, `ceilingHeight`, `images[]`, `layout`, `video`, `residentialComplex`, `status`, `contactEmail`, `submittedAt`, `moderationNote`, `isFeatured`, `fromOwner`, `noCommission`, `rentalSubtype` untouched.

- [ ] **Step 2: Commercial (`src/collections/Commercial/index.ts`)**

`title` (lines 54-58):

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название объекта',
      localized: true,
    },
```

`utilities[].utility` (lines 238-248):

```ts
    {
      name: 'utilities',
      type: 'array',
      label: 'Коммуникации',
      fields: [
        {
          name: 'utility',
          type: 'text',
          localized: true,
        },
      ],
    },
```

`description` (lines 267-271):

```ts
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
      localized: true,
    },
```

Leave everything else (including `contactInfo.contactPerson` — a person's name) untouched.

- [ ] **Step 3: Lands (`src/collections/Lands/index.ts`)**

`title` (lines 25-30):

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Название участка',
      localized: true,
    },
```

`communications[].communication` (lines 82-92):

```ts
    {
      name: 'communications',
      type: 'array',
      label: 'Коммуникации',
      fields: [
        {
          name: 'communication',
          type: 'text',
          localized: true,
        },
      ],
    },
```

(Lands has no `description` field — nothing else to localize here.)

- [ ] **Step 4: ResidentialComplex (`src/collections/ResidentialComplex/index.ts`)**

`name` (lines 25-30):

```ts
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Название ЖК',
      localized: true,
    },
```

`description` (lines 94-98):

```ts
    {
      name: 'description',
      type: 'richText',
      label: 'Описание',
      localized: true,
    },
```

`infrastructure[].item` (lines 112-122):

```ts
    {
      name: 'infrastructure',
      type: 'array',
      label: 'Инфраструктура',
      fields: [
        {
          name: 'item',
          type: 'text',
          localized: true,
        },
      ],
    },
```

Leave `developer` untouched (company name — proper noun).

- [ ] **Step 5: Houses (`src/collections/Houses/index.ts`)**

`title` (line 64):

```ts
    { name: 'title', type: 'text', required: true, localized: true, label: 'Название' },
```

`description` (line 159):

```ts
    { name: 'description', type: 'richText', localized: true, label: 'Описание' },
```

`amenities` (lines 160-182) stays untouched — it's already a `select` (Houses' pre-existing fixed enum), and per the Localization Decisions table, select option labels are never localized.

- [ ] **Step 6: Verify**

```bash
pnpm generate:types
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
```

- [ ] **Step 7: Commit**

```bash
git add src/collections/Flat/index.ts src/collections/Commercial/index.ts src/collections/Lands/index.ts src/collections/ResidentialComplex/index.ts src/collections/Houses/index.ts src/payload-types.ts
git commit -m "$(cat <<'EOF'
feat(i18n): localize listing collections' copy fields

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Localize Agents and Testimonials collections

**Files:**
- Modify: `src/collections/Agents/index.ts:18-23,44-47`
- Modify: `src/collections/Testimonials/index.ts:31-36`

**Interfaces:**
- Consumes: Task 1's config.

- [ ] **Step 1: Agents — `position` and `description`**

In `src/collections/Agents/index.ts`, `position` (lines 18-23):

```ts
    {
      name: 'position',
      type: 'text',
      required: true,
      label: 'Должность',
      localized: true,
    },
```

`description` (lines 44-47):

```ts
    {
      name: 'description',
      type: 'textarea',
      label: 'Описание',
      localized: true,
    },
```

Leave `name` (person's name), `image`, `email`, `phone`, `socialLinks[]` untouched.

- [ ] **Step 2: Testimonials — `text`**

In `src/collections/Testimonials/index.ts`, `text` (lines 31-36):

```ts
    {
      name: 'text',
      type: 'textarea',
      required: true,
      label: 'Текст отзыва',
      localized: true,
    },
```

Leave `name`, `location` (both proper nouns/facts — see Localization Decisions), `image`, `rating` untouched.

- [ ] **Step 3: Verify**

```bash
pnpm generate:types
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
```

- [ ] **Step 4: Commit**

```bash
git add src/collections/Agents/index.ts src/collections/Testimonials/index.ts src/payload-types.ts
git commit -m "$(cat <<'EOF'
feat(i18n): localize Agents and Testimonials copy fields

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Localize base page-builder blocks

**Files:**
- Modify: `src/blocks/Form/config.ts`
- Modify: `src/blocks/base/ArchiveBlock/config.ts`
- Modify: `src/blocks/base/BlogBlock/config.ts`
- Modify: `src/blocks/base/CallToAction/config.ts` (no field change — `richText` label is `false`, but the field itself needs `localized: true`)
- Modify: `src/blocks/base/Content/config.ts` (no field change beyond what Task 2 already covers via the shared `link()`/richText columns)
- Modify: `src/blocks/base/FAQ/config.ts`
- Modify: `src/blocks/base/HeroBlock/config.ts`
- Modify: `src/blocks/base/Navbar/config.ts`
- (`src/blocks/base/Code/config.ts`, `src/blocks/base/MediaBlock/config.ts` — no changes; verified no prose fields)

**Interfaces:**
- Consumes: Task 1's config, Task 2's `link()` fix (Content/CallToAction's link labels already covered).

- [ ] **Step 1: Form block — `introContent`**

In `src/blocks/Form/config.ts`, `introContent` (lines 26-42):

```ts
    {
      name: 'introContent',
      type: 'richText',
      admin: {
        condition: (_, { enableIntro }) => Boolean(enableIntro),
      },
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
      localized: true,
    },
```

Leave `form` (relationship), `enableIntro` (checkbox) untouched.

- [ ] **Step 2: ArchiveBlock — `introContent`**

In `src/blocks/base/ArchiveBlock/config.ts`, `introContent` (lines 14-28):

```ts
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: 'Intro Content',
      localized: true,
    },
```

Leave `populateBy`, `relationTo`, `categories`, `limit`, `selectedDocs` untouched.

- [ ] **Step 3: BlogBlock — `title`, `subtitle`**

In `src/blocks/base/BlogBlock/config.ts`, `title` (lines 21-26):

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Заголовок блока',
      localized: true,
      defaultValue: 'Expert advice and market updates on real estate',
    },
```

`subtitle` (lines 27-33):

```ts
    {
      name: 'subtitle',
      type: 'text',
      required: false,
      label: 'Подзаголовок блока',
      localized: true,
      defaultValue: 'Blogs',
    },
```

Leave `blockType`, `posts` (relationship), `showAllLink` (URL), `itemsPerPage` untouched.

- [ ] **Step 4: CallToAction — `richText`**

In `src/blocks/base/CallToAction/config.ts`, `richText` (lines 16-30):

```ts
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
      label: false,
      localized: true,
    },
```

(`linkGroup(...)` below it already carries a localized `label` via Task 2 — no change needed there.)

- [ ] **Step 5: Content block — columns' `richText`**

In `src/blocks/base/Content/config.ts`, inside `columnFields` (lines 12-64), the `richText` entry (lines 36-50):

```ts
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    label: false,
    localized: true,
  },
```

Leave `size` (select) and `enableLink` (checkbox) untouched; the `link(...)` entry already inherits Task 2's localized `label`.

- [ ] **Step 6: FAQ block — `label`, `title`, `items[].question/answer`**

In `src/blocks/base/FAQ/config.ts`, `label` (lines 20-25):

```ts
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'faq',
    },
```

`title` (lines 26-31):

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Your questions, Answered',
    },
```

Inside `items[]`'s fields (lines 38-51), `question`:

```ts
        {
          name: 'question',
          type: 'text',
          required: true,
          label: 'Вопрос',
          localized: true,
        },
```

`answer`:

```ts
        {
          name: 'answer',
          type: 'textarea',
          required: true,
          label: 'Ответ',
          localized: true,
        },
```

Leave `blockType` and the `items[]` array's `defaultValue` seed data untouched (it's the field schema, not seed content, that changes here — the demo Q&A pairs stay as-is and will simply be stored under the `ru` locale once an editor saves the block).

- [ ] **Step 7: HeroBlock — `badgeText`, `headline`, `highlight`, `subheadline`**

In `src/blocks/base/HeroBlock/config.ts`, all four text fields (lines 8-31):

```ts
    {
      name: 'badgeText',
      label: 'Текст бейджа',
      type: 'text',
      localized: true,
      admin: {
        description: 'Опциональный текст для бейджа (например, "Real Estate")',
      },
    },
    {
      name: 'headline',
      label: 'Заголовок',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'highlight',
      label: 'Выделенное слово',
      type: 'text',
      localized: true,
    },
    {
      name: 'subheadline',
      label: 'Подзаголовок',
      type: 'textarea',
      localized: true,
    },
```

Leave `image` untouched.

- [ ] **Step 8: Navbar — `logoText`, `links[].text`, `button.text`**

In `src/blocks/base/Navbar/config.ts`, `logoText` (lines 9-12):

```ts
    {
      name: 'logoText',
      type: 'text',
      required: true,
      localized: true,
    },
```

Inside `links[]`'s fields (lines 17-20), `text`:

```ts
        { name: 'text', type: 'text', required: true, localized: true },
```

Leave `url` untouched.

Inside `button` group (lines 23-42), `text`:

```ts
        {
          name: 'text',
          type: 'text',
          label: 'Текст кнопки',
          required: true,
          localized: true,
          defaultValue: 'Связаться',
        },
```

Leave `button.url` and `avatar` untouched.

- [ ] **Step 9: Verify**

```bash
pnpm generate:types
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
```

- [ ] **Step 10: Commit**

```bash
git add src/blocks/Form/config.ts src/blocks/base/ArchiveBlock/config.ts src/blocks/base/BlogBlock/config.ts src/blocks/base/CallToAction/config.ts src/blocks/base/Content/config.ts src/blocks/base/FAQ/config.ts src/blocks/base/HeroBlock/config.ts src/blocks/base/Navbar/config.ts src/payload-types.ts
git commit -m "$(cat <<'EOF'
feat(i18n): localize base page-builder block copy fields

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Localize house page-builder blocks

**Files:** all 18 files under `src/blocks/house/*/config.ts`.

**Interfaces:**
- Consumes: Task 1's config.

- [ ] **Step 1: AboutHero — `label`, `title`**

`src/blocks/house/AboutHero/config.ts`, lines 21-31:

```ts
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'About us',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Connect with our experts and bring your Real Estate ideas to life',
    },
```

Leave `images[]` untouched.

- [ ] **Step 2: Agents block — `label`, `title`**

`src/blocks/house/Agents/config.ts`, lines 24-34:

```ts
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Agents',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Meet our exceptional agents for a seamless experience',
    },
```

Leave `agents` (relationship) untouched.

- [ ] **Step 3: Amenities block — `label`, `title`, `amenities[].title`**

`src/blocks/house/Amenities/config.ts`, lines 21-31:

```ts
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Amenities',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Discover exceptional amenities for a luxurious lifestyle',
    },
```

Inside `amenities[]`'s fields (lines 44-73), `title`:

```ts
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
```

Leave `image` and `amenities[].icon` (select) untouched.

- [ ] **Step 4: Banner — `content`**

`src/blocks/house/Banner/config.ts`, `content` (lines 25-34):

```ts
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
      label: false,
      required: true,
      localized: true,
    },
```

Leave `style` (select) untouched.

- [ ] **Step 5: CallToActionNew — `label`, `title`, `buttonText`**

`src/blocks/house/CallToActionNew/config.ts`, lines 21-37:

```ts
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Want to Book a Call?',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Ready to make your step in real estate? Book Now.',
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'View Properties',
    },
```

Leave `buttonLink` (URL) untouched.

- [ ] **Step 6: ContactHero — `label`, `title`**

`src/blocks/house/ContactHero/config.ts`, lines 21-31:

```ts
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Contact',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Get in touch with us today for expert assistance',
    },
```

Leave `image`, `email`, `phone`, `location` untouched (`location` is a display address here — see Localization Decisions).

- [ ] **Step 7: ContactUsForm — `label`, `title`**

`src/blocks/house/ContactUsForm/config.ts`, lines 21-31:

```ts
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Contact',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: "Fill out this form, Let's get in touch",
    },
```

Leave `form` (relationship) untouched.

- [ ] **Step 8: FeatureBlock — `label`, `title`, `features[].title/description`**

`src/blocks/house/FeatureBlock/config.ts`, lines 26-37:

```ts
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      label: 'Метка блока (Features)',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Заголовок блока',
    },
```

Inside `features[]`'s fields (lines 45-83), `title`:

```ts
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Заголовок',
        },
```

`description`:

```ts
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
          label: 'Описание',
        },
```

Leave `features[].icon` (select) untouched.

- [ ] **Step 9: HeroSearch — `badge`, `headline`, `subheadline`**

`src/blocks/house/HeroSearch/config.ts`, line 18:

```ts
    { name: 'badge', type: 'text', localized: true, label: 'Маленький лейбл сверху' },
```

Line 19:

```ts
    { name: 'headline', type: 'text', localized: true, label: 'Заголовок', required: true },
```

Line 20:

```ts
    { name: 'subheadline', type: 'textarea', localized: true, label: 'Подзаголовок' },
```

Leave `image` untouched.

- [ ] **Step 10: HouseFilter — `filters[].label`, `filters[].fields[].label`, `filters[].fields[].options[].label`**

`src/blocks/house/HouseFilter/config.ts`, the `filters[]` array's own `label` field (lines 18-23):

```ts
        {
          name: 'label',
          type: 'text',
          label: 'Название фильтра',
          required: true,
          localized: true,
        },
```

Leave `collection` (lines 24-29 — a Payload collection slug, structural) untouched. Inside `fields[]`'s fields (lines 35-106), the field-level `label` (lines 42-46):

```ts
            {
              name: 'label',
              type: 'text',
              label: 'Заголовок поля (label)',
              localized: true,
            },
```

Leave `name` (field key, structural) and `type` (select) untouched. Inside `options[]`'s fields (lines 69-80), `label` (lines 76-78):

```ts
                {
                  name: 'label',
                  type: 'text',
                  localized: true,
                },
```

Leave `options[].value`, `min`, `max`, `step` untouched.

- [ ] **Step 11: HowItWorksBlock — `label`, `title`, `steps[].title/description`**

`src/blocks/house/HowItWorksBlock/config.ts`, lines 21-31:

```ts
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'How it works',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Discover the advantages and exclusive benefits',
    },
```

Inside `steps[]`'s fields (lines 38-58), `title`:

```ts
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
```

`description`:

```ts
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
```

Leave `steps[].icon` (a literal digit string, structural) untouched.

- [ ] **Step 12: MapBlock — `title`, `officeMarker.label`**

`src/blocks/house/MapBlock/config.ts`, `title` (lines 26-30):

```ts
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      localized: true,
    },
```

Inside `officeMarker` group (lines 42-52), `label`:

```ts
        { name: 'label', type: 'text', label: 'Подпись', localized: true },
```

Leave `officeMarker.address` and `center.*` untouched.

- [ ] **Step 13: PropertiesBlock — `title`**

`src/blocks/house/PropertiesBlock/config.ts`, lines 32-37:

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Заголовок блока',
    },
```

Leave `showAllLink` (URL), `properties` (relationship), `layout` (select), `itemsPerPage`, `enableFilters`, and all of `filters.*` (boolean toggles) untouched.

- [ ] **Step 14: QuickNav — `label`, `title`, `subtitle`, `items[].title/description`**

`src/blocks/house/QuickNav/config.ts`, line 18:

```ts
    { name: 'label', type: 'text', localized: true, label: 'Маленький лейбл сверху' },
```

Line 19:

```ts
    { name: 'title', type: 'text', localized: true, label: 'Заголовок', required: true },
```

Line 20:

```ts
    { name: 'subtitle', type: 'textarea', localized: true, label: 'Подзаголовок' },
```

Inside `items[]`'s fields (lines 27-66), `title` (line 49):

```ts
        { name: 'title', type: 'text', localized: true, label: 'Заголовок карточки', required: true },
```

`description` (line 50):

```ts
        { name: 'description', type: 'text', localized: true, label: 'Короткое описание' },
```

Leave `items[].icon` (select), `items[].href` (URL), `items[].accent` (select) untouched.

- [ ] **Step 15: RecentlyViewed — `title`**

`src/blocks/house/RecentlyViewed/config.ts`, line 18:

```ts
    { name: 'title', type: 'text', localized: true, label: 'Заголовок', defaultValue: 'Недавно вы смотрели' },
```

Leave `limit` untouched.

- [ ] **Step 16: Testimonials block — `label`, `title`**

`src/blocks/house/Testimonials/config.ts`, lines 24-34:

```ts
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Testimonials',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Real feedback from our satisfied clients',
    },
```

Leave `testimonials` (relationship) untouched.

- [ ] **Step 17: VisionBlock — `title`, `subtitle`, `buttonText`, `items[].title/description`**

`src/blocks/house/VisionBlock/config.ts`, lines 12-30:

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: 'Заголовок',
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      label: 'Подзаголовок',
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
      label: 'Текст кнопки',
    },
```

Leave `buttonLink` (URL) untouched. Inside `items[]`'s fields (lines 38-58), `title`:

```ts
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Заголовок',
        },
```

`description`:

```ts
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
          label: 'Описание',
        },
```

Leave `items[].icon` (an icon-name key like `'home'`/`'shield'`, structural) untouched.

- [ ] **Step 18: VisionMission — `title`, `description`, `buttonText`, `stats[].label`**

`src/blocks/house/VisionMission/config.ts`, lines 21-37:

```ts
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      defaultValue: 'Your trusted real estate experts:',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
      defaultValue:
        "With years of local expertise, we're committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client's unique needs are met with professionalism and care.",
    },
    {
      name: 'buttonText',
      type: 'text',
      localized: true,
      defaultValue: 'View Properties',
    },
```

Leave `buttonLink` (URL) untouched. Inside `stats[]`'s fields (lines 49-60), `label`:

```ts
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
```

Leave `stats[].value` untouched (numeric display, e.g. `'98%'` — see Localization Decisions).

- [ ] **Step 19: Verify**

```bash
pnpm generate:types
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
```

- [ ] **Step 20: Commit**

```bash
git add src/blocks/house src/payload-types.ts
git commit -m "$(cat <<'EOF'
feat(i18n): localize house page-builder block copy fields

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: Generate and verify the schema migration

**Files:**
- Create: a new migration file under `src/migrations/` (exact filename decided by `payload migrate:create` — typically `src/migrations/<timestamp>_<name>.ts`), registered into `src/migrations/index.ts` automatically by the CLI.

**Interfaces:**
- Consumes: every `localized: true` flag added in Tasks 1-8.

Every field flagged `localized: true` in Tasks 2-8 moves from its parent table's own column into a new `<table>_locales` child table (Payload's standard Postgres-adapter storage for localized fields) — this migration captures that schema delta across roughly a dozen tables at once. This is a genuinely large, generated diff; do not hand-write it.

- [ ] **Step 1: Generate the migration**

```bash
pnpm payload migrate:create enable_localization
```

Expected: a new file appears under `src/migrations/`, and `src/migrations/index.ts` gets a new import + array entry for it (Payload's CLI does this automatically — verify it did, don't add it by hand).

- [ ] **Step 2: Sanity-check the generated SQL against Payload's own expected schema**

Per CLAUDE.md's "Migrations are hand-written, not auto-diffed against config — verify they match" gotcha, run a quick drift check comparing `payload.db.tables` (what config now expects) against `information_schema.columns` (what the migration's SQL would produce) — reconstruct the loop CLAUDE.md describes:

```ts
// scripts/verify-locale-migration.ts (throwaway — do not commit)
import { getPayload } from 'payload'
import config from '../src/payload.config'

const payload = await getPayload({ config })
const db = (payload as any).db
for (const tableName of Object.keys(db.tables)) {
  const table = db.tables[tableName]
  if (tableName.endsWith('_locales')) {
    console.log('expects locales table:', tableName, Object.keys(table))
  }
}
process.exit(0)
```

Run it, then open the generated migration file and confirm every `_locales` table it logs has a matching `CREATE TABLE ..._locales (...)` (or equivalent `ALTER TABLE` sequence) in the migration's `up()`. Delete the throwaway script when done — don't commit it.

- [ ] **Step 3: Apply the migration to the local dev database**

```bash
pnpm payload migrate
```

Expected: migration applies cleanly with no errors.

**Important — this step is destructive to already-seeded content.** Payload's schema migration moves the affected columns into new `_locales` tables but does **not** auto-copy existing single-locale text into the new `ru`-keyed rows (that's a data migration, and `migrate:create` only generates the schema diff). This repo is a template product still in development with only demo/seed data (no real customer content), so the correct fix here is a full re-seed, not a hand-written backfill — that happens in Task 13, not this task. Between this step and Task 13, expect the local dev frontend to render blank/fallback text for every field touched in Tasks 2-8 — that's expected and temporary. If this ever ships against a database holding real production content, whoever does that migration will need to write an explicit data-backfill migration first; flag that to the user rather than attempting it speculatively here.

- [ ] **Step 4: Commit**

```bash
git add src/migrations
git commit -m "$(cat <<'EOF'
feat(i18n): add migration for ru/kz localized field schema

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Rewrite seed-globals off raw SQL, onto `payload.updateGlobal`

**Files:**
- Modify: `src/endpoints/seed-globals/index.ts`
- Modify: `tests/unit/seed-globals.test.ts`

**Interfaces:**
- Consumes: Task 9's migration (the raw-SQL approach hard-coded `header_nav_items`/`footer_nav_items` column names that no longer match the post-migration schema — `link_label` moves into a `_locales` child table it doesn't know about).
- Produces: `seedGlobals({ payload, req }): Promise<{ header: number; footer: number }>` — same public shape as before, callers (`src/app/(frontend)/next/seed-globals/route.ts`, `src/endpoints/seed/index.ts` if it calls this) need no change.

The original raw-SQL approach existed only to work around `link`'s `reference` field being `required: true` even when `type: 'custom'` (see the comment in the current file). `payload.updateGlobal` hits that same validator — but only for the *active* branch: since every seed row uses `type: 'custom'`, the `reference` field's `admin.condition` hides it and Payload's validation only runs required-checks against fields whose `condition` evaluates true for the given `siblingData`. Confirm this holds in Step 1 before deleting the drizzle path (if it doesn't, pass `overrideAccess: true` — already implied by using the Local API — and consider whether the `req` needs `context: { disableValidation: true }`; but try the plain call first).

- [ ] **Step 1: Rewrite `src/endpoints/seed-globals/index.ts`**

Replace the entire file with:

```ts
import type { Payload, PayloadRequest } from 'payload'

interface Args {
  payload: Payload
  req: PayloadRequest
}

// maxRows: 6 in header/footer configs.
// Все ссылки проверены против существующих routes:
//   /home-v2, /flats, /commercial, /lands, /residential-complexes,
//   /search, /agents, /about, /posts, /contact, /cabinet/chats
// /home-v2 закомментирован — главная одна, по корню «/». В навбаре
// его не показываем, чтобы пользователь не упирался в 404.
const HEADER_NAV = [
  { label: 'Главная', url: '/' },
  { label: 'Квартиры', url: '/flats' },
  { label: 'Коммерческая', url: '/commercial' },
  { label: 'Земля', url: '/lands' },
  { label: 'Агенты', url: '/agents' },
  { label: 'Поиск', url: '/search' },
]

const FOOTER_NAV = [
  { label: 'О нас', url: '/about' },
  { label: 'Агенты', url: '/agents' },
  { label: 'Блог', url: '/posts' },
  { label: 'Мои переписки', url: '/cabinet/chats' },
  { label: 'Поиск', url: '/search' },
  { label: 'Контакты', url: '/contact' },
]

// Mock legal info. Реквизиты — заменить в админке /admin/globals/legal-info.
const LEGAL_INFO_MOCK = {
  displayName: 'Realty',
  legalForm: 'ooo' as const,
  fullName: 'Общество с ограниченной ответственностью «Агентство Недвижимости Реалти»',
  ceoName: 'Иванов Иван Иванович',
  ceoTitle: 'Генеральный директор',
  ogrn: '1234567890123',
  inn: '7707083893',
  kpp: '770701001',
  bankAccount: '40702810000000000000',
  bankName: 'ПАО Сбербанк',
  bankBic: '044525225',
  legalAddress: '125009, г. Москва, ул. Тверская, д. 12, стр. 1, оф. 405',
  actualAddress: '125009, г. Москва, ул. Тверская, д. 12, стр. 1, оф. 405',
  phone: '+7 (495) 123-45-67',
  email: 'hello@realty.local',
  workingHours: 'Пн–Пт 10:00–19:00, Сб 11:00–17:00',
  privacyPolicyUrl: '/privacy',
  termsUrl: '/terms',
  dataProtectionOfficer: 'Петрова Анна Сергеевна',
}

export const seedGlobals = async ({ payload, req }: Args) => {
  payload.logger.info('[seed-globals] updating header & footer & legal-info…')

  await payload.updateGlobal({
    slug: 'legal-info',
    data: LEGAL_INFO_MOCK,
    req,
  })

  await payload.updateGlobal({
    slug: 'header',
    data: {
      navItems: HEADER_NAV.map((item) => ({
        link: { type: 'custom' as const, newTab: false, url: item.url, label: item.label },
      })),
    },
    locale: 'ru',
    req,
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navItems: FOOTER_NAV.map((item) => ({
        link: { type: 'custom' as const, newTab: false, url: item.url, label: item.label },
      })),
    },
    locale: 'ru',
    req,
  })

  payload.logger.info('[seed-globals] done')
  return { header: HEADER_NAV.length, footer: FOOTER_NAV.length }
}
```

- [ ] **Step 2: Rewrite `tests/unit/seed-globals.test.ts`**

Replace the entire file with:

```ts
import { describe, it, mock } from 'node:test'
import * as assert from 'node:assert/strict'

import { seedGlobals } from '../../src/endpoints/seed-globals/index.js'
import type { Payload, PayloadRequest } from 'payload'

describe('seedGlobals', () => {
  it('seeds legal-info, header, and footer via updateGlobal', async () => {
    const infoMock = mock.fn()
    const updateGlobalMock = mock.fn(async () => ({}))

    const mockPayload = {
      logger: { info: infoMock },
      updateGlobal: updateGlobalMock,
    } as unknown as Payload

    const mockReq = {} as PayloadRequest

    const result = await seedGlobals({ payload: mockPayload, req: mockReq })

    assert.deepEqual(result, { header: 6, footer: 6 })

    assert.equal(infoMock.mock.calls.length, 2)
    assert.equal(
      infoMock.mock.calls[0].arguments[0],
      '[seed-globals] updating header & footer & legal-info…',
    )
    assert.equal(infoMock.mock.calls[1].arguments[0], '[seed-globals] done')

    assert.equal(updateGlobalMock.mock.calls.length, 3)

    const legalCall = updateGlobalMock.mock.calls[0].arguments[0] as any
    assert.equal(legalCall.slug, 'legal-info')
    assert.equal(legalCall.req, mockReq)
    assert.equal(legalCall.data.displayName, 'Realty')

    const headerCall = updateGlobalMock.mock.calls[1].arguments[0] as any
    assert.equal(headerCall.slug, 'header')
    assert.equal(headerCall.locale, 'ru')
    assert.equal(headerCall.data.navItems.length, 6)
    assert.deepEqual(headerCall.data.navItems[0].link, {
      type: 'custom',
      newTab: false,
      url: '/',
      label: 'Главная',
    })

    const footerCall = updateGlobalMock.mock.calls[2].arguments[0] as any
    assert.equal(footerCall.slug, 'footer')
    assert.equal(footerCall.locale, 'ru')
    assert.equal(footerCall.data.navItems.length, 6)
    assert.deepEqual(footerCall.data.navItems[0].link, {
      type: 'custom',
      newTab: false,
      url: '/about',
      label: 'О нас',
    })
  })
})
```

- [ ] **Step 3: Run the unit test**

```bash
pnpm test:unit
```
Expected: 100% green, per CLAUDE.md's "must be 100% green" rule.

- [ ] **Step 4: Commit**

```bash
git add src/endpoints/seed-globals/index.ts tests/unit/seed-globals.test.ts
git commit -m "$(cat <<'EOF'
fix(seed): rewrite seed-globals off raw SQL onto payload.updateGlobal

Localized header/footer nav labels move link_label into a
_locales child table the old hand-written drizzle SQL doesn't
know about. payload.updateGlobal is schema-agnostic and survives
future field changes without a rewrite.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Thread locale through `getGlobals`, Header, Footer, and the pages that call them directly

**Files:**
- Modify: `src/utilities/getGlobals.ts`
- Modify: `src/Header/Component.tsx`
- Modify: `src/Footer/Component.tsx`
- Modify: `src/Header/hooks/revalidateHeader.ts`
- Modify: `src/Footer/hooks/revalidateFooter.ts`
- Modify: `src/app/(frontend)/[locale]/layout.tsx`
- Modify: `src/app/(frontend)/[locale]/terms/page.tsx`
- Modify: `src/app/(frontend)/[locale]/privacy/page.tsx`
- Modify: `src/app/(frontend)/[locale]/page.tsx`

**Interfaces:**
- Consumes: Task 9's migration.
- Produces: `getGlobal(slug, depth, locale)` and `getCachedGlobal(slug, depth, locale)` — both now take a **required** third `locale: string` argument (no default — every call site must pass one explicitly, uniformly, even for the non-localized `legal-info` global, to keep the API single-shaped rather than special-casing one slug). `Header`/`Footer` components now take a required `{ locale: string }` prop.

- [ ] **Step 1: Add `locale` to `getGlobal`/`getCachedGlobal`**

Replace `src/utilities/getGlobals.ts` entirely with:

```ts
import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0, locale: string) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * `locale` is folded into both the cache key and the tag so a RU and a KZ
 * request for the same global never collide on one cache entry.
 */
export const getCachedGlobal = (slug: Global, depth = 0, locale: string) =>
  unstable_cache(async () => getGlobal(slug, depth, locale), [slug, locale], {
    tags: [`global_${slug}_${locale}`],
  })
```

- [ ] **Step 2: Update the revalidation hooks to hit every locale's tag**

Replace `src/Header/hooks/revalidateHeader.ts`:

```ts
import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { routing } from '@/i18n/routing'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    for (const locale of routing.locales) {
      revalidateTag(`global_header_${locale}`)
    }
  }

  return doc
}
```

Replace `src/Footer/hooks/revalidateFooter.ts` the same way:

```ts
import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { routing } from '@/i18n/routing'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    for (const locale of routing.locales) {
      revalidateTag(`global_footer_${locale}`)
    }
  }

  return doc
}
```

- [ ] **Step 3: Make `Header`/`Footer` accept a `locale` prop**

Replace `src/Header/Component.tsx`:

```tsx
import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header({ locale }: { locale: string }) {
  const headerData: Header = await getCachedGlobal('header', 1, locale)()

  return <HeaderClient data={headerData} />
}
```

In `src/Footer/Component.tsx`, change only the `Footer` function signature and its two `getCachedGlobal` calls (lines 38-40) — leave the rest of the file (the JSX, `LegalInfoShape`, `LEGAL_FORM_LABEL`) untouched:

```tsx
export async function Footer({ locale }: { locale: string }) {
  const footerData = (await getCachedGlobal('footer', 1, locale)()) as FooterType
  const legal = (await getCachedGlobal('legal-info', 1, locale)()) as LegalInfoShape
```

- [ ] **Step 4: Pass `locale` down from the root layout**

In `src/app/(frontend)/[locale]/layout.tsx`, the `locale` variable is already extracted at line 47 (`const { locale } = await params`). Change lines 70 and 72:

```tsx
            <Header locale={locale} />
            {children}
            <Footer locale={locale} />
```

- [ ] **Step 5: Fix the two direct `getCachedGlobal('legal-info', ...)` callers**

In `src/app/(frontend)/[locale]/terms/page.tsx`, change the function signature and call (lines 17-18):

```tsx
export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const legal = (await getCachedGlobal('legal-info', 1, locale)()) as LegalInfo
```

Apply the identical change to `src/app/(frontend)/[locale]/privacy/page.tsx` (lines 16-17):

```tsx
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const legal = (await getCachedGlobal('legal-info', 1, locale)()) as LegalInfo
```

- [ ] **Step 6: Fix `HomePage`'s direct `payload.findGlobal` calls**

In `src/app/(frontend)/[locale]/page.tsx`, `fetchHomeSeo` and `fetchLegal` (lines 27-45) both need a `locale` parameter, and `HomePage`/`generateMetadata` (lines 47, 97) both need `params`:

```ts
const fetchHomeSeo = async (locale: string) => {
  try {
    const payload = await getPayload({ config })
    const seo = await payload.findGlobal({ slug: 'home-seo' as any, depth: 0, locale })
    return seo as any
  } catch {
    return null
  }
}

const fetchLegal = async (locale: string) => {
  try {
    const payload = await getPayload({ config })
    const legal = await payload.findGlobal({ slug: 'legal-info' as any, depth: 0, locale })
    return legal as any
  } catch {
    return null
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const hdrs = await headers()
  const [seo, legal, detectedCity] = await Promise.all([
    fetchHomeSeo(locale),
    fetchLegal(locale),
    // Город по IP. Промис гонится параллельно — даже если ip-api ляжет
    // на 1.5 сек, общий рендер не блокируется (Promise.all дожидается).
    detectCityFromRequestHeaders(hdrs),
  ])
```

And `generateMetadata`:

```ts
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const seo = await fetchHomeSeo(locale)
  return {
    title: seo?.metaTitle || 'Demo Realty — недвижимость',
    description:
      seo?.metaDescription ||
      'Demo Realty — поиск и покупка недвижимости: квартиры, дома, земля, коммерческая.',
    alternates: { canonical: '/' },
  }
}
```

`CategoryTiles`, `FeaturedListings`, `MapNearby` are still called with no `locale` prop here — that's fixed in Task 13, since none of their own Local API calls touch a localized field yet at this point in the plan (they query `flats`/`residential-complexes`/`lands`/`commercial` for images/price/city, none of which this plan localizes) — verify that's still true after Task 5 before skipping them; if you added `title`/`description` localization to those collections' card-preview usage, thread `locale` there too instead of deferring.

- [ ] **Step 7: Verify — start the dev server and load both locales**

```bash
pnpm dev
```

Then in a browser (or via the Claude Browser pane), load `http://localhost:3000/` and `http://localhost:3000/kz/` and confirm both render without throwing (content will look identical/blank until Task 13's re-seed — this step is checking for *errors*, not content correctness). Check the terminal running `pnpm dev` for any thrown exceptions.

- [ ] **Step 8: Commit**

```bash
git add src/utilities/getGlobals.ts src/Header/Component.tsx src/Footer/Component.tsx src/Header/hooks/revalidateHeader.ts src/Footer/hooks/revalidateFooter.ts src/app/\(frontend\)/\[locale\]/layout.tsx src/app/\(frontend\)/\[locale\]/terms/page.tsx src/app/\(frontend\)/\[locale\]/privacy/page.tsx src/app/\(frontend\)/\[locale\]/page.tsx
git commit -m "$(cat <<'EOF'
feat(i18n): thread locale through getGlobals, Header, Footer

getGlobal/getCachedGlobal now require an explicit locale arg and
fold it into the unstable_cache key/tag so ru and kz requests for
the same global don't collide on one cache entry.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Thread locale through the listing catalog (flats/commercial/lands/residential-complexes)

**Files:**
- Modify: `src/components/PropertyListingPage/index.tsx`
- Modify: `src/components/PropertyDetailPage/index.tsx`
- Modify: `src/lib/propertyMetadata.ts`
- Modify: `src/app/(frontend)/[locale]/(realestate)/flats/page.tsx`
- Modify: `src/app/(frontend)/[locale]/(realestate)/flats/[slug]/page.tsx`
- Modify: `src/app/(frontend)/[locale]/(realestate)/commercial/page.tsx`
- Modify: `src/app/(frontend)/[locale]/(realestate)/commercial/[slug]/page.tsx`
- Modify: `src/app/(frontend)/[locale]/(realestate)/lands/page.tsx`
- Modify: `src/app/(frontend)/[locale]/(realestate)/lands/[slug]/page.tsx`
- Modify: `src/app/(frontend)/[locale]/(realestate)/residential-complexes/page.tsx`
- Modify: `src/app/(frontend)/[locale]/(realestate)/residential-complexes/[slug]/page.tsx`

**Interfaces:**
- Consumes: Task 9's migration.
- Produces: `PropertyListingPage`'s `Props` gains `locale: string`; `PropertyDetailPage`'s `Props` gains `locale: string`; `buildPropertyMetadata(type, slug, locale)` gains a third parameter.

- [ ] **Step 1: `PropertyListingPage` — accept and pass `locale`**

In `src/components/PropertyListingPage/index.tsx`, add `locale` to `Props` (lines 27-32):

```ts
interface Props {
  type: PropertyType
  title: string
  searchParams: Record<string, string | undefined>
  mapBaseUrl: string
  locale: string
}
```

Destructure it in the component (lines 180-185) and pass it into the `payload.find` call (lines 201-212):

```ts
export const PropertyListingPage: React.FC<Props> = async ({
  type,
  title,
  searchParams,
  mapBaseUrl,
  locale,
}) => {
  const payload = await getPayload({ config })
  const where = buildWhere(type, searchParams)

  const sortParam =
    searchParams.sort && ALLOWED_SORTS.has(searchParams.sort)
      ? searchParams.sort
      : '-createdAt'
  const sort =
    type === 'lands' && sortParam.includes('area.total')
      ? sortParam.replace('area.total', 'area')
      : sortParam

  const pageParam = parseInt(searchParams.page ?? '1', 10) || 1
  const page = Math.max(1, pageParam)

  const result = await payload.find({
    collection: COLLECTION_MAP[type] as any,
    where,
    sort,
    limit: PAGE_SIZE,
    page,
    depth: 1,
    locale,
  })
```

- [ ] **Step 2: `PropertyDetailPage` — accept and pass `locale`**

In `src/components/PropertyDetailPage/index.tsx`, add `locale` to `Props` (lines 47-61):

```ts
interface Props {
  type: PropertyType
  slug: string
  locale: string
  doc?: any
  previewMode?: boolean
}
```

Destructure and use it (lines 64-83):

```ts
export const PropertyDetailPage: React.FC<Props> = async ({
  type,
  slug,
  locale,
  doc: docProp,
  previewMode = false,
}) => {
  const payload = await getPayload({ config })

  let data: any = docProp ?? null

  if (!data) {
    const found = await payload.find({
      collection: COLLECTION_MAP[type] as any,
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
      locale,
    })
    if (!found.docs.length) notFound()
    data = found.docs[0]
  }
```

(The two `reviews` queries further down stay untouched — `reviews` isn't a localized collection.)

- [ ] **Step 3: `buildPropertyMetadata` — accept `locale`**

In `src/lib/propertyMetadata.ts`, add a third parameter and pass it through:

```ts
export const buildPropertyMetadata = async (
  type: PropertyType,
  slug: string,
  locale: string,
): Promise<Metadata> => {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: COLLECTION_MAP[type] as any,
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      locale,
    })
```

Also fix the hardcoded `openGraph.locale: 'ru_RU'` (line 75) to vary by locale — add a small map near the top of the file (after `TYPE_LABEL`):

```ts
const OG_LOCALE: Record<string, string> = {
  ru: 'ru_RU',
  kz: 'kk_KZ',
}
```

and change line 75 from `locale: 'ru_RU',` to `locale: OG_LOCALE[locale] ?? 'ru_RU',`.

- [ ] **Step 4: Update all 4 catalog list routes identically**

In `src/app/(frontend)/[locale]/(realestate)/flats/page.tsx`, add `params` and pass `locale` down:

```tsx
export default async function FlatsListingRoute(props: {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const { locale } = await props.params
  const sp = await props.searchParams
  return (
    <PropertyListingPage
      type="flats"
      title="Квартиры"
      searchParams={sp}
      mapBaseUrl="/flats"
      locale={locale}
    />
  )
}
```

`generateMetadata` doesn't need `locale` (`buildCatalogMeta` performs no data fetch — see the Explore report's finding), leave it as-is.

Apply the identical pattern to `commercial/page.tsx` (`type="commercial"`, `title="Коммерческая недвижимость"`, `mapBaseUrl="/commercial"`), `lands/page.tsx` (`type="lands"`, `title="Земельные участки"`, `mapBaseUrl="/lands"`), and `residential-complexes/page.tsx` (`type="residential-complexes"`, `title="Жилые комплексы"`, `mapBaseUrl="/residential-complexes"`) — same `props.params` addition, same `locale={locale}` prop.

- [ ] **Step 5: Update all 4 catalog detail routes identically**

In `src/app/(frontend)/[locale]/(realestate)/flats/[slug]/page.tsx`:

```tsx
export default async function FlatsDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  return <PropertyDetailPage type="flats" slug={slug} locale={locale} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  return buildPropertyMetadata('flats', slug, locale)
}
```

Apply the identical pattern to `commercial/[slug]/page.tsx` (`type="commercial"`), `lands/[slug]/page.tsx` (`type="lands"`), `residential-complexes/[slug]/page.tsx` (`type="residential-complexes"`) — same `params` type widened to include `locale`, same threading into both the page and `generateMetadata`.

- [ ] **Step 6: Verify — typecheck and manual smoke test**

```bash
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
pnpm dev
```
Load `/flats`, `/kz/flats`, `/flats/<a-real-seeded-slug>`, `/kz/flats/<same-slug>` and confirm no server errors (check the `pnpm dev` terminal output). Repeat at least once for `/commercial` or `/lands` to confirm the pattern generalized correctly.

- [ ] **Step 7: Commit**

```bash
git add src/components/PropertyListingPage/index.tsx src/components/PropertyDetailPage/index.tsx src/lib/propertyMetadata.ts "src/app/(frontend)/[locale]/(realestate)"
git commit -m "$(cat <<'EOF'
feat(i18n): thread locale through listing catalog routes

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Thread locale through the remaining pages, re-seed, and verify end-to-end

**Files:**
- Modify: `src/app/(frontend)/[locale]/[slug]/page.tsx`
- Modify: `src/app/(frontend)/[locale]/[slug]/[filterSlug]/page.tsx`
- Modify: `src/components/CityLandingPage/index.tsx`
- Modify: `src/app/(frontend)/[locale]/posts/page.tsx`
- Modify: `src/app/(frontend)/[locale]/posts/page/[pageNumber]/page.tsx`
- Modify: `src/app/(frontend)/[locale]/posts/[slug]/page.tsx`
- Modify: `src/app/(frontend)/[locale]/search/page.tsx`
- Modify: `src/components/Home/CategoryTiles.tsx`
- Modify: `src/components/Home/FeaturedListings.tsx`
- Modify: `src/components/Home/MapNearby.tsx`
- Modify: `src/app/(frontend)/[locale]/cabinet/listings/[id]/preview/page.tsx`
- Modify: `src/app/(frontend)/[locale]/cabinet/listings/[id]/edit/page.tsx`

**Interfaces:**
- Consumes: Task 9's migration, Tasks 11-12's patterns.

- [ ] **Step 1: `[slug]/page.tsx` — thread locale into `queryPageBySlug` (the localized `pages` query); leave `queryCityBySlug` alone (`cities` isn't localized)**

In `src/app/(frontend)/[locale]/[slug]/page.tsx`, widen `Args` (lines 24-28):

```ts
type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}
```

Update `Page` (line 34):

```ts
export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug = 'home' } = await paramsPromise
  const url = '/' + slug

  if (DISABLED_PAGE_SLUGS.has(slug)) {
    notFound()
  }

  // 1. City landing page takes precedence over arbitrary page slugs.
  const city = await queryCityBySlug({ slug })
  if (city) {
    return <CityLandingPage city={city} locale={locale} />
  }

  // 2. Fall back to legacy pages collection.
  let page: RequiredDataFromCollectionSlug<'pages'> | null = await queryPageBySlug({ slug, locale })
```

Update `generateMetadata` (line 77):

```ts
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = 'home' } = await paramsPromise

  const city = await queryCityBySlug({ slug })
  if (city) {
    // ... unchanged city branch ...
  }

  const page = await queryPageBySlug({ slug, locale })
  return generateMeta({ doc: page })
}
```

Update `queryPageBySlug` (lines 123-142) to accept and use `locale` — note this changes its cache-key shape, which is fine since `cache()` (React's, not `unstable_cache`) keys on the full argument object automatically:

```ts
const queryPageBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
```

`queryCityBySlug` stays exactly as-is (no `locale` param — `cities` isn't localized).

- [ ] **Step 2: `CityLandingPage` — accept a `locale` prop (currently unused inside, since `flats`/`commercial`/`lands`/`residential-complexes` counts/cards don't read a localized field here — only `title`/`description`/`amenities` etc. would, and this component only reads `location.city`, `price`, `images`, `slug`, `transactionType`, none of which this plan localizes). Accept the prop now so it's available the moment a future field here does need it, and so its caller's signature is self-consistent with every other locale-aware component in this codebase.**

In `src/components/CityLandingPage/index.tsx`, add `locale` to `Props` (lines 15-17):

```ts
interface Props {
  city: any
  locale: string
}
```

Destructure it (line 27) even though the body doesn't use it yet:

```ts
export const CityLandingPage: React.FC<Props> = async ({ city, locale }) => {
```

- [ ] **Step 3: `posts/page.tsx` — thread locale into the localized `posts` query**

In `src/app/(frontend)/[locale]/posts/page.tsx`:

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    locale,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })
```

- [ ] **Step 4: `posts/page/[pageNumber]/page.tsx`**

```tsx
type Args = {
  params: Promise<{
    locale: string
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { locale, pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
    locale,
  })
```

`generateMetadata` in this file doesn't touch Payload — leave it untouched.

- [ ] **Step 5: `posts/[slug]/page.tsx`**

Widen `Args` (lines 23-27):

```ts
type Args = {
  params: Promise<{
    locale: string
    slug?: string
  }>
}
```

Update `Post` (line 29):

```tsx
export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug = '' } = await paramsPromise
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug, locale })
```

Update `generateMetadata` (line 102):

```tsx
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { locale, slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug, locale })

  return generateMeta({ doc: post })
}
```

Update `queryPostBySlug` (lines 109-128):

```ts
const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
```

- [ ] **Step 6: `[slug]/[filterSlug]/page.tsx` — thread locale into `PropertyListingPage`; leave `fetchCity`/`fetchSeoLanding` alone (neither `cities` nor `seo-landings` is localized)**

Widen `Args` (lines 15-18):

```ts
interface Args {
  params: Promise<RouteParams & { locale: string }>
  searchParams: Promise<Record<string, string | undefined>>
}
```

Update `CityFilterPage` (lines 65-76):

```tsx
export default async function CityFilterPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { locale, slug, filterSlug } = await paramsPromise
  const userParams = await searchParamsPromise
```

Update the `<PropertyListingPage>` call (lines 130-135):

```tsx
        <PropertyListingPage
          type={parsed.category}
          title={landing ? undefined : `${parsed.label} в городе ${city.name}`}
          searchParams={composed}
          mapBaseUrl={`/${parsed.category}`}
          locale={locale}
        />
```

`generateMetadata` here doesn't need `locale` (it builds metadata strings from `city`/`landing`/`parsed`, none of which are localized fields in this plan's scope) — leave it untouched.

- [ ] **Step 7: `search/page.tsx` — thread locale into every `flats`/`commercial`/`lands`/`residential-complexes` query**

Widen `Args` (lines 20-31):

```ts
type Args = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    q?: string
    category?: string
    city?: string
    transactionType?: string
    minPrice?: string
    maxPrice?: string
    ai?: string
  }>
}
```

Update `Page` (line 147):

```tsx
export default async function Page({ params, searchParams: searchParamsPromise }: Args) {
  const { locale } = await params
  const sp = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })
```

Add `locale` to the three `payload.find` calls inside the AI-mode branch (lines 175-181 and 200-205) and the keyword-mode branch (lines 236-243):

```ts
          const r = await payload.find({
            collection: c as any,
            where,
            depth: 0,
            limit: 200,
            sort: '-createdAt',
            locale,
          })
```

```ts
          const r = await payload.find({
            collection: c as any,
            where: { id: { in: ids } },
            depth: 1,
            limit: ids.length,
            locale,
          })
```

```ts
        payload
          .find({
            collection: c as any,
            where: buildWhere(c, sp),
            sort: '-createdAt',
            limit: perLimit,
            depth: 1,
            locale,
          })
```

`generateMetadata` in this file is static (no data fetch) — leave it untouched.

- [ ] **Step 8: Home components — thread locale from `HomePage` (Task 11 already added `locale` there)**

In `src/app/(frontend)/[locale]/page.tsx`, pass `locale` to the three components (lines 71, 73, 82):

```tsx
      <CategoryTiles locale={locale} />
      <WhyUs />
      <FeaturedListings locale={locale} />

      {/* ... */}

      <MapNearby locale={locale} />
```

In `src/components/Home/CategoryTiles.tsx`, add a `locale` prop and pass it into `payload.find`:

```tsx
export const CategoryTiles = async ({ locale }: { locale: string }) => {
  const payload = await getPayload({ config: configPromise })
  const previews = await Promise.all(TILES.map((t) => fetchPreview(payload, t, locale)))
```

and update `fetchPreview`'s signature/call (lines 57-72):

```ts
const fetchPreview = async (
  payload: Awaited<ReturnType<typeof getPayload>>,
  spec: TileSpec,
  locale: string,
): Promise<TilePreview> => {
  const where: any =
    spec.collection === 'residential-complexes' ? {} : { status: { equals: 'active' } }

  try {
    const res = await payload.find({
      collection: spec.collection as any,
      where,
      sort: '-createdAt',
      limit: 1,
      depth: 1,
      pagination: false,
      locale,
    })
```

In `src/components/Home/FeaturedListings.tsx`:

```tsx
export const FeaturedListings = async ({ locale }: { locale: string }) => {
  const payload = await getPayload({ config: configPromise })
  let docs: any[] = []
  try {
    const res = await payload.find({
      collection: 'flats',
      where: { status: { equals: 'active' } },
      sort: '-createdAt',
      limit: 8,
      depth: 1,
      pagination: false,
      locale,
    })
```

In `src/components/Home/MapNearby.tsx`:

```tsx
export const MapNearby = async ({ locale }: { locale: string }) => {
  const payload = await getPayload({ config: configPromise })
  let items: PropertyMapItem[] = []
  try {
    const res = await payload.find({
      collection: 'flats',
      where: { status: { equals: 'active' } },
      sort: '-createdAt',
      limit: 30,
      depth: 1,
      pagination: false,
      locale,
    })
```

- [ ] **Step 9: Cabinet listing preview/edit — hardcode `locale: 'ru'` (self-service submission stays RU-primary per this plan's ruling, not the URL's locale)**

In `src/app/(frontend)/[locale]/cabinet/listings/[id]/preview/page.tsx`, the `payload.findByID` call (lines 53-58):

```ts
  const payload = await getPayload({ config })
  let doc: any = null
  try {
    doc = await payload.findByID({
      collection: collection as any,
      id,
      depth: 2,
      overrideAccess: true,
      locale: 'ru',
    })
```

Apply the identical single-line addition (`locale: 'ru',`) to `src/app/(frontend)/[locale]/cabinet/listings/[id]/edit/page.tsx`'s `payload.findByID` call (lines 44-49).

Both files already call `getLocale()` (for the login-redirect) — don't repurpose that value here; it's the *URL's* locale, and this plan's ruling is that cabinet self-service editing always targets the `ru` document regardless of which URL locale the realtor happens to be browsing under.

- [ ] **Step 10: Typecheck**

```bash
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
```
Expected: error count still at the ~130 baseline (CLAUDE.md) — no new errors from this task's signature changes.

- [ ] **Step 11: Full re-seed and manual RU/KZ smoke test**

This is the point where the local dev database, left in a partially-blank state since Task 9's migration, gets fully repopulated. With `pnpm dev` running against the migrated database:

```bash
curl -X POST http://localhost:3000/next/seed-globals
curl -X POST http://localhost:3000/next/seed-pages
curl -X POST http://localhost:3000/next/seed-cities
curl -X POST http://localhost:3000/next/seed-photos
curl -X POST http://localhost:3000/next/seed-posts
curl -X POST http://localhost:3000/next/seed-home-seo
curl -X POST http://localhost:3000/next/seed-spb-listings
```
(These are dev-only, open per `src/utilities/seedAuth.ts` when `NODE_ENV !== 'production'` — no auth header needed locally. Order matters per CLAUDE.md: globals before content that references them.)

Then, in a browser (or the Claude Browser pane):
1. Load `/` — confirm the header nav, hero H1/subtitle, featured listings, and footer all render with real (Russian) text, not blank.
2. Load `/kz/` — confirm it renders too (content will be identical to `/`, since no `kz` values have been entered anywhere yet — that's expected; `fallback: true` is doing its job). Confirm no errors in the `pnpm dev` terminal or browser console.
3. In `/admin`, open the `header` global — confirm there are now two locale tabs/selector (RU/KZ) in the field editor UI for `navItems[].link.label`, and typing a KZ-only value into one nav item, saving, then reloading `/kz/` shows that one label changed while `/` still shows the RU one. This is the actual proof the whole mechanism works end-to-end, not just that nothing crashed.
4. Load a flats detail page at both `/flats/<slug>` and `/kz/flats/<slug>` — confirm both render, then in `/admin` edit that flat's `title` under the KZ locale tab, save, and confirm `/kz/flats/<slug>` picks it up (may need a hard refresh past the 300s ISR `revalidate` window, or wait it out).

- [ ] **Step 12: Run the full verification suite**

```bash
pnpm test:unit
NODE_OPTIONS=--no-deprecation npx tsc --noEmit -p tsconfig.json
npx eslint .
```
Expected: `test:unit` 100% green; `tsc` at the pre-existing baseline; `eslint` clean except the two known-accepted categories documented in CLAUDE.md (unrelated to this work).

- [ ] **Step 13: Commit**

```bash
git add src/app/\(frontend\)/\[locale\]/\[slug\] src/components/CityLandingPage/index.tsx src/app/\(frontend\)/\[locale\]/posts src/app/\(frontend\)/\[locale\]/search src/components/Home src/app/\(frontend\)/\[locale\]/cabinet
git commit -m "$(cat <<'EOF'
feat(i18n): thread locale through remaining pages, verify end-to-end

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

## Follow-ups explicitly out of scope for this plan

- **Amenities/utilities/communications/infrastructure free-text → fixed `select` enum.** Flats/Commercial/Lands/ResidentialComplex each store these as free-text array items (now localizable text, per this plan); Houses already solved this with a fixed `select` enum (`src/collections/Houses/index.ts`'s `amenities` field). Converting the other four to match would improve admin UX (pick from a list instead of retyping the same handful of amenities per listing) and remove the need to translate the same handful of strings over and over — but it's a data-model change requiring a lossy data migration of existing free-text values against a new fixed vocabulary, which is a genuinely separate, larger piece of work from "add `localized: true`". Flag as a candidate follow-up task.
- **UI chrome string extraction (next-intl `messages/ru.json` / `messages/kz.json`)** — this is the spec's Phase 3, separate from Payload content localization. Nothing in this plan touches hardcoded Russian UI strings (button labels, filter labels, error messages, etc. that live in `.tsx` files rather than Payload field values).
- **Admin panel Kazakh (`@payloadcms/translations`)** — spec's Phase 4; whether Kazakh ships as a built-in admin-UI translation is still an open item per the spec's §9.
- **Seeding actual Kazakh content** — this plan makes every relevant field *capable* of holding a `kz` value and wires up the fetch-side plumbing to read it; it deliberately does not translate the demo seed content into Kazakh (seed scripts continue writing only `ru` values, which `fallback: true` serves under `/kz/...` until someone — an agency's own admin, or a later dedicated task — fills in real `kz` copy). This matches how the actual turnkey-product business model works: each client agency authors their own bilingual content through the admin UI.
- **(2026-09-05, final-review fix wave) AI-search embeddings have no locale dimension.** `src/lib/embeddings/store.ts` upserts one embedding row per document, keyed by `(collection_slug, doc_id, kind, model)` — no `locale` in the key — built from `doc.title`/`doc.description` (`src/lib/embeddings/serialize.ts`) and refreshed by each collection's `afterChange` hook on every save, in whichever locale that save happened to be made in. Today this is inert: zero Kazakh content exists in the database, so every save is still a `ru` save and the row stays Russian. But the first time an editor saves a Kazakh translation of a listing, that save's `afterChange` will overwrite the single embedding row with Kazakh-language text, silently degrading Russian-language AI search for that listing (and vice versa for whichever locale was saved most recently). Fixing this is a real data-model decision — one embedding row per `(doc, locale)` vs. deliberately indexing only the default locale — not a threading gap, so it's out of scope for this fix wave. Flag as a candidate follow-up task before any real Kazakh content is authored.
