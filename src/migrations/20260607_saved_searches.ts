import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * saved_searches — пользовательские сохранённые поиски.
 * См. src/collections/SavedSearches.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_saved_searches_frequency" AS ENUM('instant', 'daily', 'weekly');

    CREATE TABLE "saved_searches" (
      "id"               SERIAL PRIMARY KEY NOT NULL,
      "email"            VARCHAR NOT NULL,
      "name"             VARCHAR NOT NULL,
      "filters"          JSONB NOT NULL,
      "frequency"        "enum_saved_searches_frequency" DEFAULT 'daily',
      "is_active"        BOOLEAN DEFAULT true,
      "last_run_at"      TIMESTAMP(3) WITH TIME ZONE,
      "last_match_count" NUMERIC,
      "updated_at"       TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL,
      "created_at"       TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL
    );

    CREATE INDEX "saved_searches_email_idx" ON "saved_searches" ("email");
    CREATE INDEX "saved_searches_active_run_idx" ON "saved_searches"
      ("is_active", "last_run_at")
      WHERE "is_active" = true;
  `)

  // payload_locked_documents_rels хвост — best-effort, не критично.
  try {
    await db.execute(sql`
      ALTER TABLE "payload_locked_documents_rels"
        ADD COLUMN IF NOT EXISTS "saved_searches_id" integer;
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_saved_searches_fk"
        FOREIGN KEY ("saved_searches_id") REFERENCES "public"."saved_searches"("id")
        ON DELETE cascade ON UPDATE no action;
    `)
  } catch {
    /* уже есть — игнорируем */
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "saved_searches" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_saved_searches_frequency";
  `)
}
