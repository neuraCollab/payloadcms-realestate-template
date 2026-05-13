import { PropertyListingPage } from '@/components/PropertyListingPage'

export default async function ComplexesListingRoute({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const sp = await searchParams
  return (
    <PropertyListingPage
      type="residential-complexes"
      title="Жилые комплексы"
      searchParams={sp}
      mapBaseUrl="/residential-complexes"
    />
  )
}
