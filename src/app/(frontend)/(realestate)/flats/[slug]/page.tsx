import { PropertyDetailPage } from '@/components/PropertyDetailPage'

export default async function FlatsDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PropertyDetailPage type="flats" slug={slug} />
}
