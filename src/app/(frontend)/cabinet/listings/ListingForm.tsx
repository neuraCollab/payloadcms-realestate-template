'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import {
  type ListingCollection,
  COLLECTION_LABELS,
} from '@/lib/cabinet/listingValidator'
import { PhotoUploader } from './PhotoUploader'
import { TypeFields } from './TypeFields'
import { LivePropertyPreview } from './LivePropertyPreview'
import { RichTextEditor } from '@/components/RichTextEditor'
import { htmlToLexical, lexicalToHtml } from '@/lib/cabinet/htmlToLexical'
import {
  Field,
  Honeypot,
  SectionTitle,
  StickyActions,
  TopError,
  extractText,
  inputCls,
  textareaCls,
} from './formAtoms'

type FieldErrors = Record<string, string>

interface Props {
  collection: ListingCollection
  /** Если задано — режим редактирования существующего черновика. */
  initial?: any
  listingId?: string | number
}

const SHOW_PHOTOS: Record<ListingCollection, boolean> = {
  flats: true,
  houses: true,
  commercial: true,
  lands: false, // для участков фото опционально и нет своей таблицы
}

/**
 * Универсальная форма создания/редактирования объявления.
 * Тип (collection) определяет какие поля показывать (см. TypeFields).
 * Общие секции (адрес, цена, заголовок, описание) рендерятся здесь.
 */
