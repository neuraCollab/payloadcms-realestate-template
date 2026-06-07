import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'

import { seedPages } from '@/endpoints/seed-pages'
import { requireSeedAuth } from '@/utilities/seedAuth'

export const maxDuration = 60

/**
 * Seeds (or re-seeds) demo content pages built from blocks.
 * Dev: open. Prod: requires `Authorization: Bearer ${CRON_SECRET}`.
 * Safe to re-run.
 */
export async function POST(request: Request): Promise<Response> {
  const authErr = requireSeedAuth(request)
  if (authErr) return authErr

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
