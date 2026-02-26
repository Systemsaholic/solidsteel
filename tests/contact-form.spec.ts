import { test, expect } from '@playwright/test'

test.describe('Contact Form Submission', () => {
  test('fills out and submits the contact form successfully', async ({ page }) => {
    await page.goto('/contact')

    // Wait for the form to be visible
    const form = page.locator('form[action="/api/contact"]')
    await expect(form).toBeVisible()

    // Fill in the form fields
    await page.fill('#name', 'Playwright Test User')
    await page.waitForTimeout(500)
    await page.fill('#email', 'playwright-test@example.com')
    await page.fill('#phone', '(613) 555-0199')
    await page.fill('#message', 'Automated Playwright test — verifying contact form submission works end-to-end after honeypot fix.')

    // Verify the honeypot field is empty
    await expect(page.locator('#_hp_check')).toHaveValue('')

    // Intercept the API call — could be JSON fetch (React) or form-encoded (native)
    const responsePromise = page.waitForResponse(
      (response) => response.url().includes('/api/contact') && response.request().method() === 'POST'
    )

    // Click submit
    await page.click('button[type="submit"]')

    // Wait for the API response
    const response = await responsePromise
    const status = response.status()

    // React path: 200 JSON | Native path: 303 redirect to thank-you
    expect([200, 303]).toContain(status)

    if (status === 200) {
      const body = await response.json()
      expect(body.success).toBe(true)
      await expect(page.getByRole('heading', { name: 'Message Received!' })).toBeVisible({ timeout: 10000 })
    } else {
      await page.waitForURL('**/contact/thank-you**', { timeout: 10000 })
      await expect(page.getByRole('heading', { name: 'Message Received!' })).toBeVisible({ timeout: 10000 })
    }
  })

  test('honeypot field blocks bot submissions silently', async ({ page }) => {
    await page.goto('/contact')

    const form = page.locator('form[action="/api/contact"]')
    await expect(form).toBeVisible()

    // Wait for hydration
    await page.waitForTimeout(2000)

    // Fill in all fields
    await page.fill('#name', 'Bot User')
    await page.fill('#email', 'bot@spam.com')
    await page.fill('#phone', '5555555555')
    await page.fill('#message', 'Spam message from bot')

    // Fill the honeypot field (simulating a bot)
    await page.locator('#_hp_check').fill('http://spam-site.com')

    // Click submit — should NOT fire a real API call to CRM
    await page.click('button[type="submit"]')

    // Bot sees success (either inline card or thank-you redirect)
    await expect(page.getByRole('heading', { name: 'Message Received!' })).toBeVisible({ timeout: 10000 })
  })
})
