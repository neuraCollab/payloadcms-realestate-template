import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Lands status enum изначально был ['active', 'sold', 'unpublished'].
 * UGC-поток требует 'draft' (как у flats/commercial/houses).
 * 'pending_review' уже добавлен в 20260607_cabinet_listings.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      ALTER TYPE enum_lands_status ADD VALUE IF NOT EXISTS 'draft';
    EXCEPTION WHEN duplicate_object THEN NULL;
    END $$;
  `)
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // postgres не умеет удалять enum values
}
