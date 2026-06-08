import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * seo_landings — сгенерированный SEO-контент для (city × filter) комбо.
 *
 * Не хранит сами объявления (они в flats/houses/commercial/lands),
 * только метаданные и описания для landing-страницы:
 * <h1>Квартиры в Москве до 15 млн</h1> + intro + FAQ.
 *
 * Соответствие URL: city_slug + filter_slug → /<city>/<filter>.
 *
 * Гибридная архитектура:
 *   • если в seo_landings ЕСТЬ запись для (city,filter) — рендерим её
 *     поверх существующей каталожной страницы
 *   • если НЕТ — каталожная страница работает как раньше
 *   → SEO-content layered on top, не ломает работающий роутинг.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE seo_landings (
      "id"                   SERIAL PRIMARY KEY,
      "city_slug"            VARCHAR NOT NULL,
      "city_name"            VARCHAR NOT NULL,
      "filter_slug"          VARCHAR NOT NULL,
      "filter_label"         VARCHAR,
      "property_type"        VARCHAR,    -- 'flats' | 'houses' | 'commercial' | 'lands' | 'residential-complexes'
      "filter_params"        JSONB,       -- произвольный набор фильтров для построения caption

      -- Сгенерированный контент
      "title"                VARCHAR,     -- 60-70 chars для <title>
      "meta_description"     VARCHAR,     -- 140-160 chars для meta description
      "h1"                   VARCHAR,
      "intro"                TEXT,        -- 1-2 параграфа простого HTML
      "faq"                  JSONB,       -- [{q, a}]

      -- Статус
      "is_published"         BOOLEAN DEFAULT true,
      "is_premium"           BOOLEAN DEFAULT false,
      "generation_meta"      JSONB,        -- {model, prompt_version, tokens, generated_at}

      -- Мониторинг (Phase 3)
      "indexed_at"           TIMESTAMP(3) WITH TIME ZONE,
      "indexation_status"    VARCHAR,

      "updated_at"           TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL,
      "created_at"           TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL,

      -- Уникальность по комбо (city, filter) — один landing на пару
      CONSTRAINT seo_landings_combo_unique UNIQUE ("city_slug", "filter_slug")
    );

    CREATE INDEX seo_landings_city_idx ON seo_landings ("city_slug");
    CREATE INDEX seo_landings_published_idx ON seo_landings ("is_published")
      WHERE "is_published" = true;
  `)

  try {
    await db.execute(sql`
      ALTER TABLE "payload_locked_documents_rels"
        ADD COLUMN IF NOT EXISTS "seo_landings_id" integer;
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_seo_landings_fk"
        FOREIGN KEY ("seo_landings_id") REFERENCES "public"."seo_landings"("id")
        ON DELETE cascade ON UPDATE no action;
    `)
  } catch {
    /* best-effort */
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS seo_landings CASCADE;`)
}
