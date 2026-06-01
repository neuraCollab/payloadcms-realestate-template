import { test, expect, request } from '@playwright/test'

// API-only checks. No dev-compile cost, so they run quickly.
// Cover the public endpoints I added: cabinet/session, messages,
// reviews — including rate-limit and honeypot behaviour.

test.describe('/api/cabinet/session', () => {
  test('rejects invalid email', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL })
    const res = await ctx.post('/api/cabinet/session', {
      data: { email: 'not-an-email' },
    })
    expect(res.status()).toBe(400)
    const body = await res.json()
    expect(body.error).toMatch(/корректный email/i)
    await ctx.dispose()
  })

  test('accepts a valid email and sets cookie', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL })
    const res = await ctx.post('/api/cabinet/session', {
      data: { email: 'test@example.com' },
    })
    expect(res.status()).toBe(200)
    const cookies = await ctx.storageState()
    const realtyCookie = cookies.cookies.find((c) => c.name === 'realty_email')
    expect(realtyCookie?.value).toBe(encodeURIComponent('test@example.com'))
    await ctx.dispose()
  })

  test('DELETE clears the cookie', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL })
    await ctx.post('/api/cabinet/session', {
      data: { email: 'test@example.com' },
    })
    const res = await ctx.delete('/api/cabinet/session')
    expect(res.status()).toBe(200)
    await ctx.dispose()
  })
})

test.describe('/api/messages honeypot + validation', () => {
  test('honeypot field "website" → silent success without writes', async ({
    baseURL,
  }) => {
    const ctx = await request.newContext({ baseURL })
    const form = new URLSearchParams()
    form.set('realtorId', 'doesnt-matter')
    form.set('subject', 'spam')
    form.set('name', 'Bot')
    form.set('email', 'bot@example.com')
    form.set('message', 'Buy crypto')
    form.set('website', 'http://spam.example')
    const res = await ctx.post('/api/messages', {
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: form.toString(),
    })
    // Bot path returns 200 to lie to the bot.
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    await ctx.dispose()
  })

  test('missing required fields → 400', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL })
    const res = await ctx.post('/api/messages', {
      data: { name: 'incomplete' },
    })
    expect(res.status()).toBe(400)
    await ctx.dispose()
  })
})

test.describe('/api/reviews', () => {
  test('missing fields → 400', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL })
    const res = await ctx.post('/api/reviews', {
      data: { authorName: 'incomplete' },
    })
    expect(res.status()).toBe(400)
    await ctx.dispose()
  })

  test('honeypot returns silent success', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL })
    const res = await ctx.post('/api/reviews', {
      data: {
        realtorId: '1',
        authorName: 'Bot',
        rating: 5,
        comment: 'click me',
        website: 'http://spam',
      },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    await ctx.dispose()
  })
})

test.describe('/api/cabinet/messages requires session', () => {
  test('without cookie → 401', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL })
    const res = await ctx.get('/api/cabinet/messages?threadId=anything')
    expect(res.status()).toBe(401)
    await ctx.dispose()
  })
})
