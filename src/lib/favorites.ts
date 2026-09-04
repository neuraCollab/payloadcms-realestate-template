// Client-side favorites stored in localStorage. Each entry is a tuple of
// collection slug + document id so we can fetch fresh data when displaying.
//
//   key = `${collection}:${id}`
//
// Storage uses a single key so reads are cheap and writes atomic.

const STORAGE_KEY = 'realty_favorites_v1'

export type FavCollection = 'flats' | 'commercial' | 'lands' | 'residential-complexes'

export interface FavoriteRef {
  collection: FavCollection
  id: string | number
}

const isBrowser = () => typeof window !== 'undefined'

const read = (): FavoriteRef[] => {
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

const write = (next: FavoriteRef[]) => {
  if (!isBrowser()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  // Notify same-tab listeners via a custom event (storage event only fires across tabs).
  window.dispatchEvent(new CustomEvent('realty:favorites-changed'))
}

export const listFavorites = (): FavoriteRef[] => read()

export const isFavorite = (ref: FavoriteRef): boolean =>
  read().some((f) => f.collection === ref.collection && String(f.id) === String(ref.id))

export const toggleFavorite = (ref: FavoriteRef): boolean => {
  const current = read()
  const exists = current.some(
    (f) => f.collection === ref.collection && String(f.id) === String(ref.id),
  )
  const next = exists
    ? current.filter((f) => !(f.collection === ref.collection && String(f.id) === String(ref.id)))
    : [{ collection: ref.collection, id: ref.id }, ...current]
  write(next)
  return !exists
}

export const clearFavorites = () => write([])

/**
 * React hook to subscribe to favorites changes. Re-renders consumer on
 * cross-tab `storage` events and same-tab `realty:favorites-changed` events.
 *
 * Backed by useSyncExternalStore rather than useState+useEffect so the
 * store snapshot is available on first client render (no post-mount
 * "flash of empty list") and stays tear-safe under concurrent rendering.
 */
import * as React from 'react'

let snapshot: FavoriteRef[] = []
let hasSnapshot = false

const getSnapshot = (): FavoriteRef[] => {
  if (!hasSnapshot) {
    snapshot = read()
    hasSnapshot = true
  }
  return snapshot
}

const getServerSnapshot = (): FavoriteRef[] => []

const subscribe = (onStoreChange: () => void) => {
  const refresh = () => {
    hasSnapshot = false
    onStoreChange()
  }
  window.addEventListener('storage', refresh)
  window.addEventListener('realty:favorites-changed', refresh)
  return () => {
    window.removeEventListener('storage', refresh)
    window.removeEventListener('realty:favorites-changed', refresh)
  }
}

export const useFavorites = (): FavoriteRef[] =>
  React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
