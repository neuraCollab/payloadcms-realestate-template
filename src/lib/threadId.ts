// Deterministic thread id derived from realtor id + user email.
// Same realtor + same user-email → same threadId across all messages,
// so the cabinet can group their conversation. Hex-encoded.

import { createHash } from 'crypto'

export const computeThreadId = (realtorId: string | number, email: string): string => {
  const norm = email.trim().toLowerCase()
  return createHash('sha1').update(`${realtorId}::${norm}`).digest('hex').slice(0, 16)
}
