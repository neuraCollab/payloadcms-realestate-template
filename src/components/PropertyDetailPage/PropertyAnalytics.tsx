import React from 'react'
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import {
  aggregateStats,
  compareSubject,
  monthlyTrend,
  type FlatLike,
} from '@/lib/marketAnalytics'
import { PriceTrendChart, PriceCompareChart } from './AnalyticsCharts'

interface Props {
  subject: any
}

const MIN_COMPARABLES = 3

const formatPrice = (n: number) => n.toLocaleString('ru-RU') + ' ₽'

interface StatCardProps {
  label: string
  value: string
  hint?: string
  accent?: 'default' | 'primary' | 'positive' | 'negative'
}

const StatCard: React.FC<StatCardProps> = ({ label, value, hint, accent = 'default' }) => {
  const valueClass =
    accent === 'primary'
      ? 'text-primary'
      : accent === 'positive'
      ? 'text-emerald-700'
      : accent === 'negative'
      ? 'text-rose-700'
      : 'text-on-surface'
  return (
    <div className="bg-surface-container rounded-md p-4">
      <div className="text-label text-on-surface-variant uppercase">{label}</div>
      <div className={`text-headline mt-1 ${valueClass}`}>{value}</div>
      {hint ? <div className="text-label text-on-surface-variant mt-1">{hint}</div> : null}
    </div>
  )
}

/**
 * Free market analysis for a flat. Aggregates comparable listings in the
 * same district (with same rooms), computes price stats + 12-month trend,
 * renders summary cards + charts. Renders nothing if not enough data.
 */
export const PropertyAnalytics: React.FC<Props> = async ({ subject }) => {
  // Only flats supported for now. The other collections don't share the
  // area.total + rooms shape required for these comparisons.
  if (!subject?.location?.district) return null
  if (!subject?.area?.total || !subject?.price) return null

  const payload = await getPayload({ config })

  // Pull active flats in the same district + same rooms category, excluding self.
  // We use a generous limit and aggregate in memory — fine for a few hundred
  // comparable listings; if it grows beyond that, push aggregation into SQL.
  const where: any = {
    and: [
      { status: { equals: 'active' } },
      { 'location.district': { equals: subject.location.district } },
      { id: { not_equals: subject.id } },
    ],
  }
  if (subject.rooms) {
    where.and.push({ rooms: { equals: subject.rooms } })
  }

  const result = await payload.find({
    collection: 'flats',
    where,
    limit: 500,
    depth: 0,
    pagination: false,
  })

  // Map to FlatLike shape (price / area.total / createdAt are the only fields used).
  const comps: FlatLike[] = result.docs.map((d: any) => ({
    id: d.id,
    price: d.price,
    area: { total: d.area?.total },
    createdAt: d.createdAt,
  }))

  if (comps.length < MIN_COMPARABLES) return null

  const stats = aggregateStats(comps)
  const comparison = compareSubject(
    { id: subject.id, price: subject.price, area: { total: subject.area.total } },
    stats,
  )
  // For the trend chart use a wider lookback (same district, ignore rooms)
  // so the line has more data points to render.
  const trendResult = await payload.find({
    collection: 'flats',
    where: {
      and: [
        { 'location.district': { equals: subject.location.district } },
        { id: { not_equals: subject.id } },
      ],
    },
    limit: 1000,
    depth: 0,
    pagination: false,
  })
  const trend = monthlyTrend(
    trendResult.docs.map((d: any) => ({
      id: d.id,
      price: d.price,
      area: { total: d.area?.total },
      createdAt: d.createdAt,
    })),
    12,
  )

  // Render hints based on comparison
  let deltaIcon = <Minus className="w-4 h-4" />
  let deltaHint = 'на уровне рынка'
  let deltaAccent: 'positive' | 'negative' | 'default' = 'default'
  if (comparison.deltaPct !== null) {
    if (comparison.deltaPct > 5) {
      deltaIcon = <TrendingUp className="w-4 h-4" />
      deltaHint = `на ${comparison.deltaPct}% выше рынка`
      deltaAccent = 'negative'
    } else if (comparison.deltaPct < -5) {
      deltaIcon = <TrendingDown className="w-4 h-4" />
      deltaHint = `на ${Math.abs(comparison.deltaPct)}% ниже рынка`
      deltaAccent = 'positive'
    }
  }

  return (
    <section className="bg-card rounded-md shadow-e1 p-6 space-y-6">
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-title-lg text-on-surface flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Бесплатный анализ объекта
          </h2>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Сравнение с {stats.count}{' '}
            {stats.count === 1 ? 'похожим объектом' : 'похожими объектами'} в районе «
            {subject.location.district}»
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-label font-medium">
          Бесплатно
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Цена этого объекта"
          value={formatPrice(subject.price)}
          hint={comparison.pricePerSqm ? `${comparison.pricePerSqm.toLocaleString('ru-RU')} ₽/м²` : undefined}
          accent="primary"
        />
        <StatCard
          label="Среднее по району"
          value={`${stats.avgPricePerSqm.toLocaleString('ru-RU')} ₽/м²`}
          hint={`медиана ${stats.medianPricePerSqm.toLocaleString('ru-RU')} ₽/м²`}
        />
        <StatCard
          label="Разброс цены"
          value={`${formatPrice(stats.minPrice)} — ${formatPrice(stats.maxPrice)}`}
          hint={`средняя ${formatPrice(stats.avgPrice)}`}
        />
        <StatCard
          label="Оценка цены"
          value={
            comparison.deltaPct !== null
              ? `${comparison.deltaPct > 0 ? '+' : ''}${comparison.deltaPct}%`
              : '—'
          }
          hint={deltaHint}
          accent={deltaAccent}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-title text-on-surface mb-2 flex items-center gap-2">
            {deltaIcon}
            Сравнение с рынком
          </h3>
          <PriceCompareChart
            subjectPricePerSqm={comparison.pricePerSqm}
            marketAvgPricePerSqm={stats.avgPricePerSqm}
            marketMedianPricePerSqm={stats.medianPricePerSqm}
          />
        </div>
        <div>
          <h3 className="text-title text-on-surface mb-2">Динамика ₽/м² за год</h3>
          {trend.some((p) => p.avgPricePerSqm > 0) ? (
            <PriceTrendChart data={trend} subjectPricePerSqm={comparison.pricePerSqm} />
          ) : (
            <p className="text-body-sm text-on-surface-variant py-8 text-center">
              Недостаточно данных для построения графика
            </p>
          )}
        </div>
      </div>

      <p className="text-label text-on-surface-variant">
        Анализ строится автоматически по объявлениям в нашей базе. Не является официальной
        оценкой и носит ориентировочный характер.
      </p>
    </section>
  )
}
