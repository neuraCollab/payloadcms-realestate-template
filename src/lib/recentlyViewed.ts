// Client-side "recently viewed" list backed by localStorage.
// Capacity is bounded so the list doesn't grow forever.

import * as React from 'react'

const STORAGE_KEY = 'realty_recently_viewed_v1'
const MAX_ITEMS = 20

export type RecentCollection = 'flats' | 'commercial' | 'lands' | 'residential-complexes'

export interface RecentRef {
  collection: RecentCollection
  id: string | number
  /** ISO timestamp of last view. Used to sort newest-first. */
  viewedAt: string
}

const isBrowser = () => typeof window !== 'undefined'

const read = (): RecentRef[] => {
  if (!isBrowser()) return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const write = (next: RecentRef[]) => {
  if (!isBrowser()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('realty:recent-changed'))
}

export const listRecentlyViewed = (): RecentRef[] => read()

/**
 * Record that the user just viewed this object. Moves it to the front of
 * the list and bumps `viewedAt`. Trims oldest beyond MAX_ITEMS.
 */
export const trackView = (ref: Omit<RecentRef, 'viewedAt'>) => {
  const current = read()
  const filtered = current.filter(
    (r) => !(r.collection === ref.collection && String(r.id) === String(ref.id)),
  )
  const next: RecentRef[] = [
    { ...ref, viewedAt: new Date().toISOString() },
    ...filtered,
  ].slice(0, MAX_ITEMS)
  write(next)
}

export const clearRecentlyViewed = () => write([])

export const useRecentlyViewed = (): RecentRef[] => {
  const [items, setItems] = React.useState<RecentRef[]>([])
  React.useEffect(() => {
    setItems(read())
    const refresh = () => setItems(read())
    window.addEventListener('storage', refresh)
    window.addEventListener('realty:recent-changed', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('realty:recent-changed', refresh)
    }
  }, [])
  return items
}
