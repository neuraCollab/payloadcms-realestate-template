import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import { PropertyGallery } from '@/components/PropertyGallery'
import { PropertyDetails } from '@/components/PropertyDetails'
import { RelatedProperties } from '@/components/RelatedProperties'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Property } from '@/payload-types'

import { PropertyHero } from '@/heros/PropertyHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const properties = await payload.find({
    collection: 'properties',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = properties.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Property({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/properties/' + slug
  const property = await queryPropertyBySlug({ slug })

  if (!property) return <PayloadRedirects url={url} />

  // Получаем другие properties для похожих объектов
  const payload = await getPayload({ config: configPromise })
  const allProperties = await payload.find({
    collection: 'properties',
    draft,
    limit: 20,
    overrideAccess: draft,
    pagination: false,
  })

  return (
    <article>
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <PropertyHero property={property} />

      <div className="flex flex-col items-center gap-4 pt-8">
        {/* Property Gallery */}
        <div className="container max-w-6xl">
          <div 
            className="mb-12 opacity-0 animate-fadeInUp"
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            <PropertyGallery images={property.images} />
          </div>
        </div>

        {/* Property Details */}
        <PropertyDetails property={property} />

        {/* Related Properties */}
        <RelatedProperties 
          currentProperty={property} 
          properties={allProperties.docs} 
        />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const property = await queryPropertyBySlug({ slug })

  if (!property) {
    return {
      title: 'Объект не найден',
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return {
    title: `${property.title} - ${formatPrice(property.price)}`,
    description: `${property.bedrooms} bed, ${property.bathrooms} bath property for ${property.type} in ${property.address}. ${property.area} sq.ft.`,
    openGraph: {
      title: `${property.title} - ${formatPrice(property.price)}`,
      description: `${property.bedrooms} bed, ${property.bathrooms} bath property for ${property.type} in ${property.address}`,
      images: property.images?.length > 0 && typeof property.images[0]?.image === 'object' 
        ? [{ url: property.images[0].image.url || '/placeholder.jpg' }]
        : [{ url: '/placeholder.jpg' }],
    },
  }
}

const queryPropertyBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'properties',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}) 
