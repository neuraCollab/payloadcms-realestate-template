import type { CollectionAfterChangeHook } from 'payload'
import { publishListingToCity } from '@/lib/telegram/publish'

/**
 * Хук afterChange — публикует свежесозданный/опубликованный объект
 * в Telegram-канал города.
 *
 * Срабатывает на:
 *   • operation === 'create'                       — новый объект
 *   • operation === 'update' && previousDoc.status !== 'active'
 *     && doc.status === 'active'                   — был драфт, стал активным
 *
 * Fire-and-forget через setImmediate — Telegram API лагает,
 * пользовательский ответ не блокируем.
 */
export const telegramPublishAfterChange =
  (collection: string): CollectionAfterChangeHook =>
  ({ doc, previousDoc, operation, req }) => {
    const wasInactive =
      operation === 'update' &&
      previousDoc?.status !== 'active' &&
      doc?.status === 'active'

    if (operation !== 'create' && !wasInactive) return doc

    // Только если объявление активно (на момент create статус
    // default = 'active', так что условие срабатывает).
    if (doc?.status && doc.status !== 'active') return doc

    setImmediate(() => {
      void publishListingToCity(req.payload, collection, doc).catch((err) => {
        req.payload.logger.error(
          { err: (err as Error).message, collection, id: doc?.id },
          '[telegramPublish] failed',
        )
      })
    })

    return doc
  }
