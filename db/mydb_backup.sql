--
-- PostgreSQL database dump
--

\restrict zuIAhbxmcRWMPiuUT0ZawocrLRxKMVhHRcOHLTDEqnjnVPvwjB7fSiS9g1wIndb

-- Dumped from database version 15.14 (Debian 15.14-1.pgdg13+1)
-- Dumped by pg_dump version 15.14 (Debian 15.14-1.pgdg13+1)

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

--
-- Name: enum__pages_v_blocks_amenities_amenities_icon; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_blocks_amenities_amenities_icon AS ENUM (
    'wifi',
    'shield',
    'gym',
    'clean'
);


ALTER TYPE public.enum__pages_v_blocks_amenities_amenities_icon OWNER TO admin;

--
-- Name: enum__pages_v_blocks_archive_populate_by; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_blocks_archive_populate_by AS ENUM (
    'collection',
    'selection'
);


ALTER TYPE public.enum__pages_v_blocks_archive_populate_by OWNER TO admin;

--
-- Name: enum__pages_v_blocks_archive_relation_to; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_blocks_archive_relation_to AS ENUM (
    'posts'
);


ALTER TYPE public.enum__pages_v_blocks_archive_relation_to OWNER TO admin;

--
-- Name: enum__pages_v_blocks_content_columns_link_appearance; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_blocks_content_columns_link_appearance AS ENUM (
    'default',
    'outline'
);


ALTER TYPE public.enum__pages_v_blocks_content_columns_link_appearance OWNER TO admin;

--
-- Name: enum__pages_v_blocks_content_columns_link_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_blocks_content_columns_link_type AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE public.enum__pages_v_blocks_content_columns_link_type OWNER TO admin;

--
-- Name: enum__pages_v_blocks_content_columns_size; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_blocks_content_columns_size AS ENUM (
    'oneThird',
    'half',
    'twoThirds',
    'full'
);


ALTER TYPE public.enum__pages_v_blocks_content_columns_size OWNER TO admin;

--
-- Name: enum__pages_v_blocks_cta_links_link_appearance; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_blocks_cta_links_link_appearance AS ENUM (
    'default',
    'outline'
);


ALTER TYPE public.enum__pages_v_blocks_cta_links_link_appearance OWNER TO admin;

--
-- Name: enum__pages_v_blocks_cta_links_link_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_blocks_cta_links_link_type AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE public.enum__pages_v_blocks_cta_links_link_type OWNER TO admin;

--
-- Name: enum__pages_v_blocks_feature_features_icon; Type: TYPE; Schema: public; Owner: admin
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


ALTER TYPE public.enum__pages_v_blocks_feature_features_icon OWNER TO admin;

--
-- Name: enum__pages_v_blocks_house_filter_filters_fields_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_blocks_house_filter_filters_fields_type AS ENUM (
    'text',
    'number',
    'checkbox',
    'select',
    'multi-select',
    'range'
);


ALTER TYPE public.enum__pages_v_blocks_house_filter_filters_fields_type OWNER TO admin;

--
-- Name: enum__pages_v_blocks_properties_layout; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_blocks_properties_layout AS ENUM (
    'grid',
    'list'
);


ALTER TYPE public.enum__pages_v_blocks_properties_layout OWNER TO admin;

--
-- Name: enum__pages_v_version_hero_links_link_appearance; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_version_hero_links_link_appearance AS ENUM (
    'default',
    'outline'
);


ALTER TYPE public.enum__pages_v_version_hero_links_link_appearance OWNER TO admin;

--
-- Name: enum__pages_v_version_hero_links_link_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_version_hero_links_link_type AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE public.enum__pages_v_version_hero_links_link_type OWNER TO admin;

--
-- Name: enum__pages_v_version_hero_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_version_hero_type AS ENUM (
    'none',
    'highImpact',
    'mediumImpact',
    'lowImpact'
);


ALTER TYPE public.enum__pages_v_version_hero_type OWNER TO admin;

--
-- Name: enum__pages_v_version_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum__pages_v_version_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum__pages_v_version_status OWNER TO admin;

--
-- Name: enum_agents_social_links_platform; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_agents_social_links_platform AS ENUM (
    'linkedin',
    'twitter',
    'facebook',
    'instagram'
);


ALTER TYPE public.enum_agents_social_links_platform OWNER TO admin;

--
-- Name: enum_commercial_commercial_type; Type: TYPE; Schema: public; Owner: admin
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


ALTER TYPE public.enum_commercial_commercial_type OWNER TO admin;

--
-- Name: enum_commercial_condition; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_commercial_condition AS ENUM (
    'finished',
    'rough',
    'needs_renovation',
    'for-finishing'
);


ALTER TYPE public.enum_commercial_condition OWNER TO admin;

--
-- Name: enum_commercial_currency; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_commercial_currency AS ENUM (
    'RUB',
    'USD',
    'EUR'
);


ALTER TYPE public.enum_commercial_currency OWNER TO admin;

--
-- Name: enum_commercial_entrance_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_commercial_entrance_type AS ENUM (
    'separate',
    'through-bc',
    'from-street'
);


ALTER TYPE public.enum_commercial_entrance_type OWNER TO admin;

--
-- Name: enum_commercial_price_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_commercial_price_type AS ENUM (
    'total',
    'per_sqm_month',
    'per_sqm_year'
);


ALTER TYPE public.enum_commercial_price_type OWNER TO admin;

--
-- Name: enum_commercial_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_commercial_status AS ENUM (
    'active',
    'sold',
    'unpublished',
    'draft'
);


ALTER TYPE public.enum_commercial_status OWNER TO admin;

--
-- Name: enum_commercial_transaction_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_commercial_transaction_type AS ENUM (
    'sale',
    'rent'
);


ALTER TYPE public.enum_commercial_transaction_type OWNER TO admin;

--
-- Name: enum_flats_building_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_flats_building_type AS ENUM (
    'panel',
    'brick',
    'monolithic',
    'block',
    'wood'
);


ALTER TYPE public.enum_flats_building_type OWNER TO admin;

--
-- Name: enum_flats_currency; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_flats_currency AS ENUM (
    'RUB',
    'USD',
    'EUR'
);


ALTER TYPE public.enum_flats_currency OWNER TO admin;

--
-- Name: enum_flats_property_category; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_flats_property_category AS ENUM (
    'apartment',
    'apartments',
    'studio',
    'townhouse',
    'penthouse',
    'house-part'
);


ALTER TYPE public.enum_flats_property_category OWNER TO admin;

--
-- Name: enum_flats_rooms; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_flats_rooms AS ENUM (
    'studio',
    '1',
    '2',
    '3',
    '4',
    '5plus'
);


ALTER TYPE public.enum_flats_rooms OWNER TO admin;

--
-- Name: enum_flats_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_flats_status AS ENUM (
    'active',
    'sold',
    'unpublished',
    'draft'
);


ALTER TYPE public.enum_flats_status OWNER TO admin;

--
-- Name: enum_flats_transaction_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_flats_transaction_type AS ENUM (
    'sale',
    'rent',
    'daily'
);


ALTER TYPE public.enum_flats_transaction_type OWNER TO admin;

--
-- Name: enum_footer_nav_items_link_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_footer_nav_items_link_type AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE public.enum_footer_nav_items_link_type OWNER TO admin;

--
-- Name: enum_forms_confirmation_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_forms_confirmation_type AS ENUM (
    'message',
    'redirect'
);


ALTER TYPE public.enum_forms_confirmation_type OWNER TO admin;

--
-- Name: enum_header_nav_items_link_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_header_nav_items_link_type AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE public.enum_header_nav_items_link_type OWNER TO admin;

--
-- Name: enum_lands_purpose; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_lands_purpose AS ENUM (
    'ijs',
    'snt',
    'lph',
    'commercial',
    'agricultural'
);


ALTER TYPE public.enum_lands_purpose OWNER TO admin;

--
-- Name: enum_lands_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_lands_status AS ENUM (
    'active',
    'sold',
    'unpublished'
);


ALTER TYPE public.enum_lands_status OWNER TO admin;

--
-- Name: enum_messages_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_messages_status AS ENUM (
    'new',
    'in-progress',
    'completed'
);


ALTER TYPE public.enum_messages_status OWNER TO admin;

--
-- Name: enum_pages_blocks_amenities_amenities_icon; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_blocks_amenities_amenities_icon AS ENUM (
    'wifi',
    'shield',
    'gym',
    'clean'
);


ALTER TYPE public.enum_pages_blocks_amenities_amenities_icon OWNER TO admin;

--
-- Name: enum_pages_blocks_archive_populate_by; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_blocks_archive_populate_by AS ENUM (
    'collection',
    'selection'
);


ALTER TYPE public.enum_pages_blocks_archive_populate_by OWNER TO admin;

--
-- Name: enum_pages_blocks_archive_relation_to; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_blocks_archive_relation_to AS ENUM (
    'posts'
);


ALTER TYPE public.enum_pages_blocks_archive_relation_to OWNER TO admin;

--
-- Name: enum_pages_blocks_content_columns_link_appearance; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_blocks_content_columns_link_appearance AS ENUM (
    'default',
    'outline'
);


ALTER TYPE public.enum_pages_blocks_content_columns_link_appearance OWNER TO admin;

--
-- Name: enum_pages_blocks_content_columns_link_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_blocks_content_columns_link_type AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE public.enum_pages_blocks_content_columns_link_type OWNER TO admin;

--
-- Name: enum_pages_blocks_content_columns_size; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_blocks_content_columns_size AS ENUM (
    'oneThird',
    'half',
    'twoThirds',
    'full'
);


ALTER TYPE public.enum_pages_blocks_content_columns_size OWNER TO admin;

--
-- Name: enum_pages_blocks_cta_links_link_appearance; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_blocks_cta_links_link_appearance AS ENUM (
    'default',
    'outline'
);


ALTER TYPE public.enum_pages_blocks_cta_links_link_appearance OWNER TO admin;

--
-- Name: enum_pages_blocks_cta_links_link_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_blocks_cta_links_link_type AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE public.enum_pages_blocks_cta_links_link_type OWNER TO admin;

--
-- Name: enum_pages_blocks_feature_features_icon; Type: TYPE; Schema: public; Owner: admin
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


ALTER TYPE public.enum_pages_blocks_feature_features_icon OWNER TO admin;

--
-- Name: enum_pages_blocks_house_filter_filters_fields_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_blocks_house_filter_filters_fields_type AS ENUM (
    'text',
    'number',
    'checkbox',
    'select',
    'multi-select',
    'range'
);


ALTER TYPE public.enum_pages_blocks_house_filter_filters_fields_type OWNER TO admin;

--
-- Name: enum_pages_blocks_properties_layout; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_blocks_properties_layout AS ENUM (
    'grid',
    'list'
);


ALTER TYPE public.enum_pages_blocks_properties_layout OWNER TO admin;

--
-- Name: enum_pages_hero_links_link_appearance; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_hero_links_link_appearance AS ENUM (
    'default',
    'outline'
);


ALTER TYPE public.enum_pages_hero_links_link_appearance OWNER TO admin;

--
-- Name: enum_pages_hero_links_link_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_hero_links_link_type AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE public.enum_pages_hero_links_link_type OWNER TO admin;

--
-- Name: enum_pages_hero_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_hero_type AS ENUM (
    'none',
    'highImpact',
    'mediumImpact',
    'lowImpact'
);


ALTER TYPE public.enum_pages_hero_type OWNER TO admin;

--
-- Name: enum_pages_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_pages_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_pages_status OWNER TO admin;

--
-- Name: enum_payload_jobs_log_state; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_payload_jobs_log_state AS ENUM (
    'failed',
    'succeeded'
);


ALTER TYPE public.enum_payload_jobs_log_state OWNER TO admin;

--
-- Name: enum_payload_jobs_log_task_slug; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_payload_jobs_log_task_slug AS ENUM (
    'inline',
    'schedulePublish'
);


ALTER TYPE public.enum_payload_jobs_log_task_slug OWNER TO admin;

--
-- Name: enum_payload_jobs_task_slug; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_payload_jobs_task_slug AS ENUM (
    'inline',
    'schedulePublish'
);


ALTER TYPE public.enum_payload_jobs_task_slug OWNER TO admin;

--
-- Name: enum_posts_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_posts_status AS ENUM (
    'draft',
    'published'
);


ALTER TYPE public.enum_posts_status OWNER TO admin;

--
-- Name: enum_properties_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_properties_status AS ENUM (
    'active',
    'sold',
    'draft'
);


ALTER TYPE public.enum_properties_status OWNER TO admin;

--
-- Name: enum_properties_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_properties_type AS ENUM (
    'sale',
    'rent'
);


ALTER TYPE public.enum_properties_type OWNER TO admin;

--
-- Name: enum_redirects_to_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_redirects_to_type AS ENUM (
    'reference',
    'custom'
);


ALTER TYPE public.enum_redirects_to_type OWNER TO admin;

--
-- Name: enum_residential_complexes_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_residential_complexes_status AS ENUM (
    'planning',
    'under-construction',
    'completed'
);


ALTER TYPE public.enum_residential_complexes_status OWNER TO admin;

--
-- Name: enum_residential_complexes_type; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_residential_complexes_type AS ENUM (
    'economy',
    'comfort',
    'business',
    'premium'
);


ALTER TYPE public.enum_residential_complexes_type OWNER TO admin;

--
-- Name: enum_reviews_status; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_reviews_status AS ENUM (
    'pending',
    'approved',
    'rejected'
);


ALTER TYPE public.enum_reviews_status OWNER TO admin;

--
-- Name: enum_users_role; Type: TYPE; Schema: public; Owner: admin
--

CREATE TYPE public.enum_users_role AS ENUM (
    'admin',
    'realtor'
);


ALTER TYPE public.enum_users_role OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _pages_v; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v OWNER TO admin;

--
-- Name: _pages_v_blocks_about_hero; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_about_hero OWNER TO admin;

--
-- Name: _pages_v_blocks_about_hero_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_about_hero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_about_hero_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_about_hero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_about_hero_id_seq OWNED BY public._pages_v_blocks_about_hero.id;


--
-- Name: _pages_v_blocks_about_hero_images; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._pages_v_blocks_about_hero_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    image_id integer,
    _uuid character varying
);


ALTER TABLE public._pages_v_blocks_about_hero_images OWNER TO admin;

--
-- Name: _pages_v_blocks_about_hero_images_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_about_hero_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_about_hero_images_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_about_hero_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_about_hero_images_id_seq OWNED BY public._pages_v_blocks_about_hero_images.id;


--
-- Name: _pages_v_blocks_agents; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_agents OWNER TO admin;

--
-- Name: _pages_v_blocks_agents_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_agents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_agents_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_agents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_agents_id_seq OWNED BY public._pages_v_blocks_agents.id;


--
-- Name: _pages_v_blocks_amenities; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_amenities OWNER TO admin;

--
-- Name: _pages_v_blocks_amenities_amenities; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._pages_v_blocks_amenities_amenities (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    icon public.enum__pages_v_blocks_amenities_amenities_icon,
    title character varying,
    _uuid character varying
);


ALTER TABLE public._pages_v_blocks_amenities_amenities OWNER TO admin;

--
-- Name: _pages_v_blocks_amenities_amenities_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_amenities_amenities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_amenities_amenities_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_amenities_amenities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_amenities_amenities_id_seq OWNED BY public._pages_v_blocks_amenities_amenities.id;


--
-- Name: _pages_v_blocks_amenities_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_amenities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_amenities_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_amenities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_amenities_id_seq OWNED BY public._pages_v_blocks_amenities.id;


--
-- Name: _pages_v_blocks_archive; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_archive OWNER TO admin;

--
-- Name: _pages_v_blocks_archive_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_archive_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_archive_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_archive_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_archive_id_seq OWNED BY public._pages_v_blocks_archive.id;


--
-- Name: _pages_v_blocks_blog; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_blog OWNER TO admin;

--
-- Name: _pages_v_blocks_blog_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_blog_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_blog_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_blog_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_blog_id_seq OWNED BY public._pages_v_blocks_blog.id;


--
-- Name: _pages_v_blocks_call_to_action_new; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_call_to_action_new OWNER TO admin;

--
-- Name: _pages_v_blocks_call_to_action_new_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_call_to_action_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_call_to_action_new_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_call_to_action_new_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_call_to_action_new_id_seq OWNED BY public._pages_v_blocks_call_to_action_new.id;


--
-- Name: _pages_v_blocks_contact_hero; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_contact_hero OWNER TO admin;

--
-- Name: _pages_v_blocks_contact_hero_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_contact_hero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_contact_hero_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_contact_hero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_contact_hero_id_seq OWNED BY public._pages_v_blocks_contact_hero.id;


--
-- Name: _pages_v_blocks_contact_us_form; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_contact_us_form OWNER TO admin;

--
-- Name: _pages_v_blocks_contact_us_form_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_contact_us_form_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_contact_us_form_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_contact_us_form_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_contact_us_form_id_seq OWNED BY public._pages_v_blocks_contact_us_form.id;


--
-- Name: _pages_v_blocks_content; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._pages_v_blocks_content (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    _uuid character varying,
    block_name character varying
);


ALTER TABLE public._pages_v_blocks_content OWNER TO admin;

--
-- Name: _pages_v_blocks_content_columns; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_content_columns OWNER TO admin;

--
-- Name: _pages_v_blocks_content_columns_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_content_columns_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_content_columns_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_content_columns_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_content_columns_id_seq OWNED BY public._pages_v_blocks_content_columns.id;


--
-- Name: _pages_v_blocks_content_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_content_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_content_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_content_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_content_id_seq OWNED BY public._pages_v_blocks_content.id;


--
-- Name: _pages_v_blocks_cta; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_cta OWNER TO admin;

--
-- Name: _pages_v_blocks_cta_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_cta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_cta_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_cta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_cta_id_seq OWNED BY public._pages_v_blocks_cta.id;


--
-- Name: _pages_v_blocks_cta_links; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_cta_links OWNER TO admin;

--
-- Name: _pages_v_blocks_cta_links_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_cta_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_cta_links_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_cta_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_cta_links_id_seq OWNED BY public._pages_v_blocks_cta_links.id;


--
-- Name: _pages_v_blocks_faq; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_faq OWNER TO admin;

--
-- Name: _pages_v_blocks_faq_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_faq_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_faq_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_faq_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_faq_id_seq OWNED BY public._pages_v_blocks_faq.id;


--
-- Name: _pages_v_blocks_faq_items; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._pages_v_blocks_faq_items (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    question character varying,
    answer character varying,
    _uuid character varying
);


ALTER TABLE public._pages_v_blocks_faq_items OWNER TO admin;

--
-- Name: _pages_v_blocks_faq_items_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_faq_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_faq_items_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_faq_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_faq_items_id_seq OWNED BY public._pages_v_blocks_faq_items.id;


--
-- Name: _pages_v_blocks_feature; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_feature OWNER TO admin;

--
-- Name: _pages_v_blocks_feature_features; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_feature_features OWNER TO admin;

--
-- Name: _pages_v_blocks_feature_features_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_feature_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_feature_features_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_feature_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_feature_features_id_seq OWNED BY public._pages_v_blocks_feature_features.id;


--
-- Name: _pages_v_blocks_feature_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_feature_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_feature_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_feature_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_feature_id_seq OWNED BY public._pages_v_blocks_feature.id;


--
-- Name: _pages_v_blocks_form_block; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_form_block OWNER TO admin;

--
-- Name: _pages_v_blocks_form_block_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_form_block_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_form_block_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_form_block_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_form_block_id_seq OWNED BY public._pages_v_blocks_form_block.id;


--
-- Name: _pages_v_blocks_hero; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_hero OWNER TO admin;

--
-- Name: _pages_v_blocks_hero_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_hero_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_hero_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_hero_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_hero_id_seq OWNED BY public._pages_v_blocks_hero.id;


--
-- Name: _pages_v_blocks_house_filter; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._pages_v_blocks_house_filter (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id integer NOT NULL,
    _uuid character varying,
    block_name character varying
);


ALTER TABLE public._pages_v_blocks_house_filter OWNER TO admin;

--
-- Name: _pages_v_blocks_house_filter_filters; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._pages_v_blocks_house_filter_filters (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    label character varying,
    collection character varying,
    _uuid character varying
);


ALTER TABLE public._pages_v_blocks_house_filter_filters OWNER TO admin;

--
-- Name: _pages_v_blocks_house_filter_filters_fields; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_house_filter_filters_fields OWNER TO admin;

--
-- Name: _pages_v_blocks_house_filter_filters_fields_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_house_filter_filters_fields_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_house_filter_filters_fields_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_house_filter_filters_fields_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_house_filter_filters_fields_id_seq OWNED BY public._pages_v_blocks_house_filter_filters_fields.id;


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._pages_v_blocks_house_filter_filters_fields_options (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    value character varying,
    label character varying,
    _uuid character varying
);


ALTER TABLE public._pages_v_blocks_house_filter_filters_fields_options OWNER TO admin;

--
-- Name: _pages_v_blocks_house_filter_filters_fields_options_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_house_filter_filters_fields_options_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_house_filter_filters_fields_options_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_house_filter_filters_fields_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_house_filter_filters_fields_options_id_seq OWNED BY public._pages_v_blocks_house_filter_filters_fields_options.id;


--
-- Name: _pages_v_blocks_house_filter_filters_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_house_filter_filters_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_house_filter_filters_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_house_filter_filters_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_house_filter_filters_id_seq OWNED BY public._pages_v_blocks_house_filter_filters.id;


--
-- Name: _pages_v_blocks_house_filter_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_house_filter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_house_filter_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_house_filter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_house_filter_id_seq OWNED BY public._pages_v_blocks_house_filter.id;


--
-- Name: _pages_v_blocks_how_it_works; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_how_it_works OWNER TO admin;

--
-- Name: _pages_v_blocks_how_it_works_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_how_it_works_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_how_it_works_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_how_it_works_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_how_it_works_id_seq OWNED BY public._pages_v_blocks_how_it_works.id;


--
-- Name: _pages_v_blocks_how_it_works_steps; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_how_it_works_steps OWNER TO admin;

--
-- Name: _pages_v_blocks_how_it_works_steps_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_how_it_works_steps_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_how_it_works_steps_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_how_it_works_steps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_how_it_works_steps_id_seq OWNED BY public._pages_v_blocks_how_it_works_steps.id;


--
-- Name: _pages_v_blocks_map; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_map OWNER TO admin;

--
-- Name: _pages_v_blocks_map_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_map_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_map_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_map_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_map_id_seq OWNED BY public._pages_v_blocks_map.id;


--
-- Name: _pages_v_blocks_media_block; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_media_block OWNER TO admin;

--
-- Name: _pages_v_blocks_media_block_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_media_block_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_media_block_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_media_block_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_media_block_id_seq OWNED BY public._pages_v_blocks_media_block.id;


--
-- Name: _pages_v_blocks_navbar; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_navbar OWNER TO admin;

--
-- Name: _pages_v_blocks_navbar_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_navbar_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_navbar_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_navbar_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_navbar_id_seq OWNED BY public._pages_v_blocks_navbar.id;


--
-- Name: _pages_v_blocks_navbar_links; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._pages_v_blocks_navbar_links (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    text character varying,
    url character varying,
    _uuid character varying
);


ALTER TABLE public._pages_v_blocks_navbar_links OWNER TO admin;

--
-- Name: _pages_v_blocks_navbar_links_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_navbar_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_navbar_links_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_navbar_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_navbar_links_id_seq OWNED BY public._pages_v_blocks_navbar_links.id;


--
-- Name: _pages_v_blocks_properties; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_properties OWNER TO admin;

--
-- Name: _pages_v_blocks_properties_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_properties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_properties_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_properties_id_seq OWNED BY public._pages_v_blocks_properties.id;


--
-- Name: _pages_v_blocks_property_features; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_property_features OWNER TO admin;

--
-- Name: _pages_v_blocks_property_features_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_property_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_property_features_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_property_features_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_property_features_id_seq OWNED BY public._pages_v_blocks_property_features.id;


--
-- Name: _pages_v_blocks_testimonials; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_testimonials OWNER TO admin;

--
-- Name: _pages_v_blocks_testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_testimonials_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_testimonials_id_seq OWNED BY public._pages_v_blocks_testimonials.id;


--
-- Name: _pages_v_blocks_vision; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_vision OWNER TO admin;

--
-- Name: _pages_v_blocks_vision_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_vision_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_vision_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_vision_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_vision_id_seq OWNED BY public._pages_v_blocks_vision.id;


--
-- Name: _pages_v_blocks_vision_items; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_vision_items OWNER TO admin;

--
-- Name: _pages_v_blocks_vision_items_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_vision_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_vision_items_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_vision_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_vision_items_id_seq OWNED BY public._pages_v_blocks_vision_items.id;


--
-- Name: _pages_v_blocks_vision_mission; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_blocks_vision_mission OWNER TO admin;

--
-- Name: _pages_v_blocks_vision_mission_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_vision_mission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_vision_mission_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_vision_mission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_vision_mission_id_seq OWNED BY public._pages_v_blocks_vision_mission.id;


--
-- Name: _pages_v_blocks_vision_mission_stats; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._pages_v_blocks_vision_mission_stats (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id integer NOT NULL,
    value character varying,
    label character varying,
    _uuid character varying
);


ALTER TABLE public._pages_v_blocks_vision_mission_stats OWNER TO admin;

--
-- Name: _pages_v_blocks_vision_mission_stats_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_blocks_vision_mission_stats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_blocks_vision_mission_stats_id_seq OWNER TO admin;

--
-- Name: _pages_v_blocks_vision_mission_stats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_blocks_vision_mission_stats_id_seq OWNED BY public._pages_v_blocks_vision_mission_stats.id;


--
-- Name: _pages_v_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_id_seq OWNER TO admin;

--
-- Name: _pages_v_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_id_seq OWNED BY public._pages_v.id;


--
-- Name: _pages_v_rels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public._pages_v_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer,
    categories_id integer,
    properties_id integer,
    agents_id integer,
    testimonials_id integer,
    commercial_id integer,
    flats_id integer,
    lands_id integer,
    residential_complexes_id integer
);


ALTER TABLE public._pages_v_rels OWNER TO admin;

--
-- Name: _pages_v_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_rels_id_seq OWNER TO admin;

--
-- Name: _pages_v_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_rels_id_seq OWNED BY public._pages_v_rels.id;


--
-- Name: _pages_v_version_hero_links; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public._pages_v_version_hero_links OWNER TO admin;

--
-- Name: _pages_v_version_hero_links_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public._pages_v_version_hero_links_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public._pages_v_version_hero_links_id_seq OWNER TO admin;

--
-- Name: _pages_v_version_hero_links_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public._pages_v_version_hero_links_id_seq OWNED BY public._pages_v_version_hero_links.id;


--
-- Name: agents; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.agents OWNER TO admin;

--
-- Name: agents_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.agents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agents_id_seq OWNER TO admin;

--
-- Name: agents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.agents_id_seq OWNED BY public.agents.id;


--
-- Name: agents_social_links; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.agents_social_links (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    platform public.enum_agents_social_links_platform,
    url character varying NOT NULL
);


ALTER TABLE public.agents_social_links OWNER TO admin;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.categories OWNER TO admin;

--
-- Name: categories_breadcrumbs; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.categories_breadcrumbs (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    doc_id integer,
    url character varying,
    label character varying
);


ALTER TABLE public.categories_breadcrumbs OWNER TO admin;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO admin;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: commercial; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.commercial OWNER TO admin;

--
-- Name: commercial_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.commercial_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.commercial_id_seq OWNER TO admin;

--
-- Name: commercial_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.commercial_id_seq OWNED BY public.commercial.id;


--
-- Name: commercial_images; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.commercial_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE public.commercial_images OWNER TO admin;

--
-- Name: commercial_utilities; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.commercial_utilities (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    utility character varying
);


ALTER TABLE public.commercial_utilities OWNER TO admin;

--
-- Name: flats; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.flats OWNER TO admin;

--
-- Name: flats_amenities; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.flats_amenities (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    amenity character varying NOT NULL
);


ALTER TABLE public.flats_amenities OWNER TO admin;

--
-- Name: flats_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.flats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.flats_id_seq OWNER TO admin;

--
-- Name: flats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.flats_id_seq OWNED BY public.flats.id;


--
-- Name: flats_images; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.flats_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL,
    alt character varying
);


ALTER TABLE public.flats_images OWNER TO admin;

--
-- Name: footer; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.footer (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


ALTER TABLE public.footer OWNER TO admin;

--
-- Name: footer_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.footer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.footer_id_seq OWNER TO admin;

--
-- Name: footer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.footer_id_seq OWNED BY public.footer.id;


--
-- Name: footer_nav_items; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.footer_nav_items OWNER TO admin;

--
-- Name: footer_rels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.footer_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer
);


ALTER TABLE public.footer_rels OWNER TO admin;

--
-- Name: footer_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.footer_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.footer_rels_id_seq OWNER TO admin;

--
-- Name: footer_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.footer_rels_id_seq OWNED BY public.footer_rels.id;


--
-- Name: form_submissions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.form_submissions (
    id integer NOT NULL,
    form_id integer NOT NULL,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.form_submissions OWNER TO admin;

--
-- Name: form_submissions_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.form_submissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.form_submissions_id_seq OWNER TO admin;

--
-- Name: form_submissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.form_submissions_id_seq OWNED BY public.form_submissions.id;


--
-- Name: form_submissions_submission_data; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.form_submissions_submission_data (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    field character varying NOT NULL,
    value character varying NOT NULL
);


ALTER TABLE public.form_submissions_submission_data OWNER TO admin;

--
-- Name: forms; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.forms OWNER TO admin;

--
-- Name: forms_blocks_checkbox; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.forms_blocks_checkbox OWNER TO admin;

--
-- Name: forms_blocks_country; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.forms_blocks_country OWNER TO admin;

--
-- Name: forms_blocks_email; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.forms_blocks_email OWNER TO admin;

--
-- Name: forms_blocks_message; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.forms_blocks_message (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    message jsonb,
    block_name character varying
);


ALTER TABLE public.forms_blocks_message OWNER TO admin;

--
-- Name: forms_blocks_number; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.forms_blocks_number OWNER TO admin;

--
-- Name: forms_blocks_select; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.forms_blocks_select OWNER TO admin;

--
-- Name: forms_blocks_select_options; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.forms_blocks_select_options (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    label character varying NOT NULL,
    value character varying NOT NULL
);


ALTER TABLE public.forms_blocks_select_options OWNER TO admin;

--
-- Name: forms_blocks_state; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.forms_blocks_state OWNER TO admin;

--
-- Name: forms_blocks_text; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.forms_blocks_text OWNER TO admin;

--
-- Name: forms_blocks_textarea; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.forms_blocks_textarea OWNER TO admin;

--
-- Name: forms_emails; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.forms_emails OWNER TO admin;

--
-- Name: forms_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.forms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.forms_id_seq OWNER TO admin;

--
-- Name: forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.forms_id_seq OWNED BY public.forms.id;


--
-- Name: header; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.header (
    id integer NOT NULL,
    updated_at timestamp(3) with time zone,
    created_at timestamp(3) with time zone
);


ALTER TABLE public.header OWNER TO admin;

--
-- Name: header_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.header_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.header_id_seq OWNER TO admin;

--
-- Name: header_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.header_id_seq OWNED BY public.header.id;


--
-- Name: header_nav_items; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.header_nav_items OWNER TO admin;

--
-- Name: header_rels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.header_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer
);


