import crypto from 'crypto'

/**
 * Perform a constant-time comparison of two strings to prevent timing attacks.
 */
export function secureCompare(a: string | null | undefined, b: string | null | undefined): boolean {
  if (!a || !b) return false

  const hashA = crypto.createHash('sha256').update(a).digest()
  const hashB = crypto.createHash('sha256').update(b).digest()

  return crypto.timingSafeEqual(hashA, hashB)
}
