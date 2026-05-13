# Frontend Material Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite the `(frontend)` route group, `src/components`, `src/Header`, and `src/Footer` in a Google-like minimalistic Material 3 visual language, plus consolidate the four near-identical realestate listing pages into one shared template. Backend (Payload collections, routes, URL params, copy) untouched.

**Architecture:** Token-first foundation in `globals.css` + `tailwind.config.mjs` → retheme of existing shadcn `components/ui/*` primitives → rebuild of shared shells (`Header`, `Footer`, new `<PropertyCard>` etc.) → realestate consolidation via shared `<PropertyListingPage>` and `<PropertyDetailPage>` templates → homepage + remaining pages. One commit per logical unit.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript 5.7, Tailwind 3.4, shadcn UI (Radix-based), Payload CMS 3, pnpm 10, Docker dev (Next.js dev server in container, hot reload via WATCHPACK_POLLING).

**Spec:** [`docs/superpowers/specs/2026-05-13-frontend-material-redesign-design.md`](../specs/2026-05-13-frontend-material-redesign-design.md)

**Verification model:** No automated tests exist. Each task ends with explicit visual + log smoke checks against the running Docker dev server at `http://localhost:3000`. The Compose stack must be up before starting (`docker compose ps` should show `app`, `postgres`, `pgadmin` running).

**Smoke command reference** (used throughout):

- Container logs: `docker logs --tail 40 my_app 2>&1`
- HTTP smoke: `curl -sS -o /dev/null -w "%{http_code} in %{time_total}s\n" http://localhost:3000/<route>`
- Type check & build (run at the end of each phase): `docker compose exec app pnpm build`

---

## Phase 1 — Foundation (tokens & dependencies)

### Task 1.1: Wire Inter font via next/font

**Files:**
- Modify: `src/app/(frontend)/layout.tsx`

- [ ] **Step 1: Replace the font imports and apply the Inter variable to `<html>`.**

Replace the entire file contents with:

```tsx
import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { Inter } from 'next/font/google'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(inter.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
```

- [ ] **Step 2: Verify compile.**

Run: `docker logs --tail 20 my_app`
Expected: line `✓ Compiled / in <ms>` and no `Error:` / `Module not found` lines.

- [ ] **Step 3: Smoke HTTP.**

Run: `curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/`
Expected: `200`.

### Task 1.2: Replace daisyUI class references in 5 files

The daisyUI plugin is removed in Task 1.3; pre-emptively swap its classes for plain Tailwind / `components/ui` primitives.

**Files (modify each):**
- `src/blocks/house/VisionMission/component.tsx`
- `src/components/RichMessageForm/index.tsx`
- `src/components/Forms/RealtorReviewForm.tsx`
- `src/components/PropertyMap.tsx/index.tsx`
- `src/blocks/house/PropertyGallery/component.tsx`

- [ ] **Step 1: Find all daisyUI class refs.**

Run: `grep -rn "input-bordered\|select-bordered\|btn-\|bg-base-\|text-base-content" src/ --include="*.tsx" --include="*.ts"`

Expected: 15 matches across the 5 files listed above.

- [ ] **Step 2: For each `<input className="… input-bordered …">` replace the class with `border border-border rounded-md bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`. For each `<select className="… select-bordered …">` use the same set. For `bg-base-100` / `text-base-content` etc. replace with `bg-background` / `text-foreground`.**

Use Grep + Edit tool per file. After the swap, run the grep from Step 1 again and confirm 0 matches.

- [ ] **Step 3: Verify compile.**

Run: `docker logs --tail 30 my_app`
Expected: clean compile, no `Module not found`.

- [ ] **Step 4: Commit the foundation prep.**

```bash
git add src/app/\(frontend\)/layout.tsx src/blocks src/components/RichMessageForm src/components/Forms src/components/PropertyMap.tsx
git commit -m "Wire Inter font, replace daisyUI class refs ahead of plugin removal

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 1.3: Remove daisyui / flowbite / flowbite-react packages

**Files:**
- Modify: `package.json`
- Modify: `tailwind.config.mjs`

- [ ] **Step 1: Edit `package.json`. Remove these entries from `dependencies` (flowbite, flowbite-react) and from `devDependencies` (daisyui):**

```diff
-    "flowbite": "^3.1.2",
-    "flowbite-react": "^0.12.9",
```
```diff
-    "daisyui": "^5.3.8",
```

- [ ] **Step 2: Edit `tailwind.config.mjs` — drop the daisyui plugin and the flowbite plugin import + remove the `daisyui:` config block.**

In the imports at top:
```diff
-import flowbitePlugin from 'flowbite/plugin'
-import daisyui from 'daisyui'
```

In the `plugins` array:
```diff
-  plugins: [tailwindcssAnimate, typography, flowbitePlugin, daisyui],
+  plugins: [tailwindcssAnimate, typography],
```

Delete the entire `daisyui: { themes: [...], darkTheme: 'synthwave' },` block (around lines 12–55).

- [ ] **Step 3: Reinstall dependencies inside the container.**

Run: `docker compose exec app pnpm install`
Expected: pnpm logs `dependencies removed: 3` (or similar) and no errors. Lockfile `pnpm-lock.yaml` updates on disk via the bind mount.

- [ ] **Step 4: Restart the dev server to pick up the new tailwind plugin set.**

Run: `docker compose restart app && sleep 4 && docker logs --tail 20 my_app`
Expected: `✓ Ready in <ms>` and no plugin-load errors.

- [ ] **Step 5: Commit.**

```bash
git add package.json pnpm-lock.yaml tailwind.config.mjs
git commit -m "Remove daisyui, flowbite, flowbite-react

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### Task 1.4: Rewrite globals.css with M3 tokens

**Files:**
- Modify: `src/app/(frontend)/globals.css`

- [ ] **Step 1: Replace the entire file with the new M3 token block.**

```css
@import 'leaflet/dist/leaflet.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* --- Material 3 semantic color roles (light) --- */
    --primary: 217 90% 43%;             /* #0B57D0 */
    --primary-container: 217 91% 91%;   /* #D3E3FD */
    --on-primary: 0 0% 100%;
    --on-primary-container: 217 100% 13%;
    --on-surface: 0 0% 12%;
    --on-surface-variant: 220 7% 29%;
    --error-color: 0 75% 42%;
    --on-error: 0 0% 100%;
    --surface-page: 220 100% 99%;
    --surface-container-low: 220 30% 97%;
    --surface-container: 220 19% 95%;
    --surface-container-high: 220 14% 92%;
    --surface-container-highest: 220 10% 90%;
    --outline-color: 220 11% 79%;

    /* --- Shadcn/components-ui aliases mapped to the new tokens --- */
    --background: var(--surface-page);
    --foreground: var(--on-surface);
    --card: 0 0% 100%;
    --card-foreground: var(--on-surface);
    --popover: 0 0% 100%;
    --popover-foreground: var(--on-surface);
    --primary-foreground: var(--on-primary);
    --secondary: var(--primary-container);
    --secondary-foreground: var(--on-primary-container);
    --muted: var(--surface-container);
    --muted-foreground: var(--on-surface-variant);
    --accent: var(--primary-container);
    --accent-foreground: var(--on-primary-container);
    --destructive: var(--error-color);
    --destructive-foreground: var(--on-error);
    --border: var(--outline-color);
    --input: var(--outline-color);
    --ring: var(--primary);
    --radius: 0.75rem;

    --success: 142 71% 35%;
    --warning: 38 92% 50%;
    --error: var(--error-color);
  }

  html[data-theme='dark'] {
    /* --- Dark stub palette --- */
    --primary: 213 86% 70%;
    --primary-container: 217 73% 25%;
    --on-primary: 217 100% 13%;
    --on-primary-container: 217 91% 91%;
    --on-surface: 220 10% 90%;
    --on-surface-variant: 220 10% 75%;
    --error-color: 0 87% 76%;
    --on-error: 0 100% 18%;
    --surface-page: 220 12% 8%;
    --surface-container-low: 220 12% 11%;
    --surface-container: 220 12% 13%;
    --surface-container-high: 220 11% 16%;
    --surface-container-highest: 220 10% 19%;
    --outline-color: 220 9% 45%;

    --background: var(--surface-page);
    --foreground: var(--on-surface);
    --card: var(--surface-container);
    --card-foreground: var(--on-surface);
    --popover: var(--surface-container-high);
    --popover-foreground: var(--on-surface);
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-sans), 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
    font-feature-settings: 'cv11', 'ss01';
    -webkit-font-smoothing: antialiased;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: unset;
    font-weight: unset;
  }
}

@layer utilities {
  /* M3 type scale */
  .text-display      { font-size: 2.25rem; line-height: 2.75rem; font-weight: 400; letter-spacing: -0.02em; }
  .text-headline     { font-size: 1.75rem; line-height: 2.25rem; font-weight: 400; letter-spacing: -0.01em; }
  .text-title-lg     { font-size: 1.375rem; line-height: 1.75rem; font-weight: 500; }
  .text-title        { font-size: 1rem;    line-height: 1.5rem;  font-weight: 500; }
  .text-body         { font-size: 1rem;    line-height: 1.5rem;  font-weight: 400; }
  .text-body-sm      { font-size: 0.875rem; line-height: 1.25rem; font-weight: 400; }
  .text-label        { font-size: 0.75rem; line-height: 1rem;     font-weight: 500; letter-spacing: 0.04em; }

  @media (max-width: 639px) {
    .text-headline   { font-size: 1.375rem; line-height: 1.75rem; }
  }

  /* M3 elevation tiers — composable via shadow utility */
  .shadow-e0 { box-shadow: none; }
  .shadow-e1 { box-shadow: 0 1px 2px rgba(0,0,0,.06), 0 1px 3px 1px rgba(0,0,0,.04); }
  .shadow-e2 { box-shadow: 0 1px 2px rgba(0,0,0,.08), 0 2px 6px 2px rgba(0,0,0,.06); }
  .shadow-e3 { box-shadow: 0 4px 8px 3px rgba(0,0,0,.08), 0 1px 3px rgba(0,0,0,.10); }
}
```

