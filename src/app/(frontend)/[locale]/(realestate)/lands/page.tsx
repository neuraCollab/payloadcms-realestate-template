import type { Metadata } from 'next'
import { PropertyListingPage } from '@/components/PropertyListingPage'
import { buildCatalogMeta } from '@/utilities/seo'

export const dynamic = 'force-dynamic'

export default async function LandsListingRoute(props: {
  params: Promise<{ locale: string }>
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const { locale } = await props.params
  const sp = await props.searchParams
  return (
    <PropertyListingPage
      type="lands"
      title="Земельные участки"
      searchParams={sp}
      mapBaseUrl="/lands"
      locale={locale}
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
