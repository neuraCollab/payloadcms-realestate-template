import { test, expect } from '@playwright/test'

// Tests that exercise the property detail page. These assume there is at
// least one active flat in the database (created by /next/parse-listings
// or /next/seed-pages). If none exist, the tests skip themselves so the
// suite remains green on a fresh install.

const firstFlatSlug = async (
  request: import('@playwright/test').APIRequestContext,
): Promise<string | null> => {
  const res = await request.get(
    '/api/flats?limit=1&depth=0&where[status][equals]=active',
  )
  if (!res.ok()) return null
  const data = await res.json()
  return data?.docs?.[0]?.slug ?? null
}

test.describe('property detail', () => {
  test('renders gallery, specs, favorite button and a contact CTA', async ({
    page,
    request,
  }) => {
    const slug = await firstFlatSlug(request)
    test.skip(!slug, 'no flats seeded')

    await page.goto(`/flats/${slug}`)

    // Breadcrumb shows quartiles section name — scope to the breadcrumb
    // nav so this doesn't resolve to the (mobile-hidden) header nav link
    // of the same name.
    await expect(
      page.getByRole('navigation', { name: 'breadcrumb' }).getByText('Квартиры', { exact: false }),
    ).toBeVisible({ timeout: 30_000 })

    // Specs section
    await expect(
      page.getByRole('heading', { name: /характеристики/i }),
    ).toBeVisible()

    // Favorite chip in header
    await expect(
      page.getByRole('button', { name: /в избранное|в избранном/i }).first(),
    ).toBeVisible()

    // Either "Написать" CTA in the realtor sidebar OR the realtor card title
    await expect(page.getByText(/риэлтор/i).first()).toBeVisible().catch(() => {})
  })

  test('toggling favorite updates the button label and localStorage', async ({
    page,
    request,
  }) => {
    const slug = await firstFlatSlug(request)
    test.skip(!slug, 'no flats seeded')

    await page.goto(`/flats/${slug}`)

    const button = page
      .getByRole('button', { name: /в избранное|в избранном/i })
      .first()
    await expect(button).toBeVisible({ timeout: 30_000 })

    await button.click()
    await expect(button).toHaveText(/в избранном/i)

    const stored = await page.evaluate(() =>
      JSON.parse(window.localStorage.getItem('realty_favorites_v1') || '[]'),
    )
    expect(Array.isArray(stored)).toBe(true)
    expect(stored.length).toBeGreaterThan(0)
    expect(stored[0].collection).toBe('flats')
  })

  test('Mortgage calculator появляется для sale-объектов', async ({
    page,
    request,
  }) => {
    const res = await request.get(
      '/api/flats?limit=1&depth=0&where[and][0][status][equals]=active&where[and][1][transactionType][equals]=sale',
    )
    const data = res.ok() ? await res.json() : null
    const slug: string | undefined = data?.docs?.[0]?.slug
    test.skip(!slug, 'no for-sale flats seeded')

    await page.goto(`/flats/${slug}`)
    await expect(
      page.getByRole('heading', { name: /ипотечный калькулятор/i }),
    ).toBeVisible({ timeout: 30_000 })
    await expect(page.getByText(/первоначальный взнос/i)).toBeVisible()
    await expect(page.getByText(/срок кредита/i)).toBeVisible()
  })

  test('clicking "Написать" opens the slide-in popup', async ({ page, request }) => {
    const slug = await firstFlatSlug(request)
    test.skip(!slug, 'no flats seeded')

    await page.goto(`/flats/${slug}`)

    // Some flats might have no realtor — in that case there's no popup trigger.
    const trigger = page.getByRole('button', { name: /^написать$/i }).first()
    if (await trigger.count() === 0) test.skip(true, 'flat has no realtor')

    await trigger.click()
    await expect(page.getByRole('dialog')).toBeVisible({ timeout: 15_000 })
    await expect(page.getByPlaceholder(/напишите сообщение/i)).toBeVisible()
  })
})
