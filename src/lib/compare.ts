// LocalStorage-стек для «Сравнить»: до 4 объектов одного типа
// одновременно. Пересечение типов не допускаем — сравнивать
// «квартира vs участок» бессмысленно.
//
// Подход и API идентичны favorites.ts для консистентности.

const STORAGE_KEY = 'realty_compare_v1'
const MAX_ITEMS = 4

export type CompareCollection =
  | 'flats'
  | 'commercial'
  | 'lands'
  | 'residential-complexes'

export interface CompareRef {
  collection: CompareCollection
  id: string | number
}

const isBrowser = () => typeof window !== 'undefined'

const read = (): CompareRef[] => {
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

const write = (next: CompareRef[]) => {
  if (!isBrowser()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('realty:compare-changed'))
}

export const listCompare = (): CompareRef[] => read()

export const isInCompare = (ref: CompareRef): boolean =>
  read().some(
    (c) => c.collection === ref.collection && String(c.id) === String(ref.id),
  )

/**
 * Возвращает один из:
 *   'added'     — успешно добавлено
 *   'removed'   — было в стеке, убрали
 *   'limit'     — превышен MAX_ITEMS
 *   'mismatch'  — попытка добавить объект другого типа в непустой стек
 */
export type CompareToggleResult = 'added' | 'removed' | 'limit' | 'mismatch'

export const toggleCompare = (ref: CompareRef): CompareToggleResult => {
  const current = read()
  const exists = current.some(
    (c) => c.collection === ref.collection && String(c.id) === String(ref.id),
  )
  if (exists) {
    const next = current.filter(
      (c) => !(c.collection === ref.collection && String(c.id) === String(ref.id)),
    )
    write(next)
    return 'removed'
  }
  if (current.length > 0 && current[0]!.collection !== ref.collection) {
    return 'mismatch'
  }
  if (current.length >= MAX_ITEMS) {
    return 'limit'
  }
  write([{ collection: ref.collection, id: ref.id }, ...current])
  return 'added'
}

export const clearCompare = () => write([])

export { MAX_ITEMS as COMPARE_MAX_ITEMS }

// ─── React hook ───────────────────────────────────────────────────
// Backed by useSyncExternalStore (see favorites.ts for the rationale).

import * as React from 'react'

let snapshot: CompareRef[] = []
let hasSnapshot = false

const getSnapshot = (): CompareRef[] => {
  if (!hasSnapshot) {
    snapshot = read()
    hasSnapshot = true
  }
  return snapshot
}

const EMPTY_SNAPSHOT: CompareRef[] = []
const getServerSnapshot = (): CompareRef[] => EMPTY_SNAPSHOT

const subscribe = (onStoreChange: () => void) => {
  const refresh = () => {
    hasSnapshot = false
    onStoreChange()
  }
  window.addEventListener('storage', refresh)
  window.addEventListener('realty:compare-changed', refresh)
  return () => {
    window.removeEventListener('storage', refresh)
    window.removeEventListener('realty:compare-changed', refresh)
  }
}

export const useCompare = (): CompareRef[] =>
  React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
