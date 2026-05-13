import type { Payload, PayloadRequest, RequiredDataFromCollectionSlug } from 'payload'

import { aboutPage } from './about-page'
import { agentsPage } from './agents-page'
import { blogsPage } from './blogs-page'
import { contactPage } from './contact-page'
import { demoPage } from './demo-page'
import { homeV2Page } from './home-v2-page'
import type { PageDeps } from './shared'

interface SeedPagesArgs {
  payload: Payload
  req: PayloadRequest
}

/**
 * Upserts demo content pages built from house/base blocks.
 * Does NOT delete or wipe any other collection. Safe to re-run.
 */
export const seedPages = async ({
  payload,
  req,
}: SeedPagesArgs): Promise<{ created: string[]; updated: string[] }> => {
  payload.logger.info('Seeding demo pages…')

  // Gather optional dependencies from the database. Pages skip blocks
  // whose required relations aren't available.
  const [media, forms] = await Promise.all([
    payload.find({ collection: 'media', limit: 2, sort: 'id', depth: 0 }),
    payload.find({ collection: 'forms', limit: 1, depth: 0 }),
  ])

  const deps: PageDeps = {
    primaryImageId: (media.docs[0]?.id as number | undefined) ?? null,
    secondaryImageId: (media.docs[1]?.id as number | undefined) ?? null,
    contactFormId: (forms.docs[0]?.id as number | undefined) ?? null,
  }

  const pages: RequiredDataFromCollectionSlug<'pages'>[] = [
    demoPage({ amenitiesImageId: deps.primaryImageId }),
    homeV2Page(deps),
    aboutPage(deps),
    agentsPage(deps),
    blogsPage(deps),
    contactPage(deps),
  ]

  const created: string[] = []
  const updated: string[] = []

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
      await payload.create({ collection: 'pages', data, req })
      created.push(String(data.slug))
    }
  }

  payload.logger.info(`Seeded ${created.length} new page(s), updated ${updated.length}.`)
  return { created, updated }
}
