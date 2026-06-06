import type { Metadata } from 'next'
import React from 'react'

import { Hero } from '@/components/Home/Hero'
import { CategoryTiles } from '@/components/Home/CategoryTiles'
import { WhyUs } from '@/components/Home/WhyUs'
import { FeaturedListings } from '@/components/Home/FeaturedListings'
import { MapNearby } from '@/components/Home/MapNearby'
import { RecentlyViewed } from '@/blocks/house/RecentlyViewed/component'

// `/` — bespoke брендовая главная MegaDomic.
// Структура жёстко зафиксирована (бриф п.2):
//   1. Hero с поисковым фильтром (3 поля + CTA вправо)
//   2. Категории — 4 плитки (Квартиры/Дома/Земля/Коммерческая)
//   3. «Почему клиенты выбирают нас»
//   4. Витрина свежих объектов + «Все объекты»
//   5. Карта с кнопкой геолокации
//
// Старая /home как CMS-страница (если есть) остаётся доступной через
// /home — она рендерится `[slug]/page.tsx`.
export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <main className="pb-16">
      {/* Каждая секция держит собственный вертикальный ритм через
          py-10 md:py-14 — единый стандарт. Hero чуть плотнее, чтобы
          форма поиска сразу была в фокусе. */}
      <Hero />
      <CategoryTiles />
      <WhyUs />
      <FeaturedListings />
      {/* «Недавно вы смотрели» — клиентский компонент, читает
          localStorage. Сам прячется, если ничего не просмотрено. */}
      <section className="px-4 py-10 md:py-14">
        <div className="max-w-6xl mx-auto">
          <RecentlyViewed blockType="recently-viewed" />
        </div>
      </section>
      <MapNearby />
    </main>
  )
}

export const metadata: Metadata = {
  title: 'MegaDomic — недвижимость',
  description:
    'MegaDomic — поиск и покупка недвижимости: квартиры, дома, земля, коммерческая. Тысячи проверенных объявлений и прозрачные сделки.',
}
