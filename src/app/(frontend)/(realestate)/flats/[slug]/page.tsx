import type { Metadata } from 'next'
import { PropertyDetailPage } from '@/components/PropertyDetailPage'
import { buildPropertyMetadata } from '@/lib/propertyMetadata'

export default async function FlatsDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PropertyDetailPage type="flats" slug={slug} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return buildPropertyMetadata('flats', slug)
}
