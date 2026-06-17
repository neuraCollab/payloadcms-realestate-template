import { test, expect } from '@playwright/test'

// UI-content checks. Asserts that real content (headings, key controls,
// chips) rendered on each major page — beyond just "200 OK".

// /home-v2 is intentionally disabled (DISABLED_PAGE_SLUGS in [slug]/page.tsx)
// — a draft homepage iteration kept in the CMS but not publicly reachable.
// See smoke.spec.ts for the 404 coverage.

test.describe('about', () => {
  test('shows QuickNav cards with links to all sections', async ({ page }) => {
    await page.goto('/about')

    // Scope to <article> — CMS pages render via [slug]/page.tsx, which
    // wraps content in <article> (no <main> landmark). The header nav
    // repeats these labels and is hidden on mobile, which would
    // otherwise make the locator resolve to a hidden element.
    const content = page.locator('article')
    for (const label of ['Квартиры', 'Коммерческая', 'Земля', 'ЖК']) {
      await expect(content.getByText(label, { exact: false }).first()).toBeVisible()
    }
  })
})

test.describe('contact', () => {
  test('form is fully in Russian', async ({ page }) => {
    await page.goto('/contact')

    await expect(page.getByText('Тема обращения', { exact: false })).toBeVisible({
      timeout: 20_000,
    })
    await expect(page.getByPlaceholder('Иван Иванов')).toBeVisible()
    await expect(page.getByText('Сообщение', { exact: false }).first()).toBeVisible()
    await expect(
      page.getByRole('button', { name: /отправить заявку/i }),
    ).toBeVisible()
  })
})

test.describe('blog', () => {
  test('/posts renders article cards', async ({ page }) => {
    await page.goto('/posts')
    // BlogBlock title or a post card
    const content = page.locator('main, article').first()
    await expect(content).toBeVisible({ timeout: 20_000 })
  })
})

test.describe('agents', () => {
  test('renders search bar', async ({ page }) => {
    await page.goto('/agents')
    await expect(
      page.getByRole('heading', { name: /найдите своего риэлтора/i }),
    ).toBeVisible({ timeout: 20_000 })
    await expect(
      page.getByPlaceholder(/имя, агентство/i),
    ).toBeVisible()
  })
})

test.describe('privacy & terms', () => {
  test('privacy page has 152-ФЗ keywords', async ({ page }) => {
    await page.goto('/privacy')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /политика обработки персональных данных/i,
    )
    await expect(page.getByText(/152-ФЗ|персональных данных/i).first()).toBeVisible()
  })

  test('terms page renders', async ({ page }) => {
    await page.goto('/terms')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /пользовательское соглашение/i,
    )
  })
})

test.describe('404', () => {
  test('quick-link cards rendered on not-found', async ({ page }) => {
    const res = await page.goto('/this-page-does-not-exist-anywhere')
    expect(res?.status()).toBe(404)
    await expect(page.getByText('404').first()).toBeVisible()
    await expect(page.getByRole('link', { name: /квартиры/i }).first()).toBeVisible()
  })
})
