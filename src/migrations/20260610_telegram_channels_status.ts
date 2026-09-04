import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * telegram_channels.is_active (boolean) → status (varchar).
 *
 * The TelegramChannels collection config (src/collections/TelegramChannels)
 * was changed to a `status` select field ('active'/'inactive') at some
 * point, but the 20260607_telegram migration that created the table was
 * never updated to match — it still creates an `is_active` boolean
 * column. Payload's Postgres adapter builds its queries from the
 * current collection config, so every read/write against this
 * collection failed with "column status does not exist" until the
 * physical schema is brought back in line with the config.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "telegram_channels" ADD COLUMN IF NOT EXISTS "status" VARCHAR DEFAULT 'active' NOT NULL;

    UPDATE "telegram_channels" SET "status" = CASE WHEN "is_active" THEN 'active' ELSE 'inactive' END;

    ALTER TABLE "telegram_channels" DROP COLUMN IF EXISTS "is_active";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "telegram_channels" ADD COLUMN IF NOT EXISTS "is_active" BOOLEAN DEFAULT true;

    UPDATE "telegram_channels" SET "is_active" = ("status" = 'active');

    ALTER TABLE "telegram_channels" DROP COLUMN IF EXISTS "status";
  `)
}
