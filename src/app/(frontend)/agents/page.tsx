import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Star, MapPin, Phone, Search as SearchIcon, User as UserIcon } from 'lucide-react'
import { AgentsSearch } from './AgentsSearch'

type Args = {
  searchParams: Promise<{ q?: string; city?: string }>
}

interface RealtorWithStats {
  doc: any
  avgRating: number | null
  reviewsCount: number
  activeListingsCount: number
}

const TOP_LIMIT = 3

const computeStats = async (
  payload: any,
  realtors: any[],
): Promise<RealtorWithStats[]> => {
  return Promise.all(
    realtors.map(async (r) => {
      const [reviews, listings] = await Promise.all([
        payload.find({
          collection: 'reviews',
          where: {
            and: [{ realtor: { equals: r.id } }, { status: { equals: 'approved' } }],
          },
          limit: 100,
          depth: 0,
        }),
        payload.count({
          collection: 'flats',
          where: {
            and: [{ realtor: { equals: r.id } }, { status: { equals: 'active' } }],
          },
        }),
      ])
      const avgRating =
        reviews.totalDocs > 0
          ? reviews.docs.reduce((s: number, x: any) => s + (x.rating ?? 0), 0) / reviews.totalDocs
          : null
      return {
        doc: r,
        avgRating,
        reviewsCount: reviews.totalDocs,
        activeListingsCount: listings.totalDocs,
      }
    }),
  )
}

const TopAgentCard: React.FC<{ stats: RealtorWithStats; medal: number }> = ({ stats, medal }) => {
  const { doc, avgRating, reviewsCount, activeListingsCount } = stats
  return (
    <div className="relative bg-card rounded-md shadow-e2 p-6 flex flex-col items-center text-center">
      <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100 text-amber-900 text-label font-semibold">
        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
        ТОП #{medal}
      </div>
      {doc.photo?.url ? (
        <Image
          src={doc.photo.url}
          alt={doc.name ?? 'Риэлтор'}
          width={96}
          height={96}
          className="rounded-full object-cover mb-3"
        />
      ) : (
        <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mb-3">
          <UserIcon className="w-10 h-10 text-on-surface-variant" />
        </div>
      )}
      <h3 className="text-title-lg text-on-surface">{doc.name ?? 'Риэлтор'}</h3>
      {doc.agency ? (
        <p className="text-body-sm text-on-surface-variant mt-0.5">{doc.agency}</p>
      ) : null}
      {avgRating !== null ? (
        <div className="flex items-center gap-1 mt-2 text-body-sm">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span className="text-on-surface font-semibold">{avgRating.toFixed(1)}</span>
          <span className="text-on-surface-variant">({reviewsCount})</span>
        </div>
      ) : null}
      <div className="mt-3 text-label text-on-surface-variant">
        Активных объектов: {activeListingsCount}
      </div>
      <Link
        href={`/realtors/${doc.slug}`}
        className="mt-4 inline-flex h-9 px-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Открыть профиль
      </Link>
    </div>
  )
}

