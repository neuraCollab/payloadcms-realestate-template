import { PropertyDetailPage } from '@/components/PropertyDetailPage'

export default async function ComplexesDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PropertyDetailPage type="residential-complexes" slug={slug} />
}
