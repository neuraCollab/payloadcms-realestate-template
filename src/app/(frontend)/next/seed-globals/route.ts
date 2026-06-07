import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'

import { seedGlobals } from '@/endpoints/seed-globals'
import { requireSeedAuth } from '@/utilities/seedAuth'

export const maxDuration = 60

export async function POST(request: Request): Promise<Response> {
  const authErr = requireSeedAuth(request)
  if (authErr) return authErr

  const payload = await getPayload({ config })

  try {
    const req = await createLocalReq({}, payload)
    const result = await seedGlobals({ payload, req })
    return Response.json({ success: true, ...result })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error seeding globals' })
    return new Response(
      `Error seeding globals: ${e instanceof Error ? e.message : String(e)}`,
      { status: 500 },
    )
  }
}
