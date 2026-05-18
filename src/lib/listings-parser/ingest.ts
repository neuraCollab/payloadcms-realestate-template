import type { Payload, PayloadRequest } from 'payload'

import { avitoMockProvider } from './providers/avito-mock'
import { etagiMockProvider } from './providers/etagi-mock'
import { sutochnoMockProvider } from './providers/sutochno-mock'
import type { IngestResult, ListingsProvider, SourceId } from './types'

const PROVIDERS: Record<SourceId, ListingsProvider> = {
  avito: avitoMockProvider,
  sutochno: sutochnoMockProvider,
  etagi: etagiMockProvider,
}

interface IngestArgs {
  payload: Payload
  req: PayloadRequest
  /** Sources to run. Defaults to all three. */
  sources?: SourceId[]
  /** Listings per source. */
  perSource?: number
}

/**
 * Runs the requested providers, normalises their output, and creates Payload
 * documents in the matching collections. Skips listings whose slug already
 * exists, so the endpoint is idempotent.
 */
export const ingestListings = async ({
  payload,
  req,
  sources = ['avito', 'sutochno', 'etagi'],
  perSource = 5,
}: IngestArgs): Promise<IngestResult[]> => {
  const results: IngestResult[] = []

  for (const source of sources) {
    const provider = PROVIDERS[source]
    if (!provider) continue

    const result: IngestResult = {
      source,
      attempted: 0,
      created: 0,
      skipped: 0,
      errors: [],
    }

    payload.logger.info(`[listings-parser] fetching ${perSource} listings from ${provider.label}…`)
    const raws = await provider.fetch(perSource)
    result.attempted = raws.length

    for (const raw of raws) {
      try {
        const normalized = provider.normalize(raw)

        // Idempotency: don't insert duplicate slugs.
        const existing = await payload.find({
          collection: normalized.collection,
          where: { slug: { equals: (normalized.payload as any).slug } },
          limit: 1,
          depth: 0,
          req,
        })
        if (existing.docs[0]) {
          result.skipped++
          continue
        }

        await payload.create({
          collection: normalized.collection,
          data: normalized.payload as any,
          req,
        })
        result.created++
      } catch (e) {
        result.errors.push({
          externalId: raw.externalId,
          reason: e instanceof Error ? e.message : String(e),
        })
      }
    }

    payload.logger.info(
      `[listings-parser] ${provider.label}: attempted=${result.attempted} created=${result.created} skipped=${result.skipped} errors=${result.errors.length}`,
    )
    results.push(result)
  }

  return results
}
