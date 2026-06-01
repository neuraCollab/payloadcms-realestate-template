import { test, expect } from '@playwright/test'

// Personal cabinet flow: login form, sidebar nav, favorites + recent
// localStorage round-trip, logout.

test.describe('cabinet shell', () => {
  test('login page renders form', async ({ page }) => {
    await page.goto('/cabinet/login')

    await expect(
      page.getByRole('heading', { name: /вход в кабинет/i }),
    ).toBeVisible({ timeout: 30_000 })
    await expect(page.getByPlaceholder('ivan@example.com')).toBeVisible()
    await expect(
      page.getByRole('button', { name: /открыть кабинет/i }),
    ).toBeVisible()
  })

  test('logged-out chats page redirects to login CTA', async ({ page }) => {
    await page.goto('/cabinet/chats')
    await expect(
      page.getByRole('link', { name: /я уже писал.*войти/i }),
    ).toBeVisible({ timeout: 30_000 })
  })

  test('favorites page shows empty state when no items', async ({ page }) => {
    await page.goto('/cabinet/favorites')
    await expect(
      page.getByText(/пока ничего не сохранено/i),
    ).toBeVisible({ timeout: 30_000 })
  })

  test('recently viewed page shows empty state initially', async ({ page }) => {
    await page.goto('/cabinet/recent')
    await expect(
      page.getByText(/появятся объекты, которые вы откроете/i),
    ).toBeVisible({ timeout: 30_000 })
  })

  test('sidebar навигация рендерится', async ({ page }) => {
    await page.goto('/cabinet/favorites')

    // Sidebar links present (guest mode shows favorites + recent only)
    await expect(page.getByRole('link', { name: /избранное/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /просмотренные/i }).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /войти/i })).toBeVisible()
  })
})

test.describe('cookie consent', () => {
  test('banner appears on first visit and dismisses on click', async ({ page }) => {
    // Make sure localStorage is clear for this origin.
    await page.context().clearCookies()
    await page.goto('/')

    // localStorage starts empty.
    const banner = page.getByRole('dialog', {
      name: /согласие на использование cookie/i,
    })
    await expect(banner).toBeVisible({ timeout: 30_000 })

    await banner.getByRole('button', { name: /принять/i }).click()
    await expect(banner).toBeHidden()

    // Reload — banner should NOT come back.
    await page.reload()
    await expect(banner).toBeHidden()
  })
})
