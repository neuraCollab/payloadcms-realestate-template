import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { indexDoc, deindexDoc, type SupportedCollection } from '../../lib/embeddings'

/**
 * Универсальные afterChange / afterDelete хуки для индексации
 * эмбеддингов. Fire-and-forget: возвращаем `doc` мгновенно, embed
 * работа уходит в фон. Ошибка эмбеддинга НЕ блокирует сохранение —
 * это business decision: лучше иметь объявление с устаревшим вектором,
 * чем уронить сохранение из-за лагов TEI.
 */

export const embedAfterChange =
  (collection: SupportedCollection): CollectionAfterChangeHook =>
  ({ doc, req, operation }) => {
    if (process.env.NEXT_PUBLIC_ENABLE_AI !== 'true') return doc
    if (operation !== 'create' && operation !== 'update') return doc
    // Fire-and-forget. setImmediate отдаёт control обратно немедленно.
    setImmediate(() => {
      void indexDoc(req.payload, collection, doc)
    })
    return doc
  }

export const embedAfterDelete =
  (collection: SupportedCollection): CollectionAfterDeleteHook =>
  ({ doc, req }) => {
    if (process.env.NEXT_PUBLIC_ENABLE_AI !== 'true') return doc
    setImmediate(() => {
      void deindexDoc(req.payload, collection, doc.id)
    })
    return doc
  }
