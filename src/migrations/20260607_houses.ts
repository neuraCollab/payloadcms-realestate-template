import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Коллекция houses — частные дома, коттеджи, таунхаусы, дачи.
 *
 * Структура близка к flats, но с house-specific полями:
 *   • bedrooms / bathrooms / floors вместо rooms
 *   • area_land (участок земли)
 *   • house_type enum
 *   • material enum
 *   • amenities — расширенный enum (баня, бассейн, газ и т.п.)
 *
 * UGC-поля (contact_email/submitted_at/moderation_note) сразу
 * включены — для кабинетной публикации.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_houses_house_type" AS ENUM('cottage', 'townhouse', 'dacha', 'detached');
    CREATE TYPE "public"."enum_houses_transaction_type" AS ENUM('sale', 'rent', 'daily');
    CREATE TYPE "public"."enum_houses_currency" AS ENUM('RUB', 'USD', 'EUR');
    CREATE TYPE "public"."enum_houses_material" AS ENUM('brick', 'wood', 'frame', 'aerocrete', 'monolithic');
    CREATE TYPE "public"."enum_houses_status" AS ENUM('active', 'sold', 'unpublished', 'draft', 'pending_review');
    CREATE TYPE "public"."enum_houses_amenities_amenity" AS ENUM(
      'garage', 'sauna', 'pool', 'gas', 'water', 'sewage',
      'electricity', 'fireplace', 'terrace', 'fenced'
    );

    CREATE TABLE "houses" (
      "id"                            SERIAL PRIMARY KEY NOT NULL,
      "title"                         VARCHAR NOT NULL,
      "slug"                          VARCHAR NOT NULL,
      "realtor_id"                    INTEGER,
      "house_type"                    "enum_houses_house_type" DEFAULT 'cottage',
      "transaction_type"              "enum_houses_transaction_type" NOT NULL,
      "location_city"                 VARCHAR NOT NULL,
      "location_district"             VARCHAR NOT NULL,
      "location_address"              VARCHAR NOT NULL,
      "coordinates_lat"               NUMERIC,
      "coordinates_lng"               NUMERIC,
      "coordinates_formatted_address" VARCHAR,
      "bedrooms"                      NUMERIC,
      "bathrooms"                     NUMERIC,
      "floors"                        NUMERIC DEFAULT 1,
      "area_total"                    NUMERIC NOT NULL,
      "area_land"                     NUMERIC,
      "price"                         NUMERIC NOT NULL,
      "currency"                      "enum_houses_currency" DEFAULT 'RUB',
      "material"                      "enum_houses_material",
      "year_built"                    NUMERIC,
      "description"                   JSONB,
      "status"                        "enum_houses_status" DEFAULT 'active',
      "is_featured"                   BOOLEAN DEFAULT false,
      "from_owner"                    BOOLEAN DEFAULT false,
      "no_commission"                 BOOLEAN DEFAULT false,
      "contact_email"                 VARCHAR,
      "submitted_at"                  TIMESTAMP(3) WITH TIME ZONE,
      "moderation_note"               VARCHAR,
      "updated_at"                    TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL,
      "created_at"                    TIMESTAMP(3) WITH TIME ZONE DEFAULT now() NOT NULL
    );

    CREATE TABLE "houses_images" (
      "_order"     INTEGER NOT NULL,
      "_parent_id" INTEGER NOT NULL,
      "id"         VARCHAR PRIMARY KEY NOT NULL,
      "image_id"   INTEGER NOT NULL,
      "alt"        VARCHAR
    );

    CREATE TABLE "houses_amenities" (
      "_order"     INTEGER NOT NULL,
      "_parent_id" INTEGER NOT NULL,
      "id"         VARCHAR PRIMARY KEY NOT NULL,
      "amenity"    "enum_houses_amenities_amenity"
    );

    -- FK + индексы на houses.
    ALTER TABLE "houses"
      ADD CONSTRAINT "houses_realtor_id_users_id_fk"
      FOREIGN KEY ("realtor_id") REFERENCES "public"."users"("id")
      ON DELETE SET NULL ON UPDATE no action;

    CREATE UNIQUE INDEX "houses_slug_idx" ON "houses" ("slug");
    CREATE INDEX "houses_realtor_idx" ON "houses" ("realtor_id");
    CREATE INDEX "houses_status_idx" ON "houses" ("status");
    CREATE INDEX "houses_transaction_type_idx" ON "houses" ("transaction_type");
    CREATE INDEX "houses_location_city_idx" ON "houses" ("location_city");
    CREATE INDEX "houses_price_idx" ON "houses" ("price");
    CREATE INDEX "houses_contact_email_idx" ON "houses" ("contact_email");
    CREATE INDEX "houses_created_at_idx" ON "houses" ("created_at");
    CREATE INDEX "houses_updated_at_idx" ON "houses" ("updated_at");

    -- FK на дочерние таблицы.
    ALTER TABLE "houses_images"
      ADD CONSTRAINT "houses_images_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."houses"("id")
      ON DELETE cascade ON UPDATE no action;
    ALTER TABLE "houses_images"
      ADD CONSTRAINT "houses_images_image_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id")
      ON DELETE SET NULL ON UPDATE no action;
    CREATE INDEX "houses_images_order_idx" ON "houses_images" ("_order");
    CREATE INDEX "houses_images_parent_id_idx" ON "houses_images" ("_parent_id");

    ALTER TABLE "houses_amenities"
      ADD CONSTRAINT "houses_amenities_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."houses"("id")
      ON DELETE cascade ON UPDATE no action;
    CREATE INDEX "houses_amenities_order_idx" ON "houses_amenities" ("_order");
    CREATE INDEX "houses_amenities_parent_id_idx" ON "houses_amenities" ("_parent_id");
  `)

  // payload_locked_documents_rels — best-effort.
  try {
    await db.execute(sql`
      ALTER TABLE "payload_locked_documents_rels"
        ADD COLUMN IF NOT EXISTS "houses_id" integer;
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_houses_fk"
        FOREIGN KEY ("houses_id") REFERENCES "public"."houses"("id")
        ON DELETE cascade ON UPDATE no action;
    `)
  } catch {
    /* ok */
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "houses_amenities" CASCADE;
    DROP TABLE IF EXISTS "houses_images" CASCADE;
    DROP TABLE IF EXISTS "houses" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_houses_house_type";
    DROP TYPE IF EXISTS "public"."enum_houses_transaction_type";
    DROP TYPE IF EXISTS "public"."enum_houses_currency";
    DROP TYPE IF EXISTS "public"."enum_houses_material";
    DROP TYPE IF EXISTS "public"."enum_houses_status";
    DROP TYPE IF EXISTS "public"."enum_houses_amenities_amenity";
  `)
}
