import type { Metadata } from 'next'
import { PropertyDetailPage } from '@/components/PropertyDetailPage'
import { buildPropertyMetadata } from '@/lib/propertyMetadata'

// ISR: первая загрузка идёт в БД, потом 5 мин из кеша. Цена
// обновляется редко, повторный заход быстрый. На revalidate Next
// перегенерирует страницу в фоне — пользователь stale-данных
// не увидит дольше 5 мин.
export const revalidate = 300

export default async function FlatsDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  return <PropertyDetailPage type="flats" slug={slug} locale={locale} />
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  return buildPropertyMetadata('flats', slug, locale)
}
