// Lightweight "auth" for the personal cabinet. Sets a `realty_email` cookie
// so the user can access their existing message threads. Not real auth —
// just lets a returning visitor reclaim their cabinet from another browser.
// For real verification, plug in a magic-link email later.

import { getPayload } from 'payload'
import config from '@/payload.config'
import { rateLimitOk } from '@/lib/rateLimit'

const COOKIE_NAME = 'realty_email'
const MAX_AGE = 60 * 60 * 24 * 90 // 90 days

const isValidEmail = (s: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export async function POST(req: Request): Promise<Response> {
  const rl = rateLimitOk(req, { key: 'cabinet-session', limit: 10, windowMs: 60_000 })
  if (!rl.ok) return rl.response

  let email: string | undefined
  const ct = req.headers.get('content-type') ?? ''

  if (ct.includes('application/json')) {
    const body = await req.json().catch(() => null)
    email = body?.email
  } else if (ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')) {
    const form = await req.formData()
    email = form.get('email')?.toString()
  }

  email = email?.trim().toLowerCase()
  if (!email || !isValidEmail(email)) {
    return Response.json({ error: 'Введите корректный email' }, { status: 400 })
  }

  // Validate that this email has at least one message thread, otherwise we'd
  // be granting access to an empty cabinet.
  const payload = await getPayload({ config })
  const found = await payload.find({
    collection: 'messages',
    where: { email: { equals: email } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const hasThreads = found.totalDocs > 0

  const res = Response.json({ success: true, hasThreads, email })
  res.headers.append(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(email)}; Path=/; Max-Age=${MAX_AGE}; SameSite=Lax`,
  )
  return res
}

// Logout: clear the cookie.
export async function DELETE(): Promise<Response> {
  const res = Response.json({ success: true })
  res.headers.append('Set-Cookie', `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`)
  return res
}