- [ ] **Step 2: Verify compile.**

Run: `docker logs --tail 30 my_app`
Expected: `✓ Compiled` and no PostCSS errors.

- [ ] **Step 3: Smoke the home page.**

Run: `curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/`
Expected: `200`.

Then open `http://localhost:3000/` in a browser. Existing pages will look broken in places (cards may lose styling, buttons may look off) — this is expected; we fix them in subsequent phases. The body should render with white background and Inter font (not Satoshi).

### Task 1.5: Update tailwind.config.mjs theme tokens

**Files:**
- Modify: `tailwind.config.mjs`

- [ ] **Step 1: Replace the `fontFamily` block and add `borderRadius` aliases.**

In the `theme.extend.fontFamily` block:
```diff
   fontFamily: {
-    mono: ['Satoshi', 'var(--font-geist-mono)'],
-    sans: ['Satoshi', 'var(--font-geist-sans)'],
+    mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'monospace'],
+    sans: ['var(--font-sans)', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
   },
```

In `theme.extend.borderRadius`, replace the existing block with:
```js
borderRadius: {
  sm: '4px',
  DEFAULT: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  full: '9999px',
},
```

- [ ] **Step 2: Verify compile and visual.**

Run: `docker logs --tail 20 my_app`
Expected: `✓ Compiled` with no errors.

Open `http://localhost:3000/` — body font is now Inter; cards still look unstyled, that's fine.

- [ ] **Step 3: Commit Phase 1.**

