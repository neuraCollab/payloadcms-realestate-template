import { PropertyDetailPage } from '@/components/PropertyDetailPage'

export default async function CommercialDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PropertyDetailPage type="commercial" slug={slug} />
}
