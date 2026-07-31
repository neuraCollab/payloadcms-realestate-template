import type { Payload } from 'payload'
import { sql } from '@payloadcms/db-postgres'
import { EMBEDDING_MODEL } from './client'
import type { SupportedCollection } from './serialize'

/**
 * Доступ к таблице property_embeddings через drizzle-инстанс Payload.
 *
 * pgvector принимает вектор в виде строки '[v1,v2,...]' — это
 * официальный формат для INSERT с casting.
 */

function vectorLiteral(vec: number[]): string {
  // Внутри toFixed(6) — компромисс между точностью и размером.
  return `[${vec.map((v) => v.toFixed(6)).join(',')}]`
}

// PostgreSQL array literal: `{1,2,3}`. Drizzle биндит JS-массив как
// отдельные параметры (что ломает синтаксис ANY/UNNEST), поэтому
// передаём массив в виде одной строки + cast `::int[]`.
function intArrayLiteral(ids: Array<number | string>): string {
  return `{${ids.map((n) => Number(n)).join(',')}}`
}

interface UpsertParams {
  collection: SupportedCollection
  docId: number | string
  vector: number[]
  contentHash: string
  kind?: string
}

/**
 * Upsert эмбеддинга. UNIQUE по (collection, doc_id, kind, model) →
 * ON CONFLICT обновляем вектор и updated_at.
 */
export async function upsertEmbedding(
  payload: Payload,
  params: UpsertParams,
): Promise<void> {
  const { collection, docId, vector, contentHash, kind = 'text' } = params
  const docIdNum = Number(docId)
  const vecLit = vectorLiteral(vector)

  await payload.db.drizzle.execute(sql`
    INSERT INTO property_embeddings
      (collection_slug, doc_id, kind, model, content_hash, embedding, updated_at)
    VALUES
      (${collection}, ${docIdNum}, ${kind}, ${EMBEDDING_MODEL},
       ${contentHash}, ${vecLit}::vector, NOW())
    ON CONFLICT (collection_slug, doc_id, kind, model)
    DO UPDATE SET
      embedding = EXCLUDED.embedding,
      content_hash = EXCLUDED.content_hash,
      updated_at = NOW()
  `)
}

export async function deleteEmbedding(
  payload: Payload,
  params: {
    collection: SupportedCollection
    docId: number | string
    kind?: string
  },
): Promise<void> {
  const { collection, docId, kind } = params
  const docIdNum = Number(docId)
  if (kind) {
    await payload.db.drizzle.execute(sql`
      DELETE FROM property_embeddings
      WHERE collection_slug = ${collection}
        AND doc_id = ${docIdNum}
        AND kind = ${kind}
    `)
  } else {
    await payload.db.drizzle.execute(sql`
      DELETE FROM property_embeddings
      WHERE collection_slug = ${collection}
        AND doc_id = ${docIdNum}
    `)
  }
}

/** Возвращает текущий content_hash или null. Для skip-on-no-change. */
export async function getStoredHash(
  payload: Payload,
  params: {
    collection: SupportedCollection
    docId: number | string
    kind?: string
  },
): Promise<string | null> {
  const { collection, docId, kind = 'text' } = params
  const docIdNum = Number(docId)
  const res: any = await payload.db.drizzle.execute(sql`
    SELECT content_hash FROM property_embeddings
    WHERE collection_slug = ${collection}
      AND doc_id = ${docIdNum}
      AND kind = ${kind}
      AND model = ${EMBEDDING_MODEL}
    LIMIT 1
  `)
  // drizzle execute → объект с rows на pg-драйвере
  const row = (res.rows ?? res)[0] as { content_hash?: string } | undefined
  return row?.content_hash ?? null
}

/**
 * Hit из ANN-поиска: ссылка на документ + дистанция.
 * Дистанция в pgvector через `<=>` это cosine distance (0..2).
 * `similarity = 1 - distance/2` для удобства UI (0..1).
 */
export interface SearchHit {
  collection: SupportedCollection
  docId: number
  distance: number
  similarity: number
}

interface SearchParams {
  vector: number[]
  collections: SupportedCollection[]
  limit?: number
  /** ID-фильтр: возвращаем только хиты, чьи doc_id присутствуют здесь. */
  docIdsByCollection?: Partial<Record<SupportedCollection, Array<number | string>>>
  kind?: string
}

/**
 * ANN search через hnsw/ivfflat. Если задан docIdsByCollection — выдаём
 * только тех, кто прошёл предварительный SQL-фильтр (city/rooms/price).
 *
 * Дистанция cosine: меньше = ближе.
 */
export async function searchEmbeddings(
  payload: Payload,
  params: SearchParams,
): Promise<SearchHit[]> {
  const {
    vector,
    collections,
    limit = 20,
    docIdsByCollection,
    kind = 'text',
  } = params
  if (collections.length === 0) return []

  const vecLit = vectorLiteral(vector)

  // Стратегия: на каждую коллекцию из target — отдельный запрос с
  // массивом ID через ANY($1::int[]). Без префильтра — без doc_id
  // фильтра. Все запросы пускаются параллельно, результаты сливаются
  // и сортируются в JS — это:
  //   • избегает проблем с биндингом массивов в UNNEST через drizzle
  //   • использует векторный индекс внутри каждой выборки
  //   • поддерживает любое число коллекций без динамического SQL
  const queries = collections.map(async (coll): Promise<SearchHit[]> => {
    const ids = docIdsByCollection?.[coll]
    if (docIdsByCollection && (!ids || ids.length === 0)) return []
    const idsLit = ids ? intArrayLiteral(ids) : null

    const res: any = idsLit
      ? await payload.db.drizzle.execute(sql`
          SELECT doc_id,
                 embedding <=> ${vecLit}::vector AS distance
          FROM property_embeddings
          WHERE kind = ${kind}
            AND model = ${EMBEDDING_MODEL}
            AND collection_slug = ${coll}
            AND doc_id = ANY(${idsLit}::int[])
          ORDER BY distance ASC
          LIMIT ${limit}
        `)
      : await payload.db.drizzle.execute(sql`
          SELECT doc_id,
                 embedding <=> ${vecLit}::vector AS distance
          FROM property_embeddings
          WHERE kind = ${kind}
            AND model = ${EMBEDDING_MODEL}
            AND collection_slug = ${coll}
          ORDER BY distance ASC
          LIMIT ${limit}
        `)

    const rows = (res.rows ?? res) as Array<{
      doc_id: number | string
      distance: number | string
    }>
    return rows.map((r) => {
      const distance = Number(r.distance)
      return {
        collection: coll,
        docId: Number(r.doc_id),
        distance,
        similarity: Math.max(0, 1 - distance / 2),
      }
    })
  })

  const all = (await Promise.all(queries)).flat()
  all.sort((a, b) => a.distance - b.distance)
  return all.slice(0, limit)
}

