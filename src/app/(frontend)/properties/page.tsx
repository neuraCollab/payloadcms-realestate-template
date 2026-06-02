import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'
import { PropertiesBlock } from '@/blocks/house/PropertiesBlock/component'
import PageClient from './page.client'

export const metadata: Metadata = {
  title: 'Недвижимость - Каталог объектов',
  description: 'Просмотрите полную коллекцию объектов недвижимости для продажи и аренды',
}

export default async function PropertiesPage() {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const properties = await payload.find({
    collection: 'properties',
    draft,
    limit: 50,
    overrideAccess: draft,
    pagination: false,
  })

  return (
    <div className="pt-20">
      <PageClient />
      <PropertiesBlock
        blockType="properties"
        title="Все объекты недвижимости"
        properties={properties.docs}
        layout="grid"
        itemsPerPage={12}
        enableFilters={true}
        filters={{
          priceRange: true,
          propertyType: true,
          bedrooms: true,
          bathrooms: true,
          area: true,
        }}
      />
    </div>
  )
} 
