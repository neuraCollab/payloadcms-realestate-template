'use client'
import React from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, MapPin, Home as HomeIcon, Bed, Square } from 'lucide-react'
import {
  FLAT_OPTIONS,
  HOUSE_OPTIONS,
  COMMERCIAL_OPTIONS,
  LAND_OPTIONS,
  type ListingCollection,
} from '@/lib/cabinet/listingValidator'

interface Props {
  f: any
  collection: ListingCollection
  /** URL'ы фото из state PhotoUploader. */
  imageUrls?: string[]
}

const formatPrice = (v: any): string => {
  const n = Number(v)
  if (!Number.isFinite(n) || n <= 0) return '—'
  return n.toLocaleString('ru-RU') + ' ₽'
}

/**
 * Визуальное превью объявления, рендерится прямо в форме.
 * Использует то же form state, что и форма — изменения видны мгновенно.
 *
 * Это НЕ копия PropertyDetailPage: упрощённая версия для preview,
 * без JSON-LD, без related listings, без mortgage калькулятора.
 */
export const LivePropertyPreview: React.FC<Props> = ({ f, collection, imageUrls = [] }) => {
  const [imageIdx, setImageIdx] = React.useState(0)
  const photo = imageUrls[imageIdx]

  React.useEffect(() => {
    // Если фото удалили — переключиться на первое.
    if (imageIdx >= imageUrls.length) setImageIdx(0)
  }, [imageIdx, imageUrls.length])

  const title = f.title?.trim() || 'Без заголовка'
  const city = f.city?.trim() || '—'
  const district = f.district?.trim() || ''
  const address = f.address?.trim() || ''
  const fullAddress = [district, address].filter(Boolean).join(', ')

  return (
    <article className="bg-card rounded-md shadow-e1 overflow-hidden">
      {/* Hero photo */}
      <div className="relative aspect-[16/10] bg-surface-container">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-on-surface-variant text-body-sm">
            <div className="text-center">
              <HomeIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
              <div>Загрузите фото — здесь будет превью</div>
            </div>
          </div>
        )}
        {imageUrls.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() =>
                setImageIdx((i) => (i - 1 + imageUrls.length) % imageUrls.length)
              }
              aria-label="Предыдущее"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 shadow-e1 inline-flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setImageIdx((i) => (i + 1) % imageUrls.length)}
              aria-label="Следующее"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-card/90 shadow-e1 inline-flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 inline-flex h-6 px-2 items-center rounded-full bg-card/90 text-label">
              {imageIdx + 1} / {imageUrls.length}
            </div>
          </>
        ) : null}
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        <header className="space-y-2">
          <h1 className="text-headline text-on-surface leading-tight">{title}</h1>
          <div className="flex items-center gap-1 text-body-sm text-on-surface-variant">
            <MapPin className="w-3.5 h-3.5" />
            <span>{city}{fullAddress ? ', ' + fullAddress : ''}</span>
          </div>
        </header>

        <div className="bg-surface-container rounded-md p-4">
          <div className="text-display text-primary">{formatPrice(f.price)}</div>
          {f.transactionType === 'rent' || f.transactionType === 'daily' ? (
            <div className="text-body-sm text-on-surface-variant">
              {f.transactionType === 'daily' ? '/ сутки' : '/ месяц'}
            </div>
          ) : null}
        </div>

        {/* Type-specific specs */}
        <Specs f={f} collection={collection} />

        {/* Бейджи */}
        {(f.fromOwner || f.noCommission) && collection !== 'lands' ? (
          <div className="flex flex-wrap gap-2">
            {f.fromOwner ? (
              <span className="inline-flex h-7 px-3 items-center rounded-full bg-emerald-100 text-emerald-900 text-label font-medium">
                От собственника
              </span>
            ) : null}
            {f.noCommission ? (
              <span className="inline-flex h-7 px-3 items-center rounded-full bg-emerald-100 text-emerald-900 text-label font-medium">
                Без комиссии
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Описание — может быть HTML из rich-editor'а или plain text */}
        {f.description ? (
          <section>
            <h2 className="text-title-lg text-on-surface mb-2">Описание</h2>
            <div
              className="prose prose-sm max-w-none text-on-surface"
              dangerouslySetInnerHTML={{ __html: descriptionHtml(f.description) }}
            />
          </section>
        ) : null}
      </div>
    </article>
  )
}

const labelFor = (
  options: ReadonlyArray<{ value: string; label: string }>,
  value: any,
): string => options.find((o) => o.value === value)?.label ?? '—'

const Specs: React.FC<{ f: any; collection: ListingCollection }> = ({ f, collection }) => {
  if (collection === 'flats') {
    return (
      <SpecsGrid
        items={[
          { icon: <Bed className="w-4 h-4" />, label: labelFor(FLAT_OPTIONS.rooms, f.rooms) },
          { icon: <Square className="w-4 h-4" />, label: f.areaTotal ? `${f.areaTotal} м²` : '— м²' },
          { label: `Этаж ${f.floor || '—'}/${f.totalFloors || '—'}` },
          { label: f.yearBuilt ? `Год ${f.yearBuilt}` : 'Год —' },
        ]}
      />
    )
  }
  if (collection === 'houses') {
    return (
      <SpecsGrid
        items={[
          { icon: <Bed className="w-4 h-4" />, label: f.bedrooms ? `${f.bedrooms} спален` : '—' },
          { icon: <Square className="w-4 h-4" />, label: f.areaTotal ? `${f.areaTotal} м² дом` : '—' },
          { label: f.areaLand ? `${f.areaLand} соток` : '— соток' },
          { label: labelFor(HOUSE_OPTIONS.houseType, f.houseType) },
        ]}
      />
    )
  }
  if (collection === 'commercial') {
    return (
      <SpecsGrid
        items={[
          { label: labelFor(COMMERCIAL_OPTIONS.commercialType, f.commercialType) },
          { icon: <Square className="w-4 h-4" />, label: f.areaTotal ? `${f.areaTotal} м²` : '—' },
          { label: f.floor ? `Этаж ${f.floor}` : 'Этаж —' },
        ]}
      />
    )
  }
  // lands
  return (
    <SpecsGrid
      items={[
        { label: labelFor(LAND_OPTIONS.purpose, f.purpose) },
        { icon: <Square className="w-4 h-4" />, label: f.area ? `${f.area} соток` : '— соток' },
      ]}
    />
  )
}

const SpecsGrid: React.FC<{ items: Array<{ icon?: React.ReactNode; label: string }> }> = ({
  items,
}) => (
  <ul className="grid grid-cols-2 gap-2">
    {items.map((it, i) => (
      <li
        key={i}
        className="flex items-center gap-2 text-body-sm text-on-surface bg-surface-container rounded-md px-3 py-2"
      >
        {it.icon}
        {it.label}
      </li>
    ))}
  </ul>
)

/** Если description — HTML (из tiptap), используем как есть; иначе plain → <p>...</p> */
function descriptionHtml(input: any): string {
  if (typeof input !== 'string') return ''
  const trimmed = input.trim()
  if (!trimmed) return ''
  // tiptap-вывод начинается с <p> / <h2> и т.п.
  if (trimmed.startsWith('<')) return trimmed
  return `<p>${escapeHtml(trimmed)}</p>`
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}