export const ListingForm: React.FC<Props> = ({ collection, initial, listingId }) => {
  const router = useRouter()
  const isEdit = Boolean(listingId)

  const [errors, setErrors] = React.useState<FieldErrors>({})
  const [submitting, setSubmitting] = React.useState(false)
  const [topError, setTopError] = React.useState<string | null>(null)
  const [website, setWebsite] = React.useState('') // honeypot
  const [residentialComplexes, setResidentialComplexes] = React.useState<
    Array<{ id: number; name: string }>
  >([])

  // Подгружаем ЖК для селекта (только flats).
  React.useEffect(() => {
    if (collection !== 'flats') return
    fetch('/api/residential-complexes?depth=0&limit=200')
      .then((r) => r.json())
      .then((d) => {
        const docs = (d?.docs ?? []) as any[]
        setResidentialComplexes(docs.map((d) => ({ id: d.id, name: d.name })))
      })
      .catch(() => setResidentialComplexes([]))
  }, [collection])

  const [f, setF] = React.useState<any>(() => buildInitial(collection, initial))
  const update = (k: string, v: any) => setF((p: any) => ({ ...p, [k]: v }))

  // URL'ы фото для preview (приходят из PhotoUploader через onImagesChange).
  // Берём из initial.images при первом рендере, дальше PhotoUploader обновляет.
  const [previewImageUrls, setPreviewImageUrls] = React.useState<string[]>(() => {
    const arr = (initial?.images ?? []) as any[]
    return arr.map((it) => it?.image?.url).filter((u): u is string => !!u)
  })

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErrors({})
    setTopError(null)
    try {
      const url = isEdit
        ? `/api/cabinet/listings/${listingId}?collection=${collection}`
        : '/api/cabinet/listings'
      const method = isEdit ? 'PATCH' : 'POST'
      // description в form state — HTML (вывод tiptap). Конвертируем
      // в Lexical JSON перед отправкой — серверный валидатор примет
      // как объект и просканирует whitelist'ом.
      const descriptionDoc = htmlToLexical(f.description ?? '')
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...f,
          description: descriptionDoc,
          collection,
          website,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors)
          setTopError('Проверьте поля ниже — есть ошибки.')
        } else if (data.error === 'duplicate') {
          setTopError(data.message)
        } else if (data.error === 'unauthorized') {
          setTopError('Войдите в кабинет через email-ссылку (см. /cabinet/login).')
        } else {
          setTopError(data.message ?? 'Не удалось сохранить.')
        }
        setSubmitting(false)
        return
      }
      const id = data.id ?? listingId
      router.push(`/cabinet/listings/${id}/edit?collection=${collection}`)
      router.refresh()
    } catch (err: any) {
      setTopError(err?.message ?? 'Сеть недоступна.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-5 max-w-7xl">
      {/* Левая колонка — форма */}
      <div className="space-y-5 min-w-0">
        <div className="bg-card rounded-md shadow-e1 p-4 flex items-center gap-3">
          <div className="text-label text-on-surface-variant">Тип:</div>
          <div className="text-title text-on-surface">{COLLECTION_LABELS[collection]}</div>
        </div>

        {topError ? <TopError>{topError}</TopError> : null}

      <form onSubmit={onSubmit} className="space-y-5">
        <Honeypot value={website} onChange={setWebsite} />

        {/* Type-specific секции */}
        <TypeFields
          collection={collection}
          f={f}
          update={update}
          errors={errors}
          residentialComplexes={residentialComplexes}
        />

        {/* Адрес — общий */}
        <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
          <SectionTitle>Адрес</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Город" required error={errors.city}>
              <input className={inputCls} value={f.city ?? ''}
                onChange={(e) => update('city', e.target.value)} placeholder="Москва" />
            </Field>
            <Field label="Район" required error={errors.district}>
              <input className={inputCls} value={f.district ?? ''}
                onChange={(e) => update('district', e.target.value)} placeholder="Хамовники" />
            </Field>
          </div>
          <Field
            label="Адрес"
            required={collection !== 'lands'}
            error={errors.address}
            hint={collection === 'lands' ? 'Опционально для участков' : 'Улица, дом — для карты'}
          >
            <input className={inputCls} value={f.address ?? ''}
              onChange={(e) => update('address', e.target.value)} placeholder="Большой Каретный, 22" />
          </Field>
          {collection === 'flats' ? (
            <Field label="Метро" hint="Опционально">
              <input className={inputCls} value={f.metro ?? ''}
                onChange={(e) => update('metro', e.target.value)} placeholder="Чистые пруды" />
            </Field>
          ) : null}
        </section>

        {/* Цена — общая */}
        <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
          <SectionTitle>Цена</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <Field label="Цена" required error={errors.price}>
                <input className={inputCls} type="number" value={f.price ?? ''}
                  onChange={(e) => update('price', e.target.value)} placeholder="8500000" />
              </Field>
            </div>
            {collection !== 'lands' ? (
              <Field label="Валюта">
                <select className={inputCls} value={f.currency ?? 'RUB'}
                  onChange={(e) => update('currency', e.target.value)}>
                  <option value="RUB">RUB</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
              </Field>
            ) : null}
          </div>
          {collection !== 'lands' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-2 text-body-sm">
                <input type="checkbox" checked={!!f.fromOwner}
                  onChange={(e) => update('fromOwner', e.target.checked)} />
                От собственника
              </label>
              <label className="flex items-center gap-2 text-body-sm">
                <input type="checkbox" checked={!!f.noCommission}
                  onChange={(e) => update('noCommission', e.target.checked)} />
                Без комиссии
              </label>
            </div>
          ) : null}
        </section>

        {/* Заголовок + описание */}
        <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
          <SectionTitle>Текст объявления</SectionTitle>
          <Field label="Заголовок" required error={errors.title}
            hint="Что и где, кратко (10-200 символов)">
            <input className={inputCls} value={f.title ?? ''}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Светлая 2-комнатная квартира у метро Чистые пруды"
              maxLength={200} />
          </Field>
          <Field label="Описание" hint="Жирный, заголовки, списки, ссылки — как в админке">
            <RichTextEditor
              value={f.description ?? ''}
              onChange={(html) => update('description', html)}
              placeholder="Расскажите о доме, ремонте, инфраструктуре района…"
            />
          </Field>
        </section>

        <StickyActions submitting={submitting} isEdit={isEdit} />
      </form>

      {/* Фото — только в edit-режиме и только для типов которые их умеют. */}
      {isEdit && listingId && SHOW_PHOTOS[collection] ? (
        <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
          <SectionTitle>Фото</SectionTitle>
          <PhotoUploader
            listingId={listingId}
            collection={collection}
            initialImages={initial?.images ?? []}
            onImagesChange={setPreviewImageUrls}
          />
        </section>
      ) : null}
      </div>

      {/* Правая колонка — live preview (sticky на десктопе) */}
      <aside className="lg:sticky lg:top-4 lg:self-start lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto space-y-2">
        <div className="text-label text-on-surface-variant uppercase px-1">
          Превью объявления
        </div>
        <LivePropertyPreview f={f} collection={collection} imageUrls={previewImageUrls} />
        <p className="text-label text-on-surface-variant px-1">
          Так объявление выглядит у пользователей. Изменения видны мгновенно.
        </p>
      </aside>
    </div>
  )
}

