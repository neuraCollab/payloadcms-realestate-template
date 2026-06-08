import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Колонка user_email в search_queries — для recommendation engine.
 * Связываем запрос с автором (cookie realty_email) чтобы потом
 * вытаскивать «мои последние запросы» как контекст.
 *
 * Не PII-чувствительно — email уже хранится в leads, messages,
 * saved_searches. Лог поиска — тот же класс данных.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE search_queries
      ADD COLUMN IF NOT EXISTS user_email VARCHAR;
    CREATE INDEX IF NOT EXISTS search_queries_user_email_idx
      ON search_queries (user_email)
      WHERE user_email IS NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE search_queries DROP COLUMN IF EXISTS user_email;
  `)
}
