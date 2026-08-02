import { test, expect } from '@playwright/test'

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

test.describe('Поиск объекта -> Оставление заявки', () => {
  test('Сценарий 1: Переход с главной через поиск до формы заявки', async ({ page }) => {
    // 1. Поиск на главной
    await page.goto('/')
    await page.getByPlaceholder('Город').fill('Москва')
    await page.getByRole('button', { name: /найти/i }).click()

    // 2. Убеждаемся, что перешли на страницу поиска с параметром city
    await expect(page).toHaveURL(/\/search\?.*city=/i)

    // Кликаем на первую карточку объекта
    const firstCardLink = page.locator('a:has(article)').first()
    await expect(firstCardLink).toBeVisible()

    // 3. Переход на детальную страницу
    await firstCardLink.click()
    await expect(page.getByRole('heading', { name: /характеристики/i })).toBeVisible({ timeout: 15_000 })

    // 4. Открытие формы "Написать"
    const trigger = page.getByRole('button', { name: /^написать$/i }).first()
    if (await trigger.count() > 0) {
      await trigger.click()
      await expect(page.getByRole('dialog', { name: 'Связаться по объекту' })).toBeVisible({ timeout: 15_000 })
      await expect(page.getByRole('tab', { name: 'Звонок' })).toBeVisible()
    } else {
      test.skip(true, 'first object has no realtor to show the form')
    }
  })

  test('Сценарий 2: Успешная отправка заявки типа "Звонок"', async ({ page, request }) => {
    const slug = await firstFlatSlug(request)
    test.skip(!slug, 'no flats seeded')

    await page.goto(`/flats/${slug}`)

    const trigger = page.getByRole('button', { name: /^написать$/i }).first()
    if (await trigger.count() === 0) test.skip(true, 'flat has no realtor')

    await trigger.click()
    await expect(page.getByRole('dialog', { name: 'Связаться по объекту' })).toBeVisible()

    // Mock API response
    await page.route('/api/leads', async (route) => {
      await route.fulfill({ status: 200, json: { success: true } })
    })

    // Fill form
    await page.getByRole('tab', { name: 'Звонок' }).click()
    await page.getByLabel(/Телефон \*/).fill('+79991234567')
    await page.getByLabel('Имя').fill('Иван Тестер')
    await page.getByLabel('Комментарий').fill('Тестовый комментарий Звонок')

    // Submit
    await page.getByRole('button', { name: 'Отправить' }).click()

    // Verify success state
    await expect(page.getByText('Заявка отправлена')).toBeVisible()
    await expect(page.getByText('Риэлтор перезвонит в течение 10 минут.')).toBeVisible()
  })

  test('Сценарий 3: Успешная отправка заявки типа "Telegram"', async ({ page, request }) => {
    const slug = await firstFlatSlug(request)
    test.skip(!slug, 'no flats seeded')

    await page.goto(`/flats/${slug}`)

    const trigger = page.getByRole('button', { name: /^написать$/i }).first()
    if (await trigger.count() === 0) test.skip(true, 'flat has no realtor')

    await trigger.click()
    await expect(page.getByRole('dialog', { name: 'Связаться по объекту' })).toBeVisible()

    // Mock API response
    await page.route('/api/leads', async (route) => {
      await route.fulfill({ status: 200, json: { success: true } })
    })

    // Switch to Telegram tab
    await page.getByRole('tab', { name: 'Telegram' }).click()

    // Fill form
    await page.getByLabel(/Ник в Telegram \*/).fill('test_user_tg')
    await page.getByLabel('Имя').fill('Анна Тестер')
    await page.getByLabel('Комментарий').fill('Тестовый комментарий TG')

    // Submit
    await page.getByRole('button', { name: 'Отправить' }).click()

    // Verify success state
    await expect(page.getByText('Заявка отправлена')).toBeVisible()
    await expect(page.getByText('Риэлтор напишет в течение часа.')).toBeVisible()
  })

  test('Сценарий 4: Валидация обязательных полей (пустой телефон)', async ({ page, request }) => {
    const slug = await firstFlatSlug(request)
    test.skip(!slug, 'no flats seeded')

    await page.goto(`/flats/${slug}`)

    const trigger = page.getByRole('button', { name: /^написать$/i }).first()
    if (await trigger.count() === 0) test.skip(true, 'flat has no realtor')

    await trigger.click()
    await expect(page.getByRole('dialog', { name: 'Связаться по объекту' })).toBeVisible()

    // Ensure we are on Звонок (Callback)
    await page.getByRole('tab', { name: 'Звонок' }).click()

    // Clear phone just in case, though it should be empty initially
    await page.getByLabel(/Телефон \*/).fill('')

    // For Native HTML5 validation, the button click won't submit the form
    // Playwright can check for the `:invalid` pseudo-class or we can catch the API request.
    // Let's intercept to ensure the request is NEVER sent
    let apiCalled = false
    await page.route('/api/leads', async (route) => {
      apiCalled = true
      await route.continue()
    })

    await page.getByRole('button', { name: 'Отправить' }).click()

    // Assuming HTML5 validation prevents submission
    // Let's check that the phone input is indeed invalid
    const phoneInput = page.getByLabel(/Телефон \*/)
    const isInvalid = await phoneInput.evaluate((el: HTMLInputElement) => !el.checkValidity())
    expect(isInvalid).toBe(true)

    // Wait a bit to ensure API was not called
    await page.waitForTimeout(500)
    expect(apiCalled).toBe(false)
  })

  test('Сценарий 5: Блокировка отправки ботом (honeypot)', async ({ page, request }) => {
    const slug = await firstFlatSlug(request)
    test.skip(!slug, 'no flats seeded')

    await page.goto(`/flats/${slug}`)

    const trigger = page.getByRole('button', { name: /^написать$/i }).first()
    if (await trigger.count() === 0) test.skip(true, 'flat has no realtor')

    await trigger.click()
    await expect(page.getByRole('dialog', { name: 'Связаться по объекту' })).toBeVisible()

    // Intercept to check the payload
    let capturedPayload: any = null
    await page.route('/api/leads', async (route) => {
      capturedPayload = route.request().postDataJSON()
      await route.fulfill({ status: 200, json: { success: true } })
    })

    await page.getByRole('tab', { name: 'Звонок' }).click()
    await page.getByLabel(/Телефон \*/).fill('+79991234567')

    // Fill the honeypot field
    // We can find it by its name attribute
    await page.locator('input[name="website"]').fill('http://spam-bot.com', { force: true })

    await page.getByRole('button', { name: 'Отправить' }).click()

    // The request will be sent, but in reality the backend drops it.
    // Here we assert that the `website` field is correctly attached to the payload.
    await expect(page.getByText('Заявка отправлена')).toBeVisible()

    expect(capturedPayload).not.toBeNull()
    expect(capturedPayload.website).toBe('http://spam-bot.com')
  })
})
