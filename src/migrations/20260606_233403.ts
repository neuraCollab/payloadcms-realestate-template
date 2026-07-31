import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "home_seo_seo_blocks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"cta_label" varchar DEFAULT 'Смотреть объекты',
  	"cta_href" varchar NOT NULL,
  	"highlight_keywords" varchar
  );
  
  CREATE TABLE "home_seo_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "home_seo" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar DEFAULT 'Demo Realty — квартиры, дома и коммерческая недвижимость' NOT NULL,
  	"meta_description" varchar DEFAULT 'Поиск квартир, домов и коммерческой недвижимости. Проверенные объявления, прозрачные сделки, прямые контакты с собственниками.' NOT NULL,
  	"h1" varchar DEFAULT 'Недвижимость, которой доверяют' NOT NULL,
  	"subtitle" varchar DEFAULT 'Прозрачные сделки, проверенные объявления, удобный кабинет.',
  	"faq_intro" varchar DEFAULT 'Частые вопросы',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "home_seo_seo_blocks" ADD CONSTRAINT "home_seo_seo_blocks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_seo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_seo_faq" ADD CONSTRAINT "home_seo_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_seo"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_seo_seo_blocks_order_idx" ON "home_seo_seo_blocks" USING btree ("_order");
  CREATE INDEX "home_seo_seo_blocks_parent_id_idx" ON "home_seo_seo_blocks" USING btree ("_parent_id");
  CREATE INDEX "home_seo_faq_order_idx" ON "home_seo_faq" USING btree ("_order");
  CREATE INDEX "home_seo_faq_parent_id_idx" ON "home_seo_faq" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "home_seo_seo_blocks" CASCADE;
  DROP TABLE "home_seo_faq" CASCADE;
  DROP TABLE "home_seo" CASCADE;`)
}
