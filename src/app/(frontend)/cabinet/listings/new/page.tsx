import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import {
  ChevronLeft,
  Home as HomeIcon,
  Building2,
  TreePine,
  Briefcase,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Новое объявление — выберите тип — MegaDomic',
}

const TYPES = [
  {
    href: '/cabinet/listings/new/flats',
    title: 'Квартира',
    desc: 'Квартиры, апартаменты, студии. Можно привязать к ЖК.',
    Icon: Building2,
  },
  {
    href: '/cabinet/listings/new/houses',
    title: 'Дом',
    desc: 'Коттедж, таунхаус, дача, отдельный дом с участком.',
    Icon: HomeIcon,
  },
  {
    href: '/cabinet/listings/new/commercial',
    title: 'Коммерческая недвижимость',
    desc: 'Офис, склад, магазин, общепит, производство.',
    Icon: Briefcase,
  },
  {
    href: '/cabinet/listings/new/lands',
    title: 'Участок',
    desc: 'Земельный участок: ИЖС, СНТ, ЛПХ, сельхоз.',
    Icon: TreePine,
  },
] as const

export default function NewListingPickTypePage() {
  return (
    <div className="max-w-3xl space-y-4">
      <div>
        <Link
          href="/cabinet/listings"
          className="inline-flex items-center gap-1 text-body-sm text-on-surface-variant hover:text-on-surface"
        >
          <ChevronLeft className="w-4 h-4" />К моим объявлениям
        </Link>
      </div>
      <div className="bg-card rounded-md shadow-e1 p-6">
        <h1 className="text-headline text-on-surface">Что вы публикуете?</h1>
        <p className="text-body-sm text-on-surface-variant mt-1">
          Выберите тип — у каждого свой набор полей, чтобы не заполнять лишнее.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TYPES.map(({ href, title, desc, Icon }) => (
          <Link
            key={href}
            href={href}
            className="block bg-card rounded-md shadow-e1 p-5 border-2 border-transparent hover:border-primary hover:shadow-e2 transition"
          >
            <div className="flex items-start gap-3">
              <span className="shrink-0 inline-flex w-11 h-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Icon className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <div className="text-title text-on-surface">{title}</div>
                <p className="text-body-sm text-on-surface-variant mt-1">{desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
