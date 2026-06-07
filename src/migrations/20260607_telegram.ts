import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Telegram-интеграция:
 *   • telegram_channels — маппинг город → channel_id
 *   • telegram_sessions — состояние диалога с ботом (Q&A для /new, /search)
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE "telegram_channels" (
      "id"                SERIAL PRIMARY KEY NOT NULL,
      "city_name"         VARCHAR NOT NULL,
      "city_slug"         VARCHAR NOT NULL,
      "channel_id"        VARCHAR NOT NULL,
      "channel_username"  VARCHAR,
      "is_active"         BOOLEAN DEFAULT true,
      "posted_count"      NUMERIC DEFAULT 0,
      "updated_at"        TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL,
      "created_at"        TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL
    );

    CREATE INDEX "telegram_channels_city_slug_idx" ON "telegram_channels" ("city_slug");
    CREATE UNIQUE INDEX "telegram_channels_city_name_unique" ON "telegram_channels" ("city_name");

    -- Диалог-сессии. Хранят: текущий шаг (например 'new:awaiting_price'),
    -- черновик данных (JSON), последнее обновление. Истёкшие (>24ч)
    -- чистятся отдельным cron'ом или на следующем write.
    CREATE TABLE "telegram_sessions" (
      "id"          SERIAL PRIMARY KEY NOT NULL,
      "chat_id"     BIGINT NOT NULL UNIQUE,
      "step"        VARCHAR,
      "draft"       JSONB DEFAULT '{}'::jsonb,
      "updated_at"  TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL,
      "created_at"  TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL
    );

    CREATE INDEX "telegram_sessions_chat_id_idx" ON "telegram_sessions" ("chat_id");
    CREATE INDEX "telegram_sessions_updated_at_idx" ON "telegram_sessions" ("updated_at");
  `)

  // payload_locked_documents_rels — хвост для админ-блокировок.
  try {
    await db.execute(sql`
      ALTER TABLE "payload_locked_documents_rels"
        ADD COLUMN IF NOT EXISTS "telegram_channels_id" integer;
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_telegram_channels_fk"
        FOREIGN KEY ("telegram_channels_id") REFERENCES "public"."telegram_channels"("id")
        ON DELETE cascade ON UPDATE no action;
    `)
  } catch {
    /* ok */
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "telegram_sessions" CASCADE;
    DROP TABLE IF EXISTS "telegram_channels" CASCADE;
  `)
}
