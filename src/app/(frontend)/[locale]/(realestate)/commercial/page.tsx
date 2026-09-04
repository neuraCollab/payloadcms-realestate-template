import type { Metadata } from 'next'
import { PropertyListingPage } from '@/components/PropertyListingPage'
import { buildCatalogMeta } from '@/utilities/seo'

export const dynamic = 'force-dynamic'

export default async function CommercialListingRoute(
  props: {
    searchParams: Promise<Record<string, string | undefined>>
  }
) {
  const searchParams = await props.searchParams;
  const sp = await searchParams
  return (
    <PropertyListingPage
      type="commercial"
      title="Коммерческая недвижимость"
      searchParams={sp}
      mapBaseUrl="/commercial"
    />
  )
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}): Promise<Metadata> {
  const sp = await searchParams
  return buildCatalogMeta('commercial', sp)
}
