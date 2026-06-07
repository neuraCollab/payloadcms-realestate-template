import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'

import { seedPosts } from '@/endpoints/seed-posts'
import { requireSeedAuth } from '@/utilities/seedAuth'

export const maxDuration = 60

/**
 * Seeds (or re-seeds) demo blog posts. Idempotent — upserts by slug.
 * Dev: open. Prod: requires `Authorization: Bearer ${CRON_SECRET}`.
 */
export async function POST(request: Request): Promise<Response> {
  const authErr = requireSeedAuth(request)
  if (authErr) return authErr

  const payload = await getPayload({ config })

  try {
    const req = await createLocalReq({}, payload)
    const result = await seedPosts({ payload, req })
    return Response.json({ success: true, ...result })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding posts' })
    return new Response(
      `Error seeding posts: ${e instanceof Error ? e.message : String(e)}`,
      { status: 500 },
    )
  }
}
