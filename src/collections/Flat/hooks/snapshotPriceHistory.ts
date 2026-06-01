import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Whenever Flat.price changes, append a snapshot to `priceHistory`:
 *   { date: now, price, currency }
 *
 * `originalDoc` carries the pre-update state on `update`; on `create` it's
 * undefined so we seed the first snapshot from the incoming price.
 */
export const snapshotPriceHistory: CollectionBeforeChangeHook = async ({
  data,
  originalDoc,
  operation,
}) => {
  const nextPrice = typeof data.price === 'number' ? data.price : undefined
  if (nextPrice === undefined) return data

  const currency = (data.currency as string) ?? originalDoc?.currency ?? 'RUB'
  const existing: Array<{ date: string; price: number; currency?: string }> = Array.isArray(
    data.priceHistory,
  )
    ? data.priceHistory
    : Array.isArray(originalDoc?.priceHistory)
    ? originalDoc.priceHistory
    : []

  if (operation === 'create') {
    if (existing.length === 0) {
      data.priceHistory = [
        { date: new Date().toISOString(), price: nextPrice, currency },
      ]
    }
    return data
  }

  const prevPrice =
    typeof originalDoc?.price === 'number' ? originalDoc.price : undefined
  if (prevPrice === undefined || prevPrice === nextPrice) {
    // No change. Keep history as-is.
    data.priceHistory = existing
    return data
  }

  data.priceHistory = [
    ...existing,
    { date: new Date().toISOString(), price: nextPrice, currency },
  ]
  return data
}
