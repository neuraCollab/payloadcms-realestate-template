import { PropertyListingPage } from '@/components/PropertyListingPage'

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
