import { PropertyListingPage } from '@/components/PropertyListingPage'

// SSG skipped — DB unreachable at build-time inside docker compose.
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