ALTER TABLE public.header_rels OWNER TO admin;

--
-- Name: header_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.header_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.header_rels_id_seq OWNER TO admin;

--
-- Name: header_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.header_rels_id_seq OWNED BY public.header_rels.id;


--
-- Name: lands; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.lands OWNER TO admin;

--
-- Name: lands_communications; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.lands_communications (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    communication character varying
);


ALTER TABLE public.lands_communications OWNER TO admin;

--
-- Name: lands_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.lands_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.lands_id_seq OWNER TO admin;

--
-- Name: lands_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.lands_id_seq OWNED BY public.lands.id;


--
-- Name: lands_images; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.lands_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer
);


ALTER TABLE public.lands_images OWNER TO admin;

--
-- Name: media; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.media OWNER TO admin;

--
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.media_id_seq OWNER TO admin;

--
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- Name: messages; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.messages OWNER TO admin;

--
-- Name: messages_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.messages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.messages_id_seq OWNER TO admin;

--
-- Name: messages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.messages_id_seq OWNED BY public.messages.id;


--
-- Name: pages; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages OWNER TO admin;

--
-- Name: pages_blocks_about_hero; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_about_hero OWNER TO admin;

--
-- Name: pages_blocks_about_hero_images; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_about_hero_images (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    image_id integer
);


ALTER TABLE public.pages_blocks_about_hero_images OWNER TO admin;

--
-- Name: pages_blocks_agents; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_agents OWNER TO admin;

--
-- Name: pages_blocks_amenities; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_amenities OWNER TO admin;

--
-- Name: pages_blocks_amenities_amenities; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_amenities_amenities (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    icon public.enum_pages_blocks_amenities_amenities_icon,
    title character varying
);


ALTER TABLE public.pages_blocks_amenities_amenities OWNER TO admin;

--
-- Name: pages_blocks_archive; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_archive OWNER TO admin;

--
-- Name: pages_blocks_blog; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_blog OWNER TO admin;

--
-- Name: pages_blocks_call_to_action_new; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_call_to_action_new OWNER TO admin;

--
-- Name: pages_blocks_contact_hero; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_contact_hero OWNER TO admin;

--
-- Name: pages_blocks_contact_us_form; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_contact_us_form OWNER TO admin;

--
-- Name: pages_blocks_content; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_content (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_name character varying
);


ALTER TABLE public.pages_blocks_content OWNER TO admin;

--
-- Name: pages_blocks_content_columns; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_content_columns OWNER TO admin;

--
-- Name: pages_blocks_cta; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_cta (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    rich_text jsonb,
    block_name character varying
);


ALTER TABLE public.pages_blocks_cta OWNER TO admin;

--
-- Name: pages_blocks_cta_links; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_cta_links OWNER TO admin;

--
-- Name: pages_blocks_faq; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_faq OWNER TO admin;

--
-- Name: pages_blocks_faq_items; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_faq_items (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    question character varying,
    answer character varying
);


ALTER TABLE public.pages_blocks_faq_items OWNER TO admin;

--
-- Name: pages_blocks_feature; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_feature OWNER TO admin;

--
-- Name: pages_blocks_feature_features; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_feature_features (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    icon public.enum_pages_blocks_feature_features_icon,
    title character varying,
    description character varying
);


ALTER TABLE public.pages_blocks_feature_features OWNER TO admin;

--
-- Name: pages_blocks_form_block; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_form_block OWNER TO admin;

--
-- Name: pages_blocks_hero; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_hero OWNER TO admin;

--
-- Name: pages_blocks_house_filter; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_house_filter (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    block_name character varying
);


ALTER TABLE public.pages_blocks_house_filter OWNER TO admin;

--
-- Name: pages_blocks_house_filter_filters; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_house_filter_filters (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    label character varying,
    collection character varying
);


ALTER TABLE public.pages_blocks_house_filter_filters OWNER TO admin;

--
-- Name: pages_blocks_house_filter_filters_fields; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_house_filter_filters_fields OWNER TO admin;

--
-- Name: pages_blocks_house_filter_filters_fields_options; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_house_filter_filters_fields_options (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    value character varying,
    label character varying
);


ALTER TABLE public.pages_blocks_house_filter_filters_fields_options OWNER TO admin;

--
-- Name: pages_blocks_how_it_works; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_how_it_works OWNER TO admin;

--
-- Name: pages_blocks_how_it_works_steps; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_how_it_works_steps (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    icon character varying DEFAULT '1'::character varying,
    title character varying,
    description character varying
);


ALTER TABLE public.pages_blocks_how_it_works_steps OWNER TO admin;

--
-- Name: pages_blocks_map; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_map OWNER TO admin;

--
-- Name: pages_blocks_media_block; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_media_block (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    _path text NOT NULL,
    id character varying NOT NULL,
    media_id integer,
    block_name character varying
);


ALTER TABLE public.pages_blocks_media_block OWNER TO admin;

--
-- Name: pages_blocks_navbar; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_navbar OWNER TO admin;

--
-- Name: pages_blocks_navbar_links; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_navbar_links (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    text character varying,
    url character varying
);


ALTER TABLE public.pages_blocks_navbar_links OWNER TO admin;

--
-- Name: pages_blocks_properties; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_properties OWNER TO admin;

--
-- Name: pages_blocks_property_features; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_property_features OWNER TO admin;

--
-- Name: pages_blocks_testimonials; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_testimonials OWNER TO admin;

--
-- Name: pages_blocks_vision; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_vision OWNER TO admin;

--
-- Name: pages_blocks_vision_items; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_vision_items (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    icon character varying,
    title character varying,
    description character varying
);


ALTER TABLE public.pages_blocks_vision_items OWNER TO admin;

--
-- Name: pages_blocks_vision_mission; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_blocks_vision_mission OWNER TO admin;

--
-- Name: pages_blocks_vision_mission_stats; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_blocks_vision_mission_stats (
    _order integer NOT NULL,
    _parent_id character varying NOT NULL,
    id character varying NOT NULL,
    value character varying,
    label character varying
);


ALTER TABLE public.pages_blocks_vision_mission_stats OWNER TO admin;

--
-- Name: pages_hero_links; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.pages_hero_links OWNER TO admin;

--
-- Name: pages_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.pages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pages_id_seq OWNER TO admin;

--
-- Name: pages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.pages_id_seq OWNED BY public.pages.id;


--
-- Name: pages_rels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pages_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer,
    categories_id integer,
    properties_id integer,
    agents_id integer,
    testimonials_id integer,
    commercial_id integer,
    flats_id integer,
    lands_id integer,
    residential_complexes_id integer
);


ALTER TABLE public.pages_rels OWNER TO admin;

--
-- Name: pages_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.pages_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pages_rels_id_seq OWNER TO admin;

--
-- Name: pages_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.pages_rels_id_seq OWNED BY public.pages_rels.id;


--
-- Name: payload_jobs; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.payload_jobs OWNER TO admin;

--
-- Name: payload_jobs_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.payload_jobs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_jobs_id_seq OWNER TO admin;

--
-- Name: payload_jobs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.payload_jobs_id_seq OWNED BY public.payload_jobs.id;


--
-- Name: payload_jobs_log; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.payload_jobs_log OWNER TO admin;

--
-- Name: payload_locked_documents; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.payload_locked_documents (
    id integer NOT NULL,
    global_slug character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_locked_documents OWNER TO admin;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.payload_locked_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_locked_documents_id_seq OWNER TO admin;

--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.payload_locked_documents_id_seq OWNED BY public.payload_locked_documents.id;


--
-- Name: payload_locked_documents_rels; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.payload_locked_documents_rels OWNER TO admin;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.payload_locked_documents_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_locked_documents_rels_id_seq OWNER TO admin;

--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.payload_locked_documents_rels_id_seq OWNED BY public.payload_locked_documents_rels.id;


--
-- Name: payload_migrations; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.payload_migrations (
    id integer NOT NULL,
    name character varying,
    batch numeric,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_migrations OWNER TO admin;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.payload_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_migrations_id_seq OWNER TO admin;

--
-- Name: payload_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.payload_migrations_id_seq OWNED BY public.payload_migrations.id;


--
-- Name: payload_preferences; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.payload_preferences (
    id integer NOT NULL,
    key character varying,
    value jsonb,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.payload_preferences OWNER TO admin;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.payload_preferences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_preferences_id_seq OWNER TO admin;

--
-- Name: payload_preferences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.payload_preferences_id_seq OWNED BY public.payload_preferences.id;


--
-- Name: payload_preferences_rels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.payload_preferences_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    users_id integer
);


ALTER TABLE public.payload_preferences_rels OWNER TO admin;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.payload_preferences_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.payload_preferences_rels_id_seq OWNER TO admin;

--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.payload_preferences_rels_id_seq OWNED BY public.payload_preferences_rels.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.posts OWNER TO admin;

--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO admin;

--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: posts_rels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.posts_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    categories_id integer
);


ALTER TABLE public.posts_rels OWNER TO admin;

--
-- Name: posts_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.posts_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_rels_id_seq OWNER TO admin;

--
-- Name: posts_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.posts_rels_id_seq OWNED BY public.posts_rels.id;


--
-- Name: properties; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.properties OWNER TO admin;

--
-- Name: properties_features; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.properties_features (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    feature character varying NOT NULL
);


ALTER TABLE public.properties_features OWNER TO admin;

--
-- Name: properties_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.properties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.properties_id_seq OWNER TO admin;

--
-- Name: properties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.properties_id_seq OWNED BY public.properties.id;


--
-- Name: properties_images; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.properties_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE public.properties_images OWNER TO admin;

--
-- Name: redirects; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.redirects (
    id integer NOT NULL,
    "from" character varying NOT NULL,
    to_type public.enum_redirects_to_type DEFAULT 'reference'::public.enum_redirects_to_type,
    to_url character varying,
    updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
    created_at timestamp(3) with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.redirects OWNER TO admin;

--
-- Name: redirects_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.redirects_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.redirects_id_seq OWNER TO admin;

--
-- Name: redirects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.redirects_id_seq OWNED BY public.redirects.id;


--
-- Name: redirects_rels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.redirects_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    pages_id integer,
    posts_id integer
);


ALTER TABLE public.redirects_rels OWNER TO admin;

--
-- Name: redirects_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.redirects_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.redirects_rels_id_seq OWNER TO admin;

--
-- Name: redirects_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.redirects_rels_id_seq OWNED BY public.redirects_rels.id;


--
-- Name: residential_complexes; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.residential_complexes OWNER TO admin;

--
-- Name: residential_complexes_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.residential_complexes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.residential_complexes_id_seq OWNER TO admin;

--
-- Name: residential_complexes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.residential_complexes_id_seq OWNED BY public.residential_complexes.id;


--
-- Name: residential_complexes_images; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.residential_complexes_images (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    image_id integer NOT NULL
);


ALTER TABLE public.residential_complexes_images OWNER TO admin;

--
-- Name: residential_complexes_infrastructure; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.residential_complexes_infrastructure (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    item character varying
);


ALTER TABLE public.residential_complexes_infrastructure OWNER TO admin;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.reviews OWNER TO admin;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reviews_id_seq OWNER TO admin;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: search; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.search OWNER TO admin;

--
-- Name: search_categories; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.search_categories (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    relation_to character varying,
    title character varying
);


ALTER TABLE public.search_categories OWNER TO admin;

--
-- Name: search_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.search_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.search_id_seq OWNER TO admin;

--
-- Name: search_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.search_id_seq OWNED BY public.search.id;


--
-- Name: search_rels; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.search_rels (
    id integer NOT NULL,
    "order" integer,
    parent_id integer NOT NULL,
    path character varying NOT NULL,
    posts_id integer
);


ALTER TABLE public.search_rels OWNER TO admin;

--
-- Name: search_rels_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.search_rels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.search_rels_id_seq OWNER TO admin;

--
-- Name: search_rels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.search_rels_id_seq OWNED BY public.search_rels.id;


--
-- Name: testimonials; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.testimonials OWNER TO admin;

--
-- Name: testimonials_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.testimonials_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.testimonials_id_seq OWNER TO admin;

--
-- Name: testimonials_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.testimonials_id_seq OWNED BY public.testimonials.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
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


ALTER TABLE public.users OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO admin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_sessions; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users_sessions (
    _order integer NOT NULL,
    _parent_id integer NOT NULL,
    id character varying NOT NULL,
    created_at timestamp(3) with time zone,
    expires_at timestamp(3) with time zone NOT NULL
);


ALTER TABLE public.users_sessions OWNER TO admin;

--
-- Name: _pages_v id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v ALTER COLUMN id SET DEFAULT nextval('public._pages_v_id_seq'::regclass);


--
-- Name: _pages_v_blocks_about_hero id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_about_hero_id_seq'::regclass);


--
-- Name: _pages_v_blocks_about_hero_images id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero_images ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_about_hero_images_id_seq'::regclass);


--
-- Name: _pages_v_blocks_agents id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_agents ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_agents_id_seq'::regclass);


--
-- Name: _pages_v_blocks_amenities id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_amenities ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_amenities_id_seq'::regclass);


--
-- Name: _pages_v_blocks_amenities_amenities id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_amenities_amenities ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_amenities_amenities_id_seq'::regclass);


--
-- Name: _pages_v_blocks_archive id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_archive ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_archive_id_seq'::regclass);


--
-- Name: _pages_v_blocks_blog id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_blog ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_blog_id_seq'::regclass);


--
-- Name: _pages_v_blocks_call_to_action_new id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_call_to_action_new ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_call_to_action_new_id_seq'::regclass);


--
-- Name: _pages_v_blocks_contact_hero id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_contact_hero ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_contact_hero_id_seq'::regclass);


--
-- Name: _pages_v_blocks_contact_us_form id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_contact_us_form ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_contact_us_form_id_seq'::regclass);


--
-- Name: _pages_v_blocks_content id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_content ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_content_id_seq'::regclass);


--
-- Name: _pages_v_blocks_content_columns id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_content_columns ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_content_columns_id_seq'::regclass);


--
-- Name: _pages_v_blocks_cta id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_cta ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cta_id_seq'::regclass);


--
-- Name: _pages_v_blocks_cta_links id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_cta_links ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_cta_links_id_seq'::regclass);


--
-- Name: _pages_v_blocks_faq id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_faq ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_faq_id_seq'::regclass);


--
-- Name: _pages_v_blocks_faq_items id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_faq_items ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_faq_items_id_seq'::regclass);


--
-- Name: _pages_v_blocks_feature id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_feature ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_feature_id_seq'::regclass);


--
-- Name: _pages_v_blocks_feature_features id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_feature_features ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_feature_features_id_seq'::regclass);


--
-- Name: _pages_v_blocks_form_block id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_form_block ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_form_block_id_seq'::regclass);


--
-- Name: _pages_v_blocks_hero id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_hero ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_hero_id_seq'::regclass);


--
-- Name: _pages_v_blocks_house_filter id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_house_filter_id_seq'::regclass);


--
-- Name: _pages_v_blocks_house_filter_filters id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_house_filter_filters_id_seq'::regclass);


--
-- Name: _pages_v_blocks_house_filter_filters_fields id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_house_filter_filters_fields_id_seq'::regclass);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields_options ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_house_filter_filters_fields_options_id_seq'::regclass);


--
-- Name: _pages_v_blocks_how_it_works id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_how_it_works_id_seq'::regclass);


--
-- Name: _pages_v_blocks_how_it_works_steps id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works_steps ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_how_it_works_steps_id_seq'::regclass);


--
-- Name: _pages_v_blocks_map id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_map ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_map_id_seq'::regclass);


--
-- Name: _pages_v_blocks_media_block id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_media_block ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_media_block_id_seq'::regclass);


--
-- Name: _pages_v_blocks_navbar id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_navbar ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_navbar_id_seq'::regclass);


--
-- Name: _pages_v_blocks_navbar_links id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_navbar_links ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_navbar_links_id_seq'::regclass);


--
-- Name: _pages_v_blocks_properties id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_properties ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_properties_id_seq'::regclass);


--
-- Name: _pages_v_blocks_property_features id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_property_features ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_property_features_id_seq'::regclass);


--
-- Name: _pages_v_blocks_testimonials id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_testimonials ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_testimonials_id_seq'::regclass);


--
-- Name: _pages_v_blocks_vision id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_vision_id_seq'::regclass);


--
-- Name: _pages_v_blocks_vision_items id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision_items ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_vision_items_id_seq'::regclass);


--
-- Name: _pages_v_blocks_vision_mission id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_vision_mission_id_seq'::regclass);


--
-- Name: _pages_v_blocks_vision_mission_stats id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission_stats ALTER COLUMN id SET DEFAULT nextval('public._pages_v_blocks_vision_mission_stats_id_seq'::regclass);


--
-- Name: _pages_v_rels id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels ALTER COLUMN id SET DEFAULT nextval('public._pages_v_rels_id_seq'::regclass);


--
-- Name: _pages_v_version_hero_links id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_version_hero_links ALTER COLUMN id SET DEFAULT nextval('public._pages_v_version_hero_links_id_seq'::regclass);


