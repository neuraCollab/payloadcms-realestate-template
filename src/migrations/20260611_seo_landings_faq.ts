import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * seo_landings.faq (jsonb) → seo_landings_faq (child table).
 *
 * SeoLandings.faq (src/collections/SeoLandings) is an `array` field,
 * which Payload's Postgres adapter always stores as a separate child
 * table joined by _parent_id — but the 20260608_seo_landings migration
 * that created the table instead added a plain `faq jsonb` column.
 * Every admin list/read of seo-landings failed ("Failed query") because
 * Payload builds its select against a seo_landings_faq table that never
 * existed. No rows currently carry faq data, so this only needs to fix
 * the shape, not migrate values.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "seo_landings_faq" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "q" varchar NOT NULL,
      "a" text NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "seo_landings_faq_order_idx" ON "seo_landings_faq" ("_order");
    CREATE INDEX IF NOT EXISTS "seo_landings_faq_parent_id_idx" ON "seo_landings_faq" ("_parent_id");

    ALTER TABLE "seo_landings_faq"
      ADD CONSTRAINT "seo_landings_faq_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_landings"("id") ON DELETE cascade;

    ALTER TABLE "seo_landings" DROP COLUMN IF EXISTS "faq";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "seo_landings" ADD COLUMN IF NOT EXISTS "faq" JSONB;
    DROP TABLE IF EXISTS "seo_landings_faq" CASCADE;
  `)
}
