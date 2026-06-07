import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ImageGallery from '@/components/ImageGallery'
import RichText from '@/components/RichText'
import { RealtorReviewForm } from '@/components/Forms/RealtorReviewForm'
import { PropertyMetaBar } from './PropertyMetaBar'
import { PropertySpecs } from './PropertySpecs'
import { PropertyAnalytics } from './PropertyAnalytics'
import { RealtorCard } from './RealtorCard'
import { ContactCTA } from '@/components/LeadForm/ContactCTA'
import { PropertyFaq } from './PropertyFaq'
import { MortgageCalculator } from './MortgageCalculator'
import { PriceHistoryChart } from './PriceHistoryChart'
import { PropertyJsonLd } from './JsonLd'
import { TrackView } from './TrackView'
import { FavoriteButton } from '@/components/FavoriteButton'
import type { PropertyType } from '@/components/PropertyFilters/schemas'
import { buildBreadcrumbJsonLd } from '@/utilities/seo'

const COLLECTION_MAP: Record<PropertyType, string> = {
  flats: 'flats',
  commercial: 'commercial',
  lands: 'lands',
  'residential-complexes': 'residential-complexes',
}

const TYPE_LABEL: Record<PropertyType, string> = {
  flats: 'Квартиры',
  commercial: 'Коммерческая',
  lands: 'Участки',
  'residential-complexes': 'ЖК',
}

interface Props {
  type: PropertyType
  slug: string
}

const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

export const PropertyDetailPage: React.FC<Props> = async ({ type, slug }) => {
  const payload = await getPayload({ config })

  const found = await payload.find({
    collection: COLLECTION_MAP[type] as any,
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  if (!found.docs.length) notFound()
  const data: any = found.docs[0]

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Главная', url: '/' },
    { name: TYPE_LABEL[type], url: `/${type}` },
    { name: data.title, url: `/${type}/${slug}` },
  ])

  return (
    <article className="max-w-6xl mx-auto space-y-6">
      <PropertyJsonLd data={data} type={type} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <TrackView collection={type} id={data.id} />
      <nav aria-label="breadcrumb" className="flex items-center gap-1 text-body-sm text-on-surface-variant">
        <Link href="/" className="hover:text-on-surface">Главная</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/${type}`} className="hover:text-on-surface">{TYPE_LABEL[type]}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-on-surface line-clamp-1">{data.title}</span>
      </nav>

      <header className="bg-card rounded-md shadow-e1 p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-headline text-on-surface">{data.title}</h1>
          {data.location?.address ? (
            <p className="text-body text-on-surface-variant mt-1">{data.location.address}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-3">
          <FavoriteButton collection={type} id={data.id} variant="full" />
          {typeof data.price === 'number' ? (
            <div className="md:text-right">
              <div className="text-headline text-primary">{formatPrice(data.price)}</div>
              {data.transactionType === 'rent' ? (
                <div className="text-body-sm text-on-surface-variant">в месяц</div>
              ) : null}
            </div>
          ) : null}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Галерея отрисовывается всегда: при отсутствии настоящих фото
              ImageGallery подсовывает мок-набор (placeholders.ts). */}
          <ImageGallery images={data.images} />

          <PropertyMetaBar data={data} type={type} />

          <PropertySpecs data={data} type={type} />

          {data.transactionType === 'sale' && typeof data.price === 'number' ? (
            <MortgageCalculator price={data.price} />
          ) : null}

          {Array.isArray(data.priceHistory) && data.priceHistory.length >= 2 ? (
            <PriceHistoryChart history={data.priceHistory} currency={data.currency ?? 'RUB'} />
          ) : null}

          {type === 'flats' ? <PropertyAnalytics subject={data} /> : null}

          {data.description ? (
            <section className="bg-card rounded-md shadow-e1 p-6">
              <h2 className="text-title-lg text-on-surface mb-3">Описание</h2>
              <RichText data={data.description} enableGutter={false} />
            </section>
          ) : null}

          {Array.isArray(data.amenities) && data.amenities.length > 0 ? (
            <section className="bg-card rounded-md shadow-e1 p-6">
              <h2 className="text-title-lg text-on-surface mb-3">Удобства</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {data.amenities.map((a: any, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-body-sm text-on-surface">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {a.amenity}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Типизированный FAQ + FAQPage JSON-LD — rich snippet
              «People also ask» в Google + снятие возражений до контакта. */}
          <PropertyFaq type={type} />
        </div>

        <aside className="space-y-6">
          {/* Primary CTA — заметная синяя кнопка над карточкой риэлтора.
              Открывает диалог с 4 каналами связи (звонок/TG/WA/IG). */}
          <ContactCTA
            realtorId={data.realtor?.id}
            propertyCollection={type}
            propertyId={data.id}
            propertyTitle={data.title}
          />

          {data.realtor ? (
            <RealtorCard
              realtor={data.realtor}
              excludePropertyId={data.id}
              propertyTitle={data.title}
            />
          ) : null}

          {data.realtor?.id ? (
            <section className="bg-card rounded-md shadow-e1 p-6">
              <h2 className="text-title-lg text-on-surface mb-3">Оставить отзыв</h2>
              <RealtorReviewForm realtorId={String(data.realtor.id)} />
            </section>
          ) : null}
        </aside>
      </div>

    </article>
  )
}
