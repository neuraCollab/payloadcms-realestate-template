import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

// flats/commercial/lands are gated by `status: active` — same filter the
// catalog pages use (see PropertyFilters/index.tsx). Residential complexes
// have no such gate: every status value (planning/under-construction/
// completed) is publicly listable.
const getListingsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    const dateFallback = new Date().toISOString()

    const [flats, commercial, lands, complexes] = await Promise.all([
      payload.find({
        collection: 'flats',
        where: { status: { equals: 'active' } },
        depth: 0,
        limit: 5000,
        pagination: false,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'commercial',
        where: { status: { equals: 'active' } },
        depth: 0,
        limit: 5000,
        pagination: false,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'lands',
        where: { status: { equals: 'active' } },
        depth: 0,
        limit: 5000,
        pagination: false,
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: 'residential-complexes',
        depth: 0,
        limit: 5000,
        pagination: false,
        select: { slug: true, updatedAt: true },
      }),
    ])

    const toEntries = (type: string, docs: any[]) =>
      docs
        .filter((d) => Boolean(d?.slug))
        .map((d) => ({
          loc: `${SITE_URL}/${type}/${d.slug}`,
          lastmod: d.updatedAt || dateFallback,
        }))

    return [
      ...toEntries('flats', flats.docs),
      ...toEntries('commercial', commercial.docs),
      ...toEntries('lands', lands.docs),
      ...toEntries('residential-complexes', complexes.docs),
    ]
  },
  ['listings-sitemap'],
  {
    tags: ['listings-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getListingsSitemap()

  return getServerSideSitemap(sitemap)
}
