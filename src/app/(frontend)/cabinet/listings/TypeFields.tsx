'use client'
import React from 'react'
import {
  FLAT_OPTIONS,
  HOUSE_OPTIONS,
  COMMERCIAL_OPTIONS,
  LAND_OPTIONS,
  type ListingCollection,
} from '@/lib/cabinet/listingValidator'
import { Field, SectionTitle, inputCls, selectCls, textareaCls } from './formAtoms'

interface Props {
  collection: ListingCollection
  f: any
  update: (k: string, v: any) => void
  errors: Record<string, string>
  /** Список ЖК для селекта в форме квартиры. */
  residentialComplexes?: Array<{ id: number; name: string }>
}

/**
 * Рендерит секции формы, специфичные для типа объявления.
 * Общие секции (Адрес, Заголовок, Описание) рендерит сам ListingForm.
 */
export const TypeFields: React.FC<Props> = ({
  collection,
  f,
  update,
  errors,
  residentialComplexes,
}) => {
  if (collection === 'flats') return <FlatFields f={f} update={update} errors={errors} residentialComplexes={residentialComplexes} />
  if (collection === 'houses') return <HouseFields f={f} update={update} errors={errors} />
  if (collection === 'commercial') return <CommercialFields f={f} update={update} errors={errors} />
  return <LandFields f={f} update={update} errors={errors} />
}

// ─── Flats ──────────────────────────────────────────────────────

