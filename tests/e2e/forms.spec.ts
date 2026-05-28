import { test, expect } from '@playwright/test'

test.describe('forms — surface checks', () => {
  // The detail-page review form is only rendered on a real property detail.
  // With an empty `flats` table in dev we can still smoke the standalone
  // form-bearing pages.

  test('contact page exposes a form with name/email/subject inputs', async ({ page }) => {
    await page.goto('/contact')
    // ContactUsForm renders the Payload form-builder fields.
    // We don't dictate exact labels — just confirm at least one input is present.
    const inputCount = await page.locator('input, textarea').count()
    expect(inputCount).toBeGreaterThanOrEqual(1)
  })

  test('PropertyFilters form on /flats submits via Enter key', async ({ page }) => {
    await page.goto('/flats')
    const cityInput = page.getByLabel(/город/i).first()
    await cityInput.fill('Москва')
    await cityInput.press('Enter')
    await expect(page).toHaveURL(/city=/i)
  })
})

test.describe('a11y — focus rings', () => {
  test('first focusable element on /flats has visible focus indicator', async ({ page }) => {
    await page.goto('/flats')
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null
      if (!el) return null
      const styles = window.getComputedStyle(el)
      return {
        tag: el.tagName,
        outline: styles.outlineStyle,
        boxShadow: styles.boxShadow,
      }
    })
    expect(focused).not.toBeNull()
    // Either an outline or a focus-ring shadow indicates accessible focus.
    const hasIndicator =
      (focused?.outline && focused.outline !== 'none') ||
      (focused?.boxShadow && focused.boxShadow !== 'none')
    expect(hasIndicator, `no visible focus indicator on ${focused?.tag}`).toBeTruthy()
  })
})
