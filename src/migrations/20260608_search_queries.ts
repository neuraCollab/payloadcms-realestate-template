import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * search_queries — лог поисковых запросов из AI-search (Hero на
 * главной + /search). Используется только для агрегата «популярные
 * запросы» и автодополнения в Hero.
 *
 * query — оригинальный текст запроса как ввёл пользователь.
 * query_lower — lower-cased для группировки case-insensitive.
 *
 * Не PII: запрос не содержит email/телефон. На всякий случай
 * валидируем длину при insert.
 *
 * Index создаём pg_trgm-friendly для prefix-поиска через LIKE и
 * btree на query_lower для GROUP BY top-N.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    CREATE TABLE "search_queries" (
      "id"             SERIAL PRIMARY KEY,
      "query"          VARCHAR NOT NULL,
      "query_lower"    VARCHAR NOT NULL,
      "city"           VARCHAR,
      "results_count"  NUMERIC,
      "created_at"     TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL
    );

    -- Для GROUP BY query_lower COUNT(*) — btree подходит.
    CREATE INDEX "search_queries_lower_idx" ON "search_queries" ("query_lower");
    -- Для фильтра «за последние N дней».
    CREATE INDEX "search_queries_created_at_idx" ON "search_queries" ("created_at" DESC);
    -- Для префиксного match через LIKE 'абв%' (часто быстрее чем без индекса).
    CREATE INDEX "search_queries_lower_trgm_idx" ON "search_queries"
      USING gin ("query_lower" gin_trgm_ops);
  `)

  // Seed — стартовая выборка популярных запросов (cold-start).
  // Сразу даёт пользователю «топ» при пустом инпуте, пока реальной
  // статистики нет. После накопления реальных данных эти точки будут
  // вытеснены живыми запросами.
  const seedQueries = [
    '2 комнатная квартира в Москве',
    '1 комнатная квартира в Москве',
    'студия в Москве',
    'снять квартиру посуточно в Москве',
    'снять квартиру в СПб',
    'квартира у метро',
    'купить квартиру в Москве',
    'квартира с балконом',
    'квартира с ремонтом',
    'квартира до 10 млн',
    'квартира в новостройке',
    'дом в Подмосковье',
    'участок ИЖС',
    'офис в аренду в Москве',
    'квартира от собственника без комиссии',
    'квартира с панорамными окнами',
  ]

  for (const q of seedQueries) {
    await db.execute(sql`
      INSERT INTO search_queries (query, query_lower)
      VALUES (${q}, ${q.toLowerCase()})
    `)
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`DROP TABLE IF EXISTS "search_queries";`)
  // pg_trgm extension не дропаем — могут использовать другие.
}
