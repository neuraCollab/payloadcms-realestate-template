// In-memory sliding-window rate limiter. Good enough for a single-instance
// deployment; swap for Redis (Upstash, etc.) when scaling horizontally.
//
// Usage:
//   const rl = rateLimitOk(req, { key: 'messages', limit: 10, windowMs: 5 * 60_000 })
//   if (!rl.ok) return rl.response

interface Options {
  /** Bucket name to namespace counters. */
  key: string
  /** Max events allowed per IP within the window. */
  limit: number
  /** Window length in ms. */
  windowMs: number
}

interface Bucket {
  events: number[]
}

const buckets = new Map<string, Bucket>()

const ipFromRequest = (req: Request): string => {
  const h = req.headers
  const xff = h.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  const real = h.get('x-real-ip')
  if (real) return real.trim()
  return 'unknown'
}

export const rateLimitOk = (
  req: Request,
  { key, limit, windowMs }: Options,
): { ok: true } | { ok: false; response: Response } => {
  const ip = ipFromRequest(req)
  const bucketKey = `${key}::${ip}`
  const now = Date.now()
  const bucket = buckets.get(bucketKey) ?? { events: [] }
  // Drop events outside the window.
  bucket.events = bucket.events.filter((t) => now - t < windowMs)
  if (bucket.events.length >= limit) {
    const retryAfterMs = windowMs - (now - bucket.events[0])
    return {
      ok: false,
      response: Response.json(
        { error: 'Слишком много запросов. Попробуйте чуть позже.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(retryAfterMs / 1000)),
          },
        },
      ),
    }
  }
  bucket.events.push(now)
  buckets.set(bucketKey, bucket)
  return { ok: true }
}

/**
 * Honeypot field name. Forms should render a *hidden* input with this name
 * (off-screen, autocomplete=off, tabIndex=-1). If a submission has a value in
 * this field, it's a bot — drop silently.
 */
export const HONEYPOT_FIELD = 'website'

export const looksLikeBot = (value: string | undefined | null): boolean =>
  !!value && value.trim().length > 0
