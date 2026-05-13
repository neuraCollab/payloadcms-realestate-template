import type { Payload, PayloadRequest } from 'payload'

import { demoPage } from './demo-page'

interface SeedPagesArgs {
  payload: Payload
  req: PayloadRequest
}

/**
 * Upserts demo content pages built from house/base blocks.
 * Does NOT delete or wipe any other collection. Safe to re-run.
 */
export const seedPages = async ({ payload, req }: SeedPagesArgs): Promise<{ created: string[]; updated: string[] }> => {
  payload.logger.info('Seeding demo pages…')

  // Try to find an existing media doc for blocks that require an image.
  const media = await payload.find({
    collection: 'media',
    limit: 1,
    depth: 0,
  })
  const amenitiesImageId = media.docs[0]?.id ?? null

  const created: string[] = []
  const updated: string[] = []

  const pages = [demoPage({ amenitiesImageId })]

  for (const data of pages) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: data.slug } },
      limit: 1,
      depth: 0,
      req,
    })

    if (existing.docs[0]) {
      await payload.update({
        collection: 'pages',
        id: existing.docs[0].id,
        data,
        req,
      })
      updated.push(String(data.slug))
    } else {
      await payload.create({
        collection: 'pages',
        data,
        req,
      })
      created.push(String(data.slug))
    }
  }

  payload.logger.info(`Seeded ${created.length} new page(s), updated ${updated.length}.`)
  return { created, updated }
}
