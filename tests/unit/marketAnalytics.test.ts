// Unit tests for the pure aggregation helpers.
// Runnable with `npx tsx tests/unit/marketAnalytics.test.ts` — uses node:test.

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import {
  aggregateStats,
  compareSubject,
  monthlyTrend,
  type FlatLike,
} from '../../src/lib/marketAnalytics'

const flat = (price: number, area: number, createdAt?: string): FlatLike => ({
  id: `${price}-${area}-${createdAt ?? 'none'}`,
  price,
  area: { total: area },
  createdAt,
})

describe('aggregateStats', () => {
  it('returns zero stats for empty input', () => {
    const s = aggregateStats([])
    assert.equal(s.count, 0)
    assert.equal(s.avgPrice, 0)
    assert.equal(s.medianPrice, 0)
    assert.equal(s.avgPricePerSqm, 0)
  })

  it('computes mean/median correctly for odd-length set', () => {
    // ₽/м² values: 100, 200, 300 → median 200, avg 200
    const s = aggregateStats([flat(1000, 10), flat(2000, 10), flat(3000, 10)])
    assert.equal(s.count, 3)
    assert.equal(s.avgPrice, 2000)
    assert.equal(s.medianPrice, 2000)
    assert.equal(s.avgPricePerSqm, 200)
    assert.equal(s.medianPricePerSqm, 200)
    assert.equal(s.minPrice, 1000)
    assert.equal(s.maxPrice, 3000)
  })

  it('skips flats without area or price for ₽/м² metrics', () => {
    const s = aggregateStats([
      flat(1000, 10),
      { id: 'no-area', price: 1000, area: null },
      { id: 'no-price', area: { total: 10 } },
    ])
    // Only the first row contributes to ₽/м²
    assert.equal(s.avgPricePerSqm, 100)
  })
})

describe('compareSubject', () => {
  it('returns null delta when market avg is zero', () => {
    const cmp = compareSubject(flat(1000, 10), {
      count: 0,
      avgPrice: 0,
      medianPrice: 0,
      minPrice: 0,
      maxPrice: 0,
      avgPricePerSqm: 0,
      medianPricePerSqm: 0,
    })
    assert.equal(cmp.deltaPct, null)
  })

  it('reports percentage above market', () => {
    const stats = aggregateStats([flat(1000, 10), flat(1100, 10)])
    // avg ₽/м² ≈ 105
    const cmp = compareSubject(flat(2100, 10), stats)
    // 210 vs 105 → +100%
    assert.equal(cmp.pricePerSqm, 210)
    assert.equal(cmp.marketAvgPricePerSqm, 105)
    assert.equal(cmp.deltaPct, 100)
  })
})

describe('monthlyTrend', () => {
  it('returns exactly N months ending at today', () => {
    const points = monthlyTrend([], 6)
    assert.equal(points.length, 6)
  })

  it('buckets flats by their createdAt month', () => {
    const now = new Date()
    const thisMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

    const points = monthlyTrend(
      [
        flat(1000, 10, now.toISOString()),
        flat(2000, 10, now.toISOString()),
      ],
      6,
    )
    const last = points[points.length - 1]
    assert.equal(last.month, thisMonthKey)
    assert.equal(last.count, 2)
    assert.equal(last.avgPricePerSqm, 150)
  })

  it('drops flats outside the lookback window', () => {
    const farPast = '2010-01-15T00:00:00.000Z'
    const points = monthlyTrend([flat(1000, 10, farPast)], 6)
    const totalSamples = points.reduce((s, p) => s + p.count, 0)
    assert.equal(totalSamples, 0)
  })
})
