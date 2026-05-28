// Pure aggregation helpers for the "Бесплатный анализ недвижимости" section.
// Takes a list of flats (already filtered by district / rooms / etc.) and a
// reference subject flat, returns numeric summaries + monthly trend.

export interface FlatLike {
  id: string | number
  price?: number | null
  area?: { total?: number | null } | null
  createdAt?: string | null
}

export interface PriceStats {
  count: number
  avgPrice: number
  medianPrice: number
  minPrice: number
  maxPrice: number
  avgPricePerSqm: number
  medianPricePerSqm: number
}

export interface SubjectComparison {
  /** Subject's own price-per-m². Null if area or price is missing. */
  pricePerSqm: number | null
  /** Avg ₽/m² over comparable set. */
  marketAvgPricePerSqm: number
  /** Subject vs market, signed percentage. Positive = above market. */
  deltaPct: number | null
}

export interface MonthlyPoint {
  /** YYYY-MM */
  month: string
  /** Avg ₽/m² for flats published that month. */
  avgPricePerSqm: number
  count: number
}

const ppsq = (f: FlatLike): number | null => {
  const p = f.price
  const a = f.area?.total
  if (!p || !a || a <= 0) return null
  return p / a
}

const median = (sortedAsc: number[]): number => {
  if (sortedAsc.length === 0) return 0
  const mid = Math.floor(sortedAsc.length / 2)
  return sortedAsc.length % 2 ? sortedAsc[mid] : (sortedAsc[mid - 1] + sortedAsc[mid]) / 2
}

const avg = (xs: number[]): number =>
  xs.length === 0 ? 0 : xs.reduce((s, x) => s + x, 0) / xs.length

/** Stats over a set of comparable flats. */
export const aggregateStats = (flats: FlatLike[]): PriceStats => {
  const prices: number[] = []
  const pps: number[] = []
  for (const f of flats) {
    if (typeof f.price === 'number') prices.push(f.price)
    const p = ppsq(f)
    if (p !== null) pps.push(p)
  }
  const pricesSorted = [...prices].sort((a, b) => a - b)
  const ppsSorted = [...pps].sort((a, b) => a - b)
  return {
    count: flats.length,
    avgPrice: Math.round(avg(prices)),
    medianPrice: Math.round(median(pricesSorted)),
    minPrice: pricesSorted[0] ?? 0,
    maxPrice: pricesSorted[pricesSorted.length - 1] ?? 0,
    avgPricePerSqm: Math.round(avg(pps)),
    medianPricePerSqm: Math.round(median(ppsSorted)),
  }
}

/** Compares the subject flat against the market. */
export const compareSubject = (subject: FlatLike, stats: PriceStats): SubjectComparison => {
  const subjectPps = ppsq(subject)
  if (subjectPps === null || stats.avgPricePerSqm === 0) {
    return {
      pricePerSqm: subjectPps,
      marketAvgPricePerSqm: stats.avgPricePerSqm,
      deltaPct: null,
    }
  }
  return {
    pricePerSqm: Math.round(subjectPps),
    marketAvgPricePerSqm: stats.avgPricePerSqm,
    deltaPct: Math.round(((subjectPps - stats.avgPricePerSqm) / stats.avgPricePerSqm) * 100),
  }
}

/**
 * Buckets flats by their createdAt month and returns the last `months` worth
 * of points (oldest → newest). Missing months are filled with 0/count=0 so
 * the chart renders a continuous timeline.
 */
export const monthlyTrend = (flats: FlatLike[], months = 12): MonthlyPoint[] => {
  // Build last N month keys ending at "now".
  const now = new Date()
  const keys: string[] = []
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    keys.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`)
  }

  // Bucket
  const buckets = new Map<string, number[]>()
  for (const k of keys) buckets.set(k, [])
  for (const f of flats) {
    if (!f.createdAt) continue
    const d = new Date(f.createdAt)
    if (!Number.isFinite(d.getTime())) continue
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    const bucket = buckets.get(k)
    if (!bucket) continue // outside window
    const p = ppsq(f)
    if (p !== null) bucket.push(p)
  }

  return keys.map((k) => {
    const bucket = buckets.get(k) ?? []
    return {
      month: k,
      avgPricePerSqm: Math.round(avg(bucket)),
      count: bucket.length,
    }
  })
}
