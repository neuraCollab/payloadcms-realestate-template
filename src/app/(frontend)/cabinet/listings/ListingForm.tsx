'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { FLAT_OPTIONS } from '@/lib/cabinet/listingValidator'
import { PhotoUploader } from './PhotoUploader'

type FieldErrors = Record<string, string>

interface Props {
  /** Если задано — режим редактирования существующего черновика. */
  initial?: any
  listingId?: string | number
}

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-title-lg text-on-surface mb-3">{children}</h2>
)

const Field: React.FC<{
  label: string
  error?: string
  children: React.ReactNode
  hint?: string
  required?: boolean
}> = ({ label, error, children, hint, required }) => (
  <label className="block">
    <span className="text-label text-on-surface-variant">
      {label} {required ? <span className="text-rose-600">*</span> : null}
    </span>
    <div className="mt-1">{children}</div>
    {hint ? <span className="text-label text-on-surface-variant mt-1 block">{hint}</span> : null}
    {error ? <span className="text-label text-rose-600 mt-1 block">{error}</span> : null}
  </label>
)

const input =
  'w-full h-11 px-3 rounded-md border border-border bg-card text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
const select = input
const textarea =
  'w-full px-3 py-2 rounded-md border border-border bg-card text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

/**
 * Форма создания/редактирования объявления (квартиры) из кабинета.
 *
 * Многосекционная single-page форма (не wizard) — проще
 * поддерживать и меньше friction для опытного юзера. Каждая секция
 * — collapsible, показывает summary в свёрнутом виде.
 *
 * При создании: POST /api/cabinet/listings → редирект на /edit.
 * При редактировании: PATCH /api/cabinet/listings/[id].
 * Загрузка фото — внутри отдельного компонента PhotoUploader,
 * требует уже сохранённый id (поэтому при создании сначала save,
 * потом фото).
 */
