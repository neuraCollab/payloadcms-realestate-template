import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Drop the existing ivfflat index
    DROP INDEX IF EXISTS property_embeddings_vec_cosine_idx;

    -- Create hnsw index for better performance and accuracy
    -- m=16 and ef_construction=64 are reasonable defaults for 384-dimensional vectors
    CREATE INDEX IF NOT EXISTS property_embeddings_vec_cosine_idx
      ON property_embeddings
      USING hnsw (embedding vector_cosine_ops)
      WITH (m = 16, ef_construction = 64);
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop the hnsw index
    DROP INDEX IF EXISTS property_embeddings_vec_cosine_idx;

    -- Recreate the ivfflat index
    CREATE INDEX IF NOT EXISTS property_embeddings_vec_cosine_idx
      ON property_embeddings
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 100);
  `)
}
