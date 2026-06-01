'use client'
import React from 'react'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

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
  }, [history])

  if (sorted.length < 2) return null

  const first = sorted[0]
  const last = sorted[sorted.length - 1]
  const delta = last.price - first.price
  const deltaPct = (delta / first.price) * 100

  // Layout
  const W = 560
  const H = 160
  const padL = 8
  const padR = 8
  const padT = 12
  const padB = 28
  const innerW = W - padL - padR
  const innerH = H - padT - padB

  const minY = Math.min(...sorted.map((s) => s.price)) * 0.95
  const maxY = Math.max(...sorted.map((s) => s.price)) * 1.05
  const ySpan = maxY - minY || 1

  const xStep = sorted.length > 1 ? innerW / (sorted.length - 1) : innerW
  const xAt = (i: number) => padL + i * xStep
  const yAt = (v: number) => padT + innerH - ((v - minY) / ySpan) * innerH

  const linePath = sorted
    .map((s, i) => `${i === 0 ? 'M' : 'L'} ${xAt(i).toFixed(1)} ${yAt(s.price).toFixed(1)}`)
    .join(' ')

  // Area under the curve for visual weight.
  const areaPath =
    linePath +
    ` L ${xAt(sorted.length - 1).toFixed(1)} ${(padT + innerH).toFixed(1)}` +
    ` L ${xAt(0).toFixed(1)} ${(padT + innerH).toFixed(1)} Z`

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

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="История цены">
        <defs>
          <linearGradient id="phc-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" className="text-primary" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
          </linearGradient>
        </defs>

        {/* Area */}
        <path d={areaPath} fill="url(#phc-grad)" />

        {/* Line */}
        <path
          d={linePath}
          fill="none"
          stroke="currentColor"
          className="text-primary"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Points */}
        {sorted.map((s, i) => (
          <g key={i}>
            <circle
              cx={xAt(i)}
              cy={yAt(s.price)}
              r={3.5}
              fill="currentColor"
              className="text-primary"
            />
            {(i === 0 || i === sorted.length - 1) ? (
              <text
                x={xAt(i)}
                y={yAt(s.price) - 8}
                textAnchor={i === 0 ? 'start' : 'end'}
                fontSize="10"
                fill="currentColor"
                className="text-on-surface font-medium"
              >
                {formatMoney(s.price, currency)}
              </text>
            ) : null}
            {(i === 0 || i === sorted.length - 1) ? (
              <text
                x={xAt(i)}
                y={H - 8}
                textAnchor={i === 0 ? 'start' : 'end'}
                fontSize="10"
                fill="currentColor"
                className="text-on-surface-variant"
              >
                {formatDate(s.date)}
              </text>
            ) : null}
          </g>
        ))}
      </svg>

      {sorted.length > 4 ? (
        <p className="text-label text-on-surface-variant">
          {sorted.length} изменений цены за {formatDate(first.date)} — {formatDate(last.date)}.
        </p>
      ) : null}
    </section>
  )
}