export const ListingForm: React.FC<Props> = ({ initial, listingId }) => {
  const router = useRouter()
  const isEdit = Boolean(listingId)

  const [errors, setErrors] = React.useState<FieldErrors>({})
  const [submitting, setSubmitting] = React.useState(false)
  const [topError, setTopError] = React.useState<string | null>(null)

  // Простое state-управление одним объектом form (а не useState×N).
  const [f, setF] = React.useState<any>(() => ({
    title: initial?.title ?? '',
    propertyCategory: initial?.propertyCategory ?? 'apartment',
    transactionType: initial?.transactionType ?? 'sale',
    rooms: initial?.rooms ?? '',
    city: initial?.location?.city ?? '',
    district: initial?.location?.district ?? '',
    address: initial?.location?.address ?? '',
    metro: initial?.location?.metro ?? '',
    price: initial?.price ?? '',
    currency: initial?.currency ?? 'RUB',
    areaTotal: initial?.area?.total ?? '',
    areaLiving: initial?.area?.living ?? '',
    areaKitchen: initial?.area?.kitchen ?? '',
    floor: initial?.floorInfo?.floor ?? '',
    totalFloors: initial?.floorInfo?.totalFloors ?? '',
    yearBuilt: initial?.yearBuilt ?? '',
    buildingType: initial?.buildingType ?? '',
    fromOwner: initial?.fromOwner ?? true,
    noCommission: initial?.noCommission ?? true,
    rentalSubtype: initial?.rentalSubtype ?? '',
    description:
      typeof initial?.description === 'string'
        ? initial.description
        : extractText(initial?.description),
  }))

  const [website, setWebsite] = React.useState('') // honeypot

  const update = (k: string, v: any) => setF((p: any) => ({ ...p, [k]: v }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setErrors({})
    setTopError(null)
    try {
      const url = isEdit ? `/api/cabinet/listings/${listingId}` : '/api/cabinet/listings'
      const method = isEdit ? 'PATCH' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, website }),
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
      router.push(`/cabinet/listings/${id}/edit`)
      router.refresh()
    } catch (err: any) {
      setTopError(err?.message ?? 'Сеть недоступна.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-5 max-w-3xl">
      {topError ? (
        <div className="rounded-md bg-rose-50 border border-rose-200 text-rose-900 p-3 text-body-sm">
          {topError}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-5">
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          aria-hidden="true"
          className="absolute -left-[9999px] w-px h-px"
        />

        {/* Тип сделки и категория */}
        <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
          <SectionTitle>Тип объявления</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Тип сделки" required error={errors.transactionType}>
              <select
                className={select}
                value={f.transactionType}
                onChange={(e) => update('transactionType', e.target.value)}
              >
                {FLAT_OPTIONS.transactionType.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Категория" required>
              <select
                className={select}
                value={f.propertyCategory}
                onChange={(e) => update('propertyCategory', e.target.value)}
              >
                {FLAT_OPTIONS.propertyCategory.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
          </div>
          {f.transactionType !== 'sale' ? (
            <Field label="Что сдаёте">
              <select
                className={select}
                value={f.rentalSubtype || 'whole'}
                onChange={(e) => update('rentalSubtype', e.target.value)}
              >
                {FLAT_OPTIONS.rentalSubtype.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
          ) : null}
        </section>

        {/* Адрес */}
        <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
          <SectionTitle>Адрес</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Город" required error={errors.city}>
              <input
                className={input}
                value={f.city}
                onChange={(e) => update('city', e.target.value)}
                placeholder="Москва"
              />
            </Field>
            <Field label="Район" required error={errors.district}>
              <input
                className={input}
                value={f.district}
                onChange={(e) => update('district', e.target.value)}
                placeholder="Хамовники"
              />
            </Field>
          </div>
          <Field
            label="Адрес"
            required
            error={errors.address}
            hint="Улица, дом — для геокодирования и показа на карте"
          >
            <input
              className={input}
              value={f.address}
              onChange={(e) => update('address', e.target.value)}
              placeholder="Большой Каретный, 22"
            />
          </Field>
          <Field label="Метро" hint="Опционально">
            <input
              className={input}
              value={f.metro}
              onChange={(e) => update('metro', e.target.value)}
              placeholder="Чистые пруды"
            />
          </Field>
        </section>

        {/* Характеристики */}
        <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
          <SectionTitle>Характеристики</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Комнат" required error={errors.rooms}>
              <select
                className={select}
                value={f.rooms}
                onChange={(e) => update('rooms', e.target.value)}
              >
                <option value="">—</option>
                {FLAT_OPTIONS.rooms.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Площадь общая, м²" required error={errors.areaTotal}>
              <input
                className={input}
                type="number"
                step="0.1"
                value={f.areaTotal}
                onChange={(e) => update('areaTotal', e.target.value)}
                placeholder="56"
              />
            </Field>
            <Field label="Площадь жилая, м²" error={errors.areaLiving}>
              <input
                className={input}
                type="number"
                step="0.1"
                value={f.areaLiving}
                onChange={(e) => update('areaLiving', e.target.value)}
              />
            </Field>
            <Field label="Площадь кухни, м²">
              <input
                className={input}
                type="number"
                step="0.1"
                value={f.areaKitchen}
                onChange={(e) => update('areaKitchen', e.target.value)}
              />
            </Field>
            <Field label="Этаж" error={errors.floor}>
              <input
                className={input}
                type="number"
                value={f.floor}
                onChange={(e) => update('floor', e.target.value)}
              />
            </Field>
            <Field label="Этажей в доме" error={errors.totalFloors}>
              <input
                className={input}
                type="number"
                value={f.totalFloors}
                onChange={(e) => update('totalFloors', e.target.value)}
              />
            </Field>
            <Field label="Год постройки" error={errors.yearBuilt}>
              <input
                className={input}
                type="number"
                value={f.yearBuilt}
                onChange={(e) => update('yearBuilt', e.target.value)}
              />
            </Field>
            <Field label="Материал дома">
              <select
                className={select}
                value={f.buildingType}
                onChange={(e) => update('buildingType', e.target.value)}
              >
                <option value="">—</option>
                {FLAT_OPTIONS.buildingType.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        {/* Цена */}
        <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
          <SectionTitle>Цена</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <Field label="Цена" required error={errors.price}>
                <input
                  className={input}
                  type="number"
                  value={f.price}
                  onChange={(e) => update('price', e.target.value)}
                  placeholder={f.transactionType === 'rent' ? '50000' : '8500000'}
                />
              </Field>
            </div>
            <Field label="Валюта">
              <select
                className={select}
                value={f.currency}
                onChange={(e) => update('currency', e.target.value)}
              >
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-2 text-body-sm">
              <input
                type="checkbox"
                checked={f.fromOwner}
                onChange={(e) => update('fromOwner', e.target.checked)}
              />
              От собственника
            </label>
            <label className="flex items-center gap-2 text-body-sm">
              <input
                type="checkbox"
                checked={f.noCommission}
                onChange={(e) => update('noCommission', e.target.checked)}
              />
              Без комиссии
            </label>
          </div>
        </section>

        {/* Заголовок + описание */}
        <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
          <SectionTitle>Текст объявления</SectionTitle>
          <Field
            label="Заголовок"
            required
            error={errors.title}
            hint="Что и где, кратко (10-200 символов)"
          >
            <input
              className={input}
              value={f.title}
              onChange={(e) => update('title', e.target.value)}
              placeholder="Светлая 2-комнатная квартира у метро Чистые пруды"
              maxLength={200}
            />
          </Field>
          <Field
            label="Описание"
            hint="Расскажите про дом, ремонт, инфраструктуру, плюсы района"
          >
            <textarea
              className={textarea}
              value={f.description}
              onChange={(e) => update('description', e.target.value)}
              rows={6}
              maxLength={5000}
              placeholder="Сталинский дом 1955 года, потолки 3.2 м, тёплый пол…"
            />
          </Field>
        </section>

        <div className="sticky bottom-3 flex items-center gap-3 bg-card border border-border shadow-e2 rounded-full p-2 pl-4">
          <span className="text-body-sm text-on-surface-variant flex-1">
            {isEdit ? 'Изменения сохранятся в черновик.' : 'Сохраним как черновик, потом загрузите фото.'}
          </span>
          <button
            type="submit"
            disabled={submitting}
            className="h-10 px-5 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? 'Сохранение…' : 'Сохранить'}
          </button>
        </div>
      </form>

      {/* Фото — только после первого сохранения (нужен id). */}
      {isEdit && listingId ? (
        <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
          <SectionTitle>Фото</SectionTitle>
          <PhotoUploader
            listingId={listingId}
            initialImages={initial?.images ?? []}
          />
        </section>
      ) : null}
    </div>
  )
}

/** Lexical doc → plain text (для edit-mode из БД). */
function extractText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join(' ')
  const parts: string[] = []
  if (typeof node.text === 'string') parts.push(node.text)
  if (Array.isArray(node.children)) parts.push(...node.children.map(extractText))
  if (node.root) parts.push(extractText(node.root))
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}