const AgentRow: React.FC<{ stats: RealtorWithStats }> = ({ stats }) => {
  const { doc, avgRating, reviewsCount, activeListingsCount } = stats
  return (
    <Link
      href={`/realtors/${doc.slug}`}
      className="group flex items-center gap-4 bg-card rounded-md shadow-e1 p-4 hover:shadow-e2 transition-shadow"
    >
      {doc.photo?.url ? (
        <Image
          src={doc.photo.url}
          alt={doc.name ?? 'Риэлтор'}
          width={56}
          height={56}
          className="rounded-full object-cover shrink-0"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center shrink-0">
          <UserIcon className="w-6 h-6 text-on-surface-variant" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="text-title text-on-surface group-hover:text-primary line-clamp-1">
          {doc.name ?? 'Риэлтор'}
        </div>
        <div className="text-body-sm text-on-surface-variant line-clamp-1">
          {doc.agency ?? 'Частный риэлтор'}
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-label text-on-surface-variant">
          {avgRating !== null ? (
            <span className="inline-flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              {avgRating.toFixed(1)} ({reviewsCount})
            </span>
          ) : (
            <span>Нет отзывов</span>
          )}
          <span>·</span>
          <span>{activeListingsCount} активных</span>
        </div>
      </div>
      {doc.phone ? (
        <a
          href={`tel:${doc.phone.replace(/\s/g, '')}`}
          onClick={(e) => e.stopPropagation()}
          className="hidden sm:inline-flex items-center gap-1 h-9 px-3 rounded-full border border-border text-body-sm hover:bg-surface-container transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          {doc.phone}
        </a>
      ) : null}
    </Link>
  )
}

export default async function AgentsPage({ searchParams: searchParamsPromise }: Args) {
  const sp = await searchParamsPromise
  const q = sp.q?.trim()
  const payload = await getPayload({ config: configPromise })

  // Fetch all realtors. Filter by q on the server (case-insensitive in name/agency).
  const where: any = { role: { equals: 'realtor' } }
  if (q) {
    where.or = [
      { name: { like: q } },
      { agency: { like: q } },
      { bio: { like: q } },
    ]
  }
  const result = await payload.find({
    collection: 'users',
    where,
    sort: 'name',
    limit: 100,
    depth: 1,
  })

  const withStats = await computeStats(payload, result.docs)

  // Top-N by avgRating, with reviews >= 1; tie-break by activeListingsCount.
  const top = [...withStats]
    .filter((s) => s.avgRating !== null)
    .sort((a, b) => {
      const r = (b.avgRating ?? 0) - (a.avgRating ?? 0)
      if (r !== 0) return r
      return b.activeListingsCount - a.activeListingsCount
    })
    .slice(0, TOP_LIMIT)

  const topIds = new Set(top.map((t) => t.doc.id))
  const rest = withStats.filter((s) => !topIds.has(s.doc.id))

  return (
    <article className="pt-16 pb-24">
      <div className="container space-y-10">
        {/* Hero */}
        <header className="text-center space-y-3">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-label font-medium">
            Команда
          </span>
          <h1 className="text-display text-on-surface">Найдите своего риэлтора</h1>
          <p className="text-body text-on-surface-variant max-w-2xl mx-auto">
            Просмотрите профили проверенных риэлторов. Отзывы клиентов, активные объекты и
            прямой контакт — выбирайте того, кто подходит именно вам.
          </p>
        </header>

        {/* Search */}
        <AgentsSearch initialQ={q ?? ''} />

        {/* Top podium — only shown when no search filter active */}
        {!q && top.length > 0 ? (
          <section>
            <div className="flex items-baseline gap-2 mb-4">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-headline text-on-surface">Топ риэлторов</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {top.map((s, i) => (
                <TopAgentCard key={s.doc.id} stats={s} medal={i + 1} />
              ))}
            </div>
          </section>
        ) : null}

        {/* All agents (or filtered) */}
        <section>
          <div className="flex items-baseline justify-between gap-2 mb-4 flex-wrap">
            <h2 className="text-headline text-on-surface">
              {q ? 'Результаты поиска' : 'Все риэлторы'}
            </h2>
            <p className="text-body-sm text-on-surface-variant">
              Найдено: {result.totalDocs}
              {q ? ` по запросу «${q}»` : ''}
            </p>
          </div>

          {(q ? withStats : rest).length === 0 ? (
            <div className="text-center py-16 bg-card rounded-md shadow-e1">
              <SearchIcon className="w-10 h-10 text-on-surface-variant/40 mx-auto mb-3" />
              <p className="text-body text-on-surface-variant">
                Никого не нашлось. Попробуйте смягчить запрос.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {(q ? withStats : rest).map((s) => (
                <AgentRow key={s.doc.id} stats={s} />
              ))}
            </div>
          )}
        </section>
      </div>
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Агенты — Realty',
  description: 'Топ риэлторов с отзывами клиентов и активными объектами недвижимости.',
}
