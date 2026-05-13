import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight } from 'lucide-react'
import ImageGallery from '@/components/ImageGallery'
import RichText from '@/components/RichText'
import { RealtorReviewForm } from '@/components/Forms/RealtorReviewForm'
import { PropertyMap } from '@/components/PropertyMap.tsx'
import { formatMapItems } from '@/lib/mapItems'
import type { PropertyType } from '@/components/PropertyFilters/schemas'

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

  return (
    <article className="max-w-6xl mx-auto space-y-6">
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
        {typeof data.price === 'number' ? (
          <div className="md:text-right">
            <div className="text-headline text-primary">{formatPrice(data.price)}</div>
            {data.transactionType === 'rent' ? (
              <div className="text-body-sm text-on-surface-variant">в месяц</div>
            ) : null}
          </div>
        ) : null}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {data.images?.length ? <ImageGallery images={data.images} /> : null}

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
        </div>

        <aside className="space-y-6">
          {data.realtor ? (
            <section className="bg-card rounded-md shadow-e1 p-6">
              <h2 className="text-title-lg text-on-surface mb-3">Риэлтор</h2>
              <Link href={`/realtors/${data.realtor.slug}`} className="flex items-center gap-3 group">
                {data.realtor.photo?.url ? (
                  <Image
                    src={data.realtor.photo.url}
                    alt={data.realtor.name}
                    width={56}
                    height={56}
                    className="rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <div className="text-title text-primary group-hover:underline">{data.realtor.name}</div>
                  {data.realtor.agency ? (
                    <div className="text-body-sm text-on-surface-variant">{data.realtor.agency}</div>
                  ) : null}
                  {data.realtor.phone ? (
                    <div className="text-body-sm text-on-surface-variant">{data.realtor.phone}</div>
                  ) : null}
                </div>
              </Link>
            </section>
          ) : null}

          {data.realtor?.id ? (
            <section className="bg-card rounded-md shadow-e1 p-6">
              <h2 className="text-title-lg text-on-surface mb-3">Оставить отзыв</h2>
              <RealtorReviewForm realtorId={data.realtor.id} />
            </section>
          ) : null}
        </aside>
      </div>

      {data.coordinates?.lat && data.coordinates?.lng ? (
        <section className="bg-card rounded-md shadow-e1 p-4">
          <h2 className="text-title-lg text-on-surface mb-3 px-2">На карте</h2>
          <PropertyMap title={data.title} items={formatMapItems([data])} baseUrl={`/${type}`} />
        </section>
      ) : null}
    </article>
  )
}
