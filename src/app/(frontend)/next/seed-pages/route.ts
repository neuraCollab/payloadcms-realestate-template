import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'

import { seedPages } from '@/endpoints/seed-pages'

export const maxDuration = 60

/**
 * Dev-only endpoint that seeds (or re-seeds) demo content pages built
 * from blocks. Returns 403 in production. Does not wipe any other
 * collection — safe to re-run.
 */
export async function POST(): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Disabled outside of development.', { status: 403 })
  }

  const payload = await getPayload({ config })

  try {
    const req = await createLocalReq({}, payload)
    const result = await seedPages({ payload, req })
    return Response.json({ success: true, ...result })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding pages' })
    return new Response(
      `Error seeding pages: ${e instanceof Error ? e.message : String(e)}`,
      { status: 500 },
    )
  }
}
