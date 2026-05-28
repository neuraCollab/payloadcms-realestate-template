import type { Payload, PayloadRequest } from 'payload'
import { slugifyRu } from '@/collections/Cities'

const cache = new Map<string, string | number>()

/**
 * Make sure a Cities document exists for the given city name. Returns its id.
 * In-memory cache keeps a single ingest pass fast — cleared on next process boot.
 */
export const upsertCity = async ({
  payload,
  req,
  name,
}: {
  payload: Payload
  req: PayloadRequest
  name: string
}): Promise<string | number | null> => {
  const trimmed = name?.trim()
  if (!trimmed) return null
  const slug = slugifyRu(trimmed)
  if (!slug) return null

  if (cache.has(slug)) return cache.get(slug)!

  const existing = await payload.find({
    collection: 'cities',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    req,
  })
  if (existing.docs[0]) {
    const id = existing.docs[0].id
    cache.set(slug, id)
    return id
  }

  try {
    const created = await payload.create({
      collection: 'cities',
      data: { name: trimmed, slug, isActive: true },
      req,
    })
    cache.set(slug, created.id)
    return created.id
  } catch (e) {
    payload.logger.warn(`[city-upsert] failed to create city "${trimmed}": ${e instanceof Error ? e.message : e}`)
    return null
  }
}
