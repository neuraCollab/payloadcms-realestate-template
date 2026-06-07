import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Коллекция Leads — лид-форма «Заказать звонок» / TG / WhatsApp / IG.
 *
 * Полиморфная привязка к объекту через два text-поля (collection + id)
 * вместо Payload polymorphic rel — упрощает миграцию и админку.
 *
 * payload_locked_documents_rels и relationships для users.realtor
 * следуют стандартному паттерну Payload v3.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_leads_channel" AS ENUM('callback', 'telegram', 'whatsapp', 'instagram');
    CREATE TYPE "public"."enum_leads_status" AS ENUM('new', 'contacted', 'qualified', 'won', 'lost');

    CREATE TABLE "leads" (
      "id" serial PRIMARY KEY NOT NULL,
      "phone" varchar NOT NULL,
      "name" varchar,
      "channel" "enum_leads_channel" DEFAULT 'callback',
      "contact_handle" varchar,
      "message" varchar,
      "property_collection" varchar,
      "property_id" varchar,
      "property_title" varchar,
      "realtor_id" integer,
      "status" "enum_leads_status" DEFAULT 'new',
      "utm_source" varchar,
      "utm_campaign" varchar,
      "page_url" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    ALTER TABLE "leads"
      ADD CONSTRAINT "leads_realtor_id_users_id_fk"
      FOREIGN KEY ("realtor_id") REFERENCES "public"."users"("id")
      ON DELETE SET NULL ON UPDATE no action;

    CREATE INDEX "leads_realtor_idx" ON "leads" ("realtor_id");
    CREATE INDEX "leads_status_idx" ON "leads" ("status");
    CREATE INDEX "leads_created_at_idx" ON "leads" ("created_at" DESC);
    CREATE INDEX "leads_channel_idx" ON "leads" ("channel");
  `)

  // payload_locked_documents_rels — таблица связей для админских
  // блокировок документа. Если её ещё нет — это нормально, добавим
  // FK только если она есть и в неё уже встроены такие связи для
  // других коллекций. Не критично для работы лидов.
  try {
    await db.execute(sql`
      ALTER TABLE "payload_locked_documents_rels"
        ADD COLUMN IF NOT EXISTS "leads_id" integer;
      ALTER TABLE "payload_locked_documents_rels"
        ADD CONSTRAINT "payload_locked_documents_rels_leads_fk"
        FOREIGN KEY ("leads_id") REFERENCES "public"."leads"("id")
        ON DELETE cascade ON UPDATE no action;
      CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_leads_id_idx"
        ON "payload_locked_documents_rels" ("leads_id");
    `)
  } catch {
    /* таблица или ограничение уже есть — игнорируем */
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "leads" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_leads_channel";
    DROP TYPE IF EXISTS "public"."enum_leads_status";
  `)
}