/** Заполняет form state initial-значениями из БД-документа. */
function buildInitial(collection: ListingCollection, doc: any): any {
  if (!doc) {
    return {
      title: '',
      city: '',
      district: '',
      address: '',
      price: '',
      currency: 'RUB',
      fromOwner: true,
      noCommission: true,
      description: '',
    }
  }
  const common = {
    title: doc.title ?? '',
    city: doc.location?.city ?? '',
    district: doc.location?.district ?? '',
    address: doc.location?.address ?? '',
    price: doc.price ?? '',
    currency: doc.currency ?? 'RUB',
    fromOwner: doc.fromOwner ?? true,
    noCommission: doc.noCommission ?? true,
    // Если description — Lexical JSON (как из БД), разворачиваем в HTML
    // для tiptap. Если строка — оставляем как есть.
    description:
      typeof doc.description === 'string'
        ? doc.description
        : doc.description && typeof doc.description === 'object'
          ? lexicalToHtml(doc.description)
          : '',
  }
  if (collection === 'flats') {
    return {
      ...common,
      propertyCategory: doc.propertyCategory ?? 'apartment',
      transactionType: doc.transactionType ?? 'sale',
      rooms: doc.rooms ?? '',
      metro: doc.location?.metro ?? '',
      areaTotal: doc.area?.total ?? '',
      areaLiving: doc.area?.living ?? '',
      areaKitchen: doc.area?.kitchen ?? '',
      floor: doc.floorInfo?.floor ?? '',
      totalFloors: doc.floorInfo?.totalFloors ?? '',
      yearBuilt: doc.yearBuilt ?? '',
      buildingType: doc.buildingType ?? '',
      rentalSubtype: doc.rentalSubtype ?? '',
      residentialComplex:
        typeof doc.residentialComplex === 'object'
          ? doc.residentialComplex?.id
          : doc.residentialComplex ?? null,
    }
  }
  if (collection === 'houses') {
    return {
      ...common,
      houseType: doc.houseType ?? 'cottage',
      transactionType: doc.transactionType ?? 'sale',
      areaTotal: doc.area?.total ?? '',
      areaLand: doc.area?.land ?? '',
      floors: doc.floors ?? '',
      bedrooms: doc.bedrooms ?? '',
      bathrooms: doc.bathrooms ?? '',
      yearBuilt: doc.yearBuilt ?? '',
      material: doc.material ?? '',
    }
  }
  if (collection === 'commercial') {
    return {
      ...common,
      commercialType: doc.commercialType ?? '',
      transactionType: doc.transactionType ?? 'sale',
      areaTotal: doc.area?.total ?? '',
      areaUsable: doc.area?.usable ?? '',
      floor: doc.floor ?? '',
      priceType: doc.priceType ?? 'total',
    }
  }
  // lands
  return {
    ...common,
    purpose: doc.purpose ?? '',
    area: doc.area ?? '',
  }
}
