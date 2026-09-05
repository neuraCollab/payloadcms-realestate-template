import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_archive_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_form_block_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_navbar_links_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_navbar_locales" (
  	"logo_text" varchar,
  	"button_text" varchar DEFAULT 'Связаться',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_locales" (
  	"badge_text" varchar,
  	"headline" varchar,
  	"highlight" varchar,
  	"subheadline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vision_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vision_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_properties_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_features_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_feature_locales" (
  	"label" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_how_it_works_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_how_it_works_locales" (
  	"label" varchar DEFAULT 'How it works',
  	"title" varchar DEFAULT 'Discover the advantages and exclusive benefits',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_blog_locales" (
  	"title" varchar DEFAULT 'Expert advice and market updates on real estate',
  	"subtitle" varchar DEFAULT 'Blogs',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_about_hero_locales" (
  	"label" varchar DEFAULT 'About us',
  	"title" varchar DEFAULT 'Connect with our experts and bring your Real Estate ideas to life',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vision_mission_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_vision_mission_locales" (
  	"title" varchar DEFAULT 'Your trusted real estate experts:',
  	"description" varchar DEFAULT 'With years of local expertise, we''re committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client''s unique needs are met with professionalism and care.',
  	"button_text" varchar DEFAULT 'View Properties',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_amenities_amenities_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_amenities_locales" (
  	"label" varchar DEFAULT 'Amenities',
  	"title" varchar DEFAULT 'Discover exceptional amenities for a luxurious lifestyle',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_agents_locales" (
  	"label" varchar DEFAULT 'Agents',
  	"title" varchar DEFAULT 'Meet our exceptional agents for a seamless experience',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_testimonials_locales" (
  	"label" varchar DEFAULT 'Testimonials',
  	"title" varchar DEFAULT 'Real feedback from our satisfied clients',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_call_to_action_new_locales" (
  	"label" varchar DEFAULT 'Want to Book a Call?',
  	"title" varchar DEFAULT 'Ready to make your step in real estate? Book Now.',
  	"button_text" varchar DEFAULT 'View Properties',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_hero_locales" (
  	"label" varchar DEFAULT 'Contact',
  	"title" varchar DEFAULT 'Get in touch with us today for expert assistance',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_contact_us_form_locales" (
  	"label" varchar DEFAULT 'Contact',
  	"title" varchar DEFAULT 'Fill out this form, Let''s get in touch',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_faq_locales" (
  	"label" varchar DEFAULT 'faq',
  	"title" varchar DEFAULT 'Your questions, Answered',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_house_filter_filters_fields_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_house_filter_filters_fields_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_house_filter_filters_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_map_locales" (
  	"title" varchar,
  	"office_marker_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_quick_nav_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_quick_nav_locales" (
  	"label" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_hero_search_locales" (
  	"badge" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_recently_viewed_locales" (
  	"title" varchar DEFAULT 'Недавно вы смотрели',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar,
  	"hero_rich_text" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_version_hero_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_links_locales" (
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_archive_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_form_block_locales" (
  	"intro_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_navbar_links_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_navbar_locales" (
  	"logo_text" varchar,
  	"button_text" varchar DEFAULT 'Связаться',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_locales" (
  	"badge_text" varchar,
  	"headline" varchar,
  	"highlight" varchar,
  	"subheadline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_vision_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_vision_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"button_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_properties_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_features_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_feature_locales" (
  	"label" varchar,
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_steps_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_how_it_works_locales" (
  	"label" varchar DEFAULT 'How it works',
  	"title" varchar DEFAULT 'Discover the advantages and exclusive benefits',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_blog_locales" (
  	"title" varchar DEFAULT 'Expert advice and market updates on real estate',
  	"subtitle" varchar DEFAULT 'Blogs',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_about_hero_locales" (
  	"label" varchar DEFAULT 'About us',
  	"title" varchar DEFAULT 'Connect with our experts and bring your Real Estate ideas to life',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_vision_mission_stats_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_vision_mission_locales" (
  	"title" varchar DEFAULT 'Your trusted real estate experts:',
  	"description" varchar DEFAULT 'With years of local expertise, we''re committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client''s unique needs are met with professionalism and care.',
  	"button_text" varchar DEFAULT 'View Properties',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_amenities_amenities_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_amenities_locales" (
  	"label" varchar DEFAULT 'Amenities',
  	"title" varchar DEFAULT 'Discover exceptional amenities for a luxurious lifestyle',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_agents_locales" (
  	"label" varchar DEFAULT 'Agents',
  	"title" varchar DEFAULT 'Meet our exceptional agents for a seamless experience',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_testimonials_locales" (
  	"label" varchar DEFAULT 'Testimonials',
  	"title" varchar DEFAULT 'Real feedback from our satisfied clients',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_call_to_action_new_locales" (
  	"label" varchar DEFAULT 'Want to Book a Call?',
  	"title" varchar DEFAULT 'Ready to make your step in real estate? Book Now.',
  	"button_text" varchar DEFAULT 'View Properties',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_hero_locales" (
  	"label" varchar DEFAULT 'Contact',
  	"title" varchar DEFAULT 'Get in touch with us today for expert assistance',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_contact_us_form_locales" (
  	"label" varchar DEFAULT 'Contact',
  	"title" varchar DEFAULT 'Fill out this form, Let''s get in touch',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_faq_locales" (
  	"label" varchar DEFAULT 'faq',
  	"title" varchar DEFAULT 'Your questions, Answered',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_house_filter_filters_fields_options_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_house_filter_filters_fields_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_house_filter_filters_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_map_locales" (
  	"title" varchar,
  	"office_marker_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_quick_nav_items_locales" (
  	"title" varchar,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_quick_nav_locales" (
  	"label" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_hero_search_locales" (
  	"badge" varchar,
  	"headline" varchar,
  	"subheadline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_recently_viewed_locales" (
  	"title" varchar DEFAULT 'Недавно вы смотрели',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_locales" (
  	"version_title" varchar,
  	"version_hero_rich_text" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "agents_locales" (
  	"position" varchar NOT NULL,
  	"description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "flats_amenities_locales" (
  	"amenity" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "flats_locales" (
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "houses_locales" (
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "residential_complexes_infrastructure_locales" (
  	"item" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "residential_complexes_locales" (
  	"name" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "commercial_utilities_locales" (
  	"utility" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "commercial_locales" (
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "lands_communications_locales" (
  	"communication" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "lands_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "header_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_nav_items_locales" (
  	"link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_seo_seo_blocks_locales" (
  	"heading" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"cta_label" varchar DEFAULT 'Смотреть объекты',
  	"highlight_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_seo_faq_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "home_seo_locales" (
  	"meta_title" varchar DEFAULT 'Demo Realty — квартиры, дома и коммерческая недвижимость' NOT NULL,
  	"meta_description" varchar DEFAULT 'Поиск квартир, домов и коммерческой недвижимости. Проверенные объявления, прозрачные сделки, прямые контакты с собственниками.' NOT NULL,
  	"h1" varchar DEFAULT 'Недвижимость, которой доверяют' NOT NULL,
  	"subtitle" varchar DEFAULT 'Прозрачные сделки, проверенные объявления, удобный кабинет.',
  	"faq_intro" varchar DEFAULT 'Частые вопросы',
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages" DROP CONSTRAINT "pages_meta_image_id_media_id_fk";
  
  ALTER TABLE "_pages_v" DROP CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk";
  
  ALTER TABLE "posts" DROP CONSTRAINT "posts_meta_image_id_media_id_fk";
  
  DROP INDEX "pages_meta_meta_image_idx";
  DROP INDEX "_pages_v_version_meta_version_meta_image_idx";
  DROP INDEX "posts_meta_meta_image_idx";
  ALTER TABLE "pages_hero_links_locales" ADD CONSTRAINT "pages_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_links_locales" ADD CONSTRAINT "pages_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_columns_locales" ADD CONSTRAINT "pages_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_archive_locales" ADD CONSTRAINT "pages_blocks_archive_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_archive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_form_block_locales" ADD CONSTRAINT "pages_blocks_form_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navbar_links_locales" ADD CONSTRAINT "pages_blocks_navbar_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_navbar_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_navbar_locales" ADD CONSTRAINT "pages_blocks_navbar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_locales" ADD CONSTRAINT "pages_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vision_items_locales" ADD CONSTRAINT "pages_blocks_vision_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vision_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vision_locales" ADD CONSTRAINT "pages_blocks_vision_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vision"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_properties_locales" ADD CONSTRAINT "pages_blocks_properties_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_features_locales" ADD CONSTRAINT "pages_blocks_feature_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_locales" ADD CONSTRAINT "pages_blocks_feature_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_steps_locales" ADD CONSTRAINT "pages_blocks_how_it_works_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_how_it_works_locales" ADD CONSTRAINT "pages_blocks_how_it_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_blog_locales" ADD CONSTRAINT "pages_blocks_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_about_hero_locales" ADD CONSTRAINT "pages_blocks_about_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vision_mission_stats_locales" ADD CONSTRAINT "pages_blocks_vision_mission_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vision_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_vision_mission_locales" ADD CONSTRAINT "pages_blocks_vision_mission_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_vision_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_amenities_amenities_locales" ADD CONSTRAINT "pages_blocks_amenities_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amenities_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_amenities_locales" ADD CONSTRAINT "pages_blocks_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_agents_locales" ADD CONSTRAINT "pages_blocks_agents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_agents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_testimonials_locales" ADD CONSTRAINT "pages_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_call_to_action_new_locales" ADD CONSTRAINT "pages_blocks_call_to_action_new_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_call_to_action_new"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_hero_locales" ADD CONSTRAINT "pages_blocks_contact_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_contact_us_form_locales" ADD CONSTRAINT "pages_blocks_contact_us_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_contact_us_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_items_locales" ADD CONSTRAINT "pages_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_faq_locales" ADD CONSTRAINT "pages_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_house_filter_filters_fields_options_locales" ADD CONSTRAINT "pages_blocks_house_filter_filters_fields_options_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_house_filter_filters_fields_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_house_filter_filters_fields_locales" ADD CONSTRAINT "pages_blocks_house_filter_filters_fields_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_house_filter_filters_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_house_filter_filters_locales" ADD CONSTRAINT "pages_blocks_house_filter_filters_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_house_filter_filters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_map_locales" ADD CONSTRAINT "pages_blocks_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quick_nav_items_locales" ADD CONSTRAINT "pages_blocks_quick_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_quick_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_quick_nav_locales" ADD CONSTRAINT "pages_blocks_quick_nav_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_quick_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_search_locales" ADD CONSTRAINT "pages_blocks_hero_search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero_search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_recently_viewed_locales" ADD CONSTRAINT "pages_blocks_recently_viewed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_recently_viewed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_version_hero_links_locales" ADD CONSTRAINT "_pages_v_version_hero_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_version_hero_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_links_locales" ADD CONSTRAINT "_pages_v_blocks_cta_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_locales" ADD CONSTRAINT "_pages_v_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive_locales" ADD CONSTRAINT "_pages_v_blocks_archive_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_archive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_form_block_locales" ADD CONSTRAINT "_pages_v_blocks_form_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_form_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navbar_links_locales" ADD CONSTRAINT "_pages_v_blocks_navbar_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_navbar_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_navbar_locales" ADD CONSTRAINT "_pages_v_blocks_navbar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_navbar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_locales" ADD CONSTRAINT "_pages_v_blocks_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vision_items_locales" ADD CONSTRAINT "_pages_v_blocks_vision_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vision_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vision_locales" ADD CONSTRAINT "_pages_v_blocks_vision_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vision"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_properties_locales" ADD CONSTRAINT "_pages_v_blocks_properties_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_properties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_features_locales" ADD CONSTRAINT "_pages_v_blocks_feature_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_locales" ADD CONSTRAINT "_pages_v_blocks_feature_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps_locales" ADD CONSTRAINT "_pages_v_blocks_how_it_works_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_how_it_works_locales" ADD CONSTRAINT "_pages_v_blocks_how_it_works_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_how_it_works"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_blog_locales" ADD CONSTRAINT "_pages_v_blocks_blog_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_blog"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_about_hero_locales" ADD CONSTRAINT "_pages_v_blocks_about_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_about_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vision_mission_stats_locales" ADD CONSTRAINT "_pages_v_blocks_vision_mission_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vision_mission_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_vision_mission_locales" ADD CONSTRAINT "_pages_v_blocks_vision_mission_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_vision_mission"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_amenities_amenities_locales" ADD CONSTRAINT "_pages_v_blocks_amenities_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_amenities_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_amenities_locales" ADD CONSTRAINT "_pages_v_blocks_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_agents_locales" ADD CONSTRAINT "_pages_v_blocks_agents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_agents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" ADD CONSTRAINT "_pages_v_blocks_testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_call_to_action_new_locales" ADD CONSTRAINT "_pages_v_blocks_call_to_action_new_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_call_to_action_new"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_hero_locales" ADD CONSTRAINT "_pages_v_blocks_contact_hero_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_contact_us_form_locales" ADD CONSTRAINT "_pages_v_blocks_contact_us_form_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_contact_us_form"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" ADD CONSTRAINT "_pages_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_faq_locales" ADD CONSTRAINT "_pages_v_blocks_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_house_filter_filters_fields_options_locales" ADD CONSTRAINT "_pages_v_blocks_house_filter_filters_fields_options_local_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_house_filter_filters_fields_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_house_filter_filters_fields_locales" ADD CONSTRAINT "_pages_v_blocks_house_filter_filters_fields_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_house_filter_filters_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_house_filter_filters_locales" ADD CONSTRAINT "_pages_v_blocks_house_filter_filters_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_house_filter_filters"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_map_locales" ADD CONSTRAINT "_pages_v_blocks_map_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_map"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quick_nav_items_locales" ADD CONSTRAINT "_pages_v_blocks_quick_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_quick_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_quick_nav_locales" ADD CONSTRAINT "_pages_v_blocks_quick_nav_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_quick_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_search_locales" ADD CONSTRAINT "_pages_v_blocks_hero_search_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero_search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_recently_viewed_locales" ADD CONSTRAINT "_pages_v_blocks_recently_viewed_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_recently_viewed"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_locales" ADD CONSTRAINT "_pages_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "agents_locales" ADD CONSTRAINT "agents_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."agents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_locales" ADD CONSTRAINT "testimonials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flats_amenities_locales" ADD CONSTRAINT "flats_amenities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."flats_amenities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "flats_locales" ADD CONSTRAINT "flats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."flats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "houses_locales" ADD CONSTRAINT "houses_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."houses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "residential_complexes_infrastructure_locales" ADD CONSTRAINT "residential_complexes_infrastructure_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."residential_complexes_infrastructure"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "residential_complexes_locales" ADD CONSTRAINT "residential_complexes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."residential_complexes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "commercial_utilities_locales" ADD CONSTRAINT "commercial_utilities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."commercial_utilities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "commercial_locales" ADD CONSTRAINT "commercial_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."commercial"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lands_communications_locales" ADD CONSTRAINT "lands_communications_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lands_communications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lands_locales" ADD CONSTRAINT "lands_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_locales" ADD CONSTRAINT "header_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_nav_items_locales" ADD CONSTRAINT "footer_nav_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_seo_seo_blocks_locales" ADD CONSTRAINT "home_seo_seo_blocks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_seo_seo_blocks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_seo_faq_locales" ADD CONSTRAINT "home_seo_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_seo_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_seo_locales" ADD CONSTRAINT "home_seo_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_seo"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_hero_links_locales_locale_parent_id_unique" ON "pages_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_links_locales_locale_parent_id_unique" ON "pages_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_content_columns_locales_locale_parent_id_unique" ON "pages_blocks_content_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_archive_locales_locale_parent_id_unique" ON "pages_blocks_archive_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_form_block_locales_locale_parent_id_unique" ON "pages_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_navbar_links_locales_locale_parent_id_unique" ON "pages_blocks_navbar_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_navbar_locales_locale_parent_id_unique" ON "pages_blocks_navbar_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_locales_locale_parent_id_unique" ON "pages_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_vision_items_locales_locale_parent_id_unique" ON "pages_blocks_vision_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_vision_locales_locale_parent_id_unique" ON "pages_blocks_vision_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_properties_locales_locale_parent_id_unique" ON "pages_blocks_properties_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_features_locales_locale_parent_id_uniqu" ON "pages_blocks_feature_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_feature_locales_locale_parent_id_unique" ON "pages_blocks_feature_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_how_it_works_steps_locales_locale_parent_id_uni" ON "pages_blocks_how_it_works_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_how_it_works_locales_locale_parent_id_unique" ON "pages_blocks_how_it_works_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_blog_locales_locale_parent_id_unique" ON "pages_blocks_blog_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_about_hero_locales_locale_parent_id_unique" ON "pages_blocks_about_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_vision_mission_stats_locales_locale_parent_id_u" ON "pages_blocks_vision_mission_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_vision_mission_locales_locale_parent_id_unique" ON "pages_blocks_vision_mission_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_amenities_amenities_locales_locale_parent_id_un" ON "pages_blocks_amenities_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_amenities_locales_locale_parent_id_unique" ON "pages_blocks_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_agents_locales_locale_parent_id_unique" ON "pages_blocks_agents_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_testimonials_locales_locale_parent_id_unique" ON "pages_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_call_to_action_new_locales_locale_parent_id_uni" ON "pages_blocks_call_to_action_new_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_hero_locales_locale_parent_id_unique" ON "pages_blocks_contact_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_contact_us_form_locales_locale_parent_id_unique" ON "pages_blocks_contact_us_form_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_items_locales_locale_parent_id_unique" ON "pages_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_faq_locales_locale_parent_id_unique" ON "pages_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_house_filter_filters_fields_options_locales_loc" ON "pages_blocks_house_filter_filters_fields_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_house_filter_filters_fields_locales_locale_pare" ON "pages_blocks_house_filter_filters_fields_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_house_filter_filters_locales_locale_parent_id_u" ON "pages_blocks_house_filter_filters_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_map_locales_locale_parent_id_unique" ON "pages_blocks_map_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_quick_nav_items_locales_locale_parent_id_unique" ON "pages_blocks_quick_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_quick_nav_locales_locale_parent_id_unique" ON "pages_blocks_quick_nav_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_hero_search_locales_locale_parent_id_unique" ON "pages_blocks_hero_search_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_recently_viewed_locales_locale_parent_id_unique" ON "pages_blocks_recently_viewed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_version_hero_links_locales_locale_parent_id_unique" ON "_pages_v_version_hero_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_content_columns_locales_locale_parent_id_uni" ON "_pages_v_blocks_content_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_archive_locales_locale_parent_id_unique" ON "_pages_v_blocks_archive_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_form_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_form_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_navbar_links_locales_locale_parent_id_unique" ON "_pages_v_blocks_navbar_links_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_navbar_locales_locale_parent_id_unique" ON "_pages_v_blocks_navbar_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_vision_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_vision_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_vision_locales_locale_parent_id_unique" ON "_pages_v_blocks_vision_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_properties_locales_locale_parent_id_unique" ON "_pages_v_blocks_properties_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_features_locales_locale_parent_id_un" ON "_pages_v_blocks_feature_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_feature_locales_locale_parent_id_unique" ON "_pages_v_blocks_feature_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_how_it_works_steps_locales_locale_parent_id_" ON "_pages_v_blocks_how_it_works_steps_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_how_it_works_locales_locale_parent_id_unique" ON "_pages_v_blocks_how_it_works_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_blog_locales_locale_parent_id_unique" ON "_pages_v_blocks_blog_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_about_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_about_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_vision_mission_stats_locales_locale_parent_i" ON "_pages_v_blocks_vision_mission_stats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_vision_mission_locales_locale_parent_id_uniq" ON "_pages_v_blocks_vision_mission_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_amenities_amenities_locales_locale_parent_id" ON "_pages_v_blocks_amenities_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_amenities_locales_locale_parent_id_unique" ON "_pages_v_blocks_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_agents_locales_locale_parent_id_unique" ON "_pages_v_blocks_agents_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_testimonials_locales_locale_parent_id_unique" ON "_pages_v_blocks_testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_call_to_action_new_locales_locale_parent_id_" ON "_pages_v_blocks_call_to_action_new_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_hero_locales_locale_parent_id_unique" ON "_pages_v_blocks_contact_hero_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_contact_us_form_locales_locale_parent_id_uni" ON "_pages_v_blocks_contact_us_form_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_faq_locales_locale_parent_id_unique" ON "_pages_v_blocks_faq_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_house_filter_filters_fields_options_locales_" ON "_pages_v_blocks_house_filter_filters_fields_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_house_filter_filters_fields_locales_locale_p" ON "_pages_v_blocks_house_filter_filters_fields_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_house_filter_filters_locales_locale_parent_i" ON "_pages_v_blocks_house_filter_filters_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_map_locales_locale_parent_id_unique" ON "_pages_v_blocks_map_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_quick_nav_items_locales_locale_parent_id_uni" ON "_pages_v_blocks_quick_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_quick_nav_locales_locale_parent_id_unique" ON "_pages_v_blocks_quick_nav_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_hero_search_locales_locale_parent_id_unique" ON "_pages_v_blocks_hero_search_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_recently_viewed_locales_locale_parent_id_uni" ON "_pages_v_blocks_recently_viewed_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_pages_v_locales_locale_parent_id_unique" ON "_pages_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "agents_locales_locale_parent_id_unique" ON "agents_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "testimonials_locales_locale_parent_id_unique" ON "testimonials_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "flats_amenities_locales_locale_parent_id_unique" ON "flats_amenities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "flats_locales_locale_parent_id_unique" ON "flats_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "houses_locales_locale_parent_id_unique" ON "houses_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "residential_complexes_infrastructure_locales_locale_parent_i" ON "residential_complexes_infrastructure_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "residential_complexes_locales_locale_parent_id_unique" ON "residential_complexes_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "commercial_utilities_locales_locale_parent_id_unique" ON "commercial_utilities_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "commercial_locales_locale_parent_id_unique" ON "commercial_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "lands_communications_locales_locale_parent_id_unique" ON "lands_communications_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "lands_locales_locale_parent_id_unique" ON "lands_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "header_nav_items_locales_locale_parent_id_unique" ON "header_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_nav_items_locales_locale_parent_id_unique" ON "footer_nav_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_seo_seo_blocks_locales_locale_parent_id_unique" ON "home_seo_seo_blocks_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_seo_faq_locales_locale_parent_id_unique" ON "home_seo_faq_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "home_seo_locales_locale_parent_id_unique" ON "home_seo_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "pages_hero_links" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "rich_text";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "rich_text";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "link_label";
  ALTER TABLE "pages_blocks_archive" DROP COLUMN "intro_content";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "intro_content";
  ALTER TABLE "pages_blocks_navbar_links" DROP COLUMN "text";
  ALTER TABLE "pages_blocks_navbar" DROP COLUMN "logo_text";
  ALTER TABLE "pages_blocks_navbar" DROP COLUMN "button_text";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "badge_text";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "highlight";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "subheadline";
  ALTER TABLE "pages_blocks_vision_items" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_vision_items" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_vision" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_vision" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_vision" DROP COLUMN "button_text";
  ALTER TABLE "pages_blocks_properties" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_feature_features" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_feature_features" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_feature" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_feature" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_how_it_works_steps" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_how_it_works_steps" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_how_it_works" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_how_it_works" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_blog" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_blog" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_about_hero" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_about_hero" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_vision_mission_stats" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_vision_mission" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_vision_mission" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_vision_mission" DROP COLUMN "button_text";
  ALTER TABLE "pages_blocks_amenities_amenities" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_amenities" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_amenities" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_agents" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_agents" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_testimonials" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_call_to_action_new" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_call_to_action_new" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_call_to_action_new" DROP COLUMN "button_text";
  ALTER TABLE "pages_blocks_contact_hero" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_contact_hero" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_contact_us_form" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_contact_us_form" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "question";
  ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "answer";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_house_filter_filters_fields_options" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_house_filter_filters_fields" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_house_filter_filters" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_map" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_map" DROP COLUMN "office_marker_label";
  ALTER TABLE "pages_blocks_quick_nav_items" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_quick_nav_items" DROP COLUMN "description";
  ALTER TABLE "pages_blocks_quick_nav" DROP COLUMN "label";
  ALTER TABLE "pages_blocks_quick_nav" DROP COLUMN "title";
  ALTER TABLE "pages_blocks_quick_nav" DROP COLUMN "subtitle";
  ALTER TABLE "pages_blocks_hero_search" DROP COLUMN "badge";
  ALTER TABLE "pages_blocks_hero_search" DROP COLUMN "headline";
  ALTER TABLE "pages_blocks_hero_search" DROP COLUMN "subheadline";
  ALTER TABLE "pages_blocks_recently_viewed" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "hero_rich_text";
  ALTER TABLE "pages" DROP COLUMN "meta_title";
  ALTER TABLE "pages" DROP COLUMN "meta_image_id";
  ALTER TABLE "pages" DROP COLUMN "meta_description";
  ALTER TABLE "_pages_v_version_hero_links" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "rich_text";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "rich_text";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "link_label";
  ALTER TABLE "_pages_v_blocks_archive" DROP COLUMN "intro_content";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "intro_content";
  ALTER TABLE "_pages_v_blocks_navbar_links" DROP COLUMN "text";
  ALTER TABLE "_pages_v_blocks_navbar" DROP COLUMN "logo_text";
  ALTER TABLE "_pages_v_blocks_navbar" DROP COLUMN "button_text";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "badge_text";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "headline";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "highlight";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "subheadline";
  ALTER TABLE "_pages_v_blocks_vision_items" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_vision_items" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_vision" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_vision" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_vision" DROP COLUMN "button_text";
  ALTER TABLE "_pages_v_blocks_properties" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_feature_features" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_feature_features" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_feature" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_feature" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_how_it_works" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_how_it_works" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_blog" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_blog" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_about_hero" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_about_hero" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_vision_mission_stats" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_vision_mission" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_vision_mission" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_vision_mission" DROP COLUMN "button_text";
  ALTER TABLE "_pages_v_blocks_amenities_amenities" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_amenities" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_amenities" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_agents" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_agents" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_testimonials" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_call_to_action_new" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_call_to_action_new" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_call_to_action_new" DROP COLUMN "button_text";
  ALTER TABLE "_pages_v_blocks_contact_hero" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_contact_hero" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_contact_us_form" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_contact_us_form" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_faq_items" DROP COLUMN "question";
  ALTER TABLE "_pages_v_blocks_faq_items" DROP COLUMN "answer";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_house_filter_filters_fields_options" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_house_filter_filters_fields" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_house_filter_filters" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_map" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_map" DROP COLUMN "office_marker_label";
  ALTER TABLE "_pages_v_blocks_quick_nav_items" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_quick_nav_items" DROP COLUMN "description";
  ALTER TABLE "_pages_v_blocks_quick_nav" DROP COLUMN "label";
  ALTER TABLE "_pages_v_blocks_quick_nav" DROP COLUMN "title";
  ALTER TABLE "_pages_v_blocks_quick_nav" DROP COLUMN "subtitle";
  ALTER TABLE "_pages_v_blocks_hero_search" DROP COLUMN "badge";
  ALTER TABLE "_pages_v_blocks_hero_search" DROP COLUMN "headline";
  ALTER TABLE "_pages_v_blocks_hero_search" DROP COLUMN "subheadline";
  ALTER TABLE "_pages_v_blocks_recently_viewed" DROP COLUMN "title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_hero_rich_text";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_title";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_image_id";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_description";
  ALTER TABLE "posts" DROP COLUMN "title";
  ALTER TABLE "posts" DROP COLUMN "excerpt";
  ALTER TABLE "posts" DROP COLUMN "content";
  ALTER TABLE "posts" DROP COLUMN "meta_title";
  ALTER TABLE "posts" DROP COLUMN "meta_description";
  ALTER TABLE "posts" DROP COLUMN "meta_image_id";
  ALTER TABLE "agents" DROP COLUMN "position";
  ALTER TABLE "agents" DROP COLUMN "description";
  ALTER TABLE "testimonials" DROP COLUMN "text";
  ALTER TABLE "flats_amenities" DROP COLUMN "amenity";
  ALTER TABLE "flats" DROP COLUMN "title";
  ALTER TABLE "flats" DROP COLUMN "description";
  ALTER TABLE "houses" DROP COLUMN "title";
  ALTER TABLE "houses" DROP COLUMN "description";
  ALTER TABLE "residential_complexes_infrastructure" DROP COLUMN "item";
  ALTER TABLE "residential_complexes" DROP COLUMN "name";
  ALTER TABLE "residential_complexes" DROP COLUMN "description";
  ALTER TABLE "commercial_utilities" DROP COLUMN "utility";
  ALTER TABLE "commercial" DROP COLUMN "title";
  ALTER TABLE "commercial" DROP COLUMN "description";
  ALTER TABLE "lands_communications" DROP COLUMN "communication";
  ALTER TABLE "lands" DROP COLUMN "title";
  ALTER TABLE "header_nav_items" DROP COLUMN "link_label";
  ALTER TABLE "footer_nav_items" DROP COLUMN "link_label";
  ALTER TABLE "home_seo_seo_blocks" DROP COLUMN "heading";
  ALTER TABLE "home_seo_seo_blocks" DROP COLUMN "body";
  ALTER TABLE "home_seo_seo_blocks" DROP COLUMN "cta_label";
  ALTER TABLE "home_seo_seo_blocks" DROP COLUMN "highlight_keywords";
  ALTER TABLE "home_seo_faq" DROP COLUMN "question";
  ALTER TABLE "home_seo_faq" DROP COLUMN "answer";
  ALTER TABLE "home_seo" DROP COLUMN "meta_title";
  ALTER TABLE "home_seo" DROP COLUMN "meta_description";
  ALTER TABLE "home_seo" DROP COLUMN "h1";
  ALTER TABLE "home_seo" DROP COLUMN "subtitle";
  ALTER TABLE "home_seo" DROP COLUMN "faq_intro";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_content_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_archive_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_form_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_navbar_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_navbar_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vision_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vision_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_properties_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_how_it_works_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_how_it_works_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_blog_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_about_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vision_mission_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_vision_mission_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_amenities_amenities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_amenities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_agents_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_call_to_action_new_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_contact_us_form_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_house_filter_filters_fields_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_house_filter_filters_fields_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_house_filter_filters_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_map_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_quick_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_quick_nav_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_hero_search_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_recently_viewed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_version_hero_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_archive_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_form_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_navbar_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_navbar_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vision_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vision_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_properties_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_features_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_how_it_works_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_blog_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_about_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vision_mission_stats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_vision_mission_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_amenities_amenities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_amenities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_agents_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_call_to_action_new_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_hero_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_contact_us_form_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_house_filter_filters_fields_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_house_filter_filters_fields_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_house_filter_filters_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_map_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_quick_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_quick_nav_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_search_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_recently_viewed_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "agents_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "testimonials_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "flats_amenities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "flats_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "houses_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "residential_complexes_infrastructure_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "residential_complexes_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "commercial_utilities_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "commercial_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lands_communications_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lands_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_nav_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_seo_seo_blocks_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_seo_faq_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "home_seo_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_links_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_links_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "pages_blocks_content_columns_locales" CASCADE;
  DROP TABLE "pages_blocks_archive_locales" CASCADE;
  DROP TABLE "pages_blocks_form_block_locales" CASCADE;
  DROP TABLE "pages_blocks_navbar_links_locales" CASCADE;
  DROP TABLE "pages_blocks_navbar_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_vision_items_locales" CASCADE;
  DROP TABLE "pages_blocks_vision_locales" CASCADE;
  DROP TABLE "pages_blocks_properties_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_features_locales" CASCADE;
  DROP TABLE "pages_blocks_feature_locales" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_steps_locales" CASCADE;
  DROP TABLE "pages_blocks_how_it_works_locales" CASCADE;
  DROP TABLE "pages_blocks_blog_locales" CASCADE;
  DROP TABLE "pages_blocks_about_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_vision_mission_stats_locales" CASCADE;
  DROP TABLE "pages_blocks_vision_mission_locales" CASCADE;
  DROP TABLE "pages_blocks_amenities_amenities_locales" CASCADE;
  DROP TABLE "pages_blocks_amenities_locales" CASCADE;
  DROP TABLE "pages_blocks_agents_locales" CASCADE;
  DROP TABLE "pages_blocks_testimonials_locales" CASCADE;
  DROP TABLE "pages_blocks_call_to_action_new_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_hero_locales" CASCADE;
  DROP TABLE "pages_blocks_contact_us_form_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_items_locales" CASCADE;
  DROP TABLE "pages_blocks_faq_locales" CASCADE;
  DROP TABLE "pages_blocks_house_filter_filters_fields_options_locales" CASCADE;
  DROP TABLE "pages_blocks_house_filter_filters_fields_locales" CASCADE;
  DROP TABLE "pages_blocks_house_filter_filters_locales" CASCADE;
  DROP TABLE "pages_blocks_map_locales" CASCADE;
  DROP TABLE "pages_blocks_quick_nav_items_locales" CASCADE;
  DROP TABLE "pages_blocks_quick_nav_locales" CASCADE;
  DROP TABLE "pages_blocks_hero_search_locales" CASCADE;
  DROP TABLE "pages_blocks_recently_viewed_locales" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "_pages_v_version_hero_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_archive_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_form_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_navbar_links_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_navbar_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_vision_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_vision_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_properties_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_features_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_steps_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_how_it_works_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_blog_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_about_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_vision_mission_stats_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_vision_mission_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_amenities_amenities_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_amenities_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_agents_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_testimonials_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_call_to_action_new_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_hero_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_contact_us_form_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_faq_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_house_filter_filters_fields_options_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_house_filter_filters_fields_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_house_filter_filters_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_map_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_quick_nav_items_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_quick_nav_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_search_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_recently_viewed_locales" CASCADE;
  DROP TABLE "_pages_v_locales" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "agents_locales" CASCADE;
  DROP TABLE "testimonials_locales" CASCADE;
  DROP TABLE "flats_amenities_locales" CASCADE;
  DROP TABLE "flats_locales" CASCADE;
  DROP TABLE "houses_locales" CASCADE;
  DROP TABLE "residential_complexes_infrastructure_locales" CASCADE;
  DROP TABLE "residential_complexes_locales" CASCADE;
  DROP TABLE "commercial_utilities_locales" CASCADE;
  DROP TABLE "commercial_locales" CASCADE;
  DROP TABLE "lands_communications_locales" CASCADE;
  DROP TABLE "lands_locales" CASCADE;
  DROP TABLE "header_nav_items_locales" CASCADE;
  DROP TABLE "footer_nav_items_locales" CASCADE;
  DROP TABLE "home_seo_seo_blocks_locales" CASCADE;
  DROP TABLE "home_seo_faq_locales" CASCADE;
  DROP TABLE "home_seo_locales" CASCADE;
  ALTER TABLE "pages_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "link_label" varchar;
  ALTER TABLE "pages_blocks_archive" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "pages_blocks_navbar_links" ADD COLUMN "text" varchar;
  ALTER TABLE "pages_blocks_navbar" ADD COLUMN "logo_text" varchar;
  ALTER TABLE "pages_blocks_navbar" ADD COLUMN "button_text" varchar DEFAULT 'Связаться';
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "badge_text" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "highlight" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "subheadline" varchar;
  ALTER TABLE "pages_blocks_vision_items" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_vision_items" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_vision" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_vision" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_vision" ADD COLUMN "button_text" varchar;
  ALTER TABLE "pages_blocks_properties" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_feature_features" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_feature_features" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_feature" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_feature" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_how_it_works_steps" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_how_it_works_steps" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_how_it_works" ADD COLUMN "label" varchar DEFAULT 'How it works';
  ALTER TABLE "pages_blocks_how_it_works" ADD COLUMN "title" varchar DEFAULT 'Discover the advantages and exclusive benefits';
  ALTER TABLE "pages_blocks_blog" ADD COLUMN "title" varchar DEFAULT 'Expert advice and market updates on real estate';
  ALTER TABLE "pages_blocks_blog" ADD COLUMN "subtitle" varchar DEFAULT 'Blogs';
  ALTER TABLE "pages_blocks_about_hero" ADD COLUMN "label" varchar DEFAULT 'About us';
  ALTER TABLE "pages_blocks_about_hero" ADD COLUMN "title" varchar DEFAULT 'Connect with our experts and bring your Real Estate ideas to life';
  ALTER TABLE "pages_blocks_vision_mission_stats" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_vision_mission" ADD COLUMN "title" varchar DEFAULT 'Your trusted real estate experts:';
  ALTER TABLE "pages_blocks_vision_mission" ADD COLUMN "description" varchar DEFAULT 'With years of local expertise, we''re committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client''s unique needs are met with professionalism and care.';
  ALTER TABLE "pages_blocks_vision_mission" ADD COLUMN "button_text" varchar DEFAULT 'View Properties';
  ALTER TABLE "pages_blocks_amenities_amenities" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_amenities" ADD COLUMN "label" varchar DEFAULT 'Amenities';
  ALTER TABLE "pages_blocks_amenities" ADD COLUMN "title" varchar DEFAULT 'Discover exceptional amenities for a luxurious lifestyle';
  ALTER TABLE "pages_blocks_agents" ADD COLUMN "label" varchar DEFAULT 'Agents';
  ALTER TABLE "pages_blocks_agents" ADD COLUMN "title" varchar DEFAULT 'Meet our exceptional agents for a seamless experience';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "label" varchar DEFAULT 'Testimonials';
  ALTER TABLE "pages_blocks_testimonials" ADD COLUMN "title" varchar DEFAULT 'Real feedback from our satisfied clients';
  ALTER TABLE "pages_blocks_call_to_action_new" ADD COLUMN "label" varchar DEFAULT 'Want to Book a Call?';
  ALTER TABLE "pages_blocks_call_to_action_new" ADD COLUMN "title" varchar DEFAULT 'Ready to make your step in real estate? Book Now.';
  ALTER TABLE "pages_blocks_call_to_action_new" ADD COLUMN "button_text" varchar DEFAULT 'View Properties';
  ALTER TABLE "pages_blocks_contact_hero" ADD COLUMN "label" varchar DEFAULT 'Contact';
  ALTER TABLE "pages_blocks_contact_hero" ADD COLUMN "title" varchar DEFAULT 'Get in touch with us today for expert assistance';
  ALTER TABLE "pages_blocks_contact_us_form" ADD COLUMN "label" varchar DEFAULT 'Contact';
  ALTER TABLE "pages_blocks_contact_us_form" ADD COLUMN "title" varchar DEFAULT 'Fill out this form, Let''s get in touch';
  ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "question" varchar;
  ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "answer" varchar;
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "label" varchar DEFAULT 'faq';
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "title" varchar DEFAULT 'Your questions, Answered';
  ALTER TABLE "pages_blocks_house_filter_filters_fields_options" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_house_filter_filters_fields" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_house_filter_filters" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_map" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_map" ADD COLUMN "office_marker_label" varchar;
  ALTER TABLE "pages_blocks_quick_nav_items" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_quick_nav_items" ADD COLUMN "description" varchar;
  ALTER TABLE "pages_blocks_quick_nav" ADD COLUMN "label" varchar;
  ALTER TABLE "pages_blocks_quick_nav" ADD COLUMN "title" varchar;
  ALTER TABLE "pages_blocks_quick_nav" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "pages_blocks_hero_search" ADD COLUMN "badge" varchar;
  ALTER TABLE "pages_blocks_hero_search" ADD COLUMN "headline" varchar;
  ALTER TABLE "pages_blocks_hero_search" ADD COLUMN "subheadline" varchar;
  ALTER TABLE "pages_blocks_recently_viewed" ADD COLUMN "title" varchar DEFAULT 'Недавно вы смотрели';
  ALTER TABLE "pages" ADD COLUMN "title" varchar;
  ALTER TABLE "pages" ADD COLUMN "hero_rich_text" jsonb;
  ALTER TABLE "pages" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "pages" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "pages" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "_pages_v_version_hero_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "link_label" varchar;
  ALTER TABLE "_pages_v_blocks_archive" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "intro_content" jsonb;
  ALTER TABLE "_pages_v_blocks_navbar_links" ADD COLUMN "text" varchar;
  ALTER TABLE "_pages_v_blocks_navbar" ADD COLUMN "logo_text" varchar;
  ALTER TABLE "_pages_v_blocks_navbar" ADD COLUMN "button_text" varchar DEFAULT 'Связаться';
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "badge_text" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "headline" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "highlight" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "subheadline" varchar;
  ALTER TABLE "_pages_v_blocks_vision_items" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_vision_items" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_vision" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_vision" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_vision" ADD COLUMN "button_text" varchar;
  ALTER TABLE "_pages_v_blocks_properties" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_feature_features" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_feature_features" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_feature" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_feature" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_how_it_works_steps" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_how_it_works" ADD COLUMN "label" varchar DEFAULT 'How it works';
  ALTER TABLE "_pages_v_blocks_how_it_works" ADD COLUMN "title" varchar DEFAULT 'Discover the advantages and exclusive benefits';
  ALTER TABLE "_pages_v_blocks_blog" ADD COLUMN "title" varchar DEFAULT 'Expert advice and market updates on real estate';
  ALTER TABLE "_pages_v_blocks_blog" ADD COLUMN "subtitle" varchar DEFAULT 'Blogs';
  ALTER TABLE "_pages_v_blocks_about_hero" ADD COLUMN "label" varchar DEFAULT 'About us';
  ALTER TABLE "_pages_v_blocks_about_hero" ADD COLUMN "title" varchar DEFAULT 'Connect with our experts and bring your Real Estate ideas to life';
  ALTER TABLE "_pages_v_blocks_vision_mission_stats" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_vision_mission" ADD COLUMN "title" varchar DEFAULT 'Your trusted real estate experts:';
  ALTER TABLE "_pages_v_blocks_vision_mission" ADD COLUMN "description" varchar DEFAULT 'With years of local expertise, we''re committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client''s unique needs are met with professionalism and care.';
  ALTER TABLE "_pages_v_blocks_vision_mission" ADD COLUMN "button_text" varchar DEFAULT 'View Properties';
  ALTER TABLE "_pages_v_blocks_amenities_amenities" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_amenities" ADD COLUMN "label" varchar DEFAULT 'Amenities';
  ALTER TABLE "_pages_v_blocks_amenities" ADD COLUMN "title" varchar DEFAULT 'Discover exceptional amenities for a luxurious lifestyle';
  ALTER TABLE "_pages_v_blocks_agents" ADD COLUMN "label" varchar DEFAULT 'Agents';
  ALTER TABLE "_pages_v_blocks_agents" ADD COLUMN "title" varchar DEFAULT 'Meet our exceptional agents for a seamless experience';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "label" varchar DEFAULT 'Testimonials';
  ALTER TABLE "_pages_v_blocks_testimonials" ADD COLUMN "title" varchar DEFAULT 'Real feedback from our satisfied clients';
  ALTER TABLE "_pages_v_blocks_call_to_action_new" ADD COLUMN "label" varchar DEFAULT 'Want to Book a Call?';
  ALTER TABLE "_pages_v_blocks_call_to_action_new" ADD COLUMN "title" varchar DEFAULT 'Ready to make your step in real estate? Book Now.';
  ALTER TABLE "_pages_v_blocks_call_to_action_new" ADD COLUMN "button_text" varchar DEFAULT 'View Properties';
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD COLUMN "label" varchar DEFAULT 'Contact';
  ALTER TABLE "_pages_v_blocks_contact_hero" ADD COLUMN "title" varchar DEFAULT 'Get in touch with us today for expert assistance';
  ALTER TABLE "_pages_v_blocks_contact_us_form" ADD COLUMN "label" varchar DEFAULT 'Contact';
  ALTER TABLE "_pages_v_blocks_contact_us_form" ADD COLUMN "title" varchar DEFAULT 'Fill out this form, Let''s get in touch';
  ALTER TABLE "_pages_v_blocks_faq_items" ADD COLUMN "question" varchar;
  ALTER TABLE "_pages_v_blocks_faq_items" ADD COLUMN "answer" varchar;
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "label" varchar DEFAULT 'faq';
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "title" varchar DEFAULT 'Your questions, Answered';
  ALTER TABLE "_pages_v_blocks_house_filter_filters_fields_options" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_house_filter_filters_fields" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_house_filter_filters" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_map" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_map" ADD COLUMN "office_marker_label" varchar;
  ALTER TABLE "_pages_v_blocks_quick_nav_items" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_quick_nav_items" ADD COLUMN "description" varchar;
  ALTER TABLE "_pages_v_blocks_quick_nav" ADD COLUMN "label" varchar;
  ALTER TABLE "_pages_v_blocks_quick_nav" ADD COLUMN "title" varchar;
  ALTER TABLE "_pages_v_blocks_quick_nav" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "_pages_v_blocks_hero_search" ADD COLUMN "badge" varchar;
  ALTER TABLE "_pages_v_blocks_hero_search" ADD COLUMN "headline" varchar;
  ALTER TABLE "_pages_v_blocks_hero_search" ADD COLUMN "subheadline" varchar;
  ALTER TABLE "_pages_v_blocks_recently_viewed" ADD COLUMN "title" varchar DEFAULT 'Недавно вы смотрели';
  ALTER TABLE "_pages_v" ADD COLUMN "version_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_hero_rich_text" jsonb;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_title" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_image_id" integer;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "posts" ADD COLUMN "excerpt" varchar NOT NULL;
  ALTER TABLE "posts" ADD COLUMN "content" jsonb NOT NULL;
  ALTER TABLE "posts" ADD COLUMN "meta_title" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_description" varchar;
  ALTER TABLE "posts" ADD COLUMN "meta_image_id" integer;
  ALTER TABLE "agents" ADD COLUMN "position" varchar NOT NULL;
  ALTER TABLE "agents" ADD COLUMN "description" varchar;
  ALTER TABLE "testimonials" ADD COLUMN "text" varchar NOT NULL;
  ALTER TABLE "flats_amenities" ADD COLUMN "amenity" varchar NOT NULL;
  ALTER TABLE "flats" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "flats" ADD COLUMN "description" jsonb;
  ALTER TABLE "houses" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "houses" ADD COLUMN "description" jsonb;
  ALTER TABLE "residential_complexes_infrastructure" ADD COLUMN "item" varchar;
  ALTER TABLE "residential_complexes" ADD COLUMN "name" varchar NOT NULL;
  ALTER TABLE "residential_complexes" ADD COLUMN "description" jsonb;
  ALTER TABLE "commercial_utilities" ADD COLUMN "utility" varchar;
  ALTER TABLE "commercial" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "commercial" ADD COLUMN "description" jsonb;
  ALTER TABLE "lands_communications" ADD COLUMN "communication" varchar;
  ALTER TABLE "lands" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "header_nav_items" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "footer_nav_items" ADD COLUMN "link_label" varchar NOT NULL;
  ALTER TABLE "home_seo_seo_blocks" ADD COLUMN "heading" varchar NOT NULL;
  ALTER TABLE "home_seo_seo_blocks" ADD COLUMN "body" varchar NOT NULL;
  ALTER TABLE "home_seo_seo_blocks" ADD COLUMN "cta_label" varchar DEFAULT 'Смотреть объекты';
  ALTER TABLE "home_seo_seo_blocks" ADD COLUMN "highlight_keywords" varchar;
  ALTER TABLE "home_seo_faq" ADD COLUMN "question" varchar NOT NULL;
  ALTER TABLE "home_seo_faq" ADD COLUMN "answer" varchar NOT NULL;
  ALTER TABLE "home_seo" ADD COLUMN "meta_title" varchar DEFAULT 'Demo Realty — квартиры, дома и коммерческая недвижимость' NOT NULL;
  ALTER TABLE "home_seo" ADD COLUMN "meta_description" varchar DEFAULT 'Поиск квартир, домов и коммерческой недвижимости. Проверенные объявления, прозрачные сделки, прямые контакты с собственниками.' NOT NULL;
  ALTER TABLE "home_seo" ADD COLUMN "h1" varchar DEFAULT 'Недвижимость, которой доверяют' NOT NULL;
  ALTER TABLE "home_seo" ADD COLUMN "subtitle" varchar DEFAULT 'Прозрачные сделки, проверенные объявления, удобный кабинет.';
  ALTER TABLE "home_seo" ADD COLUMN "faq_intro" varchar DEFAULT 'Частые вопросы';
  ALTER TABLE "pages" ADD CONSTRAINT "pages_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v" ADD CONSTRAINT "_pages_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_meta_meta_image_idx" ON "pages" USING btree ("meta_image_id");
  CREATE INDEX "_pages_v_version_meta_version_meta_image_idx" ON "_pages_v" USING btree ("version_meta_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");`)
}
