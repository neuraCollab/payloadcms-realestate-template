import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      process.env.VERCEL_PROJECT_PRODUCTION_URL ||
      'https://example.com'

    // `_status` нельзя запрашивать напрямую. `draft: false` уже
    // отсекает черновики.
    const [results, citiesRes] = await Promise.all([
      payload.find({
        collection: 'pages',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
      // City landing pages — каждый активный город — отдельный URL
      // /<city-slug>. Auto-created хуком при первом объявлении из
      // нового города (см. src/collections/hooks/cityAutoCreate.ts).
      payload.find({
        collection: 'cities',
        where: { isActive: { equals: true } },
        limit: 1000,
        pagination: false,
        depth: 0,
        select: {
          slug: true,
          updatedAt: true,
        },
      }),
    ])

    const dateFallback = new Date().toISOString()

    // Базовый набор «всегда»: корень + основные каталоги. /search и
    // /cabinet/* пропускаем намеренно — они noindex (см. их metadata).
    const defaultSitemap = [
      { loc: `${SITE_URL}/`, lastmod: dateFallback },
      { loc: `${SITE_URL}/flats`, lastmod: dateFallback },
      { loc: `${SITE_URL}/commercial`, lastmod: dateFallback },
      { loc: `${SITE_URL}/lands`, lastmod: dateFallback },
      { loc: `${SITE_URL}/residential-complexes`, lastmod: dateFallback },
      { loc: `${SITE_URL}/agents`, lastmod: dateFallback },
      { loc: `${SITE_URL}/posts`, lastmod: dateFallback },
    ]

    // Slug'и Pages из БД, которые мы отключили (см. [slug]/page.tsx →
    // DISABLED_PAGE_SLUGS) — не должны попадать в sitemap.
    const DISABLED = new Set(['home-v2'])

    const sitemap = results.docs
      ? results.docs
          .filter((page) => Boolean(page?.slug) && !DISABLED.has(page!.slug!))
          // `home` уже отдан корнем в defaultSitemap — не дублируем.
          .filter((page) => page!.slug !== 'home')
          .map((page) => ({
            loc: `${SITE_URL}/${page!.slug}`,
            lastmod: page!.updatedAt || dateFallback,
          }))
      : []

    const citySitemap = citiesRes.docs
      ? citiesRes.docs
          .filter((c) => Boolean(c?.slug))
          .map((c) => ({
            loc: `${SITE_URL}/${c!.slug}`,
            lastmod: (c as any).updatedAt || dateFallback,
          }))
      : []

    return [...defaultSitemap, ...sitemap, ...citySitemap]
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
