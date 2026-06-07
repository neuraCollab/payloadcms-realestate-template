import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * AI-поиск: добавляем pgvector extension и полиморфную таблицу
 * property_embeddings.
 *
 * Полиморфная (один row на (collection_slug, doc_id, kind, model))
 * чтобы хранить эмбеддинги от всех 4 типов недвижимости и в будущем
 * добавлять `kind='image_clip'` без изменения схемы.
 *
 * ivfflat-индекс с cosine ops — подходит для семантического поиска
 * через `embedding <=> $query`.  lists=100 хорошо работает на
 * датасетах до ~100k строк; больше — увеличить до sqrt(n).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE EXTENSION IF NOT EXISTS vector;

    CREATE TABLE IF NOT EXISTS property_embeddings (
      id            SERIAL PRIMARY KEY,
      collection_slug TEXT NOT NULL,
      doc_id        INTEGER NOT NULL,
      kind          TEXT NOT NULL DEFAULT 'text',
      model         TEXT NOT NULL,
      content_hash  TEXT NOT NULL,
      embedding     vector(384) NOT NULL,
      meta          JSONB,
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (collection_slug, doc_id, kind, model)
    );

    CREATE INDEX IF NOT EXISTS property_embeddings_collection_doc_idx
      ON property_embeddings (collection_slug, doc_id);

    -- ivfflat index только для kind='text' пока что (image-вектор
    -- будет другой размерности).
    CREATE INDEX IF NOT EXISTS property_embeddings_vec_cosine_idx
      ON property_embeddings
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS property_embeddings_vec_cosine_idx;
    DROP INDEX IF EXISTS property_embeddings_collection_doc_idx;
    DROP TABLE IF EXISTS property_embeddings;
    -- pgvector extension оставляем — она может использоваться другими
    -- объектами в будущем.
  `)
}
