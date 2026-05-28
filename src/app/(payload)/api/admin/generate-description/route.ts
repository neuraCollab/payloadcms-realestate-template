// Rule-based description generator endpoint. Takes a flat id, builds a Lexical
// description, optionally writes it back. No external LLM — deterministic.
//
//   POST /api/admin/generate-description       body: { flatId, write?: boolean }
//
// Auth: admin user only.

import { getPayload, createLocalReq } from 'payload'
import config from '@/payload.config'
import { describeFlat, type FlatInputForDescription } from '@/lib/describeFlat'

const requireAdmin = async (req: Request) => {
  const payload = await getPayload({ config })
  const auth = await payload.auth({ headers: req.headers })
  if (!auth?.user) return { error: Response.json({ error: 'Unauthorized' }, { status: 401 }) }
  if (auth.user.role !== 'admin') {
    return { error: Response.json({ error: 'Только администратор' }, { status: 403 }) }
  }
  return { payload, user: auth.user }
}

export async function POST(req: Request): Promise<Response> {
  const auth = await requireAdmin(req)
  if ('error' in auth) return auth.error
  const { payload } = auth

  const body = await req.json().catch(() => ({}))
  const flatId = body.flatId
  const write = body.write === true

  if (!flatId) {
    return Response.json({ error: 'Required: flatId' }, { status: 400 })
  }

  const flat = await payload.findByID({
    collection: 'flats',
    id: flatId,
    depth: 0,
  })
  if (!flat) {
    return Response.json({ error: 'Flat not found' }, { status: 404 })
  }

  const description = describeFlat(flat as FlatInputForDescription)

  if (write) {
    const localReq = await createLocalReq({}, payload)
    await payload.update({
      collection: 'flats',
      id: flatId,
      data: { description: description as any },
      req: localReq,
    })
  }

  return Response.json({ success: true, written: write, description })
}
