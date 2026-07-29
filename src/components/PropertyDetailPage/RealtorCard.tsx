import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { User as UserIcon, Star } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Button } from '@/components/ui/button'
import { MessageButton } from './MessageButton'
import { MaskedPhone } from '@/components/MaskedPhone'
import { formatPrice } from '@/utilities/formatPrice'


interface Props {
  realtor: any
  excludePropertyId?: string | number
  propertyTitle?: string
}


// Server component. Fetches active flats from this realtor + recent approved reviews.
export const RealtorCard: React.FC<Props> = async ({
  realtor,
  excludePropertyId,
  propertyTitle,
}) => {
  const payload = await getPayload({ config })

  const [activeListings, soldListings, reviews] = await Promise.all([
    payload.find({
      collection: 'flats',
      where: {
        and: [
          { realtor: { equals: realtor.id } },
          { status: { equals: 'active' } },
          ...(excludePropertyId ? [{ id: { not_equals: excludePropertyId } }] : []),
        ],
      },
      sort: '-createdAt',
      limit: 4,
      depth: 1,
    }),
    payload.find({
      collection: 'flats',
      where: {
        and: [
          { realtor: { equals: realtor.id } },
          { status: { equals: 'sold' } },
        ],
      },
      sort: '-updatedAt',
      limit: 3,
      depth: 1,
    }),
    payload.find({
      collection: 'reviews',
      where: {
        and: [
          { realtor: { equals: realtor.id } },
          { status: { equals: 'approved' } },
        ],
      },
      sort: '-createdAt',
      limit: 3,
    }),
  ])

  const avgRating =
    reviews.totalDocs > 0
      ? reviews.docs.reduce((s: number, r: any) => s + (r.rating ?? 0), 0) / reviews.totalDocs
      : null

  return (
    <section className="bg-card rounded-md shadow-e1 p-6 space-y-4">
      {/* Header */}
      <Link href={`/realtors/${realtor.slug}`} className="flex items-center gap-3 group">
        {realtor.photo?.url ? (
          <Image
            src={realtor.photo.url}
            alt={realtor.name ?? 'Риэлтор'}
            width={56}
            height={56}
            className="rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center shrink-0">
            <UserIcon className="w-6 h-6 text-on-surface-variant" />
          </div>
        )}
        <div className="min-w-0">
          <div className="text-title text-on-surface group-hover:text-primary line-clamp-1">
            {realtor.name ?? 'Риэлтор'}
          </div>
          {realtor.agency ? (
            <div className="text-body-sm text-on-surface-variant line-clamp-1">
              {realtor.agency}
            </div>
          ) : null}
          {avgRating !== null ? (
            <div className="flex items-center gap-1 text-body-sm text-on-surface-variant mt-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="text-on-surface font-medium">{avgRating.toFixed(1)}</span>
              <span>({reviews.totalDocs})</span>
            </div>
          ) : null}
        </div>
      </Link>

      {/* Masked phone — top of CTAs row when present */}
      {realtor.phone ? (
        <MaskedPhone phone={realtor.phone} variant="button" className="w-full" />
      ) : null}

      {/* CTAs */}
      <div className="grid grid-cols-2 gap-2">
        <Button asChild variant="outline" className="flex-col h-auto py-2 gap-1">
          <Link href={`/realtors/${realtor.slug}`} aria-label="Профиль">
            <UserIcon className="w-4 h-4" />
            <span className="text-label">Профиль</span>
          </Link>
        </Button>
        <MessageButton
          realtorId={String(realtor.id)}
          realtorName={realtor.name ?? 'Риэлтор'}
          propertyTitle={propertyTitle}
        />
      </div>

      {/* Active listings */}
      {activeListings.docs.length > 0 ? (
        <div className="pt-3 border-t border-border">
          <h3 className="text-label text-on-surface-variant uppercase mb-2">
            Ещё объекты ({activeListings.totalDocs})
          </h3>
          <ul className="space-y-2">
            {activeListings.docs.map((d: any) => {
              const img = d.images?.[0]?.image?.url
              return (
                <li key={d.id}>
                  <Link
                    href={`/flats/${d.slug}`}
                    className="flex items-center gap-3 group rounded-md p-1 -m-1 hover:bg-surface-container transition-colors"
                  >
                    <div className="w-14 h-14 rounded-md overflow-hidden bg-surface-container shrink-0 relative">
                      {img ? (
                        <Image
                          src={img}
                          alt={d.title}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-body-sm text-on-surface group-hover:text-primary line-clamp-1">
                        {d.title}
                      </div>
                      {typeof d.price === 'number' ? (
                        <div className="text-label text-on-surface-variant">
                          {formatPrice(d.price)}
                          {d.transactionType === 'rent' ? ' / мес' : ''}
                        </div>
                      ) : null}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      {/* Completed deals */}
      {soldListings.docs.length > 0 ? (
        <div className="pt-3 border-t border-border">
          <h3 className="text-label text-on-surface-variant uppercase mb-2">
            Завершённые сделки ({soldListings.totalDocs})
          </h3>
          <ul className="space-y-2">
            {soldListings.docs.map((d: any) => {
              const img = d.images?.[0]?.image?.url
              return (
                <li key={d.id}>
                  <Link
                    href={`/flats/${d.slug}`}
                    className="flex items-center gap-3 group rounded-md p-1 -m-1 hover:bg-surface-container transition-colors"
                  >
                    <div className="w-14 h-14 rounded-md overflow-hidden bg-surface-container shrink-0 relative">
                      {img ? (
                        <Image
                          src={img}
                          alt={d.title}
                          fill
                          sizes="56px"
                          className="object-cover grayscale opacity-80"
                        />
                      ) : null}
                      <div className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-emerald-600 text-white text-[10px] font-medium rounded">
                        Закрыта
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-body-sm text-on-surface group-hover:text-primary line-clamp-1">
                        {d.title}
                      </div>
                      {typeof d.price === 'number' ? (
                        <div className="text-label text-on-surface-variant">
                          {formatPrice(d.price)}
                        </div>
                      ) : null}
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      {/* Reviews preview */}
      {reviews.docs.length > 0 ? (
        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-label text-on-surface-variant uppercase">Отзывы</h3>
            <Link
              href={`/realtors/${realtor.slug}#reviews`}
              className="text-label text-primary hover:underline"
            >
              Все ({reviews.totalDocs})
            </Link>
          </div>
          <ul className="space-y-3">
            {reviews.docs.slice(0, 2).map((r: any) => (
              <li key={r.id} className="text-body-sm">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < (r.rating ?? 0)
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-on-surface-variant/30'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-label text-on-surface-variant">
                    {r.authorName}
                  </span>
                </div>
                <p className="text-on-surface-variant line-clamp-2">{r.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
