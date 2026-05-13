import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { PropertyCard } from '@/components/PropertyCard'

export const RecentProperties: React.FC = async () => {
  const payload = await getPayload({ config })
  const flats = await payload.find({
    collection: 'flats',
    limit: 4,
    where: { status: { equals: 'active' } },
    sort: '-createdAt',
    depth: 2,
  })

  if (!flats.docs.length) return null

  return (
    <section className="space-y-4">
      <h2 className="text-title-lg text-on-surface">Новые предложения</h2>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {flats.docs.map((doc: any) => (
          <PropertyCard
            key={doc.id}
            href={`/flats/${doc.slug}`}
            title={doc.title}
            address={doc.location?.address}
            imageUrl={doc.images?.[0]?.image?.url ?? null}
            badge={doc.transactionType === 'sale' ? 'Продажа' : 'Аренда'}
            price={doc.price}
            priceSuffix={doc.transactionType === 'rent' ? '/ мес' : undefined}
          />
        ))}
      </div>
    </section>
  )
}
