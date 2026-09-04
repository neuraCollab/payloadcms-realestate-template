import type { Metadata } from 'next'
import { PropertyListingPage } from '@/components/PropertyListingPage'
import { buildCatalogMeta } from '@/utilities/seo'

export const dynamic = 'force-dynamic'

export default async function LandsListingRoute(
  props: {
    searchParams: Promise<Record<string, string | undefined>>
  }
) {
  const searchParams = await props.searchParams;
  const sp = await searchParams
  return (
    <PropertyListingPage
      type="lands"
      title="Земельные участки"
      searchParams={sp}
      mapBaseUrl="/lands"
    />
  )
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}): Promise<Metadata> {
  const sp = await searchParams
  return buildCatalogMeta('lands', sp)
}
