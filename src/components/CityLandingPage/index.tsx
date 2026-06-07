import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Building2, Home, MapPin, Trees, Briefcase, ArrowRight } from 'lucide-react'
import { PropertyCard } from '@/components/PropertyCard'
import { POPULAR_FILTERS_FOR_CITY, parseFilterSlug } from '@/lib/cityUrls'
import { buildBreadcrumbJsonLd } from '@/utilities/seo'

interface Props {
  city: any
}

interface Counters {
  flats: number
  commercial: number
  lands: number
  complexes: number
}

const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

export const CityLandingPage: React.FC<Props> = async ({ city }) => {
  const payload = await getPayload({ config })

  // Counts per category for this city
  const [flatsRes, commercialRes, landsRes, complexesRes, recentFlats] = await Promise.all([
    payload.count({
      collection: 'flats',
      where: {
        and: [
          { 'location.city': { equals: city.name } },
          { status: { equals: 'active' } },
        ],
      },
    }),
    payload.count({
      collection: 'commercial',
      where: {
        and: [
          { 'location.city': { equals: city.name } },
          { status: { equals: 'active' } },
        ],
      },
    }),
    payload.count({
      collection: 'lands',
      where: {
        and: [
          { 'location.city': { equals: city.name } },
          { status: { equals: 'active' } },
        ],
      },
    }),
    payload.count({
      collection: 'residential-complexes',
      where: { 'location.city': { equals: city.name } },
    }),
    payload.find({
      collection: 'flats',
      where: {
        and: [
          { 'location.city': { equals: city.name } },
          { status: { equals: 'active' } },
        ],
      },
      sort: '-createdAt',
      limit: 6,
      depth: 1,
    }),
  ])

  const counters: Counters = {
    flats: flatsRes.totalDocs,
    commercial: commercialRes.totalDocs,
    lands: landsRes.totalDocs,
    complexes: complexesRes.totalDocs,
  }

  const totalListings = counters.flats + counters.commercial + counters.lands + counters.complexes

  // Categories navigation (skip empty ones).
  const categories: Array<{
    label: string
    href: string
    count: number
    icon: React.ReactNode
  }> = [
    {
      label: 'Квартиры',
      href: `/${city.slug}/kvartiry`,
      count: counters.flats,
      icon: <Home className="w-5 h-5" />,
    },
    {
      label: 'Коммерческая',
      href: `/${city.slug}/kommercheskaya`,
      count: counters.commercial,
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      label: 'Земля',
      href: `/${city.slug}/uchastki`,
      count: counters.lands,
      icon: <Trees className="w-5 h-5" />,
    },
    {
      label: 'Жилые комплексы',
      href: `/${city.slug}/zhiloy-kompleks`,
      count: counters.complexes,
      icon: <Building2 className="w-5 h-5" />,
    },
  ].filter((c) => c.count > 0)

  const popularLinks = POPULAR_FILTERS_FOR_CITY.map((slug) => {
    const parsed = parseFilterSlug(slug)
    return parsed
      ? {
          href: `/${city.slug}/${slug}`,
          label: parsed.label,
        }
      : null
  }).filter((x): x is { href: string; label: string } => x !== null)

  const heroUrl: string | undefined = city.heroImage?.url

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Главная', url: '/' },
    { name: city.name, url: `/${city.slug}` },
  ])

  return (
    <article className="pt-16 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero */}
      <section className="relative">
        <div className="container">
          <div className="relative rounded-xl overflow-hidden bg-surface-container">
            {heroUrl ? (
              <Image
                src={heroUrl}
                alt={city.name}
                width={1600}
                height={500}
                priority
                className="w-full h-72 object-cover"
              />
            ) : (
              <div className="w-full h-72 bg-gradient-to-br from-primary/30 via-primary/15 to-surface-container" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-1.5 text-body-sm opacity-90">
                <MapPin className="w-4 h-4" />
                {city.country ?? 'Россия'}
                {city.region ? <span>· {city.region}</span> : null}
              </div>
              <h1 className="text-display mt-1">Недвижимость в городе {city.name}</h1>
              <p className="text-body-sm mt-2 opacity-90">
                {totalListings.toLocaleString('ru-RU')}{' '}
                {totalListings === 1 ? 'объект' : 'объектов'} в базе
                {city.population
                  ? ` · население ${city.population.toLocaleString('ru-RU')} чел.`
                  : ''}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      {city.description ? (
        <section className="container mt-8">
          <p className="text-body text-on-surface-variant max-w-3xl">{city.description}</p>
        </section>
      ) : null}

      {/* Category tiles */}
      {categories.length > 0 ? (
        <section className="container mt-10">
          <h2 className="text-headline text-on-surface mb-4">Категории</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {categories.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group bg-card rounded-md shadow-e1 p-5 hover:shadow-e2 transition-shadow"
              >
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center mb-3">
                  {c.icon}
                </div>
                <div className="text-title text-on-surface group-hover:text-primary">
                  {c.label}
                </div>
                <div className="text-body-sm text-on-surface-variant mt-0.5">
                  {c.count.toLocaleString('ru-RU')}{' '}
                  {c.count === 1 ? 'объявление' : 'объявлений'}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Popular filters */}
      {popularLinks.length > 0 ? (
        <section className="container mt-10">
          <h2 className="text-headline text-on-surface mb-4">Популярные запросы</h2>
          <div className="flex flex-wrap gap-2">
            {popularLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-body-sm text-on-surface hover:bg-surface-container-high transition-colors"
              >
                {l.label}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Recent listings */}
      {recentFlats.docs.length > 0 ? (
        <section className="container mt-10">
          <div className="flex items-baseline justify-between gap-2 mb-4 flex-wrap">
            <h2 className="text-headline text-on-surface">Свежие квартиры</h2>
            <Link
              href={`/${city.slug}/kvartiry`}
              className="text-body-sm text-primary hover:underline"
            >
              Все квартиры ({counters.flats})
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentFlats.docs.map((doc: any) => (
              <PropertyCard
                key={doc.id}
                href={`/flats/${doc.slug}`}
                title={doc.title}
                address={doc.location?.address}
                imageUrl={doc.images?.[0]?.image?.url ?? null}
                badge={
                  doc.transactionType === 'sale'
                    ? 'Продажа'
                    : doc.transactionType === 'rent'
                    ? 'Аренда'
                    : undefined
                }
                price={doc.price}
                priceSuffix={doc.transactionType === 'rent' ? '/ мес' : undefined}
                meta={[
                  doc.rooms ? { label: `${doc.rooms} комн.` } : null,
                  doc.area?.total ? { label: `${doc.area.total} м²` } : null,
                ].filter(Boolean) as Array<{ label: string }>}
              />
            ))}
          </div>
        </section>
      ) : (
        <section className="container mt-10">
          <div className="text-center py-16 bg-card rounded-md shadow-e1">
            <p className="text-body text-on-surface-variant">
              В этом городе пока нет объявлений. Загляните позже.
            </p>
          </div>
        </section>
      )}
    </article>
  )
}
