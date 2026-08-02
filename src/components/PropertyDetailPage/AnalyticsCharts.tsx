'use client'
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'
import type { MonthlyPoint } from '@/lib/marketAnalytics'

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
  const values = data.map((d) => d.avgPricePerSqm).filter((v) => v > 0)
  const subjectVal =
    typeof subjectPricePerSqm === 'number' && subjectPricePerSqm > 0 ? subjectPricePerSqm : null
  const allVals = subjectVal !== null ? [...values, subjectVal] : values

  const minY = allVals.length ? Math.min(...allVals) * 0.9 : 0
  const maxY = allVals.length ? Math.max(...allVals) * 1.1 : 1

  const chartData = data.map((d) => ({
    ...d,
    formattedMonth: formatMonthLabel(d.month),
    avgPricePerSqm: d.avgPricePerSqm > 0 ? d.avgPricePerSqm : null,
  }))

  return (
    <div className="w-full h-[220px]" aria-label="График динамики цены за м²">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 12, right: 12, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="currentColor" className="text-on-surface-variant/20" strokeWidth={1} />
          <XAxis
            dataKey="formattedMonth"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: 'currentColor' }}
            className="text-on-surface-variant"
            interval={1}
            tickMargin={8}
          />
          <YAxis
            domain={[minY, maxY]}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: 'currentColor' }}
            className="text-on-surface-variant"
            tickFormatter={(value) => formatThousands(Math.round(value))}
            width={48}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-card shadow-e2 rounded-md p-2 text-sm border border-outline-variant">
                    <p className="text-on-surface font-medium">
                      {(payload[0].value as number).toLocaleString('ru-RU')} ₽/м²
                    </p>
                    <p className="text-on-surface-variant text-xs">{label}</p>
                  </div>
                )
              }
              return null
            }}
          />
          {subjectVal !== null ? (
            <ReferenceLine
              y={subjectVal}
              stroke="currentColor"
              className="text-amber-500"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                position: 'insideTopRight',
                value: `Этот объект: ${formatThousands(subjectVal)} ₽/м²`,
                fill: 'currentColor',
                className: 'text-amber-600 text-[10px]',
                offset: -4,
              }}
            />
          ) : null}
          <Line
            type="linear"
            dataKey="avgPricePerSqm"
            stroke="currentColor"
            className="text-primary"
            strokeWidth={2}
            dot={{ r: 3, fill: 'currentColor', className: 'text-primary', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
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
