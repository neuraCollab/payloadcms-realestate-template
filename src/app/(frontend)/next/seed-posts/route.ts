import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'

import { seedPosts } from '@/endpoints/seed-posts'

export const maxDuration = 60

/**
 * Dev-only endpoint that seeds (or re-seeds) demo blog posts. Returns 403 in
 * production. Idempotent — upserts by slug.
 */
export async function POST(): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Disabled outside of development.', { status: 403 })
  }

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
