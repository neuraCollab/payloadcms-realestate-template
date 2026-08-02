'use client'
import React from 'react'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface Snapshot {
  date: string
  price: number
}

interface Props {
  history: Snapshot[]
  currency?: string
}

const formatMoney = (n: number, c = 'RUB'): string => {
  try {
    return n.toLocaleString('ru-RU', {
      style: 'currency',
      currency: c,
      maximumFractionDigits: 0,
    })
  } catch {
    return n.toLocaleString('ru-RU') + ' ₽'
  }
}

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  })

/**
 * Compact SVG line chart over this object's own price snapshots.
 * Shows current vs initial delta in the header.
 */
export const PriceHistoryChart: React.FC<Props> = ({ history, currency = 'RUB' }) => {
  // Sort ascending by date; collapse same-day snapshots.
  const sorted = React.useMemo(() => {
    return [...(history ?? [])]
      .filter((h) => typeof h.price === 'number' && h.date)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((h) => ({
        ...h,
        formattedDate: formatDate(h.date),
      }))
  }, [history])

  if (sorted.length < 2) return null

  const first = sorted[0]
  const last = sorted[sorted.length - 1]
  const delta = last.price - first.price
  const deltaPct = (delta / first.price) * 100

  const minY = Math.min(...sorted.map((s) => s.price)) * 0.95
  const maxY = Math.max(...sorted.map((s) => s.price)) * 1.05

  const accentClass =
    delta > 0
      ? 'text-rose-600'
      : delta < 0
      ? 'text-emerald-600'
      : 'text-on-surface-variant'
  const Icon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus

  return (
    <section className="bg-card rounded-md shadow-e1 p-6 space-y-3">
      <div className="flex items-baseline justify-between gap-2 flex-wrap">
        <h2 className="text-title-lg text-on-surface">История цены</h2>
        <div className={`inline-flex items-center gap-1 text-body-sm font-medium ${accentClass}`}>
          <Icon className="w-4 h-4" />
          {delta > 0 ? '+' : ''}
          {formatMoney(delta, currency)} ({deltaPct > 0 ? '+' : ''}
          {deltaPct.toFixed(1)}%) с {formatDate(first.date)}
        </div>
      </div>

      <div className="w-full h-[160px] mt-4" aria-label="История цены">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sorted} margin={{ top: 12, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="phc-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="currentColor" stopOpacity={0.18} className="text-primary" />
                <stop offset="95%" stopColor="currentColor" stopOpacity={0} className="text-primary" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="formattedDate"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: 'currentColor' }}
              className="text-on-surface-variant"
              tickFormatter={(value, index) => (index === 0 || index === sorted.length - 1 ? value : '')}
              interval="preserveStartEnd"
            />
            <YAxis domain={[minY, maxY]} hide />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-card shadow-e2 rounded-md p-2 text-sm border border-outline-variant">
                      <p className="text-on-surface font-medium">{formatMoney(payload[0].value as number, currency)}</p>
                      <p className="text-on-surface-variant text-xs">{label}</p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Area
              type="linear"
              dataKey="price"
              stroke="currentColor"
              fill="url(#phc-grad)"
              strokeWidth={2}
              className="text-primary"
              activeDot={{ r: 4 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {sorted.length > 4 ? (
        <p className="text-label text-on-surface-variant">
          {sorted.length} изменений цены за {formatDate(first.date)} — {formatDate(last.date)}.
        </p>
      ) : null}
    </section>
  )
}
