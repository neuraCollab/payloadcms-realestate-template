import type { Metadata } from 'next'
import { PropertyDetailPage } from '@/components/PropertyDetailPage'
import { buildPropertyMetadata } from '@/lib/propertyMetadata'

export default async function CommercialDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PropertyDetailPage type="commercial" slug={slug} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return buildPropertyMetadata('commercial', slug)
}
