/**
 * Embeddings module — public API.
 *
 * Все остальное в src/lib/embeddings — внутренняя кухня.
 */

export {
  embed,
  embedOne,
  embedQuery,
  embedPassage,
  isConfigured,
  EMBEDDING_MODEL,
  EMBEDDING_DIM,
} from './client'
export { serializeDoc, hashText, type SupportedCollection } from './serialize'
export {
  upsertEmbedding,
  deleteEmbedding,
  getStoredHash,
  searchEmbeddings,
  type SearchHit,
} from './store'
export { parsePrompt, type ParsedQuery } from './queryParser'

import type { Payload } from 'payload'
import { embedPassage, isConfigured } from './client'
import {
  serializeDoc,
  hashText,
  type SupportedCollection,
} from './serialize'
import {
  upsertEmbedding,
  deleteEmbedding,
  getStoredHash,
} from './store'

/**
 * High-level: индексировать документ. Идемпотентно — если content_hash
 * совпал с уже сохранённым, пропускает embedding API call.
 *
 * Fire-and-forget безопасно: внутри отлавливаются все ошибки и
 * логируются через payload.logger.
 */
export async function indexDoc(
  payload: Payload,
  collection: SupportedCollection,
  doc: any,
  options: { force?: boolean } = {},
): Promise<{ skipped: boolean; reason?: string }> {
  if (!isConfigured()) {
    return { skipped: true, reason: 'EMBEDDINGS_URL not configured' }
  }
  if (!doc?.id) {
    return { skipped: true, reason: 'no doc id' }
  }
  try {
    const text = serializeDoc(collection, doc)
    if (!text.trim()) {
      return { skipped: true, reason: 'empty serialized text' }
    }
    const contentHash = hashText(text)

    if (!options.force) {
      const stored = await getStoredHash(payload, {
        collection,
        docId: doc.id,
      })
      if (stored === contentHash) {
        return { skipped: true, reason: 'hash unchanged' }
      }
    }

    const vector = await embedPassage(text)
    await upsertEmbedding(payload, {
      collection,
      docId: doc.id,
      vector,
      contentHash,
    })
    return { skipped: false }
  } catch (err) {
    payload.logger.error({
      msg: '[embeddings] indexDoc failed',
      collection,
      docId: doc?.id,
      err: err instanceof Error ? err.message : String(err),
    })
    return { skipped: true, reason: 'error' }
  }
}

/**
 * Удалить эмбеддинги документа. Для afterDelete hook'а.
 */
export async function deindexDoc(
  payload: Payload,
  collection: SupportedCollection,
  docId: number | string,
): Promise<void> {
  try {
    await deleteEmbedding(payload, { collection, docId })
  } catch (err) {
    payload.logger.error({
      msg: '[embeddings] deindexDoc failed',
      collection,
      docId,
      err: err instanceof Error ? err.message : String(err),
    })
  }
}
