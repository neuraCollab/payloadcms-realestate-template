import { PropertyListingPage } from '@/components/PropertyListingPage'

export default async function LandsListingRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
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
