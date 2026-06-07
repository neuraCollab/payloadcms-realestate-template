import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Поля для пользовательских объявлений из личного кабинета:
 *   • contact_email — email владельца объявления (магик-линк аккаунта).
 *     По нему ищем «мои объявления» в кабинете.
 *   • submitted_at — момент отправки на модерацию. До отправки —
 *     status='draft' + submitted_at=NULL.
 *   • moderation_note — комментарий модератора при rejection.
 *
 * Добавляем сразу в flats, commercial, lands. residential_complexes
 * пока не трогаем — там обычно застройщик/admin, а не частник.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE flats
      ADD COLUMN IF NOT EXISTS contact_email VARCHAR,
      ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP(3) WITH TIME ZONE,
      ADD COLUMN IF NOT EXISTS moderation_note VARCHAR;
    CREATE INDEX IF NOT EXISTS flats_contact_email_idx ON flats (contact_email);

    ALTER TABLE commercial
      ADD COLUMN IF NOT EXISTS contact_email VARCHAR,
      ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP(3) WITH TIME ZONE,
      ADD COLUMN IF NOT EXISTS moderation_note VARCHAR;
    CREATE INDEX IF NOT EXISTS commercial_contact_email_idx ON commercial (contact_email);

    ALTER TABLE lands
      ADD COLUMN IF NOT EXISTS contact_email VARCHAR,
      ADD COLUMN IF NOT EXISTS submitted_at TIMESTAMP(3) WITH TIME ZONE,
      ADD COLUMN IF NOT EXISTS moderation_note VARCHAR;
    CREATE INDEX IF NOT EXISTS lands_contact_email_idx ON lands (contact_email);

    -- Добавляем 'pending_review' в enum статусов для всех 3 коллекций.
    -- ALTER TYPE ADD VALUE не работает внутри транзакции в старых
    -- версиях Postgres, но pg15+ работает.
    DO $$
    BEGIN
      ALTER TYPE enum_flats_status ADD VALUE IF NOT EXISTS 'pending_review';
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$
    BEGIN
      ALTER TYPE enum_commercial_status ADD VALUE IF NOT EXISTS 'pending_review';
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
    DO $$
    BEGIN
      ALTER TYPE enum_lands_status ADD VALUE IF NOT EXISTS 'pending_review';
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE flats DROP COLUMN IF EXISTS contact_email,
                      DROP COLUMN IF EXISTS submitted_at,
                      DROP COLUMN IF EXISTS moderation_note;
    ALTER TABLE commercial DROP COLUMN IF EXISTS contact_email,
                           DROP COLUMN IF EXISTS submitted_at,
                           DROP COLUMN IF EXISTS moderation_note;
    ALTER TABLE lands DROP COLUMN IF EXISTS contact_email,
                      DROP COLUMN IF EXISTS submitted_at,
                      DROP COLUMN IF EXISTS moderation_note;
    -- enum values нельзя удалить в postgres
  `)
}
