import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'

import { PropertyListingPage } from '@/components/PropertyListingPage'
import { ALL_FILTER_SLUGS, parseFilterSlug } from '@/lib/cityUrls'

interface RouteParams {
  slug: string
  filterSlug: string
}

interface Args {
  params: Promise<RouteParams>
  searchParams: Promise<Record<string, string | undefined>>
}

// Pre-generate the popular (city × filter) combinations so they're SSG'd.
// Falls back to SSR for any (city × filter) not in the list.
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const cities = await payload.find({
    collection: 'cities',
    where: { isActive: { equals: true } },
    limit: 1000,
    pagination: false,
    select: { slug: true },
  })

  const params: RouteParams[] = []
  for (const c of cities.docs ?? []) {
    if (!c.slug) continue
    for (const filterSlug of ALL_FILTER_SLUGS) {
      params.push({ slug: c.slug, filterSlug })
    }
  }
  return params
}

const fetchCity = async (slug: string) => {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'cities',
    where: {
      and: [{ slug: { equals: slug } }, { isActive: { equals: true } }],
    },
    limit: 1,
    depth: 0,
    pagination: false,
  })
  return res.docs?.[0] ?? null
}

export default async function CityFilterPage({
  params: paramsPromise,
  searchParams: searchParamsPromise,
}: Args) {
  const { slug, filterSlug } = await paramsPromise
  const userParams = await searchParamsPromise

  const city = await fetchCity(slug)
  if (!city) notFound()

  const parsed = parseFilterSlug(filterSlug)
  if (!parsed) notFound()

  // Compose searchParams: filter-slug provides defaults, user-supplied overrides win.
  const composed: Record<string, string | undefined> = {
    city: city.name,
    ...(parsed.transactionType ? { transactionType: parsed.transactionType } : {}),
    ...userParams,
  }

  return (
    <div className="pt-16 pb-24">
      <div className="container">
        <PropertyListingPage
          type={parsed.category}
          title={`${parsed.label} в городе ${city.name}`}
          searchParams={composed}
          mapBaseUrl={`/${parsed.category}`}
        />
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug, filterSlug } = await paramsPromise
  const city = await fetchCity(slug)
  const parsed = parseFilterSlug(filterSlug)
  if (!city || !parsed) {
    return { title: 'Страница не найдена' }
  }
  return {
    title: `${parsed.label} в городе ${city.name}`,
    description: `${parsed.label.toLowerCase()} в городе ${city.name}. Свежие объявления с фильтрами и картой.`,
  }
}
