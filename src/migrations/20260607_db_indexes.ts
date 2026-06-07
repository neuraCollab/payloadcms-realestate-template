import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Индексы на горячие пути запросов.
 *
 * Payload v3 + postgres-adapter автоматически создаёт индексы только
 * на slug (unique), created_at, updated_at и FK-колонки. Поля типа
 * status, transaction_type, location_city, rooms, price — без индексов,
 * хотя именно по ним идут все каталожные WHERE/ORDER BY.
 *
 * При 40 объектах sequential scan быстрый. При 4000+ — каталог
 * с фильтрами проседает до секунд. Индексы выпрямляют это.
 *
 * Композитный (status, transaction_type, location_city) специально
 * под самый частый запрос: «активные квартиры на продажу в Москве».
 *
 * CONCURRENTLY НЕ используется — в Payload-миграциях DDL внутри
 * транзакции, для CONCURRENTLY нужна отдельная сессия. На сотнях/
 * тысячах строк обычный CREATE INDEX отрабатывает за миллисекунды;
 * на десятках тысяч короткий lock приемлем.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // --- flats: самая активно-запрашиваемая коллекция ---
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS flats_status_idx
      ON flats (status);
    CREATE INDEX IF NOT EXISTS flats_transaction_type_idx
      ON flats (transaction_type);
    CREATE INDEX IF NOT EXISTS flats_property_category_idx
      ON flats (property_category);
    CREATE INDEX IF NOT EXISTS flats_location_city_idx
      ON flats (location_city);
    CREATE INDEX IF NOT EXISTS flats_rooms_idx
      ON flats (rooms);
    CREATE INDEX IF NOT EXISTS flats_price_idx
      ON flats (price);
    CREATE INDEX IF NOT EXISTS flats_is_featured_idx
      ON flats (is_featured) WHERE is_featured = true;
    CREATE INDEX IF NOT EXISTS flats_from_owner_idx
      ON flats (from_owner) WHERE from_owner = true;
    -- Composite под главный каталожный запрос
    CREATE INDEX IF NOT EXISTS flats_status_tx_city_idx
      ON flats (status, transaction_type, location_city);
  `)

  // --- commercial ---
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS commercial_status_idx
      ON commercial (status);
    CREATE INDEX IF NOT EXISTS commercial_transaction_type_idx
      ON commercial (transaction_type);
    CREATE INDEX IF NOT EXISTS commercial_location_city_idx
      ON commercial (location_city);
    CREATE INDEX IF NOT EXISTS commercial_price_idx
      ON commercial (price);
  `)

  // --- lands (нет transaction_type — у участков покупка/продажа
  // только; rental_subtype отсутствует) ---
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS lands_status_idx
      ON lands (status);
    CREATE INDEX IF NOT EXISTS lands_location_city_idx
      ON lands (location_city);
    CREATE INDEX IF NOT EXISTS lands_price_idx
      ON lands (price);
  `)

  // --- residential_complexes (status здесь planning/built, не active) ---
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS residential_complexes_location_city_idx
      ON residential_complexes (location_city);
    CREATE INDEX IF NOT EXISTS residential_complexes_status_idx
      ON residential_complexes (status);
  `)

  // --- users: фильтр /agents «role=realtor + slug» ---
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS users_role_idx
      ON users (role);
  `)

  // --- reviews: на детальной риэлтора SELECT по (realtor, status) ---
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS reviews_realtor_status_idx
      ON reviews (realtor_id, status);
  `)

  // --- cities: активные города по slug ---
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS cities_is_active_idx
      ON cities (is_active) WHERE is_active = true;
  `)

  // --- posts: archive фильтрует по status='published' ---
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS posts_status_idx
      ON posts (status);
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS flats_status_idx;
    DROP INDEX IF EXISTS flats_transaction_type_idx;
    DROP INDEX IF EXISTS flats_property_category_idx;
    DROP INDEX IF EXISTS flats_location_city_idx;
    DROP INDEX IF EXISTS flats_rooms_idx;
    DROP INDEX IF EXISTS flats_price_idx;
    DROP INDEX IF EXISTS flats_is_featured_idx;
    DROP INDEX IF EXISTS flats_from_owner_idx;
    DROP INDEX IF EXISTS flats_status_tx_city_idx;
    DROP INDEX IF EXISTS commercial_status_idx;
    DROP INDEX IF EXISTS commercial_transaction_type_idx;
    DROP INDEX IF EXISTS commercial_location_city_idx;
    DROP INDEX IF EXISTS commercial_price_idx;
    DROP INDEX IF EXISTS lands_status_idx;
    DROP INDEX IF EXISTS lands_location_city_idx;
    DROP INDEX IF EXISTS lands_price_idx;
    DROP INDEX IF EXISTS residential_complexes_location_city_idx;
    DROP INDEX IF EXISTS residential_complexes_status_idx;
    DROP INDEX IF EXISTS users_role_idx;
    DROP INDEX IF EXISTS reviews_realtor_status_idx;
    DROP INDEX IF EXISTS cities_is_active_idx;
    DROP INDEX IF EXISTS posts_status_idx;
  `)
}
