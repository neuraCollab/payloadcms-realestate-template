import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * payload-kv — built-in key/value collection Payload 3.87 registers
 * automatically (see payload/dist/kv/adapters/DatabaseKVAdapter.js),
 * used internally for caching. It was never part of a hand-written
 * migration, so the table doesn't exist even though Payload's schema
 * (and any code path that reads/writes through payload.db for the
 * 'payload-kv' collection) expects it.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "payload_kv" (
      "id" serial PRIMARY KEY NOT NULL,
      "key" varchar NOT NULL,
      "data" jsonb NOT NULL
    );

    CREATE UNIQUE INDEX IF NOT EXISTS "payload_kv_key_idx" ON "payload_kv" ("key");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "payload_kv" CASCADE;
  `)
}
