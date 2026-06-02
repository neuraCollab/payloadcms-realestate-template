import { PropertyListingPage } from '@/components/PropertyListingPage'

export default async function CommercialListingRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  return (
    <PropertyListingPage
      type="commercial"
      title="Коммерческая"
      searchParams={sp}
      mapBaseUrl="/commercial"
    />
  )
}
