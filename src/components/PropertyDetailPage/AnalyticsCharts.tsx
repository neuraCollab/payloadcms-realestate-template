'use client'
import React from 'react'
import type { MonthlyPoint } from '@/lib/marketAnalytics'

// Hand-rolled SVG charts. No external chart lib — keeps bundle small and
// gives us full control over styling. Layout is viewBox-based so it scales
// to any container width.

const MONTH_SHORT = [
  'янв', 'фев', 'мар', 'апр', 'май', 'июн',
  'июл', 'авг', 'сен', 'окт', 'ноя', 'дек',
]

const formatMonthLabel = (key: string): string => {
  const [y, m] = key.split('-')
  const mi = parseInt(m, 10) - 1
  if (Number.isNaN(mi) || mi < 0 || mi > 11) return key
  return `${MONTH_SHORT[mi]} '${y.slice(2)}`
}

const formatThousands = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}М`
  if (n >= 1_000) return `${Math.round(n / 1_000)}К`
  return String(n)
}

interface TrendProps {
  data: MonthlyPoint[]
  /** Subject's ₽/m² to overlay as a dashed horizontal reference line. */
  subjectPricePerSqm?: number | null
}

/**
 * Line chart: average ₽/m² per month over the analysis window.
 * Skips months with count=0 in the line (gap), but keeps tick on X axis.
 */
export const PriceTrendChart: React.FC<TrendProps> = ({ data, subjectPricePerSqm }) => {
  // Layout
  const W = 600
  const H = 220
  const padL = 48
  const padR = 12
  const padT = 12
  const padB = 28
  const innerW = W - padL - padR
  const innerH = H - padT - padB

  // Scale
  const values = data.map((d) => d.avgPricePerSqm).filter((v) => v > 0)
  const subjectVal =
    typeof subjectPricePerSqm === 'number' && subjectPricePerSqm > 0 ? subjectPricePerSqm : null
  const allVals = subjectVal !== null ? [...values, subjectVal] : values
  const minY = allVals.length ? Math.min(...allVals) * 0.9 : 0
  const maxY = allVals.length ? Math.max(...allVals) * 1.1 : 1
  const ySpan = maxY - minY || 1

  const xStep = data.length > 1 ? innerW / (data.length - 1) : innerW
  const xAt = (i: number) => padL + i * xStep
  const yAt = (v: number) => padT + innerH - ((v - minY) / ySpan) * innerH

  // Build path skipping empty months
  const pathSegments: string[] = []
  let started = false
  data.forEach((d, i) => {
    if (d.avgPricePerSqm > 0) {
      pathSegments.push(`${started ? 'L' : 'M'} ${xAt(i).toFixed(1)} ${yAt(d.avgPricePerSqm).toFixed(1)}`)
      started = true
    } else {
      started = false
    }
  })

  // Y ticks (3 lines)
  const yTicks = [minY, minY + ySpan / 2, maxY]

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="График динамики цены за м²">
        {/* Grid */}
        {yTicks.map((tv, i) => (
          <g key={i}>
            <line
              x1={padL}
              x2={W - padR}
              y1={yAt(tv)}
              y2={yAt(tv)}
              stroke="currentColor"
              className="text-on-surface-variant/20"
              strokeWidth={1}
            />
            <text
              x={padL - 6}
              y={yAt(tv)}
              dy="0.32em"
              textAnchor="end"
              className="text-on-surface-variant"
              fontSize="10"
              fill="currentColor"
            >
              {formatThousands(Math.round(tv))}
            </text>
          </g>
        ))}

        {/* Subject reference line */}
        {subjectVal !== null ? (
          <>
            <line
              x1={padL}
              x2={W - padR}
              y1={yAt(subjectVal)}
              y2={yAt(subjectVal)}
              stroke="currentColor"
              className="text-amber-500"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
            <text
              x={W - padR}
              y={yAt(subjectVal) - 4}
              textAnchor="end"
              className="text-amber-600"
              fontSize="10"
              fill="currentColor"
            >
              Этот объект: {formatThousands(subjectVal)} ₽/м²
            </text>
          </>
        ) : null}

        {/* Line */}
        {pathSegments.length > 0 ? (
          <path
            d={pathSegments.join(' ')}
            fill="none"
            stroke="currentColor"
            className="text-primary"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : null}

        {/* Points */}
        {data.map((d, i) =>
          d.avgPricePerSqm > 0 ? (
            <circle
              key={i}
              cx={xAt(i)}
              cy={yAt(d.avgPricePerSqm)}
              r={3}
              fill="currentColor"
              className="text-primary"
            />
          ) : null,
        )}

        {/* X labels: every 2nd month to avoid crowding */}
        {data.map((d, i) =>
          i % 2 === data.length % 2 ? (
            <text
              key={i}
              x={xAt(i)}
              y={H - 8}
              textAnchor="middle"
              className="text-on-surface-variant"
              fontSize="10"
              fill="currentColor"
            >
              {formatMonthLabel(d.month)}
            </text>
          ) : null,
        )}
      </svg>
    </div>
  )
}

interface BarProps {
  subjectPricePerSqm: number | null
  marketAvgPricePerSqm: number
  marketMedianPricePerSqm: number
}

/**
 * Horizontal comparison bar chart: subject vs market avg/median.
 * Bars are sized relative to the maximum value in the set.
 */
export const PriceCompareChart: React.FC<BarProps> = ({
  subjectPricePerSqm,
  marketAvgPricePerSqm,
  marketMedianPricePerSqm,
}) => {
  const rows = [
    { label: 'Этот объект', value: subjectPricePerSqm ?? 0, accent: 'amber' as const },
    { label: 'Среднее по району', value: marketAvgPricePerSqm, accent: 'primary' as const },
    { label: 'Медиана', value: marketMedianPricePerSqm, accent: 'muted' as const },
  ].filter((r) => r.value > 0)

  const max = Math.max(...rows.map((r) => r.value), 1)

  const colorClass = (accent: 'amber' | 'primary' | 'muted') =>
    accent === 'amber'
      ? 'bg-amber-400'
      : accent === 'primary'
      ? 'bg-primary'
      : 'bg-surface-container-high'

  return (
    <div className="w-full space-y-3">
      {rows.map((r) => (
        <div key={r.label}>
          <div className="flex items-baseline justify-between text-body-sm">
            <span className="text-on-surface">{r.label}</span>
            <span className="text-on-surface font-medium">
              {r.value.toLocaleString('ru-RU')} ₽/м²
            </span>
          </div>
          <div className="mt-1 h-2 w-full rounded-full bg-surface-container overflow-hidden">
            <div
              className={`h-full rounded-full ${colorClass(r.accent)} transition-all duration-500`}
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
