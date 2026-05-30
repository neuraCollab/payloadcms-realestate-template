// Cookie-authenticated message fetch for the personal cabinet polling.
//
//   GET /api/cabinet/messages?threadId=…&sinceCreatedAt=ISO
//
// Returns messages in this thread that belong to the cookie's email and
// were created at-or-after `sinceCreatedAt` (default: epoch). Used by the
// chat thread page to pick up new realtor replies without a full reload.

import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'

const lexicalToText = (v: any): string => {
  if (!v) return ''
  if (typeof v === 'string') return v
  const root = v?.root
  if (!root?.children) return ''
  const collect = (nodes: any[]): string =>
    nodes
      .map((n) =>
        typeof n.text === 'string'
          ? n.text
          : Array.isArray(n.children)
          ? collect(n.children)
          : '',
      )
      .join('')
  return root.children
    .map((p: any) => collect(p?.children ?? []))
    .filter(Boolean)
    .join('\n')
}

export async function GET(req: Request): Promise<Response> {
  const cookieStore = await cookies()
  const email = cookieStore.get('realty_email')?.value
  if (!email) return Response.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(req.url)
  const threadId = url.searchParams.get('threadId')
  if (!threadId) return Response.json({ error: 'threadId required' }, { status: 400 })

  const sinceParam = url.searchParams.get('sinceCreatedAt')
  const since = sinceParam ? sinceParam : '1970-01-01T00:00:00.000Z'

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'messages',
    where: {
      and: [
        { threadId: { equals: threadId } },
        { email: { equals: email } },
        { createdAt: { greater_than: since } },
      ],
    },
    sort: 'createdAt',
    limit: 200,
    depth: 1,
    overrideAccess: true,
  })

  const items = result.docs.map((m: any) => ({
    id: m.id,
    subject: m.subject ?? '',
    direction: m.direction ?? 'inbound',
    text: lexicalToText(m.message),
    attachmentUrl:
      m.attachment && typeof m.attachment === 'object' ? m.attachment.url ?? null : null,
    createdAt: m.createdAt,
  }))

  return Response.json({ items })
}
