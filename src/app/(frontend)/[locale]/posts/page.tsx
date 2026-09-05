import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { buildBreadcrumbJsonLd } from '@/utilities/seo'

// SSG skipped — DB unreachable at build-time inside docker compose.
// `force-dynamic` без revalidate — страница рендерится на каждый
// запрос, ничего не кэшируется на этапе билда.
export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    locale: locale as TypedLocale,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: 'Главная', url: '/' },
    { name: 'Блог', url: '/posts' },
  ])

  return (
    <div className="pt-24 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <PageClient />
      <div className="container mb-10">
        <h1 className="text-display text-on-surface">Блог о недвижимости</h1>
        <p className="text-body text-on-surface-variant mt-2 max-w-2xl">
          Гайды, аналитика рынка, чек-листы для покупателей и арендаторов.
          Без воды — только полезное и проверенное.
        </p>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  const title = 'Блог о недвижимости — гайды, аналитика, чек-листы'
  const description =
    'Полезные материалы о покупке, аренде и продаже недвижимости. ' +
    'Чек-листы, разборы рынка, юридические моменты, советы для собственников ' +
    'и арендаторов.'
  return {
    title,
    description,
    alternates: { canonical: '/posts' },
    openGraph: { title, description, url: '/posts', type: 'website' },
  }
}
