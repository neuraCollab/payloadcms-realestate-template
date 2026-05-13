import { PropertyDetailPage } from '@/components/PropertyDetailPage'

export default async function LandsDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PropertyDetailPage type="lands" slug={slug} />
}
