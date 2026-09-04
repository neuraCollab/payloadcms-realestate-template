import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Removes the `properties` collection and its dependents.
 *
 * `properties` was an unadapted starter-template scaffold: a generic
 * demo listing type (title/address/bedrooms/bathrooms/type: sale|rent)
 * that predates this app's real domain model (flats / commercial /
 * lands / residential-complexes / houses). It had zero reachable
 * frontend route, zero write path, and its only consumers were three
 * page-builder Blocks (PropertyFeaturesBlock, PropertyGalleryBlock,
 * PropertyHeroBlock) that were themselves never imported anywhere —
 * PropertyFeaturesBlock was even selectable in the Pages admin builder
 * while being absent from RenderBlocks.tsx, so picking it silently
 * rendered nothing. See src/collections/ removal in the same commit.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "pages_blocks_property_features" CASCADE;
    DROP TABLE IF EXISTS "_pages_v_blocks_property_features" CASCADE;

    ALTER TABLE "pages_rels" DROP COLUMN IF EXISTS "properties_id";
    ALTER TABLE "_pages_v_rels" DROP COLUMN IF EXISTS "properties_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "properties_id";

    DROP TABLE IF EXISTS "properties_features" CASCADE;
    DROP TABLE IF EXISTS "properties_images" CASCADE;
    DROP TABLE IF EXISTS "properties" CASCADE;

    DROP TYPE IF EXISTS "public"."enum_properties_type";
    DROP TYPE IF EXISTS "public"."enum_properties_status";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_properties_type" AS ENUM('sale', 'rent');
    CREATE TYPE "public"."enum_properties_status" AS ENUM('active', 'sold', 'draft');

    CREATE TABLE "properties" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "address" varchar NOT NULL,
      "coordinates_lat" numeric,
      "coordinates_lng" numeric,
      "coordinates_address" varchar,
      "price" numeric NOT NULL,
      "type" "enum_properties_type" NOT NULL,
      "bedrooms" numeric NOT NULL,
      "bathrooms" numeric NOT NULL,
      "area" numeric NOT NULL,
      "description" jsonb,
      "status" "enum_properties_status" DEFAULT 'active',
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    CREATE UNIQUE INDEX "properties_slug_idx" ON "properties" ("slug");
    CREATE INDEX "properties_created_at_idx" ON "properties" ("created_at");
    CREATE INDEX "properties_updated_at_idx" ON "properties" ("updated_at");

    CREATE TABLE "properties_features" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "feature" varchar NOT NULL
    );
    CREATE INDEX "properties_features_order_idx" ON "properties_features" ("_order");
    CREATE INDEX "properties_features_parent_id_idx" ON "properties_features" ("_parent_id");
    ALTER TABLE "properties_features" ADD CONSTRAINT "properties_features_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."properties"("id") ON DELETE cascade;

    CREATE TABLE "properties_images" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer NOT NULL
    );
    CREATE INDEX "properties_images_order_idx" ON "properties_images" ("_order");
    CREATE INDEX "properties_images_parent_id_idx" ON "properties_images" ("_parent_id");
    CREATE INDEX "properties_images_image_idx" ON "properties_images" ("image_id");
    ALTER TABLE "properties_images" ADD CONSTRAINT "properties_images_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."properties"("id") ON DELETE cascade;
    ALTER TABLE "properties_images" ADD CONSTRAINT "properties_images_image_id_media_id_fk"
      FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null;

    ALTER TABLE "pages_rels" ADD COLUMN IF NOT EXISTS "properties_id" integer;
    ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_properties_fk"
      FOREIGN KEY ("properties_id") REFERENCES "public"."properties"("id") ON DELETE cascade;
    ALTER TABLE "_pages_v_rels" ADD COLUMN IF NOT EXISTS "properties_id" integer;
    ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_properties_fk"
      FOREIGN KEY ("properties_id") REFERENCES "public"."properties"("id") ON DELETE cascade;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "properties_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_properties_fk"
      FOREIGN KEY ("properties_id") REFERENCES "public"."properties"("id") ON DELETE cascade;

    CREATE TABLE "pages_blocks_property_features" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "block_type" varchar DEFAULT 'property-features',
      "property_id" integer,
      "block_name" varchar
    );
    CREATE INDEX "pages_blocks_property_features_order_idx" ON "pages_blocks_property_features" ("_order");
    CREATE INDEX "pages_blocks_property_features_parent_id_idx" ON "pages_blocks_property_features" ("_parent_id");
    CREATE INDEX "pages_blocks_property_features_path_idx" ON "pages_blocks_property_features" ("_path");
    CREATE INDEX "pages_blocks_property_features_property_idx" ON "pages_blocks_property_features" ("property_id");
    ALTER TABLE "pages_blocks_property_features" ADD CONSTRAINT "pages_blocks_property_features_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade;
    ALTER TABLE "pages_blocks_property_features" ADD CONSTRAINT "pages_blocks_property_features_property_id_properties_id_fk"
      FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE set null;

    CREATE TABLE "_pages_v_blocks_property_features" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "block_type" varchar DEFAULT 'property-features',
      "property_id" integer,
      "_uuid" varchar,
      "block_name" varchar
    );
    CREATE INDEX "_pages_v_blocks_property_features_order_idx" ON "_pages_v_blocks_property_features" ("_order");
    CREATE INDEX "_pages_v_blocks_property_features_parent_id_idx" ON "_pages_v_blocks_property_features" ("_parent_id");
    CREATE INDEX "_pages_v_blocks_property_features_path_idx" ON "_pages_v_blocks_property_features" ("_path");
    CREATE INDEX "_pages_v_blocks_property_features_property_idx" ON "_pages_v_blocks_property_features" ("property_id");
    ALTER TABLE "_pages_v_blocks_property_features" ADD CONSTRAINT "_pages_v_blocks_property_features_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade;
    ALTER TABLE "_pages_v_blocks_property_features" ADD CONSTRAINT "_pages_v_blocks_property_features_property_id_properties_id_fk"
      FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE set null;
  `)
}