--
-- Name: agents id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.agents ALTER COLUMN id SET DEFAULT nextval('public.agents_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: commercial id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.commercial ALTER COLUMN id SET DEFAULT nextval('public.commercial_id_seq'::regclass);


--
-- Name: flats id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flats ALTER COLUMN id SET DEFAULT nextval('public.flats_id_seq'::regclass);


--
-- Name: footer id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.footer ALTER COLUMN id SET DEFAULT nextval('public.footer_id_seq'::regclass);


--
-- Name: footer_rels id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.footer_rels ALTER COLUMN id SET DEFAULT nextval('public.footer_rels_id_seq'::regclass);


--
-- Name: form_submissions id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.form_submissions ALTER COLUMN id SET DEFAULT nextval('public.form_submissions_id_seq'::regclass);


--
-- Name: forms id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms ALTER COLUMN id SET DEFAULT nextval('public.forms_id_seq'::regclass);


--
-- Name: header id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.header ALTER COLUMN id SET DEFAULT nextval('public.header_id_seq'::regclass);


--
-- Name: header_rels id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.header_rels ALTER COLUMN id SET DEFAULT nextval('public.header_rels_id_seq'::regclass);


--
-- Name: lands id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lands ALTER COLUMN id SET DEFAULT nextval('public.lands_id_seq'::regclass);


--
-- Name: media id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- Name: messages id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.messages ALTER COLUMN id SET DEFAULT nextval('public.messages_id_seq'::regclass);


--
-- Name: pages id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages ALTER COLUMN id SET DEFAULT nextval('public.pages_id_seq'::regclass);


--
-- Name: pages_rels id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels ALTER COLUMN id SET DEFAULT nextval('public.pages_rels_id_seq'::regclass);


--
-- Name: payload_jobs id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_jobs ALTER COLUMN id SET DEFAULT nextval('public.payload_jobs_id_seq'::regclass);


--
-- Name: payload_locked_documents id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_id_seq'::regclass);


--
-- Name: payload_locked_documents_rels id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_locked_documents_rels_id_seq'::regclass);


--
-- Name: payload_migrations id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_migrations ALTER COLUMN id SET DEFAULT nextval('public.payload_migrations_id_seq'::regclass);


--
-- Name: payload_preferences id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_preferences ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_id_seq'::regclass);


--
-- Name: payload_preferences_rels id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_preferences_rels ALTER COLUMN id SET DEFAULT nextval('public.payload_preferences_rels_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: posts_rels id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.posts_rels ALTER COLUMN id SET DEFAULT nextval('public.posts_rels_id_seq'::regclass);


--
-- Name: properties id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.properties ALTER COLUMN id SET DEFAULT nextval('public.properties_id_seq'::regclass);


--
-- Name: redirects id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.redirects ALTER COLUMN id SET DEFAULT nextval('public.redirects_id_seq'::regclass);


--
-- Name: redirects_rels id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.redirects_rels ALTER COLUMN id SET DEFAULT nextval('public.redirects_rels_id_seq'::regclass);


--
-- Name: residential_complexes id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.residential_complexes ALTER COLUMN id SET DEFAULT nextval('public.residential_complexes_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: search id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.search ALTER COLUMN id SET DEFAULT nextval('public.search_id_seq'::regclass);


--
-- Name: search_rels id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.search_rels ALTER COLUMN id SET DEFAULT nextval('public.search_rels_id_seq'::regclass);


--
-- Name: testimonials id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.testimonials ALTER COLUMN id SET DEFAULT nextval('public.testimonials_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: _pages_v; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v (id, parent_id, version_title, version_hero_type, version_hero_rich_text, version_hero_media_id, version_meta_title, version_meta_image_id, version_meta_description, version_published_at, version_slug, version_slug_lock, version_updated_at, version_created_at, version__status, created_at, updated_at, latest, autosave) FROM stdin;
16	4	FAQ	none	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "выфвфы", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	\N	\N	\N	2025-11-03 18:25:27.855+00	faq	t	2025-11-03 19:02:34.33+00	2025-11-03 18:25:19.687+00	published	2025-11-03 19:02:34.494+00	2025-11-03 19:02:34.494+00	f	f
11	4	FAQ	lowImpact	\N	\N	\N	\N	\N	2025-11-03 18:25:27.855+00	faq	t	2025-11-03 18:26:56.043+00	2025-11-03 18:25:19.687+00	published	2025-11-03 18:26:56.098+00	2025-11-03 18:26:56.098+00	f	f
9	4	\N	lowImpact	\N	\N	\N	\N	\N	\N	\N	t	2025-11-03 18:25:19.687+00	2025-11-03 18:25:19.687+00	draft	2025-11-03 18:25:19.717+00	2025-11-03 18:25:19.717+00	f	f
10	4	FAQ	lowImpact	\N	\N	\N	\N	\N	2025-11-03 18:25:27.855+00	faq	t	2025-11-03 18:26:48.277+00	2025-11-03 18:25:19.687+00	draft	2025-11-03 18:25:27.855+00	2025-11-03 18:26:48.277+00	f	t
49	4	FAQ	none	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "выфвфы", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	\N	\N	\N	2025-11-03 18:25:27.855+00	faq	t	2025-11-04 10:50:19.126+00	2025-11-03 18:25:19.687+00	draft	2025-11-04 09:12:13.709+00	2025-11-04 10:50:19.126+00	t	t
12	2	About us	lowImpact	\N	\N	\N	\N	\N	2025-11-03 18:19:17.08+00	about-us	t	2025-11-03 18:27:06.676+00	2025-11-03 18:19:07.384+00	published	2025-11-03 18:27:06.887+00	2025-11-03 18:27:06.887+00	t	f
5	2	\N	lowImpact	\N	\N	\N	\N	\N	\N	\N	t	2025-11-03 18:19:07.384+00	2025-11-03 18:19:07.384+00	draft	2025-11-03 18:19:07.42+00	2025-11-03 18:19:07.42+00	f	f
6	2	About us	lowImpact	\N	\N	\N	\N	\N	2025-11-03 18:19:17.08+00	about-us	t	2025-11-03 18:23:02.715+00	2025-11-03 18:19:07.384+00	draft	2025-11-03 18:19:17.08+00	2025-11-03 18:23:02.715+00	f	t
13	3	Contact	lowImpact	\N	\N	\N	\N	\N	2025-11-03 18:24:08.603+00	contact	t	2025-11-03 18:27:40.382+00	2025-11-03 18:24:01.196+00	published	2025-11-03 18:27:40.458+00	2025-11-03 18:27:40.458+00	t	f
7	3	\N	lowImpact	\N	\N	\N	\N	\N	\N	\N	t	2025-11-03 18:24:01.196+00	2025-11-03 18:24:01.196+00	draft	2025-11-03 18:24:01.226+00	2025-11-03 18:24:01.226+00	f	f
8	3	Contact	lowImpact	\N	\N	\N	\N	\N	2025-11-03 18:24:08.603+00	contact	t	2025-11-03 18:27:38.391+00	2025-11-03 18:24:01.196+00	draft	2025-11-03 18:24:08.603+00	2025-11-03 18:27:38.391+00	f	t
14	1	home	lowImpact	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	\N	\N	\N	2025-11-03 17:10:03.713+00	home	t	2025-11-03 18:27:57.649+00	2025-11-03 17:09:46.311+00	published	2025-11-03 18:27:57.751+00	2025-11-03 18:27:57.751+00	f	f
1	1	\N	lowImpact	\N	\N	\N	\N	\N	\N	\N	t	2025-11-03 17:09:46.311+00	2025-11-03 17:09:46.311+00	draft	2025-11-03 17:09:46.35+00	2025-11-03 17:09:46.35+00	f	f
3	1	home	lowImpact	\N	\N	\N	\N	\N	2025-11-03 17:10:03.713+00	home	t	2025-11-03 17:11:11.304+00	2025-11-03 17:09:46.311+00	published	2025-11-03 17:11:11.359+00	2025-11-03 17:11:11.359+00	f	f
2	1	home	lowImpact	\N	\N	\N	\N	\N	2025-11-03 17:10:03.713+00	home	t	2025-11-03 17:11:08.79+00	2025-11-03 17:09:46.311+00	draft	2025-11-03 17:10:03.355+00	2025-11-03 17:11:08.79+00	f	t
15	4	FAQ	none	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "выфвфы", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	\N	\N	\N	2025-11-03 18:25:27.855+00	faq	t	2025-11-03 19:02:30.979+00	2025-11-03 18:25:19.687+00	draft	2025-11-03 19:01:06.621+00	2025-11-03 19:02:30.979+00	f	t
4	1	home	lowImpact	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	\N	\N	\N	2025-11-03 17:10:03.713+00	home	t	2025-11-03 18:27:56.242+00	2025-11-03 17:09:46.311+00	draft	2025-11-03 18:00:41.483+00	2025-11-03 18:27:56.242+00	f	t
48	1	home	lowImpact	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	\N	\N	\N	2025-11-03 17:10:03.713+00	home	t	2025-11-04 11:20:21.055+00	2025-11-03 17:09:46.311+00	draft	2025-11-04 00:56:43.325+00	2025-11-04 11:20:21.055+00	f	t
50	1	home	lowImpact	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	\N	\N	\N	2025-11-03 17:10:03.713+00	home	t	2025-11-04 11:20:50.865+00	2025-11-03 17:09:46.311+00	published	2025-11-04 11:20:50.956+00	2025-11-04 11:20:50.956+00	f	f
51	1	home	lowImpact	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	\N	\N	\N	2025-11-03 17:10:03.713+00	home	t	2025-11-04 13:33:27.686+00	2025-11-03 17:09:46.311+00	draft	2025-11-04 13:33:19.447+00	2025-11-04 13:33:27.686+00	t	t
\.


--
-- Data for Name: _pages_v_blocks_about_hero; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_about_hero (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
1	6	version.layout	15	about-hero	About us	Connect with our experts and bring your Real Estate ideas to life	6908f234eb4cd9132e66743d	\N
1	12	version.layout	16	about-hero	About us	Connect with our experts and bring your Real Estate ideas to life	6908f234eb4cd9132e66743d	\N
\.


--
-- Data for Name: _pages_v_blocks_about_hero_images; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_about_hero_images (_order, _parent_id, id, image_id, _uuid) FROM stdin;
1	15	34	4	6908f239eb4cd9132e66743f
2	15	35	5	6908f244eb4cd9132e667441
3	15	36	6	6908f254853ee60a32203a29
1	16	37	4	6908f239eb4cd9132e66743f
2	16	38	5	6908f244eb4cd9132e667441
3	16	39	6	6908f254853ee60a32203a29
\.


--
-- Data for Name: _pages_v_blocks_agents; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_agents (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
4	6	version.layout	5	agents	Agents	Meet our exceptional agents for a seamless experience	6908f29d1c57284fa7aa670d	\N
4	12	version.layout	6	agents	Agents	Meet our exceptional agents for a seamless experience	6908f29d1c57284fa7aa670d	\N
\.


--
-- Data for Name: _pages_v_blocks_amenities; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_amenities (_order, _parent_id, _path, id, block_type, label, title, image_id, _uuid, block_name) FROM stdin;
3	6	version.layout	7	amenities	Amenities	Discover exceptional amenities for a luxurious lifestyle	7	6908f27a853ee60a32203a2d	\N
3	12	version.layout	8	amenities	Amenities	Discover exceptional amenities for a luxurious lifestyle	7	6908f27a853ee60a32203a2d	\N
\.


--
-- Data for Name: _pages_v_blocks_amenities_amenities; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_amenities_amenities (_order, _parent_id, id, icon, title, _uuid) FROM stdin;
1	7	25	clean	Cleanliness strictly	6908f27aed87e9514861c392
2	7	26	wifi	High speed Network	6908f27aed87e9514861c393
3	7	27	shield	Full time security & work	6908f27aed87e9514861c394
4	7	28	gym	Gym and Store	6908f27aed87e9514861c395
1	8	29	clean	Cleanliness strictly	6908f27aed87e9514861c392
2	8	30	wifi	High speed Network	6908f27aed87e9514861c393
3	8	31	shield	Full time security & work	6908f27aed87e9514861c394
4	8	32	gym	Gym and Store	6908f27aed87e9514861c395
\.


--
-- Data for Name: _pages_v_blocks_archive; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_archive (_order, _parent_id, _path, id, intro_content, populate_by, relation_to, "limit", _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_blog; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_blog (_order, _parent_id, _path, id, block_type, title, subtitle, show_all_link, items_per_page, _uuid, block_name) FROM stdin;
7	4	version.layout	3	blog	Expert advice and market updates on real estate	Blogs	/posts	3	6908f1b1a2c07dc568cbbedc	\N
7	14	version.layout	4	blog	Expert advice and market updates on real estate	Blogs	/posts	3	6908f1b1a2c07dc568cbbedc	\N
7	48	version.layout	25	blog	Expert advice and market updates on real estate	Blogs	/posts	3	6908f1b1a2c07dc568cbbedc	\N
7	50	version.layout	26	blog	Expert advice and market updates on real estate	Blogs	/posts	3	6908f1b1a2c07dc568cbbedc	\N
7	51	version.layout	28	blog	Expert advice and market updates on real estate	Blogs	/posts	3	6908f1b1a2c07dc568cbbedc	\N
\.


--
-- Data for Name: _pages_v_blocks_call_to_action_new; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_call_to_action_new (_order, _parent_id, _path, id, block_type, label, title, button_text, button_link, _uuid, block_name) FROM stdin;
6	6	version.layout	1	call-to-action-new	Want to Book a Call?	Ready to make your step in real estate? Book Now.	View Properties	/properties	6908f3060bd739ef981d8226	\N
6	12	version.layout	3	call-to-action-new	Want to Book a Call?	Ready to make your step in real estate? Book Now.	View Properties	/properties	6908f3060bd739ef981d8226	\N
4	8	version.layout	5	call-to-action-new	Want to Book a Call?	Ready to make your step in real estate? Book Now.	View Properties	/properties	6908f380f46d0f22ede23b55	\N
4	13	version.layout	6	call-to-action-new	Want to Book a Call?	Ready to make your step in real estate? Book Now.	View Properties	/properties	6908f380f46d0f22ede23b55	\N
\.


--
-- Data for Name: _pages_v_blocks_contact_hero; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_contact_hero (_order, _parent_id, _path, id, block_type, label, title, image_id, email, phone, location, _uuid, block_name) FROM stdin;
1	8	version.layout	7	contact-hero	Contact	Get in touch with us today for expert assistance	9	testing@gmail.com	+ 123 45 67 89	Doha, Qatar	6908f34b0bd739ef981d8228	\N
1	13	version.layout	8	contact-hero	Contact	Get in touch with us today for expert assistance	9	testing@gmail.com	+ 123 45 67 89	Doha, Qatar	6908f34b0bd739ef981d8228	\N
\.


--
-- Data for Name: _pages_v_blocks_contact_us_form; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_contact_us_form (_order, _parent_id, _path, id, block_type, label, title, form_id, _uuid, block_name) FROM stdin;
2	8	version.layout	5	contact-us-form	Contact	Fill out this form, Let's get in touch	1	6908f36af46d0f22ede23b51	\N
2	13	version.layout	6	contact-us-form	Contact	Fill out this form, Let's get in touch	1	6908f36af46d0f22ede23b51	\N
\.


--
-- Data for Name: _pages_v_blocks_content; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_content (_order, _parent_id, _path, id, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_content_columns; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_content_columns (_order, _parent_id, id, size, rich_text, enable_link, link_type, link_new_tab, link_url, link_label, link_appearance, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_cta; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_cta (_order, _parent_id, _path, id, rich_text, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_cta_links; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_cta_links (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label, link_appearance, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_faq; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_faq (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
1	10	version.layout	1	faq	faq	Your questions, Answered	6908f3e87515fa9d954c0939	\N
1	11	version.layout	2	faq	faq	Your questions, Answered	6908f3e87515fa9d954c0939	\N
1	15	version.layout	19	faq	faq	Your questions, Answered	6908f3e87515fa9d954c0939	\N
1	16	version.layout	20	faq	faq	Your questions, Answered	6908f3e87515fa9d954c0939	\N
1	49	version.layout	53	faq	faq	Your questions, Answered	6908f3e87515fa9d954c0939	\N
\.


--
-- Data for Name: _pages_v_blocks_faq_items; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_faq_items (_order, _parent_id, id, question, answer, _uuid) FROM stdin;
1	1	1	What is the first step in buying a home?	The first step in buying a home is typically getting pre-approved for a mortgage. This helps you understand your budget and shows sellers you're a serious buyer.	6908f3e8ed87e9514861c39a
2	1	2	How much should I save for a down payment?	The traditional down payment is 20% of the purchase price, but many loan programs allow for lower down payments, some as low as 3.5% for FHA loans.	6908f3e8ed87e9514861c39b
3	1	3	What is a seller's market?	A seller's market occurs when there are more buyers than available homes, leading to higher prices and competition among buyers.	6908f3e8ed87e9514861c39c
4	1	4	How long does it take to close on a house?	The closing process typically takes 30-45 days from contract to closing, but can vary depending on the type of loan and other factors.	6908f3e8ed87e9514861c39d
5	1	5	What is a home inspection?	A home inspection is a detailed examination of a property's condition, including structure, systems, and components, performed by a professional inspector.	6908f3e8ed87e9514861c39e
6	1	6	How do I determine my home's value?	Your home's value can be determined through a professional appraisal, comparative market analysis (CMA), or online valuation tools.	6908f3e8ed87e9514861c39f
7	1	7	Should I rent or buy a home?	This decision depends on various factors including your financial situation, long-term plans, local market conditions, and lifestyle preferences.	6908f3e8ed87e9514861c3a0
8	1	8	What is an HOA?	An HOA (Homeowners Association) is an organization that makes and enforces rules for properties and common areas in planned communities.	6908f3e8ed87e9514861c3a1
1	2	9	What is the first step in buying a home?	The first step in buying a home is typically getting pre-approved for a mortgage. This helps you understand your budget and shows sellers you're a serious buyer.	6908f3e8ed87e9514861c39a
2	2	10	How much should I save for a down payment?	The traditional down payment is 20% of the purchase price, but many loan programs allow for lower down payments, some as low as 3.5% for FHA loans.	6908f3e8ed87e9514861c39b
3	2	11	What is a seller's market?	A seller's market occurs when there are more buyers than available homes, leading to higher prices and competition among buyers.	6908f3e8ed87e9514861c39c
4	2	12	How long does it take to close on a house?	The closing process typically takes 30-45 days from contract to closing, but can vary depending on the type of loan and other factors.	6908f3e8ed87e9514861c39d
5	2	13	What is a home inspection?	A home inspection is a detailed examination of a property's condition, including structure, systems, and components, performed by a professional inspector.	6908f3e8ed87e9514861c39e
6	2	14	How do I determine my home's value?	Your home's value can be determined through a professional appraisal, comparative market analysis (CMA), or online valuation tools.	6908f3e8ed87e9514861c39f
7	2	15	Should I rent or buy a home?	This decision depends on various factors including your financial situation, long-term plans, local market conditions, and lifestyle preferences.	6908f3e8ed87e9514861c3a0
8	2	16	What is an HOA?	An HOA (Homeowners Association) is an organization that makes and enforces rules for properties and common areas in planned communities.	6908f3e8ed87e9514861c3a1
1	19	145	What is the first step in buying a home?	The first step in buying a home is typically getting pre-approved for a mortgage. This helps you understand your budget and shows sellers you're a serious buyer.	6908f3e8ed87e9514861c39a
2	19	146	How much should I save for a down payment?	The traditional down payment is 20% of the purchase price, but many loan programs allow for lower down payments, some as low as 3.5% for FHA loans.	6908f3e8ed87e9514861c39b
3	19	147	What is a seller's market?	A seller's market occurs when there are more buyers than available homes, leading to higher prices and competition among buyers.	6908f3e8ed87e9514861c39c
4	19	148	How long does it take to close on a house?	The closing process typically takes 30-45 days from contract to closing, but can vary depending on the type of loan and other factors.	6908f3e8ed87e9514861c39d
5	19	149	What is a home inspection?	A home inspection is a detailed examination of a property's condition, including structure, systems, and components, performed by a professional inspector.	6908f3e8ed87e9514861c39e
6	19	150	How do I determine my home's value?	Your home's value can be determined through a professional appraisal, comparative market analysis (CMA), or online valuation tools.	6908f3e8ed87e9514861c39f
7	19	151	Should I rent or buy a home?	This decision depends on various factors including your financial situation, long-term plans, local market conditions, and lifestyle preferences.	6908f3e8ed87e9514861c3a0
8	19	152	What is an HOA?	An HOA (Homeowners Association) is an organization that makes and enforces rules for properties and common areas in planned communities.	6908f3e8ed87e9514861c3a1
1	20	153	What is the first step in buying a home?	The first step in buying a home is typically getting pre-approved for a mortgage. This helps you understand your budget and shows sellers you're a serious buyer.	6908f3e8ed87e9514861c39a
2	20	154	How much should I save for a down payment?	The traditional down payment is 20% of the purchase price, but many loan programs allow for lower down payments, some as low as 3.5% for FHA loans.	6908f3e8ed87e9514861c39b
3	20	155	What is a seller's market?	A seller's market occurs when there are more buyers than available homes, leading to higher prices and competition among buyers.	6908f3e8ed87e9514861c39c
4	20	156	How long does it take to close on a house?	The closing process typically takes 30-45 days from contract to closing, but can vary depending on the type of loan and other factors.	6908f3e8ed87e9514861c39d
5	20	157	What is a home inspection?	A home inspection is a detailed examination of a property's condition, including structure, systems, and components, performed by a professional inspector.	6908f3e8ed87e9514861c39e
6	20	158	How do I determine my home's value?	Your home's value can be determined through a professional appraisal, comparative market analysis (CMA), or online valuation tools.	6908f3e8ed87e9514861c39f
7	20	159	Should I rent or buy a home?	This decision depends on various factors including your financial situation, long-term plans, local market conditions, and lifestyle preferences.	6908f3e8ed87e9514861c3a0
8	20	160	What is an HOA?	An HOA (Homeowners Association) is an organization that makes and enforces rules for properties and common areas in planned communities.	6908f3e8ed87e9514861c3a1
1	53	318	What is the first step in buying a home?	The first step in buying a home is typically getting pre-approved for a mortgage. This helps you understand your budget and shows sellers you're a serious buyer.	6908f3e8ed87e9514861c39a
2	53	319	How much should I save for a down payment?	The traditional down payment is 20% of the purchase price, but many loan programs allow for lower down payments, some as low as 3.5% for FHA loans.	6908f3e8ed87e9514861c39b
3	53	320	What is a seller's market?	A seller's market occurs when there are more buyers than available homes, leading to higher prices and competition among buyers.	6908f3e8ed87e9514861c39c
4	53	321	How long does it take to close on a house?	The closing process typically takes 30-45 days from contract to closing, but can vary depending on the type of loan and other factors.	6908f3e8ed87e9514861c39d
5	53	322	What is a home inspection?	A home inspection is a detailed examination of a property's condition, including structure, systems, and components, performed by a professional inspector.	6908f3e8ed87e9514861c39e
6	53	323	How do I determine my home's value?	Your home's value can be determined through a professional appraisal, comparative market analysis (CMA), or online valuation tools.	6908f3e8ed87e9514861c39f
7	53	324	Should I rent or buy a home?	This decision depends on various factors including your financial situation, long-term plans, local market conditions, and lifestyle preferences.	6908f3e8ed87e9514861c3a0
8	53	325	What is an HOA?	An HOA (Homeowners Association) is an organization that makes and enforces rules for properties and common areas in planned communities.	6908f3e8ed87e9514861c3a1
\.


--
-- Data for Name: _pages_v_blocks_feature; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_feature (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
4	4	version.layout	36	feature	 Features	Discover the advantages and exclusive benefits	6908f0eb13f1b4599131f65d	\N
4	14	version.layout	37	feature	 Features	Discover the advantages and exclusive benefits	6908f0eb13f1b4599131f65d	\N
4	48	version.layout	58	feature	 Features	Discover the advantages and exclusive benefits	6908f0eb13f1b4599131f65d	\N
4	50	version.layout	59	feature	 Features	Discover the advantages and exclusive benefits	6908f0eb13f1b4599131f65d	\N
4	51	version.layout	61	feature	 Features	Discover the advantages and exclusive benefits	6908f0eb13f1b4599131f65d	\N
\.


--
-- Data for Name: _pages_v_blocks_feature_features; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_feature_features (_order, _parent_id, id, icon, title, description, _uuid) FROM stdin;
1	36	77	home	Expert Guidance	Receive professional insights to make informed real estate decisions confidently.	6908f0f413f1b4599131f65f
2	36	78	user-check	Tailored Solutions	We customize property options based on your specific needs and preferences.	6908f10613f1b4599131f661
3	36	79	shield-check	Market Expertise	Leverage our deep understanding of market trends for smart investments.	6908f11113f1b4599131f663
1	37	80	home	Expert Guidance	Receive professional insights to make informed real estate decisions confidently.	6908f0f413f1b4599131f65f
2	37	81	user-check	Tailored Solutions	We customize property options based on your specific needs and preferences.	6908f10613f1b4599131f661
3	37	82	shield-check	Market Expertise	Leverage our deep understanding of market trends for smart investments.	6908f11113f1b4599131f663
1	58	143	home	Expert Guidance	Receive professional insights to make informed real estate decisions confidently.	6908f0f413f1b4599131f65f
2	58	144	user-check	Tailored Solutions	We customize property options based on your specific needs and preferences.	6908f10613f1b4599131f661
3	58	145	shield-check	Market Expertise	Leverage our deep understanding of market trends for smart investments.	6908f11113f1b4599131f663
1	59	146	home	Expert Guidance	Receive professional insights to make informed real estate decisions confidently.	6908f0f413f1b4599131f65f
2	59	147	user-check	Tailored Solutions	We customize property options based on your specific needs and preferences.	6908f10613f1b4599131f661
3	59	148	shield-check	Market Expertise	Leverage our deep understanding of market trends for smart investments.	6908f11113f1b4599131f663
1	61	152	home	Expert Guidance	Receive professional insights to make informed real estate decisions confidently.	6908f0f413f1b4599131f65f
2	61	153	user-check	Tailored Solutions	We customize property options based on your specific needs and preferences.	6908f10613f1b4599131f661
3	61	154	shield-check	Market Expertise	Leverage our deep understanding of market trends for smart investments.	6908f11113f1b4599131f663
\.


--
-- Data for Name: _pages_v_blocks_form_block; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_form_block (_order, _parent_id, _path, id, form_id, enable_intro, intro_content, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_hero; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_hero (_order, _parent_id, _path, id, badge_text, headline, highlight, subheadline, image_id, _uuid, block_name) FROM stdin;
1	2	version.layout	7	"Real Estate	Инвестиции в дома из соломы в 	Кареллии	dsadad	1	6908e20d634f99126dd98d1d	\N
1	3	version.layout	8	"Real Estate	Инвестиции в дома из соломы в 	Кареллии	dsadad	1	6908e20d634f99126dd98d1d	\N
1	4	version.layout	90	Real Estate	Find the home that fits your life	perfectly		1	6908e20d634f99126dd98d1d	\N
1	14	version.layout	91	Real Estate	Find the home that fits your life	perfectly		1	6908e20d634f99126dd98d1d	\N
1	48	version.layout	112	Real Estate	Find the home that fits your life	perfectly		1	6908e20d634f99126dd98d1d	\N
1	50	version.layout	113	Real Estate	Find the home that fits your life	perfectly		1	6908e20d634f99126dd98d1d	\N
1	51	version.layout	115	Real Estate	Find the home that fits your life	perfectly		13	6908e20d634f99126dd98d1d	\N
\.


--
-- Data for Name: _pages_v_blocks_house_filter; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_house_filter (_order, _parent_id, _path, id, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_house_filter_filters; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_house_filter_filters (_order, _parent_id, id, label, collection, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_house_filter_filters_fields; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_house_filter_filters_fields (_order, _parent_id, id, name, label, type, min, max, step, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_house_filter_filters_fields_options; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_house_filter_filters_fields_options (_order, _parent_id, id, value, label, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_how_it_works; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_how_it_works (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
5	4	version.layout	15	how-it-works	How it works	Discover the advantages and exclusive benefits	6908f13913f1b4599131f667	\N
5	14	version.layout	16	how-it-works	How it works	Discover the advantages and exclusive benefits	6908f13913f1b4599131f667	\N
5	48	version.layout	37	how-it-works	How it works	Discover the advantages and exclusive benefits	6908f13913f1b4599131f667	\N
5	50	version.layout	38	how-it-works	How it works	Discover the advantages and exclusive benefits	6908f13913f1b4599131f667	\N
5	51	version.layout	40	how-it-works	How it works	Discover the advantages and exclusive benefits	6908f13913f1b4599131f667	\N
\.


--
-- Data for Name: _pages_v_blocks_how_it_works_steps; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_how_it_works_steps (_order, _parent_id, id, icon, title, description, _uuid) FROM stdin;
1	37	97	1	Find Your Ideal Property	Browse our extensive listings, filter by location, price, and features to discover your perfect home	6908f14213f1b4599131f669
2	37	98	1	Schedule a Viewing	Easily book a property tour online at a time that suits you, or request a virtual walkthrough	6908f14d13f1b4599131f66b
3	37	99	1	Secure Your Deal	Make an offer or apply for financing through our website, and let our experts guide you	6908f15713f1b4599131f66d
1	38	100	1	Find Your Ideal Property	Browse our extensive listings, filter by location, price, and features to discover your perfect home	6908f14213f1b4599131f669
2	38	101	1	Schedule a Viewing	Easily book a property tour online at a time that suits you, or request a virtual walkthrough	6908f14d13f1b4599131f66b
3	38	102	1	Secure Your Deal	Make an offer or apply for financing through our website, and let our experts guide you	6908f15713f1b4599131f66d
1	40	106	1	Find Your Ideal Property	Browse our extensive listings, filter by location, price, and features to discover your perfect home	6908f14213f1b4599131f669
2	40	107	1	Schedule a Viewing	Easily book a property tour online at a time that suits you, or request a virtual walkthrough	6908f14d13f1b4599131f66b
3	40	108	1	Secure Your Deal	Make an offer or apply for financing through our website, and let our experts guide you	6908f15713f1b4599131f66d
1	15	31	1	Find Your Ideal Property	Browse our extensive listings, filter by location, price, and features to discover your perfect home	6908f14213f1b4599131f669
2	15	32	1	Schedule a Viewing	Easily book a property tour online at a time that suits you, or request a virtual walkthrough	6908f14d13f1b4599131f66b
3	15	33	1	Secure Your Deal	Make an offer or apply for financing through our website, and let our experts guide you	6908f15713f1b4599131f66d
1	16	34	1	Find Your Ideal Property	Browse our extensive listings, filter by location, price, and features to discover your perfect home	6908f14213f1b4599131f669
2	16	35	1	Schedule a Viewing	Easily book a property tour online at a time that suits you, or request a virtual walkthrough	6908f14d13f1b4599131f66b
3	16	36	1	Secure Your Deal	Make an offer or apply for financing through our website, and let our experts guide you	6908f15713f1b4599131f66d
\.


--
-- Data for Name: _pages_v_blocks_map; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_map (_order, _parent_id, _path, id, block_type, title, center_lat, center_lng, center_zoom, auto_load, "limit", _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_media_block; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_media_block (_order, _parent_id, _path, id, media_id, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_navbar; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_navbar (_order, _parent_id, _path, id, logo_text, button_text, button_url, avatar_id, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_navbar_links; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_navbar_links (_order, _parent_id, id, text, url, _uuid) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_properties; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_properties (_order, _parent_id, _path, id, block_type, title, show_all_link, layout, items_per_page, enable_filters, filters_price_range, filters_property_type, filters_bedrooms, filters_bathrooms, filters_area, _uuid, block_name) FROM stdin;
3	48	version.layout	84	properties	Ready to buy your dream home? find it here	/properties	grid	6	t	t	t	t	t	t	6909dac29e05e16586bbd335	\N
3	50	version.layout	85	properties	Ready to buy your dream home? find it here	/properties	grid	6	t	t	t	t	t	t	6909dac29e05e16586bbd335	\N
3	51	version.layout	87	properties	Ready to buy your dream home? find it here	/properties	grid	6	t	t	t	t	t	t	6909dac29e05e16586bbd335	\N
3	4	version.layout	48	properties	 Properties	/properties	grid	6	f	t	t	t	t	t	6908f07ff867cf36b9a3e5f0	\N
3	14	version.layout	49	properties	 Properties	/properties	grid	6	f	t	t	t	t	t	6908f07ff867cf36b9a3e5f0	\N
\.


--
-- Data for Name: _pages_v_blocks_property_features; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_property_features (_order, _parent_id, _path, id, block_type, property_id, _uuid, block_name) FROM stdin;
\.


--
-- Data for Name: _pages_v_blocks_testimonials; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_testimonials (_order, _parent_id, _path, id, block_type, label, title, _uuid, block_name) FROM stdin;
5	6	version.layout	7	testimonials	Testimonials	Real feedback from our satisfied clients	6908f2f10bd739ef981d8224	\N
5	12	version.layout	10	testimonials	Testimonials	Real feedback from our satisfied clients	6908f2f10bd739ef981d8224	\N
3	8	version.layout	12	testimonials	Testimonials	Real feedback from our satisfied clients	6908f374f46d0f22ede23b53	\N
3	13	version.layout	13	testimonials	Testimonials	Real feedback from our satisfied clients	6908f374f46d0f22ede23b53	\N
6	4	version.layout	14	testimonials	Testimonials	Real feedback from our satisfied clients	6908f17b13f1b4599131f66f	\N
6	14	version.layout	15	testimonials	Testimonials	Real feedback from our satisfied clients	6908f17b13f1b4599131f66f	\N
6	48	version.layout	36	testimonials	Testimonials	Real feedback from our satisfied clients	6908f17b13f1b4599131f66f	\N
6	50	version.layout	37	testimonials	Testimonials	Real feedback from our satisfied clients	6908f17b13f1b4599131f66f	\N
6	51	version.layout	39	testimonials	Testimonials	Real feedback from our satisfied clients	6908f17b13f1b4599131f66f	\N
\.


--
-- Data for Name: _pages_v_blocks_vision; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_vision (_order, _parent_id, _path, id, title, subtitle, button_text, button_link, _uuid, block_name) FROM stdin;
2	4	version.layout	81	The values that drive everything we do	 Our Vision	Learn more	dsad	6908ef5f25b9e0233affebcd	\N
2	14	version.layout	82	The values that drive everything we do	 Our Vision	Learn more	dsad	6908ef5f25b9e0233affebcd	\N
2	48	version.layout	103	The values that drive everything we do	 Our Vision	Learn more	dsad	6908ef5f25b9e0233affebcd	\N
2	50	version.layout	104	The values that drive everything we do	 Our Vision	Learn more	dsad	6908ef5f25b9e0233affebcd	\N
2	51	version.layout	106	The values that drive everything we do	 Our Vision	Learn more	dsad	6908ef5f25b9e0233affebcd	\N
\.


--
-- Data for Name: _pages_v_blocks_vision_items; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_vision_items (_order, _parent_id, id, icon, title, description, _uuid) FROM stdin;
1	81	187	 ✉	Dream Home	Discover your ideal living space with our premium featured real estate listings.	6908ef7b25b9e0233affebcf
2	81	188	 ✉	Smart Investment	Secure high-value, future-ready property and investment opportunities today.	6908f05bf867cf36b9a3e5ec
3	81	189	 ✉	Luxury Living	Explore exclusive, sophisticated properties tailored to your perfect lifestyle.	6908f05ef867cf36b9a3e5ee
1	82	190	 ✉	Dream Home	Discover your ideal living space with our premium featured real estate listings.	6908ef7b25b9e0233affebcf
2	82	191	 ✉	Smart Investment	Secure high-value, future-ready property and investment opportunities today.	6908f05bf867cf36b9a3e5ec
3	82	192	 ✉	Luxury Living	Explore exclusive, sophisticated properties tailored to your perfect lifestyle.	6908f05ef867cf36b9a3e5ee
1	103	253	 ✉	Dream Home	Discover your ideal living space with our premium featured real estate listings.	6908ef7b25b9e0233affebcf
2	103	254	 ✉	Smart Investment	Secure high-value, future-ready property and investment opportunities today.	6908f05bf867cf36b9a3e5ec
3	103	255	 ✉	Luxury Living	Explore exclusive, sophisticated properties tailored to your perfect lifestyle.	6908f05ef867cf36b9a3e5ee
1	104	256	 ✉	Dream Home	Discover your ideal living space with our premium featured real estate listings.	6908ef7b25b9e0233affebcf
2	104	257	 ✉	Smart Investment	Secure high-value, future-ready property and investment opportunities today.	6908f05bf867cf36b9a3e5ec
3	104	258	 ✉	Luxury Living	Explore exclusive, sophisticated properties tailored to your perfect lifestyle.	6908f05ef867cf36b9a3e5ee
1	106	262	 ✉	Dream Home	Discover your ideal living space with our premium featured real estate listings.	6908ef7b25b9e0233affebcf
2	106	263	 ✉	Smart Investment	Secure high-value, future-ready property and investment opportunities today.	6908f05bf867cf36b9a3e5ec
3	106	264	 ✉	Luxury Living	Explore exclusive, sophisticated properties tailored to your perfect lifestyle.	6908f05ef867cf36b9a3e5ee
\.


--
-- Data for Name: _pages_v_blocks_vision_mission; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_vision_mission (_order, _parent_id, _path, id, block_type, title, description, button_text, button_link, _uuid, block_name) FROM stdin;
2	6	version.layout	8	vision-mission	Your trusted real estate experts:	With years of local expertise, we're committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client's unique needs are met with professionalism and care.	View Properties	/properties	6908f263853ee60a32203a2b	\N
2	12	version.layout	9	vision-mission	Your trusted real estate experts:	With years of local expertise, we're committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client's unique needs are met with professionalism and care.	View Properties	/properties	6908f263853ee60a32203a2b	\N
\.


--
-- Data for Name: _pages_v_blocks_vision_mission_stats; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_blocks_vision_mission_stats (_order, _parent_id, id, value, label, _uuid) FROM stdin;
1	8	29	98%	Satisfaction rate	6908f263ed87e9514861c38a
2	8	30	200+	Properties sold	6908f263ed87e9514861c38b
3	8	31	500+	Project done	6908f263ed87e9514861c38c
4	8	32	90%	Happy Clients	6908f263ed87e9514861c38d
1	9	33	98%	Satisfaction rate	6908f263ed87e9514861c38a
2	9	34	200+	Properties sold	6908f263ed87e9514861c38b
3	9	35	500+	Project done	6908f263ed87e9514861c38c
4	9	36	90%	Happy Clients	6908f263ed87e9514861c38d
\.


--
-- Data for Name: _pages_v_rels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_rels (id, "order", parent_id, path, pages_id, posts_id, categories_id, properties_id, agents_id, testimonials_id, commercial_id, flats_id, lands_id, residential_complexes_id) FROM stdin;
165	1	48	version.layout.4.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
166	1	48	version.layout.5.posts	\N	1	\N	\N	\N	\N	\N	\N	\N	\N
167	1	48	version.layout.6.properties	\N	\N	\N	\N	\N	\N	\N	1	\N	\N
168	1	48	version.layout.1.properties	\N	\N	\N	\N	\N	\N	\N	1	\N	\N
186	1	48	version.layout.2.properties	\N	\N	\N	\N	\N	\N	\N	1	\N	\N
187	2	48	version.layout.2.properties	\N	\N	\N	\N	\N	\N	\N	2	\N	\N
188	1	48	version.layout.5.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
189	1	48	version.layout.6.posts	\N	1	\N	\N	\N	\N	\N	\N	\N	\N
190	2	48	version.layout.6.posts	\N	2	\N	\N	\N	\N	\N	\N	\N	\N
191	3	48	version.layout.6.posts	\N	3	\N	\N	\N	\N	\N	\N	\N	\N
192	1	50	version.layout.2.properties	\N	\N	\N	\N	\N	\N	\N	1	\N	\N
193	2	50	version.layout.2.properties	\N	\N	\N	\N	\N	\N	\N	2	\N	\N
194	1	50	version.layout.5.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
195	1	50	version.layout.6.posts	\N	1	\N	\N	\N	\N	\N	\N	\N	\N
196	2	50	version.layout.6.posts	\N	2	\N	\N	\N	\N	\N	\N	\N	\N
197	3	50	version.layout.6.posts	\N	3	\N	\N	\N	\N	\N	\N	\N	\N
44	1	6	version.layout.3.agents	\N	\N	\N	\N	1	\N	\N	\N	\N	\N
45	1	6	version.layout.4.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
46	1	12	version.layout.3.agents	\N	\N	\N	\N	1	\N	\N	\N	\N	\N
47	1	12	version.layout.4.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
48	1	8	version.layout.2.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
49	1	13	version.layout.2.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
50	1	4	version.layout.2.properties	\N	\N	\N	1	\N	\N	\N	\N	\N	\N
51	1	4	version.layout.5.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
52	1	4	version.layout.6.posts	\N	1	\N	\N	\N	\N	\N	\N	\N	\N
53	1	14	version.layout.2.properties	\N	\N	\N	1	\N	\N	\N	\N	\N	\N
54	1	14	version.layout.5.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
55	1	14	version.layout.6.posts	\N	1	\N	\N	\N	\N	\N	\N	\N	\N
204	1	51	version.layout.2.properties	\N	\N	\N	\N	\N	\N	\N	1	\N	\N
205	2	51	version.layout.2.properties	\N	\N	\N	\N	\N	\N	\N	2	\N	\N
206	1	51	version.layout.5.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
207	1	51	version.layout.6.posts	\N	1	\N	\N	\N	\N	\N	\N	\N	\N
208	2	51	version.layout.6.posts	\N	2	\N	\N	\N	\N	\N	\N	\N	\N
209	3	51	version.layout.6.posts	\N	3	\N	\N	\N	\N	\N	\N	\N	\N
68	\N	15	version.hero.links.0.link.reference	1	\N	\N	\N	\N	\N	\N	\N	\N	\N
69	\N	15	version.hero.links.1.link.reference	2	\N	\N	\N	\N	\N	\N	\N	\N	\N
70	\N	16	version.hero.links.0.link.reference	1	\N	\N	\N	\N	\N	\N	\N	\N	\N
71	\N	16	version.hero.links.1.link.reference	2	\N	\N	\N	\N	\N	\N	\N	\N	\N
145	1	49	version.layout.0.properties	\N	\N	\N	\N	\N	\N	\N	1	\N	\N
146	\N	49	version.hero.links.0.link.reference	1	\N	\N	\N	\N	\N	\N	\N	\N	\N
147	\N	49	version.hero.links.1.link.reference	2	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: _pages_v_version_hero_links; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public._pages_v_version_hero_links (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label, link_appearance, _uuid) FROM stdin;
1	15	15	reference	t	\N	home	outline	6908fc0b7515fa9d954c093b
2	15	16	reference	t	\N	dasd	outline	6908fc3d7515fa9d954c093d
1	16	17	reference	t	\N	home	outline	6908fc0b7515fa9d954c093b
2	16	18	reference	t	\N	dasd	outline	6908fc3d7515fa9d954c093d
1	49	68	reference	t	\N	home	outline	6908fc0b7515fa9d954c093b
2	49	69	reference	t	\N	dasd	outline	6908fc3d7515fa9d954c093d
\.


--
-- Data for Name: agents; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.agents (id, name, "position", image_id, email, phone, description, updated_at, created_at) FROM stdin;
1	dsada	dasd	8	test@gmail.com	 +1 (555) 432-1876	Ethan Carter is a seasoned real estate consultant with a strong track record in helping clients find their dream homes and investment properties. Known for his exceptional negotiation skills and in-depth market knowledge, he prides himself on delivering personalized solutions. \n\nEthan's approach focuses on building lasting relationships with his clients, ensuring long-term satisfaction.	2025-11-03 18:22:21.236+00	2025-11-03 18:22:21.236+00
\.


--
-- Data for Name: agents_social_links; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.agents_social_links (_order, _parent_id, id, platform, url) FROM stdin;
1	1	6908f2d71c57284fa7aa670f	twitter	dasd
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.categories (id, title, slug, slug_lock, parent_id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: categories_breadcrumbs; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.categories_breadcrumbs (_order, _parent_id, id, doc_id, url, label) FROM stdin;
\.


--
-- Data for Name: commercial; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.commercial (id, title, slug, commercial_type, transaction_type, location_city, location_district, location_address, location_highway, coordinates_lat, coordinates_lng, coordinates_formatted_address, area_total, area_usable, area_land, price, price_type, currency, floor, ceiling_height, entrance_type, condition, description, contact_info_contact_person, contact_info_phone, contact_info_email, status, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: commercial_images; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.commercial_images (_order, _parent_id, id, image_id) FROM stdin;
\.


--
-- Data for Name: commercial_utilities; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.commercial_utilities (_order, _parent_id, id, utility) FROM stdin;
\.


--
-- Data for Name: flats; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.flats (id, title, slug, realtor_id, property_category, transaction_type, location_city, location_district, location_address, location_metro, location_metro_time, coordinates_lat, coordinates_lng, coordinates_formatted_address, rooms, area_total, area_living, area_kitchen, floor_info_floor, floor_info_total_floors, price, currency, building_type, year_built, ceiling_height, layout_id, video, description, residential_complex_id, status, is_featured, updated_at, created_at) FROM stdin;
1	Cedar Heights	kvartira-nahui	2	apartment	sale	NY	Cedar Lane	4321 Cedar Lane, NY	2	4	40.8199949	-73.927126	Cedar Lane, Бронкс, округ Бронкс, Нью-Йорк, 10451, Соединённые Штаты Америки	2	2.109	23	1	2	3	4.837	USD	panel	2000	3	11	\N	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Maple Grove Estate is an exquisite property that combines rustic charm with modern elegance. With sprawling grounds and top-notch facilities, this estate is perfect for those seeking a peaceful retreat in the heart of the city.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	active	f	2025-11-04 11:17:48.214+00	2025-11-04 09:14:43.865+00
2	Cedar Heights	kvartira-nahui - Copy	2	apartment	sale	NY	Cedar Lane	4321 Cedar Lane, NY	2	4	40.8199949	-73.927126	Cedar Lane, Бронкс, округ Бронкс, Нью-Йорк, 10451, Соединённые Штаты Америки	2	2.109	23	1	2	3	4.837	USD	panel	2000	3	11	\N	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Maple Grove Estate is an exquisite property that combines rustic charm with modern elegance. With sprawling grounds and top-notch facilities, this estate is perfect for those seeking a peaceful retreat in the heart of the city.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	active	f	2025-11-04 11:17:48.214+00	2025-11-04 11:18:16.275+00
\.


--
-- Data for Name: flats_amenities; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.flats_amenities (_order, _parent_id, id, amenity) FROM stdin;
1	1	6909c3ee910c008607cae32a	Fitness Center
2	1	6909e0c470ef285b9a2e1b5f	Pet-Friendly Facilities
3	1	6909e0c870ef285b9a2e1b61	Business Center
1	2	6909e0f8bd3d0c133cf2dc3e	Fitness Center
2	2	6909e0f8bd3d0c133cf2dc3f	Pet-Friendly Facilities
3	2	6909e0f8bd3d0c133cf2dc40	Business Center
\.


--
-- Data for Name: flats_images; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.flats_images (_order, _parent_id, id, image_id, alt) FROM stdin;
1	1	6909c3d9910c008607cae328	5	\N
1	2	6909e0f8bd3d0c133cf2dc3d	5	\N
\.


--
-- Data for Name: footer; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.footer (id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: footer_nav_items; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.footer_nav_items (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label) FROM stdin;
\.


--
-- Data for Name: footer_rels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.footer_rels (id, "order", parent_id, path, pages_id, posts_id) FROM stdin;
\.


--
-- Data for Name: form_submissions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.form_submissions (id, form_id, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: form_submissions_submission_data; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.form_submissions_submission_data (_order, _parent_id, id, field, value) FROM stdin;
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms (id, title, submit_button_label, confirmation_type, confirmation_message, redirect_url, updated_at, created_at) FROM stdin;
1	a	a	message	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "aa", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	2025-11-03 18:27:33.775+00	2025-11-03 18:27:33.775+00
\.


--
-- Data for Name: forms_blocks_checkbox; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_blocks_checkbox (_order, _parent_id, _path, id, name, label, width, required, default_value, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_country; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_blocks_country (_order, _parent_id, _path, id, name, label, width, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_email; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_blocks_email (_order, _parent_id, _path, id, name, label, width, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_message; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_blocks_message (_order, _parent_id, _path, id, message, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_number; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_blocks_number (_order, _parent_id, _path, id, name, label, width, default_value, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_select; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_blocks_select (_order, _parent_id, _path, id, name, label, width, default_value, placeholder, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_select_options; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_blocks_select_options (_order, _parent_id, id, label, value) FROM stdin;
\.


--
-- Data for Name: forms_blocks_state; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_blocks_state (_order, _parent_id, _path, id, name, label, width, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_text; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_blocks_text (_order, _parent_id, _path, id, name, label, width, default_value, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_blocks_textarea; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_blocks_textarea (_order, _parent_id, _path, id, name, label, width, default_value, required, block_name) FROM stdin;
\.


--
-- Data for Name: forms_emails; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.forms_emails (_order, _parent_id, id, email_to, cc, bcc, reply_to, email_from, subject, message) FROM stdin;
\.


--
-- Data for Name: header; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.header (id, updated_at, created_at) FROM stdin;
1	2025-11-04 12:25:16.835+00	2025-11-04 12:25:16.835+00
\.


--
-- Data for Name: header_nav_items; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.header_nav_items (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label) FROM stdin;
1	1	6909f0a1e686f95486fdb256	reference	\N	\N	Home
2	1	6909f075e686f95486fdb250	reference	\N	\N	About us
3	1	6909f090e686f95486fdb252	reference	\N	\N	Contact
4	1	6909f09ae686f95486fdb254	reference	\N	\N	FAQ
\.


--
-- Data for Name: header_rels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.header_rels (id, "order", parent_id, path, pages_id, posts_id) FROM stdin;
1	\N	1	navItems.0.link.reference	1	\N
2	\N	1	navItems.1.link.reference	2	\N
3	\N	1	navItems.2.link.reference	3	\N
4	\N	1	navItems.3.link.reference	4	\N
\.


--
-- Data for Name: lands; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.lands (id, title, slug, purpose, area, price, location_city, location_district, location_address, status, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: lands_communications; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.lands_communications (_order, _parent_id, id, communication) FROM stdin;
\.


--
-- Data for Name: lands_images; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.lands_images (_order, _parent_id, id, image_id) FROM stdin;
\.


--
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.media (id, alt, caption, updated_at, created_at, url, thumbnail_u_r_l, filename, mime_type, filesize, width, height, focal_x, focal_y, sizes_thumbnail_url, sizes_thumbnail_width, sizes_thumbnail_height, sizes_thumbnail_mime_type, sizes_thumbnail_filesize, sizes_thumbnail_filename, sizes_square_url, sizes_square_width, sizes_square_height, sizes_square_mime_type, sizes_square_filesize, sizes_square_filename, sizes_small_url, sizes_small_width, sizes_small_height, sizes_small_mime_type, sizes_small_filesize, sizes_small_filename, sizes_medium_url, sizes_medium_width, sizes_medium_height, sizes_medium_mime_type, sizes_medium_filesize, sizes_medium_filename, sizes_large_url, sizes_large_width, sizes_large_height, sizes_large_mime_type, sizes_large_filesize, sizes_large_filename, sizes_xlarge_url, sizes_xlarge_width, sizes_xlarge_height, sizes_xlarge_mime_type, sizes_xlarge_filesize, sizes_xlarge_filename, sizes_og_url, sizes_og_width, sizes_og_height, sizes_og_mime_type, sizes_og_filesize, sizes_og_filename) FROM stdin;
1	das	\N	2025-11-03 17:11:08.366+00	2025-11-03 17:11:08.366+00	\N	\N	fC0gv80Fus3DrlhouDAaPhhJG38Jbd5E7uZURdZ5xg-WX9dJEpVH03cMZumsGpENGB4RrxRt5u9mnX6Ym6Sh832FAM2iVB7jlrF2hepbb1Rfh5NR8XgE6kCpDz9C2pK_TA=w1152-h603-nd	image/jpeg	76415	1152	603	50	50	\N	300	157	image/jpeg	8336	fC0gv80Fus3DrlhouDAaPhhJG38Jbd5E7uZURdZ5xg-WX9dJEpVH03cMZumsGpENGB4RrxRt5u9mnX6Ym6Sh832FAM2iVB7jlrF2hepbb1Rfh5NR8XgE6kCpDz9C2pK_TA=w1152-h603-nd-300x157.jpg	\N	500	500	image/jpeg	25450	fC0gv80Fus3DrlhouDAaPhhJG38Jbd5E7uZURdZ5xg-WX9dJEpVH03cMZumsGpENGB4RrxRt5u9mnX6Ym6Sh832FAM2iVB7jlrF2hepbb1Rfh5NR8XgE6kCpDz9C2pK_TA=w1152-h603-nd-500x500.jpg	\N	600	314	image/jpeg	23412	fC0gv80Fus3DrlhouDAaPhhJG38Jbd5E7uZURdZ5xg-WX9dJEpVH03cMZumsGpENGB4RrxRt5u9mnX6Ym6Sh832FAM2iVB7jlrF2hepbb1Rfh5NR8XgE6kCpDz9C2pK_TA=w1152-h603-nd-600x314.jpg	\N	900	471	image/jpeg	40222	fC0gv80Fus3DrlhouDAaPhhJG38Jbd5E7uZURdZ5xg-WX9dJEpVH03cMZumsGpENGB4RrxRt5u9mnX6Ym6Sh832FAM2iVB7jlrF2hepbb1Rfh5NR8XgE6kCpDz9C2pK_TA=w1152-h603-nd-900x471.jpg	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
2	\N	\N	2025-11-03 18:13:02.256+00	2025-11-03 18:13:02.256+00	\N	\N	image.png	image/png	224130	512	287	50	50	\N	300	168	image/png	120039	image-300x168.png	\N	500	500	image/png	419998	image-500x500.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
3	\N	\N	2025-11-03 18:16:47.452+00	2025-11-03 18:16:47.452+00	\N	\N	image-1.png	image/png	219209	500	663	50	50	\N	300	398	image/png	127930	image-1-300x398.png	\N	500	500	image/png	208015	image-1-500x500.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1200	630	image/png	724858	image-1-1200x630.png
4	\N	\N	2025-11-03 18:19:44.246+00	2025-11-03 18:19:44.246+00	\N	\N	image-2.png	image/png	185000	512	265	50	50	\N	300	155	image/png	101604	image-2-300x155.png	\N	500	500	image/png	354525	image-2-500x500.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
5	\N	\N	2025-11-03 18:19:52.815+00	2025-11-03 18:19:52.815+00	\N	\N	image-3.png	image/png	1215578	1188	872	50	50	\N	300	220	image/png	138764	image-3-300x220.png	\N	500	500	image/png	445589	image-3-500x500.png	\N	600	440	image/png	487912	image-3-600x440.png	\N	900	661	image/png	1032254	image-3-900x661.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1200	630	image/png	1430467	image-3-1200x630.png
6	\N	\N	2025-11-03 18:20:10.08+00	2025-11-03 18:20:10.08+00	\N	\N	image-4.png	image/png	233081	512	335	50	50	\N	300	196	image/png	124759	image-4-300x196.png	\N	500	500	image/png	448826	image-4-500x500.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
7	\N	\N	2025-11-03 18:21:00.323+00	2025-11-03 18:21:00.323+00	\N	\N	image-5.png	image/png	1215578	1188	872	50	50	\N	300	220	image/png	138764	image-5-300x220.png	\N	500	500	image/png	445589	image-5-500x500.png	\N	600	440	image/png	487912	image-5-600x440.png	\N	900	661	image/png	1032254	image-5-900x661.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1200	630	image/png	1430467	image-5-1200x630.png
8	\N	\N	2025-11-03 18:21:52.525+00	2025-11-03 18:21:52.525+00	\N	\N	image-6.png	image/png	193986	512	342	50	50	\N	300	200	image/png	126345	image-6-300x200.png	\N	500	500	image/png	358244	image-6-500x500.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
9	\N	\N	2025-11-03 18:24:20.936+00	2025-11-03 18:24:20.936+00	\N	\N	image-7.png	image/png	1215578	1188	872	50	50	\N	300	220	image/png	138764	image-7-300x220.png	\N	500	500	image/png	445589	image-7-500x500.png	\N	600	440	image/png	487912	image-7-600x440.png	\N	900	661	image/png	1032254	image-7-900x661.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1200	630	image/png	1430467	image-7-1200x630.png
10	\N	\N	2025-11-04 11:15:12.861+00	2025-11-04 11:15:12.861+00	\N	\N	image-8.png	image/png	211842	512	342	50	50	\N	300	200	image/png	125330	image-8-300x200.png	\N	500	500	image/png	392594	image-8-500x500.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
11	\N	\N	2025-11-04 11:17:02.003+00	2025-11-04 11:17:02.003+00	\N	\N	image-9.png	image/png	67285	1146	1185	50	50	\N	300	310	image/png	13133	image-9-300x310.png	\N	500	500	image/png	25159	image-9-500x500.png	\N	600	620	image/png	32516	image-9-600x620.png	\N	900	931	image/png	54539	image-9-900x931.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	1200	630	image/png	34804	image-9-1200x630.png
12	\N	\N	2025-11-04 11:19:25.495+00	2025-11-04 11:19:25.495+00	\N	\N	image-10.png	image/png	319111	512	287	50	50	\N	300	168	image/png	135077	image-10-300x168.png	\N	500	500	image/png	563649	image-10-500x500.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
13	\N	\N	2025-11-04 13:33:27.131+00	2025-11-04 13:33:27.131+00	\N	\N	image-11.png	image/png	344922	640	427	50	50	\N	300	200	image/png	130741	image-11-300x200.png	\N	500	500	image/png	405167	image-11-500x500.png	\N	600	400	image/png	413001	image-11-600x400.png	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.messages (id, message, attachment_id, realtor_id, subject, name, email, phone, property, status, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: pages; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages (id, title, hero_type, hero_rich_text, hero_media_id, meta_title, meta_image_id, meta_description, published_at, slug, slug_lock, updated_at, created_at, _status) FROM stdin;
2	About us	lowImpact	\N	\N	\N	\N	\N	2025-11-03 18:19:17.08+00	about-us	t	2025-11-03 18:27:06.676+00	2025-11-03 18:19:07.384+00	published
3	Contact	lowImpact	\N	\N	\N	\N	\N	2025-11-03 18:24:08.603+00	contact	t	2025-11-03 18:27:40.382+00	2025-11-03 18:24:01.196+00	published
4	FAQ	none	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "выфвфы", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	\N	\N	\N	2025-11-03 18:25:27.855+00	faq	t	2025-11-03 19:02:34.33+00	2025-11-03 18:25:19.687+00	published
1	home	lowImpact	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	\N	\N	\N	\N	2025-11-03 17:10:03.713+00	home	t	2025-11-04 11:20:50.865+00	2025-11-03 17:09:46.311+00	published
\.


--
-- Data for Name: pages_blocks_about_hero; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_about_hero (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
1	2	layout	6908f234eb4cd9132e66743d	about-hero	About us	Connect with our experts and bring your Real Estate ideas to life	\N
\.


--
-- Data for Name: pages_blocks_about_hero_images; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_about_hero_images (_order, _parent_id, id, image_id) FROM stdin;
1	6908f234eb4cd9132e66743d	6908f239eb4cd9132e66743f	4
2	6908f234eb4cd9132e66743d	6908f244eb4cd9132e667441	5
3	6908f234eb4cd9132e66743d	6908f254853ee60a32203a29	6
\.


--
-- Data for Name: pages_blocks_agents; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_agents (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
4	2	layout	6908f29d1c57284fa7aa670d	agents	Agents	Meet our exceptional agents for a seamless experience	\N
\.


--
-- Data for Name: pages_blocks_amenities; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_amenities (_order, _parent_id, _path, id, block_type, label, title, image_id, block_name) FROM stdin;
3	2	layout	6908f27a853ee60a32203a2d	amenities	Amenities	Discover exceptional amenities for a luxurious lifestyle	7	\N
\.


--
-- Data for Name: pages_blocks_amenities_amenities; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_amenities_amenities (_order, _parent_id, id, icon, title) FROM stdin;
1	6908f27a853ee60a32203a2d	6908f27aed87e9514861c392	clean	Cleanliness strictly
2	6908f27a853ee60a32203a2d	6908f27aed87e9514861c393	wifi	High speed Network
3	6908f27a853ee60a32203a2d	6908f27aed87e9514861c394	shield	Full time security & work
4	6908f27a853ee60a32203a2d	6908f27aed87e9514861c395	gym	Gym and Store
\.


--
-- Data for Name: pages_blocks_archive; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_archive (_order, _parent_id, _path, id, intro_content, populate_by, relation_to, "limit", block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_blog; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_blog (_order, _parent_id, _path, id, block_type, title, subtitle, show_all_link, items_per_page, block_name) FROM stdin;
7	1	layout	6908f1b1a2c07dc568cbbedc	blog	Expert advice and market updates on real estate	Blogs	/posts	3	\N
\.


--
-- Data for Name: pages_blocks_call_to_action_new; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_call_to_action_new (_order, _parent_id, _path, id, block_type, label, title, button_text, button_link, block_name) FROM stdin;
6	2	layout	6908f3060bd739ef981d8226	call-to-action-new	Want to Book a Call?	Ready to make your step in real estate? Book Now.	View Properties	/properties	\N
4	3	layout	6908f380f46d0f22ede23b55	call-to-action-new	Want to Book a Call?	Ready to make your step in real estate? Book Now.	View Properties	/properties	\N
\.


--
-- Data for Name: pages_blocks_contact_hero; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_contact_hero (_order, _parent_id, _path, id, block_type, label, title, image_id, email, phone, location, block_name) FROM stdin;
1	3	layout	6908f34b0bd739ef981d8228	contact-hero	Contact	Get in touch with us today for expert assistance	9	testing@gmail.com	+ 123 45 67 89	Doha, Qatar	\N
\.


--
-- Data for Name: pages_blocks_contact_us_form; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_contact_us_form (_order, _parent_id, _path, id, block_type, label, title, form_id, block_name) FROM stdin;
2	3	layout	6908f36af46d0f22ede23b51	contact-us-form	Contact	Fill out this form, Let's get in touch	1	\N
\.


--
-- Data for Name: pages_blocks_content; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_content (_order, _parent_id, _path, id, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_content_columns; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_content_columns (_order, _parent_id, id, size, rich_text, enable_link, link_type, link_new_tab, link_url, link_label, link_appearance) FROM stdin;
\.


--
-- Data for Name: pages_blocks_cta; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_cta (_order, _parent_id, _path, id, rich_text, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_cta_links; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_cta_links (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label, link_appearance) FROM stdin;
\.


--
-- Data for Name: pages_blocks_faq; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_faq (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
1	4	layout	6908f3e87515fa9d954c0939	faq	faq	Your questions, Answered	\N
\.


--
-- Data for Name: pages_blocks_faq_items; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_faq_items (_order, _parent_id, id, question, answer) FROM stdin;
1	6908f3e87515fa9d954c0939	6908f3e8ed87e9514861c39a	What is the first step in buying a home?	The first step in buying a home is typically getting pre-approved for a mortgage. This helps you understand your budget and shows sellers you're a serious buyer.
2	6908f3e87515fa9d954c0939	6908f3e8ed87e9514861c39b	How much should I save for a down payment?	The traditional down payment is 20% of the purchase price, but many loan programs allow for lower down payments, some as low as 3.5% for FHA loans.
3	6908f3e87515fa9d954c0939	6908f3e8ed87e9514861c39c	What is a seller's market?	A seller's market occurs when there are more buyers than available homes, leading to higher prices and competition among buyers.
4	6908f3e87515fa9d954c0939	6908f3e8ed87e9514861c39d	How long does it take to close on a house?	The closing process typically takes 30-45 days from contract to closing, but can vary depending on the type of loan and other factors.
5	6908f3e87515fa9d954c0939	6908f3e8ed87e9514861c39e	What is a home inspection?	A home inspection is a detailed examination of a property's condition, including structure, systems, and components, performed by a professional inspector.
6	6908f3e87515fa9d954c0939	6908f3e8ed87e9514861c39f	How do I determine my home's value?	Your home's value can be determined through a professional appraisal, comparative market analysis (CMA), or online valuation tools.
7	6908f3e87515fa9d954c0939	6908f3e8ed87e9514861c3a0	Should I rent or buy a home?	This decision depends on various factors including your financial situation, long-term plans, local market conditions, and lifestyle preferences.
8	6908f3e87515fa9d954c0939	6908f3e8ed87e9514861c3a1	What is an HOA?	An HOA (Homeowners Association) is an organization that makes and enforces rules for properties and common areas in planned communities.
\.


--
-- Data for Name: pages_blocks_feature; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_feature (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
4	1	layout	6908f0eb13f1b4599131f65d	feature	 Features	Discover the advantages and exclusive benefits	\N
\.


--
-- Data for Name: pages_blocks_feature_features; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_feature_features (_order, _parent_id, id, icon, title, description) FROM stdin;
1	6908f0eb13f1b4599131f65d	6908f0f413f1b4599131f65f	home	Expert Guidance	Receive professional insights to make informed real estate decisions confidently.
2	6908f0eb13f1b4599131f65d	6908f10613f1b4599131f661	user-check	Tailored Solutions	We customize property options based on your specific needs and preferences.
3	6908f0eb13f1b4599131f65d	6908f11113f1b4599131f663	shield-check	Market Expertise	Leverage our deep understanding of market trends for smart investments.
\.


--
-- Data for Name: pages_blocks_form_block; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_form_block (_order, _parent_id, _path, id, form_id, enable_intro, intro_content, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_hero; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_hero (_order, _parent_id, _path, id, badge_text, headline, highlight, subheadline, image_id, block_name) FROM stdin;
1	1	layout	6908e20d634f99126dd98d1d	Real Estate	Find the home that fits your life	perfectly		1	\N
\.


--
-- Data for Name: pages_blocks_house_filter; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_house_filter (_order, _parent_id, _path, id, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_house_filter_filters; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_house_filter_filters (_order, _parent_id, id, label, collection) FROM stdin;
\.


--
-- Data for Name: pages_blocks_house_filter_filters_fields; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_house_filter_filters_fields (_order, _parent_id, id, name, label, type, min, max, step) FROM stdin;
\.


--
-- Data for Name: pages_blocks_house_filter_filters_fields_options; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_house_filter_filters_fields_options (_order, _parent_id, id, value, label) FROM stdin;
\.


--
-- Data for Name: pages_blocks_how_it_works; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_how_it_works (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
5	1	layout	6908f13913f1b4599131f667	how-it-works	How it works	Discover the advantages and exclusive benefits	\N
\.


--
-- Data for Name: pages_blocks_how_it_works_steps; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_how_it_works_steps (_order, _parent_id, id, icon, title, description) FROM stdin;
1	6908f13913f1b4599131f667	6908f14213f1b4599131f669	1	Find Your Ideal Property	Browse our extensive listings, filter by location, price, and features to discover your perfect home
2	6908f13913f1b4599131f667	6908f14d13f1b4599131f66b	1	Schedule a Viewing	Easily book a property tour online at a time that suits you, or request a virtual walkthrough
3	6908f13913f1b4599131f667	6908f15713f1b4599131f66d	1	Secure Your Deal	Make an offer or apply for financing through our website, and let our experts guide you
\.


--
-- Data for Name: pages_blocks_map; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_map (_order, _parent_id, _path, id, block_type, title, center_lat, center_lng, center_zoom, auto_load, "limit", block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_media_block; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_media_block (_order, _parent_id, _path, id, media_id, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_navbar; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_navbar (_order, _parent_id, _path, id, logo_text, button_text, button_url, avatar_id, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_navbar_links; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_navbar_links (_order, _parent_id, id, text, url) FROM stdin;
\.


--
-- Data for Name: pages_blocks_properties; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_properties (_order, _parent_id, _path, id, block_type, title, show_all_link, layout, items_per_page, enable_filters, filters_price_range, filters_property_type, filters_bedrooms, filters_bathrooms, filters_area, block_name) FROM stdin;
3	1	layout	6909dac29e05e16586bbd335	properties	Ready to buy your dream home? find it here	/properties	grid	6	t	t	t	t	t	t	\N
\.


--
-- Data for Name: pages_blocks_property_features; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_property_features (_order, _parent_id, _path, id, block_type, property_id, block_name) FROM stdin;
\.


--
-- Data for Name: pages_blocks_testimonials; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_testimonials (_order, _parent_id, _path, id, block_type, label, title, block_name) FROM stdin;
5	2	layout	6908f2f10bd739ef981d8224	testimonials	Testimonials	Real feedback from our satisfied clients	\N
3	3	layout	6908f374f46d0f22ede23b53	testimonials	Testimonials	Real feedback from our satisfied clients	\N
6	1	layout	6908f17b13f1b4599131f66f	testimonials	Testimonials	Real feedback from our satisfied clients	\N
\.


--
-- Data for Name: pages_blocks_vision; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_vision (_order, _parent_id, _path, id, title, subtitle, button_text, button_link, block_name) FROM stdin;
2	1	layout	6908ef5f25b9e0233affebcd	The values that drive everything we do	 Our Vision	Learn more	dsad	\N
\.


--
-- Data for Name: pages_blocks_vision_items; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_vision_items (_order, _parent_id, id, icon, title, description) FROM stdin;
1	6908ef5f25b9e0233affebcd	6908ef7b25b9e0233affebcf	 ✉	Dream Home	Discover your ideal living space with our premium featured real estate listings.
2	6908ef5f25b9e0233affebcd	6908f05bf867cf36b9a3e5ec	 ✉	Smart Investment	Secure high-value, future-ready property and investment opportunities today.
3	6908ef5f25b9e0233affebcd	6908f05ef867cf36b9a3e5ee	 ✉	Luxury Living	Explore exclusive, sophisticated properties tailored to your perfect lifestyle.
\.


--
-- Data for Name: pages_blocks_vision_mission; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_vision_mission (_order, _parent_id, _path, id, block_type, title, description, button_text, button_link, block_name) FROM stdin;
2	2	layout	6908f263853ee60a32203a2b	vision-mission	Your trusted real estate experts:	With years of local expertise, we're committed to helping you buy, sell, or invest in properties with confidence. Our personalized approach ensures every client's unique needs are met with professionalism and care.	View Properties	/properties	\N
\.


--
-- Data for Name: pages_blocks_vision_mission_stats; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_blocks_vision_mission_stats (_order, _parent_id, id, value, label) FROM stdin;
1	6908f263853ee60a32203a2b	6908f263ed87e9514861c38a	98%	Satisfaction rate
2	6908f263853ee60a32203a2b	6908f263ed87e9514861c38b	200+	Properties sold
3	6908f263853ee60a32203a2b	6908f263ed87e9514861c38c	500+	Project done
4	6908f263853ee60a32203a2b	6908f263ed87e9514861c38d	90%	Happy Clients
\.


--
-- Data for Name: pages_hero_links; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_hero_links (_order, _parent_id, id, link_type, link_new_tab, link_url, link_label, link_appearance) FROM stdin;
1	4	6908fc0b7515fa9d954c093b	reference	t	\N	home	outline
2	4	6908fc3d7515fa9d954c093d	reference	t	\N	dasd	outline
\.


--
-- Data for Name: pages_rels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.pages_rels (id, "order", parent_id, path, pages_id, posts_id, categories_id, properties_id, agents_id, testimonials_id, commercial_id, flats_id, lands_id, residential_complexes_id) FROM stdin;
1	1	2	layout.3.agents	\N	\N	\N	\N	1	\N	\N	\N	\N	\N
2	1	2	layout.4.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
3	1	3	layout.2.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
7	\N	4	hero.links.0.link.reference	1	\N	\N	\N	\N	\N	\N	\N	\N	\N
8	\N	4	hero.links.1.link.reference	2	\N	\N	\N	\N	\N	\N	\N	\N	\N
40	1	1	layout.2.properties	\N	\N	\N	\N	\N	\N	\N	1	\N	\N
41	2	1	layout.2.properties	\N	\N	\N	\N	\N	\N	\N	2	\N	\N
42	1	1	layout.5.testimonials	\N	\N	\N	\N	\N	1	\N	\N	\N	\N
43	1	1	layout.6.posts	\N	1	\N	\N	\N	\N	\N	\N	\N	\N
44	2	1	layout.6.posts	\N	2	\N	\N	\N	\N	\N	\N	\N	\N
45	3	1	layout.6.posts	\N	3	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Data for Name: payload_jobs; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.payload_jobs (id, input, completed_at, total_tried, has_error, error, task_slug, queue, wait_until, processing, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: payload_jobs_log; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.payload_jobs_log (_order, _parent_id, id, executed_at, completed_at, task_slug, task_i_d, input, output, state, error) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.payload_locked_documents (id, global_slug, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: payload_locked_documents_rels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.payload_locked_documents_rels (id, "order", parent_id, path, pages_id, posts_id, media_id, categories_id, users_id, properties_id, agents_id, testimonials_id, flats_id, residential_complexes_id, commercial_id, lands_id, reviews_id, messages_id, redirects_id, forms_id, form_submissions_id, search_id, payload_jobs_id) FROM stdin;
\.


--
-- Data for Name: payload_migrations; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.payload_migrations (id, name, batch, updated_at, created_at) FROM stdin;
1	dev	-1	2025-11-04 13:42:29.383+00	2025-11-03 16:26:43.291+00
\.


--
-- Data for Name: payload_preferences; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.payload_preferences (id, key, value, updated_at, created_at) FROM stdin;
3	collection-media	{"editViewType": "default"}	2025-11-03 17:10:53.857+00	2025-11-03 17:10:52.099+00
4	collection-properties	{"editViewType": "default"}	2025-11-03 18:12:43.368+00	2025-11-03 18:12:43.477+00
5	collection-testimonials	{"editViewType": "default"}	2025-11-03 18:16:35.267+00	2025-11-03 18:16:35.377+00
7	collection-pages-2	{"fields": {"layout": {"collapsed": []}, "_index-1": {"tabIndex": 1}}}	2025-11-03 18:19:36.392+00	2025-11-03 18:19:27.341+00
8	collection-agents	{"editViewType": "default"}	2025-11-03 18:21:21.799+00	2025-11-03 18:21:21.698+00
9	collection-pages-3	{"fields": {"layout": {"collapsed": []}, "_index-1": {"tabIndex": 1}}}	2025-11-03 18:24:14.48+00	2025-11-03 18:24:02.544+00
11	collection-forms	{"editViewType": "default"}	2025-11-03 18:27:16.144+00	2025-11-03 18:27:16.227+00
12	collection-flats	{"editViewType": "default"}	2025-11-04 09:12:34.434+00	2025-11-04 00:52:43.939+00
10	collection-pages-4	{"fields": {"layout": {"collapsed": ["6908f3e87515fa9d954c0939"]}, "_index-1": {"tabIndex": 1}, "hero.links": {"collapsed": []}}}	2025-11-04 09:30:34.82+00	2025-11-03 18:25:27.692+00
13	collection-users	{"editViewType": "default"}	2025-11-04 11:14:17.843+00	2025-11-04 11:14:18.012+00
14	collection-residential-complexes	{"editViewType": "default"}	2025-11-04 11:17:15.097+00	2025-11-04 11:17:13.947+00
15	global-header	{"fields": {"navItems": {"collapsed": []}}, "editViewType": "default"}	2025-11-04 12:24:23.895+00	2025-11-04 12:24:18.768+00
6	collection-posts	{"limit": 10, "editViewType": "default"}	2025-11-04 12:42:20.356+00	2025-11-03 18:17:29.854+00
1	collection-pages	{"limit": 10, "editViewType": "default"}	2025-11-04 13:33:14.987+00	2025-11-03 17:09:45.07+00
2	collection-pages-1	{"fields": {"layout": {"collapsed": ["6909dac29e05e16586bbd335", "6908f0eb13f1b4599131f65d", "6908f13913f1b4599131f667", "6908f17b13f1b4599131f66f"]}, "_index-1": {"tabIndex": 1}}}	2025-11-04 13:42:28.072+00	2025-11-03 17:09:48.116+00
16	collection-categories	{}	2025-11-04 13:43:08.714+00	2025-11-04 13:43:08.713+00
17	collection-form-submissions	{}	2025-11-04 13:43:33.8+00	2025-11-04 13:43:33.8+00
18	collection-search	{"editViewType": "default"}	2025-11-04 13:43:41.67+00	2025-11-04 13:43:37.533+00
19	nav	{"open": true, "groups": {"Collections": {"open": false}}}	2025-11-04 13:44:16.834+00	2025-11-04 13:44:12.651+00
\.


--
-- Data for Name: payload_preferences_rels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.payload_preferences_rels (id, "order", parent_id, path, users_id) FROM stdin;
8	\N	3	user	1
16	\N	4	user	1
18	\N	5	user	1
21	\N	7	user	1
22	\N	8	user	1
24	\N	9	user	1
29	\N	11	user	1
68	\N	12	user	1
70	\N	10	user	1
81	\N	13	user	1
82	\N	14	user	1
86	\N	15	user	1
87	\N	6	user	1
88	\N	1	user	1
90	\N	2	user	1
91	\N	16	user	1
92	\N	17	user	1
94	\N	18	user	1
97	\N	19	user	1
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.posts (id, title, image_id, published_date, excerpt, content, author_id, status, meta_title, meta_description, meta_image_id, slug, updated_at, created_at) FROM stdin;
1	The ultimate guide to buying your first home	12	2025-11-11 18:00:00+00	The ultimate guide to buying your first home	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Purchasing your first home is an exciting and significant milestone, but it can also be a daunting process filled with numerous steps and decisions. This guide aims to simplify the journey by providing you with essential information and tips to help you make informed choices.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "The first step in buying a home is determining your budget. This involves assessing your financial situation, including your savings, income, and any existing debts. It's crucial to get pre-approved for a mortgage to understand how much you can afford to spend. This will help narrow down your options and prevent you from falling in love with a home that's out of your reach.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Once you have a clear budget, the next step is to research the housing market in your desired area. Look at property prices, neighborhood amenities, and future development plans. Understanding the market will give you a better idea of what to expect and help you spot good deals.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Finding the right property involves more than just liking the look of a house. Consider factors such as the location, size, layout, and potential for future growth. It's important to think about your long-term needs and whether the property will accommodate them. Don't rush this decision; take your time to ensure it feels right.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	1	published	\N	\N	\N	dsada	2025-11-04 11:20:00.049+00	2025-11-03 18:18:28.133+00
2	The ultimate guide to buying your first home	12	2025-11-11 18:00:00+00	The ultimate guide to buying your first home	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Purchasing your first home is an exciting and significant milestone, but it can also be a daunting process filled with numerous steps and decisions. This guide aims to simplify the journey by providing you with essential information and tips to help you make informed choices.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "The first step in buying a home is determining your budget. This involves assessing your financial situation, including your savings, income, and any existing debts. It's crucial to get pre-approved for a mortgage to understand how much you can afford to spend. This will help narrow down your options and prevent you from falling in love with a home that's out of your reach.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Once you have a clear budget, the next step is to research the housing market in your desired area. Look at property prices, neighborhood amenities, and future development plans. Understanding the market will give you a better idea of what to expect and help you spot good deals.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Finding the right property involves more than just liking the look of a house. Consider factors such as the location, size, layout, and potential for future growth. It's important to think about your long-term needs and whether the property will accommodate them. Don't rush this decision; take your time to ensure it feels right.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	1	published	\N	\N	\N	dsada	2025-11-04 11:20:00.049+00	2025-11-04 11:20:18.878+00
3	The ultimate guide to buying your first home	12	2025-11-11 18:00:00+00	The ultimate guide to buying your first home	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Purchasing your first home is an exciting and significant milestone, but it can also be a daunting process filled with numerous steps and decisions. This guide aims to simplify the journey by providing you with essential information and tips to help you make informed choices.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "The first step in buying a home is determining your budget. This involves assessing your financial situation, including your savings, income, and any existing debts. It's crucial to get pre-approved for a mortgage to understand how much you can afford to spend. This will help narrow down your options and prevent you from falling in love with a home that's out of your reach.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Once you have a clear budget, the next step is to research the housing market in your desired area. Look at property prices, neighborhood amenities, and future development plans. Understanding the market will give you a better idea of what to expect and help you spot good deals.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}, {"type": "paragraph", "format": "start", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "Finding the right property involves more than just liking the look of a house. Consider factors such as the location, size, layout, and potential for future growth. It's important to think about your long-term needs and whether the property will accommodate them. Don't rush this decision; take your time to ensure it feels right.", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	1	published	The ultimate guide to buying your first home	The ultimate guide to buying your first home	12	dsada	2025-11-04 12:42:18.445+00	2025-11-04 11:20:20.148+00
\.


--
-- Data for Name: posts_rels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.posts_rels (id, "order", parent_id, path, categories_id) FROM stdin;
\.


--
-- Data for Name: properties; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.properties (id, title, slug, address, coordinates_lat, coordinates_lng, coordinates_address, price, type, bedrooms, bathrooms, area, description, status, updated_at, created_at) FROM stdin;
1	dsad	dsad	addsa	123	321	321	321	rent	321	321	321	{"root": {"type": "root", "format": "", "indent": 0, "version": 1, "children": [{"type": "paragraph", "format": "", "indent": 0, "version": 1, "children": [{"mode": "normal", "text": "dsada", "type": "text", "style": "", "detail": 0, "format": 0, "version": 1}], "direction": null, "textStyle": "", "textFormat": 0}], "direction": null}}	active	2025-11-03 18:13:28.334+00	2025-11-03 18:13:02.971+00
\.


--
-- Data for Name: properties_features; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.properties_features (_order, _parent_id, id, feature) FROM stdin;
1	1	6908f0c113f1b4599131f65b	214342
\.


--
-- Data for Name: properties_images; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.properties_images (_order, _parent_id, id, image_id) FROM stdin;
1	1	6908f0a5f867cf36b9a3e5f2	2
\.


--
-- Data for Name: redirects; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.redirects (id, "from", to_type, to_url, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: redirects_rels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.redirects_rels (id, "order", parent_id, path, pages_id, posts_id) FROM stdin;
\.


--
-- Data for Name: residential_complexes; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.residential_complexes (id, name, slug, status, type, developer, location_city, location_district, location_address, completion_date, description, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: residential_complexes_images; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.residential_complexes_images (_order, _parent_id, id, image_id) FROM stdin;
\.


--
-- Data for Name: residential_complexes_infrastructure; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.residential_complexes_infrastructure (_order, _parent_id, id, item) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.reviews (id, realtor_id, author_name, author_email, rating, comment, status, updated_at, created_at) FROM stdin;
\.


--
-- Data for Name: search; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.search (id, title, priority, slug, meta_title, meta_description, meta_image_id, updated_at, created_at) FROM stdin;
1	The ultimate guide to buying your first home	0	dsada	The ultimate guide to buying your first home	\N	\N	2025-11-04 11:20:00.084+00	2025-11-03 18:18:28.148+00
2	The ultimate guide to buying your first home	0	dsada	The ultimate guide to buying your first home	\N	\N	2025-11-04 11:20:18.898+00	2025-11-04 11:20:18.898+00
3	The ultimate guide to buying your first home	0	dsada	The ultimate guide to buying your first home	The ultimate guide to buying your first home	12	2025-11-04 12:42:18.481+00	2025-11-04 11:20:20.176+00
\.


--
-- Data for Name: search_categories; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.search_categories (_order, _parent_id, id, relation_to, title) FROM stdin;
\.


--
-- Data for Name: search_rels; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.search_rels (id, "order", parent_id, path, posts_id) FROM stdin;
2	\N	1	doc	1
3	\N	2	doc	2
5	\N	3	doc	3
\.


--
-- Data for Name: testimonials; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.testimonials (id, name, location, image_id, text, rating, updated_at, created_at) FROM stdin;
1	Andy smith	Los Angeles, CA	3	Realestic turned our house hunt into a smooth and enjoyable experience. Perfect for anyone looking to buy their first home!	5	2025-11-03 18:16:53.107+00	2025-11-03 18:16:53.107+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, name, slug, role, phone, agency, photo_id, bio, updated_at, created_at, email, reset_password_token, reset_password_expiration, salt, hash, login_attempts, lock_until) FROM stdin;
1	\N	\N	admin	\N	\N	\N	\N	2025-11-03 17:09:41.625+00	2025-11-03 17:09:41.624+00	m.sharabarin05@mail.ru	\N	\N	07627002ba5ab5d388ee5a51bba49e3ab437725fc5b60f2fc7e93a2cf59c23ca	2efe0189eb94da3910ddb7ce3d3e77e3daa32e0466f993493265846ad1f2f49c1af3454e42764d78b397469b3a980decbf02f4fcb49ea5d493c10b7c225a2933e1ab3148d32429ae6b872a5f44a296d9378295a267daa8c53826ecefd0e76cf63edc49904c554a03a866e732f90f3e8201f896553c265b8a85c9db67609e5302fa3dc27a10daea68fb14d2483cff58bc22cb5d1903e8ed5a608aea52e69093faea880a0e3f5348e1dc2a2392c06fa6f19094ddf63d3ee4afad7aeaa881eb133628815d7c711230dbf2d43de7b6cc050ba4c7d5ee2bb3e430a714a69f46eaeb609c4b42b1db0475ca93fa18e1c9901095e52dd10eafecaa6020fc7383193f7bc51eac0d7e68f29c656fb0c6d79050154d7792399f4009d6130293789c74bded46b1e1c9bca0541f6dc44541c4430d20d29bf07753de1d6954a5129c70a33086ebcf9f1e39195100c84dbc5ed5896763f784478d4a9db2fe1798621a11fac8f194e302ea23940eae87475d901331c69948cc45f8121cb3a39c313c72aa9dc62ae93e222f4ef723dc1a04bf76a57064de4387e6796c96a61c835629b990a54751e887f8b15422a53fb92efcfe06c6037e45a46de991d7105ab225d7c9e34e58c5ceaac28157d8e1f710f28851a99b128edd445c8c6e114d4fa24ba6738624faf7707b663e91c346f529107337706eb98e32cdebe2584d149a6235694d7d8e23536f	0	\N
2	Anna	anna	realtor	+1 (801) 283-6655	alma house	10	our mission is simple: to provide you with the best real estate solutions, tailored to meet your needs. We understand that finding the perfect property is more than just a transaction it’s about creating a space where life happens. Our dedicated team combines industry expertise	2025-11-04 11:15:32.142+00	2025-11-04 11:15:32.142+00	mihiailpersonalemail@gmail.com	\N	\N	e1199ac25bb6ac0a8ac906af60227993e253802c4ec0d804bd94d84ae5a93f40	0e88671a823a850b34a6fba37ad71388d471034c5870e37e30f9cd5cfbc0fd251f988ae4624a5750eaa709ea402a8e2057ac35f1472e8b92082fb8d2ebe43437aceabf85a3e81fddd248aaa9b4f0538c8e296e060905237b2a84e1f20b9796f19b00571a9fbd8a29690d3a2126f724229a7e477f9ef57f544890347b611b83050f55ac64bb2fa1e0d72e1e138c0d40e6864a3ebc2c04a9f3b7d0719978f633e527b72f00d6a9a315f64a88aed490f7bd4c0ba6c90fe1cd86f4953de5ea594106731381b5ad4a8877d4c731b9baca6535a37112747858549dff96989b550a17ee846dd40e06960bc249cbe6012b112d1650025f873fa285155f0350f3ec40ccd6219e27e6b1a7c5bcc4e50f3f908a9d1aed7fa53115926b58b972ecf93eb6fa0382bc5aa1accdccb459bbaa225ed7815ce1ff582aa33ec56e1b7311f25ad108d8e879a9295e2965f5b2261e15610b526c74daa7c6ceedb6a90eb2bce8410e883679c765fe2a9b6cb701be0624896991c05e82aef1cba9ae5ca7586a992624a50a9afb0b59fcb3db8fe08c91fa115153b3ebbc0101eacf30710c7a376aaea98d57e6e71d94db8f3e3fc1664579318cadddd2b85f8e8db716dae35d985e291d8ab639930bec663d33a691665bdd16a3ce9fc5a2e5efa6788d56bedb06f54f8581336a166b820351b6c8f96eaacc96f2c48b2bc4877aee7032e1e41baaeeff7d09a5	0	\N
\.


--
-- Data for Name: users_sessions; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users_sessions (_order, _parent_id, id, created_at, expires_at) FROM stdin;
1	1	3c37c340-b150-460b-a24b-7b41c2ad937b	2025-11-04 08:47:01.871+00	2025-11-04 14:44:51.012+00
\.


--
-- Name: _pages_v_blocks_about_hero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_about_hero_id_seq', 16, true);


--
-- Name: _pages_v_blocks_about_hero_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_about_hero_images_id_seq', 39, true);


--
-- Name: _pages_v_blocks_agents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_agents_id_seq', 6, true);


--
-- Name: _pages_v_blocks_amenities_amenities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_amenities_amenities_id_seq', 32, true);


--
-- Name: _pages_v_blocks_amenities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_amenities_id_seq', 8, true);


--
-- Name: _pages_v_blocks_archive_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_archive_id_seq', 1, false);


--
-- Name: _pages_v_blocks_blog_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_blog_id_seq', 28, true);


--
-- Name: _pages_v_blocks_call_to_action_new_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_call_to_action_new_id_seq', 6, true);


--
-- Name: _pages_v_blocks_contact_hero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_contact_hero_id_seq', 8, true);


--
-- Name: _pages_v_blocks_contact_us_form_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_contact_us_form_id_seq', 6, true);


--
-- Name: _pages_v_blocks_content_columns_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_content_columns_id_seq', 1, false);


--
-- Name: _pages_v_blocks_content_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_content_id_seq', 1, false);


--
-- Name: _pages_v_blocks_cta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_cta_id_seq', 1, false);


--
-- Name: _pages_v_blocks_cta_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_cta_links_id_seq', 1, false);


--
-- Name: _pages_v_blocks_faq_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_faq_id_seq', 53, true);


--
-- Name: _pages_v_blocks_faq_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_faq_items_id_seq', 325, true);


--
-- Name: _pages_v_blocks_feature_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_feature_features_id_seq', 154, true);


--
-- Name: _pages_v_blocks_feature_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_feature_id_seq', 61, true);


--
-- Name: _pages_v_blocks_form_block_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_form_block_id_seq', 1, false);


--
-- Name: _pages_v_blocks_hero_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_hero_id_seq', 115, true);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_house_filter_filters_fields_id_seq', 5, true);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_house_filter_filters_fields_options_id_seq', 1, false);


--
-- Name: _pages_v_blocks_house_filter_filters_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_house_filter_filters_id_seq', 8, true);


--
-- Name: _pages_v_blocks_house_filter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_house_filter_id_seq', 9, true);


--
-- Name: _pages_v_blocks_how_it_works_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_how_it_works_id_seq', 40, true);


--
-- Name: _pages_v_blocks_how_it_works_steps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_how_it_works_steps_id_seq', 108, true);


--
-- Name: _pages_v_blocks_map_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_map_id_seq', 2, true);


--
-- Name: _pages_v_blocks_media_block_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_media_block_id_seq', 1, false);


--
-- Name: _pages_v_blocks_navbar_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_navbar_id_seq', 1, false);


--
-- Name: _pages_v_blocks_navbar_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_navbar_links_id_seq', 1, false);


--
-- Name: _pages_v_blocks_properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_properties_id_seq', 87, true);


--
-- Name: _pages_v_blocks_property_features_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_property_features_id_seq', 2, true);


--
-- Name: _pages_v_blocks_testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_testimonials_id_seq', 39, true);


--
-- Name: _pages_v_blocks_vision_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_vision_id_seq', 106, true);


--
-- Name: _pages_v_blocks_vision_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_vision_items_id_seq', 264, true);


--
-- Name: _pages_v_blocks_vision_mission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_vision_mission_id_seq', 9, true);


--
-- Name: _pages_v_blocks_vision_mission_stats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_blocks_vision_mission_stats_id_seq', 36, true);


--
-- Name: _pages_v_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_id_seq', 51, true);


--
-- Name: _pages_v_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_rels_id_seq', 209, true);


--
-- Name: _pages_v_version_hero_links_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public._pages_v_version_hero_links_id_seq', 69, true);


--
-- Name: agents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.agents_id_seq', 1, true);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- Name: commercial_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.commercial_id_seq', 1, false);


--
-- Name: flats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.flats_id_seq', 2, true);


--
-- Name: footer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.footer_id_seq', 1, false);


--
-- Name: footer_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.footer_rels_id_seq', 1, false);


--
-- Name: form_submissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.form_submissions_id_seq', 1, false);


--
-- Name: forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.forms_id_seq', 1, true);


--
-- Name: header_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.header_id_seq', 1, true);


--
-- Name: header_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.header_rels_id_seq', 4, true);


--
-- Name: lands_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.lands_id_seq', 1, false);


--
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.media_id_seq', 13, true);


--
-- Name: messages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.messages_id_seq', 1, false);


--
-- Name: pages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.pages_id_seq', 4, true);


--
-- Name: pages_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.pages_rels_id_seq', 45, true);


--
-- Name: payload_jobs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.payload_jobs_id_seq', 1, false);


--
-- Name: payload_locked_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.payload_locked_documents_id_seq', 168, true);


--
-- Name: payload_locked_documents_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.payload_locked_documents_rels_id_seq', 302, true);


--
-- Name: payload_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.payload_migrations_id_seq', 1, true);


--
-- Name: payload_preferences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.payload_preferences_id_seq', 19, true);


--
-- Name: payload_preferences_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.payload_preferences_rels_id_seq', 97, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.posts_id_seq', 3, true);


--
-- Name: posts_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.posts_rels_id_seq', 1, false);


--
-- Name: properties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.properties_id_seq', 1, true);


--
-- Name: redirects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.redirects_id_seq', 1, false);


--
-- Name: redirects_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.redirects_rels_id_seq', 1, false);


--
-- Name: residential_complexes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.residential_complexes_id_seq', 1, false);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- Name: search_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.search_id_seq', 3, true);


--
-- Name: search_rels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.search_rels_id_seq', 5, true);


--
-- Name: testimonials_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.testimonials_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: _pages_v_blocks_about_hero_images _pages_v_blocks_about_hero_images_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero_images
    ADD CONSTRAINT _pages_v_blocks_about_hero_images_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_about_hero _pages_v_blocks_about_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero
    ADD CONSTRAINT _pages_v_blocks_about_hero_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_agents _pages_v_blocks_agents_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_agents
    ADD CONSTRAINT _pages_v_blocks_agents_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_amenities_amenities _pages_v_blocks_amenities_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_amenities_amenities
    ADD CONSTRAINT _pages_v_blocks_amenities_amenities_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_amenities _pages_v_blocks_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_amenities
    ADD CONSTRAINT _pages_v_blocks_amenities_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_archive _pages_v_blocks_archive_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_archive
    ADD CONSTRAINT _pages_v_blocks_archive_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_blog _pages_v_blocks_blog_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_blog
    ADD CONSTRAINT _pages_v_blocks_blog_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_call_to_action_new _pages_v_blocks_call_to_action_new_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_call_to_action_new
    ADD CONSTRAINT _pages_v_blocks_call_to_action_new_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_contact_hero _pages_v_blocks_contact_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_contact_hero
    ADD CONSTRAINT _pages_v_blocks_contact_hero_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_contact_us_form _pages_v_blocks_contact_us_form_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_contact_us_form
    ADD CONSTRAINT _pages_v_blocks_contact_us_form_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_content_columns _pages_v_blocks_content_columns_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_content_columns
    ADD CONSTRAINT _pages_v_blocks_content_columns_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_content _pages_v_blocks_content_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_content
    ADD CONSTRAINT _pages_v_blocks_content_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_cta_links _pages_v_blocks_cta_links_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_cta_links
    ADD CONSTRAINT _pages_v_blocks_cta_links_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_cta _pages_v_blocks_cta_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_cta
    ADD CONSTRAINT _pages_v_blocks_cta_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_faq_items _pages_v_blocks_faq_items_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_faq_items
    ADD CONSTRAINT _pages_v_blocks_faq_items_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_faq _pages_v_blocks_faq_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_faq
    ADD CONSTRAINT _pages_v_blocks_faq_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_feature_features _pages_v_blocks_feature_features_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_feature_features
    ADD CONSTRAINT _pages_v_blocks_feature_features_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_feature _pages_v_blocks_feature_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_feature
    ADD CONSTRAINT _pages_v_blocks_feature_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_form_block _pages_v_blocks_form_block_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_form_block
    ADD CONSTRAINT _pages_v_blocks_form_block_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_hero _pages_v_blocks_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_hero
    ADD CONSTRAINT _pages_v_blocks_hero_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options _pages_v_blocks_house_filter_filters_fields_options_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields_options
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_fields_options_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_house_filter_filters_fields _pages_v_blocks_house_filter_filters_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_fields_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_house_filter_filters _pages_v_blocks_house_filter_filters_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_house_filter _pages_v_blocks_house_filter_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter
    ADD CONSTRAINT _pages_v_blocks_house_filter_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_how_it_works _pages_v_blocks_how_it_works_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works
    ADD CONSTRAINT _pages_v_blocks_how_it_works_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_how_it_works_steps _pages_v_blocks_how_it_works_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works_steps
    ADD CONSTRAINT _pages_v_blocks_how_it_works_steps_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_map _pages_v_blocks_map_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_map
    ADD CONSTRAINT _pages_v_blocks_map_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_media_block _pages_v_blocks_media_block_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_media_block
    ADD CONSTRAINT _pages_v_blocks_media_block_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_navbar_links _pages_v_blocks_navbar_links_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_navbar_links
    ADD CONSTRAINT _pages_v_blocks_navbar_links_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_navbar _pages_v_blocks_navbar_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_navbar
    ADD CONSTRAINT _pages_v_blocks_navbar_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_properties _pages_v_blocks_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_properties
    ADD CONSTRAINT _pages_v_blocks_properties_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_property_features _pages_v_blocks_property_features_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_property_features
    ADD CONSTRAINT _pages_v_blocks_property_features_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_testimonials _pages_v_blocks_testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_testimonials
    ADD CONSTRAINT _pages_v_blocks_testimonials_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_vision_items _pages_v_blocks_vision_items_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision_items
    ADD CONSTRAINT _pages_v_blocks_vision_items_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_vision_mission _pages_v_blocks_vision_mission_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission
    ADD CONSTRAINT _pages_v_blocks_vision_mission_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_vision_mission_stats _pages_v_blocks_vision_mission_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission_stats
    ADD CONSTRAINT _pages_v_blocks_vision_mission_stats_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_blocks_vision _pages_v_blocks_vision_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision
    ADD CONSTRAINT _pages_v_blocks_vision_pkey PRIMARY KEY (id);


--
-- Name: _pages_v _pages_v_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_rels _pages_v_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_version_hero_links _pages_v_version_hero_links_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_version_hero_links
    ADD CONSTRAINT _pages_v_version_hero_links_pkey PRIMARY KEY (id);


--
-- Name: agents agents_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_pkey PRIMARY KEY (id);


--
-- Name: agents_social_links agents_social_links_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.agents_social_links
    ADD CONSTRAINT agents_social_links_pkey PRIMARY KEY (id);


--
-- Name: categories_breadcrumbs categories_breadcrumbs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories_breadcrumbs
    ADD CONSTRAINT categories_breadcrumbs_pkey PRIMARY KEY (id);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: commercial_images commercial_images_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.commercial_images
    ADD CONSTRAINT commercial_images_pkey PRIMARY KEY (id);


--
-- Name: commercial commercial_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.commercial
    ADD CONSTRAINT commercial_pkey PRIMARY KEY (id);


--
-- Name: commercial_utilities commercial_utilities_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.commercial_utilities
    ADD CONSTRAINT commercial_utilities_pkey PRIMARY KEY (id);


--
-- Name: flats_amenities flats_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flats_amenities
    ADD CONSTRAINT flats_amenities_pkey PRIMARY KEY (id);


--
-- Name: flats_images flats_images_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flats_images
    ADD CONSTRAINT flats_images_pkey PRIMARY KEY (id);


--
-- Name: flats flats_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flats
    ADD CONSTRAINT flats_pkey PRIMARY KEY (id);


--
-- Name: footer_nav_items footer_nav_items_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.footer_nav_items
    ADD CONSTRAINT footer_nav_items_pkey PRIMARY KEY (id);


--
-- Name: footer footer_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.footer
    ADD CONSTRAINT footer_pkey PRIMARY KEY (id);


--
-- Name: footer_rels footer_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.footer_rels
    ADD CONSTRAINT footer_rels_pkey PRIMARY KEY (id);


--
-- Name: form_submissions form_submissions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_pkey PRIMARY KEY (id);


--
-- Name: form_submissions_submission_data form_submissions_submission_data_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.form_submissions_submission_data
    ADD CONSTRAINT form_submissions_submission_data_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_checkbox forms_blocks_checkbox_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_checkbox
    ADD CONSTRAINT forms_blocks_checkbox_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_country forms_blocks_country_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_country
    ADD CONSTRAINT forms_blocks_country_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_email forms_blocks_email_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_email
    ADD CONSTRAINT forms_blocks_email_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_message forms_blocks_message_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_message
    ADD CONSTRAINT forms_blocks_message_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_number forms_blocks_number_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_number
    ADD CONSTRAINT forms_blocks_number_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_select_options forms_blocks_select_options_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_select_options
    ADD CONSTRAINT forms_blocks_select_options_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_select forms_blocks_select_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_select
    ADD CONSTRAINT forms_blocks_select_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_state forms_blocks_state_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_state
    ADD CONSTRAINT forms_blocks_state_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_text forms_blocks_text_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_text
    ADD CONSTRAINT forms_blocks_text_pkey PRIMARY KEY (id);


--
-- Name: forms_blocks_textarea forms_blocks_textarea_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_textarea
    ADD CONSTRAINT forms_blocks_textarea_pkey PRIMARY KEY (id);


--
-- Name: forms_emails forms_emails_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_emails
    ADD CONSTRAINT forms_emails_pkey PRIMARY KEY (id);


--
-- Name: forms forms_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (id);


--
-- Name: header_nav_items header_nav_items_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.header_nav_items
    ADD CONSTRAINT header_nav_items_pkey PRIMARY KEY (id);


--
-- Name: header header_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.header
    ADD CONSTRAINT header_pkey PRIMARY KEY (id);


--
-- Name: header_rels header_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.header_rels
    ADD CONSTRAINT header_rels_pkey PRIMARY KEY (id);


--
-- Name: lands_communications lands_communications_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lands_communications
    ADD CONSTRAINT lands_communications_pkey PRIMARY KEY (id);


--
-- Name: lands_images lands_images_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lands_images
    ADD CONSTRAINT lands_images_pkey PRIMARY KEY (id);


--
-- Name: lands lands_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lands
    ADD CONSTRAINT lands_pkey PRIMARY KEY (id);


--
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_about_hero_images pages_blocks_about_hero_images_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_about_hero_images
    ADD CONSTRAINT pages_blocks_about_hero_images_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_about_hero pages_blocks_about_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_about_hero
    ADD CONSTRAINT pages_blocks_about_hero_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_agents pages_blocks_agents_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_agents
    ADD CONSTRAINT pages_blocks_agents_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_amenities_amenities pages_blocks_amenities_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_amenities_amenities
    ADD CONSTRAINT pages_blocks_amenities_amenities_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_amenities pages_blocks_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_amenities
    ADD CONSTRAINT pages_blocks_amenities_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_archive pages_blocks_archive_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_archive
    ADD CONSTRAINT pages_blocks_archive_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_blog pages_blocks_blog_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_blog
    ADD CONSTRAINT pages_blocks_blog_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_call_to_action_new pages_blocks_call_to_action_new_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_call_to_action_new
    ADD CONSTRAINT pages_blocks_call_to_action_new_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_contact_hero pages_blocks_contact_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_contact_hero
    ADD CONSTRAINT pages_blocks_contact_hero_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_contact_us_form pages_blocks_contact_us_form_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_contact_us_form
    ADD CONSTRAINT pages_blocks_contact_us_form_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_content_columns pages_blocks_content_columns_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_content_columns
    ADD CONSTRAINT pages_blocks_content_columns_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_content pages_blocks_content_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_content
    ADD CONSTRAINT pages_blocks_content_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_cta_links pages_blocks_cta_links_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_cta_links
    ADD CONSTRAINT pages_blocks_cta_links_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_cta pages_blocks_cta_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_cta
    ADD CONSTRAINT pages_blocks_cta_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_faq_items pages_blocks_faq_items_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_faq_items
    ADD CONSTRAINT pages_blocks_faq_items_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_faq pages_blocks_faq_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_faq
    ADD CONSTRAINT pages_blocks_faq_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_feature_features pages_blocks_feature_features_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_feature_features
    ADD CONSTRAINT pages_blocks_feature_features_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_feature pages_blocks_feature_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_feature
    ADD CONSTRAINT pages_blocks_feature_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_form_block pages_blocks_form_block_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_form_block
    ADD CONSTRAINT pages_blocks_form_block_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_hero pages_blocks_hero_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_hero
    ADD CONSTRAINT pages_blocks_hero_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_house_filter_filters_fields_options pages_blocks_house_filter_filters_fields_options_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters_fields_options
    ADD CONSTRAINT pages_blocks_house_filter_filters_fields_options_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_house_filter_filters_fields pages_blocks_house_filter_filters_fields_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters_fields
    ADD CONSTRAINT pages_blocks_house_filter_filters_fields_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_house_filter_filters pages_blocks_house_filter_filters_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters
    ADD CONSTRAINT pages_blocks_house_filter_filters_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_house_filter pages_blocks_house_filter_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_house_filter
    ADD CONSTRAINT pages_blocks_house_filter_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_how_it_works pages_blocks_how_it_works_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_how_it_works
    ADD CONSTRAINT pages_blocks_how_it_works_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_how_it_works_steps pages_blocks_how_it_works_steps_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_how_it_works_steps
    ADD CONSTRAINT pages_blocks_how_it_works_steps_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_map pages_blocks_map_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_map
    ADD CONSTRAINT pages_blocks_map_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_media_block pages_blocks_media_block_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_media_block
    ADD CONSTRAINT pages_blocks_media_block_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_navbar_links pages_blocks_navbar_links_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_navbar_links
    ADD CONSTRAINT pages_blocks_navbar_links_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_navbar pages_blocks_navbar_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_navbar
    ADD CONSTRAINT pages_blocks_navbar_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_properties pages_blocks_properties_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_properties
    ADD CONSTRAINT pages_blocks_properties_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_property_features pages_blocks_property_features_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_property_features
    ADD CONSTRAINT pages_blocks_property_features_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_testimonials pages_blocks_testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_testimonials
    ADD CONSTRAINT pages_blocks_testimonials_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_vision_items pages_blocks_vision_items_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_vision_items
    ADD CONSTRAINT pages_blocks_vision_items_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_vision_mission pages_blocks_vision_mission_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_vision_mission
    ADD CONSTRAINT pages_blocks_vision_mission_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_vision_mission_stats pages_blocks_vision_mission_stats_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_vision_mission_stats
    ADD CONSTRAINT pages_blocks_vision_mission_stats_pkey PRIMARY KEY (id);


--
-- Name: pages_blocks_vision pages_blocks_vision_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_vision
    ADD CONSTRAINT pages_blocks_vision_pkey PRIMARY KEY (id);


--
-- Name: pages_hero_links pages_hero_links_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_hero_links
    ADD CONSTRAINT pages_hero_links_pkey PRIMARY KEY (id);


--
-- Name: pages pages_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_pkey PRIMARY KEY (id);


--
-- Name: pages_rels pages_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_jobs_log payload_jobs_log_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_jobs_log
    ADD CONSTRAINT payload_jobs_log_pkey PRIMARY KEY (id);


--
-- Name: payload_jobs payload_jobs_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_jobs
    ADD CONSTRAINT payload_jobs_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents payload_locked_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents
    ADD CONSTRAINT payload_locked_documents_pkey PRIMARY KEY (id);


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pkey PRIMARY KEY (id);


--
-- Name: payload_migrations payload_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_migrations
    ADD CONSTRAINT payload_migrations_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences payload_preferences_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_preferences
    ADD CONSTRAINT payload_preferences_pkey PRIMARY KEY (id);


--
-- Name: payload_preferences_rels payload_preferences_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: posts_rels posts_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.posts_rels
    ADD CONSTRAINT posts_rels_pkey PRIMARY KEY (id);


--
-- Name: properties_features properties_features_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.properties_features
    ADD CONSTRAINT properties_features_pkey PRIMARY KEY (id);


--
-- Name: properties_images properties_images_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.properties_images
    ADD CONSTRAINT properties_images_pkey PRIMARY KEY (id);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- Name: redirects redirects_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.redirects
    ADD CONSTRAINT redirects_pkey PRIMARY KEY (id);


--
-- Name: redirects_rels redirects_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.redirects_rels
    ADD CONSTRAINT redirects_rels_pkey PRIMARY KEY (id);


--
-- Name: residential_complexes_images residential_complexes_images_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.residential_complexes_images
    ADD CONSTRAINT residential_complexes_images_pkey PRIMARY KEY (id);


--
-- Name: residential_complexes_infrastructure residential_complexes_infrastructure_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.residential_complexes_infrastructure
    ADD CONSTRAINT residential_complexes_infrastructure_pkey PRIMARY KEY (id);


--
-- Name: residential_complexes residential_complexes_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.residential_complexes
    ADD CONSTRAINT residential_complexes_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: search_categories search_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.search_categories
    ADD CONSTRAINT search_categories_pkey PRIMARY KEY (id);


--
-- Name: search search_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.search
    ADD CONSTRAINT search_pkey PRIMARY KEY (id);


--
-- Name: search_rels search_rels_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.search_rels
    ADD CONSTRAINT search_rels_pkey PRIMARY KEY (id);


--
-- Name: testimonials testimonials_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_sessions users_sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_pkey PRIMARY KEY (id);


--
-- Name: _pages_v_autosave_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_autosave_idx ON public._pages_v USING btree (autosave);


--
-- Name: _pages_v_blocks_about_hero_images_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_about_hero_images_image_idx ON public._pages_v_blocks_about_hero_images USING btree (image_id);


--
-- Name: _pages_v_blocks_about_hero_images_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_about_hero_images_order_idx ON public._pages_v_blocks_about_hero_images USING btree (_order);


--
-- Name: _pages_v_blocks_about_hero_images_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_about_hero_images_parent_id_idx ON public._pages_v_blocks_about_hero_images USING btree (_parent_id);


--
-- Name: _pages_v_blocks_about_hero_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_about_hero_order_idx ON public._pages_v_blocks_about_hero USING btree (_order);


--
-- Name: _pages_v_blocks_about_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_about_hero_parent_id_idx ON public._pages_v_blocks_about_hero USING btree (_parent_id);


--
-- Name: _pages_v_blocks_about_hero_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_about_hero_path_idx ON public._pages_v_blocks_about_hero USING btree (_path);


--
-- Name: _pages_v_blocks_agents_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_agents_order_idx ON public._pages_v_blocks_agents USING btree (_order);


--
-- Name: _pages_v_blocks_agents_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_agents_parent_id_idx ON public._pages_v_blocks_agents USING btree (_parent_id);


--
-- Name: _pages_v_blocks_agents_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_agents_path_idx ON public._pages_v_blocks_agents USING btree (_path);


--
-- Name: _pages_v_blocks_amenities_amenities_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_amenities_amenities_order_idx ON public._pages_v_blocks_amenities_amenities USING btree (_order);


--
-- Name: _pages_v_blocks_amenities_amenities_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_amenities_amenities_parent_id_idx ON public._pages_v_blocks_amenities_amenities USING btree (_parent_id);


--
-- Name: _pages_v_blocks_amenities_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_amenities_image_idx ON public._pages_v_blocks_amenities USING btree (image_id);


--
-- Name: _pages_v_blocks_amenities_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_amenities_order_idx ON public._pages_v_blocks_amenities USING btree (_order);


--
-- Name: _pages_v_blocks_amenities_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_amenities_parent_id_idx ON public._pages_v_blocks_amenities USING btree (_parent_id);


--
-- Name: _pages_v_blocks_amenities_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_amenities_path_idx ON public._pages_v_blocks_amenities USING btree (_path);


--
-- Name: _pages_v_blocks_archive_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_archive_order_idx ON public._pages_v_blocks_archive USING btree (_order);


--
-- Name: _pages_v_blocks_archive_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_archive_parent_id_idx ON public._pages_v_blocks_archive USING btree (_parent_id);


--
-- Name: _pages_v_blocks_archive_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_archive_path_idx ON public._pages_v_blocks_archive USING btree (_path);


--
-- Name: _pages_v_blocks_blog_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_blog_order_idx ON public._pages_v_blocks_blog USING btree (_order);


--
-- Name: _pages_v_blocks_blog_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_blog_parent_id_idx ON public._pages_v_blocks_blog USING btree (_parent_id);


--
-- Name: _pages_v_blocks_blog_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_blog_path_idx ON public._pages_v_blocks_blog USING btree (_path);


--
-- Name: _pages_v_blocks_call_to_action_new_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_call_to_action_new_order_idx ON public._pages_v_blocks_call_to_action_new USING btree (_order);


--
-- Name: _pages_v_blocks_call_to_action_new_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_call_to_action_new_parent_id_idx ON public._pages_v_blocks_call_to_action_new USING btree (_parent_id);


--
-- Name: _pages_v_blocks_call_to_action_new_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_call_to_action_new_path_idx ON public._pages_v_blocks_call_to_action_new USING btree (_path);


--
-- Name: _pages_v_blocks_contact_hero_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_contact_hero_image_idx ON public._pages_v_blocks_contact_hero USING btree (image_id);


--
-- Name: _pages_v_blocks_contact_hero_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_contact_hero_order_idx ON public._pages_v_blocks_contact_hero USING btree (_order);


--
-- Name: _pages_v_blocks_contact_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_contact_hero_parent_id_idx ON public._pages_v_blocks_contact_hero USING btree (_parent_id);


--
-- Name: _pages_v_blocks_contact_hero_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_contact_hero_path_idx ON public._pages_v_blocks_contact_hero USING btree (_path);


--
-- Name: _pages_v_blocks_contact_us_form_form_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_contact_us_form_form_idx ON public._pages_v_blocks_contact_us_form USING btree (form_id);


--
-- Name: _pages_v_blocks_contact_us_form_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_contact_us_form_order_idx ON public._pages_v_blocks_contact_us_form USING btree (_order);


--
-- Name: _pages_v_blocks_contact_us_form_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_contact_us_form_parent_id_idx ON public._pages_v_blocks_contact_us_form USING btree (_parent_id);


--
-- Name: _pages_v_blocks_contact_us_form_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_contact_us_form_path_idx ON public._pages_v_blocks_contact_us_form USING btree (_path);


--
-- Name: _pages_v_blocks_content_columns_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_content_columns_order_idx ON public._pages_v_blocks_content_columns USING btree (_order);


--
-- Name: _pages_v_blocks_content_columns_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_content_columns_parent_id_idx ON public._pages_v_blocks_content_columns USING btree (_parent_id);


--
-- Name: _pages_v_blocks_content_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_content_order_idx ON public._pages_v_blocks_content USING btree (_order);


--
-- Name: _pages_v_blocks_content_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_content_parent_id_idx ON public._pages_v_blocks_content USING btree (_parent_id);


--
-- Name: _pages_v_blocks_content_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_content_path_idx ON public._pages_v_blocks_content USING btree (_path);


--
-- Name: _pages_v_blocks_cta_links_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_cta_links_order_idx ON public._pages_v_blocks_cta_links USING btree (_order);


--
-- Name: _pages_v_blocks_cta_links_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_cta_links_parent_id_idx ON public._pages_v_blocks_cta_links USING btree (_parent_id);


--
-- Name: _pages_v_blocks_cta_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_cta_order_idx ON public._pages_v_blocks_cta USING btree (_order);


--
-- Name: _pages_v_blocks_cta_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_cta_parent_id_idx ON public._pages_v_blocks_cta USING btree (_parent_id);


--
-- Name: _pages_v_blocks_cta_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_cta_path_idx ON public._pages_v_blocks_cta USING btree (_path);


--
-- Name: _pages_v_blocks_faq_items_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_faq_items_order_idx ON public._pages_v_blocks_faq_items USING btree (_order);


--
-- Name: _pages_v_blocks_faq_items_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_faq_items_parent_id_idx ON public._pages_v_blocks_faq_items USING btree (_parent_id);


--
-- Name: _pages_v_blocks_faq_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_faq_order_idx ON public._pages_v_blocks_faq USING btree (_order);


--
-- Name: _pages_v_blocks_faq_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_faq_parent_id_idx ON public._pages_v_blocks_faq USING btree (_parent_id);


--
-- Name: _pages_v_blocks_faq_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_faq_path_idx ON public._pages_v_blocks_faq USING btree (_path);


--
-- Name: _pages_v_blocks_feature_features_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_feature_features_order_idx ON public._pages_v_blocks_feature_features USING btree (_order);


--
-- Name: _pages_v_blocks_feature_features_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_feature_features_parent_id_idx ON public._pages_v_blocks_feature_features USING btree (_parent_id);


--
-- Name: _pages_v_blocks_feature_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_feature_order_idx ON public._pages_v_blocks_feature USING btree (_order);


--
-- Name: _pages_v_blocks_feature_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_feature_parent_id_idx ON public._pages_v_blocks_feature USING btree (_parent_id);


--
-- Name: _pages_v_blocks_feature_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_feature_path_idx ON public._pages_v_blocks_feature USING btree (_path);


--
-- Name: _pages_v_blocks_form_block_form_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_form_block_form_idx ON public._pages_v_blocks_form_block USING btree (form_id);


--
-- Name: _pages_v_blocks_form_block_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_form_block_order_idx ON public._pages_v_blocks_form_block USING btree (_order);


--
-- Name: _pages_v_blocks_form_block_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_form_block_parent_id_idx ON public._pages_v_blocks_form_block USING btree (_parent_id);


--
-- Name: _pages_v_blocks_form_block_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_form_block_path_idx ON public._pages_v_blocks_form_block USING btree (_path);


--
-- Name: _pages_v_blocks_hero_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_hero_image_idx ON public._pages_v_blocks_hero USING btree (image_id);


--
-- Name: _pages_v_blocks_hero_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_hero_order_idx ON public._pages_v_blocks_hero USING btree (_order);


--
-- Name: _pages_v_blocks_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_hero_parent_id_idx ON public._pages_v_blocks_hero USING btree (_parent_id);


--
-- Name: _pages_v_blocks_hero_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_hero_path_idx ON public._pages_v_blocks_hero USING btree (_path);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_house_filter_filters_fields_options_order_idx ON public._pages_v_blocks_house_filter_filters_fields_options USING btree (_order);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options_parent_id_i; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_house_filter_filters_fields_options_parent_id_i ON public._pages_v_blocks_house_filter_filters_fields_options USING btree (_parent_id);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_house_filter_filters_fields_order_idx ON public._pages_v_blocks_house_filter_filters_fields USING btree (_order);


--
-- Name: _pages_v_blocks_house_filter_filters_fields_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_house_filter_filters_fields_parent_id_idx ON public._pages_v_blocks_house_filter_filters_fields USING btree (_parent_id);


--
-- Name: _pages_v_blocks_house_filter_filters_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_house_filter_filters_order_idx ON public._pages_v_blocks_house_filter_filters USING btree (_order);


--
-- Name: _pages_v_blocks_house_filter_filters_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_house_filter_filters_parent_id_idx ON public._pages_v_blocks_house_filter_filters USING btree (_parent_id);


--
-- Name: _pages_v_blocks_house_filter_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_house_filter_order_idx ON public._pages_v_blocks_house_filter USING btree (_order);


--
-- Name: _pages_v_blocks_house_filter_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_house_filter_parent_id_idx ON public._pages_v_blocks_house_filter USING btree (_parent_id);


--
-- Name: _pages_v_blocks_house_filter_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_house_filter_path_idx ON public._pages_v_blocks_house_filter USING btree (_path);


--
-- Name: _pages_v_blocks_how_it_works_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_how_it_works_order_idx ON public._pages_v_blocks_how_it_works USING btree (_order);


--
-- Name: _pages_v_blocks_how_it_works_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_how_it_works_parent_id_idx ON public._pages_v_blocks_how_it_works USING btree (_parent_id);


--
-- Name: _pages_v_blocks_how_it_works_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_how_it_works_path_idx ON public._pages_v_blocks_how_it_works USING btree (_path);


--
-- Name: _pages_v_blocks_how_it_works_steps_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_how_it_works_steps_order_idx ON public._pages_v_blocks_how_it_works_steps USING btree (_order);


--
-- Name: _pages_v_blocks_how_it_works_steps_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_how_it_works_steps_parent_id_idx ON public._pages_v_blocks_how_it_works_steps USING btree (_parent_id);


--
-- Name: _pages_v_blocks_map_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_map_order_idx ON public._pages_v_blocks_map USING btree (_order);


--
-- Name: _pages_v_blocks_map_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_map_parent_id_idx ON public._pages_v_blocks_map USING btree (_parent_id);


--
-- Name: _pages_v_blocks_map_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_map_path_idx ON public._pages_v_blocks_map USING btree (_path);


--
-- Name: _pages_v_blocks_media_block_media_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_media_block_media_idx ON public._pages_v_blocks_media_block USING btree (media_id);


--
-- Name: _pages_v_blocks_media_block_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_media_block_order_idx ON public._pages_v_blocks_media_block USING btree (_order);


--
-- Name: _pages_v_blocks_media_block_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_media_block_parent_id_idx ON public._pages_v_blocks_media_block USING btree (_parent_id);


--
-- Name: _pages_v_blocks_media_block_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_media_block_path_idx ON public._pages_v_blocks_media_block USING btree (_path);


--
-- Name: _pages_v_blocks_navbar_avatar_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_navbar_avatar_idx ON public._pages_v_blocks_navbar USING btree (avatar_id);


--
-- Name: _pages_v_blocks_navbar_links_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_navbar_links_order_idx ON public._pages_v_blocks_navbar_links USING btree (_order);


--
-- Name: _pages_v_blocks_navbar_links_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_navbar_links_parent_id_idx ON public._pages_v_blocks_navbar_links USING btree (_parent_id);


--
-- Name: _pages_v_blocks_navbar_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_navbar_order_idx ON public._pages_v_blocks_navbar USING btree (_order);


--
-- Name: _pages_v_blocks_navbar_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_navbar_parent_id_idx ON public._pages_v_blocks_navbar USING btree (_parent_id);


--
-- Name: _pages_v_blocks_navbar_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_navbar_path_idx ON public._pages_v_blocks_navbar USING btree (_path);


--
-- Name: _pages_v_blocks_properties_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_properties_order_idx ON public._pages_v_blocks_properties USING btree (_order);


--
-- Name: _pages_v_blocks_properties_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_properties_parent_id_idx ON public._pages_v_blocks_properties USING btree (_parent_id);


--
-- Name: _pages_v_blocks_properties_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_properties_path_idx ON public._pages_v_blocks_properties USING btree (_path);


--
-- Name: _pages_v_blocks_property_features_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_property_features_order_idx ON public._pages_v_blocks_property_features USING btree (_order);


--
-- Name: _pages_v_blocks_property_features_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_property_features_parent_id_idx ON public._pages_v_blocks_property_features USING btree (_parent_id);


--
-- Name: _pages_v_blocks_property_features_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_property_features_path_idx ON public._pages_v_blocks_property_features USING btree (_path);


--
-- Name: _pages_v_blocks_property_features_property_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_property_features_property_idx ON public._pages_v_blocks_property_features USING btree (property_id);


--
-- Name: _pages_v_blocks_testimonials_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_testimonials_order_idx ON public._pages_v_blocks_testimonials USING btree (_order);


--
-- Name: _pages_v_blocks_testimonials_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_testimonials_parent_id_idx ON public._pages_v_blocks_testimonials USING btree (_parent_id);


--
-- Name: _pages_v_blocks_testimonials_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_testimonials_path_idx ON public._pages_v_blocks_testimonials USING btree (_path);


--
-- Name: _pages_v_blocks_vision_items_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_vision_items_order_idx ON public._pages_v_blocks_vision_items USING btree (_order);


--
-- Name: _pages_v_blocks_vision_items_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_vision_items_parent_id_idx ON public._pages_v_blocks_vision_items USING btree (_parent_id);


--
-- Name: _pages_v_blocks_vision_mission_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_vision_mission_order_idx ON public._pages_v_blocks_vision_mission USING btree (_order);


--
-- Name: _pages_v_blocks_vision_mission_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_vision_mission_parent_id_idx ON public._pages_v_blocks_vision_mission USING btree (_parent_id);


--
-- Name: _pages_v_blocks_vision_mission_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_vision_mission_path_idx ON public._pages_v_blocks_vision_mission USING btree (_path);


--
-- Name: _pages_v_blocks_vision_mission_stats_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_vision_mission_stats_order_idx ON public._pages_v_blocks_vision_mission_stats USING btree (_order);


--
-- Name: _pages_v_blocks_vision_mission_stats_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_vision_mission_stats_parent_id_idx ON public._pages_v_blocks_vision_mission_stats USING btree (_parent_id);


--
-- Name: _pages_v_blocks_vision_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_vision_order_idx ON public._pages_v_blocks_vision USING btree (_order);


--
-- Name: _pages_v_blocks_vision_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_vision_parent_id_idx ON public._pages_v_blocks_vision USING btree (_parent_id);


--
-- Name: _pages_v_blocks_vision_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_blocks_vision_path_idx ON public._pages_v_blocks_vision USING btree (_path);


--
-- Name: _pages_v_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_created_at_idx ON public._pages_v USING btree (created_at);


--
-- Name: _pages_v_latest_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_latest_idx ON public._pages_v USING btree (latest);


--
-- Name: _pages_v_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_parent_idx ON public._pages_v USING btree (parent_id);


--
-- Name: _pages_v_rels_agents_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_agents_id_idx ON public._pages_v_rels USING btree (agents_id);


--
-- Name: _pages_v_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_categories_id_idx ON public._pages_v_rels USING btree (categories_id);


--
-- Name: _pages_v_rels_commercial_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_commercial_id_idx ON public._pages_v_rels USING btree (commercial_id);


--
-- Name: _pages_v_rels_flats_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_flats_id_idx ON public._pages_v_rels USING btree (flats_id);


--
-- Name: _pages_v_rels_lands_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_lands_id_idx ON public._pages_v_rels USING btree (lands_id);


--
-- Name: _pages_v_rels_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_order_idx ON public._pages_v_rels USING btree ("order");


--
-- Name: _pages_v_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_pages_id_idx ON public._pages_v_rels USING btree (pages_id);


--
-- Name: _pages_v_rels_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_parent_idx ON public._pages_v_rels USING btree (parent_id);


--
-- Name: _pages_v_rels_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_path_idx ON public._pages_v_rels USING btree (path);


--
-- Name: _pages_v_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_posts_id_idx ON public._pages_v_rels USING btree (posts_id);


--
-- Name: _pages_v_rels_properties_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_properties_id_idx ON public._pages_v_rels USING btree (properties_id);


--
-- Name: _pages_v_rels_residential_complexes_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_residential_complexes_id_idx ON public._pages_v_rels USING btree (residential_complexes_id);


--
-- Name: _pages_v_rels_testimonials_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_rels_testimonials_id_idx ON public._pages_v_rels USING btree (testimonials_id);


--
-- Name: _pages_v_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_updated_at_idx ON public._pages_v USING btree (updated_at);


--
-- Name: _pages_v_version_hero_links_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_version_hero_links_order_idx ON public._pages_v_version_hero_links USING btree (_order);


--
-- Name: _pages_v_version_hero_links_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_version_hero_links_parent_id_idx ON public._pages_v_version_hero_links USING btree (_parent_id);


--
-- Name: _pages_v_version_hero_version_hero_media_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_version_hero_version_hero_media_idx ON public._pages_v USING btree (version_hero_media_id);


--
-- Name: _pages_v_version_meta_version_meta_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_version_meta_version_meta_image_idx ON public._pages_v USING btree (version_meta_image_id);


--
-- Name: _pages_v_version_version__status_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_version_version__status_idx ON public._pages_v USING btree (version__status);


--
-- Name: _pages_v_version_version_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_version_version_created_at_idx ON public._pages_v USING btree (version_created_at);


--
-- Name: _pages_v_version_version_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_version_version_slug_idx ON public._pages_v USING btree (version_slug);


--
-- Name: _pages_v_version_version_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX _pages_v_version_version_updated_at_idx ON public._pages_v USING btree (version_updated_at);


--
-- Name: agents_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX agents_created_at_idx ON public.agents USING btree (created_at);


--
-- Name: agents_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX agents_image_idx ON public.agents USING btree (image_id);


--
-- Name: agents_social_links_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX agents_social_links_order_idx ON public.agents_social_links USING btree (_order);


--
-- Name: agents_social_links_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX agents_social_links_parent_id_idx ON public.agents_social_links USING btree (_parent_id);


--
-- Name: agents_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX agents_updated_at_idx ON public.agents USING btree (updated_at);


--
-- Name: categories_breadcrumbs_doc_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX categories_breadcrumbs_doc_idx ON public.categories_breadcrumbs USING btree (doc_id);


--
-- Name: categories_breadcrumbs_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX categories_breadcrumbs_order_idx ON public.categories_breadcrumbs USING btree (_order);


--
-- Name: categories_breadcrumbs_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX categories_breadcrumbs_parent_id_idx ON public.categories_breadcrumbs USING btree (_parent_id);


--
-- Name: categories_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX categories_created_at_idx ON public.categories USING btree (created_at);


--
-- Name: categories_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX categories_parent_idx ON public.categories USING btree (parent_id);


--
-- Name: categories_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX categories_slug_idx ON public.categories USING btree (slug);


--
-- Name: categories_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX categories_updated_at_idx ON public.categories USING btree (updated_at);


--
-- Name: commercial_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX commercial_created_at_idx ON public.commercial USING btree (created_at);


--
-- Name: commercial_images_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX commercial_images_image_idx ON public.commercial_images USING btree (image_id);


--
-- Name: commercial_images_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX commercial_images_order_idx ON public.commercial_images USING btree (_order);


--
-- Name: commercial_images_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX commercial_images_parent_id_idx ON public.commercial_images USING btree (_parent_id);


--
-- Name: commercial_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX commercial_slug_idx ON public.commercial USING btree (slug);


--
-- Name: commercial_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX commercial_updated_at_idx ON public.commercial USING btree (updated_at);


--
-- Name: commercial_utilities_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX commercial_utilities_order_idx ON public.commercial_utilities USING btree (_order);


--
-- Name: commercial_utilities_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX commercial_utilities_parent_id_idx ON public.commercial_utilities USING btree (_parent_id);


--
-- Name: flats_amenities_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flats_amenities_order_idx ON public.flats_amenities USING btree (_order);


--
-- Name: flats_amenities_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flats_amenities_parent_id_idx ON public.flats_amenities USING btree (_parent_id);


--
-- Name: flats_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flats_created_at_idx ON public.flats USING btree (created_at);


--
-- Name: flats_images_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flats_images_image_idx ON public.flats_images USING btree (image_id);


--
-- Name: flats_images_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flats_images_order_idx ON public.flats_images USING btree (_order);


--
-- Name: flats_images_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flats_images_parent_id_idx ON public.flats_images USING btree (_parent_id);


--
-- Name: flats_layout_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flats_layout_idx ON public.flats USING btree (layout_id);


--
-- Name: flats_realtor_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flats_realtor_idx ON public.flats USING btree (realtor_id);


--
-- Name: flats_residential_complex_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flats_residential_complex_idx ON public.flats USING btree (residential_complex_id);


--
-- Name: flats_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX flats_slug_idx ON public.flats USING btree (slug);


--
-- Name: flats_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX flats_updated_at_idx ON public.flats USING btree (updated_at);


--
-- Name: footer_nav_items_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX footer_nav_items_order_idx ON public.footer_nav_items USING btree (_order);


--
-- Name: footer_nav_items_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX footer_nav_items_parent_id_idx ON public.footer_nav_items USING btree (_parent_id);


--
-- Name: footer_rels_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX footer_rels_order_idx ON public.footer_rels USING btree ("order");


--
-- Name: footer_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX footer_rels_pages_id_idx ON public.footer_rels USING btree (pages_id);


--
-- Name: footer_rels_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX footer_rels_parent_idx ON public.footer_rels USING btree (parent_id);


--
-- Name: footer_rels_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX footer_rels_path_idx ON public.footer_rels USING btree (path);


--
-- Name: footer_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX footer_rels_posts_id_idx ON public.footer_rels USING btree (posts_id);


--
-- Name: form_submissions_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX form_submissions_created_at_idx ON public.form_submissions USING btree (created_at);


--
-- Name: form_submissions_form_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX form_submissions_form_idx ON public.form_submissions USING btree (form_id);


--
-- Name: form_submissions_submission_data_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX form_submissions_submission_data_order_idx ON public.form_submissions_submission_data USING btree (_order);


--
-- Name: form_submissions_submission_data_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX form_submissions_submission_data_parent_id_idx ON public.form_submissions_submission_data USING btree (_parent_id);


--
-- Name: form_submissions_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX form_submissions_updated_at_idx ON public.form_submissions USING btree (updated_at);


--
-- Name: forms_blocks_checkbox_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_checkbox_order_idx ON public.forms_blocks_checkbox USING btree (_order);


--
-- Name: forms_blocks_checkbox_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_checkbox_parent_id_idx ON public.forms_blocks_checkbox USING btree (_parent_id);


--
-- Name: forms_blocks_checkbox_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_checkbox_path_idx ON public.forms_blocks_checkbox USING btree (_path);


--
-- Name: forms_blocks_country_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_country_order_idx ON public.forms_blocks_country USING btree (_order);


--
-- Name: forms_blocks_country_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_country_parent_id_idx ON public.forms_blocks_country USING btree (_parent_id);


--
-- Name: forms_blocks_country_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_country_path_idx ON public.forms_blocks_country USING btree (_path);


--
-- Name: forms_blocks_email_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_email_order_idx ON public.forms_blocks_email USING btree (_order);


--
-- Name: forms_blocks_email_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_email_parent_id_idx ON public.forms_blocks_email USING btree (_parent_id);


--
-- Name: forms_blocks_email_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_email_path_idx ON public.forms_blocks_email USING btree (_path);


--
-- Name: forms_blocks_message_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_message_order_idx ON public.forms_blocks_message USING btree (_order);


--
-- Name: forms_blocks_message_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_message_parent_id_idx ON public.forms_blocks_message USING btree (_parent_id);


--
-- Name: forms_blocks_message_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_message_path_idx ON public.forms_blocks_message USING btree (_path);


--
-- Name: forms_blocks_number_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_number_order_idx ON public.forms_blocks_number USING btree (_order);


--
-- Name: forms_blocks_number_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_number_parent_id_idx ON public.forms_blocks_number USING btree (_parent_id);


--
-- Name: forms_blocks_number_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_number_path_idx ON public.forms_blocks_number USING btree (_path);


--
-- Name: forms_blocks_select_options_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_select_options_order_idx ON public.forms_blocks_select_options USING btree (_order);


--
-- Name: forms_blocks_select_options_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_select_options_parent_id_idx ON public.forms_blocks_select_options USING btree (_parent_id);


--
-- Name: forms_blocks_select_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_select_order_idx ON public.forms_blocks_select USING btree (_order);


--
-- Name: forms_blocks_select_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_select_parent_id_idx ON public.forms_blocks_select USING btree (_parent_id);


--
-- Name: forms_blocks_select_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_select_path_idx ON public.forms_blocks_select USING btree (_path);


--
-- Name: forms_blocks_state_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_state_order_idx ON public.forms_blocks_state USING btree (_order);


--
-- Name: forms_blocks_state_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_state_parent_id_idx ON public.forms_blocks_state USING btree (_parent_id);


--
-- Name: forms_blocks_state_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_state_path_idx ON public.forms_blocks_state USING btree (_path);


--
-- Name: forms_blocks_text_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_text_order_idx ON public.forms_blocks_text USING btree (_order);


--
-- Name: forms_blocks_text_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_text_parent_id_idx ON public.forms_blocks_text USING btree (_parent_id);


--
-- Name: forms_blocks_text_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_text_path_idx ON public.forms_blocks_text USING btree (_path);


--
-- Name: forms_blocks_textarea_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_textarea_order_idx ON public.forms_blocks_textarea USING btree (_order);


--
-- Name: forms_blocks_textarea_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_textarea_parent_id_idx ON public.forms_blocks_textarea USING btree (_parent_id);


--
-- Name: forms_blocks_textarea_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_blocks_textarea_path_idx ON public.forms_blocks_textarea USING btree (_path);


--
-- Name: forms_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_created_at_idx ON public.forms USING btree (created_at);


--
-- Name: forms_emails_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_emails_order_idx ON public.forms_emails USING btree (_order);


--
-- Name: forms_emails_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_emails_parent_id_idx ON public.forms_emails USING btree (_parent_id);


--
-- Name: forms_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX forms_updated_at_idx ON public.forms USING btree (updated_at);


--
-- Name: header_nav_items_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX header_nav_items_order_idx ON public.header_nav_items USING btree (_order);


--
-- Name: header_nav_items_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX header_nav_items_parent_id_idx ON public.header_nav_items USING btree (_parent_id);


--
-- Name: header_rels_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX header_rels_order_idx ON public.header_rels USING btree ("order");


--
-- Name: header_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX header_rels_pages_id_idx ON public.header_rels USING btree (pages_id);


--
-- Name: header_rels_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX header_rels_parent_idx ON public.header_rels USING btree (parent_id);


--
-- Name: header_rels_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX header_rels_path_idx ON public.header_rels USING btree (path);


--
-- Name: header_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX header_rels_posts_id_idx ON public.header_rels USING btree (posts_id);


--
-- Name: lands_communications_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX lands_communications_order_idx ON public.lands_communications USING btree (_order);


--
-- Name: lands_communications_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX lands_communications_parent_id_idx ON public.lands_communications USING btree (_parent_id);


--
-- Name: lands_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX lands_created_at_idx ON public.lands USING btree (created_at);


--
-- Name: lands_images_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX lands_images_image_idx ON public.lands_images USING btree (image_id);


--
-- Name: lands_images_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX lands_images_order_idx ON public.lands_images USING btree (_order);


--
-- Name: lands_images_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX lands_images_parent_id_idx ON public.lands_images USING btree (_parent_id);


--
-- Name: lands_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX lands_slug_idx ON public.lands USING btree (slug);


--
-- Name: lands_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX lands_updated_at_idx ON public.lands USING btree (updated_at);


--
-- Name: media_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX media_created_at_idx ON public.media USING btree (created_at);


--
-- Name: media_filename_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX media_filename_idx ON public.media USING btree (filename);


--
-- Name: media_sizes_large_sizes_large_filename_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX media_sizes_large_sizes_large_filename_idx ON public.media USING btree (sizes_large_filename);


--
-- Name: media_sizes_medium_sizes_medium_filename_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX media_sizes_medium_sizes_medium_filename_idx ON public.media USING btree (sizes_medium_filename);


--
-- Name: media_sizes_og_sizes_og_filename_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX media_sizes_og_sizes_og_filename_idx ON public.media USING btree (sizes_og_filename);


--
-- Name: media_sizes_small_sizes_small_filename_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX media_sizes_small_sizes_small_filename_idx ON public.media USING btree (sizes_small_filename);


--
-- Name: media_sizes_square_sizes_square_filename_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX media_sizes_square_sizes_square_filename_idx ON public.media USING btree (sizes_square_filename);


--
-- Name: media_sizes_thumbnail_sizes_thumbnail_filename_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX media_sizes_thumbnail_sizes_thumbnail_filename_idx ON public.media USING btree (sizes_thumbnail_filename);


--
-- Name: media_sizes_xlarge_sizes_xlarge_filename_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX media_sizes_xlarge_sizes_xlarge_filename_idx ON public.media USING btree (sizes_xlarge_filename);


--
-- Name: media_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX media_updated_at_idx ON public.media USING btree (updated_at);


--
-- Name: messages_attachment_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX messages_attachment_idx ON public.messages USING btree (attachment_id);


--
-- Name: messages_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX messages_created_at_idx ON public.messages USING btree (created_at);


--
-- Name: messages_realtor_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX messages_realtor_idx ON public.messages USING btree (realtor_id);


--
-- Name: messages_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX messages_updated_at_idx ON public.messages USING btree (updated_at);


--
-- Name: pages__status_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages__status_idx ON public.pages USING btree (_status);


--
-- Name: pages_blocks_about_hero_images_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_about_hero_images_image_idx ON public.pages_blocks_about_hero_images USING btree (image_id);


--
-- Name: pages_blocks_about_hero_images_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_about_hero_images_order_idx ON public.pages_blocks_about_hero_images USING btree (_order);


--
-- Name: pages_blocks_about_hero_images_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_about_hero_images_parent_id_idx ON public.pages_blocks_about_hero_images USING btree (_parent_id);


--
-- Name: pages_blocks_about_hero_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_about_hero_order_idx ON public.pages_blocks_about_hero USING btree (_order);


--
-- Name: pages_blocks_about_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_about_hero_parent_id_idx ON public.pages_blocks_about_hero USING btree (_parent_id);


--
-- Name: pages_blocks_about_hero_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_about_hero_path_idx ON public.pages_blocks_about_hero USING btree (_path);


--
-- Name: pages_blocks_agents_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_agents_order_idx ON public.pages_blocks_agents USING btree (_order);


--
-- Name: pages_blocks_agents_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_agents_parent_id_idx ON public.pages_blocks_agents USING btree (_parent_id);


--
-- Name: pages_blocks_agents_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_agents_path_idx ON public.pages_blocks_agents USING btree (_path);


--
-- Name: pages_blocks_amenities_amenities_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_amenities_amenities_order_idx ON public.pages_blocks_amenities_amenities USING btree (_order);


--
-- Name: pages_blocks_amenities_amenities_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_amenities_amenities_parent_id_idx ON public.pages_blocks_amenities_amenities USING btree (_parent_id);


--
-- Name: pages_blocks_amenities_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_amenities_image_idx ON public.pages_blocks_amenities USING btree (image_id);


--
-- Name: pages_blocks_amenities_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_amenities_order_idx ON public.pages_blocks_amenities USING btree (_order);


--
-- Name: pages_blocks_amenities_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_amenities_parent_id_idx ON public.pages_blocks_amenities USING btree (_parent_id);


--
-- Name: pages_blocks_amenities_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_amenities_path_idx ON public.pages_blocks_amenities USING btree (_path);


--
-- Name: pages_blocks_archive_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_archive_order_idx ON public.pages_blocks_archive USING btree (_order);


--
-- Name: pages_blocks_archive_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_archive_parent_id_idx ON public.pages_blocks_archive USING btree (_parent_id);


--
-- Name: pages_blocks_archive_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_archive_path_idx ON public.pages_blocks_archive USING btree (_path);


--
-- Name: pages_blocks_blog_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_blog_order_idx ON public.pages_blocks_blog USING btree (_order);


--
-- Name: pages_blocks_blog_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_blog_parent_id_idx ON public.pages_blocks_blog USING btree (_parent_id);


--
-- Name: pages_blocks_blog_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_blog_path_idx ON public.pages_blocks_blog USING btree (_path);


--
-- Name: pages_blocks_call_to_action_new_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_call_to_action_new_order_idx ON public.pages_blocks_call_to_action_new USING btree (_order);


--
-- Name: pages_blocks_call_to_action_new_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_call_to_action_new_parent_id_idx ON public.pages_blocks_call_to_action_new USING btree (_parent_id);


--
-- Name: pages_blocks_call_to_action_new_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_call_to_action_new_path_idx ON public.pages_blocks_call_to_action_new USING btree (_path);


--
-- Name: pages_blocks_contact_hero_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_contact_hero_image_idx ON public.pages_blocks_contact_hero USING btree (image_id);


--
-- Name: pages_blocks_contact_hero_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_contact_hero_order_idx ON public.pages_blocks_contact_hero USING btree (_order);


--
-- Name: pages_blocks_contact_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_contact_hero_parent_id_idx ON public.pages_blocks_contact_hero USING btree (_parent_id);


--
-- Name: pages_blocks_contact_hero_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_contact_hero_path_idx ON public.pages_blocks_contact_hero USING btree (_path);


--
-- Name: pages_blocks_contact_us_form_form_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_contact_us_form_form_idx ON public.pages_blocks_contact_us_form USING btree (form_id);


--
-- Name: pages_blocks_contact_us_form_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_contact_us_form_order_idx ON public.pages_blocks_contact_us_form USING btree (_order);


--
-- Name: pages_blocks_contact_us_form_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_contact_us_form_parent_id_idx ON public.pages_blocks_contact_us_form USING btree (_parent_id);


--
-- Name: pages_blocks_contact_us_form_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_contact_us_form_path_idx ON public.pages_blocks_contact_us_form USING btree (_path);


--
-- Name: pages_blocks_content_columns_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_content_columns_order_idx ON public.pages_blocks_content_columns USING btree (_order);


--
-- Name: pages_blocks_content_columns_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_content_columns_parent_id_idx ON public.pages_blocks_content_columns USING btree (_parent_id);


--
-- Name: pages_blocks_content_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_content_order_idx ON public.pages_blocks_content USING btree (_order);


--
-- Name: pages_blocks_content_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_content_parent_id_idx ON public.pages_blocks_content USING btree (_parent_id);


--
-- Name: pages_blocks_content_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_content_path_idx ON public.pages_blocks_content USING btree (_path);


--
-- Name: pages_blocks_cta_links_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_cta_links_order_idx ON public.pages_blocks_cta_links USING btree (_order);


--
-- Name: pages_blocks_cta_links_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_cta_links_parent_id_idx ON public.pages_blocks_cta_links USING btree (_parent_id);


--
-- Name: pages_blocks_cta_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_cta_order_idx ON public.pages_blocks_cta USING btree (_order);


--
-- Name: pages_blocks_cta_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_cta_parent_id_idx ON public.pages_blocks_cta USING btree (_parent_id);


--
-- Name: pages_blocks_cta_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_cta_path_idx ON public.pages_blocks_cta USING btree (_path);


--
-- Name: pages_blocks_faq_items_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_faq_items_order_idx ON public.pages_blocks_faq_items USING btree (_order);


--
-- Name: pages_blocks_faq_items_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_faq_items_parent_id_idx ON public.pages_blocks_faq_items USING btree (_parent_id);


--
-- Name: pages_blocks_faq_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_faq_order_idx ON public.pages_blocks_faq USING btree (_order);


--
-- Name: pages_blocks_faq_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_faq_parent_id_idx ON public.pages_blocks_faq USING btree (_parent_id);


--
-- Name: pages_blocks_faq_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_faq_path_idx ON public.pages_blocks_faq USING btree (_path);


--
-- Name: pages_blocks_feature_features_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_feature_features_order_idx ON public.pages_blocks_feature_features USING btree (_order);


--
-- Name: pages_blocks_feature_features_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_feature_features_parent_id_idx ON public.pages_blocks_feature_features USING btree (_parent_id);


--
-- Name: pages_blocks_feature_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_feature_order_idx ON public.pages_blocks_feature USING btree (_order);


--
-- Name: pages_blocks_feature_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_feature_parent_id_idx ON public.pages_blocks_feature USING btree (_parent_id);


--
-- Name: pages_blocks_feature_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_feature_path_idx ON public.pages_blocks_feature USING btree (_path);


--
-- Name: pages_blocks_form_block_form_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_form_block_form_idx ON public.pages_blocks_form_block USING btree (form_id);


--
-- Name: pages_blocks_form_block_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_form_block_order_idx ON public.pages_blocks_form_block USING btree (_order);


--
-- Name: pages_blocks_form_block_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_form_block_parent_id_idx ON public.pages_blocks_form_block USING btree (_parent_id);


--
-- Name: pages_blocks_form_block_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_form_block_path_idx ON public.pages_blocks_form_block USING btree (_path);


--
-- Name: pages_blocks_hero_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_hero_image_idx ON public.pages_blocks_hero USING btree (image_id);


--
-- Name: pages_blocks_hero_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_hero_order_idx ON public.pages_blocks_hero USING btree (_order);


--
-- Name: pages_blocks_hero_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_hero_parent_id_idx ON public.pages_blocks_hero USING btree (_parent_id);


--
-- Name: pages_blocks_hero_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_hero_path_idx ON public.pages_blocks_hero USING btree (_path);


--
-- Name: pages_blocks_house_filter_filters_fields_options_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_house_filter_filters_fields_options_order_idx ON public.pages_blocks_house_filter_filters_fields_options USING btree (_order);


--
-- Name: pages_blocks_house_filter_filters_fields_options_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_house_filter_filters_fields_options_parent_id_idx ON public.pages_blocks_house_filter_filters_fields_options USING btree (_parent_id);


--
-- Name: pages_blocks_house_filter_filters_fields_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_house_filter_filters_fields_order_idx ON public.pages_blocks_house_filter_filters_fields USING btree (_order);


--
-- Name: pages_blocks_house_filter_filters_fields_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_house_filter_filters_fields_parent_id_idx ON public.pages_blocks_house_filter_filters_fields USING btree (_parent_id);


--
-- Name: pages_blocks_house_filter_filters_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_house_filter_filters_order_idx ON public.pages_blocks_house_filter_filters USING btree (_order);


--
-- Name: pages_blocks_house_filter_filters_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_house_filter_filters_parent_id_idx ON public.pages_blocks_house_filter_filters USING btree (_parent_id);


--
-- Name: pages_blocks_house_filter_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_house_filter_order_idx ON public.pages_blocks_house_filter USING btree (_order);


--
-- Name: pages_blocks_house_filter_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_house_filter_parent_id_idx ON public.pages_blocks_house_filter USING btree (_parent_id);


--
-- Name: pages_blocks_house_filter_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_house_filter_path_idx ON public.pages_blocks_house_filter USING btree (_path);


--
-- Name: pages_blocks_how_it_works_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_how_it_works_order_idx ON public.pages_blocks_how_it_works USING btree (_order);


--
-- Name: pages_blocks_how_it_works_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_how_it_works_parent_id_idx ON public.pages_blocks_how_it_works USING btree (_parent_id);


--
-- Name: pages_blocks_how_it_works_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_how_it_works_path_idx ON public.pages_blocks_how_it_works USING btree (_path);


--
-- Name: pages_blocks_how_it_works_steps_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_how_it_works_steps_order_idx ON public.pages_blocks_how_it_works_steps USING btree (_order);


--
-- Name: pages_blocks_how_it_works_steps_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_how_it_works_steps_parent_id_idx ON public.pages_blocks_how_it_works_steps USING btree (_parent_id);


--
-- Name: pages_blocks_map_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_map_order_idx ON public.pages_blocks_map USING btree (_order);


--
-- Name: pages_blocks_map_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_map_parent_id_idx ON public.pages_blocks_map USING btree (_parent_id);


--
-- Name: pages_blocks_map_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_map_path_idx ON public.pages_blocks_map USING btree (_path);


--
-- Name: pages_blocks_media_block_media_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_media_block_media_idx ON public.pages_blocks_media_block USING btree (media_id);


--
-- Name: pages_blocks_media_block_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_media_block_order_idx ON public.pages_blocks_media_block USING btree (_order);


--
-- Name: pages_blocks_media_block_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_media_block_parent_id_idx ON public.pages_blocks_media_block USING btree (_parent_id);


--
-- Name: pages_blocks_media_block_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_media_block_path_idx ON public.pages_blocks_media_block USING btree (_path);


--
-- Name: pages_blocks_navbar_avatar_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_navbar_avatar_idx ON public.pages_blocks_navbar USING btree (avatar_id);


--
-- Name: pages_blocks_navbar_links_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_navbar_links_order_idx ON public.pages_blocks_navbar_links USING btree (_order);


--
-- Name: pages_blocks_navbar_links_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_navbar_links_parent_id_idx ON public.pages_blocks_navbar_links USING btree (_parent_id);


--
-- Name: pages_blocks_navbar_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_navbar_order_idx ON public.pages_blocks_navbar USING btree (_order);


--
-- Name: pages_blocks_navbar_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_navbar_parent_id_idx ON public.pages_blocks_navbar USING btree (_parent_id);


--
-- Name: pages_blocks_navbar_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_navbar_path_idx ON public.pages_blocks_navbar USING btree (_path);


--
-- Name: pages_blocks_properties_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_properties_order_idx ON public.pages_blocks_properties USING btree (_order);


--
-- Name: pages_blocks_properties_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_properties_parent_id_idx ON public.pages_blocks_properties USING btree (_parent_id);


--
-- Name: pages_blocks_properties_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_properties_path_idx ON public.pages_blocks_properties USING btree (_path);


--
-- Name: pages_blocks_property_features_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_property_features_order_idx ON public.pages_blocks_property_features USING btree (_order);


--
-- Name: pages_blocks_property_features_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_property_features_parent_id_idx ON public.pages_blocks_property_features USING btree (_parent_id);


--
-- Name: pages_blocks_property_features_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_property_features_path_idx ON public.pages_blocks_property_features USING btree (_path);


--
-- Name: pages_blocks_property_features_property_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_property_features_property_idx ON public.pages_blocks_property_features USING btree (property_id);


--
-- Name: pages_blocks_testimonials_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_testimonials_order_idx ON public.pages_blocks_testimonials USING btree (_order);


--
-- Name: pages_blocks_testimonials_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_testimonials_parent_id_idx ON public.pages_blocks_testimonials USING btree (_parent_id);


--
-- Name: pages_blocks_testimonials_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_testimonials_path_idx ON public.pages_blocks_testimonials USING btree (_path);


--
-- Name: pages_blocks_vision_items_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_vision_items_order_idx ON public.pages_blocks_vision_items USING btree (_order);


--
-- Name: pages_blocks_vision_items_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_vision_items_parent_id_idx ON public.pages_blocks_vision_items USING btree (_parent_id);


--
-- Name: pages_blocks_vision_mission_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_vision_mission_order_idx ON public.pages_blocks_vision_mission USING btree (_order);


--
-- Name: pages_blocks_vision_mission_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_vision_mission_parent_id_idx ON public.pages_blocks_vision_mission USING btree (_parent_id);


--
-- Name: pages_blocks_vision_mission_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_vision_mission_path_idx ON public.pages_blocks_vision_mission USING btree (_path);


--
-- Name: pages_blocks_vision_mission_stats_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_vision_mission_stats_order_idx ON public.pages_blocks_vision_mission_stats USING btree (_order);


--
-- Name: pages_blocks_vision_mission_stats_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_vision_mission_stats_parent_id_idx ON public.pages_blocks_vision_mission_stats USING btree (_parent_id);


--
-- Name: pages_blocks_vision_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_vision_order_idx ON public.pages_blocks_vision USING btree (_order);


--
-- Name: pages_blocks_vision_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_vision_parent_id_idx ON public.pages_blocks_vision USING btree (_parent_id);


--
-- Name: pages_blocks_vision_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_blocks_vision_path_idx ON public.pages_blocks_vision USING btree (_path);


--
-- Name: pages_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_created_at_idx ON public.pages USING btree (created_at);


--
-- Name: pages_hero_hero_media_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_hero_hero_media_idx ON public.pages USING btree (hero_media_id);


--
-- Name: pages_hero_links_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_hero_links_order_idx ON public.pages_hero_links USING btree (_order);


--
-- Name: pages_hero_links_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_hero_links_parent_id_idx ON public.pages_hero_links USING btree (_parent_id);


--
-- Name: pages_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_meta_meta_image_idx ON public.pages USING btree (meta_image_id);


--
-- Name: pages_rels_agents_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_agents_id_idx ON public.pages_rels USING btree (agents_id);


--
-- Name: pages_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_categories_id_idx ON public.pages_rels USING btree (categories_id);


--
-- Name: pages_rels_commercial_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_commercial_id_idx ON public.pages_rels USING btree (commercial_id);


--
-- Name: pages_rels_flats_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_flats_id_idx ON public.pages_rels USING btree (flats_id);


--
-- Name: pages_rels_lands_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_lands_id_idx ON public.pages_rels USING btree (lands_id);


--
-- Name: pages_rels_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_order_idx ON public.pages_rels USING btree ("order");


--
-- Name: pages_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_pages_id_idx ON public.pages_rels USING btree (pages_id);


--
-- Name: pages_rels_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_parent_idx ON public.pages_rels USING btree (parent_id);


--
-- Name: pages_rels_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_path_idx ON public.pages_rels USING btree (path);


--
-- Name: pages_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_posts_id_idx ON public.pages_rels USING btree (posts_id);


--
-- Name: pages_rels_properties_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_properties_id_idx ON public.pages_rels USING btree (properties_id);


--
-- Name: pages_rels_residential_complexes_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_residential_complexes_id_idx ON public.pages_rels USING btree (residential_complexes_id);


--
-- Name: pages_rels_testimonials_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_rels_testimonials_id_idx ON public.pages_rels USING btree (testimonials_id);


--
-- Name: pages_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_slug_idx ON public.pages USING btree (slug);


--
-- Name: pages_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX pages_updated_at_idx ON public.pages USING btree (updated_at);


--
-- Name: payload_jobs_completed_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_completed_at_idx ON public.payload_jobs USING btree (completed_at);


--
-- Name: payload_jobs_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_created_at_idx ON public.payload_jobs USING btree (created_at);


--
-- Name: payload_jobs_has_error_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_has_error_idx ON public.payload_jobs USING btree (has_error);


--
-- Name: payload_jobs_log_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_log_order_idx ON public.payload_jobs_log USING btree (_order);


--
-- Name: payload_jobs_log_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_log_parent_id_idx ON public.payload_jobs_log USING btree (_parent_id);


--
-- Name: payload_jobs_processing_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_processing_idx ON public.payload_jobs USING btree (processing);


--
-- Name: payload_jobs_queue_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_queue_idx ON public.payload_jobs USING btree (queue);


--
-- Name: payload_jobs_task_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_task_slug_idx ON public.payload_jobs USING btree (task_slug);


--
-- Name: payload_jobs_total_tried_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_total_tried_idx ON public.payload_jobs USING btree (total_tried);


--
-- Name: payload_jobs_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_updated_at_idx ON public.payload_jobs USING btree (updated_at);


--
-- Name: payload_jobs_wait_until_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_jobs_wait_until_idx ON public.payload_jobs USING btree (wait_until);


--
-- Name: payload_locked_documents_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_created_at_idx ON public.payload_locked_documents USING btree (created_at);


--
-- Name: payload_locked_documents_global_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_global_slug_idx ON public.payload_locked_documents USING btree (global_slug);


--
-- Name: payload_locked_documents_rels_agents_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_agents_id_idx ON public.payload_locked_documents_rels USING btree (agents_id);


--
-- Name: payload_locked_documents_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_categories_id_idx ON public.payload_locked_documents_rels USING btree (categories_id);


--
-- Name: payload_locked_documents_rels_commercial_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_commercial_id_idx ON public.payload_locked_documents_rels USING btree (commercial_id);


--
-- Name: payload_locked_documents_rels_flats_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_flats_id_idx ON public.payload_locked_documents_rels USING btree (flats_id);


--
-- Name: payload_locked_documents_rels_form_submissions_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_form_submissions_id_idx ON public.payload_locked_documents_rels USING btree (form_submissions_id);


--
-- Name: payload_locked_documents_rels_forms_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_forms_id_idx ON public.payload_locked_documents_rels USING btree (forms_id);


--
-- Name: payload_locked_documents_rels_lands_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_lands_id_idx ON public.payload_locked_documents_rels USING btree (lands_id);


--
-- Name: payload_locked_documents_rels_media_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_media_id_idx ON public.payload_locked_documents_rels USING btree (media_id);


--
-- Name: payload_locked_documents_rels_messages_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_messages_id_idx ON public.payload_locked_documents_rels USING btree (messages_id);


--
-- Name: payload_locked_documents_rels_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_order_idx ON public.payload_locked_documents_rels USING btree ("order");


--
-- Name: payload_locked_documents_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_pages_id_idx ON public.payload_locked_documents_rels USING btree (pages_id);


--
-- Name: payload_locked_documents_rels_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_parent_idx ON public.payload_locked_documents_rels USING btree (parent_id);


--
-- Name: payload_locked_documents_rels_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_path_idx ON public.payload_locked_documents_rels USING btree (path);


--
-- Name: payload_locked_documents_rels_payload_jobs_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_payload_jobs_id_idx ON public.payload_locked_documents_rels USING btree (payload_jobs_id);


--
-- Name: payload_locked_documents_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_posts_id_idx ON public.payload_locked_documents_rels USING btree (posts_id);


--
-- Name: payload_locked_documents_rels_properties_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_properties_id_idx ON public.payload_locked_documents_rels USING btree (properties_id);


--
-- Name: payload_locked_documents_rels_redirects_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_redirects_id_idx ON public.payload_locked_documents_rels USING btree (redirects_id);


--
-- Name: payload_locked_documents_rels_residential_complexes_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_residential_complexes_id_idx ON public.payload_locked_documents_rels USING btree (residential_complexes_id);


--
-- Name: payload_locked_documents_rels_reviews_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_reviews_id_idx ON public.payload_locked_documents_rels USING btree (reviews_id);


--
-- Name: payload_locked_documents_rels_search_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_search_id_idx ON public.payload_locked_documents_rels USING btree (search_id);


--
-- Name: payload_locked_documents_rels_testimonials_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_testimonials_id_idx ON public.payload_locked_documents_rels USING btree (testimonials_id);


--
-- Name: payload_locked_documents_rels_users_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_rels_users_id_idx ON public.payload_locked_documents_rels USING btree (users_id);


--
-- Name: payload_locked_documents_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_locked_documents_updated_at_idx ON public.payload_locked_documents USING btree (updated_at);


--
-- Name: payload_migrations_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_migrations_created_at_idx ON public.payload_migrations USING btree (created_at);


--
-- Name: payload_migrations_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_migrations_updated_at_idx ON public.payload_migrations USING btree (updated_at);


--
-- Name: payload_preferences_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_preferences_created_at_idx ON public.payload_preferences USING btree (created_at);


--
-- Name: payload_preferences_key_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_preferences_key_idx ON public.payload_preferences USING btree (key);


--
-- Name: payload_preferences_rels_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_preferences_rels_order_idx ON public.payload_preferences_rels USING btree ("order");


--
-- Name: payload_preferences_rels_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_preferences_rels_parent_idx ON public.payload_preferences_rels USING btree (parent_id);


--
-- Name: payload_preferences_rels_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_preferences_rels_path_idx ON public.payload_preferences_rels USING btree (path);


--
-- Name: payload_preferences_rels_users_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_preferences_rels_users_id_idx ON public.payload_preferences_rels USING btree (users_id);


--
-- Name: payload_preferences_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX payload_preferences_updated_at_idx ON public.payload_preferences USING btree (updated_at);


--
-- Name: posts_author_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX posts_author_idx ON public.posts USING btree (author_id);


--
-- Name: posts_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX posts_created_at_idx ON public.posts USING btree (created_at);


--
-- Name: posts_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX posts_image_idx ON public.posts USING btree (image_id);


--
-- Name: posts_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX posts_meta_meta_image_idx ON public.posts USING btree (meta_image_id);


--
-- Name: posts_rels_categories_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX posts_rels_categories_id_idx ON public.posts_rels USING btree (categories_id);


--
-- Name: posts_rels_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX posts_rels_order_idx ON public.posts_rels USING btree ("order");


--
-- Name: posts_rels_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX posts_rels_parent_idx ON public.posts_rels USING btree (parent_id);


--
-- Name: posts_rels_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX posts_rels_path_idx ON public.posts_rels USING btree (path);


--
-- Name: posts_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX posts_updated_at_idx ON public.posts USING btree (updated_at);


--
-- Name: properties_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX properties_created_at_idx ON public.properties USING btree (created_at);


--
-- Name: properties_features_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX properties_features_order_idx ON public.properties_features USING btree (_order);


--
-- Name: properties_features_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX properties_features_parent_id_idx ON public.properties_features USING btree (_parent_id);


--
-- Name: properties_images_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX properties_images_image_idx ON public.properties_images USING btree (image_id);


--
-- Name: properties_images_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX properties_images_order_idx ON public.properties_images USING btree (_order);


--
-- Name: properties_images_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX properties_images_parent_id_idx ON public.properties_images USING btree (_parent_id);


--
-- Name: properties_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX properties_slug_idx ON public.properties USING btree (slug);


--
-- Name: properties_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX properties_updated_at_idx ON public.properties USING btree (updated_at);


--
-- Name: redirects_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX redirects_created_at_idx ON public.redirects USING btree (created_at);


--
-- Name: redirects_from_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX redirects_from_idx ON public.redirects USING btree ("from");


--
-- Name: redirects_rels_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX redirects_rels_order_idx ON public.redirects_rels USING btree ("order");


--
-- Name: redirects_rels_pages_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX redirects_rels_pages_id_idx ON public.redirects_rels USING btree (pages_id);


--
-- Name: redirects_rels_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX redirects_rels_parent_idx ON public.redirects_rels USING btree (parent_id);


--
-- Name: redirects_rels_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX redirects_rels_path_idx ON public.redirects_rels USING btree (path);


--
-- Name: redirects_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX redirects_rels_posts_id_idx ON public.redirects_rels USING btree (posts_id);


--
-- Name: redirects_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX redirects_updated_at_idx ON public.redirects USING btree (updated_at);


--
-- Name: residential_complexes_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX residential_complexes_created_at_idx ON public.residential_complexes USING btree (created_at);


--
-- Name: residential_complexes_images_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX residential_complexes_images_image_idx ON public.residential_complexes_images USING btree (image_id);


--
-- Name: residential_complexes_images_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX residential_complexes_images_order_idx ON public.residential_complexes_images USING btree (_order);


--
-- Name: residential_complexes_images_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX residential_complexes_images_parent_id_idx ON public.residential_complexes_images USING btree (_parent_id);


--
-- Name: residential_complexes_infrastructure_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX residential_complexes_infrastructure_order_idx ON public.residential_complexes_infrastructure USING btree (_order);


--
-- Name: residential_complexes_infrastructure_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX residential_complexes_infrastructure_parent_id_idx ON public.residential_complexes_infrastructure USING btree (_parent_id);


--
-- Name: residential_complexes_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX residential_complexes_slug_idx ON public.residential_complexes USING btree (slug);


--
-- Name: residential_complexes_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX residential_complexes_updated_at_idx ON public.residential_complexes USING btree (updated_at);


--
-- Name: reviews_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX reviews_created_at_idx ON public.reviews USING btree (created_at);


--
-- Name: reviews_realtor_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX reviews_realtor_idx ON public.reviews USING btree (realtor_id);


--
-- Name: reviews_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX reviews_updated_at_idx ON public.reviews USING btree (updated_at);


--
-- Name: search_categories_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX search_categories_order_idx ON public.search_categories USING btree (_order);


--
-- Name: search_categories_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX search_categories_parent_id_idx ON public.search_categories USING btree (_parent_id);


--
-- Name: search_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX search_created_at_idx ON public.search USING btree (created_at);


--
-- Name: search_meta_meta_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX search_meta_meta_image_idx ON public.search USING btree (meta_image_id);


--
-- Name: search_rels_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX search_rels_order_idx ON public.search_rels USING btree ("order");


--
-- Name: search_rels_parent_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX search_rels_parent_idx ON public.search_rels USING btree (parent_id);


--
-- Name: search_rels_path_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX search_rels_path_idx ON public.search_rels USING btree (path);


--
-- Name: search_rels_posts_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX search_rels_posts_id_idx ON public.search_rels USING btree (posts_id);


--
-- Name: search_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX search_slug_idx ON public.search USING btree (slug);


--
-- Name: search_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX search_updated_at_idx ON public.search USING btree (updated_at);


--
-- Name: testimonials_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX testimonials_created_at_idx ON public.testimonials USING btree (created_at);


--
-- Name: testimonials_image_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX testimonials_image_idx ON public.testimonials USING btree (image_id);


--
-- Name: testimonials_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX testimonials_updated_at_idx ON public.testimonials USING btree (updated_at);


--
-- Name: users_created_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_created_at_idx ON public.users USING btree (created_at);


--
-- Name: users_email_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX users_email_idx ON public.users USING btree (email);


--
-- Name: users_photo_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_photo_idx ON public.users USING btree (photo_id);


--
-- Name: users_sessions_order_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_sessions_order_idx ON public.users_sessions USING btree (_order);


--
-- Name: users_sessions_parent_id_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_sessions_parent_id_idx ON public.users_sessions USING btree (_parent_id);


--
-- Name: users_slug_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX users_slug_idx ON public.users USING btree (slug);


--
-- Name: users_updated_at_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX users_updated_at_idx ON public.users USING btree (updated_at);


--
-- Name: _pages_v_blocks_about_hero_images _pages_v_blocks_about_hero_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero_images
    ADD CONSTRAINT _pages_v_blocks_about_hero_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_about_hero_images _pages_v_blocks_about_hero_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero_images
    ADD CONSTRAINT _pages_v_blocks_about_hero_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_about_hero(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_about_hero _pages_v_blocks_about_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_about_hero
    ADD CONSTRAINT _pages_v_blocks_about_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_agents _pages_v_blocks_agents_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_agents
    ADD CONSTRAINT _pages_v_blocks_agents_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_amenities_amenities _pages_v_blocks_amenities_amenities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_amenities_amenities
    ADD CONSTRAINT _pages_v_blocks_amenities_amenities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_amenities(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_amenities _pages_v_blocks_amenities_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_amenities
    ADD CONSTRAINT _pages_v_blocks_amenities_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_amenities _pages_v_blocks_amenities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_amenities
    ADD CONSTRAINT _pages_v_blocks_amenities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_archive _pages_v_blocks_archive_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_archive
    ADD CONSTRAINT _pages_v_blocks_archive_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_blog _pages_v_blocks_blog_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_blog
    ADD CONSTRAINT _pages_v_blocks_blog_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_call_to_action_new _pages_v_blocks_call_to_action_new_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_call_to_action_new
    ADD CONSTRAINT _pages_v_blocks_call_to_action_new_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_contact_hero _pages_v_blocks_contact_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_contact_hero
    ADD CONSTRAINT _pages_v_blocks_contact_hero_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_contact_hero _pages_v_blocks_contact_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_contact_hero
    ADD CONSTRAINT _pages_v_blocks_contact_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_contact_us_form _pages_v_blocks_contact_us_form_form_id_forms_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_contact_us_form
    ADD CONSTRAINT _pages_v_blocks_contact_us_form_form_id_forms_id_fk FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_contact_us_form _pages_v_blocks_contact_us_form_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_contact_us_form
    ADD CONSTRAINT _pages_v_blocks_contact_us_form_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_content_columns _pages_v_blocks_content_columns_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_content_columns
    ADD CONSTRAINT _pages_v_blocks_content_columns_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_content(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_content _pages_v_blocks_content_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_content
    ADD CONSTRAINT _pages_v_blocks_content_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_cta_links _pages_v_blocks_cta_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_cta_links
    ADD CONSTRAINT _pages_v_blocks_cta_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_cta(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_cta _pages_v_blocks_cta_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_cta
    ADD CONSTRAINT _pages_v_blocks_cta_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_faq_items _pages_v_blocks_faq_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_faq_items
    ADD CONSTRAINT _pages_v_blocks_faq_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_faq(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_faq _pages_v_blocks_faq_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_faq
    ADD CONSTRAINT _pages_v_blocks_faq_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_feature_features _pages_v_blocks_feature_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_feature_features
    ADD CONSTRAINT _pages_v_blocks_feature_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_feature(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_feature _pages_v_blocks_feature_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_feature
    ADD CONSTRAINT _pages_v_blocks_feature_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_form_block _pages_v_blocks_form_block_form_id_forms_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_form_block
    ADD CONSTRAINT _pages_v_blocks_form_block_form_id_forms_id_fk FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_form_block _pages_v_blocks_form_block_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_form_block
    ADD CONSTRAINT _pages_v_blocks_form_block_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_hero _pages_v_blocks_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_hero
    ADD CONSTRAINT _pages_v_blocks_hero_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_hero _pages_v_blocks_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_hero
    ADD CONSTRAINT _pages_v_blocks_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_house_filter_filters_fields_options _pages_v_blocks_house_filter_filters_fields_options_parent_id_f; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields_options
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_fields_options_parent_id_f FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_house_filter_filters_fields(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_house_filter_filters_fields _pages_v_blocks_house_filter_filters_fields_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters_fields
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_fields_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_house_filter_filters(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_house_filter_filters _pages_v_blocks_house_filter_filters_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter_filters
    ADD CONSTRAINT _pages_v_blocks_house_filter_filters_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_house_filter(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_house_filter _pages_v_blocks_house_filter_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_house_filter
    ADD CONSTRAINT _pages_v_blocks_house_filter_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_how_it_works _pages_v_blocks_how_it_works_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works
    ADD CONSTRAINT _pages_v_blocks_how_it_works_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_how_it_works_steps _pages_v_blocks_how_it_works_steps_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_how_it_works_steps
    ADD CONSTRAINT _pages_v_blocks_how_it_works_steps_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_how_it_works(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_map _pages_v_blocks_map_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_map
    ADD CONSTRAINT _pages_v_blocks_map_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_media_block _pages_v_blocks_media_block_media_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_media_block
    ADD CONSTRAINT _pages_v_blocks_media_block_media_id_media_id_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_media_block _pages_v_blocks_media_block_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_media_block
    ADD CONSTRAINT _pages_v_blocks_media_block_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_navbar _pages_v_blocks_navbar_avatar_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_navbar
    ADD CONSTRAINT _pages_v_blocks_navbar_avatar_id_media_id_fk FOREIGN KEY (avatar_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_navbar_links _pages_v_blocks_navbar_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_navbar_links
    ADD CONSTRAINT _pages_v_blocks_navbar_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_navbar(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_navbar _pages_v_blocks_navbar_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_navbar
    ADD CONSTRAINT _pages_v_blocks_navbar_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_properties _pages_v_blocks_properties_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_properties
    ADD CONSTRAINT _pages_v_blocks_properties_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_property_features _pages_v_blocks_property_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_property_features
    ADD CONSTRAINT _pages_v_blocks_property_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_property_features _pages_v_blocks_property_features_property_id_properties_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_property_features
    ADD CONSTRAINT _pages_v_blocks_property_features_property_id_properties_id_fk FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL;


--
-- Name: _pages_v_blocks_testimonials _pages_v_blocks_testimonials_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_testimonials
    ADD CONSTRAINT _pages_v_blocks_testimonials_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_vision_items _pages_v_blocks_vision_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision_items
    ADD CONSTRAINT _pages_v_blocks_vision_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_vision(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_vision_mission _pages_v_blocks_vision_mission_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission
    ADD CONSTRAINT _pages_v_blocks_vision_mission_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_vision_mission_stats _pages_v_blocks_vision_mission_stats_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision_mission_stats
    ADD CONSTRAINT _pages_v_blocks_vision_mission_stats_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v_blocks_vision_mission(id) ON DELETE CASCADE;


--
-- Name: _pages_v_blocks_vision _pages_v_blocks_vision_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_blocks_vision
    ADD CONSTRAINT _pages_v_blocks_vision_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v _pages_v_parent_id_pages_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_parent_id_pages_id_fk FOREIGN KEY (parent_id) REFERENCES public.pages(id) ON DELETE SET NULL;


--
-- Name: _pages_v_rels _pages_v_rels_agents_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_agents_fk FOREIGN KEY (agents_id) REFERENCES public.agents(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_commercial_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_commercial_fk FOREIGN KEY (commercial_id) REFERENCES public.commercial(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_flats_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_flats_fk FOREIGN KEY (flats_id) REFERENCES public.flats(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_lands_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_lands_fk FOREIGN KEY (lands_id) REFERENCES public.lands(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_properties_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_properties_fk FOREIGN KEY (properties_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_residential_complexes_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_residential_complexes_fk FOREIGN KEY (residential_complexes_id) REFERENCES public.residential_complexes(id) ON DELETE CASCADE;


--
-- Name: _pages_v_rels _pages_v_rels_testimonials_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_rels
    ADD CONSTRAINT _pages_v_rels_testimonials_fk FOREIGN KEY (testimonials_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: _pages_v_version_hero_links _pages_v_version_hero_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v_version_hero_links
    ADD CONSTRAINT _pages_v_version_hero_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public._pages_v(id) ON DELETE CASCADE;


--
-- Name: _pages_v _pages_v_version_hero_media_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_version_hero_media_id_media_id_fk FOREIGN KEY (version_hero_media_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: _pages_v _pages_v_version_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public._pages_v
    ADD CONSTRAINT _pages_v_version_meta_image_id_media_id_fk FOREIGN KEY (version_meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: agents agents_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.agents
    ADD CONSTRAINT agents_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: agents_social_links agents_social_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.agents_social_links
    ADD CONSTRAINT agents_social_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.agents(id) ON DELETE CASCADE;


--
-- Name: categories_breadcrumbs categories_breadcrumbs_doc_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories_breadcrumbs
    ADD CONSTRAINT categories_breadcrumbs_doc_id_categories_id_fk FOREIGN KEY (doc_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: categories_breadcrumbs categories_breadcrumbs_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories_breadcrumbs
    ADD CONSTRAINT categories_breadcrumbs_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: categories categories_parent_id_categories_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_categories_id_fk FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: commercial_images commercial_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.commercial_images
    ADD CONSTRAINT commercial_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: commercial_images commercial_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.commercial_images
    ADD CONSTRAINT commercial_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.commercial(id) ON DELETE CASCADE;


--
-- Name: commercial_utilities commercial_utilities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.commercial_utilities
    ADD CONSTRAINT commercial_utilities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.commercial(id) ON DELETE CASCADE;


--
-- Name: flats_amenities flats_amenities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flats_amenities
    ADD CONSTRAINT flats_amenities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.flats(id) ON DELETE CASCADE;


--
-- Name: flats_images flats_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flats_images
    ADD CONSTRAINT flats_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: flats_images flats_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flats_images
    ADD CONSTRAINT flats_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.flats(id) ON DELETE CASCADE;


--
-- Name: flats flats_layout_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flats
    ADD CONSTRAINT flats_layout_id_media_id_fk FOREIGN KEY (layout_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: flats flats_realtor_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flats
    ADD CONSTRAINT flats_realtor_id_users_id_fk FOREIGN KEY (realtor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: flats flats_residential_complex_id_residential_complexes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.flats
    ADD CONSTRAINT flats_residential_complex_id_residential_complexes_id_fk FOREIGN KEY (residential_complex_id) REFERENCES public.residential_complexes(id) ON DELETE SET NULL;


--
-- Name: footer_nav_items footer_nav_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.footer_nav_items
    ADD CONSTRAINT footer_nav_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.footer(id) ON DELETE CASCADE;


--
-- Name: footer_rels footer_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.footer_rels
    ADD CONSTRAINT footer_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: footer_rels footer_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.footer_rels
    ADD CONSTRAINT footer_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.footer(id) ON DELETE CASCADE;


--
-- Name: footer_rels footer_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.footer_rels
    ADD CONSTRAINT footer_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: form_submissions form_submissions_form_id_forms_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.form_submissions
    ADD CONSTRAINT form_submissions_form_id_forms_id_fk FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE SET NULL;


--
-- Name: form_submissions_submission_data form_submissions_submission_data_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.form_submissions_submission_data
    ADD CONSTRAINT form_submissions_submission_data_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.form_submissions(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_checkbox forms_blocks_checkbox_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_checkbox
    ADD CONSTRAINT forms_blocks_checkbox_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_country forms_blocks_country_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_country
    ADD CONSTRAINT forms_blocks_country_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_email forms_blocks_email_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_email
    ADD CONSTRAINT forms_blocks_email_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_message forms_blocks_message_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_message
    ADD CONSTRAINT forms_blocks_message_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_number forms_blocks_number_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_number
    ADD CONSTRAINT forms_blocks_number_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_select_options forms_blocks_select_options_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_select_options
    ADD CONSTRAINT forms_blocks_select_options_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms_blocks_select(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_select forms_blocks_select_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_select
    ADD CONSTRAINT forms_blocks_select_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_state forms_blocks_state_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_state
    ADD CONSTRAINT forms_blocks_state_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_text forms_blocks_text_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_text
    ADD CONSTRAINT forms_blocks_text_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_blocks_textarea forms_blocks_textarea_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_blocks_textarea
    ADD CONSTRAINT forms_blocks_textarea_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: forms_emails forms_emails_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.forms_emails
    ADD CONSTRAINT forms_emails_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: header_nav_items header_nav_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.header_nav_items
    ADD CONSTRAINT header_nav_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.header(id) ON DELETE CASCADE;


--
-- Name: header_rels header_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.header_rels
    ADD CONSTRAINT header_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: header_rels header_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.header_rels
    ADD CONSTRAINT header_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.header(id) ON DELETE CASCADE;


--
-- Name: header_rels header_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.header_rels
    ADD CONSTRAINT header_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: lands_communications lands_communications_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lands_communications
    ADD CONSTRAINT lands_communications_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.lands(id) ON DELETE CASCADE;


--
-- Name: lands_images lands_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lands_images
    ADD CONSTRAINT lands_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: lands_images lands_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.lands_images
    ADD CONSTRAINT lands_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.lands(id) ON DELETE CASCADE;


--
-- Name: messages messages_attachment_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_attachment_id_media_id_fk FOREIGN KEY (attachment_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: messages messages_realtor_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_realtor_id_users_id_fk FOREIGN KEY (realtor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_about_hero_images pages_blocks_about_hero_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_about_hero_images
    ADD CONSTRAINT pages_blocks_about_hero_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_about_hero_images pages_blocks_about_hero_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_about_hero_images
    ADD CONSTRAINT pages_blocks_about_hero_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_about_hero(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_about_hero pages_blocks_about_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_about_hero
    ADD CONSTRAINT pages_blocks_about_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_agents pages_blocks_agents_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_agents
    ADD CONSTRAINT pages_blocks_agents_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_amenities_amenities pages_blocks_amenities_amenities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_amenities_amenities
    ADD CONSTRAINT pages_blocks_amenities_amenities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_amenities(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_amenities pages_blocks_amenities_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_amenities
    ADD CONSTRAINT pages_blocks_amenities_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_amenities pages_blocks_amenities_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_amenities
    ADD CONSTRAINT pages_blocks_amenities_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_archive pages_blocks_archive_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_archive
    ADD CONSTRAINT pages_blocks_archive_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_blog pages_blocks_blog_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_blog
    ADD CONSTRAINT pages_blocks_blog_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_call_to_action_new pages_blocks_call_to_action_new_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_call_to_action_new
    ADD CONSTRAINT pages_blocks_call_to_action_new_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_contact_hero pages_blocks_contact_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_contact_hero
    ADD CONSTRAINT pages_blocks_contact_hero_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_contact_hero pages_blocks_contact_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_contact_hero
    ADD CONSTRAINT pages_blocks_contact_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_contact_us_form pages_blocks_contact_us_form_form_id_forms_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_contact_us_form
    ADD CONSTRAINT pages_blocks_contact_us_form_form_id_forms_id_fk FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_contact_us_form pages_blocks_contact_us_form_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_contact_us_form
    ADD CONSTRAINT pages_blocks_contact_us_form_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_content_columns pages_blocks_content_columns_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_content_columns
    ADD CONSTRAINT pages_blocks_content_columns_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_content(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_content pages_blocks_content_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_content
    ADD CONSTRAINT pages_blocks_content_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_cta_links pages_blocks_cta_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_cta_links
    ADD CONSTRAINT pages_blocks_cta_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_cta(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_cta pages_blocks_cta_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_cta
    ADD CONSTRAINT pages_blocks_cta_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_faq_items pages_blocks_faq_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_faq_items
    ADD CONSTRAINT pages_blocks_faq_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_faq(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_faq pages_blocks_faq_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_faq
    ADD CONSTRAINT pages_blocks_faq_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_feature_features pages_blocks_feature_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_feature_features
    ADD CONSTRAINT pages_blocks_feature_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_feature(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_feature pages_blocks_feature_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_feature
    ADD CONSTRAINT pages_blocks_feature_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_form_block pages_blocks_form_block_form_id_forms_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_form_block
    ADD CONSTRAINT pages_blocks_form_block_form_id_forms_id_fk FOREIGN KEY (form_id) REFERENCES public.forms(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_form_block pages_blocks_form_block_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_form_block
    ADD CONSTRAINT pages_blocks_form_block_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_hero pages_blocks_hero_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_hero
    ADD CONSTRAINT pages_blocks_hero_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_hero pages_blocks_hero_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_hero
    ADD CONSTRAINT pages_blocks_hero_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_house_filter_filters_fields_options pages_blocks_house_filter_filters_fields_options_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters_fields_options
    ADD CONSTRAINT pages_blocks_house_filter_filters_fields_options_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_house_filter_filters_fields(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_house_filter_filters_fields pages_blocks_house_filter_filters_fields_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters_fields
    ADD CONSTRAINT pages_blocks_house_filter_filters_fields_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_house_filter_filters(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_house_filter_filters pages_blocks_house_filter_filters_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_house_filter_filters
    ADD CONSTRAINT pages_blocks_house_filter_filters_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_house_filter(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_house_filter pages_blocks_house_filter_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_house_filter
    ADD CONSTRAINT pages_blocks_house_filter_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_how_it_works pages_blocks_how_it_works_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_how_it_works
    ADD CONSTRAINT pages_blocks_how_it_works_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_how_it_works_steps pages_blocks_how_it_works_steps_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_how_it_works_steps
    ADD CONSTRAINT pages_blocks_how_it_works_steps_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_how_it_works(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_map pages_blocks_map_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_map
    ADD CONSTRAINT pages_blocks_map_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_media_block pages_blocks_media_block_media_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_media_block
    ADD CONSTRAINT pages_blocks_media_block_media_id_media_id_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_media_block pages_blocks_media_block_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_media_block
    ADD CONSTRAINT pages_blocks_media_block_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_navbar pages_blocks_navbar_avatar_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_navbar
    ADD CONSTRAINT pages_blocks_navbar_avatar_id_media_id_fk FOREIGN KEY (avatar_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_navbar_links pages_blocks_navbar_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_navbar_links
    ADD CONSTRAINT pages_blocks_navbar_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_navbar(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_navbar pages_blocks_navbar_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_navbar
    ADD CONSTRAINT pages_blocks_navbar_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_properties pages_blocks_properties_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_properties
    ADD CONSTRAINT pages_blocks_properties_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_property_features pages_blocks_property_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_property_features
    ADD CONSTRAINT pages_blocks_property_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_property_features pages_blocks_property_features_property_id_properties_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_property_features
    ADD CONSTRAINT pages_blocks_property_features_property_id_properties_id_fk FOREIGN KEY (property_id) REFERENCES public.properties(id) ON DELETE SET NULL;


--
-- Name: pages_blocks_testimonials pages_blocks_testimonials_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_testimonials
    ADD CONSTRAINT pages_blocks_testimonials_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_vision_items pages_blocks_vision_items_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_vision_items
    ADD CONSTRAINT pages_blocks_vision_items_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_vision(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_vision_mission pages_blocks_vision_mission_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_vision_mission
    ADD CONSTRAINT pages_blocks_vision_mission_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_vision_mission_stats pages_blocks_vision_mission_stats_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_vision_mission_stats
    ADD CONSTRAINT pages_blocks_vision_mission_stats_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages_blocks_vision_mission(id) ON DELETE CASCADE;


--
-- Name: pages_blocks_vision pages_blocks_vision_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_blocks_vision
    ADD CONSTRAINT pages_blocks_vision_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_hero_links pages_hero_links_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_hero_links
    ADD CONSTRAINT pages_hero_links_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages pages_hero_media_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_hero_media_id_media_id_fk FOREIGN KEY (hero_media_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages pages_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages
    ADD CONSTRAINT pages_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: pages_rels pages_rels_agents_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_agents_fk FOREIGN KEY (agents_id) REFERENCES public.agents(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_commercial_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_commercial_fk FOREIGN KEY (commercial_id) REFERENCES public.commercial(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_flats_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_flats_fk FOREIGN KEY (flats_id) REFERENCES public.flats(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_lands_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_lands_fk FOREIGN KEY (lands_id) REFERENCES public.lands(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_properties_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_properties_fk FOREIGN KEY (properties_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_residential_complexes_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_residential_complexes_fk FOREIGN KEY (residential_complexes_id) REFERENCES public.residential_complexes(id) ON DELETE CASCADE;


--
-- Name: pages_rels pages_rels_testimonials_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pages_rels
    ADD CONSTRAINT pages_rels_testimonials_fk FOREIGN KEY (testimonials_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: payload_jobs_log payload_jobs_log_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_jobs_log
    ADD CONSTRAINT payload_jobs_log_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.payload_jobs(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_agents_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_agents_fk FOREIGN KEY (agents_id) REFERENCES public.agents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_commercial_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_commercial_fk FOREIGN KEY (commercial_id) REFERENCES public.commercial(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_flats_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_flats_fk FOREIGN KEY (flats_id) REFERENCES public.flats(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_form_submissions_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_form_submissions_fk FOREIGN KEY (form_submissions_id) REFERENCES public.form_submissions(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_forms_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_forms_fk FOREIGN KEY (forms_id) REFERENCES public.forms(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_lands_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_lands_fk FOREIGN KEY (lands_id) REFERENCES public.lands(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_media_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_media_fk FOREIGN KEY (media_id) REFERENCES public.media(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_messages_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_messages_fk FOREIGN KEY (messages_id) REFERENCES public.messages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.payload_locked_documents(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_payload_jobs_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_payload_jobs_fk FOREIGN KEY (payload_jobs_id) REFERENCES public.payload_jobs(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_properties_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_properties_fk FOREIGN KEY (properties_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_redirects_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_redirects_fk FOREIGN KEY (redirects_id) REFERENCES public.redirects(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_residential_complexes_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_residential_complexes_fk FOREIGN KEY (residential_complexes_id) REFERENCES public.residential_complexes(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_reviews_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_reviews_fk FOREIGN KEY (reviews_id) REFERENCES public.reviews(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_search_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_search_fk FOREIGN KEY (search_id) REFERENCES public.search(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_testimonials_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_testimonials_fk FOREIGN KEY (testimonials_id) REFERENCES public.testimonials(id) ON DELETE CASCADE;


--
-- Name: payload_locked_documents_rels payload_locked_documents_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_locked_documents_rels
    ADD CONSTRAINT payload_locked_documents_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.payload_preferences(id) ON DELETE CASCADE;


--
-- Name: payload_preferences_rels payload_preferences_rels_users_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.payload_preferences_rels
    ADD CONSTRAINT payload_preferences_rels_users_fk FOREIGN KEY (users_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: posts posts_author_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_author_id_users_id_fk FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: posts posts_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: posts posts_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: posts_rels posts_rels_categories_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.posts_rels
    ADD CONSTRAINT posts_rels_categories_fk FOREIGN KEY (categories_id) REFERENCES public.categories(id) ON DELETE CASCADE;


--
-- Name: posts_rels posts_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.posts_rels
    ADD CONSTRAINT posts_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: properties_features properties_features_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.properties_features
    ADD CONSTRAINT properties_features_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: properties_images properties_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.properties_images
    ADD CONSTRAINT properties_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: properties_images properties_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.properties_images
    ADD CONSTRAINT properties_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.properties(id) ON DELETE CASCADE;


--
-- Name: redirects_rels redirects_rels_pages_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.redirects_rels
    ADD CONSTRAINT redirects_rels_pages_fk FOREIGN KEY (pages_id) REFERENCES public.pages(id) ON DELETE CASCADE;


--
-- Name: redirects_rels redirects_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.redirects_rels
    ADD CONSTRAINT redirects_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.redirects(id) ON DELETE CASCADE;


--
-- Name: redirects_rels redirects_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.redirects_rels
    ADD CONSTRAINT redirects_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: residential_complexes_images residential_complexes_images_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.residential_complexes_images
    ADD CONSTRAINT residential_complexes_images_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: residential_complexes_images residential_complexes_images_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.residential_complexes_images
    ADD CONSTRAINT residential_complexes_images_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.residential_complexes(id) ON DELETE CASCADE;


--
-- Name: residential_complexes_infrastructure residential_complexes_infrastructure_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.residential_complexes_infrastructure
    ADD CONSTRAINT residential_complexes_infrastructure_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.residential_complexes(id) ON DELETE CASCADE;


--
-- Name: reviews reviews_realtor_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_realtor_id_users_id_fk FOREIGN KEY (realtor_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: search_categories search_categories_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.search_categories
    ADD CONSTRAINT search_categories_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.search(id) ON DELETE CASCADE;


--
-- Name: search search_meta_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.search
    ADD CONSTRAINT search_meta_image_id_media_id_fk FOREIGN KEY (meta_image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: search_rels search_rels_parent_1_idx; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.search_rels
    ADD CONSTRAINT search_rels_parent_1_idx FOREIGN KEY (parent_id) REFERENCES public.search(id) ON DELETE CASCADE;


--
-- Name: search_rels search_rels_posts_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.search_rels
    ADD CONSTRAINT search_rels_posts_fk FOREIGN KEY (posts_id) REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- Name: testimonials testimonials_image_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.testimonials
    ADD CONSTRAINT testimonials_image_id_media_id_fk FOREIGN KEY (image_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: users users_photo_id_media_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_photo_id_media_id_fk FOREIGN KEY (photo_id) REFERENCES public.media(id) ON DELETE SET NULL;


--
-- Name: users_sessions users_sessions_parent_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users_sessions
    ADD CONSTRAINT users_sessions_parent_id_fk FOREIGN KEY (_parent_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict zuIAhbxmcRWMPiuUT0ZawocrLRxKMVhHRcOHLTDEqnjnVPvwjB7fSiS9g1wIndb

