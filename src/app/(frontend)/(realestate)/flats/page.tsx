import type { Metadata } from 'next'
import { PropertyListingPage } from '@/components/PropertyListingPage'
import { buildCatalogMeta } from '@/utilities/seo'

export const dynamic = 'force-dynamic'

export default async function FlatsListingRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  return (
    <PropertyListingPage
      type="flats"
      title="Квартиры"
      searchParams={sp}
      mapBaseUrl="/flats"
    />
  )
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}): Promise<Metadata> {
  const sp = await searchParams
  return buildCatalogMeta('flats', sp)
}
