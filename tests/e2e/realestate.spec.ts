import { test, expect } from '@playwright/test'

test.describe('home page', () => {
  test('renders hero and stats grid', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header')).toBeVisible()
    await expect(page.getByRole('heading', { name: /найдите свою недвижимость/i })).toBeVisible()
    // 4-up stats grid contains the four section labels
    await expect(page.getByText('Квартиры').first()).toBeVisible()
    await expect(page.getByText('Коммерческая').first()).toBeVisible()
    await expect(page.getByText('Земельные участки')).toBeVisible()
    await expect(page.getByText('Жилые комплексы')).toBeVisible()
  })

  test('search bar redirects to /flats with city param', async ({ page }) => {
    await page.goto('/')
    await page.getByPlaceholder(/город, район/i).fill('Москва')
    await page.getByRole('button', { name: /найти/i }).click()
    await expect(page).toHaveURL(/\/flats\?city=/i)
  })
})

test.describe('flats listing', () => {
  test('renders title, filter form, and result count', async ({ page }) => {
    await page.goto('/flats')
    await expect(page.getByRole('heading', { name: 'Квартиры', exact: true })).toBeVisible()
    await expect(page.getByText(/\d+\s+объектов/i)).toBeVisible()
    // Filter form fields specific to flats schema
    await expect(page.getByRole('combobox', { name: /комнаты/i }).or(page.locator('select').nth(0))).toBeVisible()
  })

  test('applying a filter updates the URL', async ({ page }) => {
    await page.goto('/flats')
    const roomsSelect = page.locator('select').first()
    await roomsSelect.selectOption({ value: 'studio' })
    await page.getByRole('button', { name: /найти/i }).click()
    await expect(page).toHaveURL(/rooms=studio/)
  })
})

test.describe('responsive header', () => {
  test('desktop nav is visible at >= md', async ({ page, viewport, browserName }) => {
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
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Меню' })).toBeVisible()
    await page.getByRole('button', { name: /закрыть меню/i }).click()
    await expect(page.getByRole('dialog')).toBeHidden()
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
  test('/home-v2 contains the realestic markers', async ({ page }) => {
    await page.goto('/home-v2')
    await expect(page.getByText(/найдите дом/i)).toBeVisible()
    await expect(page.getByText(/готовы купить/i)).toBeVisible()
  })

  test('/contact contains the contact hero and FAQ', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.getByText(/свяжитесь с нами/i).first()).toBeVisible()
    await expect(page.getByText(/часто задаваемые/i)).toBeVisible()
  })
})
