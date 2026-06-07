import type { Metadata } from 'next'
import React from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'

import { Hero } from '@/components/Home/Hero'
import { CategoryTiles } from '@/components/Home/CategoryTiles'
import { WhyUs } from '@/components/Home/WhyUs'
import { FeaturedListings } from '@/components/Home/FeaturedListings'
import { MapNearby } from '@/components/Home/MapNearby'
import { RecentlyViewed } from '@/blocks/house/RecentlyViewed/component'
import { SeoSections } from '@/components/Home/SeoSections'
import { FaqSection } from '@/components/Home/FaqSection'
import { HomeJsonLd } from '@/components/Home/HomeJsonLd'

// `/` — bespoke брендовая главная MegaDomic.
//
// Контент-блоки (H1, subtitle, нишевые SEO-секции, FAQ) подтягиваются
// из глобала `home-seo` — редактируется из админки контент-менеджером
// без релиза кода.
export const dynamic = 'force-dynamic'

const fetchHomeSeo = async () => {
  try {
    const payload = await getPayload({ config })
    const seo = await payload.findGlobal({ slug: 'home-seo' as any, depth: 0 })
    return seo as any
  } catch {
    return null
  }
}

const fetchLegal = async () => {
  try {
    const payload = await getPayload({ config })
    const legal = await payload.findGlobal({ slug: 'legal-info' as any, depth: 0 })
    return legal as any
  } catch {
    return null
  }
}

export default async function HomePage() {
  const [seo, legal] = await Promise.all([fetchHomeSeo(), fetchLegal()])

  return (
    <main className="pb-16">
      {/* JSON-LD: Organization + WebSite + RealEstateAgent */}
      <HomeJsonLd legal={legal} />

      <Hero h1={seo?.h1} subtitle={seo?.subtitle} />
      <CategoryTiles />
      <WhyUs />
      <FeaturedListings />

      {/* «Недавно вы смотрели» — клиентский, прячется если localStorage пуст. */}
      <section className="px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <RecentlyViewed blockType="recently-viewed" />
        </div>
      </section>

      <MapNearby />

      {/* Нишевые SEO-блоки — H2 секции с ключевыми словами + CTA. */}
      {Array.isArray(seo?.seoBlocks) && seo.seoBlocks.length > 0 ? (
        <SeoSections blocks={seo.seoBlocks} />
      ) : null}

      {/* FAQ + FAQPage JSON-LD */}
      {Array.isArray(seo?.faq) && seo.faq.length > 0 ? (
        <FaqSection intro={seo?.faqIntro} items={seo.faq} />
      ) : null}
    </main>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await fetchHomeSeo()
  return {
    title: seo?.metaTitle || 'MegaDomic — недвижимость',
    description:
      seo?.metaDescription ||
      'MegaDomic — поиск и покупка недвижимости: квартиры, дома, земля, коммерческая.',
    alternates: { canonical: '/' },
  }
}
