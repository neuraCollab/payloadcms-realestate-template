import { createLocalReq, getPayload } from 'payload'
import config from '@payload-config'

import { ingestListings } from '@/lib/listings-parser/ingest'
import type { SourceId } from '@/lib/listings-parser/types'

export const maxDuration = 60

const VALID_SOURCES: SourceId[] = ['avito', 'sutochno', 'etagi']

/**
 * Dev-only endpoint that ingests demo listings via the mock providers.
 * Returns 403 in production. Idempotent — re-running upserts by slug.
 *
 * Query params:
 *   ?source=avito         — comma-separated list (default: all three)
 *   ?per=5                — listings per source (default: 5, max: 50)
 */
export async function POST(request: Request): Promise<Response> {
  if (process.env.NODE_ENV === 'production') {
    return new Response('Disabled outside of development.', { status: 403 })
  }

  const url = new URL(request.url)
  const sourceParam = url.searchParams.get('source')
  const perParam = url.searchParams.get('per')

  const sources: SourceId[] = sourceParam
    ? (sourceParam.split(',').map((s) => s.trim()).filter((s): s is SourceId =>
        (VALID_SOURCES as string[]).includes(s),
      ))
    : VALID_SOURCES

  if (sources.length === 0) {
    return Response.json(
      { error: `Invalid source. Use one of: ${VALID_SOURCES.join(', ')}` },
      { status: 400 },
    )
  }

  const per = Math.min(Math.max(parseInt(perParam ?? '5', 10) || 5, 1), 50)

  const payload = await getPayload({ config })

  try {
    const req = await createLocalReq({}, payload)
    const results = await ingestListings({ payload, req, sources, perSource: per })
    return Response.json({ success: true, results })
  } catch (e) {
    payload.logger.error({ err: e, message: 'Error ingesting listings' })
    return new Response(
      `Error ingesting listings: ${e instanceof Error ? e.message : String(e)}`,
      { status: 500 },
    )
  }
}