```bash
git add src/app/\(frontend\)/globals.css tailwind.config.mjs
git commit -m "Adopt Material 3 design tokens in globals.css and tailwind config

Replace daisyUI synthwave block and the dual color system with a single
M3 token block (light + dark stub). Add M3 type scale utilities and
elevation tiers. Remap Tailwind border-radius aliases to M3 shape.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 2 — Primitive retheme

All files under `src/components/ui/*` already consume the shadcn CSS variables (`--primary`, `--border`, etc.). Phase 1 redefined those variables. Phase 2 is a sweep to (1) raise minimum touch targets to 40 px, (2) standardize radii on the new shape tokens, (3) make sure each variant looks correct visually.

### Task 2.1: Button primitive

**Files:**
- Modify: `src/components/ui/button.tsx`

- [ ] **Step 1: Replace the `cva` block.**

```ts
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        clear: '',
        default: 'h-10 px-6 py-2',
        icon: 'h-10 w-10 rounded-full',
        lg: 'h-12 px-8',
        sm: 'h-9 px-4',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-e1',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-e1',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary items-start justify-start underline-offset-4 hover:underline rounded-none',
        outline: 'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        tonal: 'bg-primary-container text-on-primary-container hover:bg-primary-container/80',
      },
    },
  },
)
```

Note the new `tonal` variant uses two new utility classes (`bg-primary-container`, `text-on-primary-container`) — define them in step 2.

- [ ] **Step 2: Extend `tailwind.config.mjs` to expose the M3 container colors.**

In `theme.extend.colors`, add (next to the existing primary/secondary entries):
```js
'primary-container': 'hsl(var(--primary-container) / <alpha-value>)',
'on-primary-container': 'hsl(var(--on-primary-container) / <alpha-value>)',
'surface': 'hsl(var(--surface-page) / <alpha-value>)',
'surface-container': 'hsl(var(--surface-container) / <alpha-value>)',
'surface-container-low': 'hsl(var(--surface-container-low) / <alpha-value>)',
'surface-container-high': 'hsl(var(--surface-container-high) / <alpha-value>)',
'surface-container-highest': 'hsl(var(--surface-container-highest) / <alpha-value>)',
'outline': 'hsl(var(--outline-color) / <alpha-value>)',
```

- [ ] **Step 3: Smoke the home page.**

Run: `docker logs --tail 20 my_app`
Expected: clean compile.

### Task 2.2: Card primitive

**Files:**
- Modify: `src/components/ui/card.tsx`

- [ ] **Step 1: Bump the card radius from `rounded-lg` to `rounded-md` and replace shadow with `shadow-e1`.**

Find the root `Card` element styling. Update to:
```ts
className={cn(
  'rounded-md border border-border bg-card text-card-foreground shadow-e1',
  className,
)}
```

Leave `CardHeader`, `CardContent`, `CardFooter`, `CardTitle`, `CardDescription` styling alone.

### Task 2.3: Input, Textarea, Select primitives

**Files:**
- Modify: `src/components/ui/input.tsx`
- Modify: `src/components/ui/textarea.tsx`
- Modify: `src/components/ui/select.tsx`

- [ ] **Step 1: For `input.tsx`, find the className string in the `Input` component and set it to:**

```ts
className={cn(
  'flex h-10 min-h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  className,
)}
```

- [ ] **Step 2: For `textarea.tsx`, similar — set the className to:**

```ts
className={cn(
  'flex min-h-20 w-full rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  className,
)}
```

- [ ] **Step 3: For `select.tsx`, find the `SelectTrigger` className and update to:**

```ts
className={cn(
  'flex h-10 min-h-10 w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
  className,
)}
```

For the `SelectContent` root inside it, update its className to use `rounded-md` and `shadow-e2`.

### Task 2.4: Tabs, Pagination, Label, Checkbox, Avatar, AspectRatio

- [ ] **Step 1: Open each file under `src/components/ui/`. For any `rounded-lg` / `rounded-sm` className occurrences, replace with `rounded-md` / `rounded` per the Phase 1 shape scale. Leave logic unchanged.**

Run: `grep -rn "rounded-lg\|rounded-sm" src/components/ui/`
For each match decide: is this a button-like surface (→ `rounded-full`), a card-like surface (→ `rounded-md`), or an input (→ `rounded-md`)?

- [ ] **Step 2: Smoke compile + commit Phase 2.**

Run: `docker logs --tail 20 my_app && curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/`
Expected: clean compile, HTTP 200.

```bash
git add src/components/ui tailwind.config.mjs
git commit -m "Retheme shadcn primitives for Material 3 tokens

Bump touch targets to 40px, standardize radii on M3 shape scale, add
tonal button variant, expose primary-container/surface/outline as
Tailwind utility colors.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 3 — Shared shells

### Task 3.1: New ThemeToggle component

**Files:**
- Create: `src/components/ThemeToggle/index.tsx`

- [ ] **Step 1: Create the file.**

```tsx
'use client'

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/providers/Theme'
import { Button } from '@/components/ui/button'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={isDark ? 'Включить светлую тему' : 'Включить тёмную тему'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}
```

- [ ] **Step 2: Smoke compile.**

Run: `docker logs --tail 10 my_app`
Expected: no errors. (Component is not yet imported anywhere.)

### Task 3.2: Strip useHeaderTheme from page.client files

**Files (modify each, delete the import + the entire `useEffect` + the `useHeaderTheme()` call):**
- `src/app/(frontend)/posts/page.client.tsx`
- `src/app/(frontend)/posts/page/[pageNumber]/page.client.tsx`
- `src/app/(frontend)/posts/[slug]/page.client.tsx`
- `src/app/(frontend)/properties/page.client.tsx`
- `src/app/(frontend)/properties/[slug]/page.client.tsx`
- `src/app/(frontend)/search/page.client.tsx`
- `src/app/(frontend)/[slug]/page.client.tsx`

- [ ] **Step 1: For each file, the pattern is:**

```tsx
'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

export const PageClient: React.FC = () => {
  const { setHeaderTheme } = useHeaderTheme()
  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])
  return <React.Fragment />
}

export default PageClient
```

Replace with:

```tsx
'use client'
import React from 'react'

export const PageClient: React.FC = () => {
  return <React.Fragment />
}

export default PageClient
```

(Some files may have additional logic in `useEffect` — there shouldn't be any beyond the `setHeaderTheme` call, but verify by reading the file before edit. If you find additional logic, preserve it.)

- [ ] **Step 2: Verify by grep.**

Run: `grep -rn "useHeaderTheme\|setHeaderTheme" src/app/`
Expected: zero matches.

### Task 3.3: Strip useHeaderTheme from heros/HighImpact

**Files:**
- Modify: `src/heros/HighImpact/index.tsx`

- [ ] **Step 1: Delete the `useHeaderTheme` import, the destructuring (`const { setHeaderTheme } = useHeaderTheme()`), and the `useEffect` that calls `setHeaderTheme('dark')`. Leave all rendering logic intact.**

- [ ] **Step 2: Verify by grep.**

Run: `grep -rn "useHeaderTheme\|setHeaderTheme" src/`
Expected: matches only in `src/providers/HeaderTheme/index.tsx` and `src/Header/Component.client.tsx` (both will be cleaned next).

### Task 3.4: Delete HeaderTheme provider

**Files:**
- Delete: `src/providers/HeaderTheme/index.tsx`
- Modify: `src/providers/index.tsx`

- [ ] **Step 1: Delete the file.**

Run: `rm src/providers/HeaderTheme/index.tsx`

If the `src/providers/HeaderTheme` directory is now empty, remove it: `rmdir src/providers/HeaderTheme`.

- [ ] **Step 2: Update `src/providers/index.tsx`.**

Replace contents with:

```tsx
import React from 'react'

import { ThemeProvider } from './Theme'

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}
```

- [ ] **Step 3: Verify by grep.**

Run: `grep -rn "useHeaderTheme\|HeaderTheme" src/`
Expected: zero matches.

- [ ] **Step 4: Smoke.**

Run: `docker logs --tail 30 my_app && curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/`
Expected: clean compile + HTTP 200.

### Task 3.5: Delete ThemeSelector (replaced by ThemeToggle)

**Files:**
- Delete: `src/providers/Theme/ThemeSelector/index.tsx`
- Delete: `src/providers/Theme/ThemeSelector/types.ts` if present

- [ ] **Step 1: Confirm no remaining imports of `ThemeSelector`.**

Run: `grep -rn "ThemeSelector" src/`
Expected: only the file itself (about to be deleted) and possibly the current Footer (will be rewritten in Task 3.7).

- [ ] **Step 2: Delete the file(s).**

```bash
rm src/providers/Theme/ThemeSelector/index.tsx
rm -f src/providers/Theme/ThemeSelector/types.ts
rmdir src/providers/Theme/ThemeSelector 2>/dev/null || true
```

If `src/providers/Theme/ThemeSelector/types.ts` exports `themeLocalStorageKey` that's used elsewhere, move that constant into `src/providers/Theme/types.ts` (parent directory) and update any imports before deletion. Verify with: `grep -rn "themeLocalStorageKey" src/`.

- [ ] **Step 3: Verify compile (Footer still imports `ThemeSelector` at this point — compile will fail until Task 3.7 rewrites Footer). If the dev server is in an error state, skip the verify and proceed directly to Task 3.6.**

### Task 3.6: Rebuild Header

**Files:**
- Modify: `src/Header/Component.client.tsx`
- Modify: `src/Header/Nav/index.tsx`
- Create: `src/Header/MobileNav.tsx`

- [ ] **Step 1: Read the existing `src/Header/Nav/index.tsx` to understand the data shape it receives from the Payload `header` global.**

Run: `cat src/Header/Nav/index.tsx`

- [ ] **Step 2: Rewrite `src/Header/Component.client.tsx` to the new M3 app bar:**

```tsx
'use client'
import Link from 'next/link'
import React from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from '@/components/ThemeToggle'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="container h-16 md:h-16 flex items-center justify-between gap-4">
        <Link href="/" aria-label="Home">
          <Logo loading="eager" priority="high" className="text-primary" />
        </Link>
        <div className="hidden md:block">
          <HeaderNav data={data} />
        </div>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <div className="md:hidden">
            <MobileNav data={data} />
          </div>
        </div>
      </div>
    </header>
  )
}
```

- [ ] **Step 3: Rewrite `src/Header/Nav/index.tsx` for the desktop nav with active-route underline.**

```tsx
'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/utilities/ui'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []

  return (
    <nav className="flex items-center gap-1">
      {navItems.map(({ link }, i) => {
        const href = link?.url || (typeof link?.reference?.value === 'object' ? `/${link.reference.value.slug}` : '/')
        const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={cn(
              'px-3 py-2 text-body-sm font-medium rounded-full hover:bg-surface-container-low transition-colors',
              isActive ? 'text-primary' : 'text-on-surface-variant',
            )}
          />
        )
      })}
    </nav>
  )
}
```

(If the existing `CMSLink` API differs — e.g. it doesn't accept `appearance` or `className` — fall back to a plain `<Link>` element built from `link.url` / `link.label`. Inspect the existing `CMSLink` in `src/components/Link/index.tsx` before this step.)

- [ ] **Step 4: Create `src/Header/MobileNav.tsx` — Radix Dialog drawer.**

```tsx
'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

export const MobileNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const pathname = usePathname()
  const navItems = data?.navItems || []
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => { setOpen(false) }, [pathname])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="ghost" size="icon" aria-label="Открыть меню">
          <Menu className="h-5 w-5" />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed right-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-surface-container-low p-6 shadow-e3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-title-lg">Меню</Dialog.Title>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Закрыть меню">
                <X className="h-5 w-5" />
              </Button>
            </Dialog.Close>
          </div>
          <nav className="flex flex-col gap-1">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className={cn(
                  'px-3 py-3 text-body font-medium rounded-md hover:bg-surface-container transition-colors',
                  'text-on-surface',
                )}
              />
            ))}
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
```

- [ ] **Step 5: Verify `@radix-ui/react-dialog` is in dependencies.**

Run: `grep '"@radix-ui/react-dialog"' package.json`
If absent, add it: `docker compose exec app pnpm add @radix-ui/react-dialog`.

- [ ] **Step 6: Smoke.**

Run: `docker logs --tail 30 my_app && curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/`
Expected: clean compile + HTTP 200.

Open `http://localhost:3000/` in browser. Verify:
- Header is sticky, white background, hairline bottom border (no backdrop-blur).
- Nav items render to the right of the logo.
- Resize browser below 768 px width — desktop nav hides, hamburger icon appears.
- Click hamburger — drawer slides in from the right.
- Click theme toggle — `html` element gets `data-theme="dark"` attribute; click again returns to light.

### Task 3.7: Rebuild Footer

**Files:**
- Modify: `src/Footer/Component.tsx`

- [ ] **Step 1: Replace the file contents with:**

```tsx
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeToggle } from '@/components/ThemeToggle'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-16 border-t border-border bg-surface-container">
      <div className="container py-10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <Link className="flex items-center" href="/">
            <Logo />
          </Link>
          <nav className="flex flex-wrap gap-1">
            {navItems.map(({ link }, i) => (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className="px-3 py-2 text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
              />
            ))}
          </nav>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-4 border-t border-border">
          <p className="text-body-sm text-on-surface-variant">© {new Date().getFullYear()} Realty</p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Verify by visiting `http://localhost:3000/` and scrolling to the footer.**

Expected: subtle gray surface, logo + links on top row, copyright + theme toggle on bottom row, separated by a hairline border.

### Task 3.8: Restyle Logo

**Files:**
- Modify: `src/components/Logo/Logo.tsx`

- [ ] **Step 1: Open the file and locate any hard-coded `text-gray-900` / `text-white` color classes. Replace with `text-current` so the logo inherits its parent color (which is `text-primary` in the header).**

- [ ] **Step 2: If the logo wordmark has a specific font class (likely Satoshi-related), remove it so it inherits Inter from `body`. If you want a tighter wordmark, add `font-medium tracking-tight`.**

### Task 3.9: SearchBar component

**Files:**
- Create: `src/components/SearchBar/index.tsx`

- [ ] **Step 1: Create the file.**

```tsx
'use client'
import React from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/utilities/ui'

interface SearchBarProps {
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
  onSubmit?: (v: string) => void
  className?: string
  submitLabel?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Поиск',
  value,
  onChange,
  onSubmit,
  className,
  submitLabel = 'Найти',
}) => {
  const [internal, setInternal] = React.useState(value ?? '')
  const current = value ?? internal

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit?.(current)
      }}
      className={cn(
        'flex items-center gap-2 bg-card rounded-full px-4 py-2 shadow-e1 focus-within:shadow-e2 transition-shadow',
        className,
      )}
    >
      <Search className="h-5 w-5 text-on-surface-variant flex-shrink-0" />
      <input
        type="text"
        placeholder={placeholder}
        value={current}
        onChange={(e) => {
          setInternal(e.target.value)
          onChange?.(e.target.value)
        }}
        className="flex-1 bg-transparent border-0 outline-none text-body text-on-surface placeholder:text-on-surface-variant min-w-0"
      />
      <button
        type="submit"
        className="bg-primary text-primary-foreground rounded-full px-5 py-1.5 text-body-sm font-medium hover:bg-primary/90 transition-colors flex-shrink-0"
      >
        {submitLabel}
      </button>
    </form>
  )
}
```

### Task 3.10: FilterChips component

**Files:**
- Create: `src/components/FilterChips/index.tsx`

- [ ] **Step 1: Create the file.**

```tsx
'use client'
import React from 'react'
import { cn } from '@/utilities/ui'

export interface ChipOption {
  value: string
  label: string
}

interface FilterChipsProps {
  options: ChipOption[]
  value: string
  onChange: (v: string) => void
  className?: string
  ariaLabel?: string
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  options,
  value,
  onChange,
  className,
  ariaLabel,
}) => {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className={cn('flex flex-wrap gap-2', className)}>
      {options.map((opt) => {
        const active = opt.value === value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              'px-4 py-1.5 rounded-full text-body-sm font-medium transition-colors border',
              active
                ? 'bg-primary-container text-on-primary-container border-transparent'
                : 'bg-card text-on-surface-variant border-border hover:bg-surface-container-low',
            )}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
```

### Task 3.11: PropertyCard component

**Files:**
- Create: `src/components/PropertyCard/index.tsx`

- [ ] **Step 1: Create the file.**

```tsx
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/utilities/ui'

export interface PropertyCardProps {
  href: string
  title: string
  address?: string
  imageUrl?: string | null
  badge?: string
  price?: number
  priceSuffix?: string
  meta?: Array<{ label: string }>
  className?: string
}

const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

export const PropertyCard: React.FC<PropertyCardProps> = ({
  href,
  title,
  address,
  imageUrl,
  badge,
  price,
  priceSuffix,
  meta,
  className,
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'group block bg-card rounded-md overflow-hidden shadow-e1 hover:shadow-e2 transition-shadow',
        className,
      )}
    >
      <div className="relative aspect-[16/10] bg-surface-container">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        ) : null}
        {badge ? (
          <span className="absolute top-3 left-3 bg-card/95 text-primary text-label px-2.5 py-1 rounded-full uppercase tracking-wide">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="p-4">
        <h3 className="text-title text-on-surface line-clamp-1">{title}</h3>
        {address ? (
          <p className="text-body-sm text-on-surface-variant mt-0.5 line-clamp-1">{address}</p>
        ) : null}
        {typeof price === 'number' ? (
          <p className="text-title-lg text-primary mt-2">
            {formatPrice(price)}
            {priceSuffix ? (
              <span className="text-body-sm text-on-surface-variant font-normal"> {priceSuffix}</span>
            ) : null}
          </p>
        ) : null}
        {meta && meta.length > 0 ? (
          <ul className="mt-2 flex flex-wrap gap-3 text-body-sm text-on-surface-variant">
            {meta.map((m, i) => (
              <li key={i}>{m.label}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </Link>
  )
}
```

- [ ] **Step 2: Smoke + commit Phase 3.**

Run: `docker logs --tail 30 my_app && curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/`
Expected: clean compile + HTTP 200.

```bash
git add src/Header src/Footer src/components/Logo src/components/ThemeToggle src/components/SearchBar src/components/FilterChips src/components/PropertyCard src/providers src/heros/HighImpact src/app/\(frontend\)/posts src/app/\(frontend\)/properties src/app/\(frontend\)/search src/app/\(frontend\)/\[slug\] package.json pnpm-lock.yaml
git commit -m "Rebuild Header/Footer in Material 3 and add shared shells

- Header: M3 sticky top app bar with mobile drawer (Radix Dialog),
  drops backdrop-blur and dual header-theme machinery.
- Footer: light surface-container with two-row layout, ThemeToggle in
  the small print row.
- Drop useHeaderTheme provider and remove all consumers.
- Replace ThemeSelector (auto/light/dark) with simple ThemeToggle.
- Add reusable SearchBar, FilterChips, PropertyCard, ThemeToggle.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 4 — Realestate consolidation

### Task 4.1: PropertyFilters component (unified, schema-driven)

**Files:**
- Create: `src/components/PropertyFilters/index.tsx`
- Create: `src/components/PropertyFilters/schemas.ts`

- [ ] **Step 1: Create `schemas.ts` with the four per-type field definitions, exactly preserving the URL param names from the existing filter files (`rooms`, `transactionType`, `minPrice`, `maxPrice`, `minArea`, `maxArea`, `city`, `district` for flats; `transactionType`, `commercialType` for commercial; `landType`, `hasUtilities` for lands; `status`, `type` for residential-complexes).**

```ts
export type FilterFieldType = 'select' | 'number' | 'text'

export interface FilterField {
  key: string
  label: string
  type: FilterFieldType
  options?: Array<{ value: string; label: string }>
  placeholder?: string
}

export type PropertyType = 'flats' | 'commercial' | 'lands' | 'residential-complexes'

export const FILTER_SCHEMAS: Record<PropertyType, FilterField[]> = {
  flats: [
    { key: 'city', label: 'Город', type: 'text', placeholder: 'Москва' },
    { key: 'district', label: 'Район', type: 'text', placeholder: 'Любой' },
    {
      key: 'rooms', label: 'Комнаты', type: 'select',
      options: [
        { value: 'all', label: 'Любое' },
        { value: 'studio', label: 'Студия' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5plus', label: '5+' },
      ],
    },
    {
      key: 'transactionType', label: 'Сделка', type: 'select',
      options: [
        { value: 'all', label: 'Любая' },
        { value: 'sale', label: 'Продажа' },
        { value: 'rent', label: 'Аренда' },
      ],
    },
    { key: 'minPrice', label: 'Цена от', type: 'number', placeholder: '₽' },
    { key: 'maxPrice', label: 'Цена до', type: 'number', placeholder: '₽' },
  ],
  commercial: [
    {
      key: 'transactionType', label: 'Сделка', type: 'select',
      options: [
        { value: 'all', label: 'Любая' },
        { value: 'sale', label: 'Продажа' },
        { value: 'rent', label: 'Аренда' },
      ],
    },
    {
      key: 'commercialType', label: 'Тип', type: 'select',
      options: [
        { value: 'all', label: 'Любой' },
        { value: 'office', label: 'Офис' },
        { value: 'retail', label: 'Торговое' },
        { value: 'warehouse', label: 'Склад' },
        { value: 'free-purpose', label: 'Своб. назначения' },
        { value: 'catering', label: 'Общепит' },
      ],
    },
  ],
  lands: [
    {
      key: 'landType', label: 'Назначение', type: 'select',
      options: [
        { value: 'all', label: 'Любое' },
        { value: 'residential', label: 'ИЖС' },
        { value: 'agricultural', label: 'Сельхоз' },
        { value: 'industrial', label: 'Промназначения' },
        { value: 'commercial', label: 'Коммерческое' },
      ],
    },
    {
      key: 'hasUtilities', label: 'Коммуникации', type: 'select',
      options: [
        { value: 'all', label: 'Любые' },
        { value: 'yes', label: 'Есть' },
        { value: 'no', label: 'Нет' },
      ],
    },
  ],
  'residential-complexes': [
    {
      key: 'status', label: 'Статус', type: 'select',
      options: [
        { value: 'all', label: 'Любой' },
        { value: 'planned', label: 'В планах' },
        { value: 'under-construction', label: 'Строится' },
        { value: 'completed', label: 'Сдан' },
      ],
    },
    {
      key: 'type', label: 'Тип', type: 'select',
      options: [
        { value: 'all', label: 'Любой' },
        { value: 'apartment', label: 'Многоквартирный' },
        { value: 'townhouse', label: 'Таунхаусы' },
        { value: 'cottage', label: 'Коттеджный' },
      ],
    },
  ],
}
```

Note: `residential-complexes` status/type values are best-effort defaults; verify against the existing `ResidentialComplexFilter` (which only used `'all' | <something>`) before commit. If the existing filter exposed different option values, replace here.

- [ ] **Step 2: Create `src/components/PropertyFilters/index.tsx` — the unified component.**

```tsx
'use client'
import React from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { FILTER_SCHEMAS, type PropertyType } from './schemas'
import { Button } from '@/components/ui/button'

export const PropertyFilters: React.FC<{ type: PropertyType }> = ({ type }) => {
  const schema = FILTER_SCHEMAS[type]
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [draft, setDraft] = React.useState<Record<string, string>>(() => {
    const init: Record<string, string> = {}
    for (const f of schema) init[f.key] = searchParams.get(f.key) ?? (f.type === 'select' ? 'all' : '')
    return init
  })

  React.useEffect(() => {
    const next: Record<string, string> = {}
    for (const f of schema) next[f.key] = searchParams.get(f.key) ?? (f.type === 'select' ? 'all' : '')
    setDraft(next)
  }, [searchParams, schema])

  const apply = () => {
    const params = new URLSearchParams()
    for (const [k, v] of Object.entries(draft)) {
      if (v && v !== 'all') params.set(k, v)
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); apply() }}
      className="bg-card rounded-md shadow-e1 p-4 grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))_auto] lg:items-end"
    >
      {schema.map((f) => (
        <label key={f.key} className="flex flex-col gap-1 min-w-0">
          <span className="text-label text-on-surface-variant uppercase">{f.label}</span>
          {f.type === 'select' ? (
            <select
              value={draft[f.key] ?? 'all'}
              onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
              className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {f.options!.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          ) : (
            <input
              type={f.type === 'number' ? 'number' : 'text'}
              placeholder={f.placeholder}
              value={draft[f.key] ?? ''}
              onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}
              className="h-10 min-h-10 rounded-md border border-border bg-background px-3 text-body-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          )}
        </label>
      ))}
      <Button type="submit" className="sm:col-span-2 lg:col-span-1">Найти</Button>
    </form>
  )
}
```

### Task 4.2: PropertyListingPage template

**Files:**
- Create: `src/components/PropertyListingPage/index.tsx`

- [ ] **Step 1: Create the file.**

```tsx
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyCard } from '@/components/PropertyCard'
import { PropertyFilters } from '@/components/PropertyFilters'
import { PropertyMap } from '@/components/PropertyMap.tsx'
import { formatMapItems } from '@/lib/mapItems'
import type { PropertyType } from '@/components/PropertyFilters/schemas'

interface Props {
  type: PropertyType
  title: string
  searchParams: Record<string, string | undefined>
  mapBaseUrl: string
}

const COLLECTION_MAP: Record<PropertyType, string> = {
  flats: 'flats',
  commercial: 'commercial',
  lands: 'lands',
  'residential-complexes': 'residential-complexes',
}

const buildWhere = (type: PropertyType, sp: Record<string, string | undefined>) => {
  const where: any = {}
  if (type !== 'residential-complexes') {
    where.status = { equals: 'active' }
  }
  if (sp.city) where['location.city'] = { equals: sp.city }
  if (sp.district) where['location.district'] = { equals: sp.district }
  if (sp.rooms && sp.rooms !== 'all') where.rooms = { equals: sp.rooms }
  if (sp.transactionType && sp.transactionType !== 'all')
    where.transactionType = { equals: sp.transactionType }
  if (sp.minPrice) where.price = { ...(where.price || {}), greater_than_equal: parseInt(sp.minPrice, 10) }
  if (sp.maxPrice) where.price = { ...(where.price || {}), less_than_equal: parseInt(sp.maxPrice, 10) }
  if (sp.commercialType && sp.commercialType !== 'all') where.commercialType = { equals: sp.commercialType }
  if (sp.landType && sp.landType !== 'all') where.landType = { equals: sp.landType }
  if (sp.hasUtilities && sp.hasUtilities !== 'all') where.hasUtilities = { equals: sp.hasUtilities === 'yes' }
  if (type === 'residential-complexes') {
    if (sp.status && sp.status !== 'all') where.status = { equals: sp.status }
    if (sp.type && sp.type !== 'all') where.type = { equals: sp.type }
  }
  return where
}

const pickBadge = (doc: any, type: PropertyType): string | undefined => {
  if (type === 'residential-complexes') return undefined
  if (doc.transactionType === 'sale') return 'Продажа'
  if (doc.transactionType === 'rent') return 'Аренда'
  return undefined
}

const pickMeta = (doc: any, type: PropertyType) => {
  if (type === 'flats') {
    return [
      doc.rooms === 'studio' ? { label: 'Студия' } : doc.rooms ? { label: `${doc.rooms} комн.` } : null,
      doc.floorInfo?.floor ? { label: `${doc.floorInfo.floor}/${doc.floorInfo.totalFloors} эт.` } : null,
      doc.area?.total ? { label: `${doc.area.total} м²` } : null,
    ].filter(Boolean) as Array<{ label: string }>
  }
  if (type === 'lands') {
    return [doc.area?.total ? { label: `${doc.area.total} сот.` } : null].filter(Boolean) as Array<{ label: string }>
  }
  if (type === 'commercial') {
    return [doc.commercialType ? { label: String(doc.commercialType) } : null, doc.area?.total ? { label: `${doc.area.total} м²` } : null].filter(Boolean) as Array<{ label: string }>
  }
  return []
}

export const PropertyListingPage: React.FC<Props> = async ({ type, title, searchParams, mapBaseUrl }) => {
  const payload = await getPayload({ config })
  const where = buildWhere(type, searchParams)
  const result = await payload.find({
    collection: COLLECTION_MAP[type],
    where,
    sort: '-createdAt',
    limit: 20,
    depth: 2,
  })

  const mapItems = formatMapItems(result.docs)

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between flex-wrap gap-2">
        <h1 className="text-headline text-on-surface">{title}</h1>
        <p className="text-body-sm text-on-surface-variant">{result.totalDocs} объектов</p>
      </header>

      <PropertyFilters type={type} />

      {result.docs.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {result.docs.map((doc: any) => {
            const href = `/${type}/${doc.slug}`
            const imageUrl = doc.images?.[0]?.image?.url ?? null
            return (
              <PropertyCard
                key={doc.id}
                href={href}
                title={doc.title}
                address={doc.location?.address}
                imageUrl={imageUrl}
                badge={pickBadge(doc, type)}
                price={doc.price}
                priceSuffix={doc.transactionType === 'rent' ? '/ мес' : undefined}
                meta={pickMeta(doc, type)}
              />
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-card rounded-md shadow-e1">
          <p className="text-body text-on-surface-variant">Объекты не найдены</p>
        </div>
      )}

      {mapItems.length > 0 ? (
        <div className="bg-card rounded-md shadow-e1 p-4">
          <h2 className="text-title-lg text-on-surface mb-3">{title} на карте</h2>
          <PropertyMap title={`${title} на карте`} items={mapItems} baseUrl={mapBaseUrl} />
        </div>
      ) : null}
    </div>
  )
}
```

If `formatMapItems` is not exported from `@/lib/mapItems`, fall back to inline mapping; verify with `cat src/lib/mapItems.ts` before this step.

### Task 4.3: PropertyDetailPage template

**Files:**
- Create: `src/components/PropertyDetailPage/index.tsx`

- [ ] **Step 1: Read the existing detail page to copy its data fetching shape.**

Run: `cat "src/app/(frontend)/(realestate)/flats/[slug]/page.tsx"`

- [ ] **Step 2: Create the file with a structure that consumes any property doc and renders it. Use the existing `ImageGallery`, `PropertyDetails`, `RelatedProperties`, `PropertyMap`, `RealtorReviewForm` components — we'll restyle those next.**

```tsx
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ImageGallery from '@/components/ImageGallery'
import RichText from '@/components/RichText'
import { RealtorReviewForm } from '@/components/Forms/RealtorReviewForm'
import { PropertyMap } from '@/components/PropertyMap.tsx'
import { formatMapItems } from '@/lib/mapItems'
import type { PropertyType } from '@/components/PropertyFilters/schemas'

const COLLECTION_MAP: Record<PropertyType, string> = {
  flats: 'flats',
  commercial: 'commercial',
  lands: 'lands',
  'residential-complexes': 'residential-complexes',
}

const TYPE_LABEL: Record<PropertyType, string> = {
  flats: 'Квартиры',
  commercial: 'Коммерческая',
  lands: 'Участки',
  'residential-complexes': 'ЖК',
}

interface Props {
  type: PropertyType
  slug: string
}

export const PropertyDetailPage: React.FC<Props> = async ({ type, slug }) => {
  const payload = await getPayload({ config })

  const found = await payload.find({
    collection: COLLECTION_MAP[type],
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  if (!found.docs.length) notFound()
  const data: any = found.docs[0]

  let reviews: any[] = []
  if (data.realtor?.id) {
    const rv = await payload.find({
      collection: 'reviews',
      where: { realtor: { equals: data.realtor.id }, status: { equals: 'approved' } },
      sort: '-createdAt',
    })
    reviews = rv.docs
  }

  const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

  return (
    <article className="max-w-6xl mx-auto space-y-6">
      <nav aria-label="breadcrumb" className="flex items-center gap-1 text-body-sm text-on-surface-variant">
        <Link href="/" className="hover:text-on-surface">Главная</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/${type}`} className="hover:text-on-surface">{TYPE_LABEL[type]}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-on-surface line-clamp-1">{data.title}</span>
      </nav>

      <header className="bg-card rounded-md shadow-e1 p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-headline text-on-surface">{data.title}</h1>
          {data.location?.address ? (
            <p className="text-body text-on-surface-variant mt-1">{data.location.address}</p>
          ) : null}
        </div>
        {typeof data.price === 'number' ? (
          <div className="md:text-right">
            <div className="text-headline text-primary">{formatPrice(data.price)}</div>
            {data.transactionType === 'rent' ? (
              <div className="text-body-sm text-on-surface-variant">в месяц</div>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {data.images?.length ? <ImageGallery images={data.images} /> : null}

          {data.description ? (
            <section className="bg-card rounded-md shadow-e1 p-6">
              <h2 className="text-title-lg text-on-surface mb-3">Описание</h2>
              <RichText data={data.description} />
            </section>
          ) : null}
        </div>

        <aside className="space-y-6">
          {data.realtor ? (
            <section className="bg-card rounded-md shadow-e1 p-6">
              <h2 className="text-title-lg text-on-surface mb-3">Риэлтор</h2>
              <p className="text-body text-on-surface">{data.realtor.name}</p>
              {data.realtor.phone ? (
                <p className="text-body-sm text-on-surface-variant mt-1">{data.realtor.phone}</p>
              ) : null}
            </section>
          ) : null}

          <section className="bg-card rounded-md shadow-e1 p-6">
            <h2 className="text-title-lg text-on-surface mb-3">Оставить отзыв</h2>
            {data.realtor?.id ? (
              <RealtorReviewForm realtorId={data.realtor.id} />
            ) : (
              <p className="text-body-sm text-on-surface-variant">Риэлтор не указан.</p>
            )}
          </section>
        </aside>
      </div>

      {data.location?.coordinates ? (
        <section className="bg-card rounded-md shadow-e1 p-4">
          <h2 className="text-title-lg text-on-surface mb-3 px-2">На карте</h2>
          <PropertyMap title={data.title} items={formatMapItems([data])} baseUrl={`/${type}`} />
        </section>
      ) : null}
    </article>
  )
}
```

Note: the existing detail page renders a "Характеристики" (features) block per property type. The current code reads `data.rooms`, `data.area`, `data.floorInfo`, etc. — same shape across types. This template intentionally drops that block to a separate restyled `PropertyDetails` component (Task 4.9). If `PropertyDetails` is already used in the current page and renders correctly, import it here and slot it in.

### Task 4.4: Convert flats listing route to thin wrapper

**Files:**
- Modify: `src/app/(frontend)/(realestate)/flats/page.tsx`

- [ ] **Step 1: Replace the file contents with:**

```tsx
import { PropertyListingPage } from '@/components/PropertyListingPage'

export default async function FlatsListingRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  return (
    <PropertyListingPage
      type="flats"
      title="Квартиры"
      searchParams={sp}
      mapBaseUrl="/flats"
    />
  )
}
```

- [ ] **Step 2: Smoke.**

Run: `curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/flats`
Expected: HTTP 200.

Open `http://localhost:3000/flats` in browser. Verify:
- Page renders with new card grid.
- Filter bar appears above the grid.
- Map renders below (if coordinates exist).
- Apply a filter (e.g. select "Студия" in Комнаты, click Найти) — URL gets `?rooms=studio` and grid filters.

### Task 4.5: Convert commercial listing route

**Files:**
- Modify: `src/app/(frontend)/(realestate)/commercial/page.tsx`

- [ ] **Step 1: Replace the file contents with the same pattern, `type="commercial"`, `title="Коммерческая"`, `mapBaseUrl="/commercial"`.**

```tsx
import { PropertyListingPage } from '@/components/PropertyListingPage'

export default async function CommercialListingRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  return (
    <PropertyListingPage
      type="commercial"
      title="Коммерческая"
      searchParams={sp}
      mapBaseUrl="/commercial"
    />
  )
}
```

- [ ] **Step 2: Smoke `http://localhost:3000/commercial` (HTTP 200, page renders).**

### Task 4.6: Convert lands listing route

**Files:**
- Modify: `src/app/(frontend)/(realestate)/lands/page.tsx`

- [ ] **Step 1: Replace contents.**

```tsx
import { PropertyListingPage } from '@/components/PropertyListingPage'

export default async function LandsListingRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  return (
    <PropertyListingPage
      type="lands"
      title="Земельные участки"
      searchParams={sp}
      mapBaseUrl="/lands"
    />
  )
}
```

- [ ] **Step 2: Smoke `http://localhost:3000/lands`.**

### Task 4.7: Convert residential-complexes listing route

**Files:**
- Modify: `src/app/(frontend)/(realestate)/residential-complexes/page.tsx`

- [ ] **Step 1: Replace contents.**

```tsx
import { PropertyListingPage } from '@/components/PropertyListingPage'

export default async function ComplexesListingRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  return (
    <PropertyListingPage
      type="residential-complexes"
      title="Жилые комплексы"
      searchParams={sp}
      mapBaseUrl="/residential-complexes"
    />
  )
}
```

- [ ] **Step 2: Smoke `http://localhost:3000/residential-complexes`.**

### Task 4.8: Convert four detail routes to thin wrappers

**Files (modify each):**
- `src/app/(frontend)/(realestate)/flats/[slug]/page.tsx`
- `src/app/(frontend)/(realestate)/commercial/[slug]/page.tsx`
- `src/app/(frontend)/(realestate)/lands/[slug]/page.tsx`
- `src/app/(frontend)/(realestate)/residential-complexes/[slug]/page.tsx`

- [ ] **Step 1: For each, replace contents with:**

```tsx
import { PropertyDetailPage } from '@/components/PropertyDetailPage'

export default async function DetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PropertyDetailPage type="flats" slug={slug} />
}
```

Substitute `type=` per route (`flats`, `commercial`, `lands`, `residential-complexes`).

- [ ] **Step 2: Smoke each detail route by visiting a known slug.**

Pick a slug from each collection via `docker compose exec app pnpm payload ...` if needed, or just hit known seeded slugs. Verify HTTP 200 and the page renders with breadcrumb, title+price card, gallery, sidebar.

### Task 4.9: Restyle PropertyDetails component

**Files:**
- Modify: `src/components/PropertyDetails/index.tsx`

- [ ] **Step 1: Open the file. Replace all card wrappers with `bg-card rounded-md shadow-e1 p-6`. Replace `text-gray-*` colors with `text-on-surface` / `text-on-surface-variant`. Replace ad-hoc font-bold text with `text-title-lg` / `text-title` / `text-body`.**

The component renders feature grids ("Характеристики") — preserve the data structure and only swap the visual classes.

- [ ] **Step 2: Smoke any detail page renders the features grid in the new style.**

### Task 4.10: Restyle PropertyGallery & ImageGallery

**Files:**
- Modify: `src/components/PropertyGallery/index.tsx`
- Modify: `src/components/ImageGallery/index.tsx`

- [ ] **Step 1: For both, set the outer container to `bg-card rounded-md shadow-e1 overflow-hidden`. Thumbnail strip uses `gap-2` and thumbnails get `rounded` (8 px). Hover overlays use `bg-on-surface/40`.**

- [ ] **Step 2: Smoke detail page galleries.**

### Task 4.11: Restyle RelatedProperties

**Files:**
- Modify: `src/components/RelatedProperties/index.tsx`

- [ ] **Step 1: Replace any inline card markup with `<PropertyCard>` from `src/components/PropertyCard`. Mirror the prop mapping done in `PropertyListingPage`.**

### Task 4.12: Restyle RealtorReviewForm

**Files:**
- Modify: `src/components/Forms/RealtorReviewForm.tsx`

- [ ] **Step 1: Replace any remaining inputs/textareas with `<Input>` / `<Textarea>` from `src/components/ui/*`. Submit button uses `<Button>`. Outer form wrapper: `space-y-4`.**

### Task 4.13: Normalize PropertyMap dual-file

**Files:**
- Delete: `src/components/PropertyMap.tsx` (the file, not the folder)
- Modify import paths to point at `@/components/PropertyMap.tsx` (the folder, which has `index.tsx`)

- [ ] **Step 1: Check which is currently imported.**

Run: `grep -rn "from '@/components/PropertyMap" src/`
Note which path is used. The folder version (`src/components/PropertyMap.tsx/index.tsx`) is the active one because TypeScript resolves the folder over the same-name file when both exist; but the existence of both is confusing.

- [ ] **Step 2: If both the file and the folder exist with the same name, that's invalid on case-insensitive filesystems. Rename the folder to `src/components/PropertyMap` (drop the `.tsx`), keep `index.tsx` inside. Update all imports.**

```bash
# Move folder
mv "src/components/PropertyMap.tsx" "src/components/PropertyMap.tmp"
mv "src/components/PropertyMap.tmp" "src/components/PropertyMap"
# Remove duplicate file if it exists:
# (verify with `ls src/components/PropertyMap*` first)
```

- [ ] **Step 3: Update every import.**

Run: `grep -rn "from '@/components/PropertyMap" src/ | wc -l`
Edit each file: `from '@/components/PropertyMap.tsx'` → `from '@/components/PropertyMap'`.

- [ ] **Step 4: Smoke compile.**

### Task 4.14: Update (realestate) group layout

**Files:**
- Modify: `src/app/(frontend)/(realestate)/layout.tsx`

- [ ] **Step 1: Replace file contents with:**

```tsx
export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <main className="container py-8">{children}</main>
    </div>
  )
}
```

Note: the inline nav is dropped — those links should be present in the global Payload `header` (the user will add them in admin). If you want to keep them inline as a temporary measure until the user updates the global, render a `<FilterChips>`-style rail above `{children}` with hard-coded routes.

### Task 4.15: Delete old per-type Filter files

**Files:**
- Delete: `src/components/Filters/CommercialFilter.tsx`
- Delete: `src/components/Filters/LandFilter.tsx`
- Delete: `src/components/Filters/ResidentialComplexFilter.tsx`
- Delete: `src/components/Filters/UnifiedFilter.tsx`
- Delete: `src/components/FlatFilters/index.tsx`

- [ ] **Step 1: Confirm no remaining imports.**

Run: `grep -rn "FlatFilters\|CommercialFilter\|LandFilter\|ResidentialComplexFilter\|UnifiedFilter" src/`
Expected: zero matches.

- [ ] **Step 2: Delete.**

```bash
rm src/components/Filters/CommercialFilter.tsx
rm src/components/Filters/LandFilter.tsx
rm src/components/Filters/ResidentialComplexFilter.tsx
rm src/components/Filters/UnifiedFilter.tsx
rm src/components/FlatFilters/index.tsx
rmdir src/components/Filters src/components/FlatFilters 2>/dev/null || true
```

- [ ] **Step 3: Smoke.**

Run: `docker logs --tail 30 my_app && curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:3000/flats`
Expected: clean compile + HTTP 200.

### Task 4.16: Commit Phase 4

- [ ] **Step 1: Stage and commit.**

```bash
git add src/components/PropertyFilters src/components/PropertyListingPage src/components/PropertyDetailPage src/components/PropertyCard src/components/PropertyGallery src/components/PropertyDetails src/components/ImageGallery src/components/RelatedProperties src/components/Forms src/components/PropertyMap src/components/Filters src/components/FlatFilters src/app/\(frontend\)/\(realestate\)
git commit -m "Consolidate realestate listings and details into shared templates

- New PropertyListingPage + PropertyDetailPage templates parameterized
  by property type.
- New PropertyFilters with per-type field schemas — replaces the four
  duplicated filter components.
- Four listing routes and four detail routes shrink to thin wrappers.
- Realestate group layout uses bg-surface; inline nav moved to global
  Payload header.
- Restyle PropertyDetails, PropertyGallery, ImageGallery,
  RelatedProperties, RealtorReviewForm to Material 3 surfaces.
- Normalize PropertyMap dual-file into a single folder.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

## Phase 5 — Homepage and remaining pages

### Task 5.1: HomeHero component

**Files:**
- Create: `src/components/HomeHero/index.tsx`

- [ ] **Step 1: Create the file.**

```tsx
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { SearchBar } from '@/components/SearchBar'
import { FilterChips } from '@/components/FilterChips'

const SECTION_OPTIONS = [
  { value: 'flats', label: 'Квартиры' },
  { value: 'commercial', label: 'Коммерческая' },
  { value: 'lands', label: 'Участки' },
  { value: 'residential-complexes', label: 'ЖК' },
]

export const HomeHero: React.FC = () => {
  const router = useRouter()
  const [section, setSection] = React.useState('flats')
  const [query, setQuery] = React.useState('')

  const submit = () => {
    const qs = query ? `?city=${encodeURIComponent(query)}` : ''
    router.push(`/${section}${qs}`)
  }

  return (
    <section className="space-y-4">
      <h1 className="text-display text-on-surface">Найдите свою недвижимость</h1>
      <SearchBar
        placeholder="Город, район, ЖК…"
        value={query}
        onChange={setQuery}
        onSubmit={submit}
      />
      <FilterChips
        ariaLabel="Раздел"
        options={SECTION_OPTIONS}
        value={section}
        onChange={setSection}
      />
    </section>
  )
}
```

### Task 5.2: RecentProperties component

**Files:**
- Create: `src/components/RecentProperties/index.tsx`

- [ ] **Step 1: Create the file (server component).**

```tsx
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyCard } from '@/components/PropertyCard'

export const RecentProperties: React.FC = async () => {
  const payload = await getPayload({ config })
  const flats = await payload.find({
    collection: 'flats',
    limit: 4,
    where: { status: { equals: 'active' } },
    sort: '-createdAt',
    depth: 2,
  })

  if (!flats.docs.length) return null

  return (
    <section className="space-y-4">
      <h2 className="text-title-lg text-on-surface">Новые предложения</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {flats.docs.map((doc: any) => (
          <PropertyCard
            key={doc.id}
            href={`/flats/${doc.slug}`}
            title={doc.title}
            address={doc.location?.address}
            imageUrl={doc.images?.[0]?.image?.url ?? null}
            badge={doc.transactionType === 'sale' ? 'Продажа' : 'Аренда'}
            price={doc.price}
            priceSuffix={doc.transactionType === 'rent' ? '/ мес' : undefined}
          />
        ))}
      </div>
    </section>
  )
}
```

### Task 5.3: Rebuild realestate homepage

**Files:**
- Modify: `src/app/(frontend)/(realestate)/page.tsx`

- [ ] **Step 1: Replace file contents with:**

```tsx
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { HomeHero } from '@/components/HomeHero'
import { RecentProperties } from '@/components/RecentProperties'

const STATS = [
  { key: 'flats',                     name: 'Квартиры',         href: '/flats' },
  { key: 'commercial',                name: 'Коммерческая',     href: '/commercial' },
  { key: 'lands',                     name: 'Земельные участки', href: '/lands' },
  { key: 'residential-complexes',     name: 'Жилые комплексы',  href: '/residential-complexes' },
]

export default async function RealEstateHomePage() {
  const payload = await getPayload({ config })
  const [flats, commercial, lands, complexes] = await Promise.all([
    payload.count({ collection: 'flats', where: { status: { equals: 'active' } } }),
    payload.count({ collection: 'commercial', where: { status: { equals: 'active' } } }),
    payload.count({ collection: 'lands', where: { status: { equals: 'active' } } }),
    payload.count({ collection: 'residential-complexes' }),
  ])
  const counts: Record<string, number> = {
    flats: flats.total,
    commercial: commercial.total,
    lands: lands.total,
    'residential-complexes': complexes.total,
  }

  return (
    <div className="space-y-10">
      <HomeHero />

      <section>
        <ul className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <li key={s.key}>
              <Link
                href={s.href}
                className="block bg-primary-container rounded-md p-4 hover:shadow-e2 transition-shadow"
              >
                <div className="text-title-lg text-on-primary-container">{counts[s.key] ?? 0}</div>
                <div className="text-body-sm text-on-primary-container/80 mt-1">{s.name}</div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RecentProperties />
    </div>
  )
}
```

- [ ] **Step 2: Smoke `http://localhost:3000/`.**

Expected: hero with search + chips + stats grid + recent flats grid.

### Task 5.4: Light retheme posts pages (and the shared post components)

**Files (modify each):**
- `src/app/(frontend)/posts/page.tsx`
- `src/app/(frontend)/posts/[slug]/page.tsx`
- `src/app/(frontend)/posts/page/[pageNumber]/page.tsx`
- `src/components/Card/index.tsx` (post card used in `/posts`)
- `src/components/CollectionArchive/index.tsx` (post archive grid)
- `src/components/Pagination/index.tsx`
- `src/components/PageRange/index.tsx`

These four components are shared across `/posts`, `/search`, and possibly other pages. Sweep them in the same pass so the retheme is consistent.

- [ ] **Step 1: For each, sweep these class replacements:**

- `bg-white` → `bg-card`
- `text-gray-900` / `text-gray-800` → `text-on-surface`
- `text-gray-500` / `text-gray-600` → `text-on-surface-variant`
- `shadow-sm` / `shadow-md` → `shadow-e1`
- `shadow-lg` → `shadow-e2`
- `rounded-lg` → `rounded-md`
- `bg-gray-50` / `bg-gray-100` → `bg-surface-container-low`
- `text-blue-600` → `text-primary`
- `bg-blue-600` → `bg-primary`

Don't refactor structure; just update visual classes. Headings use `text-headline` / `text-title-lg` as appropriate.

- [ ] **Step 2: Smoke `/posts` and one post detail page.**

### Task 5.5: Light retheme properties pages

**Files:**
- `src/app/(frontend)/properties/page.tsx`
- `src/app/(frontend)/properties/[slug]/page.tsx`

- [ ] **Step 1: Apply the same class sweep from Task 5.4.**

- [ ] **Step 2: Smoke `/properties`.**

### Task 5.6: Light retheme realtors page

**Files:**
- `src/app/(frontend)/realtors/[slug]/page.tsx`

- [ ] **Step 1: Same sweep. Restyle the realtor card and reviews list to `bg-card rounded-md shadow-e1 p-6`.**

- [ ] **Step 2: Smoke `/realtors/<known-slug>`.**

### Task 5.7: Light retheme search page

**Files:**
- `src/app/(frontend)/search/page.tsx`

- [ ] **Step 1: Apply the class sweep. If search results are property docs, prefer rendering them via `<PropertyCard>` for consistency.**

### Task 5.8: Rebuild not-found.tsx

**Files:**
- Modify: `src/app/(frontend)/not-found.tsx`

- [ ] **Step 1: Replace with:**

```tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <p className="text-display text-on-surface">404</p>
        <p className="text-body text-on-surface-variant">Страница не найдена</p>
        <Button asChild>
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Smoke `http://localhost:3000/this-does-not-exist`.**

### Task 5.9: Type check via container build

- [ ] **Step 1: Run `pnpm build` inside the container.**

Run: `docker compose exec app pnpm build 2>&1 | tail -50`
Expected: build succeeds. Watch for type errors in any file we touched.

If errors appear, fix them inline — most likely cause is property access on Payload-typed objects that the templates treat as `any`. Add narrowing or type assertions only where required.

### Task 5.10: Final route smoke walkthrough

- [ ] **Step 1: Curl each route and confirm HTTP 200.**

```bash
for path in / /flats /commercial /lands /residential-complexes /posts /properties /search /this-does-not-exist; do
  printf "%-30s %s\n" "$path" "$(curl -sS -o /dev/null -w '%{http_code}' http://localhost:3000$path)"
done
```

Expected: 200 for all except `/this-does-not-exist` which returns 404 with the new Material empty state.

- [ ] **Step 2: Open each in a browser. Verify:**

| Route | Expected |
|---|---|
| `/` | Hero with search + chips, stats grid, recent flats card grid |
| `/flats` | Title + count, filter bar (responsive), card grid, optional map, pagination |
| `/commercial` | Same structure, commercial-specific filters |
| `/lands` | Same, land-specific filters |
| `/residential-complexes` | Same, RC-specific filters |
| `/flats/<slug>` | Breadcrumb, title+price card, gallery, characteristics, realtor sidebar, map |
| `/posts` | Material card grid for posts |
| `/admin` | Payload admin loads unchanged |

- [ ] **Step 3: Test theme toggle.**

Click toggle in header — body, cards, header, footer flip to dark-stub palette. Click again to return.

- [ ] **Step 4: Test mobile nav.**

Resize browser to 600 px width. Hamburger button appears, click opens drawer, click an item navigates and closes drawer.

- [ ] **Step 5: Test live preview.**

In Payload admin (`/admin`), open any property doc, switch to "Preview" mode. Verify the preview iframe renders the new design and updates as fields change.

### Task 5.11: Commit Phase 5 and verify final state

- [ ] **Step 1: Stage + commit.**

```bash
git add src/app/\(frontend\) src/components/HomeHero src/components/RecentProperties
git commit -m "Rebuild realestate homepage and light retheme of remaining pages

- Realestate homepage: HomeHero (search + chip rail), stats grid using
  primary-container tonal surface, RecentProperties.
- Light retheme of /posts, /properties, /realtors, /search — color and
  shape tokens swapped, structure unchanged.
- Rebuild not-found.tsx as a small Material empty state.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

- [ ] **Step 2: Verify final commit log.**

Run: `git log --oneline main..HEAD`
Expected: 5–7 commits covering each phase.

---

## Out of scope (already documented in spec § 11)

- Payload collections, fields, hooks, blocks (`src/blocks/*`).
- Routes, redirects, sitemaps, robots, image-domain config.
- Yandex map tile logic.
- i18n infrastructure.
- Performance optimization (image formats, ISR, prefetch).
- Polished dark mode — only the stub palette ships.
- Test coverage (no tests currently exist in the repo).
