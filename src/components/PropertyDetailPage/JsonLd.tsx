import React from 'react'
import { getServerSideURL } from '@/utilities/getURL'
import type { PropertyType } from '@/components/PropertyFilters/schemas'

interface Props {
  data: any
  type: PropertyType
  /**
   * Агрегированная оценка риэлтора (по одобренным отзывам). Если
   * прокинута — попадёт в RealEstateListing.aggregateRating →
   * звёзды в выдаче. Без 1+ отзыва Google звёзды не покажет.
   */
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  } | null
}

const TYPE_NAME: Record<PropertyType, string> = {
  flats: 'Квартиры',
  commercial: 'Коммерческая недвижимость',
  lands: 'Земельные участки',
  'residential-complexes': 'Жилые комплексы',
}

const SCHEMA_TYPE: Record<PropertyType, string> = {
  flats: 'Apartment',
  commercial: 'CommercialBuilding',
  lands: 'Place',
  'residential-complexes': 'ApartmentComplex',
}

/**
 * Renders schema.org JSON-LD for the property detail page:
 *   - RealEstateListing (with embedded Place/Offer)
 *   - BreadcrumbList
 *   - Organization (publisher)
 * Crawled by Google Real Estate, Yandex Webmaster, etc.
 */
export const PropertyJsonLd: React.FC<Props> = ({ data, type, aggregateRating }) => {
  const baseUrl = getServerSideURL()
  const url = `${baseUrl}/${type}/${data.slug}`
  const images: string[] = (data.images ?? [])
    .map((it: any) => it?.image?.url)
    .filter((u: any): u is string => typeof u === 'string')
    .map((u: string) => new URL(u, baseUrl).toString())

  const listing = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: data.title,
    url,
    image: images,
    datePosted: data.publishedAt ?? data.createdAt,
    description:
      typeof data.description === 'string'
        ? data.description
        : `${data.title} — ${data.location?.address ?? ''}`,
    ...(typeof data.price === 'number'
      ? {
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: data.currency ?? 'RUB',
            availability:
              data.status === 'active'
                ? 'https://schema.org/InStock'
                : 'https://schema.org/SoldOut',
            url,
          },
        }
      : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: data.location?.address,
      addressLocality: data.location?.city,
      addressRegion: data.location?.district,
      addressCountry: 'RU',
    },
    ...(typeof data.coordinates?.lat === 'number' && typeof data.coordinates?.lng === 'number'
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.coordinates.lat,
            longitude: data.coordinates.lng,
          },
        }
      : {}),
    ...(data.area?.total
      ? {
          floorSize: {
            '@type': 'QuantitativeValue',
            value: data.area.total,
            unitText: 'MTK', // м²
          },
        }
      : {}),
    ...(data.rooms && data.rooms !== 'studio'
      ? { numberOfRooms: parseInt(String(data.rooms), 10) || undefined }
      : {}),
    // Звёзды в SERP. Google требует ratingValue (1-5), reviewCount > 0
    // и видимый рейтинг где-то на странице — наш RealtorCard рисует
    // averageRating рядом с именем риэлтора, требование выполнено.
    ...(aggregateRating && aggregateRating.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: aggregateRating.ratingValue.toFixed(1),
            reviewCount: aggregateRating.reviewCount,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    additionalType: SCHEMA_TYPE[type],
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Главная',
        item: baseUrl + '/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: TYPE_NAME[type],
        item: `${baseUrl}/${type}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: data.title,
        item: url,
      },
    ],
  }

  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Demo Realty',
    url: baseUrl,
    logo: `${baseUrl}/favicon.svg`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listing) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
    </>
  )
}
