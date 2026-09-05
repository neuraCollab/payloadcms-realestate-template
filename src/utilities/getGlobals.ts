import type { Config } from 'src/payload-types'

import type { TypedLocale } from 'payload'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal(slug: Global, depth = 0, locale: string) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    // `locale` comes in as a plain string from Next.js route params
    // (`await params`); Payload's Local API wants its generated
    // `TypedLocale` union ('ru' | 'kz' | 'all'), so cast at the boundary
    // rather than widening the public `locale: string` param.
    locale: locale as TypedLocale,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug.
 * `locale` is folded into both the cache key and the tag so a RU and a KZ
 * request for the same global never collide on one cache entry.
 */
export const getCachedGlobal = (slug: Global, depth = 0, locale: string) =>
  unstable_cache(async () => getGlobal(slug, depth, locale), [slug, locale], {
    tags: [`global_${slug}_${locale}`],
  })
