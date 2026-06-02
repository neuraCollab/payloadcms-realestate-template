import type { Metadata } from 'next'
import { PropertyDetailPage } from '@/components/PropertyDetailPage'
import { buildPropertyMetadata } from '@/lib/propertyMetadata'

// SSG skipped — DB unreachable at build-time inside docker compose.
export const dynamic = 'force-dynamic'

export default async function LandsDetailRoute({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <PropertyDetailPage type="lands" slug={slug} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  return buildPropertyMetadata('lands', slug)
}
