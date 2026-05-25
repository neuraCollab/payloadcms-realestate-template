import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'

import { seedGlobals } from '@/endpoints/seed-globals'

export const maxDuration = 60

export async function POST(): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Disabled outside of development.', { status: 403 })
  }

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
