import type { Metadata } from 'next'
import React from 'react'
import { CompareClient } from './CompareClient'

// Сравнение работает целиком в браузере (localStorage).
// Сервер только отдаёт shell — обёртку, заголовок и client-компонент,
// который читает выбранные id и фетчит детали через REST API.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Сравнение объектов — MegaDomic',
  description:
    'Сравните до 4 объектов недвижимости одного типа бок о бок: ' +
    'цена, площадь, комнаты, этаж, локация и удобства.',
  alternates: { canonical: '/compare' },
  robots: { index: false, follow: true },
}

export default function ComparePage() {
  return (
    <main className="container py-8">
      <header className="mb-6">
        <h1 className="text-display text-on-surface">Сравнение объектов</h1>
        <p className="text-body text-on-surface-variant mt-2">
          Откройте характеристики бок о бок и выберите лучший вариант.
        </p>
      </header>
      <CompareClient />
    </main>
  )
}
