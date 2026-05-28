--
-- PostgreSQL database dump
--

\restrict r50wo4nfOxDnnn31qlhcyLn0Y2egs1EzDLC5Lny4TojODcgN9XORK3mPMNPL0SR

-- Dumped from database version 15.17 (Debian 15.17-1.pgdg13+1)
-- Dumped by pg_dump version 15.17 (Debian 15.17-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.users_sessions DROP CONSTRAINT IF EXISTS users_sessions_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_photo_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.testimonials DROP CONSTRAINT IF EXISTS testimonials_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.search_rels DROP CONSTRAINT IF EXISTS search_rels_posts_fk;
ALTER TABLE IF EXISTS ONLY public.search_rels DROP CONSTRAINT IF EXISTS search_rels_parent_1_idx;
ALTER TABLE IF EXISTS ONLY public.search DROP CONSTRAINT IF EXISTS search_meta_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.search_categories DROP CONSTRAINT IF EXISTS search_categories_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_realtor_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.residential_complexes_infrastructure DROP CONSTRAINT IF EXISTS residential_complexes_infrastructure_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.residential_complexes_images DROP CONSTRAINT IF EXISTS residential_complexes_images_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.residential_complexes_images DROP CONSTRAINT IF EXISTS residential_complexes_images_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.redirects_rels DROP CONSTRAINT IF EXISTS redirects_rels_posts_fk;
ALTER TABLE IF EXISTS ONLY public.redirects_rels DROP CONSTRAINT IF EXISTS redirects_rels_parent_1_idx;
ALTER TABLE IF EXISTS ONLY public.redirects_rels DROP CONSTRAINT IF EXISTS redirects_rels_pages_fk;
ALTER TABLE IF EXISTS ONLY public.properties_images DROP CONSTRAINT IF EXISTS properties_images_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.properties_images DROP CONSTRAINT IF EXISTS properties_images_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.properties_features DROP CONSTRAINT IF EXISTS properties_features_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.posts_rels DROP CONSTRAINT IF EXISTS posts_rels_parent_1_idx;
ALTER TABLE IF EXISTS ONLY public.posts_rels DROP CONSTRAINT IF EXISTS posts_rels_categories_fk;
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS posts_meta_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS posts_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS posts_author_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.payload_preferences_rels DROP CONSTRAINT IF EXISTS payload_preferences_rels_users_fk;
ALTER TABLE IF EXISTS ONLY public.payload_preferences_rels DROP CONSTRAINT IF EXISTS payload_preferences_rels_parent_1_idx;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_users_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_testimonials_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_search_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_reviews_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_residential_complexes_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_redirects_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_properties_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_posts_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_payload_jobs_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_parent_1_idx;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_pages_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_messages_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_media_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_lands_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_forms_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_form_submissions_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_flats_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_commercial_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_categories_fk;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_agents_fk;
ALTER TABLE IF EXISTS ONLY public.payload_jobs_log DROP CONSTRAINT IF EXISTS payload_jobs_log_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_testimonials_fk;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_residential_complexes_fk;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_properties_fk;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_posts_fk;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_parent_1_idx;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_pages_fk;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_lands_fk;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_flats_fk;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_commercial_fk;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_categories_fk;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_agents_fk;
ALTER TABLE IF EXISTS ONLY public.pages DROP CONSTRAINT IF EXISTS pages_meta_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages DROP CONSTRAINT IF EXISTS pages_hero_media_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_hero_links DROP CONSTRAINT IF EXISTS pages_hero_links_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_vision DROP CONSTRAINT IF EXISTS pages_blocks_vision_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_vision_mission_stats DROP CONSTRAINT IF EXISTS pages_blocks_vision_mission_stats_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_vision_mission DROP CONSTRAINT IF EXISTS pages_blocks_vision_mission_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_vision_items DROP CONSTRAINT IF EXISTS pages_blocks_vision_items_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_testimonials DROP CONSTRAINT IF EXISTS pages_blocks_testimonials_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_property_features DROP CONSTRAINT IF EXISTS pages_blocks_property_features_property_id_properties_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_property_features DROP CONSTRAINT IF EXISTS pages_blocks_property_features_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_properties DROP CONSTRAINT IF EXISTS pages_blocks_properties_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_navbar DROP CONSTRAINT IF EXISTS pages_blocks_navbar_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_navbar_links DROP CONSTRAINT IF EXISTS pages_blocks_navbar_links_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_navbar DROP CONSTRAINT IF EXISTS pages_blocks_navbar_avatar_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_media_block DROP CONSTRAINT IF EXISTS pages_blocks_media_block_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_media_block DROP CONSTRAINT IF EXISTS pages_blocks_media_block_media_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_map DROP CONSTRAINT IF EXISTS pages_blocks_map_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_how_it_works_steps DROP CONSTRAINT IF EXISTS pages_blocks_how_it_works_steps_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_how_it_works DROP CONSTRAINT IF EXISTS pages_blocks_how_it_works_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_house_filter DROP CONSTRAINT IF EXISTS pages_blocks_house_filter_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_house_filter_filters DROP CONSTRAINT IF EXISTS pages_blocks_house_filter_filters_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_house_filter_filters_fields DROP CONSTRAINT IF EXISTS pages_blocks_house_filter_filters_fields_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_house_filter_filters_fields_options DROP CONSTRAINT IF EXISTS pages_blocks_house_filter_filters_fields_options_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_hero DROP CONSTRAINT IF EXISTS pages_blocks_hero_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_hero DROP CONSTRAINT IF EXISTS pages_blocks_hero_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_form_block DROP CONSTRAINT IF EXISTS pages_blocks_form_block_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_form_block DROP CONSTRAINT IF EXISTS pages_blocks_form_block_form_id_forms_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_feature DROP CONSTRAINT IF EXISTS pages_blocks_feature_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_feature_features DROP CONSTRAINT IF EXISTS pages_blocks_feature_features_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_faq DROP CONSTRAINT IF EXISTS pages_blocks_faq_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_faq_items DROP CONSTRAINT IF EXISTS pages_blocks_faq_items_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_cta DROP CONSTRAINT IF EXISTS pages_blocks_cta_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_cta_links DROP CONSTRAINT IF EXISTS pages_blocks_cta_links_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_content DROP CONSTRAINT IF EXISTS pages_blocks_content_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_content_columns DROP CONSTRAINT IF EXISTS pages_blocks_content_columns_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_contact_us_form DROP CONSTRAINT IF EXISTS pages_blocks_contact_us_form_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_contact_us_form DROP CONSTRAINT IF EXISTS pages_blocks_contact_us_form_form_id_forms_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_contact_hero DROP CONSTRAINT IF EXISTS pages_blocks_contact_hero_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_contact_hero DROP CONSTRAINT IF EXISTS pages_blocks_contact_hero_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_call_to_action_new DROP CONSTRAINT IF EXISTS pages_blocks_call_to_action_new_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_blog DROP CONSTRAINT IF EXISTS pages_blocks_blog_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_archive DROP CONSTRAINT IF EXISTS pages_blocks_archive_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_amenities DROP CONSTRAINT IF EXISTS pages_blocks_amenities_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_amenities DROP CONSTRAINT IF EXISTS pages_blocks_amenities_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_amenities_amenities DROP CONSTRAINT IF EXISTS pages_blocks_amenities_amenities_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_agents DROP CONSTRAINT IF EXISTS pages_blocks_agents_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_about_hero DROP CONSTRAINT IF EXISTS pages_blocks_about_hero_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_about_hero_images DROP CONSTRAINT IF EXISTS pages_blocks_about_hero_images_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_about_hero_images DROP CONSTRAINT IF EXISTS pages_blocks_about_hero_images_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.messages DROP CONSTRAINT IF EXISTS messages_realtor_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.messages DROP CONSTRAINT IF EXISTS messages_attachment_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.lands_images DROP CONSTRAINT IF EXISTS lands_images_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.lands_images DROP CONSTRAINT IF EXISTS lands_images_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.lands_communications DROP CONSTRAINT IF EXISTS lands_communications_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.header_rels DROP CONSTRAINT IF EXISTS header_rels_posts_fk;
ALTER TABLE IF EXISTS ONLY public.header_rels DROP CONSTRAINT IF EXISTS header_rels_parent_1_idx;
ALTER TABLE IF EXISTS ONLY public.header_rels DROP CONSTRAINT IF EXISTS header_rels_pages_fk;
ALTER TABLE IF EXISTS ONLY public.header_nav_items DROP CONSTRAINT IF EXISTS header_nav_items_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_emails DROP CONSTRAINT IF EXISTS forms_emails_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_textarea DROP CONSTRAINT IF EXISTS forms_blocks_textarea_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_text DROP CONSTRAINT IF EXISTS forms_blocks_text_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_state DROP CONSTRAINT IF EXISTS forms_blocks_state_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_select DROP CONSTRAINT IF EXISTS forms_blocks_select_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_select_options DROP CONSTRAINT IF EXISTS forms_blocks_select_options_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_number DROP CONSTRAINT IF EXISTS forms_blocks_number_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_message DROP CONSTRAINT IF EXISTS forms_blocks_message_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_email DROP CONSTRAINT IF EXISTS forms_blocks_email_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_country DROP CONSTRAINT IF EXISTS forms_blocks_country_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_checkbox DROP CONSTRAINT IF EXISTS forms_blocks_checkbox_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.form_submissions_submission_data DROP CONSTRAINT IF EXISTS form_submissions_submission_data_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.form_submissions DROP CONSTRAINT IF EXISTS form_submissions_form_id_forms_id_fk;
ALTER TABLE IF EXISTS ONLY public.footer_rels DROP CONSTRAINT IF EXISTS footer_rels_posts_fk;
ALTER TABLE IF EXISTS ONLY public.footer_rels DROP CONSTRAINT IF EXISTS footer_rels_parent_1_idx;
ALTER TABLE IF EXISTS ONLY public.footer_rels DROP CONSTRAINT IF EXISTS footer_rels_pages_fk;
ALTER TABLE IF EXISTS ONLY public.footer_nav_items DROP CONSTRAINT IF EXISTS footer_nav_items_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.flats DROP CONSTRAINT IF EXISTS flats_residential_complex_id_residential_complexes_id_fk;
ALTER TABLE IF EXISTS ONLY public.flats DROP CONSTRAINT IF EXISTS flats_realtor_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.flats DROP CONSTRAINT IF EXISTS flats_layout_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.flats_images DROP CONSTRAINT IF EXISTS flats_images_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.flats_images DROP CONSTRAINT IF EXISTS flats_images_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.flats_amenities DROP CONSTRAINT IF EXISTS flats_amenities_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.commercial_utilities DROP CONSTRAINT IF EXISTS commercial_utilities_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.commercial_images DROP CONSTRAINT IF EXISTS commercial_images_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.commercial_images DROP CONSTRAINT IF EXISTS commercial_images_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_parent_id_categories_id_fk;
ALTER TABLE IF EXISTS ONLY public.categories_breadcrumbs DROP CONSTRAINT IF EXISTS categories_breadcrumbs_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.categories_breadcrumbs DROP CONSTRAINT IF EXISTS categories_breadcrumbs_doc_id_categories_id_fk;
ALTER TABLE IF EXISTS ONLY public.agents_social_links DROP CONSTRAINT IF EXISTS agents_social_links_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public.agents DROP CONSTRAINT IF EXISTS agents_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v DROP CONSTRAINT IF EXISTS _pages_v_version_meta_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v DROP CONSTRAINT IF EXISTS _pages_v_version_hero_media_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_version_hero_links DROP CONSTRAINT IF EXISTS _pages_v_version_hero_links_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_testimonials_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_residential_complexes_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_properties_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_posts_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_parent_1_idx;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_pages_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_lands_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_flats_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_commercial_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_categories_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_agents_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v DROP CONSTRAINT IF EXISTS _pages_v_parent_id_pages_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_vision DROP CONSTRAINT IF EXISTS _pages_v_blocks_vision_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_vision_mission_stats DROP CONSTRAINT IF EXISTS _pages_v_blocks_vision_mission_stats_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_vision_mission DROP CONSTRAINT IF EXISTS _pages_v_blocks_vision_mission_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_vision_items DROP CONSTRAINT IF EXISTS _pages_v_blocks_vision_items_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_testimonials DROP CONSTRAINT IF EXISTS _pages_v_blocks_testimonials_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_property_features DROP CONSTRAINT IF EXISTS _pages_v_blocks_property_features_property_id_properties_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_property_features DROP CONSTRAINT IF EXISTS _pages_v_blocks_property_features_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_properties DROP CONSTRAINT IF EXISTS _pages_v_blocks_properties_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_navbar DROP CONSTRAINT IF EXISTS _pages_v_blocks_navbar_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_navbar_links DROP CONSTRAINT IF EXISTS _pages_v_blocks_navbar_links_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_navbar DROP CONSTRAINT IF EXISTS _pages_v_blocks_navbar_avatar_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_media_block DROP CONSTRAINT IF EXISTS _pages_v_blocks_media_block_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_media_block DROP CONSTRAINT IF EXISTS _pages_v_blocks_media_block_media_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_map DROP CONSTRAINT IF EXISTS _pages_v_blocks_map_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_how_it_works_steps DROP CONSTRAINT IF EXISTS _pages_v_blocks_how_it_works_steps_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_how_it_works DROP CONSTRAINT IF EXISTS _pages_v_blocks_how_it_works_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_house_filter DROP CONSTRAINT IF EXISTS _pages_v_blocks_house_filter_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_house_filter_filters DROP CONSTRAINT IF EXISTS _pages_v_blocks_house_filter_filters_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_house_filter_filters_fields DROP CONSTRAINT IF EXISTS _pages_v_blocks_house_filter_filters_fields_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_house_filter_filters_fields_options DROP CONSTRAINT IF EXISTS _pages_v_blocks_house_filter_filters_fields_options_parent_id_f;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_hero DROP CONSTRAINT IF EXISTS _pages_v_blocks_hero_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_hero DROP CONSTRAINT IF EXISTS _pages_v_blocks_hero_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_form_block DROP CONSTRAINT IF EXISTS _pages_v_blocks_form_block_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_form_block DROP CONSTRAINT IF EXISTS _pages_v_blocks_form_block_form_id_forms_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_feature DROP CONSTRAINT IF EXISTS _pages_v_blocks_feature_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_feature_features DROP CONSTRAINT IF EXISTS _pages_v_blocks_feature_features_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_faq DROP CONSTRAINT IF EXISTS _pages_v_blocks_faq_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_faq_items DROP CONSTRAINT IF EXISTS _pages_v_blocks_faq_items_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_cta DROP CONSTRAINT IF EXISTS _pages_v_blocks_cta_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_cta_links DROP CONSTRAINT IF EXISTS _pages_v_blocks_cta_links_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_content DROP CONSTRAINT IF EXISTS _pages_v_blocks_content_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_content_columns DROP CONSTRAINT IF EXISTS _pages_v_blocks_content_columns_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_contact_us_form DROP CONSTRAINT IF EXISTS _pages_v_blocks_contact_us_form_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_contact_us_form DROP CONSTRAINT IF EXISTS _pages_v_blocks_contact_us_form_form_id_forms_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_contact_hero DROP CONSTRAINT IF EXISTS _pages_v_blocks_contact_hero_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_contact_hero DROP CONSTRAINT IF EXISTS _pages_v_blocks_contact_hero_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_call_to_action_new DROP CONSTRAINT IF EXISTS _pages_v_blocks_call_to_action_new_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_blog DROP CONSTRAINT IF EXISTS _pages_v_blocks_blog_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_archive DROP CONSTRAINT IF EXISTS _pages_v_blocks_archive_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_amenities DROP CONSTRAINT IF EXISTS _pages_v_blocks_amenities_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_amenities DROP CONSTRAINT IF EXISTS _pages_v_blocks_amenities_image_id_media_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_amenities_amenities DROP CONSTRAINT IF EXISTS _pages_v_blocks_amenities_amenities_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_agents DROP CONSTRAINT IF EXISTS _pages_v_blocks_agents_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_about_hero DROP CONSTRAINT IF EXISTS _pages_v_blocks_about_hero_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_about_hero_images DROP CONSTRAINT IF EXISTS _pages_v_blocks_about_hero_images_parent_id_fk;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_about_hero_images DROP CONSTRAINT IF EXISTS _pages_v_blocks_about_hero_images_image_id_media_id_fk;
DROP INDEX IF EXISTS public.users_updated_at_idx;
DROP INDEX IF EXISTS public.users_slug_idx;
DROP INDEX IF EXISTS public.users_sessions_parent_id_idx;
DROP INDEX IF EXISTS public.users_sessions_order_idx;
DROP INDEX IF EXISTS public.users_photo_idx;
DROP INDEX IF EXISTS public.users_email_idx;
DROP INDEX IF EXISTS public.users_created_at_idx;
DROP INDEX IF EXISTS public.testimonials_updated_at_idx;
DROP INDEX IF EXISTS public.testimonials_image_idx;
DROP INDEX IF EXISTS public.testimonials_created_at_idx;
DROP INDEX IF EXISTS public.search_updated_at_idx;
DROP INDEX IF EXISTS public.search_slug_idx;
DROP INDEX IF EXISTS public.search_rels_posts_id_idx;
DROP INDEX IF EXISTS public.search_rels_path_idx;
DROP INDEX IF EXISTS public.search_rels_parent_idx;
DROP INDEX IF EXISTS public.search_rels_order_idx;
DROP INDEX IF EXISTS public.search_meta_meta_image_idx;
DROP INDEX IF EXISTS public.search_created_at_idx;
DROP INDEX IF EXISTS public.search_categories_parent_id_idx;
DROP INDEX IF EXISTS public.search_categories_order_idx;
DROP INDEX IF EXISTS public.reviews_updated_at_idx;
DROP INDEX IF EXISTS public.reviews_realtor_idx;
DROP INDEX IF EXISTS public.reviews_created_at_idx;
DROP INDEX IF EXISTS public.residential_complexes_updated_at_idx;
DROP INDEX IF EXISTS public.residential_complexes_slug_idx;
DROP INDEX IF EXISTS public.residential_complexes_infrastructure_parent_id_idx;
DROP INDEX IF EXISTS public.residential_complexes_infrastructure_order_idx;
DROP INDEX IF EXISTS public.residential_complexes_images_parent_id_idx;
DROP INDEX IF EXISTS public.residential_complexes_images_order_idx;
DROP INDEX IF EXISTS public.residential_complexes_images_image_idx;
DROP INDEX IF EXISTS public.residential_complexes_created_at_idx;
DROP INDEX IF EXISTS public.redirects_updated_at_idx;
DROP INDEX IF EXISTS public.redirects_rels_posts_id_idx;
DROP INDEX IF EXISTS public.redirects_rels_path_idx;
DROP INDEX IF EXISTS public.redirects_rels_parent_idx;
DROP INDEX IF EXISTS public.redirects_rels_pages_id_idx;
DROP INDEX IF EXISTS public.redirects_rels_order_idx;
DROP INDEX IF EXISTS public.redirects_from_idx;
DROP INDEX IF EXISTS public.redirects_created_at_idx;
DROP INDEX IF EXISTS public.properties_updated_at_idx;
DROP INDEX IF EXISTS public.properties_slug_idx;
DROP INDEX IF EXISTS public.properties_images_parent_id_idx;
DROP INDEX IF EXISTS public.properties_images_order_idx;
DROP INDEX IF EXISTS public.properties_images_image_idx;
DROP INDEX IF EXISTS public.properties_features_parent_id_idx;
DROP INDEX IF EXISTS public.properties_features_order_idx;
DROP INDEX IF EXISTS public.properties_created_at_idx;
DROP INDEX IF EXISTS public.posts_updated_at_idx;
DROP INDEX IF EXISTS public.posts_rels_path_idx;
DROP INDEX IF EXISTS public.posts_rels_parent_idx;
DROP INDEX IF EXISTS public.posts_rels_order_idx;
DROP INDEX IF EXISTS public.posts_rels_categories_id_idx;
DROP INDEX IF EXISTS public.posts_meta_meta_image_idx;
DROP INDEX IF EXISTS public.posts_image_idx;
DROP INDEX IF EXISTS public.posts_created_at_idx;
DROP INDEX IF EXISTS public.posts_author_idx;
DROP INDEX IF EXISTS public.payload_preferences_updated_at_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_users_id_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_path_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_parent_idx;
DROP INDEX IF EXISTS public.payload_preferences_rels_order_idx;
DROP INDEX IF EXISTS public.payload_preferences_key_idx;
DROP INDEX IF EXISTS public.payload_preferences_created_at_idx;
DROP INDEX IF EXISTS public.payload_migrations_updated_at_idx;
DROP INDEX IF EXISTS public.payload_migrations_created_at_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_updated_at_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_users_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_testimonials_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_search_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_reviews_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_residential_complexes_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_redirects_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_properties_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_posts_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_payload_jobs_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_path_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_parent_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_pages_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_order_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_messages_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_media_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_lands_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_forms_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_form_submissions_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_flats_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_commercial_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_categories_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_rels_agents_id_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_global_slug_idx;
DROP INDEX IF EXISTS public.payload_locked_documents_created_at_idx;
DROP INDEX IF EXISTS public.payload_jobs_wait_until_idx;
DROP INDEX IF EXISTS public.payload_jobs_updated_at_idx;
DROP INDEX IF EXISTS public.payload_jobs_total_tried_idx;
DROP INDEX IF EXISTS public.payload_jobs_task_slug_idx;
DROP INDEX IF EXISTS public.payload_jobs_queue_idx;
DROP INDEX IF EXISTS public.payload_jobs_processing_idx;
DROP INDEX IF EXISTS public.payload_jobs_log_parent_id_idx;
DROP INDEX IF EXISTS public.payload_jobs_log_order_idx;
DROP INDEX IF EXISTS public.payload_jobs_has_error_idx;
DROP INDEX IF EXISTS public.payload_jobs_created_at_idx;
DROP INDEX IF EXISTS public.payload_jobs_completed_at_idx;
DROP INDEX IF EXISTS public.pages_updated_at_idx;
DROP INDEX IF EXISTS public.pages_slug_idx;
DROP INDEX IF EXISTS public.pages_rels_testimonials_id_idx;
DROP INDEX IF EXISTS public.pages_rels_residential_complexes_id_idx;
DROP INDEX IF EXISTS public.pages_rels_properties_id_idx;
DROP INDEX IF EXISTS public.pages_rels_posts_id_idx;
DROP INDEX IF EXISTS public.pages_rels_path_idx;
DROP INDEX IF EXISTS public.pages_rels_parent_idx;
DROP INDEX IF EXISTS public.pages_rels_pages_id_idx;
DROP INDEX IF EXISTS public.pages_rels_order_idx;
DROP INDEX IF EXISTS public.pages_rels_lands_id_idx;
DROP INDEX IF EXISTS public.pages_rels_flats_id_idx;
DROP INDEX IF EXISTS public.pages_rels_commercial_id_idx;
DROP INDEX IF EXISTS public.pages_rels_categories_id_idx;
DROP INDEX IF EXISTS public.pages_rels_agents_id_idx;
DROP INDEX IF EXISTS public.pages_meta_meta_image_idx;
DROP INDEX IF EXISTS public.pages_hero_links_parent_id_idx;
DROP INDEX IF EXISTS public.pages_hero_links_order_idx;
DROP INDEX IF EXISTS public.pages_hero_hero_media_idx;
DROP INDEX IF EXISTS public.pages_created_at_idx;
DROP INDEX IF EXISTS public.pages_blocks_vision_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_vision_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_vision_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_vision_mission_stats_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_vision_mission_stats_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_vision_mission_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_vision_mission_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_vision_mission_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_vision_items_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_vision_items_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_testimonials_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_testimonials_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_testimonials_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_property_features_property_idx;
DROP INDEX IF EXISTS public.pages_blocks_property_features_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_property_features_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_property_features_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_properties_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_properties_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_properties_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_navbar_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_navbar_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_navbar_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_navbar_links_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_navbar_links_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_navbar_avatar_idx;
DROP INDEX IF EXISTS public.pages_blocks_media_block_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_media_block_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_media_block_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_media_block_media_idx;
DROP INDEX IF EXISTS public.pages_blocks_map_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_map_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_map_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_how_it_works_steps_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_how_it_works_steps_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_how_it_works_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_how_it_works_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_how_it_works_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_house_filter_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_house_filter_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_house_filter_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_house_filter_filters_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_house_filter_filters_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_house_filter_filters_fields_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_house_filter_filters_fields_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_house_filter_filters_fields_options_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_house_filter_filters_fields_options_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_hero_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_hero_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_hero_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_hero_image_idx;
DROP INDEX IF EXISTS public.pages_blocks_form_block_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_form_block_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_form_block_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_form_block_form_idx;
DROP INDEX IF EXISTS public.pages_blocks_feature_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_feature_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_feature_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_feature_features_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_feature_features_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_faq_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_faq_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_faq_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_faq_items_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_faq_items_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_cta_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_cta_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_cta_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_cta_links_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_cta_links_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_content_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_content_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_content_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_content_columns_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_content_columns_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_contact_us_form_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_contact_us_form_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_contact_us_form_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_contact_us_form_form_idx;
DROP INDEX IF EXISTS public.pages_blocks_contact_hero_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_contact_hero_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_contact_hero_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_contact_hero_image_idx;
DROP INDEX IF EXISTS public.pages_blocks_call_to_action_new_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_call_to_action_new_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_call_to_action_new_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_blog_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_blog_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_blog_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_archive_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_archive_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_archive_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_amenities_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_amenities_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_amenities_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_amenities_image_idx;
DROP INDEX IF EXISTS public.pages_blocks_amenities_amenities_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_amenities_amenities_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_agents_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_agents_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_agents_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_about_hero_path_idx;
DROP INDEX IF EXISTS public.pages_blocks_about_hero_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_about_hero_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_about_hero_images_parent_id_idx;
DROP INDEX IF EXISTS public.pages_blocks_about_hero_images_order_idx;
DROP INDEX IF EXISTS public.pages_blocks_about_hero_images_image_idx;
DROP INDEX IF EXISTS public.pages__status_idx;
DROP INDEX IF EXISTS public.messages_updated_at_idx;
DROP INDEX IF EXISTS public.messages_realtor_idx;
DROP INDEX IF EXISTS public.messages_created_at_idx;
DROP INDEX IF EXISTS public.messages_attachment_idx;
DROP INDEX IF EXISTS public.media_updated_at_idx;
DROP INDEX IF EXISTS public.media_sizes_xlarge_sizes_xlarge_filename_idx;
DROP INDEX IF EXISTS public.media_sizes_thumbnail_sizes_thumbnail_filename_idx;
DROP INDEX IF EXISTS public.media_sizes_square_sizes_square_filename_idx;
DROP INDEX IF EXISTS public.media_sizes_small_sizes_small_filename_idx;
DROP INDEX IF EXISTS public.media_sizes_og_sizes_og_filename_idx;
DROP INDEX IF EXISTS public.media_sizes_medium_sizes_medium_filename_idx;
DROP INDEX IF EXISTS public.media_sizes_large_sizes_large_filename_idx;
DROP INDEX IF EXISTS public.media_filename_idx;
DROP INDEX IF EXISTS public.media_created_at_idx;
DROP INDEX IF EXISTS public.lands_updated_at_idx;
DROP INDEX IF EXISTS public.lands_slug_idx;
DROP INDEX IF EXISTS public.lands_images_parent_id_idx;
DROP INDEX IF EXISTS public.lands_images_order_idx;
DROP INDEX IF EXISTS public.lands_images_image_idx;
DROP INDEX IF EXISTS public.lands_created_at_idx;
DROP INDEX IF EXISTS public.lands_communications_parent_id_idx;
DROP INDEX IF EXISTS public.lands_communications_order_idx;
DROP INDEX IF EXISTS public.header_rels_posts_id_idx;
DROP INDEX IF EXISTS public.header_rels_path_idx;
DROP INDEX IF EXISTS public.header_rels_parent_idx;
DROP INDEX IF EXISTS public.header_rels_pages_id_idx;
DROP INDEX IF EXISTS public.header_rels_order_idx;
DROP INDEX IF EXISTS public.header_nav_items_parent_id_idx;
DROP INDEX IF EXISTS public.header_nav_items_order_idx;
DROP INDEX IF EXISTS public.forms_updated_at_idx;
DROP INDEX IF EXISTS public.forms_emails_parent_id_idx;
DROP INDEX IF EXISTS public.forms_emails_order_idx;
DROP INDEX IF EXISTS public.forms_created_at_idx;
DROP INDEX IF EXISTS public.forms_blocks_textarea_path_idx;
DROP INDEX IF EXISTS public.forms_blocks_textarea_parent_id_idx;
DROP INDEX IF EXISTS public.forms_blocks_textarea_order_idx;
DROP INDEX IF EXISTS public.forms_blocks_text_path_idx;
DROP INDEX IF EXISTS public.forms_blocks_text_parent_id_idx;
DROP INDEX IF EXISTS public.forms_blocks_text_order_idx;
DROP INDEX IF EXISTS public.forms_blocks_state_path_idx;
DROP INDEX IF EXISTS public.forms_blocks_state_parent_id_idx;
DROP INDEX IF EXISTS public.forms_blocks_state_order_idx;
DROP INDEX IF EXISTS public.forms_blocks_select_path_idx;
DROP INDEX IF EXISTS public.forms_blocks_select_parent_id_idx;
DROP INDEX IF EXISTS public.forms_blocks_select_order_idx;
DROP INDEX IF EXISTS public.forms_blocks_select_options_parent_id_idx;
DROP INDEX IF EXISTS public.forms_blocks_select_options_order_idx;
DROP INDEX IF EXISTS public.forms_blocks_number_path_idx;
DROP INDEX IF EXISTS public.forms_blocks_number_parent_id_idx;
DROP INDEX IF EXISTS public.forms_blocks_number_order_idx;
DROP INDEX IF EXISTS public.forms_blocks_message_path_idx;
DROP INDEX IF EXISTS public.forms_blocks_message_parent_id_idx;
DROP INDEX IF EXISTS public.forms_blocks_message_order_idx;
DROP INDEX IF EXISTS public.forms_blocks_email_path_idx;
DROP INDEX IF EXISTS public.forms_blocks_email_parent_id_idx;
DROP INDEX IF EXISTS public.forms_blocks_email_order_idx;
DROP INDEX IF EXISTS public.forms_blocks_country_path_idx;
DROP INDEX IF EXISTS public.forms_blocks_country_parent_id_idx;
DROP INDEX IF EXISTS public.forms_blocks_country_order_idx;
DROP INDEX IF EXISTS public.forms_blocks_checkbox_path_idx;
DROP INDEX IF EXISTS public.forms_blocks_checkbox_parent_id_idx;
DROP INDEX IF EXISTS public.forms_blocks_checkbox_order_idx;
DROP INDEX IF EXISTS public.form_submissions_updated_at_idx;
DROP INDEX IF EXISTS public.form_submissions_submission_data_parent_id_idx;
DROP INDEX IF EXISTS public.form_submissions_submission_data_order_idx;
DROP INDEX IF EXISTS public.form_submissions_form_idx;
DROP INDEX IF EXISTS public.form_submissions_created_at_idx;
DROP INDEX IF EXISTS public.footer_rels_posts_id_idx;
DROP INDEX IF EXISTS public.footer_rels_path_idx;
DROP INDEX IF EXISTS public.footer_rels_parent_idx;
DROP INDEX IF EXISTS public.footer_rels_pages_id_idx;
DROP INDEX IF EXISTS public.footer_rels_order_idx;
DROP INDEX IF EXISTS public.footer_nav_items_parent_id_idx;
DROP INDEX IF EXISTS public.footer_nav_items_order_idx;
DROP INDEX IF EXISTS public.flats_updated_at_idx;
DROP INDEX IF EXISTS public.flats_slug_idx;
DROP INDEX IF EXISTS public.flats_residential_complex_idx;
DROP INDEX IF EXISTS public.flats_realtor_idx;
DROP INDEX IF EXISTS public.flats_layout_idx;
DROP INDEX IF EXISTS public.flats_images_parent_id_idx;
DROP INDEX IF EXISTS public.flats_images_order_idx;
DROP INDEX IF EXISTS public.flats_images_image_idx;
DROP INDEX IF EXISTS public.flats_created_at_idx;
DROP INDEX IF EXISTS public.flats_amenities_parent_id_idx;
DROP INDEX IF EXISTS public.flats_amenities_order_idx;
DROP INDEX IF EXISTS public.commercial_utilities_parent_id_idx;
DROP INDEX IF EXISTS public.commercial_utilities_order_idx;
DROP INDEX IF EXISTS public.commercial_updated_at_idx;
DROP INDEX IF EXISTS public.commercial_slug_idx;
DROP INDEX IF EXISTS public.commercial_images_parent_id_idx;
DROP INDEX IF EXISTS public.commercial_images_order_idx;
DROP INDEX IF EXISTS public.commercial_images_image_idx;
DROP INDEX IF EXISTS public.commercial_created_at_idx;
DROP INDEX IF EXISTS public.categories_updated_at_idx;
DROP INDEX IF EXISTS public.categories_slug_idx;
DROP INDEX IF EXISTS public.categories_parent_idx;
DROP INDEX IF EXISTS public.categories_created_at_idx;
DROP INDEX IF EXISTS public.categories_breadcrumbs_parent_id_idx;
DROP INDEX IF EXISTS public.categories_breadcrumbs_order_idx;
DROP INDEX IF EXISTS public.categories_breadcrumbs_doc_idx;
DROP INDEX IF EXISTS public.agents_updated_at_idx;
DROP INDEX IF EXISTS public.agents_social_links_parent_id_idx;
DROP INDEX IF EXISTS public.agents_social_links_order_idx;
DROP INDEX IF EXISTS public.agents_image_idx;
DROP INDEX IF EXISTS public.agents_created_at_idx;
DROP INDEX IF EXISTS public._pages_v_version_version_updated_at_idx;
DROP INDEX IF EXISTS public._pages_v_version_version_slug_idx;
DROP INDEX IF EXISTS public._pages_v_version_version_created_at_idx;
DROP INDEX IF EXISTS public._pages_v_version_version__status_idx;
DROP INDEX IF EXISTS public._pages_v_version_meta_version_meta_image_idx;
DROP INDEX IF EXISTS public._pages_v_version_hero_version_hero_media_idx;
DROP INDEX IF EXISTS public._pages_v_version_hero_links_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_version_hero_links_order_idx;
DROP INDEX IF EXISTS public._pages_v_updated_at_idx;
DROP INDEX IF EXISTS public._pages_v_rels_testimonials_id_idx;
DROP INDEX IF EXISTS public._pages_v_rels_residential_complexes_id_idx;
DROP INDEX IF EXISTS public._pages_v_rels_properties_id_idx;
DROP INDEX IF EXISTS public._pages_v_rels_posts_id_idx;
DROP INDEX IF EXISTS public._pages_v_rels_path_idx;
DROP INDEX IF EXISTS public._pages_v_rels_parent_idx;
DROP INDEX IF EXISTS public._pages_v_rels_pages_id_idx;
DROP INDEX IF EXISTS public._pages_v_rels_order_idx;
DROP INDEX IF EXISTS public._pages_v_rels_lands_id_idx;
DROP INDEX IF EXISTS public._pages_v_rels_flats_id_idx;
DROP INDEX IF EXISTS public._pages_v_rels_commercial_id_idx;
DROP INDEX IF EXISTS public._pages_v_rels_categories_id_idx;
DROP INDEX IF EXISTS public._pages_v_rels_agents_id_idx;
DROP INDEX IF EXISTS public._pages_v_parent_idx;
DROP INDEX IF EXISTS public._pages_v_latest_idx;
DROP INDEX IF EXISTS public._pages_v_created_at_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_vision_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_vision_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_vision_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_vision_mission_stats_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_vision_mission_stats_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_vision_mission_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_vision_mission_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_vision_mission_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_vision_items_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_vision_items_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_testimonials_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_testimonials_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_testimonials_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_property_features_property_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_property_features_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_property_features_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_property_features_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_properties_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_properties_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_properties_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_navbar_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_navbar_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_navbar_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_navbar_links_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_navbar_links_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_navbar_avatar_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_media_block_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_media_block_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_media_block_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_media_block_media_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_map_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_map_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_map_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_how_it_works_steps_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_how_it_works_steps_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_how_it_works_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_how_it_works_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_how_it_works_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_house_filter_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_house_filter_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_house_filter_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_house_filter_filters_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_house_filter_filters_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_house_filter_filters_fields_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_house_filter_filters_fields_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_house_filter_filters_fields_options_parent_id_i;
DROP INDEX IF EXISTS public._pages_v_blocks_house_filter_filters_fields_options_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_hero_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_hero_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_hero_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_hero_image_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_form_block_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_form_block_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_form_block_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_form_block_form_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_feature_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_feature_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_feature_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_feature_features_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_feature_features_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_faq_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_faq_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_faq_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_faq_items_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_faq_items_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_cta_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_cta_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_cta_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_cta_links_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_cta_links_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_content_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_content_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_content_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_content_columns_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_content_columns_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_contact_us_form_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_contact_us_form_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_contact_us_form_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_contact_us_form_form_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_contact_hero_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_contact_hero_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_contact_hero_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_contact_hero_image_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_call_to_action_new_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_call_to_action_new_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_call_to_action_new_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_blog_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_blog_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_blog_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_archive_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_archive_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_archive_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_amenities_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_amenities_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_amenities_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_amenities_image_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_amenities_amenities_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_amenities_amenities_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_agents_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_agents_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_agents_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_about_hero_path_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_about_hero_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_about_hero_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_about_hero_images_parent_id_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_about_hero_images_order_idx;
DROP INDEX IF EXISTS public._pages_v_blocks_about_hero_images_image_idx;
DROP INDEX IF EXISTS public._pages_v_autosave_idx;
ALTER TABLE IF EXISTS ONLY public.users_sessions DROP CONSTRAINT IF EXISTS users_sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.testimonials DROP CONSTRAINT IF EXISTS testimonials_pkey;
ALTER TABLE IF EXISTS ONLY public.search_rels DROP CONSTRAINT IF EXISTS search_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.search DROP CONSTRAINT IF EXISTS search_pkey;
ALTER TABLE IF EXISTS ONLY public.search_categories DROP CONSTRAINT IF EXISTS search_categories_pkey;
ALTER TABLE IF EXISTS ONLY public.reviews DROP CONSTRAINT IF EXISTS reviews_pkey;
ALTER TABLE IF EXISTS ONLY public.residential_complexes DROP CONSTRAINT IF EXISTS residential_complexes_pkey;
ALTER TABLE IF EXISTS ONLY public.residential_complexes_infrastructure DROP CONSTRAINT IF EXISTS residential_complexes_infrastructure_pkey;
ALTER TABLE IF EXISTS ONLY public.residential_complexes_images DROP CONSTRAINT IF EXISTS residential_complexes_images_pkey;
ALTER TABLE IF EXISTS ONLY public.redirects_rels DROP CONSTRAINT IF EXISTS redirects_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.redirects DROP CONSTRAINT IF EXISTS redirects_pkey;
ALTER TABLE IF EXISTS ONLY public.properties DROP CONSTRAINT IF EXISTS properties_pkey;
ALTER TABLE IF EXISTS ONLY public.properties_images DROP CONSTRAINT IF EXISTS properties_images_pkey;
ALTER TABLE IF EXISTS ONLY public.properties_features DROP CONSTRAINT IF EXISTS properties_features_pkey;
ALTER TABLE IF EXISTS ONLY public.posts_rels DROP CONSTRAINT IF EXISTS posts_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS posts_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_preferences_rels DROP CONSTRAINT IF EXISTS payload_preferences_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_preferences DROP CONSTRAINT IF EXISTS payload_preferences_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_migrations DROP CONSTRAINT IF EXISTS payload_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents_rels DROP CONSTRAINT IF EXISTS payload_locked_documents_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_locked_documents DROP CONSTRAINT IF EXISTS payload_locked_documents_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_jobs DROP CONSTRAINT IF EXISTS payload_jobs_pkey;
ALTER TABLE IF EXISTS ONLY public.payload_jobs_log DROP CONSTRAINT IF EXISTS payload_jobs_log_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_rels DROP CONSTRAINT IF EXISTS pages_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.pages DROP CONSTRAINT IF EXISTS pages_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_hero_links DROP CONSTRAINT IF EXISTS pages_hero_links_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_vision DROP CONSTRAINT IF EXISTS pages_blocks_vision_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_vision_mission_stats DROP CONSTRAINT IF EXISTS pages_blocks_vision_mission_stats_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_vision_mission DROP CONSTRAINT IF EXISTS pages_blocks_vision_mission_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_vision_items DROP CONSTRAINT IF EXISTS pages_blocks_vision_items_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_testimonials DROP CONSTRAINT IF EXISTS pages_blocks_testimonials_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_property_features DROP CONSTRAINT IF EXISTS pages_blocks_property_features_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_properties DROP CONSTRAINT IF EXISTS pages_blocks_properties_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_navbar DROP CONSTRAINT IF EXISTS pages_blocks_navbar_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_navbar_links DROP CONSTRAINT IF EXISTS pages_blocks_navbar_links_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_media_block DROP CONSTRAINT IF EXISTS pages_blocks_media_block_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_map DROP CONSTRAINT IF EXISTS pages_blocks_map_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_how_it_works_steps DROP CONSTRAINT IF EXISTS pages_blocks_how_it_works_steps_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_how_it_works DROP CONSTRAINT IF EXISTS pages_blocks_how_it_works_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_house_filter DROP CONSTRAINT IF EXISTS pages_blocks_house_filter_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_house_filter_filters DROP CONSTRAINT IF EXISTS pages_blocks_house_filter_filters_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_house_filter_filters_fields DROP CONSTRAINT IF EXISTS pages_blocks_house_filter_filters_fields_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_house_filter_filters_fields_options DROP CONSTRAINT IF EXISTS pages_blocks_house_filter_filters_fields_options_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_hero DROP CONSTRAINT IF EXISTS pages_blocks_hero_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_form_block DROP CONSTRAINT IF EXISTS pages_blocks_form_block_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_feature DROP CONSTRAINT IF EXISTS pages_blocks_feature_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_feature_features DROP CONSTRAINT IF EXISTS pages_blocks_feature_features_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_faq DROP CONSTRAINT IF EXISTS pages_blocks_faq_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_faq_items DROP CONSTRAINT IF EXISTS pages_blocks_faq_items_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_cta DROP CONSTRAINT IF EXISTS pages_blocks_cta_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_cta_links DROP CONSTRAINT IF EXISTS pages_blocks_cta_links_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_content DROP CONSTRAINT IF EXISTS pages_blocks_content_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_content_columns DROP CONSTRAINT IF EXISTS pages_blocks_content_columns_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_contact_us_form DROP CONSTRAINT IF EXISTS pages_blocks_contact_us_form_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_contact_hero DROP CONSTRAINT IF EXISTS pages_blocks_contact_hero_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_call_to_action_new DROP CONSTRAINT IF EXISTS pages_blocks_call_to_action_new_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_blog DROP CONSTRAINT IF EXISTS pages_blocks_blog_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_archive DROP CONSTRAINT IF EXISTS pages_blocks_archive_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_amenities DROP CONSTRAINT IF EXISTS pages_blocks_amenities_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_amenities_amenities DROP CONSTRAINT IF EXISTS pages_blocks_amenities_amenities_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_agents DROP CONSTRAINT IF EXISTS pages_blocks_agents_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_about_hero DROP CONSTRAINT IF EXISTS pages_blocks_about_hero_pkey;
ALTER TABLE IF EXISTS ONLY public.pages_blocks_about_hero_images DROP CONSTRAINT IF EXISTS pages_blocks_about_hero_images_pkey;
ALTER TABLE IF EXISTS ONLY public.messages DROP CONSTRAINT IF EXISTS messages_pkey;
ALTER TABLE IF EXISTS ONLY public.media DROP CONSTRAINT IF EXISTS media_pkey;
ALTER TABLE IF EXISTS ONLY public.lands DROP CONSTRAINT IF EXISTS lands_pkey;
ALTER TABLE IF EXISTS ONLY public.lands_images DROP CONSTRAINT IF EXISTS lands_images_pkey;
ALTER TABLE IF EXISTS ONLY public.lands_communications DROP CONSTRAINT IF EXISTS lands_communications_pkey;
ALTER TABLE IF EXISTS ONLY public.header_rels DROP CONSTRAINT IF EXISTS header_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.header DROP CONSTRAINT IF EXISTS header_pkey;
ALTER TABLE IF EXISTS ONLY public.header_nav_items DROP CONSTRAINT IF EXISTS header_nav_items_pkey;
ALTER TABLE IF EXISTS ONLY public.forms DROP CONSTRAINT IF EXISTS forms_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_emails DROP CONSTRAINT IF EXISTS forms_emails_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_textarea DROP CONSTRAINT IF EXISTS forms_blocks_textarea_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_text DROP CONSTRAINT IF EXISTS forms_blocks_text_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_state DROP CONSTRAINT IF EXISTS forms_blocks_state_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_select DROP CONSTRAINT IF EXISTS forms_blocks_select_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_select_options DROP CONSTRAINT IF EXISTS forms_blocks_select_options_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_number DROP CONSTRAINT IF EXISTS forms_blocks_number_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_message DROP CONSTRAINT IF EXISTS forms_blocks_message_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_email DROP CONSTRAINT IF EXISTS forms_blocks_email_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_country DROP CONSTRAINT IF EXISTS forms_blocks_country_pkey;
ALTER TABLE IF EXISTS ONLY public.forms_blocks_checkbox DROP CONSTRAINT IF EXISTS forms_blocks_checkbox_pkey;
ALTER TABLE IF EXISTS ONLY public.form_submissions_submission_data DROP CONSTRAINT IF EXISTS form_submissions_submission_data_pkey;
ALTER TABLE IF EXISTS ONLY public.form_submissions DROP CONSTRAINT IF EXISTS form_submissions_pkey;
ALTER TABLE IF EXISTS ONLY public.footer_rels DROP CONSTRAINT IF EXISTS footer_rels_pkey;
ALTER TABLE IF EXISTS ONLY public.footer DROP CONSTRAINT IF EXISTS footer_pkey;
ALTER TABLE IF EXISTS ONLY public.footer_nav_items DROP CONSTRAINT IF EXISTS footer_nav_items_pkey;
ALTER TABLE IF EXISTS ONLY public.flats DROP CONSTRAINT IF EXISTS flats_pkey;
ALTER TABLE IF EXISTS ONLY public.flats_images DROP CONSTRAINT IF EXISTS flats_images_pkey;
ALTER TABLE IF EXISTS ONLY public.flats_amenities DROP CONSTRAINT IF EXISTS flats_amenities_pkey;
ALTER TABLE IF EXISTS ONLY public.commercial_utilities DROP CONSTRAINT IF EXISTS commercial_utilities_pkey;
ALTER TABLE IF EXISTS ONLY public.commercial DROP CONSTRAINT IF EXISTS commercial_pkey;
ALTER TABLE IF EXISTS ONLY public.commercial_images DROP CONSTRAINT IF EXISTS commercial_images_pkey;
ALTER TABLE IF EXISTS ONLY public.categories DROP CONSTRAINT IF EXISTS categories_pkey;
ALTER TABLE IF EXISTS ONLY public.categories_breadcrumbs DROP CONSTRAINT IF EXISTS categories_breadcrumbs_pkey;
ALTER TABLE IF EXISTS ONLY public.agents_social_links DROP CONSTRAINT IF EXISTS agents_social_links_pkey;
ALTER TABLE IF EXISTS ONLY public.agents DROP CONSTRAINT IF EXISTS agents_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_version_hero_links DROP CONSTRAINT IF EXISTS _pages_v_version_hero_links_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_rels DROP CONSTRAINT IF EXISTS _pages_v_rels_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v DROP CONSTRAINT IF EXISTS _pages_v_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_vision DROP CONSTRAINT IF EXISTS _pages_v_blocks_vision_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_vision_mission_stats DROP CONSTRAINT IF EXISTS _pages_v_blocks_vision_mission_stats_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_vision_mission DROP CONSTRAINT IF EXISTS _pages_v_blocks_vision_mission_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_vision_items DROP CONSTRAINT IF EXISTS _pages_v_blocks_vision_items_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_testimonials DROP CONSTRAINT IF EXISTS _pages_v_blocks_testimonials_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_property_features DROP CONSTRAINT IF EXISTS _pages_v_blocks_property_features_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_properties DROP CONSTRAINT IF EXISTS _pages_v_blocks_properties_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_navbar DROP CONSTRAINT IF EXISTS _pages_v_blocks_navbar_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_navbar_links DROP CONSTRAINT IF EXISTS _pages_v_blocks_navbar_links_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_media_block DROP CONSTRAINT IF EXISTS _pages_v_blocks_media_block_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_map DROP CONSTRAINT IF EXISTS _pages_v_blocks_map_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_how_it_works_steps DROP CONSTRAINT IF EXISTS _pages_v_blocks_how_it_works_steps_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_how_it_works DROP CONSTRAINT IF EXISTS _pages_v_blocks_how_it_works_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_house_filter DROP CONSTRAINT IF EXISTS _pages_v_blocks_house_filter_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_house_filter_filters DROP CONSTRAINT IF EXISTS _pages_v_blocks_house_filter_filters_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_house_filter_filters_fields DROP CONSTRAINT IF EXISTS _pages_v_blocks_house_filter_filters_fields_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_house_filter_filters_fields_options DROP CONSTRAINT IF EXISTS _pages_v_blocks_house_filter_filters_fields_options_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_hero DROP CONSTRAINT IF EXISTS _pages_v_blocks_hero_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_form_block DROP CONSTRAINT IF EXISTS _pages_v_blocks_form_block_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_feature DROP CONSTRAINT IF EXISTS _pages_v_blocks_feature_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_feature_features DROP CONSTRAINT IF EXISTS _pages_v_blocks_feature_features_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_faq DROP CONSTRAINT IF EXISTS _pages_v_blocks_faq_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_faq_items DROP CONSTRAINT IF EXISTS _pages_v_blocks_faq_items_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_cta DROP CONSTRAINT IF EXISTS _pages_v_blocks_cta_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_cta_links DROP CONSTRAINT IF EXISTS _pages_v_blocks_cta_links_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_content DROP CONSTRAINT IF EXISTS _pages_v_blocks_content_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_content_columns DROP CONSTRAINT IF EXISTS _pages_v_blocks_content_columns_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_contact_us_form DROP CONSTRAINT IF EXISTS _pages_v_blocks_contact_us_form_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_contact_hero DROP CONSTRAINT IF EXISTS _pages_v_blocks_contact_hero_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_call_to_action_new DROP CONSTRAINT IF EXISTS _pages_v_blocks_call_to_action_new_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_blog DROP CONSTRAINT IF EXISTS _pages_v_blocks_blog_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_archive DROP CONSTRAINT IF EXISTS _pages_v_blocks_archive_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_amenities DROP CONSTRAINT IF EXISTS _pages_v_blocks_amenities_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_amenities_amenities DROP CONSTRAINT IF EXISTS _pages_v_blocks_amenities_amenities_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_agents DROP CONSTRAINT IF EXISTS _pages_v_blocks_agents_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_about_hero DROP CONSTRAINT IF EXISTS _pages_v_blocks_about_hero_pkey;
ALTER TABLE IF EXISTS ONLY public._pages_v_blocks_about_hero_images DROP CONSTRAINT IF EXISTS _pages_v_blocks_about_hero_images_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.testimonials ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.search_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.search ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.reviews ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.residential_complexes ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.redirects_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.redirects ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.properties ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.posts_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.posts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_preferences_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_preferences ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_locked_documents_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_locked_documents ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.payload_jobs ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.pages_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.pages ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.messages ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.media ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.lands ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.header_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.header ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.forms ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.form_submissions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.footer_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.footer ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.flats ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.commercial ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.categories ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.agents ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_version_hero_links ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_rels ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_vision_mission_stats ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_vision_mission ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_vision_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_vision ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_testimonials ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_property_features ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_properties ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_navbar_links ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_navbar ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_media_block ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_map ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_how_it_works_steps ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_how_it_works ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_house_filter_filters_fields_options ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_house_filter_filters_fields ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_house_filter_filters ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_house_filter ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_hero ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_form_block ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_feature_features ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_feature ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_faq_items ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_faq ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_cta_links ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_cta ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_content_columns ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_content ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_contact_us_form ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_contact_hero ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_call_to_action_new ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_blog ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_archive ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_amenities_amenities ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_amenities ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_agents ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_about_hero_images ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v_blocks_about_hero ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public._pages_v ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.users_sessions;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.testimonials_id_seq;
DROP TABLE IF EXISTS public.testimonials;
DROP SEQUENCE IF EXISTS public.search_rels_id_seq;
DROP TABLE IF EXISTS public.search_rels;
DROP SEQUENCE IF EXISTS public.search_id_seq;
DROP TABLE IF EXISTS public.search_categories;
DROP TABLE IF EXISTS public.search;
DROP SEQUENCE IF EXISTS public.reviews_id_seq;
DROP TABLE IF EXISTS public.reviews;
DROP TABLE IF EXISTS public.residential_complexes_infrastructure;
DROP TABLE IF EXISTS public.residential_complexes_images;
DROP SEQUENCE IF EXISTS public.residential_complexes_id_seq;
DROP TABLE IF EXISTS public.residential_complexes;
DROP SEQUENCE IF EXISTS public.redirects_rels_id_seq;
DROP TABLE IF EXISTS public.redirects_rels;
DROP SEQUENCE IF EXISTS public.redirects_id_seq;
DROP TABLE IF EXISTS public.redirects;
DROP TABLE IF EXISTS public.properties_images;
DROP SEQUENCE IF EXISTS public.properties_id_seq;
DROP TABLE IF EXISTS public.properties_features;
DROP TABLE IF EXISTS public.properties;
DROP SEQUENCE IF EXISTS public.posts_rels_id_seq;
DROP TABLE IF EXISTS public.posts_rels;
DROP SEQUENCE IF EXISTS public.posts_id_seq;
DROP TABLE IF EXISTS public.posts;
DROP SEQUENCE IF EXISTS public.payload_preferences_rels_id_seq;
DROP TABLE IF EXISTS public.payload_preferences_rels;
DROP SEQUENCE IF EXISTS public.payload_preferences_id_seq;
DROP TABLE IF EXISTS public.payload_preferences;
DROP SEQUENCE IF EXISTS public.payload_migrations_id_seq;
DROP TABLE IF EXISTS public.payload_migrations;
DROP SEQUENCE IF EXISTS public.payload_locked_documents_rels_id_seq;
DROP TABLE IF EXISTS public.payload_locked_documents_rels;
DROP SEQUENCE IF EXISTS public.payload_locked_documents_id_seq;
DROP TABLE IF EXISTS public.payload_locked_documents;
DROP TABLE IF EXISTS public.payload_jobs_log;
DROP SEQUENCE IF EXISTS public.payload_jobs_id_seq;
DROP TABLE IF EXISTS public.payload_jobs;
DROP SEQUENCE IF EXISTS public.pages_rels_id_seq;
DROP TABLE IF EXISTS public.pages_rels;
DROP SEQUENCE IF EXISTS public.pages_id_seq;
DROP TABLE IF EXISTS public.pages_hero_links;
DROP TABLE IF EXISTS public.pages_blocks_vision_mission_stats;
DROP TABLE IF EXISTS public.pages_blocks_vision_mission;
DROP TABLE IF EXISTS public.pages_blocks_vision_items;
DROP TABLE IF EXISTS public.pages_blocks_vision;
DROP TABLE IF EXISTS public.pages_blocks_testimonials;
DROP TABLE IF EXISTS public.pages_blocks_property_features;
DROP TABLE IF EXISTS public.pages_blocks_properties;
DROP TABLE IF EXISTS public.pages_blocks_navbar_links;
DROP TABLE IF EXISTS public.pages_blocks_navbar;
DROP TABLE IF EXISTS public.pages_blocks_media_block;
DROP TABLE IF EXISTS public.pages_blocks_map;
DROP TABLE IF EXISTS public.pages_blocks_how_it_works_steps;
DROP TABLE IF EXISTS public.pages_blocks_how_it_works;
DROP TABLE IF EXISTS public.pages_blocks_house_filter_filters_fields_options;
DROP TABLE IF EXISTS public.pages_blocks_house_filter_filters_fields;
DROP TABLE IF EXISTS public.pages_blocks_house_filter_filters;
DROP TABLE IF EXISTS public.pages_blocks_house_filter;
DROP TABLE IF EXISTS public.pages_blocks_hero;
DROP TABLE IF EXISTS public.pages_blocks_form_block;
DROP TABLE IF EXISTS public.pages_blocks_feature_features;
DROP TABLE IF EXISTS public.pages_blocks_feature;
DROP TABLE IF EXISTS public.pages_blocks_faq_items;
DROP TABLE IF EXISTS public.pages_blocks_faq;
DROP TABLE IF EXISTS public.pages_blocks_cta_links;
DROP TABLE IF EXISTS public.pages_blocks_cta;
DROP TABLE IF EXISTS public.pages_blocks_content_columns;
DROP TABLE IF EXISTS public.pages_blocks_content;
DROP TABLE IF EXISTS public.pages_blocks_contact_us_form;
DROP TABLE IF EXISTS public.pages_blocks_contact_hero;
DROP TABLE IF EXISTS public.pages_blocks_call_to_action_new;
DROP TABLE IF EXISTS public.pages_blocks_blog;
DROP TABLE IF EXISTS public.pages_blocks_archive;
DROP TABLE IF EXISTS public.pages_blocks_amenities_amenities;
DROP TABLE IF EXISTS public.pages_blocks_amenities;
DROP TABLE IF EXISTS public.pages_blocks_agents;
DROP TABLE IF EXISTS public.pages_blocks_about_hero_images;
DROP TABLE IF EXISTS public.pages_blocks_about_hero;
DROP TABLE IF EXISTS public.pages;
DROP SEQUENCE IF EXISTS public.messages_id_seq;
DROP TABLE IF EXISTS public.messages;
DROP SEQUENCE IF EXISTS public.media_id_seq;
DROP TABLE IF EXISTS public.media;
DROP TABLE IF EXISTS public.lands_images;
DROP SEQUENCE IF EXISTS public.lands_id_seq;
DROP TABLE IF EXISTS public.lands_communications;
DROP TABLE IF EXISTS public.lands;
DROP SEQUENCE IF EXISTS public.header_rels_id_seq;
DROP TABLE IF EXISTS public.header_rels;
DROP TABLE IF EXISTS public.header_nav_items;
DROP SEQUENCE IF EXISTS public.header_id_seq;
DROP TABLE IF EXISTS public.header;
DROP SEQUENCE IF EXISTS public.forms_id_seq;
DROP TABLE IF EXISTS public.forms_emails;
DROP TABLE IF EXISTS public.forms_blocks_textarea;
DROP TABLE IF EXISTS public.forms_blocks_text;
DROP TABLE IF EXISTS public.forms_blocks_state;
DROP TABLE IF EXISTS public.forms_blocks_select_options;
DROP TABLE IF EXISTS public.forms_blocks_select;
DROP TABLE IF EXISTS public.forms_blocks_number;
DROP TABLE IF EXISTS public.forms_blocks_message;
DROP TABLE IF EXISTS public.forms_blocks_email;
DROP TABLE IF EXISTS public.forms_blocks_country;
DROP TABLE IF EXISTS public.forms_blocks_checkbox;
DROP TABLE IF EXISTS public.forms;
DROP TABLE IF EXISTS public.form_submissions_submission_data;
DROP SEQUENCE IF EXISTS public.form_submissions_id_seq;
DROP TABLE IF EXISTS public.form_submissions;
DROP SEQUENCE IF EXISTS public.footer_rels_id_seq;
DROP TABLE IF EXISTS public.footer_rels;
DROP TABLE IF EXISTS public.footer_nav_items;
DROP SEQUENCE IF EXISTS public.footer_id_seq;
DROP TABLE IF EXISTS public.footer;
DROP TABLE IF EXISTS public.flats_images;
DROP SEQUENCE IF EXISTS public.flats_id_seq;
DROP TABLE IF EXISTS public.flats_amenities;
DROP TABLE IF EXISTS public.flats;
DROP TABLE IF EXISTS public.commercial_utilities;
DROP TABLE IF EXISTS public.commercial_images;
DROP SEQUENCE IF EXISTS public.commercial_id_seq;
DROP TABLE IF EXISTS public.commercial;
DROP SEQUENCE IF EXISTS public.categories_id_seq;
DROP TABLE IF EXISTS public.categories_breadcrumbs;
DROP TABLE IF EXISTS public.categories;
DROP TABLE IF EXISTS public.agents_social_links;
DROP SEQUENCE IF EXISTS public.agents_id_seq;
DROP TABLE IF EXISTS public.agents;
DROP SEQUENCE IF EXISTS public._pages_v_version_hero_links_id_seq;
DROP TABLE IF EXISTS public._pages_v_version_hero_links;
DROP SEQUENCE IF EXISTS public._pages_v_rels_id_seq;
DROP TABLE IF EXISTS public._pages_v_rels;
DROP SEQUENCE IF EXISTS public._pages_v_id_seq;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_vision_mission_stats_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_vision_mission_stats;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_vision_mission_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_vision_mission;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_vision_items_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_vision_items;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_vision_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_vision;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_testimonials_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_testimonials;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_property_features_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_property_features;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_properties_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_properties;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_navbar_links_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_navbar_links;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_navbar_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_navbar;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_media_block_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_media_block;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_map_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_map;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_how_it_works_steps_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_how_it_works_steps;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_how_it_works_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_how_it_works;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_house_filter_id_seq;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_house_filter_filters_id_seq;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_house_filter_filters_fields_options_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_house_filter_filters_fields_options;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_house_filter_filters_fields_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_house_filter_filters_fields;
DROP TABLE IF EXISTS public._pages_v_blocks_house_filter_filters;
DROP TABLE IF EXISTS public._pages_v_blocks_house_filter;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_hero_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_hero;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_form_block_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_form_block;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_feature_id_seq;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_feature_features_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_feature_features;
DROP TABLE IF EXISTS public._pages_v_blocks_feature;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_faq_items_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_faq_items;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_faq_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_faq;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_cta_links_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_cta_links;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_cta_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_cta;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_content_id_seq;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_content_columns_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_content_columns;
DROP TABLE IF EXISTS public._pages_v_blocks_content;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_contact_us_form_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_contact_us_form;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_contact_hero_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_contact_hero;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_call_to_action_new_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_call_to_action_new;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_blog_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_blog;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_archive_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_archive;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_amenities_id_seq;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_amenities_amenities_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_amenities_amenities;
DROP TABLE IF EXISTS public._pages_v_blocks_amenities;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_agents_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_agents;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_about_hero_images_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_about_hero_images;
DROP SEQUENCE IF EXISTS public._pages_v_blocks_about_hero_id_seq;
DROP TABLE IF EXISTS public._pages_v_blocks_about_hero;
DROP TABLE IF EXISTS public._pages_v;
DROP TYPE IF EXISTS public.enum_users_role;
DROP TYPE IF EXISTS public.enum_reviews_status;
DROP TYPE IF EXISTS public.enum_residential_complexes_type;
DROP TYPE IF EXISTS public.enum_residential_complexes_status;
DROP TYPE IF EXISTS public.enum_redirects_to_type;
DROP TYPE IF EXISTS public.enum_properties_type;
DROP TYPE IF EXISTS public.enum_properties_status;
DROP TYPE IF EXISTS public.enum_posts_status;
DROP TYPE IF EXISTS public.enum_payload_jobs_task_slug;
DROP TYPE IF EXISTS public.enum_payload_jobs_log_task_slug;
DROP TYPE IF EXISTS public.enum_payload_jobs_log_state;
DROP TYPE IF EXISTS public.enum_pages_status;
DROP TYPE IF EXISTS public.enum_pages_hero_type;
DROP TYPE IF EXISTS public.enum_pages_hero_links_link_type;
DROP TYPE IF EXISTS public.enum_pages_hero_links_link_appearance;
DROP TYPE IF EXISTS public.enum_pages_blocks_properties_layout;
DROP TYPE IF EXISTS public.enum_pages_blocks_house_filter_filters_fields_type;
DROP TYPE IF EXISTS public.enum_pages_blocks_feature_features_icon;
DROP TYPE IF EXISTS public.enum_pages_blocks_cta_links_link_type;
DROP TYPE IF EXISTS public.enum_pages_blocks_cta_links_link_appearance;
DROP TYPE IF EXISTS public.enum_pages_blocks_content_columns_size;
DROP TYPE IF EXISTS public.enum_pages_blocks_content_columns_link_type;
DROP TYPE IF EXISTS public.enum_pages_blocks_content_columns_link_appearance;
DROP TYPE IF EXISTS public.enum_pages_blocks_archive_relation_to;
DROP TYPE IF EXISTS public.enum_pages_blocks_archive_populate_by;
DROP TYPE IF EXISTS public.enum_pages_blocks_amenities_amenities_icon;
DROP TYPE IF EXISTS public.enum_messages_status;
DROP TYPE IF EXISTS public.enum_lands_status;
DROP TYPE IF EXISTS public.enum_lands_purpose;
DROP TYPE IF EXISTS public.enum_header_nav_items_link_type;
DROP TYPE IF EXISTS public.enum_forms_confirmation_type;
DROP TYPE IF EXISTS public.enum_footer_nav_items_link_type;
DROP TYPE IF EXISTS public.enum_flats_transaction_type;
DROP TYPE IF EXISTS public.enum_flats_status;
DROP TYPE IF EXISTS public.enum_flats_rooms;
DROP TYPE IF EXISTS public.enum_flats_property_category;
DROP TYPE IF EXISTS public.enum_flats_currency;
DROP TYPE IF EXISTS public.enum_flats_building_type;
DROP TYPE IF EXISTS public.enum_commercial_transaction_type;
DROP TYPE IF EXISTS public.enum_commercial_status;
DROP TYPE IF EXISTS public.enum_commercial_price_type;
DROP TYPE IF EXISTS public.enum_commercial_entrance_type;
DROP TYPE IF EXISTS public.enum_commercial_currency;
DROP TYPE IF EXISTS public.enum_commercial_condition;
DROP TYPE IF EXISTS public.enum_commercial_commercial_type;
DROP TYPE IF EXISTS public.enum_agents_social_links_platform;
DROP TYPE IF EXISTS public.enum__pages_v_version_status;
DROP TYPE IF EXISTS public.enum__pages_v_version_hero_type;
DROP TYPE IF EXISTS public.enum__pages_v_version_hero_links_link_type;
DROP TYPE IF EXISTS public.enum__pages_v_version_hero_links_link_appearance;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_properties_layout;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_house_filter_filters_fields_type;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_feature_features_icon;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_cta_links_link_type;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_cta_links_link_appearance;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_content_columns_size;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_content_columns_link_type;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_content_columns_link_appearance;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_archive_relation_to;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_archive_populate_by;
DROP TYPE IF EXISTS public.enum__pages_v_blocks_amenities_amenities_icon;
--
-- Name: enum__pages_v_blocks_amenities_amenities_icon; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_amenities_amenities_icon AS ENUM (
    'wifi',
    'shield',
    'gym',
    'clean'
);


--
-- Name: enum__pages_v_blocks_archive_populate_by; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_archive_populate_by AS ENUM (
    'collection',
    'selection'
);


--
-- Name: enum__pages_v_blocks_archive_relation_to; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_archive_relation_to AS ENUM (
    'posts'
);


--
-- Name: enum__pages_v_blocks_content_columns_link_appearance; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_content_columns_link_appearance AS ENUM (
    'default',
    'outline'
);


--
-- Name: enum__pages_v_blocks_content_columns_link_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_content_columns_link_type AS ENUM (
    'reference',
    'custom'
);


--
-- Name: enum__pages_v_blocks_content_columns_size; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_content_columns_size AS ENUM (
    'oneThird',
    'half',
    'twoThirds',
    'full'
);


--
-- Name: enum__pages_v_blocks_cta_links_link_appearance; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_cta_links_link_appearance AS ENUM (
    'default',
    'outline'
);


--
-- Name: enum__pages_v_blocks_cta_links_link_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_cta_links_link_type AS ENUM (
    'reference',
    'custom'
);


--
-- Name: enum__pages_v_blocks_feature_features_icon; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_feature_features_icon AS ENUM (
    'user-check',
    'settings',
    'trending-up',
    'refresh-cw',
    'users',
    'shield-check',
    'home',
    'key',
    'map-pin',
    'phone',
    'mail',
    'calendar',
    'heart',
    'star',
    'check-circle',
    'award'
);


--
-- Name: enum__pages_v_blocks_house_filter_filters_fields_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_house_filter_filters_fields_type AS ENUM (
    'text',
    'number',
    'checkbox',
    'select',
    'multi-select',
    'range'
);


--
-- Name: enum__pages_v_blocks_properties_layout; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_blocks_properties_layout AS ENUM (
    'grid',
    'list'
);


--
-- Name: enum__pages_v_version_hero_links_link_appearance; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_version_hero_links_link_appearance AS ENUM (
    'default',
    'outline'
);


--
-- Name: enum__pages_v_version_hero_links_link_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_version_hero_links_link_type AS ENUM (
    'reference',
    'custom'
);


--
-- Name: enum__pages_v_version_hero_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_version_hero_type AS ENUM (
    'none',
    'highImpact',
    'mediumImpact',
    'lowImpact'
);


--
-- Name: enum__pages_v_version_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum__pages_v_version_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_agents_social_links_platform; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_agents_social_links_platform AS ENUM (
    'linkedin',
    'twitter',
    'facebook',
    'instagram'
);


--
-- Name: enum_commercial_commercial_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_commercial_commercial_type AS ENUM (
    'office',
    'retail',
    'mall',
    'warehouse',
    'manufacturing',
    'free-purpose',
    'hotel',
    'restaurant',
    'business-center'
);


--
-- Name: enum_commercial_condition; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_commercial_condition AS ENUM (
    'finished',
    'rough',
    'needs_renovation',
    'for-finishing'
);


--
-- Name: enum_commercial_currency; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_commercial_currency AS ENUM (
    'RUB',
    'USD',
    'EUR'
);


--
-- Name: enum_commercial_entrance_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_commercial_entrance_type AS ENUM (
    'separate',
    'through-bc',
    'from-street'
);


--
-- Name: enum_commercial_price_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_commercial_price_type AS ENUM (
    'total',
    'per_sqm_month',
    'per_sqm_year'
);


--
-- Name: enum_commercial_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_commercial_status AS ENUM (
    'active',
    'sold',
    'unpublished',
    'draft'
);


--
-- Name: enum_commercial_transaction_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_commercial_transaction_type AS ENUM (
    'sale',
    'rent'
);


--
-- Name: enum_flats_building_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_flats_building_type AS ENUM (
    'panel',
    'brick',
    'monolithic',
    'block',
    'wood'
);


--
-- Name: enum_flats_currency; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_flats_currency AS ENUM (
    'RUB',
    'USD',
    'EUR'
);


--
-- Name: enum_flats_property_category; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_flats_property_category AS ENUM (
    'apartment',
    'apartments',
    'studio',
    'townhouse',
    'penthouse',
    'house-part'
);


--
-- Name: enum_flats_rooms; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_flats_rooms AS ENUM (
    'studio',
    '1',
    '2',
    '3',
    '4',
    '5plus'
);


--
-- Name: enum_flats_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_flats_status AS ENUM (
    'active',
    'sold',
    'unpublished',
    'draft'
);


--
-- Name: enum_flats_transaction_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_flats_transaction_type AS ENUM (
    'sale',
    'rent',
    'daily'
);


--
-- Name: enum_footer_nav_items_link_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_footer_nav_items_link_type AS ENUM (
    'reference',
    'custom'
);


--
-- Name: enum_forms_confirmation_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_forms_confirmation_type AS ENUM (
    'message',
    'redirect'
);


--
-- Name: enum_header_nav_items_link_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_header_nav_items_link_type AS ENUM (
    'reference',
    'custom'
);


--
-- Name: enum_lands_purpose; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_lands_purpose AS ENUM (
    'ijs',
    'snt',
    'lph',
    'commercial',
    'agricultural'
);


--
-- Name: enum_lands_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_lands_status AS ENUM (
    'active',
    'sold',
    'unpublished'
);


--
-- Name: enum_messages_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_messages_status AS ENUM (
    'new',
    'in-progress',
    'completed'
);


--
-- Name: enum_pages_blocks_amenities_amenities_icon; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_amenities_amenities_icon AS ENUM (
    'wifi',
    'shield',
    'gym',
    'clean'
);


--
-- Name: enum_pages_blocks_archive_populate_by; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_archive_populate_by AS ENUM (
    'collection',
    'selection'
);


--
-- Name: enum_pages_blocks_archive_relation_to; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_archive_relation_to AS ENUM (
    'posts'
);


--
-- Name: enum_pages_blocks_content_columns_link_appearance; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_content_columns_link_appearance AS ENUM (
    'default',
    'outline'
);


--
-- Name: enum_pages_blocks_content_columns_link_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_content_columns_link_type AS ENUM (
    'reference',
    'custom'
);


--
-- Name: enum_pages_blocks_content_columns_size; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_content_columns_size AS ENUM (
    'oneThird',
    'half',
    'twoThirds',
    'full'
);


--
-- Name: enum_pages_blocks_cta_links_link_appearance; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_cta_links_link_appearance AS ENUM (
    'default',
    'outline'
);


--
-- Name: enum_pages_blocks_cta_links_link_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_cta_links_link_type AS ENUM (
    'reference',
    'custom'
);


--
-- Name: enum_pages_blocks_feature_features_icon; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_feature_features_icon AS ENUM (
    'user-check',
    'settings',
    'trending-up',
    'refresh-cw',
    'users',
    'shield-check',
    'home',
    'key',
    'map-pin',
    'phone',
    'mail',
    'calendar',
    'heart',
    'star',
    'check-circle',
    'award'
);


--
-- Name: enum_pages_blocks_house_filter_filters_fields_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_house_filter_filters_fields_type AS ENUM (
    'text',
    'number',
    'checkbox',
    'select',
    'multi-select',
    'range'
);


--
-- Name: enum_pages_blocks_properties_layout; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_blocks_properties_layout AS ENUM (
    'grid',
    'list'
);


--
-- Name: enum_pages_hero_links_link_appearance; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_hero_links_link_appearance AS ENUM (
    'default',
    'outline'
);


--
-- Name: enum_pages_hero_links_link_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_hero_links_link_type AS ENUM (
    'reference',
    'custom'
);


--
-- Name: enum_pages_hero_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_hero_type AS ENUM (
    'none',
    'highImpact',
    'mediumImpact',
    'lowImpact'
);


--
-- Name: enum_pages_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_pages_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_payload_jobs_log_state; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_payload_jobs_log_state AS ENUM (
    'failed',
    'succeeded'
);


--
-- Name: enum_payload_jobs_log_task_slug; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_payload_jobs_log_task_slug AS ENUM (
    'inline',
    'schedulePublish'
);


--
-- Name: enum_payload_jobs_task_slug; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_payload_jobs_task_slug AS ENUM (
    'inline',
    'schedulePublish'
);


--
-- Name: enum_posts_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_posts_status AS ENUM (
    'draft',
    'published'
);


--
-- Name: enum_properties_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_properties_status AS ENUM (
    'active',
    'sold',
    'draft'
);


--
-- Name: enum_properties_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_properties_type AS ENUM (
    'sale',
    'rent'
);


--
-- Name: enum_redirects_to_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_redirects_to_type AS ENUM (
    'reference',
    'custom'
);


--
-- Name: enum_residential_complexes_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_residential_complexes_status AS ENUM (
    'planning',
    'under-construction',
    'completed'
);


--
-- Name: enum_residential_complexes_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_residential_complexes_type AS ENUM (
    'economy',
    'comfort',
    'business',
    'premium'
);


--
-- Name: enum_reviews_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_reviews_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'realtor'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _pages_v; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v (
    id integer NOT NULL,
    parent_id integer,
    version_title character varying,
    version_hero_type public.enum__pages_v_version_hero_type DEFAULT 'lowImpact'::public.enum__pages_v_version_hero_type,
    version_hero_rich_text jsonb,
    version_hero_media_id integer,
    version_meta_title character varying,
    version_meta_image_id integer,
    version_meta_description character varying,
    version_published_at timestamp(3) with time zone,
    version_slug character varying,
    version_slug_lock boolean DEFAULT true,
    version_updated_at timestamp(3) with time zone,
    version_created_at timestamp(3) with time zone,
    version__status public.enum__pages_v_version_status DEFAULT 'draft'::public.enum__pages_v_version_status,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    latest boolean,
    autosave boolean
);


--
-- Name: _pages_v_blocks_about_hero; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_about_hero (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'about-hero'::character varying,
    label character varying DEFAULT 'About us'::character varying,
    title character varying DEFAULT 'Connect with our experts and bring your Real Estate ideas to life'::character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_about_hero_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_about_hero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_about_hero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_about_hero_id_seq OWNED BY public._pages_v_blocks_about_hero.id;


--
-- Name: _pages_v_blocks_about_hero_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_about_hero_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    image_id integer,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_about_hero_images_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_about_hero_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_about_hero_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_about_hero_images_id_seq OWNED BY public._pages_v_blocks_about_hero_images.id;


--
-- Name: _pages_v_blocks_agents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_agents (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'agents'::character varying,
    label character varying DEFAULT 'Agents'::character varying,
    title character varying DEFAULT 'Meet our exceptional agents for a seamless experience'::character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_agents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_agents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_agents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_agents_id_seq OWNED BY public._pages_v_blocks_agents.id;


--
-- Name: _pages_v_blocks_amenities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_amenities (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'amenities'::character varying,
    label character varying DEFAULT 'Amenities'::character varying,
    title character varying DEFAULT 'Discover exceptional amenities for a luxurious lifestyle'::character varying,
    image_id integer,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_amenities_amenities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_amenities_amenities (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    icon public.enum__pages_v_blocks_amenities_amenities_icon,
    title character varying,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_amenities_amenities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_amenities_amenities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_amenities_amenities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_amenities_amenities_id_seq OWNED BY public._pages_v_blocks_amenities_amenities.id;


--
-- Name: _pages_v_blocks_amenities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_amenities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_amenities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_amenities_id_seq OWNED BY public._pages_v_blocks_amenities.id;


--
-- Name: _pages_v_blocks_archive; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_archive (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    intro_content jsonb,
    populate_by public.enum__pages_v_blocks_archive_populate_by DEFAULT 'collection'::public.enum__pages_v_blocks_archive_populate_by,
    relation_to public.enum__pages_v_blocks_archive_relation_to DEFAULT 'posts'::public.enum__pages_v_blocks_archive_relation_to,
    "limit" numeric DEFAULT 10,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_archive_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_archive_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_archive_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_archive_id_seq OWNED BY public._pages_v_blocks_archive.id;


--
-- Name: _pages_v_blocks_blog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_blog (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'blog'::character varying,
    title character varying DEFAULT 'Expert advice and market updates on real estate'::character varying,
    subtitle character varying DEFAULT 'Blogs'::character varying,
    show_all_link character varying DEFAULT '/posts'::character varying,
    items_per_page numeric DEFAULT 3,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_blog_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_blog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_blog_id_seq OWNED BY public._pages_v_blocks_blog.id;


--
-- Name: _pages_v_blocks_call_to_action_new; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_call_to_action_new (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'call-to-action-new'::character varying,
    label character varying DEFAULT 'Want to Book a Call?'::character varying,
    title character varying DEFAULT 'Ready to make your step in real estate? Book Now.'::character varying,
    button_text character varying DEFAULT 'View Properties'::character varying,
    button_link character varying DEFAULT '/properties'::character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_call_to_action_new_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_call_to_action_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_call_to_action_new_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_call_to_action_new_id_seq OWNED BY public._pages_v_blocks_call_to_action_new.id;


--
-- Name: _pages_v_blocks_contact_hero; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_contact_hero (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'contact-hero'::character varying,
    label character varying DEFAULT 'Contact'::character varying,
    title character varying DEFAULT 'Get in touch with us today for expert assistance'::character varying,
    image_id integer,
    email character varying DEFAULT 'testing@gmail.com'::character varying,
    phone character varying DEFAULT '+ 123 45 67 89'::character varying,
    location character varying DEFAULT 'Doha, Qatar'::character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_contact_hero_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_contact_hero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_contact_hero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_contact_hero_id_seq OWNED BY public._pages_v_blocks_contact_hero.id;


--
-- Name: _pages_v_blocks_contact_us_form; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_contact_us_form (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'contact-us-form'::character varying,
    label character varying DEFAULT 'Contact'::character varying,
    title character varying DEFAULT 'Fill out this form, Let''s get in touch'::character varying,
    form_id integer,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_contact_us_form_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_contact_us_form_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_contact_us_form_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_contact_us_form_id_seq OWNED BY public._pages_v_blocks_contact_us_form.id;


--
-- Name: _pages_v_blocks_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_content (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_content_columns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_content_columns (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    size public.enum__pages_v_blocks_content_columns_size DEFAULT 'oneThird'::public.enum__pages_v_blocks_content_columns_size,
    rich_text jsonb,
    enable_link boolean,
    link_type public.enum__pages_v_blocks_content_columns_link_type DEFAULT 'reference'::public.enum__pages_v_blocks_content_columns_link_type,
    link_new_tab boolean,
    link_url character varying,
    link_label character varying,
    link_appearance public.enum__pages_v_blocks_content_columns_link_appearance DEFAULT 'default'::public.enum__pages_v_blocks_content_columns_link_appearance,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_content_columns_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_content_columns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_content_columns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_content_columns_id_seq OWNED BY public._pages_v_blocks_content_columns.id;


--
-- Name: _pages_v_blocks_content_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_content_id_seq OWNED BY public._pages_v_blocks_content.id;


--
-- Name: _pages_v_blocks_cta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_cta (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    rich_text jsonb,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_cta_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_cta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_cta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_cta_id_seq OWNED BY public._pages_v_blocks_cta.id;


--
-- Name: _pages_v_blocks_cta_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_cta_links (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    link_type public.enum__pages_v_blocks_cta_links_link_type DEFAULT 'reference'::public.enum__pages_v_blocks_cta_links_link_type,
    link_new_tab boolean,
    link_url character varying,
    link_label character varying,
    link_appearance public.enum__pages_v_blocks_cta_links_link_appearance DEFAULT 'default'::public.enum__pages_v_blocks_cta_links_link_appearance,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_cta_links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_cta_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_cta_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_cta_links_id_seq OWNED BY public._pages_v_blocks_cta_links.id;


--
-- Name: _pages_v_blocks_faq; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_faq (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'faq'::character varying,
    label character varying DEFAULT 'faq'::character varying,
    title character varying DEFAULT 'Your questions, Answered'::character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_faq_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_faq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_faq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_faq_id_seq OWNED BY public._pages_v_blocks_faq.id;


--
-- Name: _pages_v_blocks_faq_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_faq_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    question character varying,
    answer character varying,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_faq_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_faq_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_faq_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_faq_items_id_seq OWNED BY public._pages_v_blocks_faq_items.id;


--
-- Name: _pages_v_blocks_feature; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_feature (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'feature'::character varying,
    label character varying,
    title character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_feature_features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_feature_features (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    icon public.enum__pages_v_blocks_feature_features_icon,
    title character varying,
    description character varying,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_feature_features_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_feature_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_feature_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_feature_features_id_seq OWNED BY public._pages_v_blocks_feature_features.id;


--
-- Name: _pages_v_blocks_feature_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_feature_id_seq OWNED BY public._pages_v_blocks_feature.id;


--
-- Name: _pages_v_blocks_form_block; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_form_block (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    form_id integer,
    enable_intro boolean,
    intro_content jsonb,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_form_block_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_form_block_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_form_block_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_form_block_id_seq OWNED BY public._pages_v_blocks_form_block.id;


--
-- Name: _pages_v_blocks_hero; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_hero (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    badge_text character varying,
    headline character varying,
    highlight character varying,
    subheadline character varying,
    image_id integer,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_hero_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_hero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_hero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_hero_id_seq OWNED BY public._pages_v_blocks_hero.id;


--
-- Name: _pages_v_blocks_house_filter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_house_filter (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_house_filter_filters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_house_filter_filters (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    label character varying,
    collection character varying,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_house_filter_filters_fields; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_house_filter_filters_fields (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    name character varying,
    label character varying,
    type public.enum__pages_v_blocks_house_filter_filters_fields_type,
    min numeric,
    max numeric,
    step numeric,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_house_filter_filters_fields_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_house_filter_filters_fields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_house_filter_filters_fields_id_seq OWNED BY public._pages_v_blocks_house_filter_filters_fields.id;


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_house_filter_filters_fields_options (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    value character varying,
    label character varying,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_house_filter_filters_fields_options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_house_filter_filters_fields_options_id_seq OWNED BY public._pages_v_blocks_house_filter_filters_fields_options.id;


--
-- Name: _pages_v_blocks_house_filter_filters_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_house_filter_filters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_house_filter_filters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_house_filter_filters_id_seq OWNED BY public._pages_v_blocks_house_filter_filters.id;


--
-- Name: _pages_v_blocks_house_filter_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_house_filter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_house_filter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_house_filter_id_seq OWNED BY public._pages_v_blocks_house_filter.id;


--
-- Name: _pages_v_blocks_how_it_works; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_how_it_works (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'how-it-works'::character varying,
    label character varying DEFAULT 'How it works'::character varying,
    title character varying DEFAULT 'Discover the advantages and exclusive benefits'::character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_how_it_works_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_how_it_works_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_how_it_works_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_how_it_works_id_seq OWNED BY public._pages_v_blocks_how_it_works.id;


--
-- Name: _pages_v_blocks_how_it_works_steps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_how_it_works_steps (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    icon character varying DEFAULT '1'::character varying,
    title character varying,
    description character varying,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_how_it_works_steps_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_how_it_works_steps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_how_it_works_steps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_how_it_works_steps_id_seq OWNED BY public._pages_v_blocks_how_it_works_steps.id;


--
-- Name: _pages_v_blocks_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_map (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'map'::character varying,
    title character varying,
    center_lat numeric,
    center_lng numeric,
    center_zoom numeric DEFAULT 12,
    auto_load boolean DEFAULT true,
    "limit" numeric DEFAULT 20,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_map_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_map_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_map_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_map_id_seq OWNED BY public._pages_v_blocks_map.id;


--
-- Name: _pages_v_blocks_media_block; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_media_block (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    media_id integer,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_media_block_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_media_block_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_media_block_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_media_block_id_seq OWNED BY public._pages_v_blocks_media_block.id;


--
-- Name: _pages_v_blocks_navbar; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_navbar (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    logo_text character varying,
    button_text character varying DEFAULT 'Связаться'::character varying,
    button_url character varying DEFAULT '#contact'::character varying,
    avatar_id integer,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_navbar_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_navbar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_navbar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_navbar_id_seq OWNED BY public._pages_v_blocks_navbar.id;


--
-- Name: _pages_v_blocks_navbar_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_navbar_links (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    text character varying,
    url character varying,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_navbar_links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_navbar_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_navbar_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_navbar_links_id_seq OWNED BY public._pages_v_blocks_navbar_links.id;


--
-- Name: _pages_v_blocks_properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_properties (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'properties'::character varying,
    title character varying,
    show_all_link character varying,
    layout public.enum__pages_v_blocks_properties_layout DEFAULT 'grid'::public.enum__pages_v_blocks_properties_layout,
    items_per_page numeric DEFAULT 6,
    enable_filters boolean DEFAULT false,
    filters_price_range boolean DEFAULT true,
    filters_property_type boolean DEFAULT true,
    filters_bedrooms boolean DEFAULT true,
    filters_bathrooms boolean DEFAULT true,
    filters_area boolean DEFAULT true,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_properties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_properties_id_seq OWNED BY public._pages_v_blocks_properties.id;


--
-- Name: _pages_v_blocks_property_features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_property_features (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'property-features'::character varying,
    property_id integer,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_property_features_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_property_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_property_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_property_features_id_seq OWNED BY public._pages_v_blocks_property_features.id;


--
-- Name: _pages_v_blocks_testimonials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_testimonials (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'testimonials'::character varying,
    label character varying DEFAULT 'Testimonials'::character varying,
    title character varying DEFAULT 'Real feedback from our satisfied clients'::character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_testimonials_id_seq OWNED BY public._pages_v_blocks_testimonials.id;


--
-- Name: _pages_v_blocks_vision; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_vision (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    title character varying,
    subtitle character varying,
    button_text character varying,
    button_link character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_vision_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_vision_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_vision_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_vision_id_seq OWNED BY public._pages_v_blocks_vision.id;


--
-- Name: _pages_v_blocks_vision_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_vision_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    icon character varying,
    title character varying,
    description character varying,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_vision_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_vision_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_vision_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_vision_items_id_seq OWNED BY public._pages_v_blocks_vision_items.id;


--
-- Name: _pages_v_blocks_vision_mission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_vision_mission (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    block_type character varying DEFAULT 'vision-mission'::character varying,
    title character varying DEFAULT 'Your trusted real estate experts:'::character varying,
    description character varying DEFAULT 'With years of local expertise, we''re committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client''s unique needs are met with professionalism and care.'::character varying,
    button_text character varying DEFAULT 'View Properties'::character varying,
    button_link character varying DEFAULT '/properties'::character varying,
    _uuid character varying,
    block_name character varying
);


--
-- Name: _pages_v_blocks_vision_mission_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_vision_mission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_vision_mission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_vision_mission_id_seq OWNED BY public._pages_v_blocks_vision_mission.id;


--
-- Name: _pages_v_blocks_vision_mission_stats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_blocks_vision_mission_stats (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    value character varying,
    label character varying,
    _uuid character varying
);


--
-- Name: _pages_v_blocks_vision_mission_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_blocks_vision_mission_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_blocks_vision_mission_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_blocks_vision_mission_stats_id_seq OWNED BY public._pages_v_blocks_vision_mission_stats.id;


--
-- Name: _pages_v_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_id_seq OWNED BY public._pages_v.id;


--
-- Name: _pages_v_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer,
    categories_id integer,
    commercial_id integer,
    flats_id integer,
    lands_id integer,
    residential_complexes_id integer,
    agents_id integer,
    testimonials_id integer,
    properties_id integer
);


--
-- Name: _pages_v_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_rels_id_seq OWNED BY public._pages_v_rels.id;


--
-- Name: _pages_v_version_hero_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public._pages_v_version_hero_links (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    link_type public.enum__pages_v_version_hero_links_link_type DEFAULT 'reference'::public.enum__pages_v_version_hero_links_link_type,
    link_new_tab boolean,
    link_url character varying,
    link_label character varying,
    link_appearance public.enum__pages_v_version_hero_links_link_appearance DEFAULT 'default'::public.enum__pages_v_version_hero_links_link_appearance,
    _uuid character varying
);


--
-- Name: _pages_v_version_hero_links_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public._pages_v_version_hero_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: _pages_v_version_hero_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public._pages_v_version_hero_links_id_seq OWNED BY public._pages_v_version_hero_links.id;


--
-- Name: agents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.agents (
    id integer NOT NULL,
    name character varying NOT NULL,
    "position" character varying NOT NULL,
    image_id integer NOT NULL,
    email character varying NOT NULL,
    phone character varying NOT NULL,
    description character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: agents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.agents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: agents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.agents_id_seq OWNED BY public.agents.id;


--
-- Name: agents_social_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.agents_social_links (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    platform public.enum_agents_social_links_platform,
    url character varying NOT NULL
);


--
-- Name: categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying,
    slug_lock boolean DEFAULT true,
    parent_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: categories_breadcrumbs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.categories_breadcrumbs (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    doc_id integer,
    url character varying,
    label character varying
);


--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: commercial; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.commercial (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    commercial_type public.enum_commercial_commercial_type NOT NULL,
    transaction_type public.enum_commercial_transaction_type NOT NULL,
    location_city character varying NOT NULL,
    location_district character varying NOT NULL,
    location_address character varying NOT NULL,
    location_highway character varying,
    coordinates_lat numeric,
    coordinates_lng numeric,
    coordinates_formatted_address character varying,
    area_total numeric NOT NULL,
    area_usable numeric,
    area_land numeric,
    price numeric NOT NULL,
    price_type public.enum_commercial_price_type DEFAULT 'total'::public.enum_commercial_price_type,
    currency public.enum_commercial_currency DEFAULT 'RUB'::public.enum_commercial_currency,
    floor numeric,
    ceiling_height numeric,
    entrance_type public.enum_commercial_entrance_type,
    condition public.enum_commercial_condition,
    description jsonb,
    contact_info_contact_person character varying,
    contact_info_phone character varying,
    contact_info_email character varying,
    status public.enum_commercial_status DEFAULT 'active'::public.enum_commercial_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: commercial_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.commercial_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: commercial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.commercial_id_seq OWNED BY public.commercial.id;


--
-- Name: commercial_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.commercial_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL
);


--
-- Name: commercial_utilities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.commercial_utilities (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    utility character varying
);


--
-- Name: flats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.flats (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    realtor_id integer,
    property_category public.enum_flats_property_category DEFAULT 'apartment'::public.enum_flats_property_category NOT NULL,
    transaction_type public.enum_flats_transaction_type DEFAULT 'sale'::public.enum_flats_transaction_type NOT NULL,
    location_city character varying NOT NULL,
    location_district character varying NOT NULL,
    location_address character varying NOT NULL,
    location_metro character varying,
    location_metro_time numeric,
    coordinates_lat numeric,
    coordinates_lng numeric,
    coordinates_formatted_address character varying,
    rooms public.enum_flats_rooms NOT NULL,
    area_total numeric NOT NULL,
    area_living numeric,
    area_kitchen numeric,
    floor_info_floor numeric,
    floor_info_total_floors numeric,
    price numeric NOT NULL,
    currency public.enum_flats_currency DEFAULT 'RUB'::public.enum_flats_currency,
    building_type public.enum_flats_building_type,
    year_built numeric,
    ceiling_height numeric,
    layout_id integer,
    video character varying,
    description jsonb,
    residential_complex_id integer,
    status public.enum_flats_status DEFAULT 'active'::public.enum_flats_status,
    is_featured boolean DEFAULT false,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: flats_amenities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.flats_amenities (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    amenity character varying NOT NULL
);


--
-- Name: flats_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.flats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: flats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.flats_id_seq OWNED BY public.flats.id;


--
-- Name: flats_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.flats_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL,
    alt character varying
);


--
-- Name: footer; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


--
-- Name: footer_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.footer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: footer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.footer_id_seq OWNED BY public.footer.id;


--
-- Name: footer_nav_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_nav_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    link_type public.enum_footer_nav_items_link_type DEFAULT 'reference'::public.enum_footer_nav_items_link_type,
    link_new_tab boolean,
    link_url character varying,
    link_label character varying NOT NULL
);


--
-- Name: footer_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.footer_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer
);


--
-- Name: footer_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.footer_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: footer_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.footer_rels_id_seq OWNED BY public.footer_rels.id;


--
-- Name: form_submissions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.form_submissions (
    id integer NOT NULL,
    form_id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: form_submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.form_submissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: form_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.form_submissions_id_seq OWNED BY public.form_submissions.id;


--
-- Name: form_submissions_submission_data; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.form_submissions_submission_data (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    field character varying NOT NULL,
    value character varying NOT NULL
);


--
-- Name: forms; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms (
    id integer NOT NULL,
    title character varying NOT NULL,
    submit_button_label character varying,
    confirmation_type public.enum_forms_confirmation_type DEFAULT 'message'::public.enum_forms_confirmation_type,
    confirmation_message jsonb,
    redirect_url character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: forms_blocks_checkbox; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_blocks_checkbox (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    name character varying NOT NULL,
    label character varying,
    width numeric,
    required boolean,
    default_value boolean,
    block_name character varying
);


--
-- Name: forms_blocks_country; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_blocks_country (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    name character varying NOT NULL,
    label character varying,
    width numeric,
    required boolean,
    block_name character varying
);


--
-- Name: forms_blocks_email; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_blocks_email (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    name character varying NOT NULL,
    label character varying,
    width numeric,
    required boolean,
    block_name character varying
);


--
-- Name: forms_blocks_message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_blocks_message (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    message jsonb,
    block_name character varying
);


--
-- Name: forms_blocks_number; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_blocks_number (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    name character varying NOT NULL,
    label character varying,
    width numeric,
    default_value numeric,
    required boolean,
    block_name character varying
);


--
-- Name: forms_blocks_select; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_blocks_select (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    name character varying NOT NULL,
    label character varying,
    width numeric,
    default_value character varying,
    placeholder character varying,
    required boolean,
    block_name character varying
);


--
-- Name: forms_blocks_select_options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_blocks_select_options (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    label character varying NOT NULL,
    value character varying NOT NULL
);


--
-- Name: forms_blocks_state; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_blocks_state (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    name character varying NOT NULL,
    label character varying,
    width numeric,
    required boolean,
    block_name character varying
);


--
-- Name: forms_blocks_text; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_blocks_text (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    name character varying NOT NULL,
    label character varying,
    width numeric,
    default_value character varying,
    required boolean,
    block_name character varying
);


--
-- Name: forms_blocks_textarea; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_blocks_textarea (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    name character varying NOT NULL,
    label character varying,
    width numeric,
    default_value character varying,
    required boolean,
    block_name character varying
);


--
-- Name: forms_emails; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.forms_emails (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    email_to character varying,
    cc character varying,
    bcc character varying,
    reply_to character varying,
    email_from character varying,
    subject character varying DEFAULT 'You''ve received a new message.'::character varying NOT NULL,
    message jsonb
);


--
-- Name: forms_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.forms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.forms_id_seq OWNED BY public.forms.id;


--
-- Name: header; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.header (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


--
-- Name: header_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.header_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: header_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.header_id_seq OWNED BY public.header.id;


--
-- Name: header_nav_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.header_nav_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    link_type public.enum_header_nav_items_link_type DEFAULT 'reference'::public.enum_header_nav_items_link_type,
    link_new_tab boolean,
    link_url character varying,
    link_label character varying NOT NULL
);


--
-- Name: header_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.header_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer
);


--
-- Name: header_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.header_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: header_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.header_rels_id_seq OWNED BY public.header_rels.id;


--
-- Name: lands; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lands (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    purpose public.enum_lands_purpose,
    area numeric NOT NULL,
    price numeric NOT NULL,
    location_city character varying NOT NULL,
    location_district character varying NOT NULL,
    location_address character varying,
    status public.enum_lands_status DEFAULT 'active'::public.enum_lands_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: lands_communications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lands_communications (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    communication character varying
);


--
-- Name: lands_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.lands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: lands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.lands_id_seq OWNED BY public.lands.id;


--
-- Name: lands_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lands_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer
);


--
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    alt character varying,
    caption jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    url character varying,
    thumbnail_u_r_l character varying,
    filename character varying,
    mime_type character varying,
    filesize numeric,
    width numeric,
    height numeric,
    focal_x numeric,
    focal_y numeric,
    sizes_thumbnail_url character varying,
    sizes_thumbnail_width numeric,
    sizes_thumbnail_height numeric,
    sizes_thumbnail_mime_type character varying,
    sizes_thumbnail_filesize numeric,
    sizes_thumbnail_filename character varying,
    sizes_square_url character varying,
    sizes_square_width numeric,
    sizes_square_height numeric,
    sizes_square_mime_type character varying,
    sizes_square_filesize numeric,
    sizes_square_filename character varying,
    sizes_small_url character varying,
    sizes_small_width numeric,
    sizes_small_height numeric,
    sizes_small_mime_type character varying,
    sizes_small_filesize numeric,
    sizes_small_filename character varying,
    sizes_medium_url character varying,
    sizes_medium_width numeric,
    sizes_medium_height numeric,
    sizes_medium_mime_type character varying,
    sizes_medium_filesize numeric,
    sizes_medium_filename character varying,
    sizes_large_url character varying,
    sizes_large_width numeric,
    sizes_large_height numeric,
    sizes_large_mime_type character varying,
    sizes_large_filesize numeric,
    sizes_large_filename character varying,
    sizes_xlarge_url character varying,
    sizes_xlarge_width numeric,
    sizes_xlarge_height numeric,
    sizes_xlarge_mime_type character varying,
    sizes_xlarge_filesize numeric,
    sizes_xlarge_filename character varying,
    sizes_og_url character varying,
    sizes_og_width numeric,
    sizes_og_height numeric,
    sizes_og_mime_type character varying,
    sizes_og_filesize numeric,
    sizes_og_filename character varying
);


--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.messages (
    id integer NOT NULL,
    message jsonb NOT NULL,
    attachment_id integer,
    realtor_id integer NOT NULL,
    subject character varying NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    phone character varying,
    property character varying,
    status public.enum_messages_status DEFAULT 'new'::public.enum_messages_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: pages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages (
    id integer NOT NULL,
    title character varying,
    hero_type public.enum_pages_hero_type DEFAULT 'lowImpact'::public.enum_pages_hero_type,
    hero_rich_text jsonb,
    hero_media_id integer,
    meta_title character varying,
    meta_image_id integer,
    meta_description character varying,
    published_at timestamp(3) with time zone,
    slug character varying,
    slug_lock boolean DEFAULT true,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    _status public.enum_pages_status DEFAULT 'draft'::public.enum_pages_status
);


--
-- Name: pages_blocks_about_hero; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_about_hero (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'about-hero'::character varying,
    label character varying DEFAULT 'About us'::character varying,
    title character varying DEFAULT 'Connect with our experts and bring your Real Estate ideas to life'::character varying,
    block_name character varying
);


--
-- Name: pages_blocks_about_hero_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_about_hero_images (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    image_id integer
);


--
-- Name: pages_blocks_agents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_agents (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'agents'::character varying,
    label character varying DEFAULT 'Agents'::character varying,
    title character varying DEFAULT 'Meet our exceptional agents for a seamless experience'::character varying,
    block_name character varying
);


--
-- Name: pages_blocks_amenities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_amenities (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'amenities'::character varying,
    label character varying DEFAULT 'Amenities'::character varying,
    title character varying DEFAULT 'Discover exceptional amenities for a luxurious lifestyle'::character varying,
    image_id integer,
    block_name character varying
);


--
-- Name: pages_blocks_amenities_amenities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_amenities_amenities (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    icon public.enum_pages_blocks_amenities_amenities_icon,
    title character varying
);


--
-- Name: pages_blocks_archive; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_archive (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    intro_content jsonb,
    populate_by public.enum_pages_blocks_archive_populate_by DEFAULT 'collection'::public.enum_pages_blocks_archive_populate_by,
    relation_to public.enum_pages_blocks_archive_relation_to DEFAULT 'posts'::public.enum_pages_blocks_archive_relation_to,
    "limit" numeric DEFAULT 10,
    block_name character varying
);


--
-- Name: pages_blocks_blog; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_blog (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'blog'::character varying,
    title character varying DEFAULT 'Expert advice and market updates on real estate'::character varying,
    subtitle character varying DEFAULT 'Blogs'::character varying,
    show_all_link character varying DEFAULT '/posts'::character varying,
    items_per_page numeric DEFAULT 3,
    block_name character varying
);


--
-- Name: pages_blocks_call_to_action_new; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_call_to_action_new (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'call-to-action-new'::character varying,
    label character varying DEFAULT 'Want to Book a Call?'::character varying,
    title character varying DEFAULT 'Ready to make your step in real estate? Book Now.'::character varying,
    button_text character varying DEFAULT 'View Properties'::character varying,
    button_link character varying DEFAULT '/properties'::character varying,
    block_name character varying
);


--
-- Name: pages_blocks_contact_hero; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_contact_hero (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'contact-hero'::character varying,
    label character varying DEFAULT 'Contact'::character varying,
    title character varying DEFAULT 'Get in touch with us today for expert assistance'::character varying,
    image_id integer,
    email character varying DEFAULT 'testing@gmail.com'::character varying,
    phone character varying DEFAULT '+ 123 45 67 89'::character varying,
    location character varying DEFAULT 'Doha, Qatar'::character varying,
    block_name character varying
);


--
-- Name: pages_blocks_contact_us_form; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_contact_us_form (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'contact-us-form'::character varying,
    label character varying DEFAULT 'Contact'::character varying,
    title character varying DEFAULT 'Fill out this form, Let''s get in touch'::character varying,
    form_id integer,
    block_name character varying
);


--
-- Name: pages_blocks_content; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_content (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_name character varying
);


--
-- Name: pages_blocks_content_columns; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_content_columns (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    size public.enum_pages_blocks_content_columns_size DEFAULT 'oneThird'::public.enum_pages_blocks_content_columns_size,
    rich_text jsonb,
    enable_link boolean,
    link_type public.enum_pages_blocks_content_columns_link_type DEFAULT 'reference'::public.enum_pages_blocks_content_columns_link_type,
    link_new_tab boolean,
    link_url character varying,
    link_label character varying,
    link_appearance public.enum_pages_blocks_content_columns_link_appearance DEFAULT 'default'::public.enum_pages_blocks_content_columns_link_appearance
);


--
-- Name: pages_blocks_cta; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_cta (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    rich_text jsonb,
    block_name character varying
);


--
-- Name: pages_blocks_cta_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_cta_links (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    link_type public.enum_pages_blocks_cta_links_link_type DEFAULT 'reference'::public.enum_pages_blocks_cta_links_link_type,
    link_new_tab boolean,
    link_url character varying,
    link_label character varying,
    link_appearance public.enum_pages_blocks_cta_links_link_appearance DEFAULT 'default'::public.enum_pages_blocks_cta_links_link_appearance
);


--
-- Name: pages_blocks_faq; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_faq (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'faq'::character varying,
    label character varying DEFAULT 'faq'::character varying,
    title character varying DEFAULT 'Your questions, Answered'::character varying,
    block_name character varying
);


--
-- Name: pages_blocks_faq_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_faq_items (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    question character varying,
    answer character varying
);


--
-- Name: pages_blocks_feature; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_feature (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'feature'::character varying,
    label character varying,
    title character varying,
    block_name character varying
);


--
-- Name: pages_blocks_feature_features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_feature_features (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    icon public.enum_pages_blocks_feature_features_icon,
    title character varying,
    description character varying
);


--
-- Name: pages_blocks_form_block; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_form_block (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    form_id integer,
    enable_intro boolean,
    intro_content jsonb,
    block_name character varying
);


--
-- Name: pages_blocks_hero; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_hero (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    badge_text character varying,
    headline character varying,
    highlight character varying,
    subheadline character varying,
    image_id integer,
    block_name character varying
);


--
-- Name: pages_blocks_house_filter; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_house_filter (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_name character varying
);


--
-- Name: pages_blocks_house_filter_filters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_house_filter_filters (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    label character varying,
    collection character varying
);


--
-- Name: pages_blocks_house_filter_filters_fields; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_house_filter_filters_fields (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    name character varying,
    label character varying,
    type public.enum_pages_blocks_house_filter_filters_fields_type,
    min numeric,
    max numeric,
    step numeric
);


--
-- Name: pages_blocks_house_filter_filters_fields_options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_house_filter_filters_fields_options (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    value character varying,
    label character varying
);


--
-- Name: pages_blocks_how_it_works; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_how_it_works (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'how-it-works'::character varying,
    label character varying DEFAULT 'How it works'::character varying,
    title character varying DEFAULT 'Discover the advantages and exclusive benefits'::character varying,
    block_name character varying
);


--
-- Name: pages_blocks_how_it_works_steps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_how_it_works_steps (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    icon character varying DEFAULT '1'::character varying,
    title character varying,
    description character varying
);


--
-- Name: pages_blocks_map; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_map (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'map'::character varying,
    title character varying,
    center_lat numeric,
    center_lng numeric,
    center_zoom numeric DEFAULT 12,
    auto_load boolean DEFAULT true,
    "limit" numeric DEFAULT 20,
    block_name character varying
);


--
-- Name: pages_blocks_media_block; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_media_block (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    media_id integer,
    block_name character varying
);


--
-- Name: pages_blocks_navbar; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_navbar (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    logo_text character varying,
    button_text character varying DEFAULT 'Связаться'::character varying,
    button_url character varying DEFAULT '#contact'::character varying,
    avatar_id integer,
    block_name character varying
);


--
-- Name: pages_blocks_navbar_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_navbar_links (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    text character varying,
    url character varying
);


--
-- Name: pages_blocks_properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_properties (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'properties'::character varying,
    title character varying,
    show_all_link character varying,
    layout public.enum_pages_blocks_properties_layout DEFAULT 'grid'::public.enum_pages_blocks_properties_layout,
    items_per_page numeric DEFAULT 6,
    enable_filters boolean DEFAULT false,
    filters_price_range boolean DEFAULT true,
    filters_property_type boolean DEFAULT true,
    filters_bedrooms boolean DEFAULT true,
    filters_bathrooms boolean DEFAULT true,
    filters_area boolean DEFAULT true,
    block_name character varying
);


--
-- Name: pages_blocks_property_features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_property_features (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'property-features'::character varying,
    property_id integer,
    block_name character varying
);


--
-- Name: pages_blocks_testimonials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_testimonials (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'testimonials'::character varying,
    label character varying DEFAULT 'Testimonials'::character varying,
    title character varying DEFAULT 'Real feedback from our satisfied clients'::character varying,
    block_name character varying
);


--
-- Name: pages_blocks_vision; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_vision (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    title character varying,
    subtitle character varying,
    button_text character varying,
    button_link character varying,
    block_name character varying
);


--
-- Name: pages_blocks_vision_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_vision_items (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    icon character varying,
    title character varying,
    description character varying
);


--
-- Name: pages_blocks_vision_mission; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_vision_mission (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_type character varying DEFAULT 'vision-mission'::character varying,
    title character varying DEFAULT 'Your trusted real estate experts:'::character varying,
    description character varying DEFAULT 'With years of local expertise, we''re committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client''s unique needs are met with professionalism and care.'::character varying,
    button_text character varying DEFAULT 'View Properties'::character varying,
    button_link character varying DEFAULT '/properties'::character varying,
    block_name character varying
);


--
-- Name: pages_blocks_vision_mission_stats; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_blocks_vision_mission_stats (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    value character varying,
    label character varying
);


--
-- Name: pages_hero_links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_hero_links (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    link_type public.enum_pages_hero_links_link_type DEFAULT 'reference'::public.enum_pages_hero_links_link_type,
    link_new_tab boolean,
    link_url character varying,
    link_label character varying,
    link_appearance public.enum_pages_hero_links_link_appearance DEFAULT 'default'::public.enum_pages_hero_links_link_appearance
);


--
-- Name: pages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_id_seq OWNED BY public.pages.id;


--
-- Name: pages_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.pages_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer,
    categories_id integer,
    commercial_id integer,
    flats_id integer,
    lands_id integer,
    residential_complexes_id integer,
    agents_id integer,
    testimonials_id integer,
    properties_id integer
);


--
-- Name: pages_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.pages_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: pages_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.pages_rels_id_seq OWNED BY public.pages_rels.id;


--
-- Name: payload_jobs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_jobs (
    id integer NOT NULL,
    input jsonb,
    completed_at timestamp(3) with time zone,
    total_tried numeric DEFAULT 0,
    has_error boolean DEFAULT false,
    error jsonb,
    task_slug public.enum_payload_jobs_task_slug,
    queue character varying DEFAULT 'default'::character varying,
    wait_until timestamp(3) with time zone,
    processing boolean DEFAULT false,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_jobs_id_seq OWNED BY public.payload_jobs.id;


--
-- Name: payload_jobs_log; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_jobs_log (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    executed_at timestamp(3) with time zone NOT NULL,
    completed_at timestamp(3) with time zone NOT NULL,
    task_slug public.enum_payload_jobs_log_task_slug NOT NULL,
    task_i_d character varying NOT NULL,
    input jsonb,
    output jsonb,
    state public.enum_payload_jobs_log_state NOT NULL,
    error jsonb
);


--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_locked_documents_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer,
    media_id integer,
    categories_id integer,
    users_id integer,
    properties_id integer,
    agents_id integer,
    testimonials_id integer,
    flats_id integer,
    residential_complexes_id integer,
    commercial_id integer,
    lands_id integer,
    reviews_id integer,
    messages_id integer,
    redirects_id integer,
    forms_id integer,
    form_submissions_id integer,
    search_id integer,
    payload_jobs_id integer
);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    title character varying NOT NULL,
    image_id integer NOT NULL,
    published_date timestamp(3) with time zone NOT NULL,
    excerpt character varying NOT NULL,
    content jsonb NOT NULL,
    author_id integer NOT NULL,
    status public.enum_posts_status DEFAULT 'draft'::public.enum_posts_status NOT NULL,
    meta_title character varying,
    meta_description character varying,
    meta_image_id integer,
    slug character varying NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: posts_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    categories_id integer
);


--
-- Name: posts_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_rels_id_seq OWNED BY public.posts_rels.id;


--
-- Name: properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.properties (
    id integer NOT NULL,
    title character varying NOT NULL,
    slug character varying NOT NULL,
    address character varying NOT NULL,
    coordinates_lat numeric,
    coordinates_lng numeric,
    coordinates_address character varying,
    price numeric NOT NULL,
    type public.enum_properties_type NOT NULL,
    bedrooms numeric NOT NULL,
    bathrooms numeric NOT NULL,
    area numeric NOT NULL,
    description jsonb,
    status public.enum_properties_status DEFAULT 'active'::public.enum_properties_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: properties_features; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.properties_features (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    feature character varying NOT NULL
);


--
-- Name: properties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.properties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.properties_id_seq OWNED BY public.properties.id;


--
-- Name: properties_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.properties_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL
);


--
-- Name: redirects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.redirects (
    id integer NOT NULL,
    "from" character varying NOT NULL,
    to_type public.enum_redirects_to_type DEFAULT 'reference'::public.enum_redirects_to_type,
    to_url character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: redirects_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.redirects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: redirects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.redirects_id_seq OWNED BY public.redirects.id;


--
-- Name: redirects_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.redirects_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer
);


--
-- Name: redirects_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.redirects_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: redirects_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.redirects_rels_id_seq OWNED BY public.redirects_rels.id;


--
-- Name: residential_complexes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.residential_complexes (
    id integer NOT NULL,
    name character varying NOT NULL,
    slug character varying NOT NULL,
    status public.enum_residential_complexes_status DEFAULT 'planning'::public.enum_residential_complexes_status NOT NULL,
    type public.enum_residential_complexes_type DEFAULT 'comfort'::public.enum_residential_complexes_type NOT NULL,
    developer character varying,
    location_city character varying NOT NULL,
    location_district character varying NOT NULL,
    location_address character varying NOT NULL,
    completion_date timestamp(3) with time zone,
    description jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: residential_complexes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.residential_complexes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: residential_complexes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.residential_complexes_id_seq OWNED BY public.residential_complexes.id;


--
-- Name: residential_complexes_images; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.residential_complexes_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL
);


--
-- Name: residential_complexes_infrastructure; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.residential_complexes_infrastructure (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    item character varying
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    realtor_id integer NOT NULL,
    author_name character varying NOT NULL,
    author_email character varying,
    rating numeric NOT NULL,
    comment character varying NOT NULL,
    status public.enum_reviews_status DEFAULT 'pending'::public.enum_reviews_status,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: search; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.search (
    id integer NOT NULL,
    title character varying,
    priority numeric,
    slug character varying,
    meta_title character varying,
    meta_description character varying,
    meta_image_id integer,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: search_categories; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.search_categories (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    relation_to character varying,
    title character varying
);


--
-- Name: search_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.search_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: search_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.search_id_seq OWNED BY public.search.id;


--
-- Name: search_rels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.search_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    posts_id integer
);


--
-- Name: search_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.search_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: search_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.search_rels_id_seq OWNED BY public.search_rels.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.testimonials (
    id integer NOT NULL,
    name character varying NOT NULL,
    location character varying NOT NULL,
    image_id integer NOT NULL,
    text character varying NOT NULL,
    rating numeric DEFAULT 5 NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying,
    slug character varying,
    role public.enum_users_role DEFAULT 'admin'::public.enum_users_role NOT NULL,
    phone character varying,
    agency character varying,
    photo_id integer,
    bio character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    email character varying NOT NULL,
    reset_password_token character varying,
    reset_password_expiration timestamp(3) with time zone,
    salt character varying,
    hash character varying,
    login_attempts numeric DEFAULT 0,
    lock_until timestamp(3) with time zone
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


--
-- Name: _pages_v id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v ALTER COLUMN id SET DEFAULT nextval('public._pages_v_id_seq'::regclass);


--
-- Name: _pages_v_blocks_about_hero id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_about_hero_id_seq'::regclass);


--
-- Name: _pages_v_blocks_about_hero_images id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero_images ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_about_hero_images_id_seq'::regclass);


--
-- Name: _pages_v_blocks_agents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_agents ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_agents_id_seq'::regclass);


--
-- Name: _pages_v_blocks_amenities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_amenities ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_amenities_id_seq'::regclass);


--
-- Name: _pages_v_blocks_amenities_amenities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_amenities_amenities ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_amenities_amenities_id_seq'::regclass);


--
-- Name: _pages_v_blocks_archive id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_archive ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_archive_id_seq'::regclass);


--
-- Name: _pages_v_blocks_blog id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_blog ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_blog_id_seq'::regclass);


--
-- Name: _pages_v_blocks_call_to_action_new id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_call_to_action_new ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_call_to_action_new_id_seq'::regclass);


--
-- Name: _pages_v_blocks_contact_hero id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_contact_hero ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_contact_hero_id_seq'::regclass);


--
-- Name: _pages_v_blocks_contact_us_form id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_contact_us_form ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_contact_us_form_id_seq'::regclass);


--
-- Name: _pages_v_blocks_content id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_content ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_content_id_seq'::regclass);


--
-- Name: _pages_v_blocks_content_columns id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_content_columns ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_content_columns_id_seq'::regclass);


--
-- Name: _pages_v_blocks_cta id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cta_id_seq'::regclass);


--
-- Name: _pages_v_blocks_cta_links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_links ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cta_links_id_seq'::regclass);


--
-- Name: _pages_v_blocks_faq id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_faq ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_faq_id_seq'::regclass);


--
-- Name: _pages_v_blocks_faq_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_faq_items ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_faq_items_id_seq'::regclass);


--
-- Name: _pages_v_blocks_feature id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_feature ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_feature_id_seq'::regclass);


--
-- Name: _pages_v_blocks_feature_features id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_feature_features ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_feature_features_id_seq'::regclass);


--
-- Name: _pages_v_blocks_form_block id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_form_block ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_form_block_id_seq'::regclass);


--
-- Name: _pages_v_blocks_hero id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_hero ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_hero_id_seq'::regclass);


--
-- Name: _pages_v_blocks_house_filter id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_house_filter_id_seq'::regclass);


--
-- Name: _pages_v_blocks_house_filter_filters id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_house_filter_filters_id_seq'::regclass);


--
-- Name: _pages_v_blocks_house_filter_filters_fields id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_house_filter_filters_fields_id_seq'::regclass);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields_options ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_house_filter_filters_fields_options_id_seq'::regclass);


--
-- Name: _pages_v_blocks_how_it_works id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_how_it_works_id_seq'::regclass);


--
-- Name: _pages_v_blocks_how_it_works_steps id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works_steps ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_how_it_works_steps_id_seq'::regclass);


--
-- Name: _pages_v_blocks_map id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_map ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_map_id_seq'::regclass);


--
-- Name: _pages_v_blocks_media_block id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_media_block_id_seq'::regclass);


--
-- Name: _pages_v_blocks_navbar id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_navbar ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_navbar_id_seq'::regclass);


--
-- Name: _pages_v_blocks_navbar_links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_navbar_links ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_navbar_links_id_seq'::regclass);


--
-- Name: _pages_v_blocks_properties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_properties ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_properties_id_seq'::regclass);


--
-- Name: _pages_v_blocks_property_features id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_property_features ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_property_features_id_seq'::regclass);


--
-- Name: _pages_v_blocks_testimonials id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_testimonials ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_testimonials_id_seq'::regclass);


--
-- Name: _pages_v_blocks_vision id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_vision_id_seq'::regclass);


--
-- Name: _pages_v_blocks_vision_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision_items ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_vision_items_id_seq'::regclass);


--
-- Name: _pages_v_blocks_vision_mission id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_vision_mission_id_seq'::regclass);


--
-- Name: _pages_v_blocks_vision_mission_stats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission_stats ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_vision_mission_stats_id_seq'::regclass);


--
-- Name: _pages_v_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels ALTER COLUMN id SET DEFAULT nextval('public._pages_v_rels_id_seq'::regclass);


--
-- Name: _pages_v_version_hero_links id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_version_hero_links ALTER COLUMN id SET DEFAULT nextval('public._pages_v_version_hero_links_id_seq'::regclass);


--
-- Name: agents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agents ALTER COLUMN id SET DEFAULT nextval('public.agents_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: commercial id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.commercial ALTER COLUMN id SET DEFAULT nextval('public.commercial_id_seq'::regclass);


--
-- Name: flats id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flats ALTER COLUMN id SET DEFAULT nextval('public.flats_id_seq'::regclass);


--
-- Name: footer id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer ALTER COLUMN id SET DEFAULT nextval('public.footer_id_seq'::regclass);


--
-- Name: footer_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_rels ALTER COLUMN id SET DEFAULT nextval('public.footer_rels_id_seq'::regclass);


--
-- Name: form_submissions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.form_submissions ALTER COLUMN id SET DEFAULT nextval('public.form_submissions_id_seq'::regclass);


--
-- Name: forms id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms ALTER COLUMN id SET DEFAULT nextval('public.forms_id_seq'::regclass);


--
-- Name: header id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.header ALTER COLUMN id SET DEFAULT nextval('public.header_id_seq'::regclass);


--
-- Name: header_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.header_rels ALTER COLUMN id SET DEFAULT nextval('public.header_rels_id_seq'::regclass);


--
-- Name: lands id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lands ALTER COLUMN id SET DEFAULT nextval('public.lands_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: pages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);


--
-- Name: pages_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels ALTER COLUMN id SET DEFAULT nextval('public.pages_rels_id_seq'::regclass);


--
-- Name: payload_jobs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_jobs ALTER COLUMN id SET DEFAULT nextval('public.payload_jobs_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: posts_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_rels ALTER COLUMN id SET DEFAULT nextval('public.posts_rels_id_seq'::regclass);


--
-- Name: properties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties ALTER COLUMN id SET DEFAULT nextval('public.properties_id_seq'::regclass);


--
-- Name: redirects id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.redirects ALTER COLUMN id SET DEFAULT nextval('public.redirects_id_seq'::regclass);


--
-- Name: redirects_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.redirects_rels ALTER COLUMN id SET DEFAULT nextval('public.redirects_rels_id_seq'::regclass);


--
-- Name: residential_complexes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.residential_complexes ALTER COLUMN id SET DEFAULT nextval('public.residential_complexes_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: search id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search ALTER COLUMN id SET DEFAULT nextval('public.search_id_seq'::regclass);


--
-- Name: search_rels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_rels ALTER COLUMN id SET DEFAULT nextval('public.search_rels_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _pages_v; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v (id, parent_id, version_title, version_hero_type, version_hero_rich_text, version_hero_media_id, version_meta_title, version_meta_image_id, version_meta_description, version_published_at, version_slug, version_slug_lock, version_updated_at, version_created_at, version__status, created_at, updated_at, latest, autosave) FROM stdin;
5	2	nnmklmk	lowImpact	\N	\N	\N	\N	\N	2026-05-13 14:01:34.948+00	nnmklmk	t	2026-05-13 14:02:19.399+00	2026-05-13 14:01:21.466+00	published	2026-05-13 14:02:19.421+00	2026-05-13 14:02:19.421+00	t	f
3	2	\N	lowImpact	\N	\N	\N	\N	\N	\N	\N	t	2026-05-13 14:01:21.466+00	2026-05-13 14:01:21.466+00	draft	2026-05-13 14:01:21.489+00	2026-05-13 14:01:21.489+00	f	f
4	2	nnmklmk	lowImpact	\N	\N	\N	\N	\N	2026-05-13 14:01:34.948+00	nnmklmk	t	2026-05-13 14:02:17.501+00	2026-05-13 14:01:21.466+00	draft	2026-05-13 14:01:34.498+00	2026-05-13 14:02:17.501+00	f	t
55	5	Демо	none	\N	\N	Демо страница — Realty	\N	Демонстрационная страница, собранная из блоков: vision/mission, шаги, преимущества, удобства, контент, FAQ, карта и CTA.	\N	demo	t	2026-05-13 15:33:38.219+00	2026-05-13 15:16:22.885+00	published	2026-05-13 15:33:38.29+00	2026-05-13 15:33:38.29+00	t	f
52	5	Демо	none	\N	\N	Демо страница — Realty	\N	Демонстрационная страница, собранная из блоков: vision/mission, шаги, преимущества, удобства, контент, FAQ, карта и CTA.	\N	demo	t	2026-05-13 15:16:22.888+00	2026-05-13 15:16:22.885+00	published	2026-05-13 15:16:22.937+00	2026-05-13 15:16:22.937+00	f	f
54	5	Демо	none	\N	\N	Демо страница — Realty	\N	Демонстрационная страница, собранная из блоков: vision/mission, шаги, преимущества, удобства, контент, FAQ, карта и CTA.	\N	demo	t	2026-05-13 15:33:03.511+00	2026-05-13 15:16:22.885+00	published	2026-05-13 15:33:03.554+00	2026-05-13 15:33:03.554+00	f	f
53	5	Демо	none	\N	\N	Демо страница — Realty	\N	Демонстрационная страница, собранная из блоков: vision/mission, шаги, преимущества, удобства, контент, FAQ, карта и CTA.	\N	demo	t	2026-05-13 15:18:18.466+00	2026-05-13 15:16:22.885+00	published	2026-05-13 15:18:18.505+00	2026-05-13 15:18:18.505+00	f	f
56	6	Главная (Realestic)	none	\N	\N	Главная (Realestic) — Realty	\N	Найдите дом, который подходит вашей жизни. Демонстрационная главная страница в стиле Realestic.	\N	home-v2	t	2026-05-13 15:33:38.404+00	2026-05-13 15:33:38.402+00	published	2026-05-13 15:33:38.443+00	2026-05-13 15:33:38.443+00	t	f
57	7	О компании	none	\N	\N	О компании — Realty	\N	Команда Realty: 12 лет опыта, 190+ закрытых сделок и индивидуальный подход к каждому клиенту.	\N	about	t	2026-05-13 15:33:38.538+00	2026-05-13 15:33:38.538+00	published	2026-05-13 15:33:38.563+00	2026-05-13 15:33:38.563+00	t	f
58	8	Наши агенты	none	\N	\N	Наши агенты — Realty	\N	Команда профессионалов, которая ведёт сделки с недвижимостью под ключ.	\N	agents	t	2026-05-13 15:33:38.627+00	2026-05-13 15:33:38.626+00	published	2026-05-13 15:33:38.645+00	2026-05-13 15:33:38.645+00	t	f
59	9	Блог	none	\N	\N	Блог — Realty	\N	Гайды и обзоры рынка недвижимости от команды Realty.	\N	blogs	t	2026-05-13 15:33:38.703+00	2026-05-13 15:33:38.703+00	published	2026-05-13 15:33:38.722+00	2026-05-13 15:33:38.722+00	t	f
60	10	Контакты	none	\N	\N	Контакты — Realty	\N	Свяжитесь с командой Realty — email, телефон, форма обратной связи и карта объектов.	\N	contact	t	2026-05-13 15:33:38.779+00	2026-05-13 15:33:38.779+00	published	2026-05-13 15:33:38.801+00	2026-05-13 15:33:38.801+00	t	f
\.


--
-- Data for Name: _pages_v_blocks_about_hero; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_about_hero (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_about_hero_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_about_hero_images (_order, _parent_id, id, image_id, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_agents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_agents (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_amenities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_amenities (_order, _parent_id, _path, id, block_type, label, title, image_id, _uuid, block_name) FROM stdin;
4	52	version.layout	9	amenities	Удобства	Что входит в современный жилой комплекс	2	6a0495c68635dc002e23f531	\N
4	53	version.layout	10	amenities	Удобства	Что входит в современный жилой комплекс	2	6a04963a8635dc002e23f54d	\N
4	54	version.layout	11	amenities	Удобства	Что входит в современный жилой комплекс	2	6a0499af8635dc002e23f569	\N
4	55	version.layout	12	amenities	Удобства	Что входит в современный жилой комплекс	1	6a0499d2e82ec8002f1184bf	\N
3	57	version.layout	13	amenities	Что вы получаете	Сервис, который продумывает детали	2	6a0499d2e82ec8002f1184ef	\N
\.


--
-- Data for Name: _pages_v_blocks_amenities_amenities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_amenities_amenities (_order, _parent_id, id, icon, title, _uuid) FROM stdin;
1	9	33	clean	Чистота на территории	6a0495c68635dc002e23f52d
2	9	34	wifi	Высокоскоростной интернет	6a0495c68635dc002e23f52e
3	9	35	shield	Круглосуточная охрана	6a0495c68635dc002e23f52f
4	9	36	gym	Фитнес-зал и магазины	6a0495c68635dc002e23f530
1	10	37	clean	Чистота на территории	6a04963a8635dc002e23f549
2	10	38	wifi	Высокоскоростной интернет	6a04963a8635dc002e23f54a
3	10	39	shield	Круглосуточная охрана	6a04963a8635dc002e23f54b
4	10	40	gym	Фитнес-зал и магазины	6a04963a8635dc002e23f54c
1	11	41	clean	Чистота на территории	6a0499af8635dc002e23f565
2	11	42	wifi	Высокоскоростной интернет	6a0499af8635dc002e23f566
3	11	43	shield	Круглосуточная охрана	6a0499af8635dc002e23f567
4	11	44	gym	Фитнес-зал и магазины	6a0499af8635dc002e23f568
1	12	45	clean	Чистота на территории	6a0499d2e82ec8002f1184bb
2	12	46	wifi	Высокоскоростной интернет	6a0499d2e82ec8002f1184bc
3	12	47	shield	Круглосуточная охрана	6a0499d2e82ec8002f1184bd
4	12	48	gym	Фитнес-зал и магазины	6a0499d2e82ec8002f1184be
1	13	49	shield	Полное юридическое сопровождение	6a0499d2e82ec8002f1184eb
2	13	50	wifi	Онлайн-просмотры и виртуальные туры	6a0499d2e82ec8002f1184ec
3	13	51	gym	Партнёрские программы с банками	6a0499d2e82ec8002f1184ed
4	13	52	clean	Прозрачные условия без скрытых комиссий	6a0499d2e82ec8002f1184ee
\.


--
-- Data for Name: _pages_v_blocks_archive; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_archive (_order, _parent_id, _path, id, intro_content, populate_by, relation_to, "limit", _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_blog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_blog (_order, _parent_id, _path, id, block_type, title, subtitle, show_all_link, items_per_page, _uuid, block_name) FROM stdin;
8	56	version.layout	29	blog	Экспертные советы и обзоры рынка недвижимости	Блог	/posts	3	6a0499d2e82ec8002f1184e3	\N
2	59	version.layout	30	blog	Свежие материалы для покупателей и инвесторов	Последние статьи	/posts	6	6a0499d2e82ec8002f1184ff	\N
\.


--
-- Data for Name: _pages_v_blocks_call_to_action_new; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_call_to_action_new (_order, _parent_id, _path, id, block_type, label, title, button_text, button_link, _uuid, block_name) FROM stdin;
8	52	version.layout	7	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	6a0495c68635dc002e23f53a	\N
8	53	version.layout	8	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	6a04963a8635dc002e23f556	\N
8	54	version.layout	9	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	6a0499af8635dc002e23f572	\N
8	55	version.layout	10	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	6a0499d2e82ec8002f1184c8	\N
9	56	version.layout	11	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	6a0499d2e82ec8002f1184e4	\N
5	57	version.layout	12	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	6a0499d2e82ec8002f1184f4	\N
3	58	version.layout	13	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	6a0499d2e82ec8002f1184fd	\N
4	59	version.layout	14	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	6a0499d2e82ec8002f118504	\N
5	60	version.layout	15	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	6a0499d2e82ec8002f11850c	\N
\.


--
-- Data for Name: _pages_v_blocks_contact_hero; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_contact_hero (_order, _parent_id, _path, id, block_type, label, title, image_id, email, phone, location, _uuid, block_name) FROM stdin;
1	60	version.layout	9	contact-hero	Контакты	Свяжитесь с нами сегодня — мы поможем	1	hello@realty.local	+7 (495) 123-45-67	Москва, Тверская 12	6a0499d2e82ec8002f118505	\N
\.


--
-- Data for Name: _pages_v_blocks_contact_us_form; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_contact_us_form (_order, _parent_id, _path, id, block_type, label, title, form_id, _uuid, block_name) FROM stdin;
2	60	version.layout	7	contact-us-form	Обратная связь	Оставьте заявку — мы перезвоним	1	6a0499d2e82ec8002f118506	\N
\.


--
-- Data for Name: _pages_v_blocks_content; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_content (_order, _parent_id, _path, id, _uuid, block_name) FROM stdin;
5	52	version.layout	1	6a0495c68635dc002e23f533	\N
5	53	version.layout	2	6a04963a8635dc002e23f54f	\N
5	54	version.layout	3	6a0499af8635dc002e23f56b	\N
5	55	version.layout	4	6a0499d2e82ec8002f1184c1	\N
\.


--
-- Data for Name: _pages_v_blocks_content_columns; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_content_columns (_order, _parent_id, id, size, rich_text, enable_link, link_type, link_new_tab, link_url, link_label, link_appearance, _uuid) FROM stdin;
1	1	1	full	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Мы помогаем клиентам не просто купить недвижимость, а сделать осознанный выбор. Свяжитесь с нами — расскажем о свежих предложениях и нюансах рынка в вашем городе.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	reference	\N	\N	\N	default	6a0495c68635dc002e23f532
1	2	2	full	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Мы помогаем клиентам не просто купить недвижимость, а сделать осознанный выбор. Свяжитесь с нами — расскажем о свежих предложениях и нюансах рынка в вашем городе.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	reference	\N	\N	\N	default	6a04963a8635dc002e23f54e
1	3	3	full	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Мы помогаем клиентам не просто купить недвижимость, а сделать осознанный выбор. Свяжитесь с нами — расскажем о свежих предложениях и нюансах рынка в вашем городе.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	reference	\N	\N	\N	default	6a0499af8635dc002e23f56a
1	4	4	full	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Мы помогаем клиентам не просто купить недвижимость, а сделать осознанный выбор. Свяжитесь с нами — расскажем о свежих предложениях и нюансах рынка в вашем городе.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	reference	\N	\N	\N	default	6a0499d2e82ec8002f1184c0
\.


--
-- Data for Name: _pages_v_blocks_cta; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_cta (_order, _parent_id, _path, id, rich_text, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_cta_links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_cta_links (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label, link_appearance, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_faq; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_faq (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
6	52	version.layout	54	faq	FAQ	Часто задаваемые вопросы	6a0495c68635dc002e23f538	\N
6	53	version.layout	55	faq	FAQ	Часто задаваемые вопросы	6a04963a8635dc002e23f554	\N
6	54	version.layout	56	faq	FAQ	Часто задаваемые вопросы	6a0499af8635dc002e23f570	\N
6	55	version.layout	57	faq	FAQ	Часто задаваемые вопросы	6a0499d2e82ec8002f1184c6	\N
3	59	version.layout	58	faq	Частые вопросы	О чём чаще всего спрашивают наши читатели	6a0499d2e82ec8002f118503	\N
4	60	version.layout	59	faq	FAQ	Часто задаваемые вопросы	6a0499d2e82ec8002f11850b	\N
\.


--
-- Data for Name: _pages_v_blocks_faq_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_faq_items (_order, _parent_id, id, question, answer, _uuid) FROM stdin;
1	54	326	С чего начать покупку квартиры?	С предварительного одобрения ипотеки и определения бюджета. Это покажет продавцам, что вы серьёзный покупатель.	6a0495c68635dc002e23f534
2	54	327	Сколько занимает оформление сделки?	Обычно от 30 до 45 дней с момента подписания договора до регистрации права собственности.	6a0495c68635dc002e23f535
3	54	328	Нужен ли осмотр квартиры специалистом?	Да, независимая техническая экспертиза помогает выявить скрытые недостатки до сделки.	6a0495c68635dc002e23f536
4	54	329	Что такое рынок продавца?	Это состояние рынка, когда спрос превышает предложение, цены растут и решение нужно принимать быстро.	6a0495c68635dc002e23f537
1	55	330	С чего начать покупку квартиры?	С предварительного одобрения ипотеки и определения бюджета. Это покажет продавцам, что вы серьёзный покупатель.	6a04963a8635dc002e23f550
2	55	331	Сколько занимает оформление сделки?	Обычно от 30 до 45 дней с момента подписания договора до регистрации права собственности.	6a04963a8635dc002e23f551
3	55	332	Нужен ли осмотр квартиры специалистом?	Да, независимая техническая экспертиза помогает выявить скрытые недостатки до сделки.	6a04963a8635dc002e23f552
4	55	333	Что такое рынок продавца?	Это состояние рынка, когда спрос превышает предложение, цены растут и решение нужно принимать быстро.	6a04963a8635dc002e23f553
1	56	334	С чего начать покупку квартиры?	С предварительного одобрения ипотеки и определения бюджета. Это покажет продавцам, что вы серьёзный покупатель.	6a0499af8635dc002e23f56c
2	56	335	Сколько занимает оформление сделки?	Обычно от 30 до 45 дней с момента подписания договора до регистрации права собственности.	6a0499af8635dc002e23f56d
3	56	336	Нужен ли осмотр квартиры специалистом?	Да, независимая техническая экспертиза помогает выявить скрытые недостатки до сделки.	6a0499af8635dc002e23f56e
4	56	337	Что такое рынок продавца?	Это состояние рынка, когда спрос превышает предложение, цены растут и решение нужно принимать быстро.	6a0499af8635dc002e23f56f
1	57	338	С чего начать покупку квартиры?	С предварительного одобрения ипотеки и определения бюджета. Это покажет продавцам, что вы серьёзный покупатель.	6a0499d2e82ec8002f1184c2
2	57	339	Сколько занимает оформление сделки?	Обычно от 30 до 45 дней с момента подписания договора до регистрации права собственности.	6a0499d2e82ec8002f1184c3
3	57	340	Нужен ли осмотр квартиры специалистом?	Да, независимая техническая экспертиза помогает выявить скрытые недостатки до сделки.	6a0499d2e82ec8002f1184c4
4	57	341	Что такое рынок продавца?	Это состояние рынка, когда спрос превышает предложение, цены растут и решение нужно принимать быстро.	6a0499d2e82ec8002f1184c5
1	58	342	Как часто выходят новые статьи?	Мы публикуем 2–3 материала в неделю — гайды, разборы сделок и обзоры новых районов.	6a0499d2e82ec8002f118500
2	58	343	Можно ли предложить тему?	Да — напишите нам через форму обратной связи, и мы возьмём идею в работу.	6a0499d2e82ec8002f118501
3	58	344	Есть ли подписка на рассылку?	Пока нет, но мы планируем запустить её в ближайшее время. Следите за обновлениями.	6a0499d2e82ec8002f118502
1	59	345	Как быстро вы отвечаете на заявки?	Обычно в течение 30 минут в рабочее время, в остальное — на следующий рабочий день.	6a0499d2e82ec8002f118508
2	59	346	Можно ли получить консультацию онлайн?	Да, мы проводим консультации по видеосвязи и устраиваем виртуальные туры по объектам.	6a0499d2e82ec8002f118509
3	59	347	Берёте ли вы оплату за подбор?	Подбор и первая консультация — бесплатны. Комиссия согласовывается на этапе договора.	6a0499d2e82ec8002f11850a
\.


--
-- Data for Name: _pages_v_blocks_feature; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_feature (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
3	52	version.layout	62	feature	Преимущества	Почему клиенты выбирают нас	6a0495c68635dc002e23f52c	\N
3	53	version.layout	63	feature	Преимущества	Почему клиенты выбирают нас	6a04963a8635dc002e23f548	\N
3	54	version.layout	64	feature	Преимущества	Почему клиенты выбирают нас	6a0499af8635dc002e23f564	\N
3	55	version.layout	65	feature	Преимущества	Почему клиенты выбирают нас	6a0499d2e82ec8002f1184ba	\N
4	56	version.layout	66	feature	Преимущества	Почему клиенты выбирают нас	6a0499d2e82ec8002f1184d5	\N
7	56	version.layout	67	feature	Почему мы	Три причины работать с Realestic	6a0499d2e82ec8002f1184e2	\N
4	57	version.layout	68	feature	Команда	Профессионалы, которые ведут вашу сделку	6a0499d2e82ec8002f1184f3	\N
2	58	version.layout	69	feature	Специализации	Каждому запросу — подходящий специалист	6a0499d2e82ec8002f1184fc	\N
\.


--
-- Data for Name: _pages_v_blocks_feature_features; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_feature_features (_order, _parent_id, id, icon, title, description, _uuid) FROM stdin;
1	62	155	user-check	Экспертная поддержка	Каждую сделку ведёт опытный риелтор с глубоким знанием района.	6a0495c68635dc002e23f528
2	62	156	shield-check	Юридическая чистота	Полная проверка документов и истории объекта перед сделкой.	6a0495c68635dc002e23f529
3	62	157	trending-up	Знание рынка	Актуальные цены и прогнозы помогают принимать точные решения.	6a0495c68635dc002e23f52a
4	62	158	refresh-cw	Гладкий процесс	От первого звонка до подписания договора — всё под одной крышей.	6a0495c68635dc002e23f52b
1	63	159	user-check	Экспертная поддержка	Каждую сделку ведёт опытный риелтор с глубоким знанием района.	6a04963a8635dc002e23f544
2	63	160	shield-check	Юридическая чистота	Полная проверка документов и истории объекта перед сделкой.	6a04963a8635dc002e23f545
3	63	161	trending-up	Знание рынка	Актуальные цены и прогнозы помогают принимать точные решения.	6a04963a8635dc002e23f546
4	63	162	refresh-cw	Гладкий процесс	От первого звонка до подписания договора — всё под одной крышей.	6a04963a8635dc002e23f547
1	64	163	user-check	Экспертная поддержка	Каждую сделку ведёт опытный риелтор с глубоким знанием района.	6a0499af8635dc002e23f560
2	64	164	shield-check	Юридическая чистота	Полная проверка документов и истории объекта перед сделкой.	6a0499af8635dc002e23f561
3	64	165	trending-up	Знание рынка	Актуальные цены и прогнозы помогают принимать точные решения.	6a0499af8635dc002e23f562
4	64	166	refresh-cw	Гладкий процесс	От первого звонка до подписания договора — всё под одной крышей.	6a0499af8635dc002e23f563
1	65	167	user-check	Экспертная поддержка	Каждую сделку ведёт опытный риелтор с глубоким знанием района.	6a0499d2e82ec8002f1184b6
2	65	168	shield-check	Юридическая чистота	Полная проверка документов и истории объекта перед сделкой.	6a0499d2e82ec8002f1184b7
3	65	169	trending-up	Знание рынка	Актуальные цены и прогнозы помогают принимать точные решения.	6a0499d2e82ec8002f1184b8
4	65	170	refresh-cw	Гладкий процесс	От первого звонка до подписания договора — всё под одной крышей.	6a0499d2e82ec8002f1184b9
1	66	171	user-check	Экспертная поддержка	Опытные риелторы сопровождают каждую сделку от заявки до подписания.	6a0499d2e82ec8002f1184cf
2	66	172	settings	Индивидуальные решения	Подбираем варианты под конкретные задачи и бюджет, без шаблонов.	6a0499d2e82ec8002f1184d0
3	66	173	trending-up	Знание рынка	Актуальные данные о ценах и динамике в каждом районе.	6a0499d2e82ec8002f1184d1
4	66	174	refresh-cw	Прозрачный процесс	От первого звонка до ключей — всё под одной крышей.	6a0499d2e82ec8002f1184d2
5	66	175	users	Клиентоориентированность	Слушаем, уточняем, согласовываем каждый шаг.	6a0499d2e82ec8002f1184d3
6	66	176	shield-check	Надёжные партнёры	Юристы, оценщики и банки, проверенные годами работы.	6a0499d2e82ec8002f1184d4
1	67	177	map-pin	Знание района	Подскажем где школы, парковки, какое движение и какие планы по застройке.	6a0499d2e82ec8002f1184df
2	67	178	heart	Персональный сервис	Один менеджер ведёт вас от первого звонка до подписания договора.	6a0499d2e82ec8002f1184e0
3	67	179	award	Подтверждённый опыт	Сотни закрытых сделок и положительных отзывов клиентов.	6a0499d2e82ec8002f1184e1
1	68	180	user-check	Старшие консультанты	Опыт от 5 лет, специализация на жилых и инвестиционных объектах.	6a0499d2e82ec8002f1184f0
2	68	181	star	Специалисты по luxury	Закрытые показы, эксклюзивные предложения, конфиденциальность.	6a0499d2e82ec8002f1184f1
3	68	182	key	Менеджеры по объектам	Управление арендой и постпродажное сопровождение под ключ.	6a0499d2e82ec8002f1184f2
1	69	183	user-check	Старший консультант	Жилая недвижимость: квартиры, новостройки, вторичный рынок.	6a0499d2e82ec8002f1184f6
2	69	184	star	Специалист по luxury	Премиальные объекты с конфиденциальным сопровождением.	6a0499d2e82ec8002f1184f7
3	69	185	key	Менеджер по объектам	Управление арендой, страхование и сервисное обслуживание.	6a0499d2e82ec8002f1184f8
4	69	186	trending-up	Инвестиционный советник	Подбор объектов под доходность и стратегию выхода.	6a0499d2e82ec8002f1184f9
5	69	187	map-pin	Эксперт района	Глубокое знание локальной инфраструктуры и динамики цен.	6a0499d2e82ec8002f1184fa
6	69	188	shield-check	Юридическая поддержка	Проверка документов, сопровождение сделки до Росреестра.	6a0499d2e82ec8002f1184fb
\.


--
-- Data for Name: _pages_v_blocks_form_block; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_form_block (_order, _parent_id, _path, id, form_id, enable_intro, intro_content, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_hero; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_hero (_order, _parent_id, _path, id, badge_text, headline, highlight, subheadline, image_id, _uuid, block_name) FROM stdin;
1	4	version.layout	9	km.	knk ;	km;	\N	2	6a04845ab410c3a1bc0ff5d4	\N
1	5	version.layout	10	km.	knk ;	km;	\N	2	6a04845ab410c3a1bc0ff5d4	\N
1	56	version.layout	116	Real Estate	Найдите дом,	который подходит вашей жизни	От уютных квартир в центре до загородных домов — поможем подобрать недвижимость, которая отражает ваши ценности и образ жизни.	1	6a0499d2e82ec8002f1184c9	\N
1	57	version.layout	117	О нас	Свяжитесь с нашими экспертами и	воплотите идеи в недвижимости	Многолетний опыт работы на локальном рынке и индивидуальный подход помогают нашим клиентам уверенно покупать, продавать и инвестировать.	1	6a0499d2e82ec8002f1184e5	\N
1	58	version.layout	118	Команда	Знакомьтесь — наши	исключительные агенты	Опытные риелторы, которые знают рынок изнутри и сделают вашу сделку максимально комфортной.	1	6a0499d2e82ec8002f1184f5	\N
1	59	version.layout	119	Блог	Экспертные советы и	обзоры рынка недвижимости	Гайды, аналитика и мнения экспертов — всё, что поможет принять взвешенное решение о покупке или продаже.	1	6a0499d2e82ec8002f1184fe	\N
\.


--
-- Data for Name: _pages_v_blocks_house_filter; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_house_filter (_order, _parent_id, _path, id, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_house_filter_filters; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_house_filter_filters (_order, _parent_id, id, label, collection, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_house_filter_filters_fields; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_house_filter_filters_fields (_order, _parent_id, id, name, label, type, min, max, step, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_house_filter_filters_fields_options; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_house_filter_filters_fields_options (_order, _parent_id, id, value, label, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_how_it_works; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_how_it_works (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
2	52	version.layout	41	how-it-works	Как это работает	Три простых шага до новой квартиры	6a0495c68635dc002e23f527	\N
2	53	version.layout	42	how-it-works	Как это работает	Три простых шага до новой квартиры	6a04963a8635dc002e23f543	\N
2	54	version.layout	43	how-it-works	Как это работает	Три простых шага до новой квартиры	6a0499af8635dc002e23f55f	\N
2	55	version.layout	44	how-it-works	Как это работает	Три простых шага до новой квартиры	6a0499d2e82ec8002f1184b5	\N
6	56	version.layout	45	how-it-works	Как это работает	Найти, посмотреть, оформить — три простых шага	6a0499d2e82ec8002f1184de	\N
\.


--
-- Data for Name: _pages_v_blocks_how_it_works_steps; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_how_it_works_steps (_order, _parent_id, id, icon, title, description, _uuid) FROM stdin;
1	41	109	1	Заявка	Оставьте короткую заявку или подберите интересующий объект в каталоге.	6a0495c68635dc002e23f524
2	41	110	2	Подбор	Наш агент подберёт варианты, организует показы и сопроводит сделку.	6a0495c68635dc002e23f525
3	41	111	3	Сделка	Юристы проверят документы и проведут оформление под ключ.	6a0495c68635dc002e23f526
1	42	112	1	Заявка	Оставьте короткую заявку или подберите интересующий объект в каталоге.	6a04963a8635dc002e23f540
2	42	113	2	Подбор	Наш агент подберёт варианты, организует показы и сопроводит сделку.	6a04963a8635dc002e23f541
3	42	114	3	Сделка	Юристы проверят документы и проведут оформление под ключ.	6a04963a8635dc002e23f542
1	43	115	1	Заявка	Оставьте короткую заявку или подберите интересующий объект в каталоге.	6a0499af8635dc002e23f55c
2	43	116	2	Подбор	Наш агент подберёт варианты, организует показы и сопроводит сделку.	6a0499af8635dc002e23f55d
3	43	117	3	Сделка	Юристы проверят документы и проведут оформление под ключ.	6a0499af8635dc002e23f55e
1	44	118	1	Заявка	Оставьте короткую заявку или подберите интересующий объект в каталоге.	6a0499d2e82ec8002f1184b2
2	44	119	2	Подбор	Наш агент подберёт варианты, организует показы и сопроводит сделку.	6a0499d2e82ec8002f1184b3
3	44	120	3	Сделка	Юристы проверят документы и проведут оформление под ключ.	6a0499d2e82ec8002f1184b4
1	45	121	1	Найдите	Просмотрите подборку и сохраните понравившиеся варианты в избранное.	6a0499d2e82ec8002f1184db
2	45	122	2	Запланируйте	Договоритесь о просмотре в удобное время — онлайн или вживую.	6a0499d2e82ec8002f1184dc
3	45	123	3	Оформите	Юристы проверят документы и сопроводят сделку до получения ключей.	6a0499d2e82ec8002f1184dd
\.


--
-- Data for Name: _pages_v_blocks_map; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_map (_order, _parent_id, _path, id, block_type, title, center_lat, center_lng, center_zoom, auto_load, "limit", _uuid, block_name) FROM stdin;
7	52	version.layout	3	map	Наши объекты на карте	55.751244	37.618423	11	t	20	6a0495c68635dc002e23f539	\N
7	53	version.layout	4	map	Наши объекты на карте	55.751244	37.618423	11	t	20	6a04963a8635dc002e23f555	\N
7	54	version.layout	5	map	Наши объекты на карте	55.751244	37.618423	11	t	20	6a0499af8635dc002e23f571	\N
7	55	version.layout	6	map	Наши объекты на карте	55.751244	37.618423	11	t	20	6a0499d2e82ec8002f1184c7	\N
3	60	version.layout	7	map	Наши объекты на карте	55.751244	37.618423	11	t	20	6a0499d2e82ec8002f118507	\N
\.


--
-- Data for Name: _pages_v_blocks_media_block; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_media_block (_order, _parent_id, _path, id, media_id, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_navbar; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_navbar (_order, _parent_id, _path, id, logo_text, button_text, button_url, avatar_id, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_navbar_links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_navbar_links (_order, _parent_id, id, text, url, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_properties (_order, _parent_id, _path, id, block_type, title, show_all_link, layout, items_per_page, enable_filters, filters_price_range, filters_property_type, filters_bedrooms, filters_bathrooms, filters_area, _uuid, block_name) FROM stdin;
3	56	version.layout	88	properties	Готовы купить дом мечты? Найдите его здесь	/flats	grid	6	f	t	t	t	t	t	6a0499d2e82ec8002f1184ce	\N
\.


--
-- Data for Name: _pages_v_blocks_property_features; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_property_features (_order, _parent_id, _path, id, block_type, property_id, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_testimonials; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_testimonials (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_vision; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_vision (_order, _parent_id, _path, id, title, subtitle, button_text, button_link, _uuid, block_name) FROM stdin;
2	56	version.layout	107	Дом мечты, разумные инвестиции и образ жизни класса люкс	Realestic	Смотреть объекты	/flats	6a0499d2e82ec8002f1184cd	\N
\.


--
-- Data for Name: _pages_v_blocks_vision_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_vision_items (_order, _parent_id, id, icon, title, description, _uuid) FROM stdin;
1	107	265	home	Дом мечты	Помогаем находить варианты, которые действительно соответствуют вашему ритму жизни.	6a0499d2e82ec8002f1184ca
2	107	266	trending-up	Разумные инвестиции	Подбираем объекты с устойчивым ростом стоимости и доходом от аренды.	6a0499d2e82ec8002f1184cb
3	107	267	star	Класс люкс	Закрытые продажи и эксклюзивные предложения для требовательных клиентов.	6a0499d2e82ec8002f1184cc
\.


--
-- Data for Name: _pages_v_blocks_vision_mission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_vision_mission (_order, _parent_id, _path, id, block_type, title, description, button_text, button_link, _uuid, block_name) FROM stdin;
1	52	version.layout	10	vision-mission	Ваш надёжный партнёр на рынке недвижимости	Многолетний опыт работы на локальном рынке и индивидуальный подход помогают нашим клиентам уверенно покупать, продавать и инвестировать в недвижимость.	Смотреть объекты	/flats	6a0495c68635dc002e23f523	\N
1	53	version.layout	11	vision-mission	Ваш надёжный партнёр на рынке недвижимости	Многолетний опыт работы на локальном рынке и индивидуальный подход помогают нашим клиентам уверенно покупать, продавать и инвестировать в недвижимость.	Смотреть объекты	/flats	6a04963a8635dc002e23f53f	\N
1	54	version.layout	12	vision-mission	Ваш надёжный партнёр на рынке недвижимости	Многолетний опыт работы на локальном рынке и индивидуальный подход помогают нашим клиентам уверенно покупать, продавать и инвестировать в недвижимость.	Смотреть объекты	/flats	6a0499af8635dc002e23f55b	\N
1	55	version.layout	13	vision-mission	Ваш надёжный партнёр на рынке недвижимости	Многолетний опыт работы на локальном рынке и индивидуальный подход помогают нашим клиентам уверенно покупать, продавать и инвестировать в недвижимость.	Смотреть объекты	/flats	6a0499d2e82ec8002f1184b1	\N
5	56	version.layout	14	vision-mission	В Realestic наша миссия проста — помочь вам найти идеальный дом	Мы строим долгосрочные отношения с клиентами, основанные на доверии, открытом общении и качественном результате. Каждый объект проходит проверку, каждая сделка — юридическое сопровождение.	Смотреть объекты	/flats	6a0499d2e82ec8002f1184da	\N
2	57	version.layout	15	vision-mission	Цифры, которые говорят за нас	За 12 лет работы мы помогли сотням семей найти дом, инвесторам — выгодные объекты, а бизнесу — коммерческие площади под рост. Качество, скорость, прозрачность.	Смотреть объекты	/flats	6a0499d2e82ec8002f1184ea	\N
\.


--
-- Data for Name: _pages_v_blocks_vision_mission_stats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_blocks_vision_mission_stats (_order, _parent_id, id, value, label, _uuid) FROM stdin;
1	10	37	98%	Довольных клиентов	6a0495c68635dc002e23f51f
2	10	38	200+	Сделок закрыто	6a0495c68635dc002e23f520
3	10	39	500+	Проектов	6a0495c68635dc002e23f521
4	10	40	12	Лет на рынке	6a0495c68635dc002e23f522
1	11	41	98%	Довольных клиентов	6a04963a8635dc002e23f53b
2	11	42	200+	Сделок закрыто	6a04963a8635dc002e23f53c
3	11	43	500+	Проектов	6a04963a8635dc002e23f53d
4	11	44	12	Лет на рынке	6a04963a8635dc002e23f53e
1	12	45	98%	Довольных клиентов	6a0499af8635dc002e23f557
2	12	46	200+	Сделок закрыто	6a0499af8635dc002e23f558
3	12	47	500+	Проектов	6a0499af8635dc002e23f559
4	12	48	12	Лет на рынке	6a0499af8635dc002e23f55a
1	13	49	98%	Довольных клиентов	6a0499d2e82ec8002f1184ad
2	13	50	200+	Сделок закрыто	6a0499d2e82ec8002f1184ae
3	13	51	500+	Проектов	6a0499d2e82ec8002f1184af
4	13	52	12	Лет на рынке	6a0499d2e82ec8002f1184b0
1	14	53	98%	Довольных клиентов	6a0499d2e82ec8002f1184d6
2	14	54	200+	Сделок	6a0499d2e82ec8002f1184d7
3	14	55	500+	Проектов	6a0499d2e82ec8002f1184d8
4	14	56	12	Лет на рынке	6a0499d2e82ec8002f1184d9
1	15	57	80%	Удовлетворённость	6a0499d2e82ec8002f1184e6
2	15	58	190+	Объектов продано	6a0499d2e82ec8002f1184e7
3	15	59	490+	Проектов	6a0499d2e82ec8002f1184e8
4	15	60	12	Лет на рынке	6a0499d2e82ec8002f1184e9
\.


--
-- Data for Name: _pages_v_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_rels (id, "order", parent_id, path, pages_id, posts_id, categories_id, commercial_id, flats_id, lands_id, residential_complexes_id, agents_id, testimonials_id, properties_id) FROM stdin;
\.


--
-- Data for Name: _pages_v_version_hero_links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public._pages_v_version_hero_links (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label, link_appearance, _uuid) FROM stdin;
\.


--
-- Data for Name: agents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.agents (id, name, "position", image_id, email, phone, description, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: agents_social_links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.agents_social_links (_order, _parent_id, id, platform, url) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories (id, title, slug, slug_lock, parent_id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: categories_breadcrumbs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.categories_breadcrumbs (_order, _parent_id, id, doc_id, url, label) FROM stdin;
\.


--
-- Data for Name: commercial; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.commercial (id, title, slug, commercial_type, transaction_type, location_city, location_district, location_address, location_highway, coordinates_lat, coordinates_lng, coordinates_formatted_address, area_total, area_usable, area_land, price, price_type, currency, floor, ceiling_height, entrance_type, condition, description, contact_info_contact_person, contact_info_phone, contact_info_email, status, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: commercial_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.commercial_images (_order, _parent_id, id, image_id) FROM stdin;
\.


--
-- Data for Name: commercial_utilities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.commercial_utilities (_order, _parent_id, id, utility) FROM stdin;
\.


--
-- Data for Name: flats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.flats (id, title, slug, realtor_id, property_category, transaction_type, location_city, location_district, location_address, location_metro, location_metro_time, coordinates_lat, coordinates_lng, coordinates_formatted_address, rooms, area_total, area_living, area_kitchen, floor_info_floor, floor_info_total_floors, price, currency, building_type, year_built, ceiling_height, layout_id, video, description, residential_complex_id, status, is_featured, updated_at, created_at) FROM stdin;
1	Красная площаль	kvartira-nahui	2	apartment	rent	Amsterdam	fdsfsf	Museumstraat 1	fdsf	4	\N	\N	Иван Ивановул. Ленина, д. 10, кв. 5г. Москва, 101000 РОССИЯ	2	2312	21	\N	\N	\N	32333	RUB	\N	\N	\N	\N	\N	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "dsfffffffffffffff", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}, {"type": "linebreak", "version": 1}, {"mode": "normal", "text": "FDF", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "# fdsfds ", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	active	f	2026-05-13 13:59:08.864+00	2026-05-13 13:59:08.863+00
\.


--
-- Data for Name: flats_amenities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.flats_amenities (_order, _parent_id, id, amenity) FROM stdin;
\.


--
-- Data for Name: flats_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.flats_images (_order, _parent_id, id, image_id, alt) FROM stdin;
1	1	6a048384a3acf5630dfa1f44	2	\N
\.


--
-- Data for Name: footer; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.footer (id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: footer_nav_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.footer_nav_items (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label) FROM stdin;
\.


--
-- Data for Name: footer_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.footer_rels (id, "order", parent_id, path, pages_id, posts_id) FROM stdin;
\.


--
-- Data for Name: form_submissions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.form_submissions (id, form_id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: form_submissions_submission_data; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.form_submissions_submission_data (_order, _parent_id, id, field, value) FROM stdin;
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms (id, title, submit_button_label, confirmation_type, confirmation_message, redirect_url, updated_at, created_at) FROM stdin;
1	a	a	message	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "aa", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	2025-11-03 18:27:33.775+00	2025-11-03 18:27:33.775+00
\.


--
-- Data for Name: forms_blocks_checkbox; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_blocks_checkbox (_order, _parent_id, _path, id, name, label, width, required, default_value, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_country; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_blocks_country (_order, _parent_id, _path, id, name, label, width, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_email; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_blocks_email (_order, _parent_id, _path, id, name, label, width, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_message; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_blocks_message (_order, _parent_id, _path, id, message, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_number; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_blocks_number (_order, _parent_id, _path, id, name, label, width, default_value, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_select; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_blocks_select (_order, _parent_id, _path, id, name, label, width, default_value, placeholder, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_select_options; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_blocks_select_options (_order, _parent_id, id, label, value) FROM stdin;
\.


--
-- Data for Name: forms_blocks_state; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_blocks_state (_order, _parent_id, _path, id, name, label, width, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_text; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_blocks_text (_order, _parent_id, _path, id, name, label, width, default_value, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_textarea; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_blocks_textarea (_order, _parent_id, _path, id, name, label, width, default_value, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_emails; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.forms_emails (_order, _parent_id, id, email_to, cc, bcc, reply_to, email_from, subject, message) FROM stdin;
\.


--
-- Data for Name: header; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.header (id, updated_at, created_at) FROM stdin;
1	2025-11-04 12:25:16.835+00	2025-11-04 12:25:16.835+00
\.


--
-- Data for Name: header_nav_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.header_nav_items (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label) FROM stdin;
1	1	6909f0a1e686f95486fdb256	reference	\N	\N	Home
2	1	6909f075e686f95486fdb250	reference	\N	\N	About us
3	1	6909f090e686f95486fdb252	reference	\N	\N	Contact
4	1	6909f09ae686f95486fdb254	reference	\N	\N	FAQ
\.


--
-- Data for Name: header_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.header_rels (id, "order", parent_id, path, pages_id, posts_id) FROM stdin;
\.


--
-- Data for Name: lands; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lands (id, title, slug, purpose, area, price, location_city, location_district, location_address, status, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: lands_communications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lands_communications (_order, _parent_id, id, communication) FROM stdin;
\.


--
-- Data for Name: lands_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lands_images (_order, _parent_id, id, image_id) FROM stdin;
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.media (id, alt, caption, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height, sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename, sizes_square_url, sizes_square_width, sizes_square_height, sizes_square_mime_type, sizes_square_filesize, sizes_square_filename, sizes_small_url, sizes_small_width, sizes_small_height, sizes_small_mime_type, sizes_small_filesize, sizes_small_filename, sizes_medium_url, sizes_medium_width, sizes_medium_height, sizes_medium_mime_type, sizes_medium_filesize, sizes_medium_filename, sizes_large_url, sizes_large_width, sizes_large_height, sizes_large_mime_type, sizes_large_filesize, sizes_large_filename, sizes_xlarge_url, sizes_xlarge_width, sizes_xlarge_height, sizes_xlarge_mime_type, sizes_xlarge_filesize, sizes_xlarge_filename, sizes_og_url, sizes_og_width, sizes_og_height, sizes_og_mime_type, sizes_og_filesize, sizes_og_filename) FROM stdin;
1	\N	\N	2026-05-13 13:56:50.969+00	2026-05-13 13:56:50.968+00	\N	\N	download.jpg	image/jpeg	8329	225	225	50	50	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
2	get keys	\N	2026-05-13 13:58:43.639+00	2026-05-13 13:58:43.639+00	\N	\N	download-1.jpg	image/jpeg	5663	300	168	50	50	\N	300	168	image/jpeg	6464	download-1-300x168.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.messages (id, message, attachment_id, realtor_id, subject, name, email, phone, property, status, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages (id, title, hero_type, hero_rich_text, hero_media_id, meta_title, meta_image_id, meta_description, published_at, slug, slug_lock, updated_at, created_at, _status) FROM stdin;
2	nnmklmk	lowImpact	\N	\N	\N	\N	\N	2026-05-13 14:01:34.948+00	nnmklmk	t	2026-05-13 14:02:19.399+00	2026-05-13 14:01:21.466+00	published
5	Демо	none	\N	\N	Демо страница — Realty	\N	Демонстрационная страница, собранная из блоков: vision/mission, шаги, преимущества, удобства, контент, FAQ, карта и CTA.	\N	demo	t	2026-05-13 15:33:38.219+00	2026-05-13 15:16:22.885+00	published
6	Главная (Realestic)	none	\N	\N	Главная (Realestic) — Realty	\N	Найдите дом, который подходит вашей жизни. Демонстрационная главная страница в стиле Realestic.	\N	home-v2	t	2026-05-13 15:33:38.404+00	2026-05-13 15:33:38.402+00	published
7	О компании	none	\N	\N	О компании — Realty	\N	Команда Realty: 12 лет опыта, 190+ закрытых сделок и индивидуальный подход к каждому клиенту.	\N	about	t	2026-05-13 15:33:38.538+00	2026-05-13 15:33:38.538+00	published
8	Наши агенты	none	\N	\N	Наши агенты — Realty	\N	Команда профессионалов, которая ведёт сделки с недвижимостью под ключ.	\N	agents	t	2026-05-13 15:33:38.627+00	2026-05-13 15:33:38.626+00	published
9	Блог	none	\N	\N	Блог — Realty	\N	Гайды и обзоры рынка недвижимости от команды Realty.	\N	blogs	t	2026-05-13 15:33:38.703+00	2026-05-13 15:33:38.703+00	published
10	Контакты	none	\N	\N	Контакты — Realty	\N	Свяжитесь с командой Realty — email, телефон, форма обратной связи и карта объектов.	\N	contact	t	2026-05-13 15:33:38.779+00	2026-05-13 15:33:38.779+00	published
\.


--
-- Data for Name: pages_blocks_about_hero; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_about_hero (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
1	2	layout	6908f234eb4cd9132e66743d	about-hero	About us	Connect with our experts and bring your Real Estate ideas to life	\N
\.


--
-- Data for Name: pages_blocks_about_hero_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_about_hero_images (_order, _parent_id, id, image_id) FROM stdin;
\.


--
-- Data for Name: pages_blocks_agents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_agents (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
4	2	layout	6908f29d1c57284fa7aa670d	agents	Agents	Meet our exceptional agents for a seamless experience	\N
\.


--
-- Data for Name: pages_blocks_amenities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_amenities (_order, _parent_id, _path, id, block_type, label, title, image_id, block_name) FROM stdin;
4	5	layout	6a0499d2e82ec8002f1184bf	amenities	Удобства	Что входит в современный жилой комплекс	1	\N
3	7	layout	6a0499d2e82ec8002f1184ef	amenities	Что вы получаете	Сервис, который продумывает детали	2	\N
\.


--
-- Data for Name: pages_blocks_amenities_amenities; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_amenities_amenities (_order, _parent_id, id, icon, title) FROM stdin;
1	6a0499d2e82ec8002f1184bf	6a0499d2e82ec8002f1184bb	clean	Чистота на территории
2	6a0499d2e82ec8002f1184bf	6a0499d2e82ec8002f1184bc	wifi	Высокоскоростной интернет
3	6a0499d2e82ec8002f1184bf	6a0499d2e82ec8002f1184bd	shield	Круглосуточная охрана
4	6a0499d2e82ec8002f1184bf	6a0499d2e82ec8002f1184be	gym	Фитнес-зал и магазины
1	6a0499d2e82ec8002f1184ef	6a0499d2e82ec8002f1184eb	shield	Полное юридическое сопровождение
2	6a0499d2e82ec8002f1184ef	6a0499d2e82ec8002f1184ec	wifi	Онлайн-просмотры и виртуальные туры
3	6a0499d2e82ec8002f1184ef	6a0499d2e82ec8002f1184ed	gym	Партнёрские программы с банками
4	6a0499d2e82ec8002f1184ef	6a0499d2e82ec8002f1184ee	clean	Прозрачные условия без скрытых комиссий
\.


--
-- Data for Name: pages_blocks_archive; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_archive (_order, _parent_id, _path, id, intro_content, populate_by, relation_to, "limit", block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_blog; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_blog (_order, _parent_id, _path, id, block_type, title, subtitle, show_all_link, items_per_page, block_name) FROM stdin;
8	6	layout	6a0499d2e82ec8002f1184e3	blog	Экспертные советы и обзоры рынка недвижимости	Блог	/posts	3	\N
2	9	layout	6a0499d2e82ec8002f1184ff	blog	Свежие материалы для покупателей и инвесторов	Последние статьи	/posts	6	\N
\.


--
-- Data for Name: pages_blocks_call_to_action_new; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_call_to_action_new (_order, _parent_id, _path, id, block_type, label, title, button_text, button_link, block_name) FROM stdin;
8	5	layout	6a0499d2e82ec8002f1184c8	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	\N
9	6	layout	6a0499d2e82ec8002f1184e4	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	\N
5	7	layout	6a0499d2e82ec8002f1184f4	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	\N
3	8	layout	6a0499d2e82ec8002f1184fd	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	\N
4	9	layout	6a0499d2e82ec8002f118504	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	\N
5	10	layout	6a0499d2e82ec8002f11850c	call-to-action-new	Готовы начать?	Свяжитесь с нами — найдём вариант под ваши задачи	Перейти к объектам	/flats	\N
\.


--
-- Data for Name: pages_blocks_contact_hero; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_contact_hero (_order, _parent_id, _path, id, block_type, label, title, image_id, email, phone, location, block_name) FROM stdin;
1	10	layout	6a0499d2e82ec8002f118505	contact-hero	Контакты	Свяжитесь с нами сегодня — мы поможем	1	hello@realty.local	+7 (495) 123-45-67	Москва, Тверская 12	\N
\.


--
-- Data for Name: pages_blocks_contact_us_form; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_contact_us_form (_order, _parent_id, _path, id, block_type, label, title, form_id, block_name) FROM stdin;
2	10	layout	6a0499d2e82ec8002f118506	contact-us-form	Обратная связь	Оставьте заявку — мы перезвоним	1	\N
\.


--
-- Data for Name: pages_blocks_content; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_content (_order, _parent_id, _path, id, block_name) FROM stdin;
5	5	layout	6a0499d2e82ec8002f1184c1	\N
\.


--
-- Data for Name: pages_blocks_content_columns; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_content_columns (_order, _parent_id, id, size, rich_text, enable_link, link_type, link_new_tab, link_url, link_label, link_appearance) FROM stdin;
1	6a0499d2e82ec8002f1184c1	6a0499d2e82ec8002f1184c0	full	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Мы помогаем клиентам не просто купить недвижимость, а сделать осознанный выбор. Свяжитесь с нами — расскажем о свежих предложениях и нюансах рынка в вашем городе.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": "ltr", "textStyle": "", "textFormat": 0}], "direction": "ltr"}}	f	reference	\N	\N	\N	default
\.


--
-- Data for Name: pages_blocks_cta; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_cta (_order, _parent_id, _path, id, rich_text, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_cta_links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_cta_links (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label, link_appearance) FROM stdin;
\.


--
-- Data for Name: pages_blocks_faq; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_faq (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
6	5	layout	6a0499d2e82ec8002f1184c6	faq	FAQ	Часто задаваемые вопросы	\N
3	9	layout	6a0499d2e82ec8002f118503	faq	Частые вопросы	О чём чаще всего спрашивают наши читатели	\N
4	10	layout	6a0499d2e82ec8002f11850b	faq	FAQ	Часто задаваемые вопросы	\N
\.


--
-- Data for Name: pages_blocks_faq_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_faq_items (_order, _parent_id, id, question, answer) FROM stdin;
1	6a0499d2e82ec8002f1184c6	6a0499d2e82ec8002f1184c2	С чего начать покупку квартиры?	С предварительного одобрения ипотеки и определения бюджета. Это покажет продавцам, что вы серьёзный покупатель.
2	6a0499d2e82ec8002f1184c6	6a0499d2e82ec8002f1184c3	Сколько занимает оформление сделки?	Обычно от 30 до 45 дней с момента подписания договора до регистрации права собственности.
3	6a0499d2e82ec8002f1184c6	6a0499d2e82ec8002f1184c4	Нужен ли осмотр квартиры специалистом?	Да, независимая техническая экспертиза помогает выявить скрытые недостатки до сделки.
4	6a0499d2e82ec8002f1184c6	6a0499d2e82ec8002f1184c5	Что такое рынок продавца?	Это состояние рынка, когда спрос превышает предложение, цены растут и решение нужно принимать быстро.
1	6a0499d2e82ec8002f118503	6a0499d2e82ec8002f118500	Как часто выходят новые статьи?	Мы публикуем 2–3 материала в неделю — гайды, разборы сделок и обзоры новых районов.
2	6a0499d2e82ec8002f118503	6a0499d2e82ec8002f118501	Можно ли предложить тему?	Да — напишите нам через форму обратной связи, и мы возьмём идею в работу.
3	6a0499d2e82ec8002f118503	6a0499d2e82ec8002f118502	Есть ли подписка на рассылку?	Пока нет, но мы планируем запустить её в ближайшее время. Следите за обновлениями.
1	6a0499d2e82ec8002f11850b	6a0499d2e82ec8002f118508	Как быстро вы отвечаете на заявки?	Обычно в течение 30 минут в рабочее время, в остальное — на следующий рабочий день.
2	6a0499d2e82ec8002f11850b	6a0499d2e82ec8002f118509	Можно ли получить консультацию онлайн?	Да, мы проводим консультации по видеосвязи и устраиваем виртуальные туры по объектам.
3	6a0499d2e82ec8002f11850b	6a0499d2e82ec8002f11850a	Берёте ли вы оплату за подбор?	Подбор и первая консультация — бесплатны. Комиссия согласовывается на этапе договора.
\.


--
-- Data for Name: pages_blocks_feature; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_feature (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
3	5	layout	6a0499d2e82ec8002f1184ba	feature	Преимущества	Почему клиенты выбирают нас	\N
4	6	layout	6a0499d2e82ec8002f1184d5	feature	Преимущества	Почему клиенты выбирают нас	\N
7	6	layout	6a0499d2e82ec8002f1184e2	feature	Почему мы	Три причины работать с Realestic	\N
4	7	layout	6a0499d2e82ec8002f1184f3	feature	Команда	Профессионалы, которые ведут вашу сделку	\N
2	8	layout	6a0499d2e82ec8002f1184fc	feature	Специализации	Каждому запросу — подходящий специалист	\N
\.


--
-- Data for Name: pages_blocks_feature_features; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_feature_features (_order, _parent_id, id, icon, title, description) FROM stdin;
1	6a0499d2e82ec8002f1184ba	6a0499d2e82ec8002f1184b6	user-check	Экспертная поддержка	Каждую сделку ведёт опытный риелтор с глубоким знанием района.
2	6a0499d2e82ec8002f1184ba	6a0499d2e82ec8002f1184b7	shield-check	Юридическая чистота	Полная проверка документов и истории объекта перед сделкой.
3	6a0499d2e82ec8002f1184ba	6a0499d2e82ec8002f1184b8	trending-up	Знание рынка	Актуальные цены и прогнозы помогают принимать точные решения.
4	6a0499d2e82ec8002f1184ba	6a0499d2e82ec8002f1184b9	refresh-cw	Гладкий процесс	От первого звонка до подписания договора — всё под одной крышей.
1	6a0499d2e82ec8002f1184d5	6a0499d2e82ec8002f1184cf	user-check	Экспертная поддержка	Опытные риелторы сопровождают каждую сделку от заявки до подписания.
2	6a0499d2e82ec8002f1184d5	6a0499d2e82ec8002f1184d0	settings	Индивидуальные решения	Подбираем варианты под конкретные задачи и бюджет, без шаблонов.
3	6a0499d2e82ec8002f1184d5	6a0499d2e82ec8002f1184d1	trending-up	Знание рынка	Актуальные данные о ценах и динамике в каждом районе.
4	6a0499d2e82ec8002f1184d5	6a0499d2e82ec8002f1184d2	refresh-cw	Прозрачный процесс	От первого звонка до ключей — всё под одной крышей.
5	6a0499d2e82ec8002f1184d5	6a0499d2e82ec8002f1184d3	users	Клиентоориентированность	Слушаем, уточняем, согласовываем каждый шаг.
6	6a0499d2e82ec8002f1184d5	6a0499d2e82ec8002f1184d4	shield-check	Надёжные партнёры	Юристы, оценщики и банки, проверенные годами работы.
1	6a0499d2e82ec8002f1184e2	6a0499d2e82ec8002f1184df	map-pin	Знание района	Подскажем где школы, парковки, какое движение и какие планы по застройке.
2	6a0499d2e82ec8002f1184e2	6a0499d2e82ec8002f1184e0	heart	Персональный сервис	Один менеджер ведёт вас от первого звонка до подписания договора.
3	6a0499d2e82ec8002f1184e2	6a0499d2e82ec8002f1184e1	award	Подтверждённый опыт	Сотни закрытых сделок и положительных отзывов клиентов.
1	6a0499d2e82ec8002f1184f3	6a0499d2e82ec8002f1184f0	user-check	Старшие консультанты	Опыт от 5 лет, специализация на жилых и инвестиционных объектах.
2	6a0499d2e82ec8002f1184f3	6a0499d2e82ec8002f1184f1	star	Специалисты по luxury	Закрытые показы, эксклюзивные предложения, конфиденциальность.
3	6a0499d2e82ec8002f1184f3	6a0499d2e82ec8002f1184f2	key	Менеджеры по объектам	Управление арендой и постпродажное сопровождение под ключ.
1	6a0499d2e82ec8002f1184fc	6a0499d2e82ec8002f1184f6	user-check	Старший консультант	Жилая недвижимость: квартиры, новостройки, вторичный рынок.
2	6a0499d2e82ec8002f1184fc	6a0499d2e82ec8002f1184f7	star	Специалист по luxury	Премиальные объекты с конфиденциальным сопровождением.
3	6a0499d2e82ec8002f1184fc	6a0499d2e82ec8002f1184f8	key	Менеджер по объектам	Управление арендой, страхование и сервисное обслуживание.
4	6a0499d2e82ec8002f1184fc	6a0499d2e82ec8002f1184f9	trending-up	Инвестиционный советник	Подбор объектов под доходность и стратегию выхода.
5	6a0499d2e82ec8002f1184fc	6a0499d2e82ec8002f1184fa	map-pin	Эксперт района	Глубокое знание локальной инфраструктуры и динамики цен.
6	6a0499d2e82ec8002f1184fc	6a0499d2e82ec8002f1184fb	shield-check	Юридическая поддержка	Проверка документов, сопровождение сделки до Росреестра.
\.


--
-- Data for Name: pages_blocks_form_block; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_form_block (_order, _parent_id, _path, id, form_id, enable_intro, intro_content, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_hero; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_hero (_order, _parent_id, _path, id, badge_text, headline, highlight, subheadline, image_id, block_name) FROM stdin;
1	2	layout	6a04845ab410c3a1bc0ff5d4	km.	knk ;	km;	\N	2	\N
1	6	layout	6a0499d2e82ec8002f1184c9	Real Estate	Найдите дом,	который подходит вашей жизни	От уютных квартир в центре до загородных домов — поможем подобрать недвижимость, которая отражает ваши ценности и образ жизни.	1	\N
1	7	layout	6a0499d2e82ec8002f1184e5	О нас	Свяжитесь с нашими экспертами и	воплотите идеи в недвижимости	Многолетний опыт работы на локальном рынке и индивидуальный подход помогают нашим клиентам уверенно покупать, продавать и инвестировать.	1	\N
1	8	layout	6a0499d2e82ec8002f1184f5	Команда	Знакомьтесь — наши	исключительные агенты	Опытные риелторы, которые знают рынок изнутри и сделают вашу сделку максимально комфортной.	1	\N
1	9	layout	6a0499d2e82ec8002f1184fe	Блог	Экспертные советы и	обзоры рынка недвижимости	Гайды, аналитика и мнения экспертов — всё, что поможет принять взвешенное решение о покупке или продаже.	1	\N
\.


--
-- Data for Name: pages_blocks_house_filter; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_house_filter (_order, _parent_id, _path, id, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_house_filter_filters; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_house_filter_filters (_order, _parent_id, id, label, collection) FROM stdin;
\.


--
-- Data for Name: pages_blocks_house_filter_filters_fields; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_house_filter_filters_fields (_order, _parent_id, id, name, label, type, min, max, step) FROM stdin;
\.


--
-- Data for Name: pages_blocks_house_filter_filters_fields_options; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_house_filter_filters_fields_options (_order, _parent_id, id, value, label) FROM stdin;
\.


--
-- Data for Name: pages_blocks_how_it_works; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_how_it_works (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
2	5	layout	6a0499d2e82ec8002f1184b5	how-it-works	Как это работает	Три простых шага до новой квартиры	\N
6	6	layout	6a0499d2e82ec8002f1184de	how-it-works	Как это работает	Найти, посмотреть, оформить — три простых шага	\N
\.


--
-- Data for Name: pages_blocks_how_it_works_steps; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_how_it_works_steps (_order, _parent_id, id, icon, title, description) FROM stdin;
1	6a0499d2e82ec8002f1184b5	6a0499d2e82ec8002f1184b2	1	Заявка	Оставьте короткую заявку или подберите интересующий объект в каталоге.
2	6a0499d2e82ec8002f1184b5	6a0499d2e82ec8002f1184b3	2	Подбор	Наш агент подберёт варианты, организует показы и сопроводит сделку.
3	6a0499d2e82ec8002f1184b5	6a0499d2e82ec8002f1184b4	3	Сделка	Юристы проверят документы и проведут оформление под ключ.
1	6a0499d2e82ec8002f1184de	6a0499d2e82ec8002f1184db	1	Найдите	Просмотрите подборку и сохраните понравившиеся варианты в избранное.
2	6a0499d2e82ec8002f1184de	6a0499d2e82ec8002f1184dc	2	Запланируйте	Договоритесь о просмотре в удобное время — онлайн или вживую.
3	6a0499d2e82ec8002f1184de	6a0499d2e82ec8002f1184dd	3	Оформите	Юристы проверят документы и сопроводят сделку до получения ключей.
\.


--
-- Data for Name: pages_blocks_map; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_map (_order, _parent_id, _path, id, block_type, title, center_lat, center_lng, center_zoom, auto_load, "limit", block_name) FROM stdin;
7	5	layout	6a0499d2e82ec8002f1184c7	map	Наши объекты на карте	55.751244	37.618423	11	t	20	\N
3	10	layout	6a0499d2e82ec8002f118507	map	Наши объекты на карте	55.751244	37.618423	11	t	20	\N
\.


--
-- Data for Name: pages_blocks_media_block; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_media_block (_order, _parent_id, _path, id, media_id, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_navbar; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_navbar (_order, _parent_id, _path, id, logo_text, button_text, button_url, avatar_id, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_navbar_links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_navbar_links (_order, _parent_id, id, text, url) FROM stdin;
\.


--
-- Data for Name: pages_blocks_properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_properties (_order, _parent_id, _path, id, block_type, title, show_all_link, layout, items_per_page, enable_filters, filters_price_range, filters_property_type, filters_bedrooms, filters_bathrooms, filters_area, block_name) FROM stdin;
3	6	layout	6a0499d2e82ec8002f1184ce	properties	Готовы купить дом мечты? Найдите его здесь	/flats	grid	6	f	t	t	t	t	t	\N
\.


--
-- Data for Name: pages_blocks_property_features; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_property_features (_order, _parent_id, _path, id, block_type, property_id, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_testimonials; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_testimonials (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_vision; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_vision (_order, _parent_id, _path, id, title, subtitle, button_text, button_link, block_name) FROM stdin;
2	6	layout	6a0499d2e82ec8002f1184cd	Дом мечты, разумные инвестиции и образ жизни класса люкс	Realestic	Смотреть объекты	/flats	\N
\.


--
-- Data for Name: pages_blocks_vision_items; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_vision_items (_order, _parent_id, id, icon, title, description) FROM stdin;
1	6a0499d2e82ec8002f1184cd	6a0499d2e82ec8002f1184ca	home	Дом мечты	Помогаем находить варианты, которые действительно соответствуют вашему ритму жизни.
2	6a0499d2e82ec8002f1184cd	6a0499d2e82ec8002f1184cb	trending-up	Разумные инвестиции	Подбираем объекты с устойчивым ростом стоимости и доходом от аренды.
3	6a0499d2e82ec8002f1184cd	6a0499d2e82ec8002f1184cc	star	Класс люкс	Закрытые продажи и эксклюзивные предложения для требовательных клиентов.
\.


--
-- Data for Name: pages_blocks_vision_mission; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_vision_mission (_order, _parent_id, _path, id, block_type, title, description, button_text, button_link, block_name) FROM stdin;
2	2	layout	6908f263853ee60a32203a2b	vision-mission	Your trusted real estate experts:	With years of local expertise, we're committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client's unique needs are met with professionalism and care.	View Properties	/properties	\N
1	5	layout	6a0499d2e82ec8002f1184b1	vision-mission	Ваш надёжный партнёр на рынке недвижимости	Многолетний опыт работы на локальном рынке и индивидуальный подход помогают нашим клиентам уверенно покупать, продавать и инвестировать в недвижимость.	Смотреть объекты	/flats	\N
5	6	layout	6a0499d2e82ec8002f1184da	vision-mission	В Realestic наша миссия проста — помочь вам найти идеальный дом	Мы строим долгосрочные отношения с клиентами, основанные на доверии, открытом общении и качественном результате. Каждый объект проходит проверку, каждая сделка — юридическое сопровождение.	Смотреть объекты	/flats	\N
2	7	layout	6a0499d2e82ec8002f1184ea	vision-mission	Цифры, которые говорят за нас	За 12 лет работы мы помогли сотням семей найти дом, инвесторам — выгодные объекты, а бизнесу — коммерческие площади под рост. Качество, скорость, прозрачность.	Смотреть объекты	/flats	\N
\.


--
-- Data for Name: pages_blocks_vision_mission_stats; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_blocks_vision_mission_stats (_order, _parent_id, id, value, label) FROM stdin;
1	6908f263853ee60a32203a2b	6908f263ed87e9514861c38a	98%	Satisfaction rate
2	6908f263853ee60a32203a2b	6908f263ed87e9514861c38b	200+	Properties sold
3	6908f263853ee60a32203a2b	6908f263ed87e9514861c38c	500+	Project done
4	6908f263853ee60a32203a2b	6908f263ed87e9514861c38d	90%	Happy Clients
1	6a0499d2e82ec8002f1184b1	6a0499d2e82ec8002f1184ad	98%	Довольных клиентов
2	6a0499d2e82ec8002f1184b1	6a0499d2e82ec8002f1184ae	200+	Сделок закрыто
3	6a0499d2e82ec8002f1184b1	6a0499d2e82ec8002f1184af	500+	Проектов
4	6a0499d2e82ec8002f1184b1	6a0499d2e82ec8002f1184b0	12	Лет на рынке
1	6a0499d2e82ec8002f1184da	6a0499d2e82ec8002f1184d6	98%	Довольных клиентов
2	6a0499d2e82ec8002f1184da	6a0499d2e82ec8002f1184d7	200+	Сделок
3	6a0499d2e82ec8002f1184da	6a0499d2e82ec8002f1184d8	500+	Проектов
4	6a0499d2e82ec8002f1184da	6a0499d2e82ec8002f1184d9	12	Лет на рынке
1	6a0499d2e82ec8002f1184ea	6a0499d2e82ec8002f1184e6	80%	Удовлетворённость
2	6a0499d2e82ec8002f1184ea	6a0499d2e82ec8002f1184e7	190+	Объектов продано
3	6a0499d2e82ec8002f1184ea	6a0499d2e82ec8002f1184e8	490+	Проектов
4	6a0499d2e82ec8002f1184ea	6a0499d2e82ec8002f1184e9	12	Лет на рынке
\.


--
-- Data for Name: pages_hero_links; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_hero_links (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label, link_appearance) FROM stdin;
\.


--
-- Data for Name: pages_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.pages_rels (id, "order", parent_id, path, pages_id, posts_id, categories_id, commercial_id, flats_id, lands_id, residential_complexes_id, agents_id, testimonials_id, properties_id) FROM stdin;
\.


--
-- Data for Name: payload_jobs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_jobs (id, input, completed_at, total_tried, has_error, error, task_slug, queue, wait_until, processing, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: payload_jobs_log; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_jobs_log (_order, _parent_id, id, executed_at, completed_at, task_slug, task_i_d, input, output, state, error) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, pages_id, posts_id, media_id, categories_id, users_id, properties_id, agents_id, testimonials_id, flats_id, residential_complexes_id, commercial_id, lands_id, reviews_id, messages_id, redirects_id, forms_id, form_submissions_id, search_id, payload_jobs_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2026-05-13 15:39:37.36+00	2026-05-13 10:57:11.853+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
2	collection-posts	{}	2026-05-13 11:03:15.349+00	2026-05-13 11:03:15.349+00
3	collection-flats	{"editViewType": "default"}	2026-05-13 13:55:56.08+00	2026-05-13 13:55:53.521+00
4	collection-users	{"editViewType": "default"}	2026-05-13 13:56:15.753+00	2026-05-13 13:56:15.754+00
6	collection-pages-2	{"fields": {"layout": {"collapsed": []}, "_index-1": {"tabIndex": 1}}}	2026-05-13 14:01:53.653+00	2026-05-13 14:01:32.383+00
7	collection-media	{}	2026-05-13 14:02:15.315+00	2026-05-13 14:02:15.315+00
1	collection-pages	{"editViewType": "live-preview"}	2026-05-13 14:02:37.757+00	2026-05-13 11:02:50.224+00
20	global-header	{"editViewType": "default"}	2026-05-13 14:36:45.528+00	2026-05-13 14:36:45.529+00
21	collection-search	{}	2026-05-13 14:36:50.392+00	2026-05-13 14:36:50.392+00
22	collection-forms	{}	2026-05-13 14:36:51.758+00	2026-05-13 14:36:51.758+00
23	collection-redirects	{}	2026-05-13 14:36:56.923+00	2026-05-13 14:36:56.923+00
24	collection-agents	{}	2026-05-13 14:36:58.117+00	2026-05-13 14:36:58.117+00
25	collection-categories	{}	2026-05-13 14:37:00.663+00	2026-05-13 14:37:00.663+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
2	\N	2	user	1
4	\N	3	user	1
5	\N	4	user	1
11	\N	6	user	1
12	\N	7	user	1
15	\N	1	user	1
98	\N	20	user	1
99	\N	21	user	1
100	\N	22	user	1
101	\N	23	user	1
102	\N	24	user	1
103	\N	25	user	1
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.posts (id, title, image_id, published_date, excerpt, content, author_id, status, meta_title, meta_description, meta_image_id, slug, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: posts_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.posts_rels (id, "order", parent_id, path, categories_id) FROM stdin;
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.properties (id, title, slug, address, coordinates_lat, coordinates_lng, coordinates_address, price, type, bedrooms, bathrooms, area, description, status, updated_at, created_at) FROM stdin;
1	dsad	dsad	addsa	123	321	321	321	rent	321	321	321	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "dsada", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	active	2025-11-03 18:13:28.334+00	2025-11-03 18:13:02.971+00
\.


--
-- Data for Name: properties_features; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.properties_features (_order, _parent_id, id, feature) FROM stdin;
1	1	6908f0c113f1b4599131f65b	214342
\.


--
-- Data for Name: properties_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.properties_images (_order, _parent_id, id, image_id) FROM stdin;
1	1	6908f0a5f867cf36b9a3e5f2	2
\.


--
-- Data for Name: redirects; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.redirects (id, "from", to_type, to_url, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: redirects_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.redirects_rels (id, "order", parent_id, path, pages_id, posts_id) FROM stdin;
\.


--
-- Data for Name: residential_complexes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.residential_complexes (id, name, slug, status, type, developer, location_city, location_district, location_address, completion_date, description, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: residential_complexes_images; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.residential_complexes_images (_order, _parent_id, id, image_id) FROM stdin;
\.


--
-- Data for Name: residential_complexes_infrastructure; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.residential_complexes_infrastructure (_order, _parent_id, id, item) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.reviews (id, realtor_id, author_name, author_email, rating, comment, status, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: search; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.search (id, title, priority, slug, meta_title, meta_description, meta_image_id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: search_categories; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.search_categories (_order, _parent_id, id, relation_to, title) FROM stdin;
\.


--
-- Data for Name: search_rels; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.search_rels (id, "order", parent_id, path, posts_id) FROM stdin;
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.testimonials (id, name, location, image_id, text, rating, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, slug, role, phone, agency, photo_id, bio, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	mike	mike	admin	\N	\N	\N	\N	2026-05-13 11:02:34.515+00	2026-05-13 11:02:34.514+00	m.sharabarin05@mail.ru	\N	\N	0f8523b2387b7c0679ae2deb6ae88c6478b1277bdfa84f3417510a872b2e84a8	38ac7115664eba0b43145882f569aef6a432b7238ad8cbbbafb12c71b03962299b4709d21cc7388be62f826cf4022f80bf88adba3b6c3a253fcaa54f041cfd982a35618320901a02b37292bced6718d68f53ef3f96aa2e81257ec013a0dab954cf4aea758c793d83f2fdeb75af35060921781994772c4b66915017ceab45724df1af6f47feef05367a7c1d1c6cccebdd36604de685543d9adbe330160a40b5564c95f51ae6c7e4e0959b7f01c544d11455f3a07e3bad85da6398d7fc9560fbc70d33380a7ec95868c233395e5a48fe4ff0bde844654f21dbd8ad125541071ccd47a8a8366d37fee950c38abb9e5af8c499c1c14c1ccb08cb7974ed1a1fa8d4f5c22d7000864ffc1e13b50ab333af7ee9cb58635385320f4cfeb98198e993f1fb0e4ccb778665f583b2b0edfdc92cb667c4286c51fcd0e0cc38e41e17096941162f76a36bcbeecbbf598f0635fc606bd714be3449e3bbc2f0e3b88fd1d79cea70cda0dcfec25d378b42b2a7129919cc93d19e0aec274ebc7e728f63a36ff5e2aa1804502c4741950efbb88e51e6ce813e7ddc13c05266dcf08ed2b5ca06df9fa635b50879c10b72796df1ab119449ceca2185776fb7087473b55bc97c4778f1219d16fa9d099600e733a741cb5248fade175301e5a77bd25e7a51968c59e940d7f206ba8fd25ba27ddfcf3fe4f18af37ef962ab40600892b39df9703ee0a6f403	0	\N
2	Name	name	realtor	+1 (801) 283-6655	alma house	1	\N	2026-05-13 13:57:03.745+00	2026-05-13 13:57:03.745+00	mihailpersonalemail@gmail.com	\N	\N	c6306fa589493ce9475b43c353e52c98194f0afdb73bcf1ed83caa0afbcadcca	c520dc1d0e86b9f5eb65a2b5f742c4e4386d456b2d6849d152348bb5dfe88e67525c67e7382ccd63dc9453b40407c64f98ac7095c9c7e721e329c2843a0d32435ceb115fd1e31f37b23f5be56956f576208c62c4755436c778973630c77301b468fbdcd2e1b6f8a3877718b1825f9bef9b1f77aebcbf0a2b65c06be74253ad8999ea7448dc90a579814606d9770eb1601b8aa6effb5487a60514e62152bf89d0063390505a9ddde9060abd83c20c7b6072b0a46a635a8eddb9f825767f244cf0b27c490bffdaf96942a6a2d346f1a2650d50675d9b56fff490a58fc5f9cf0c647bfcf91868fcd1950538c234a30d824bdee386993acf512f833c8a810fc0a228160ff495670929fcfdb4e413d2d3abd0df88f87680d830126f1a59ed4e80e5f46b68f0b6d9ca28485100bff8c7e1f728177acadeadd346ebea4bcddd95bbc0fb8f75996f0a60fe438219185f7593354976c6893d21cca45a3f56d2b5ada151d5defbb92989c4e17d64d67b65c69fda7e5105df7947199fae92d69cfcd3708ef1732843f1f5e4d2bbf878e94b66f25b0d2fa3e3d25796e199e931434405b95c35683a041be69bb478f93bb34ceede12b96c5ff43d5eae1aadec10cc84d82e12b25b8d3fc43fb58d4055cf56fab84c9c57d66d3576e0952b406b0386e9c7287367b6b1ce17fa676aea90af2fd6979914cce09994fd9644f07c770b11e3fb037d0a	0	\N
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	649a8952-d962-45b2-aa7b-657adf22d7a5	2026-05-13 13:31:27.869+00	2026-05-13 15:31:27.869+00
1	1	3c37c340-b150-460b-a24b-7b41c2ad937b	2025-11-04 08:47:01.871+00	2025-11-04 14:44:51.012+00
\.


--
-- Name: _pages_v_blocks_about_hero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_about_hero_id_seq', 16, true);


--
-- Name: _pages_v_blocks_about_hero_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_about_hero_images_id_seq', 39, true);


--
-- Name: _pages_v_blocks_agents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_agents_id_seq', 6, true);


--
-- Name: _pages_v_blocks_amenities_amenities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_amenities_amenities_id_seq', 52, true);


--
-- Name: _pages_v_blocks_amenities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_amenities_id_seq', 13, true);


--
-- Name: _pages_v_blocks_archive_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_archive_id_seq', 1, false);


--
-- Name: _pages_v_blocks_blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_blog_id_seq', 30, true);


--
-- Name: _pages_v_blocks_call_to_action_new_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_call_to_action_new_id_seq', 15, true);


--
-- Name: _pages_v_blocks_contact_hero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_contact_hero_id_seq', 9, true);


--
-- Name: _pages_v_blocks_contact_us_form_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_contact_us_form_id_seq', 7, true);


--
-- Name: _pages_v_blocks_content_columns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_content_columns_id_seq', 4, true);


--
-- Name: _pages_v_blocks_content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_content_id_seq', 4, true);


--
-- Name: _pages_v_blocks_cta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_cta_id_seq', 1, false);


--
-- Name: _pages_v_blocks_cta_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_cta_links_id_seq', 1, false);


--
-- Name: _pages_v_blocks_faq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_faq_id_seq', 59, true);


--
-- Name: _pages_v_blocks_faq_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_faq_items_id_seq', 347, true);


--
-- Name: _pages_v_blocks_feature_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_feature_features_id_seq', 188, true);


--
-- Name: _pages_v_blocks_feature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_feature_id_seq', 69, true);


--
-- Name: _pages_v_blocks_form_block_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_form_block_id_seq', 1, false);


--
-- Name: _pages_v_blocks_hero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_hero_id_seq', 119, true);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_house_filter_filters_fields_id_seq', 5, true);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_house_filter_filters_fields_options_id_seq', 1, false);


--
-- Name: _pages_v_blocks_house_filter_filters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_house_filter_filters_id_seq', 8, true);


--
-- Name: _pages_v_blocks_house_filter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_house_filter_id_seq', 9, true);


--
-- Name: _pages_v_blocks_how_it_works_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_how_it_works_id_seq', 45, true);


--
-- Name: _pages_v_blocks_how_it_works_steps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_how_it_works_steps_id_seq', 123, true);


--
-- Name: _pages_v_blocks_map_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_map_id_seq', 7, true);


--
-- Name: _pages_v_blocks_media_block_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_media_block_id_seq', 1, false);


--
-- Name: _pages_v_blocks_navbar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_navbar_id_seq', 1, false);


--
-- Name: _pages_v_blocks_navbar_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_navbar_links_id_seq', 1, false);


--
-- Name: _pages_v_blocks_properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_properties_id_seq', 88, true);


--
-- Name: _pages_v_blocks_property_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_property_features_id_seq', 2, true);


--
-- Name: _pages_v_blocks_testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_testimonials_id_seq', 39, true);


--
-- Name: _pages_v_blocks_vision_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_vision_id_seq', 107, true);


--
-- Name: _pages_v_blocks_vision_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_vision_items_id_seq', 267, true);


--
-- Name: _pages_v_blocks_vision_mission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_vision_mission_id_seq', 15, true);


--
-- Name: _pages_v_blocks_vision_mission_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_blocks_vision_mission_stats_id_seq', 60, true);


--
-- Name: _pages_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_id_seq', 60, true);


--
-- Name: _pages_v_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_rels_id_seq', 209, true);


--
-- Name: _pages_v_version_hero_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public._pages_v_version_hero_links_id_seq', 69, true);


--
-- Name: agents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.agents_id_seq', 1, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- Name: commercial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.commercial_id_seq', 1, false);


--
-- Name: flats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.flats_id_seq', 2, true);


--
-- Name: footer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.footer_id_seq', 1, false);


--
-- Name: footer_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.footer_rels_id_seq', 1, false);


--
-- Name: form_submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.form_submissions_id_seq', 1, false);


--
-- Name: forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.forms_id_seq', 1, true);


--
-- Name: header_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.header_id_seq', 1, true);


--
-- Name: header_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.header_rels_id_seq', 4, true);


--
-- Name: lands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.lands_id_seq', 1, false);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.media_id_seq', 13, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- Name: pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pages_id_seq', 10, true);


--
-- Name: pages_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pages_rels_id_seq', 45, true);


--
-- Name: payload_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_jobs_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 168, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 302, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 25, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 103, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 3, true);


--
-- Name: posts_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_rels_id_seq', 1, false);


--
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.properties_id_seq', 1, true);


--
-- Name: redirects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.redirects_id_seq', 1, false);


--
-- Name: redirects_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.redirects_rels_id_seq', 1, false);


--
-- Name: residential_complexes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.residential_complexes_id_seq', 1, false);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- Name: search_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.search_id_seq', 3, true);


--
-- Name: search_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.search_rels_id_seq', 5, true);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: _pages_v_blocks_about_hero_images _pages_v_blocks_about_hero_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero_images
    ADD CONSTRAINT _pages_v_blocks_about_hero_images_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_about_hero _pages_v_blocks_about_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero
    ADD CONSTRAINT _pages_v_blocks_about_hero_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_agents _pages_v_blocks_agents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_agents
    ADD CONSTRAINT _pages_v_blocks_agents_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_amenities_amenities _pages_v_blocks_amenities_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_amenities_amenities
    ADD CONSTRAINT _pages_v_blocks_amenities_amenities_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_amenities _pages_v_blocks_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_amenities
    ADD CONSTRAINT _pages_v_blocks_amenities_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_archive _pages_v_blocks_archive_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_archive
    ADD CONSTRAINT _pages_v_blocks_archive_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_blog _pages_v_blocks_blog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_blog
    ADD CONSTRAINT _pages_v_blocks_blog_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_call_to_action_new _pages_v_blocks_call_to_action_new_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_call_to_action_new
    ADD CONSTRAINT _pages_v_blocks_call_to_action_new_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_contact_hero _pages_v_blocks_contact_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_contact_hero
    ADD CONSTRAINT _pages_v_blocks_contact_hero_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_contact_us_form _pages_v_blocks_contact_us_form_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_contact_us_form
    ADD CONSTRAINT _pages_v_blocks_contact_us_form_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_content_columns _pages_v_blocks_content_columns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_content_columns
    ADD CONSTRAINT _pages_v_blocks_content_columns_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_content _pages_v_blocks_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_content
    ADD CONSTRAINT _pages_v_blocks_content_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_cta_links _pages_v_blocks_cta_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_links
    ADD CONSTRAINT _pages_v_blocks_cta_links_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_cta _pages_v_blocks_cta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta
    ADD CONSTRAINT _pages_v_blocks_cta_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_faq_items _pages_v_blocks_faq_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_faq_items
    ADD CONSTRAINT _pages_v_blocks_faq_items_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_faq _pages_v_blocks_faq_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_faq
    ADD CONSTRAINT _pages_v_blocks_faq_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_feature_features _pages_v_blocks_feature_features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_feature_features
    ADD CONSTRAINT _pages_v_blocks_feature_features_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_feature _pages_v_blocks_feature_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_feature
    ADD CONSTRAINT _pages_v_blocks_feature_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_form_block _pages_v_blocks_form_block_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_form_block
    ADD CONSTRAINT _pages_v_blocks_form_block_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_hero _pages_v_blocks_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_hero
    ADD CONSTRAINT _pages_v_blocks_hero_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options _pages_v_blocks_house_filter_filters_fields_options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields_options
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_fields_options_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_house_filter_filters_fields _pages_v_blocks_house_filter_filters_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_fields_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_house_filter_filters _pages_v_blocks_house_filter_filters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_house_filter _pages_v_blocks_house_filter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter
    ADD CONSTRAINT _pages_v_blocks_house_filter_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_how_it_works _pages_v_blocks_how_it_works_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works
    ADD CONSTRAINT _pages_v_blocks_how_it_works_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_how_it_works_steps _pages_v_blocks_how_it_works_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works_steps
    ADD CONSTRAINT _pages_v_blocks_how_it_works_steps_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_map _pages_v_blocks_map_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_map
    ADD CONSTRAINT _pages_v_blocks_map_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_media_block _pages_v_blocks_media_block_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block
    ADD CONSTRAINT _pages_v_blocks_media_block_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_navbar_links _pages_v_blocks_navbar_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_navbar_links
    ADD CONSTRAINT _pages_v_blocks_navbar_links_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_navbar _pages_v_blocks_navbar_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_navbar
    ADD CONSTRAINT _pages_v_blocks_navbar_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_properties _pages_v_blocks_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_properties
    ADD CONSTRAINT _pages_v_blocks_properties_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_property_features _pages_v_blocks_property_features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_property_features
    ADD CONSTRAINT _pages_v_blocks_property_features_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_testimonials _pages_v_blocks_testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_testimonials
    ADD CONSTRAINT _pages_v_blocks_testimonials_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_vision_items _pages_v_blocks_vision_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision_items
    ADD CONSTRAINT _pages_v_blocks_vision_items_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_vision_mission _pages_v_blocks_vision_mission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission
    ADD CONSTRAINT _pages_v_blocks_vision_mission_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_vision_mission_stats _pages_v_blocks_vision_mission_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission_stats
    ADD CONSTRAINT _pages_v_blocks_vision_mission_stats_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_vision _pages_v_blocks_vision_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision
    ADD CONSTRAINT _pages_v_blocks_vision_pkey PRIMARY KEY (id);


--
-- Name: _pages_v _pages_v_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_rels _pages_v_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_version_hero_links _pages_v_version_hero_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_version_hero_links
    ADD CONSTRAINT _pages_v_version_hero_links_pkey PRIMARY KEY (id);


--
-- Name: agents agents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_pkey PRIMARY KEY (id);


--
-- Name: agents_social_links agents_social_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agents_social_links
    ADD CONSTRAINT agents_social_links_pkey PRIMARY KEY (id);


--
-- Name: categories_breadcrumbs categories_breadcrumbs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories_breadcrumbs
    ADD CONSTRAINT categories_breadcrumbs_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: commercial_images commercial_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.commercial_images
    ADD CONSTRAINT commercial_images_pkey PRIMARY KEY (id);


--
-- Name: commercial commercial_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.commercial
    ADD CONSTRAINT commercial_pkey PRIMARY KEY (id);


--
-- Name: commercial_utilities commercial_utilities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.commercial_utilities
    ADD CONSTRAINT commercial_utilities_pkey PRIMARY KEY (id);


--
-- Name: flats_amenities flats_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flats_amenities
    ADD CONSTRAINT flats_amenities_pkey PRIMARY KEY (id);


--
-- Name: flats_images flats_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flats_images
    ADD CONSTRAINT flats_images_pkey PRIMARY KEY (id);


--
-- Name: flats flats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flats
    ADD CONSTRAINT flats_pkey PRIMARY KEY (id);


--
-- Name: footer_nav_items footer_nav_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_nav_items
    ADD CONSTRAINT footer_nav_items_pkey PRIMARY KEY (id);


--
-- Name: footer footer_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer
    ADD CONSTRAINT footer_pkey PRIMARY KEY (id);


--
-- Name: footer_rels footer_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_rels
    ADD CONSTRAINT footer_rels_pkey PRIMARY KEY (id);


--
-- Name: form_submissions form_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_pkey PRIMARY KEY (id);


--
-- Name: form_submissions_submission_data form_submissions_submission_data_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.form_submissions_submission_data
    ADD CONSTRAINT form_submissions_submission_data_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_checkbox forms_blocks_checkbox_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_checkbox
    ADD CONSTRAINT forms_blocks_checkbox_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_country forms_blocks_country_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_country
    ADD CONSTRAINT forms_blocks_country_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_email forms_blocks_email_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_email
    ADD CONSTRAINT forms_blocks_email_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_message forms_blocks_message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_message
    ADD CONSTRAINT forms_blocks_message_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_number forms_blocks_number_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_number
    ADD CONSTRAINT forms_blocks_number_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_select_options forms_blocks_select_options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_select_options
    ADD CONSTRAINT forms_blocks_select_options_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_select forms_blocks_select_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_select
    ADD CONSTRAINT forms_blocks_select_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_state forms_blocks_state_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_state
    ADD CONSTRAINT forms_blocks_state_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_text forms_blocks_text_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_text
    ADD CONSTRAINT forms_blocks_text_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_textarea forms_blocks_textarea_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_textarea
    ADD CONSTRAINT forms_blocks_textarea_pkey PRIMARY KEY (id);


--
-- Name: forms_emails forms_emails_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_emails
    ADD CONSTRAINT forms_emails_pkey PRIMARY KEY (id);


--
-- Name: forms forms_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (id);


--
-- Name: header_nav_items header_nav_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.header_nav_items
    ADD CONSTRAINT header_nav_items_pkey PRIMARY KEY (id);


--
-- Name: header header_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.header
    ADD CONSTRAINT header_pkey PRIMARY KEY (id);


--
-- Name: header_rels header_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.header_rels
    ADD CONSTRAINT header_rels_pkey PRIMARY KEY (id);


--
-- Name: lands_communications lands_communications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lands_communications
    ADD CONSTRAINT lands_communications_pkey PRIMARY KEY (id);


--
-- Name: lands_images lands_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lands_images
    ADD CONSTRAINT lands_images_pkey PRIMARY KEY (id);


--
-- Name: lands lands_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lands
    ADD CONSTRAINT lands_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_about_hero_images pages_blocks_about_hero_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_about_hero_images
    ADD CONSTRAINT pages_blocks_about_hero_images_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_about_hero pages_blocks_about_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_about_hero
    ADD CONSTRAINT pages_blocks_about_hero_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_agents pages_blocks_agents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_agents
    ADD CONSTRAINT pages_blocks_agents_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_amenities_amenities pages_blocks_amenities_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_amenities_amenities
    ADD CONSTRAINT pages_blocks_amenities_amenities_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_amenities pages_blocks_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_amenities
    ADD CONSTRAINT pages_blocks_amenities_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_archive pages_blocks_archive_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_archive
    ADD CONSTRAINT pages_blocks_archive_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_blog pages_blocks_blog_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_blog
    ADD CONSTRAINT pages_blocks_blog_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_call_to_action_new pages_blocks_call_to_action_new_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_call_to_action_new
    ADD CONSTRAINT pages_blocks_call_to_action_new_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_contact_hero pages_blocks_contact_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_contact_hero
    ADD CONSTRAINT pages_blocks_contact_hero_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_contact_us_form pages_blocks_contact_us_form_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_contact_us_form
    ADD CONSTRAINT pages_blocks_contact_us_form_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_content_columns pages_blocks_content_columns_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_content_columns
    ADD CONSTRAINT pages_blocks_content_columns_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_content pages_blocks_content_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_content
    ADD CONSTRAINT pages_blocks_content_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_cta_links pages_blocks_cta_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta_links
    ADD CONSTRAINT pages_blocks_cta_links_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_cta pages_blocks_cta_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta
    ADD CONSTRAINT pages_blocks_cta_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_faq_items pages_blocks_faq_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_faq_items
    ADD CONSTRAINT pages_blocks_faq_items_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_faq pages_blocks_faq_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_faq
    ADD CONSTRAINT pages_blocks_faq_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_feature_features pages_blocks_feature_features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_feature_features
    ADD CONSTRAINT pages_blocks_feature_features_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_feature pages_blocks_feature_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_feature
    ADD CONSTRAINT pages_blocks_feature_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_form_block pages_blocks_form_block_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_form_block
    ADD CONSTRAINT pages_blocks_form_block_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_hero pages_blocks_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_hero
    ADD CONSTRAINT pages_blocks_hero_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_house_filter_filters_fields_options pages_blocks_house_filter_filters_fields_options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters_fields_options
    ADD CONSTRAINT pages_blocks_house_filter_filters_fields_options_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_house_filter_filters_fields pages_blocks_house_filter_filters_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters_fields
    ADD CONSTRAINT pages_blocks_house_filter_filters_fields_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_house_filter_filters pages_blocks_house_filter_filters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters
    ADD CONSTRAINT pages_blocks_house_filter_filters_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_house_filter pages_blocks_house_filter_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_house_filter
    ADD CONSTRAINT pages_blocks_house_filter_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_how_it_works pages_blocks_how_it_works_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_how_it_works
    ADD CONSTRAINT pages_blocks_how_it_works_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_how_it_works_steps pages_blocks_how_it_works_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_how_it_works_steps
    ADD CONSTRAINT pages_blocks_how_it_works_steps_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_map pages_blocks_map_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_map
    ADD CONSTRAINT pages_blocks_map_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_media_block pages_blocks_media_block_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_media_block
    ADD CONSTRAINT pages_blocks_media_block_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_navbar_links pages_blocks_navbar_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_navbar_links
    ADD CONSTRAINT pages_blocks_navbar_links_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_navbar pages_blocks_navbar_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_navbar
    ADD CONSTRAINT pages_blocks_navbar_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_properties pages_blocks_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_properties
    ADD CONSTRAINT pages_blocks_properties_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_property_features pages_blocks_property_features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_property_features
    ADD CONSTRAINT pages_blocks_property_features_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_testimonials pages_blocks_testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_testimonials
    ADD CONSTRAINT pages_blocks_testimonials_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_vision_items pages_blocks_vision_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_vision_items
    ADD CONSTRAINT pages_blocks_vision_items_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_vision_mission pages_blocks_vision_mission_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_vision_mission
    ADD CONSTRAINT pages_blocks_vision_mission_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_vision_mission_stats pages_blocks_vision_mission_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_vision_mission_stats
    ADD CONSTRAINT pages_blocks_vision_mission_stats_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_vision pages_blocks_vision_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_vision
    ADD CONSTRAINT pages_blocks_vision_pkey PRIMARY KEY (id);


--
-- Name: pages_hero_links pages_hero_links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_hero_links
    ADD CONSTRAINT pages_hero_links_pkey PRIMARY KEY (id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: pages_rels pages_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_jobs_log payload_jobs_log_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_jobs_log
    ADD CONSTRAINT payload_jobs_log_pkey PRIMARY KEY (id);


--
-- Name: payload_jobs payload_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_jobs
    ADD CONSTRAINT payload_jobs_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: posts_rels posts_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_rels
    ADD CONSTRAINT posts_rels_pkey PRIMARY KEY (id);


--
-- Name: properties_features properties_features_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties_features
    ADD CONSTRAINT properties_features_pkey PRIMARY KEY (id);


--
-- Name: properties_images properties_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties_images
    ADD CONSTRAINT properties_images_pkey PRIMARY KEY (id);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- Name: redirects redirects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.redirects
    ADD CONSTRAINT redirects_pkey PRIMARY KEY (id);


--
-- Name: redirects_rels redirects_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.redirects_rels
    ADD CONSTRAINT redirects_rels_pkey PRIMARY KEY (id);


--
-- Name: residential_complexes_images residential_complexes_images_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.residential_complexes_images
    ADD CONSTRAINT residential_complexes_images_pkey PRIMARY KEY (id);


--
-- Name: residential_complexes_infrastructure residential_complexes_infrastructure_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.residential_complexes_infrastructure
    ADD CONSTRAINT residential_complexes_infrastructure_pkey PRIMARY KEY (id);


--
-- Name: residential_complexes residential_complexes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.residential_complexes
    ADD CONSTRAINT residential_complexes_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: search_categories search_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_categories
    ADD CONSTRAINT search_categories_pkey PRIMARY KEY (id);


--
-- Name: search search_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search
    ADD CONSTRAINT search_pkey PRIMARY KEY (id);


--
-- Name: search_rels search_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_rels
    ADD CONSTRAINT search_rels_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_autosave_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_autosave_idx ON public._pages_v USING btree (autosave);


--
-- Name: _pages_v_blocks_about_hero_images_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_about_hero_images_image_idx ON public._pages_v_blocks_about_hero_images USING btree (image_id);


--
-- Name: _pages_v_blocks_about_hero_images_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_about_hero_images_order_idx ON public._pages_v_blocks_about_hero_images USING btree (_order);


--
-- Name: _pages_v_blocks_about_hero_images_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_about_hero_images_parent_id_idx ON public._pages_v_blocks_about_hero_images USING btree (_parent_id);


--
-- Name: _pages_v_blocks_about_hero_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_about_hero_order_idx ON public._pages_v_blocks_about_hero USING btree (_order);


--
-- Name: _pages_v_blocks_about_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_about_hero_parent_id_idx ON public._pages_v_blocks_about_hero USING btree (_parent_id);


--
-- Name: _pages_v_blocks_about_hero_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_about_hero_path_idx ON public._pages_v_blocks_about_hero USING btree (_path);


--
-- Name: _pages_v_blocks_agents_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_agents_order_idx ON public._pages_v_blocks_agents USING btree (_order);


--
-- Name: _pages_v_blocks_agents_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_agents_parent_id_idx ON public._pages_v_blocks_agents USING btree (_parent_id);


--
-- Name: _pages_v_blocks_agents_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_agents_path_idx ON public._pages_v_blocks_agents USING btree (_path);


--
-- Name: _pages_v_blocks_amenities_amenities_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_amenities_amenities_order_idx ON public._pages_v_blocks_amenities_amenities USING btree (_order);


--
-- Name: _pages_v_blocks_amenities_amenities_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_amenities_amenities_parent_id_idx ON public._pages_v_blocks_amenities_amenities USING btree (_parent_id);


--
-- Name: _pages_v_blocks_amenities_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_amenities_image_idx ON public._pages_v_blocks_amenities USING btree (image_id);


--
-- Name: _pages_v_blocks_amenities_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_amenities_order_idx ON public._pages_v_blocks_amenities USING btree (_order);


--
-- Name: _pages_v_blocks_amenities_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_amenities_parent_id_idx ON public._pages_v_blocks_amenities USING btree (_parent_id);


--
-- Name: _pages_v_blocks_amenities_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_amenities_path_idx ON public._pages_v_blocks_amenities USING btree (_path);


--
-- Name: _pages_v_blocks_archive_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_archive_order_idx ON public._pages_v_blocks_archive USING btree (_order);


--
-- Name: _pages_v_blocks_archive_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_archive_parent_id_idx ON public._pages_v_blocks_archive USING btree (_parent_id);


--
-- Name: _pages_v_blocks_archive_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_archive_path_idx ON public._pages_v_blocks_archive USING btree (_path);


--
-- Name: _pages_v_blocks_blog_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_blog_order_idx ON public._pages_v_blocks_blog USING btree (_order);


--
-- Name: _pages_v_blocks_blog_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_blog_parent_id_idx ON public._pages_v_blocks_blog USING btree (_parent_id);


--
-- Name: _pages_v_blocks_blog_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_blog_path_idx ON public._pages_v_blocks_blog USING btree (_path);


--
-- Name: _pages_v_blocks_call_to_action_new_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_call_to_action_new_order_idx ON public._pages_v_blocks_call_to_action_new USING btree (_order);


--
-- Name: _pages_v_blocks_call_to_action_new_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_call_to_action_new_parent_id_idx ON public._pages_v_blocks_call_to_action_new USING btree (_parent_id);


--
-- Name: _pages_v_blocks_call_to_action_new_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_call_to_action_new_path_idx ON public._pages_v_blocks_call_to_action_new USING btree (_path);


--
-- Name: _pages_v_blocks_contact_hero_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_contact_hero_image_idx ON public._pages_v_blocks_contact_hero USING btree (image_id);


--
-- Name: _pages_v_blocks_contact_hero_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_contact_hero_order_idx ON public._pages_v_blocks_contact_hero USING btree (_order);


--
-- Name: _pages_v_blocks_contact_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_contact_hero_parent_id_idx ON public._pages_v_blocks_contact_hero USING btree (_parent_id);


--
-- Name: _pages_v_blocks_contact_hero_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_contact_hero_path_idx ON public._pages_v_blocks_contact_hero USING btree (_path);


--
-- Name: _pages_v_blocks_contact_us_form_form_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_contact_us_form_form_idx ON public._pages_v_blocks_contact_us_form USING btree (form_id);


--
-- Name: _pages_v_blocks_contact_us_form_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_contact_us_form_order_idx ON public._pages_v_blocks_contact_us_form USING btree (_order);


--
-- Name: _pages_v_blocks_contact_us_form_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_contact_us_form_parent_id_idx ON public._pages_v_blocks_contact_us_form USING btree (_parent_id);


--
-- Name: _pages_v_blocks_contact_us_form_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_contact_us_form_path_idx ON public._pages_v_blocks_contact_us_form USING btree (_path);


--
-- Name: _pages_v_blocks_content_columns_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_content_columns_order_idx ON public._pages_v_blocks_content_columns USING btree (_order);


--
-- Name: _pages_v_blocks_content_columns_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_content_columns_parent_id_idx ON public._pages_v_blocks_content_columns USING btree (_parent_id);


--
-- Name: _pages_v_blocks_content_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_content_order_idx ON public._pages_v_blocks_content USING btree (_order);


--
-- Name: _pages_v_blocks_content_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_content_parent_id_idx ON public._pages_v_blocks_content USING btree (_parent_id);


--
-- Name: _pages_v_blocks_content_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_content_path_idx ON public._pages_v_blocks_content USING btree (_path);


--
-- Name: _pages_v_blocks_cta_links_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_cta_links_order_idx ON public._pages_v_blocks_cta_links USING btree (_order);


--
-- Name: _pages_v_blocks_cta_links_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_cta_links_parent_id_idx ON public._pages_v_blocks_cta_links USING btree (_parent_id);


--
-- Name: _pages_v_blocks_cta_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_cta_order_idx ON public._pages_v_blocks_cta USING btree (_order);


--
-- Name: _pages_v_blocks_cta_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_cta_parent_id_idx ON public._pages_v_blocks_cta USING btree (_parent_id);


--
-- Name: _pages_v_blocks_cta_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_cta_path_idx ON public._pages_v_blocks_cta USING btree (_path);


--
-- Name: _pages_v_blocks_faq_items_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_faq_items_order_idx ON public._pages_v_blocks_faq_items USING btree (_order);


--
-- Name: _pages_v_blocks_faq_items_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_faq_items_parent_id_idx ON public._pages_v_blocks_faq_items USING btree (_parent_id);


--
-- Name: _pages_v_blocks_faq_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_faq_order_idx ON public._pages_v_blocks_faq USING btree (_order);


--
-- Name: _pages_v_blocks_faq_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_faq_parent_id_idx ON public._pages_v_blocks_faq USING btree (_parent_id);


--
-- Name: _pages_v_blocks_faq_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_faq_path_idx ON public._pages_v_blocks_faq USING btree (_path);


--
-- Name: _pages_v_blocks_feature_features_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_feature_features_order_idx ON public._pages_v_blocks_feature_features USING btree (_order);


--
-- Name: _pages_v_blocks_feature_features_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_feature_features_parent_id_idx ON public._pages_v_blocks_feature_features USING btree (_parent_id);


--
-- Name: _pages_v_blocks_feature_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_feature_order_idx ON public._pages_v_blocks_feature USING btree (_order);


--
-- Name: _pages_v_blocks_feature_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_feature_parent_id_idx ON public._pages_v_blocks_feature USING btree (_parent_id);


--
-- Name: _pages_v_blocks_feature_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_feature_path_idx ON public._pages_v_blocks_feature USING btree (_path);


--
-- Name: _pages_v_blocks_form_block_form_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_form_block_form_idx ON public._pages_v_blocks_form_block USING btree (form_id);


--
-- Name: _pages_v_blocks_form_block_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_form_block_order_idx ON public._pages_v_blocks_form_block USING btree (_order);


--
-- Name: _pages_v_blocks_form_block_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_form_block_parent_id_idx ON public._pages_v_blocks_form_block USING btree (_parent_id);


--
-- Name: _pages_v_blocks_form_block_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_form_block_path_idx ON public._pages_v_blocks_form_block USING btree (_path);


--
-- Name: _pages_v_blocks_hero_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_hero_image_idx ON public._pages_v_blocks_hero USING btree (image_id);


--
-- Name: _pages_v_blocks_hero_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_hero_order_idx ON public._pages_v_blocks_hero USING btree (_order);


--
-- Name: _pages_v_blocks_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_hero_parent_id_idx ON public._pages_v_blocks_hero USING btree (_parent_id);


--
-- Name: _pages_v_blocks_hero_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_hero_path_idx ON public._pages_v_blocks_hero USING btree (_path);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_house_filter_filters_fields_options_order_idx ON public._pages_v_blocks_house_filter_filters_fields_options USING btree (_order);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options_parent_id_i; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_house_filter_filters_fields_options_parent_id_i ON public._pages_v_blocks_house_filter_filters_fields_options USING btree (_parent_id);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_house_filter_filters_fields_order_idx ON public._pages_v_blocks_house_filter_filters_fields USING btree (_order);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_house_filter_filters_fields_parent_id_idx ON public._pages_v_blocks_house_filter_filters_fields USING btree (_parent_id);


--
-- Name: _pages_v_blocks_house_filter_filters_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_house_filter_filters_order_idx ON public._pages_v_blocks_house_filter_filters USING btree (_order);


--
-- Name: _pages_v_blocks_house_filter_filters_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_house_filter_filters_parent_id_idx ON public._pages_v_blocks_house_filter_filters USING btree (_parent_id);


--
-- Name: _pages_v_blocks_house_filter_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_house_filter_order_idx ON public._pages_v_blocks_house_filter USING btree (_order);


--
-- Name: _pages_v_blocks_house_filter_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_house_filter_parent_id_idx ON public._pages_v_blocks_house_filter USING btree (_parent_id);


--
-- Name: _pages_v_blocks_house_filter_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_house_filter_path_idx ON public._pages_v_blocks_house_filter USING btree (_path);


--
-- Name: _pages_v_blocks_how_it_works_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_how_it_works_order_idx ON public._pages_v_blocks_how_it_works USING btree (_order);


--
-- Name: _pages_v_blocks_how_it_works_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_how_it_works_parent_id_idx ON public._pages_v_blocks_how_it_works USING btree (_parent_id);


--
-- Name: _pages_v_blocks_how_it_works_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_how_it_works_path_idx ON public._pages_v_blocks_how_it_works USING btree (_path);


--
-- Name: _pages_v_blocks_how_it_works_steps_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_how_it_works_steps_order_idx ON public._pages_v_blocks_how_it_works_steps USING btree (_order);


--
-- Name: _pages_v_blocks_how_it_works_steps_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_how_it_works_steps_parent_id_idx ON public._pages_v_blocks_how_it_works_steps USING btree (_parent_id);


--
-- Name: _pages_v_blocks_map_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_map_order_idx ON public._pages_v_blocks_map USING btree (_order);


--
-- Name: _pages_v_blocks_map_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_map_parent_id_idx ON public._pages_v_blocks_map USING btree (_parent_id);


--
-- Name: _pages_v_blocks_map_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_map_path_idx ON public._pages_v_blocks_map USING btree (_path);


--
-- Name: _pages_v_blocks_media_block_media_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_media_block_media_idx ON public._pages_v_blocks_media_block USING btree (media_id);


--
-- Name: _pages_v_blocks_media_block_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_media_block_order_idx ON public._pages_v_blocks_media_block USING btree (_order);


--
-- Name: _pages_v_blocks_media_block_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_media_block_parent_id_idx ON public._pages_v_blocks_media_block USING btree (_parent_id);


--
-- Name: _pages_v_blocks_media_block_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_media_block_path_idx ON public._pages_v_blocks_media_block USING btree (_path);


--
-- Name: _pages_v_blocks_navbar_avatar_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_navbar_avatar_idx ON public._pages_v_blocks_navbar USING btree (avatar_id);


--
-- Name: _pages_v_blocks_navbar_links_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_navbar_links_order_idx ON public._pages_v_blocks_navbar_links USING btree (_order);


--
-- Name: _pages_v_blocks_navbar_links_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_navbar_links_parent_id_idx ON public._pages_v_blocks_navbar_links USING btree (_parent_id);


--
-- Name: _pages_v_blocks_navbar_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_navbar_order_idx ON public._pages_v_blocks_navbar USING btree (_order);


--
-- Name: _pages_v_blocks_navbar_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_navbar_parent_id_idx ON public._pages_v_blocks_navbar USING btree (_parent_id);


--
-- Name: _pages_v_blocks_navbar_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_navbar_path_idx ON public._pages_v_blocks_navbar USING btree (_path);


--
-- Name: _pages_v_blocks_properties_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_properties_order_idx ON public._pages_v_blocks_properties USING btree (_order);


--
-- Name: _pages_v_blocks_properties_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_properties_parent_id_idx ON public._pages_v_blocks_properties USING btree (_parent_id);


--
-- Name: _pages_v_blocks_properties_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_properties_path_idx ON public._pages_v_blocks_properties USING btree (_path);


--
-- Name: _pages_v_blocks_property_features_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_property_features_order_idx ON public._pages_v_blocks_property_features USING btree (_order);


--
-- Name: _pages_v_blocks_property_features_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_property_features_parent_id_idx ON public._pages_v_blocks_property_features USING btree (_parent_id);


--
-- Name: _pages_v_blocks_property_features_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_property_features_path_idx ON public._pages_v_blocks_property_features USING btree (_path);


--
-- Name: _pages_v_blocks_property_features_property_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_property_features_property_idx ON public._pages_v_blocks_property_features USING btree (property_id);


--
-- Name: _pages_v_blocks_testimonials_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_testimonials_order_idx ON public._pages_v_blocks_testimonials USING btree (_order);


--
-- Name: _pages_v_blocks_testimonials_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_testimonials_parent_id_idx ON public._pages_v_blocks_testimonials USING btree (_parent_id);


--
-- Name: _pages_v_blocks_testimonials_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_testimonials_path_idx ON public._pages_v_blocks_testimonials USING btree (_path);


--
-- Name: _pages_v_blocks_vision_items_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_vision_items_order_idx ON public._pages_v_blocks_vision_items USING btree (_order);


--
-- Name: _pages_v_blocks_vision_items_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_vision_items_parent_id_idx ON public._pages_v_blocks_vision_items USING btree (_parent_id);


--
-- Name: _pages_v_blocks_vision_mission_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_vision_mission_order_idx ON public._pages_v_blocks_vision_mission USING btree (_order);


--
-- Name: _pages_v_blocks_vision_mission_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_vision_mission_parent_id_idx ON public._pages_v_blocks_vision_mission USING btree (_parent_id);


--
-- Name: _pages_v_blocks_vision_mission_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_vision_mission_path_idx ON public._pages_v_blocks_vision_mission USING btree (_path);


--
-- Name: _pages_v_blocks_vision_mission_stats_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_vision_mission_stats_order_idx ON public._pages_v_blocks_vision_mission_stats USING btree (_order);


--
-- Name: _pages_v_blocks_vision_mission_stats_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_vision_mission_stats_parent_id_idx ON public._pages_v_blocks_vision_mission_stats USING btree (_parent_id);


--
-- Name: _pages_v_blocks_vision_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_vision_order_idx ON public._pages_v_blocks_vision USING btree (_order);


--
-- Name: _pages_v_blocks_vision_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_vision_parent_id_idx ON public._pages_v_blocks_vision USING btree (_parent_id);


--
-- Name: _pages_v_blocks_vision_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_blocks_vision_path_idx ON public._pages_v_blocks_vision USING btree (_path);


--
-- Name: _pages_v_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_created_at_idx ON public._pages_v USING btree (created_at);


--
-- Name: _pages_v_latest_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_latest_idx ON public._pages_v USING btree (latest);


--
-- Name: _pages_v_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_parent_idx ON public._pages_v USING btree (parent_id);


--
-- Name: _pages_v_rels_agents_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_agents_id_idx ON public._pages_v_rels USING btree (agents_id);


--
-- Name: _pages_v_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_categories_id_idx ON public._pages_v_rels USING btree (categories_id);


--
-- Name: _pages_v_rels_commercial_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_commercial_id_idx ON public._pages_v_rels USING btree (commercial_id);


--
-- Name: _pages_v_rels_flats_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_flats_id_idx ON public._pages_v_rels USING btree (flats_id);


--
-- Name: _pages_v_rels_lands_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_lands_id_idx ON public._pages_v_rels USING btree (lands_id);


--
-- Name: _pages_v_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_order_idx ON public._pages_v_rels USING btree ("order");


--
-- Name: _pages_v_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_pages_id_idx ON public._pages_v_rels USING btree (pages_id);


--
-- Name: _pages_v_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_parent_idx ON public._pages_v_rels USING btree (parent_id);


--
-- Name: _pages_v_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_path_idx ON public._pages_v_rels USING btree (path);


--
-- Name: _pages_v_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_posts_id_idx ON public._pages_v_rels USING btree (posts_id);


--
-- Name: _pages_v_rels_properties_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_properties_id_idx ON public._pages_v_rels USING btree (properties_id);


--
-- Name: _pages_v_rels_residential_complexes_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_residential_complexes_id_idx ON public._pages_v_rels USING btree (residential_complexes_id);


--
-- Name: _pages_v_rels_testimonials_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_rels_testimonials_id_idx ON public._pages_v_rels USING btree (testimonials_id);


--
-- Name: _pages_v_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_updated_at_idx ON public._pages_v USING btree (updated_at);


--
-- Name: _pages_v_version_hero_links_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_hero_links_order_idx ON public._pages_v_version_hero_links USING btree (_order);


--
-- Name: _pages_v_version_hero_links_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_hero_links_parent_id_idx ON public._pages_v_version_hero_links USING btree (_parent_id);


--
-- Name: _pages_v_version_hero_version_hero_media_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_hero_version_hero_media_idx ON public._pages_v USING btree (version_hero_media_id);


--
-- Name: _pages_v_version_meta_version_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_meta_version_meta_image_idx ON public._pages_v USING btree (version_meta_image_id);


--
-- Name: _pages_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_version__status_idx ON public._pages_v USING btree (version__status);


--
-- Name: _pages_v_version_version_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_version_created_at_idx ON public._pages_v USING btree (version_created_at);


--
-- Name: _pages_v_version_version_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_version_slug_idx ON public._pages_v USING btree (version_slug);


--
-- Name: _pages_v_version_version_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX _pages_v_version_version_updated_at_idx ON public._pages_v USING btree (version_updated_at);


--
-- Name: agents_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX agents_created_at_idx ON public.agents USING btree (created_at);


--
-- Name: agents_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX agents_image_idx ON public.agents USING btree (image_id);


--
-- Name: agents_social_links_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX agents_social_links_order_idx ON public.agents_social_links USING btree (_order);


--
-- Name: agents_social_links_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX agents_social_links_parent_id_idx ON public.agents_social_links USING btree (_parent_id);


--
-- Name: agents_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX agents_updated_at_idx ON public.agents USING btree (updated_at);


--
-- Name: categories_breadcrumbs_doc_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_breadcrumbs_doc_idx ON public.categories_breadcrumbs USING btree (doc_id);


--
-- Name: categories_breadcrumbs_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_breadcrumbs_order_idx ON public.categories_breadcrumbs USING btree (_order);


--
-- Name: categories_breadcrumbs_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_breadcrumbs_parent_id_idx ON public.categories_breadcrumbs USING btree (_parent_id);


--
-- Name: categories_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_created_at_idx ON public.categories USING btree (created_at);


--
-- Name: categories_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_parent_idx ON public.categories USING btree (parent_id);


--
-- Name: categories_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_slug_idx ON public.categories USING btree (slug);


--
-- Name: categories_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX categories_updated_at_idx ON public.categories USING btree (updated_at);


--
-- Name: commercial_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX commercial_created_at_idx ON public.commercial USING btree (created_at);


--
-- Name: commercial_images_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX commercial_images_image_idx ON public.commercial_images USING btree (image_id);


--
-- Name: commercial_images_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX commercial_images_order_idx ON public.commercial_images USING btree (_order);


--
-- Name: commercial_images_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX commercial_images_parent_id_idx ON public.commercial_images USING btree (_parent_id);


--
-- Name: commercial_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX commercial_slug_idx ON public.commercial USING btree (slug);


--
-- Name: commercial_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX commercial_updated_at_idx ON public.commercial USING btree (updated_at);


--
-- Name: commercial_utilities_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX commercial_utilities_order_idx ON public.commercial_utilities USING btree (_order);


--
-- Name: commercial_utilities_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX commercial_utilities_parent_id_idx ON public.commercial_utilities USING btree (_parent_id);


--
-- Name: flats_amenities_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flats_amenities_order_idx ON public.flats_amenities USING btree (_order);


--
-- Name: flats_amenities_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flats_amenities_parent_id_idx ON public.flats_amenities USING btree (_parent_id);


--
-- Name: flats_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flats_created_at_idx ON public.flats USING btree (created_at);


--
-- Name: flats_images_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flats_images_image_idx ON public.flats_images USING btree (image_id);


--
-- Name: flats_images_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flats_images_order_idx ON public.flats_images USING btree (_order);


--
-- Name: flats_images_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flats_images_parent_id_idx ON public.flats_images USING btree (_parent_id);


--
-- Name: flats_layout_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flats_layout_idx ON public.flats USING btree (layout_id);


--
-- Name: flats_realtor_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flats_realtor_idx ON public.flats USING btree (realtor_id);


--
-- Name: flats_residential_complex_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flats_residential_complex_idx ON public.flats USING btree (residential_complex_id);


--
-- Name: flats_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX flats_slug_idx ON public.flats USING btree (slug);


--
-- Name: flats_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX flats_updated_at_idx ON public.flats USING btree (updated_at);


--
-- Name: footer_nav_items_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_nav_items_order_idx ON public.footer_nav_items USING btree (_order);


--
-- Name: footer_nav_items_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_nav_items_parent_id_idx ON public.footer_nav_items USING btree (_parent_id);


--
-- Name: footer_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_rels_order_idx ON public.footer_rels USING btree ("order");


--
-- Name: footer_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_rels_pages_id_idx ON public.footer_rels USING btree (pages_id);


--
-- Name: footer_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_rels_parent_idx ON public.footer_rels USING btree (parent_id);


--
-- Name: footer_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_rels_path_idx ON public.footer_rels USING btree (path);


--
-- Name: footer_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX footer_rels_posts_id_idx ON public.footer_rels USING btree (posts_id);


--
-- Name: form_submissions_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_submissions_created_at_idx ON public.form_submissions USING btree (created_at);


--
-- Name: form_submissions_form_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_submissions_form_idx ON public.form_submissions USING btree (form_id);


--
-- Name: form_submissions_submission_data_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_submissions_submission_data_order_idx ON public.form_submissions_submission_data USING btree (_order);


--
-- Name: form_submissions_submission_data_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_submissions_submission_data_parent_id_idx ON public.form_submissions_submission_data USING btree (_parent_id);


--
-- Name: form_submissions_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX form_submissions_updated_at_idx ON public.form_submissions USING btree (updated_at);


--
-- Name: forms_blocks_checkbox_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_checkbox_order_idx ON public.forms_blocks_checkbox USING btree (_order);


--
-- Name: forms_blocks_checkbox_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_checkbox_parent_id_idx ON public.forms_blocks_checkbox USING btree (_parent_id);


--
-- Name: forms_blocks_checkbox_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_checkbox_path_idx ON public.forms_blocks_checkbox USING btree (_path);


--
-- Name: forms_blocks_country_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_country_order_idx ON public.forms_blocks_country USING btree (_order);


--
-- Name: forms_blocks_country_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_country_parent_id_idx ON public.forms_blocks_country USING btree (_parent_id);


--
-- Name: forms_blocks_country_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_country_path_idx ON public.forms_blocks_country USING btree (_path);


--
-- Name: forms_blocks_email_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_email_order_idx ON public.forms_blocks_email USING btree (_order);


--
-- Name: forms_blocks_email_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_email_parent_id_idx ON public.forms_blocks_email USING btree (_parent_id);


--
-- Name: forms_blocks_email_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_email_path_idx ON public.forms_blocks_email USING btree (_path);


--
-- Name: forms_blocks_message_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_message_order_idx ON public.forms_blocks_message USING btree (_order);


--
-- Name: forms_blocks_message_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_message_parent_id_idx ON public.forms_blocks_message USING btree (_parent_id);


--
-- Name: forms_blocks_message_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_message_path_idx ON public.forms_blocks_message USING btree (_path);


--
-- Name: forms_blocks_number_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_number_order_idx ON public.forms_blocks_number USING btree (_order);


--
-- Name: forms_blocks_number_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_number_parent_id_idx ON public.forms_blocks_number USING btree (_parent_id);


--
-- Name: forms_blocks_number_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_number_path_idx ON public.forms_blocks_number USING btree (_path);


--
-- Name: forms_blocks_select_options_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_select_options_order_idx ON public.forms_blocks_select_options USING btree (_order);


--
-- Name: forms_blocks_select_options_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_select_options_parent_id_idx ON public.forms_blocks_select_options USING btree (_parent_id);


--
-- Name: forms_blocks_select_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_select_order_idx ON public.forms_blocks_select USING btree (_order);


--
-- Name: forms_blocks_select_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_select_parent_id_idx ON public.forms_blocks_select USING btree (_parent_id);


--
-- Name: forms_blocks_select_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_select_path_idx ON public.forms_blocks_select USING btree (_path);


--
-- Name: forms_blocks_state_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_state_order_idx ON public.forms_blocks_state USING btree (_order);


--
-- Name: forms_blocks_state_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_state_parent_id_idx ON public.forms_blocks_state USING btree (_parent_id);


--
-- Name: forms_blocks_state_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_state_path_idx ON public.forms_blocks_state USING btree (_path);


--
-- Name: forms_blocks_text_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_text_order_idx ON public.forms_blocks_text USING btree (_order);


--
-- Name: forms_blocks_text_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_text_parent_id_idx ON public.forms_blocks_text USING btree (_parent_id);


--
-- Name: forms_blocks_text_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_text_path_idx ON public.forms_blocks_text USING btree (_path);


--
-- Name: forms_blocks_textarea_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_textarea_order_idx ON public.forms_blocks_textarea USING btree (_order);


--
-- Name: forms_blocks_textarea_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_textarea_parent_id_idx ON public.forms_blocks_textarea USING btree (_parent_id);


--
-- Name: forms_blocks_textarea_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_blocks_textarea_path_idx ON public.forms_blocks_textarea USING btree (_path);


--
-- Name: forms_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_created_at_idx ON public.forms USING btree (created_at);


--
-- Name: forms_emails_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_emails_order_idx ON public.forms_emails USING btree (_order);


--
-- Name: forms_emails_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_emails_parent_id_idx ON public.forms_emails USING btree (_parent_id);


--
-- Name: forms_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX forms_updated_at_idx ON public.forms USING btree (updated_at);


--
-- Name: header_nav_items_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX header_nav_items_order_idx ON public.header_nav_items USING btree (_order);


--
-- Name: header_nav_items_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX header_nav_items_parent_id_idx ON public.header_nav_items USING btree (_parent_id);


--
-- Name: header_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX header_rels_order_idx ON public.header_rels USING btree ("order");


--
-- Name: header_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX header_rels_pages_id_idx ON public.header_rels USING btree (pages_id);


--
-- Name: header_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX header_rels_parent_idx ON public.header_rels USING btree (parent_id);


--
-- Name: header_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX header_rels_path_idx ON public.header_rels USING btree (path);


--
-- Name: header_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX header_rels_posts_id_idx ON public.header_rels USING btree (posts_id);


--
-- Name: lands_communications_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lands_communications_order_idx ON public.lands_communications USING btree (_order);


--
-- Name: lands_communications_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lands_communications_parent_id_idx ON public.lands_communications USING btree (_parent_id);


--
-- Name: lands_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lands_created_at_idx ON public.lands USING btree (created_at);


--
-- Name: lands_images_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lands_images_image_idx ON public.lands_images USING btree (image_id);


--
-- Name: lands_images_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lands_images_order_idx ON public.lands_images USING btree (_order);


--
-- Name: lands_images_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lands_images_parent_id_idx ON public.lands_images USING btree (_parent_id);


--
-- Name: lands_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX lands_slug_idx ON public.lands USING btree (slug);


--
-- Name: lands_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lands_updated_at_idx ON public.lands USING btree (updated_at);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_sizes_large_sizes_large_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_large_sizes_large_filename_idx ON public.media USING btree (sizes_large_filename);


--
-- Name: media_sizes_medium_sizes_medium_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_medium_sizes_medium_filename_idx ON public.media USING btree (sizes_medium_filename);


--
-- Name: media_sizes_og_sizes_og_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_og_sizes_og_filename_idx ON public.media USING btree (sizes_og_filename);


--
-- Name: media_sizes_small_sizes_small_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_small_sizes_small_filename_idx ON public.media USING btree (sizes_small_filename);


--
-- Name: media_sizes_square_sizes_square_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_square_sizes_square_filename_idx ON public.media USING btree (sizes_square_filename);


--
-- Name: media_sizes_thumbnail_sizes_thumbnail_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.media USING btree (sizes_thumbnail_filename);


--
-- Name: media_sizes_xlarge_sizes_xlarge_filename_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_sizes_xlarge_sizes_xlarge_filename_idx ON public.media USING btree (sizes_xlarge_filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: messages_attachment_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_attachment_idx ON public.messages USING btree (attachment_id);


--
-- Name: messages_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_created_at_idx ON public.messages USING btree (created_at);


--
-- Name: messages_realtor_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_realtor_idx ON public.messages USING btree (realtor_id);


--
-- Name: messages_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX messages_updated_at_idx ON public.messages USING btree (updated_at);


--
-- Name: pages__status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages__status_idx ON public.pages USING btree (_status);


--
-- Name: pages_blocks_about_hero_images_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_about_hero_images_image_idx ON public.pages_blocks_about_hero_images USING btree (image_id);


--
-- Name: pages_blocks_about_hero_images_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_about_hero_images_order_idx ON public.pages_blocks_about_hero_images USING btree (_order);


--
-- Name: pages_blocks_about_hero_images_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_about_hero_images_parent_id_idx ON public.pages_blocks_about_hero_images USING btree (_parent_id);


--
-- Name: pages_blocks_about_hero_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_about_hero_order_idx ON public.pages_blocks_about_hero USING btree (_order);


--
-- Name: pages_blocks_about_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_about_hero_parent_id_idx ON public.pages_blocks_about_hero USING btree (_parent_id);


--
-- Name: pages_blocks_about_hero_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_about_hero_path_idx ON public.pages_blocks_about_hero USING btree (_path);


--
-- Name: pages_blocks_agents_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_agents_order_idx ON public.pages_blocks_agents USING btree (_order);


--
-- Name: pages_blocks_agents_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_agents_parent_id_idx ON public.pages_blocks_agents USING btree (_parent_id);


--
-- Name: pages_blocks_agents_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_agents_path_idx ON public.pages_blocks_agents USING btree (_path);


--
-- Name: pages_blocks_amenities_amenities_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_amenities_amenities_order_idx ON public.pages_blocks_amenities_amenities USING btree (_order);


--
-- Name: pages_blocks_amenities_amenities_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_amenities_amenities_parent_id_idx ON public.pages_blocks_amenities_amenities USING btree (_parent_id);


--
-- Name: pages_blocks_amenities_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_amenities_image_idx ON public.pages_blocks_amenities USING btree (image_id);


--
-- Name: pages_blocks_amenities_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_amenities_order_idx ON public.pages_blocks_amenities USING btree (_order);


--
-- Name: pages_blocks_amenities_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_amenities_parent_id_idx ON public.pages_blocks_amenities USING btree (_parent_id);


--
-- Name: pages_blocks_amenities_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_amenities_path_idx ON public.pages_blocks_amenities USING btree (_path);


--
-- Name: pages_blocks_archive_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_archive_order_idx ON public.pages_blocks_archive USING btree (_order);


--
-- Name: pages_blocks_archive_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_archive_parent_id_idx ON public.pages_blocks_archive USING btree (_parent_id);


--
-- Name: pages_blocks_archive_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_archive_path_idx ON public.pages_blocks_archive USING btree (_path);


--
-- Name: pages_blocks_blog_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_blog_order_idx ON public.pages_blocks_blog USING btree (_order);


--
-- Name: pages_blocks_blog_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_blog_parent_id_idx ON public.pages_blocks_blog USING btree (_parent_id);


--
-- Name: pages_blocks_blog_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_blog_path_idx ON public.pages_blocks_blog USING btree (_path);


--
-- Name: pages_blocks_call_to_action_new_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_call_to_action_new_order_idx ON public.pages_blocks_call_to_action_new USING btree (_order);


--
-- Name: pages_blocks_call_to_action_new_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_call_to_action_new_parent_id_idx ON public.pages_blocks_call_to_action_new USING btree (_parent_id);


--
-- Name: pages_blocks_call_to_action_new_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_call_to_action_new_path_idx ON public.pages_blocks_call_to_action_new USING btree (_path);


--
-- Name: pages_blocks_contact_hero_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_contact_hero_image_idx ON public.pages_blocks_contact_hero USING btree (image_id);


--
-- Name: pages_blocks_contact_hero_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_contact_hero_order_idx ON public.pages_blocks_contact_hero USING btree (_order);


--
-- Name: pages_blocks_contact_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_contact_hero_parent_id_idx ON public.pages_blocks_contact_hero USING btree (_parent_id);


--
-- Name: pages_blocks_contact_hero_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_contact_hero_path_idx ON public.pages_blocks_contact_hero USING btree (_path);


--
-- Name: pages_blocks_contact_us_form_form_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_contact_us_form_form_idx ON public.pages_blocks_contact_us_form USING btree (form_id);


--
-- Name: pages_blocks_contact_us_form_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_contact_us_form_order_idx ON public.pages_blocks_contact_us_form USING btree (_order);


--
-- Name: pages_blocks_contact_us_form_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_contact_us_form_parent_id_idx ON public.pages_blocks_contact_us_form USING btree (_parent_id);


--
-- Name: pages_blocks_contact_us_form_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_contact_us_form_path_idx ON public.pages_blocks_contact_us_form USING btree (_path);


--
-- Name: pages_blocks_content_columns_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_content_columns_order_idx ON public.pages_blocks_content_columns USING btree (_order);


--
-- Name: pages_blocks_content_columns_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_content_columns_parent_id_idx ON public.pages_blocks_content_columns USING btree (_parent_id);


--
-- Name: pages_blocks_content_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_content_order_idx ON public.pages_blocks_content USING btree (_order);


--
-- Name: pages_blocks_content_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_content_parent_id_idx ON public.pages_blocks_content USING btree (_parent_id);


--
-- Name: pages_blocks_content_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_content_path_idx ON public.pages_blocks_content USING btree (_path);


--
-- Name: pages_blocks_cta_links_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_cta_links_order_idx ON public.pages_blocks_cta_links USING btree (_order);


--
-- Name: pages_blocks_cta_links_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_cta_links_parent_id_idx ON public.pages_blocks_cta_links USING btree (_parent_id);


--
-- Name: pages_blocks_cta_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_cta_order_idx ON public.pages_blocks_cta USING btree (_order);


--
-- Name: pages_blocks_cta_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_cta_parent_id_idx ON public.pages_blocks_cta USING btree (_parent_id);


--
-- Name: pages_blocks_cta_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_cta_path_idx ON public.pages_blocks_cta USING btree (_path);


--
-- Name: pages_blocks_faq_items_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_faq_items_order_idx ON public.pages_blocks_faq_items USING btree (_order);


--
-- Name: pages_blocks_faq_items_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_faq_items_parent_id_idx ON public.pages_blocks_faq_items USING btree (_parent_id);


--
-- Name: pages_blocks_faq_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_faq_order_idx ON public.pages_blocks_faq USING btree (_order);


--
-- Name: pages_blocks_faq_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_faq_parent_id_idx ON public.pages_blocks_faq USING btree (_parent_id);


--
-- Name: pages_blocks_faq_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_faq_path_idx ON public.pages_blocks_faq USING btree (_path);


--
-- Name: pages_blocks_feature_features_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_feature_features_order_idx ON public.pages_blocks_feature_features USING btree (_order);


--
-- Name: pages_blocks_feature_features_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_feature_features_parent_id_idx ON public.pages_blocks_feature_features USING btree (_parent_id);


--
-- Name: pages_blocks_feature_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_feature_order_idx ON public.pages_blocks_feature USING btree (_order);


--
-- Name: pages_blocks_feature_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_feature_parent_id_idx ON public.pages_blocks_feature USING btree (_parent_id);


--
-- Name: pages_blocks_feature_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_feature_path_idx ON public.pages_blocks_feature USING btree (_path);


--
-- Name: pages_blocks_form_block_form_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_form_block_form_idx ON public.pages_blocks_form_block USING btree (form_id);


--
-- Name: pages_blocks_form_block_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_form_block_order_idx ON public.pages_blocks_form_block USING btree (_order);


--
-- Name: pages_blocks_form_block_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_form_block_parent_id_idx ON public.pages_blocks_form_block USING btree (_parent_id);


--
-- Name: pages_blocks_form_block_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_form_block_path_idx ON public.pages_blocks_form_block USING btree (_path);


--
-- Name: pages_blocks_hero_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_hero_image_idx ON public.pages_blocks_hero USING btree (image_id);


--
-- Name: pages_blocks_hero_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_hero_order_idx ON public.pages_blocks_hero USING btree (_order);


--
-- Name: pages_blocks_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_hero_parent_id_idx ON public.pages_blocks_hero USING btree (_parent_id);


--
-- Name: pages_blocks_hero_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_hero_path_idx ON public.pages_blocks_hero USING btree (_path);


--
-- Name: pages_blocks_house_filter_filters_fields_options_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_house_filter_filters_fields_options_order_idx ON public.pages_blocks_house_filter_filters_fields_options USING btree (_order);


--
-- Name: pages_blocks_house_filter_filters_fields_options_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_house_filter_filters_fields_options_parent_id_idx ON public.pages_blocks_house_filter_filters_fields_options USING btree (_parent_id);


--
-- Name: pages_blocks_house_filter_filters_fields_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_house_filter_filters_fields_order_idx ON public.pages_blocks_house_filter_filters_fields USING btree (_order);


--
-- Name: pages_blocks_house_filter_filters_fields_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_house_filter_filters_fields_parent_id_idx ON public.pages_blocks_house_filter_filters_fields USING btree (_parent_id);


--
-- Name: pages_blocks_house_filter_filters_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_house_filter_filters_order_idx ON public.pages_blocks_house_filter_filters USING btree (_order);


--
-- Name: pages_blocks_house_filter_filters_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_house_filter_filters_parent_id_idx ON public.pages_blocks_house_filter_filters USING btree (_parent_id);


--
-- Name: pages_blocks_house_filter_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_house_filter_order_idx ON public.pages_blocks_house_filter USING btree (_order);


--
-- Name: pages_blocks_house_filter_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_house_filter_parent_id_idx ON public.pages_blocks_house_filter USING btree (_parent_id);


--
-- Name: pages_blocks_house_filter_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_house_filter_path_idx ON public.pages_blocks_house_filter USING btree (_path);


--
-- Name: pages_blocks_how_it_works_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_how_it_works_order_idx ON public.pages_blocks_how_it_works USING btree (_order);


--
-- Name: pages_blocks_how_it_works_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_how_it_works_parent_id_idx ON public.pages_blocks_how_it_works USING btree (_parent_id);


--
-- Name: pages_blocks_how_it_works_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_how_it_works_path_idx ON public.pages_blocks_how_it_works USING btree (_path);


--
-- Name: pages_blocks_how_it_works_steps_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_how_it_works_steps_order_idx ON public.pages_blocks_how_it_works_steps USING btree (_order);


--
-- Name: pages_blocks_how_it_works_steps_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_how_it_works_steps_parent_id_idx ON public.pages_blocks_how_it_works_steps USING btree (_parent_id);


--
-- Name: pages_blocks_map_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_map_order_idx ON public.pages_blocks_map USING btree (_order);


--
-- Name: pages_blocks_map_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_map_parent_id_idx ON public.pages_blocks_map USING btree (_parent_id);


--
-- Name: pages_blocks_map_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_map_path_idx ON public.pages_blocks_map USING btree (_path);


--
-- Name: pages_blocks_media_block_media_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_media_block_media_idx ON public.pages_blocks_media_block USING btree (media_id);


--
-- Name: pages_blocks_media_block_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_media_block_order_idx ON public.pages_blocks_media_block USING btree (_order);


--
-- Name: pages_blocks_media_block_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_media_block_parent_id_idx ON public.pages_blocks_media_block USING btree (_parent_id);


--
-- Name: pages_blocks_media_block_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_media_block_path_idx ON public.pages_blocks_media_block USING btree (_path);


--
-- Name: pages_blocks_navbar_avatar_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_navbar_avatar_idx ON public.pages_blocks_navbar USING btree (avatar_id);


--
-- Name: pages_blocks_navbar_links_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_navbar_links_order_idx ON public.pages_blocks_navbar_links USING btree (_order);


--
-- Name: pages_blocks_navbar_links_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_navbar_links_parent_id_idx ON public.pages_blocks_navbar_links USING btree (_parent_id);


--
-- Name: pages_blocks_navbar_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_navbar_order_idx ON public.pages_blocks_navbar USING btree (_order);


--
-- Name: pages_blocks_navbar_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_navbar_parent_id_idx ON public.pages_blocks_navbar USING btree (_parent_id);


--
-- Name: pages_blocks_navbar_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_navbar_path_idx ON public.pages_blocks_navbar USING btree (_path);


--
-- Name: pages_blocks_properties_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_properties_order_idx ON public.pages_blocks_properties USING btree (_order);


--
-- Name: pages_blocks_properties_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_properties_parent_id_idx ON public.pages_blocks_properties USING btree (_parent_id);


--
-- Name: pages_blocks_properties_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_properties_path_idx ON public.pages_blocks_properties USING btree (_path);


--
-- Name: pages_blocks_property_features_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_property_features_order_idx ON public.pages_blocks_property_features USING btree (_order);


--
-- Name: pages_blocks_property_features_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_property_features_parent_id_idx ON public.pages_blocks_property_features USING btree (_parent_id);


--
-- Name: pages_blocks_property_features_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_property_features_path_idx ON public.pages_blocks_property_features USING btree (_path);


--
-- Name: pages_blocks_property_features_property_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_property_features_property_idx ON public.pages_blocks_property_features USING btree (property_id);


--
-- Name: pages_blocks_testimonials_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_testimonials_order_idx ON public.pages_blocks_testimonials USING btree (_order);


--
-- Name: pages_blocks_testimonials_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_testimonials_parent_id_idx ON public.pages_blocks_testimonials USING btree (_parent_id);


--
-- Name: pages_blocks_testimonials_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_testimonials_path_idx ON public.pages_blocks_testimonials USING btree (_path);


--
-- Name: pages_blocks_vision_items_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_vision_items_order_idx ON public.pages_blocks_vision_items USING btree (_order);


--
-- Name: pages_blocks_vision_items_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_vision_items_parent_id_idx ON public.pages_blocks_vision_items USING btree (_parent_id);


--
-- Name: pages_blocks_vision_mission_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_vision_mission_order_idx ON public.pages_blocks_vision_mission USING btree (_order);


--
-- Name: pages_blocks_vision_mission_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_vision_mission_parent_id_idx ON public.pages_blocks_vision_mission USING btree (_parent_id);


--
-- Name: pages_blocks_vision_mission_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_vision_mission_path_idx ON public.pages_blocks_vision_mission USING btree (_path);


--
-- Name: pages_blocks_vision_mission_stats_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_vision_mission_stats_order_idx ON public.pages_blocks_vision_mission_stats USING btree (_order);


--
-- Name: pages_blocks_vision_mission_stats_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_vision_mission_stats_parent_id_idx ON public.pages_blocks_vision_mission_stats USING btree (_parent_id);


--
-- Name: pages_blocks_vision_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_vision_order_idx ON public.pages_blocks_vision USING btree (_order);


--
-- Name: pages_blocks_vision_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_vision_parent_id_idx ON public.pages_blocks_vision USING btree (_parent_id);


--
-- Name: pages_blocks_vision_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_blocks_vision_path_idx ON public.pages_blocks_vision USING btree (_path);


--
-- Name: pages_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_created_at_idx ON public.pages USING btree (created_at);


--
-- Name: pages_hero_hero_media_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_hero_hero_media_idx ON public.pages USING btree (hero_media_id);


--
-- Name: pages_hero_links_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_hero_links_order_idx ON public.pages_hero_links USING btree (_order);


--
-- Name: pages_hero_links_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_hero_links_parent_id_idx ON public.pages_hero_links USING btree (_parent_id);


--
-- Name: pages_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_meta_meta_image_idx ON public.pages USING btree (meta_image_id);


--
-- Name: pages_rels_agents_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_agents_id_idx ON public.pages_rels USING btree (agents_id);


--
-- Name: pages_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_categories_id_idx ON public.pages_rels USING btree (categories_id);


--
-- Name: pages_rels_commercial_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_commercial_id_idx ON public.pages_rels USING btree (commercial_id);


--
-- Name: pages_rels_flats_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_flats_id_idx ON public.pages_rels USING btree (flats_id);


--
-- Name: pages_rels_lands_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_lands_id_idx ON public.pages_rels USING btree (lands_id);


--
-- Name: pages_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_order_idx ON public.pages_rels USING btree ("order");


--
-- Name: pages_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_pages_id_idx ON public.pages_rels USING btree (pages_id);


--
-- Name: pages_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_parent_idx ON public.pages_rels USING btree (parent_id);


--
-- Name: pages_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_path_idx ON public.pages_rels USING btree (path);


--
-- Name: pages_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_posts_id_idx ON public.pages_rels USING btree (posts_id);


--
-- Name: pages_rels_properties_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_properties_id_idx ON public.pages_rels USING btree (properties_id);


--
-- Name: pages_rels_residential_complexes_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_residential_complexes_id_idx ON public.pages_rels USING btree (residential_complexes_id);


--
-- Name: pages_rels_testimonials_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_rels_testimonials_id_idx ON public.pages_rels USING btree (testimonials_id);


--
-- Name: pages_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_slug_idx ON public.pages USING btree (slug);


--
-- Name: pages_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX pages_updated_at_idx ON public.pages USING btree (updated_at);


--
-- Name: payload_jobs_completed_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_completed_at_idx ON public.payload_jobs USING btree (completed_at);


--
-- Name: payload_jobs_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_created_at_idx ON public.payload_jobs USING btree (created_at);


--
-- Name: payload_jobs_has_error_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_has_error_idx ON public.payload_jobs USING btree (has_error);


--
-- Name: payload_jobs_log_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_log_order_idx ON public.payload_jobs_log USING btree (_order);


--
-- Name: payload_jobs_log_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_log_parent_id_idx ON public.payload_jobs_log USING btree (_parent_id);


--
-- Name: payload_jobs_processing_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_processing_idx ON public.payload_jobs USING btree (processing);


--
-- Name: payload_jobs_queue_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_queue_idx ON public.payload_jobs USING btree (queue);


--
-- Name: payload_jobs_task_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_task_slug_idx ON public.payload_jobs USING btree (task_slug);


--
-- Name: payload_jobs_total_tried_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_total_tried_idx ON public.payload_jobs USING btree (total_tried);


--
-- Name: payload_jobs_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_updated_at_idx ON public.payload_jobs USING btree (updated_at);


--
-- Name: payload_jobs_wait_until_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_jobs_wait_until_idx ON public.payload_jobs USING btree (wait_until);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_agents_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_agents_id_idx ON public.payload_locked_documents_rels USING btree (agents_id);


--
-- Name: payload_locked_documents_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_categories_id_idx ON public.payload_locked_documents_rels USING btree (categories_id);


--
-- Name: payload_locked_documents_rels_commercial_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_commercial_id_idx ON public.payload_locked_documents_rels USING btree (commercial_id);


--
-- Name: payload_locked_documents_rels_flats_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_flats_id_idx ON public.payload_locked_documents_rels USING btree (flats_id);


--
-- Name: payload_locked_documents_rels_form_submissions_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_form_submissions_id_idx ON public.payload_locked_documents_rels USING btree (form_submissions_id);


--
-- Name: payload_locked_documents_rels_forms_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_forms_id_idx ON public.payload_locked_documents_rels USING btree (forms_id);


--
-- Name: payload_locked_documents_rels_lands_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_lands_id_idx ON public.payload_locked_documents_rels USING btree (lands_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_messages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_messages_id_idx ON public.payload_locked_documents_rels USING btree (messages_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_pages_id_idx ON public.payload_locked_documents_rels USING btree (pages_id);


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_payload_jobs_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_payload_jobs_id_idx ON public.payload_locked_documents_rels USING btree (payload_jobs_id);


--
-- Name: payload_locked_documents_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_posts_id_idx ON public.payload_locked_documents_rels USING btree (posts_id);


--
-- Name: payload_locked_documents_rels_properties_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_properties_id_idx ON public.payload_locked_documents_rels USING btree (properties_id);


--
-- Name: payload_locked_documents_rels_redirects_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_redirects_id_idx ON public.payload_locked_documents_rels USING btree (redirects_id);


--
-- Name: payload_locked_documents_rels_residential_complexes_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_residential_complexes_id_idx ON public.payload_locked_documents_rels USING btree (residential_complexes_id);


--
-- Name: payload_locked_documents_rels_reviews_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_reviews_id_idx ON public.payload_locked_documents_rels USING btree (reviews_id);


--
-- Name: payload_locked_documents_rels_search_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_search_id_idx ON public.payload_locked_documents_rels USING btree (search_id);


--
-- Name: payload_locked_documents_rels_testimonials_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_testimonials_id_idx ON public.payload_locked_documents_rels USING btree (testimonials_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: posts_author_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_author_idx ON public.posts USING btree (author_id);


--
-- Name: posts_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_created_at_idx ON public.posts USING btree (created_at);


--
-- Name: posts_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_image_idx ON public.posts USING btree (image_id);


--
-- Name: posts_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_meta_meta_image_idx ON public.posts USING btree (meta_image_id);


--
-- Name: posts_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_rels_categories_id_idx ON public.posts_rels USING btree (categories_id);


--
-- Name: posts_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_rels_order_idx ON public.posts_rels USING btree ("order");


--
-- Name: posts_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_rels_parent_idx ON public.posts_rels USING btree (parent_id);


--
-- Name: posts_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_rels_path_idx ON public.posts_rels USING btree (path);


--
-- Name: posts_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX posts_updated_at_idx ON public.posts USING btree (updated_at);


--
-- Name: properties_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX properties_created_at_idx ON public.properties USING btree (created_at);


--
-- Name: properties_features_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX properties_features_order_idx ON public.properties_features USING btree (_order);


--
-- Name: properties_features_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX properties_features_parent_id_idx ON public.properties_features USING btree (_parent_id);


--
-- Name: properties_images_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX properties_images_image_idx ON public.properties_images USING btree (image_id);


--
-- Name: properties_images_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX properties_images_order_idx ON public.properties_images USING btree (_order);


--
-- Name: properties_images_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX properties_images_parent_id_idx ON public.properties_images USING btree (_parent_id);


--
-- Name: properties_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX properties_slug_idx ON public.properties USING btree (slug);


--
-- Name: properties_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX properties_updated_at_idx ON public.properties USING btree (updated_at);


--
-- Name: redirects_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX redirects_created_at_idx ON public.redirects USING btree (created_at);


--
-- Name: redirects_from_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX redirects_from_idx ON public.redirects USING btree ("from");


--
-- Name: redirects_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX redirects_rels_order_idx ON public.redirects_rels USING btree ("order");


--
-- Name: redirects_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX redirects_rels_pages_id_idx ON public.redirects_rels USING btree (pages_id);


--
-- Name: redirects_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX redirects_rels_parent_idx ON public.redirects_rels USING btree (parent_id);


--
-- Name: redirects_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX redirects_rels_path_idx ON public.redirects_rels USING btree (path);


--
-- Name: redirects_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX redirects_rels_posts_id_idx ON public.redirects_rels USING btree (posts_id);


--
-- Name: redirects_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX redirects_updated_at_idx ON public.redirects USING btree (updated_at);


--
-- Name: residential_complexes_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX residential_complexes_created_at_idx ON public.residential_complexes USING btree (created_at);


--
-- Name: residential_complexes_images_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX residential_complexes_images_image_idx ON public.residential_complexes_images USING btree (image_id);


--
-- Name: residential_complexes_images_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX residential_complexes_images_order_idx ON public.residential_complexes_images USING btree (_order);


--
-- Name: residential_complexes_images_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX residential_complexes_images_parent_id_idx ON public.residential_complexes_images USING btree (_parent_id);


--
-- Name: residential_complexes_infrastructure_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX residential_complexes_infrastructure_order_idx ON public.residential_complexes_infrastructure USING btree (_order);


--
-- Name: residential_complexes_infrastructure_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX residential_complexes_infrastructure_parent_id_idx ON public.residential_complexes_infrastructure USING btree (_parent_id);


--
-- Name: residential_complexes_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX residential_complexes_slug_idx ON public.residential_complexes USING btree (slug);


--
-- Name: residential_complexes_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX residential_complexes_updated_at_idx ON public.residential_complexes USING btree (updated_at);


--
-- Name: reviews_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reviews_created_at_idx ON public.reviews USING btree (created_at);


--
-- Name: reviews_realtor_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reviews_realtor_idx ON public.reviews USING btree (realtor_id);


--
-- Name: reviews_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX reviews_updated_at_idx ON public.reviews USING btree (updated_at);


--
-- Name: search_categories_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_categories_order_idx ON public.search_categories USING btree (_order);


--
-- Name: search_categories_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_categories_parent_id_idx ON public.search_categories USING btree (_parent_id);


--
-- Name: search_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_created_at_idx ON public.search USING btree (created_at);


--
-- Name: search_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_meta_meta_image_idx ON public.search USING btree (meta_image_id);


--
-- Name: search_rels_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_rels_order_idx ON public.search_rels USING btree ("order");


--
-- Name: search_rels_parent_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_rels_parent_idx ON public.search_rels USING btree (parent_id);


--
-- Name: search_rels_path_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_rels_path_idx ON public.search_rels USING btree (path);


--
-- Name: search_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_rels_posts_id_idx ON public.search_rels USING btree (posts_id);


--
-- Name: search_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_slug_idx ON public.search USING btree (slug);


--
-- Name: search_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX search_updated_at_idx ON public.search USING btree (updated_at);


--
-- Name: testimonials_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX testimonials_created_at_idx ON public.testimonials USING btree (created_at);


--
-- Name: testimonials_image_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX testimonials_image_idx ON public.testimonials USING btree (image_id);


--
-- Name: testimonials_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX testimonials_updated_at_idx ON public.testimonials USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_photo_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_photo_idx ON public.users USING btree (photo_id);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX users_slug_idx ON public.users USING btree (slug);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: _pages_v_blocks_about_hero_images _pages_v_blocks_about_hero_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero_images
    ADD CONSTRAINT _pages_v_blocks_about_hero_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_about_hero_images _pages_v_blocks_about_hero_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero_images
    ADD CONSTRAINT _pages_v_blocks_about_hero_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_about_hero(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_about_hero _pages_v_blocks_about_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero
    ADD CONSTRAINT _pages_v_blocks_about_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_agents _pages_v_blocks_agents_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_agents
    ADD CONSTRAINT _pages_v_blocks_agents_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_amenities_amenities _pages_v_blocks_amenities_amenities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_amenities_amenities
    ADD CONSTRAINT _pages_v_blocks_amenities_amenities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_amenities(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_amenities _pages_v_blocks_amenities_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_amenities
    ADD CONSTRAINT _pages_v_blocks_amenities_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_amenities _pages_v_blocks_amenities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_amenities
    ADD CONSTRAINT _pages_v_blocks_amenities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_archive _pages_v_blocks_archive_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_archive
    ADD CONSTRAINT _pages_v_blocks_archive_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_blog _pages_v_blocks_blog_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_blog
    ADD CONSTRAINT _pages_v_blocks_blog_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_call_to_action_new _pages_v_blocks_call_to_action_new_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_call_to_action_new
    ADD CONSTRAINT _pages_v_blocks_call_to_action_new_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_contact_hero _pages_v_blocks_contact_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_contact_hero
    ADD CONSTRAINT _pages_v_blocks_contact_hero_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_contact_hero _pages_v_blocks_contact_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_contact_hero
    ADD CONSTRAINT _pages_v_blocks_contact_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_contact_us_form _pages_v_blocks_contact_us_form_form_id_forms_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_contact_us_form
    ADD CONSTRAINT _pages_v_blocks_contact_us_form_form_id_forms_id_fk FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_contact_us_form _pages_v_blocks_contact_us_form_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_contact_us_form
    ADD CONSTRAINT _pages_v_blocks_contact_us_form_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_content_columns _pages_v_blocks_content_columns_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_content_columns
    ADD CONSTRAINT _pages_v_blocks_content_columns_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_content(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_content _pages_v_blocks_content_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_content
    ADD CONSTRAINT _pages_v_blocks_content_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_cta_links _pages_v_blocks_cta_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta_links
    ADD CONSTRAINT _pages_v_blocks_cta_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_cta(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_cta _pages_v_blocks_cta_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_cta
    ADD CONSTRAINT _pages_v_blocks_cta_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_faq_items _pages_v_blocks_faq_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_faq_items
    ADD CONSTRAINT _pages_v_blocks_faq_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_faq(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_faq _pages_v_blocks_faq_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_faq
    ADD CONSTRAINT _pages_v_blocks_faq_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_feature_features _pages_v_blocks_feature_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_feature_features
    ADD CONSTRAINT _pages_v_blocks_feature_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_feature(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_feature _pages_v_blocks_feature_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_feature
    ADD CONSTRAINT _pages_v_blocks_feature_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_form_block _pages_v_blocks_form_block_form_id_forms_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_form_block
    ADD CONSTRAINT _pages_v_blocks_form_block_form_id_forms_id_fk FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_form_block _pages_v_blocks_form_block_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_form_block
    ADD CONSTRAINT _pages_v_blocks_form_block_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_hero _pages_v_blocks_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_hero
    ADD CONSTRAINT _pages_v_blocks_hero_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_hero _pages_v_blocks_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_hero
    ADD CONSTRAINT _pages_v_blocks_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options _pages_v_blocks_house_filter_filters_fields_options_parent_id_f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields_options
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_fields_options_parent_id_f FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_house_filter_filters_fields(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_house_filter_filters_fields _pages_v_blocks_house_filter_filters_fields_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_fields_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_house_filter_filters(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_house_filter_filters _pages_v_blocks_house_filter_filters_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_house_filter(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_house_filter _pages_v_blocks_house_filter_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter
    ADD CONSTRAINT _pages_v_blocks_house_filter_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_how_it_works _pages_v_blocks_how_it_works_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works
    ADD CONSTRAINT _pages_v_blocks_how_it_works_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_how_it_works_steps _pages_v_blocks_how_it_works_steps_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works_steps
    ADD CONSTRAINT _pages_v_blocks_how_it_works_steps_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_how_it_works(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_map _pages_v_blocks_map_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_map
    ADD CONSTRAINT _pages_v_blocks_map_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_media_block _pages_v_blocks_media_block_media_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block
    ADD CONSTRAINT _pages_v_blocks_media_block_media_id_media_id_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_media_block _pages_v_blocks_media_block_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_media_block
    ADD CONSTRAINT _pages_v_blocks_media_block_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_navbar _pages_v_blocks_navbar_avatar_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_navbar
    ADD CONSTRAINT _pages_v_blocks_navbar_avatar_id_media_id_fk FOREIGN KEY (avatar_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_navbar_links _pages_v_blocks_navbar_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_navbar_links
    ADD CONSTRAINT _pages_v_blocks_navbar_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_navbar(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_navbar _pages_v_blocks_navbar_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_navbar
    ADD CONSTRAINT _pages_v_blocks_navbar_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_properties _pages_v_blocks_properties_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_properties
    ADD CONSTRAINT _pages_v_blocks_properties_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_property_features _pages_v_blocks_property_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_property_features
    ADD CONSTRAINT _pages_v_blocks_property_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_property_features _pages_v_blocks_property_features_property_id_properties_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_property_features
    ADD CONSTRAINT _pages_v_blocks_property_features_property_id_properties_id_fk FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_testimonials _pages_v_blocks_testimonials_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_testimonials
    ADD CONSTRAINT _pages_v_blocks_testimonials_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_vision_items _pages_v_blocks_vision_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision_items
    ADD CONSTRAINT _pages_v_blocks_vision_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_vision(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_vision_mission _pages_v_blocks_vision_mission_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission
    ADD CONSTRAINT _pages_v_blocks_vision_mission_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_vision_mission_stats _pages_v_blocks_vision_mission_stats_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission_stats
    ADD CONSTRAINT _pages_v_blocks_vision_mission_stats_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_vision_mission(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_vision _pages_v_blocks_vision_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_blocks_vision
    ADD CONSTRAINT _pages_v_blocks_vision_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v _pages_v_parent_id_pages_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_parent_id_pages_id_fk FOREIGN KEY (parent_id) REFERENCES public.pages(id) ON DELETE SET NULL;


--
-- Name: _pages_v_rels _pages_v_rels_agents_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_agents_fk FOREIGN KEY (agents_id) REFERENCES public.agents(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_commercial_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_commercial_fk FOREIGN KEY (commercial_id) REFERENCES public.commercial(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_flats_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_flats_fk FOREIGN KEY (flats_id) REFERENCES public.flats(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_lands_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_lands_fk FOREIGN KEY (lands_id) REFERENCES public.lands(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_properties_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_properties_fk FOREIGN KEY (properties_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_residential_complexes_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_residential_complexes_fk FOREIGN KEY (residential_complexes_id) REFERENCES public.residential_complexes(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_testimonials_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_testimonials_fk FOREIGN KEY (testimonials_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: _pages_v_version_hero_links _pages_v_version_hero_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v_version_hero_links
    ADD CONSTRAINT _pages_v_version_hero_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v _pages_v_version_hero_media_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_version_hero_media_id_media_id_fk FOREIGN KEY (version_hero_media_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v _pages_v_version_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_version_meta_image_id_media_id_fk FOREIGN KEY (version_meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: agents agents_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: agents_social_links agents_social_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.agents_social_links
    ADD CONSTRAINT agents_social_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.agents(id) ON DELETE CASCADE;


--
-- Name: categories_breadcrumbs categories_breadcrumbs_doc_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories_breadcrumbs
    ADD CONSTRAINT categories_breadcrumbs_doc_id_categories_id_fk FOREIGN KEY (doc_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: categories_breadcrumbs categories_breadcrumbs_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories_breadcrumbs
    ADD CONSTRAINT categories_breadcrumbs_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: categories categories_parent_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_categories_id_fk FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: commercial_images commercial_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.commercial_images
    ADD CONSTRAINT commercial_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: commercial_images commercial_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.commercial_images
    ADD CONSTRAINT commercial_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.commercial(id) ON DELETE CASCADE;


--
-- Name: commercial_utilities commercial_utilities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.commercial_utilities
    ADD CONSTRAINT commercial_utilities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.commercial(id) ON DELETE CASCADE;


--
-- Name: flats_amenities flats_amenities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flats_amenities
    ADD CONSTRAINT flats_amenities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.flats(id) ON DELETE CASCADE;


--
-- Name: flats_images flats_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flats_images
    ADD CONSTRAINT flats_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: flats_images flats_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flats_images
    ADD CONSTRAINT flats_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.flats(id) ON DELETE CASCADE;


--
-- Name: flats flats_layout_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flats
    ADD CONSTRAINT flats_layout_id_media_id_fk FOREIGN KEY (layout_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: flats flats_realtor_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flats
    ADD CONSTRAINT flats_realtor_id_users_id_fk FOREIGN KEY (realtor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: flats flats_residential_complex_id_residential_complexes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.flats
    ADD CONSTRAINT flats_residential_complex_id_residential_complexes_id_fk FOREIGN KEY (residential_complex_id) REFERENCES public.residential_complexes(id) ON DELETE SET NULL;


--
-- Name: footer_nav_items footer_nav_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_nav_items
    ADD CONSTRAINT footer_nav_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer(id) ON DELETE CASCADE;


--
-- Name: footer_rels footer_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_rels
    ADD CONSTRAINT footer_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: footer_rels footer_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_rels
    ADD CONSTRAINT footer_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.footer(id) ON DELETE CASCADE;


--
-- Name: footer_rels footer_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.footer_rels
    ADD CONSTRAINT footer_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: form_submissions form_submissions_form_id_forms_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_form_id_forms_id_fk FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE SET NULL;


--
-- Name: form_submissions_submission_data form_submissions_submission_data_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.form_submissions_submission_data
    ADD CONSTRAINT form_submissions_submission_data_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.form_submissions(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_checkbox forms_blocks_checkbox_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_checkbox
    ADD CONSTRAINT forms_blocks_checkbox_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_country forms_blocks_country_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_country
    ADD CONSTRAINT forms_blocks_country_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_email forms_blocks_email_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_email
    ADD CONSTRAINT forms_blocks_email_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_message forms_blocks_message_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_message
    ADD CONSTRAINT forms_blocks_message_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_number forms_blocks_number_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_number
    ADD CONSTRAINT forms_blocks_number_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_select_options forms_blocks_select_options_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_select_options
    ADD CONSTRAINT forms_blocks_select_options_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms_blocks_select(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_select forms_blocks_select_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_select
    ADD CONSTRAINT forms_blocks_select_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_state forms_blocks_state_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_state
    ADD CONSTRAINT forms_blocks_state_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_text forms_blocks_text_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_text
    ADD CONSTRAINT forms_blocks_text_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_textarea forms_blocks_textarea_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_blocks_textarea
    ADD CONSTRAINT forms_blocks_textarea_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_emails forms_emails_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.forms_emails
    ADD CONSTRAINT forms_emails_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: header_nav_items header_nav_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.header_nav_items
    ADD CONSTRAINT header_nav_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.header(id) ON DELETE CASCADE;


--
-- Name: header_rels header_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.header_rels
    ADD CONSTRAINT header_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: header_rels header_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.header_rels
    ADD CONSTRAINT header_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.header(id) ON DELETE CASCADE;


--
-- Name: header_rels header_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.header_rels
    ADD CONSTRAINT header_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: lands_communications lands_communications_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lands_communications
    ADD CONSTRAINT lands_communications_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.lands(id) ON DELETE CASCADE;


--
-- Name: lands_images lands_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lands_images
    ADD CONSTRAINT lands_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: lands_images lands_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lands_images
    ADD CONSTRAINT lands_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.lands(id) ON DELETE CASCADE;


--
-- Name: messages messages_attachment_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_attachment_id_media_id_fk FOREIGN KEY (attachment_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: messages messages_realtor_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_realtor_id_users_id_fk FOREIGN KEY (realtor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_about_hero_images pages_blocks_about_hero_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_about_hero_images
    ADD CONSTRAINT pages_blocks_about_hero_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_about_hero_images pages_blocks_about_hero_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_about_hero_images
    ADD CONSTRAINT pages_blocks_about_hero_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_about_hero(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_about_hero pages_blocks_about_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_about_hero
    ADD CONSTRAINT pages_blocks_about_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_agents pages_blocks_agents_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_agents
    ADD CONSTRAINT pages_blocks_agents_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_amenities_amenities pages_blocks_amenities_amenities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_amenities_amenities
    ADD CONSTRAINT pages_blocks_amenities_amenities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_amenities(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_amenities pages_blocks_amenities_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_amenities
    ADD CONSTRAINT pages_blocks_amenities_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_amenities pages_blocks_amenities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_amenities
    ADD CONSTRAINT pages_blocks_amenities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_archive pages_blocks_archive_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_archive
    ADD CONSTRAINT pages_blocks_archive_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_blog pages_blocks_blog_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_blog
    ADD CONSTRAINT pages_blocks_blog_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_call_to_action_new pages_blocks_call_to_action_new_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_call_to_action_new
    ADD CONSTRAINT pages_blocks_call_to_action_new_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_contact_hero pages_blocks_contact_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_contact_hero
    ADD CONSTRAINT pages_blocks_contact_hero_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_contact_hero pages_blocks_contact_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_contact_hero
    ADD CONSTRAINT pages_blocks_contact_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_contact_us_form pages_blocks_contact_us_form_form_id_forms_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_contact_us_form
    ADD CONSTRAINT pages_blocks_contact_us_form_form_id_forms_id_fk FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_contact_us_form pages_blocks_contact_us_form_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_contact_us_form
    ADD CONSTRAINT pages_blocks_contact_us_form_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_content_columns pages_blocks_content_columns_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_content_columns
    ADD CONSTRAINT pages_blocks_content_columns_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_content(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_content pages_blocks_content_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_content
    ADD CONSTRAINT pages_blocks_content_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_cta_links pages_blocks_cta_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta_links
    ADD CONSTRAINT pages_blocks_cta_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_cta(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_cta pages_blocks_cta_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_cta
    ADD CONSTRAINT pages_blocks_cta_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_faq_items pages_blocks_faq_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_faq_items
    ADD CONSTRAINT pages_blocks_faq_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_faq(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_faq pages_blocks_faq_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_faq
    ADD CONSTRAINT pages_blocks_faq_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_feature_features pages_blocks_feature_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_feature_features
    ADD CONSTRAINT pages_blocks_feature_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_feature(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_feature pages_blocks_feature_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_feature
    ADD CONSTRAINT pages_blocks_feature_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_form_block pages_blocks_form_block_form_id_forms_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_form_block
    ADD CONSTRAINT pages_blocks_form_block_form_id_forms_id_fk FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_form_block pages_blocks_form_block_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_form_block
    ADD CONSTRAINT pages_blocks_form_block_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_hero pages_blocks_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_hero
    ADD CONSTRAINT pages_blocks_hero_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_hero pages_blocks_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_hero
    ADD CONSTRAINT pages_blocks_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_house_filter_filters_fields_options pages_blocks_house_filter_filters_fields_options_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters_fields_options
    ADD CONSTRAINT pages_blocks_house_filter_filters_fields_options_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_house_filter_filters_fields(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_house_filter_filters_fields pages_blocks_house_filter_filters_fields_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters_fields
    ADD CONSTRAINT pages_blocks_house_filter_filters_fields_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_house_filter_filters(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_house_filter_filters pages_blocks_house_filter_filters_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters
    ADD CONSTRAINT pages_blocks_house_filter_filters_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_house_filter(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_house_filter pages_blocks_house_filter_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_house_filter
    ADD CONSTRAINT pages_blocks_house_filter_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_how_it_works pages_blocks_how_it_works_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_how_it_works
    ADD CONSTRAINT pages_blocks_how_it_works_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_how_it_works_steps pages_blocks_how_it_works_steps_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_how_it_works_steps
    ADD CONSTRAINT pages_blocks_how_it_works_steps_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_how_it_works(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_map pages_blocks_map_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_map
    ADD CONSTRAINT pages_blocks_map_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_media_block pages_blocks_media_block_media_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_media_block
    ADD CONSTRAINT pages_blocks_media_block_media_id_media_id_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_media_block pages_blocks_media_block_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_media_block
    ADD CONSTRAINT pages_blocks_media_block_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_navbar pages_blocks_navbar_avatar_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_navbar
    ADD CONSTRAINT pages_blocks_navbar_avatar_id_media_id_fk FOREIGN KEY (avatar_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_navbar_links pages_blocks_navbar_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_navbar_links
    ADD CONSTRAINT pages_blocks_navbar_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_navbar(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_navbar pages_blocks_navbar_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_navbar
    ADD CONSTRAINT pages_blocks_navbar_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_properties pages_blocks_properties_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_properties
    ADD CONSTRAINT pages_blocks_properties_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_property_features pages_blocks_property_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_property_features
    ADD CONSTRAINT pages_blocks_property_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_property_features pages_blocks_property_features_property_id_properties_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_property_features
    ADD CONSTRAINT pages_blocks_property_features_property_id_properties_id_fk FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_testimonials pages_blocks_testimonials_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_testimonials
    ADD CONSTRAINT pages_blocks_testimonials_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_vision_items pages_blocks_vision_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_vision_items
    ADD CONSTRAINT pages_blocks_vision_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_vision(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_vision_mission pages_blocks_vision_mission_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_vision_mission
    ADD CONSTRAINT pages_blocks_vision_mission_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_vision_mission_stats pages_blocks_vision_mission_stats_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_vision_mission_stats
    ADD CONSTRAINT pages_blocks_vision_mission_stats_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_vision_mission(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_vision pages_blocks_vision_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_blocks_vision
    ADD CONSTRAINT pages_blocks_vision_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_hero_links pages_hero_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_hero_links
    ADD CONSTRAINT pages_hero_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages pages_hero_media_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_hero_media_id_media_id_fk FOREIGN KEY (hero_media_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages pages_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_rels pages_rels_agents_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_agents_fk FOREIGN KEY (agents_id) REFERENCES public.agents(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_commercial_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_commercial_fk FOREIGN KEY (commercial_id) REFERENCES public.commercial(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_flats_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_flats_fk FOREIGN KEY (flats_id) REFERENCES public.flats(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_lands_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_lands_fk FOREIGN KEY (lands_id) REFERENCES public.lands(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_properties_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_properties_fk FOREIGN KEY (properties_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_residential_complexes_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_residential_complexes_fk FOREIGN KEY (residential_complexes_id) REFERENCES public.residential_complexes(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_testimonials_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_testimonials_fk FOREIGN KEY (testimonials_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: payload_jobs_log payload_jobs_log_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_jobs_log
    ADD CONSTRAINT payload_jobs_log_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.payload_jobs(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_agents_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_agents_fk FOREIGN KEY (agents_id) REFERENCES public.agents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_commercial_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_commercial_fk FOREIGN KEY (commercial_id) REFERENCES public.commercial(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_flats_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_flats_fk FOREIGN KEY (flats_id) REFERENCES public.flats(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_form_submissions_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_form_submissions_fk FOREIGN KEY (form_submissions_id) REFERENCES public.form_submissions(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_forms_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_forms_fk FOREIGN KEY (forms_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_lands_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_lands_fk FOREIGN KEY (lands_id) REFERENCES public.lands(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_messages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_messages_fk FOREIGN KEY (messages_id) REFERENCES public.messages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_payload_jobs_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_payload_jobs_fk FOREIGN KEY (payload_jobs_id) REFERENCES public.payload_jobs(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_properties_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_properties_fk FOREIGN KEY (properties_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_redirects_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_redirects_fk FOREIGN KEY (redirects_id) REFERENCES public.redirects(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_residential_complexes_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_residential_complexes_fk FOREIGN KEY (residential_complexes_id) REFERENCES public.residential_complexes(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_reviews_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_reviews_fk FOREIGN KEY (reviews_id) REFERENCES public.reviews(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_search_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_search_fk FOREIGN KEY (search_id) REFERENCES public.search(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_testimonials_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_testimonials_fk FOREIGN KEY (testimonials_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: posts posts_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: posts posts_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: posts posts_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: posts_rels posts_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_rels
    ADD CONSTRAINT posts_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: posts_rels posts_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts_rels
    ADD CONSTRAINT posts_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: properties_features properties_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties_features
    ADD CONSTRAINT properties_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: properties_images properties_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties_images
    ADD CONSTRAINT properties_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: properties_images properties_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties_images
    ADD CONSTRAINT properties_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: redirects_rels redirects_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.redirects_rels
    ADD CONSTRAINT redirects_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: redirects_rels redirects_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.redirects_rels
    ADD CONSTRAINT redirects_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.redirects(id) ON DELETE CASCADE;


--
-- Name: redirects_rels redirects_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.redirects_rels
    ADD CONSTRAINT redirects_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: residential_complexes_images residential_complexes_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.residential_complexes_images
    ADD CONSTRAINT residential_complexes_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: residential_complexes_images residential_complexes_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.residential_complexes_images
    ADD CONSTRAINT residential_complexes_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.residential_complexes(id) ON DELETE CASCADE;


--
-- Name: residential_complexes_infrastructure residential_complexes_infrastructure_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.residential_complexes_infrastructure
    ADD CONSTRAINT residential_complexes_infrastructure_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.residential_complexes(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_realtor_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_realtor_id_users_id_fk FOREIGN KEY (realtor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: search_categories search_categories_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_categories
    ADD CONSTRAINT search_categories_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.search(id) ON DELETE CASCADE;


--
-- Name: search search_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search
    ADD CONSTRAINT search_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: search_rels search_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_rels
    ADD CONSTRAINT search_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.search(id) ON DELETE CASCADE;


--
-- Name: search_rels search_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.search_rels
    ADD CONSTRAINT search_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: testimonials testimonials_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: users users_photo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_photo_id_media_id_fk FOREIGN KEY (photo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict r50wo4nfOxDnnn31qlhcyLn0Y2egs1EzDLC5Lny4TojODcgN9XORK3mPMNPL0SR

