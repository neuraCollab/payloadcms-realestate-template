import type { Metadata } from 'next'
import { PropertyDetailPage } from '@/components/PropertyDetailPage'
import { buildPropertyMetadata } from '@/lib/propertyMetadata'

// ISR: см. flats/[slug]/page.tsx — 5 мин кеш на каждую страницу.
export const revalidate = 300

export default async function ComplexesDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  return <PropertyDetailPage type="residential-complexes" slug={slug} locale={locale} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  return buildPropertyMetadata('residential-complexes', slug, locale)
}
