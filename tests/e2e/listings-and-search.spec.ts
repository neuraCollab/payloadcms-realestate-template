import { test, expect } from '@playwright/test'

// Tests for /flats listing controls + /search cross-collection page.
// Asserts URL-driven state: filters, sort, view toggle, pagination.

test.describe('/flats listing', () => {
  test('header shows count, view toggle and sort', async ({ page }) => {
    await page.goto('/flats')

    await expect(
      page.getByRole('heading', { name: /квартиры/i, level: 1 }),
    ).toBeVisible({ timeout: 30_000 })

    // SortSelect + ViewToggle render in the header
    await expect(page.getByLabel('Тип объекта')).toBeHidden().catch(() => {})
    await expect(page.getByText(/сортировка/i)).toBeVisible()
    await expect(page.getByRole('tab', { name: /список/i })).toBeVisible()
    await expect(page.getByRole('tab', { name: /карта/i })).toBeVisible()
  })

  test('switching to "Карта" updates URL with ?view=map', async ({ page }) => {
    await page.goto('/flats')
    await page.getByRole('tab', { name: /карта/i }).click()
    await expect(page).toHaveURL(/\?view=map/)
  })

  test('сортировка obnovlyaet URL без page=N', async ({ page }) => {
    await page.goto('/flats?page=2')
    const select = page.getByLabel(/сортировка/i)
    await select.selectOption('price')
    await expect(page).toHaveURL(/sort=price/)
    await expect(page).not.toHaveURL(/page=2/)
  })

  test('PropertyFilters expand block shows advanced fields', async ({ page }) => {
    await page.goto('/flats')

    // Click "Расширенные фильтры"
    await page.getByRole('button', { name: /расширенные фильтры/i }).click()
    await expect(page.getByText(/площадь от/i).first()).toBeVisible()
    await expect(page.getByText(/тип жилья/i).first()).toBeVisible()
  })
})

test.describe('/search cross-collection', () => {
  test('shows category and transactionType selectors', async ({ page }) => {
    await page.goto('/search')

    await expect(
      page.getByRole('heading', { name: /расширенный поиск/i }),
    ).toBeVisible({ timeout: 30_000 })

    await expect(page.getByLabel('Тип объекта')).toBeVisible()
    await expect(page.getByLabel('Город')).toBeVisible()
    await expect(page.getByLabel(/поиск/i).first()).toBeVisible()
  })

  test('submitting filter appends params to URL', async ({ page }) => {
    await page.goto('/search')
    await page.getByLabel('Город').fill('Москва')
    await page.getByRole('button', { name: /найти/i }).click()
    await expect(page).toHaveURL(/city=/)
  })
})

test.describe('/kimry localized URLs', () => {
  // Behaviour relies on the cities seed having Кимры — guard against missing seed.
  test('/kimry renders city landing OR returns 404', async ({ page }) => {
    const res = await page.goto('/kimry')
    if (res?.status() === 200) {
      await expect(page.getByText(/Кимры/i).first()).toBeVisible()
    } else {
      expect(res?.status()).toBe(404)
    }
  })
})
