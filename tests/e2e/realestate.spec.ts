import { test, expect } from '@playwright/test'

test.describe('home page', () => {
  test('renders hero and category tiles', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('banner')).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /недвижимость, которой доверяют/i }),
    ).toBeVisible()
    // 4-up category tiles grid — scope to <main> links to avoid matching
    // the header nav (repeats these labels) and the Hero's own hidden
    // <option> elements with the same text.
    const main = page.locator('main')
    await expect(main.getByRole('link', { name: 'Квартиры' })).toBeVisible()
    await expect(main.getByRole('link', { name: 'Коммерческая' })).toBeVisible()
    await expect(main.getByRole('link', { name: 'Земля' })).toBeVisible()
    await expect(main.getByRole('link', { name: 'Дома' })).toBeVisible()
  })

  test('search bar redirects to /search with city param', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder('Город').fill('Москва')
    await page.getByRole('button', { name: /найти/i }).click()
    await expect(page).toHaveURL(/\/search\?.*city=/i)
  })
})

test.describe('flats listing', () => {
  test('renders title, filter form, and result count', async ({ page, isMobile }) => {
    await page.goto('/flats')
    await expect(page.getByRole('heading', { name: 'Квартиры', exact: true })).toBeVisible()
    await expect(page.getByText(/\d+\s+объект/i).first()).toBeVisible()
    if (isMobile) {
      await page.getByRole('button', { name: 'Фильтры', exact: true }).click()
      await expect(
        page.getByRole('dialog', { name: 'Фильтры' }).getByLabel(/комнаты/i),
      ).toBeVisible()
    } else {
      await expect(page.getByLabel(/комнаты/i)).toBeVisible()
    }
  })

  test('applying a filter updates the URL', async ({ page, isMobile, request }) => {
    // Warm up the underlying API route first — in dev mode Turbopack's
    // on-demand compile of /api/flats triggers a Fast Refresh that would
    // otherwise reset the filter form's React state mid-interaction.
    await request.get('/api/flats?limit=1')
    await page.goto('/flats')
    // Let any pending dev-mode Fast Refresh settle before interacting —
    // otherwise it can reset the filter form's React state mid-selection.
    await page.waitForTimeout(1000)
    if (isMobile) {
      await page.getByRole('button', { name: 'Фильтры', exact: true }).click()
    }
    const roomsSelect = isMobile
      ? page.getByRole('dialog', { name: 'Фильтры' }).getByLabel(/комнаты/i)
      : page.getByLabel(/комнаты/i)
    await roomsSelect.selectOption({ value: 'studio' })
    await page.getByRole('button', { name: /показать|применить/i }).click()
    await expect(page).toHaveURL(/rooms=studio/)
  })
})

test.describe('responsive header', () => {
  test('desktop nav is visible at >= lg', async ({ page, viewport, browserName }) => {
    test.skip(browserName !== 'chromium', 'desktop-only test')
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')
    // Hamburger button is not visible on desktop
    const menuButton = page.getByRole('button', { name: /открыть меню/i })
    await expect(menuButton).toBeHidden()
  })

  test('mobile drawer opens and closes', async ({ page, browserName }) => {
    test.skip(browserName !== 'chromium', 'we use a viewport override here')
    await page.setViewportSize({ width: 600, height: 900 })
    await page.goto('/')
    const trigger = page.getByRole('button', { name: /открыть меню/i })
    await expect(trigger).toBeVisible()
    await trigger.click()
    // Scope by name — other dialogs (cookie consent, login nudge) can be
    // mounted concurrently and would otherwise make this a strict-mode
    // violation.
    const menu = page.getByRole('dialog', { name: 'Меню' })
    await expect(menu).toBeVisible()
    await page.getByRole('button', { name: /закрыть меню/i }).click()
    await expect(menu).toBeHidden()
  })
})

test.describe('theme toggle', () => {
  test('flips data-theme attribute on <html>', async ({ page }) => {
    await page.goto('/')
    const html = page.locator('html')
    const initial = await html.getAttribute('data-theme')
    await page.getByRole('button', { name: /(тёмную|светлую) тему/i }).first().click()
    const next = await html.getAttribute('data-theme')
    expect(next).not.toBe(initial)
  })
})

test.describe('seeded demo pages', () => {
  // /home-v2 is intentionally disabled (DISABLED_PAGE_SLUGS in [slug]/page.tsx)
  // — see smoke.spec.ts for the 404 coverage.

  test('/contact contains the contact hero and FAQ', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByText(/свяжитесь с нами/i).first()).toBeVisible()
    await expect(page.getByText(/часто задаваемые/i)).toBeVisible()
  })
})