const FlatFields: React.FC<{
  f: any
  update: (k: string, v: any) => void
  errors: Record<string, string>
  residentialComplexes?: Array<{ id: number; name: string }>
}> = ({ f, update, errors, residentialComplexes }) => (
  <>
    <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
      <SectionTitle>Тип квартиры</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Тип сделки" required error={errors.transactionType}>
          <select className={selectCls} value={f.transactionType ?? ''}
            onChange={(e) => update('transactionType', e.target.value)}>
            <option value="">—</option>
            {FLAT_OPTIONS.transactionType.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Категория" required>
          <select className={selectCls} value={f.propertyCategory ?? 'apartment'}
            onChange={(e) => update('propertyCategory', e.target.value)}>
            {FLAT_OPTIONS.propertyCategory.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
      </div>
      {f.transactionType && f.transactionType !== 'sale' ? (
        <Field label="Что сдаёте">
          <select className={selectCls} value={f.rentalSubtype ?? 'whole'}
            onChange={(e) => update('rentalSubtype', e.target.value)}>
            {FLAT_OPTIONS.rentalSubtype.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
      ) : null}
    </section>

    <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
      <SectionTitle>Характеристики</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Комнат" required error={errors.rooms}>
          <select className={selectCls} value={f.rooms ?? ''}
            onChange={(e) => update('rooms', e.target.value)}>
            <option value="">—</option>
            {FLAT_OPTIONS.rooms.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Площадь общая, м²" required error={errors.areaTotal}>
          <input className={inputCls} type="number" step="0.1" value={f.areaTotal ?? ''}
            onChange={(e) => update('areaTotal', e.target.value)} placeholder="56" />
        </Field>
        <Field label="Площадь жилая, м²" error={errors.areaLiving}>
          <input className={inputCls} type="number" step="0.1" value={f.areaLiving ?? ''}
            onChange={(e) => update('areaLiving', e.target.value)} />
        </Field>
        <Field label="Площадь кухни, м²">
          <input className={inputCls} type="number" step="0.1" value={f.areaKitchen ?? ''}
            onChange={(e) => update('areaKitchen', e.target.value)} />
        </Field>
        <Field label="Этаж" error={errors.floor}>
          <input className={inputCls} type="number" value={f.floor ?? ''}
            onChange={(e) => update('floor', e.target.value)} />
        </Field>
        <Field label="Этажей в доме" error={errors.totalFloors}>
          <input className={inputCls} type="number" value={f.totalFloors ?? ''}
            onChange={(e) => update('totalFloors', e.target.value)} />
        </Field>
        <Field label="Год постройки" error={errors.yearBuilt}>
          <input className={inputCls} type="number" value={f.yearBuilt ?? ''}
            onChange={(e) => update('yearBuilt', e.target.value)} />
        </Field>
        <Field label="Материал дома">
          <select className={selectCls} value={f.buildingType ?? ''}
            onChange={(e) => update('buildingType', e.target.value)}>
            <option value="">—</option>
            {FLAT_OPTIONS.buildingType.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
      </div>

      {residentialComplexes && residentialComplexes.length > 0 ? (
        <Field
          label="Жилой комплекс"
          hint="Если квартира в ЖК — выберите. Иначе оставьте пусто."
        >
          <select className={selectCls} value={f.residentialComplex ?? ''}
            onChange={(e) => update('residentialComplex', e.target.value || null)}>
            <option value="">— Не в ЖК —</option>
            {residentialComplexes.map((rc) => (
              <option key={rc.id} value={rc.id}>{rc.name}</option>
            ))}
          </select>
        </Field>
      ) : null}
    </section>
  </>
)

// ─── Houses ─────────────────────────────────────────────────────

const HouseFields: React.FC<{ f: any; update: any; errors: Record<string, string> }> = ({
  f, update, errors,
}) => (
  <>
    <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
      <SectionTitle>Тип дома</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Тип сделки" required error={errors.transactionType}>
          <select className={selectCls} value={f.transactionType ?? ''}
            onChange={(e) => update('transactionType', e.target.value)}>
            <option value="">—</option>
            {HOUSE_OPTIONS.transactionType.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Тип дома" required>
          <select className={selectCls} value={f.houseType ?? 'cottage'}
            onChange={(e) => update('houseType', e.target.value)}>
            {HOUSE_OPTIONS.houseType.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
      </div>
    </section>

    <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
      <SectionTitle>Характеристики</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Площадь дома, м²" required error={errors.areaTotal}>
          <input className={inputCls} type="number" step="0.1" value={f.areaTotal ?? ''}
            onChange={(e) => update('areaTotal', e.target.value)} placeholder="120" />
        </Field>
        <Field label="Участок, соток" error={errors.areaLand}>
          <input className={inputCls} type="number" step="0.1" value={f.areaLand ?? ''}
            onChange={(e) => update('areaLand', e.target.value)} placeholder="10" />
        </Field>
        <Field label="Этажей" error={errors.floors}>
          <input className={inputCls} type="number" value={f.floors ?? ''}
            onChange={(e) => update('floors', e.target.value)} placeholder="2" />
        </Field>
        <Field label="Спален" error={errors.bedrooms}>
          <input className={inputCls} type="number" value={f.bedrooms ?? ''}
            onChange={(e) => update('bedrooms', e.target.value)} placeholder="3" />
        </Field>
        <Field label="Санузлов" error={errors.bathrooms}>
          <input className={inputCls} type="number" value={f.bathrooms ?? ''}
            onChange={(e) => update('bathrooms', e.target.value)} />
        </Field>
        <Field label="Год постройки" error={errors.yearBuilt}>
          <input className={inputCls} type="number" value={f.yearBuilt ?? ''}
            onChange={(e) => update('yearBuilt', e.target.value)} />
        </Field>
        <Field label="Материал стен">
          <select className={selectCls} value={f.material ?? ''}
            onChange={(e) => update('material', e.target.value)}>
            <option value="">—</option>
            {HOUSE_OPTIONS.material.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
      </div>
    </section>
  </>
)

// ─── Commercial ─────────────────────────────────────────────────

const CommercialFields: React.FC<{ f: any; update: any; errors: Record<string, string> }> = ({
  f, update, errors,
}) => (
  <>
    <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
      <SectionTitle>Тип помещения</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Field label="Тип помещения" required error={errors.commercialType}>
          <select className={selectCls} value={f.commercialType ?? ''}
            onChange={(e) => update('commercialType', e.target.value)}>
            <option value="">—</option>
            {COMMERCIAL_OPTIONS.commercialType.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Тип сделки" required error={errors.transactionType}>
          <select className={selectCls} value={f.transactionType ?? ''}
            onChange={(e) => update('transactionType', e.target.value)}>
            <option value="">—</option>
            {COMMERCIAL_OPTIONS.transactionType.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
      </div>
    </section>

    <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
      <SectionTitle>Характеристики</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Field label="Площадь общая, м²" required error={errors.areaTotal}>
          <input className={inputCls} type="number" step="0.1" value={f.areaTotal ?? ''}
            onChange={(e) => update('areaTotal', e.target.value)} placeholder="120" />
        </Field>
        <Field label="Полезная площадь, м²" error={errors.areaUsable}>
          <input className={inputCls} type="number" step="0.1" value={f.areaUsable ?? ''}
            onChange={(e) => update('areaUsable', e.target.value)} />
        </Field>
        <Field label="Этаж">
          <input className={inputCls} type="number" value={f.floor ?? ''}
            onChange={(e) => update('floor', e.target.value)} placeholder="1" />
        </Field>
      </div>
    </section>
  </>
)

// ─── Lands ──────────────────────────────────────────────────────

const LandFields: React.FC<{ f: any; update: any; errors: Record<string, string> }> = ({
  f, update, errors,
}) => (
  <section className="bg-card rounded-md shadow-e1 p-5 space-y-4">
    <SectionTitle>Параметры участка</SectionTitle>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label="Назначение" required error={errors.purpose}>
        <select className={selectCls} value={f.purpose ?? ''}
          onChange={(e) => update('purpose', e.target.value)}>
          <option value="">—</option>
          {LAND_OPTIONS.purpose.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </Field>
      <Field label="Площадь, соток" required error={errors.area}>
        <input className={inputCls} type="number" step="0.1" value={f.area ?? ''}
          onChange={(e) => update('area', e.target.value)} placeholder="10" />
      </Field>
    </div>
  </section>
)
