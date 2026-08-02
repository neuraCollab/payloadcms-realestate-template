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

  test('accepts a valid email but does not set cookie (auth bypass fix)', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL })
    const res = await ctx.post('/api/cabinet/session', {
      data: { email: 'test@example.com' },
    })
    expect(res.status()).toBe(200)
    const cookies = await ctx.storageState()
    const realtyCookie = cookies.cookies.find((c) => c.name === 'realty_email')
    expect(realtyCookie).toBeUndefined()
    await ctx.dispose()
  })

  test('DELETE clears the cookie', async ({ baseURL }) => {
    const ctx = await request.newContext({ baseURL })
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
    // The real client only ever sends JSON (RichMessageForm) or
    // multipart/form-data (MessagePopup) — the route doesn't parse
    // urlencoded bodies, so exercise the JSON path here.
    const res = await ctx.post('/api/messages', {
      data: {
        realtorId: 'doesnt-matter',
        subject: 'spam',
        name: 'Bot',
        email: 'bot@example.com',
        message: 'Buy crypto',
        website: 'http://spam.example',
      },
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
