import * as migration_20260602_011706 from './20260602_011706';
import * as migration_20260606_233403 from './20260606_233403';
import * as migration_20260606_ai_embeddings from './20260606_ai_embeddings';
import * as migration_20260607_db_indexes from './20260607_db_indexes';
import * as migration_20260607_leads from './20260607_leads';
import * as migration_20260607_auth_tokens from './20260607_auth_tokens';
import * as migration_20260607_saved_searches from './20260607_saved_searches';
import * as migration_20260607_telegram from './20260607_telegram';
import * as migration_20260607_cabinet_listings from './20260607_cabinet_listings';
import * as migration_20260607_houses from './20260607_houses';
import * as migration_20260607_lands_draft from './20260607_lands_draft';
import * as migration_20260608_search_queries from './20260608_search_queries';
import * as migration_20260608_search_queries_user from './20260608_search_queries_user';
import * as migration_20260608_seo_landings from './20260608_seo_landings';
import * as migration_20260609_hnsw_index from './20260609_hnsw_index';
import * as migration_20260610_telegram_channels_status from './20260610_telegram_channels_status';
import * as migration_20260611_seo_landings_faq from './20260611_seo_landings_faq';

export const migrations = [
  {
    up: migration_20260602_011706.up,
    down: migration_20260602_011706.down,
    name: '20260602_011706',
  },
  {
    up: migration_20260606_233403.up,
    down: migration_20260606_233403.down,
    name: '20260606_233403',
  },
  {
    up: migration_20260606_ai_embeddings.up,
    down: migration_20260606_ai_embeddings.down,
    name: '20260606_ai_embeddings'
  },
  {
    up: migration_20260607_db_indexes.up,
    down: migration_20260607_db_indexes.down,
    name: '20260607_db_indexes',
  },
  {
    up: migration_20260607_leads.up,
    down: migration_20260607_leads.down,
    name: '20260607_leads',
  },
  {
    up: migration_20260607_auth_tokens.up,
    down: migration_20260607_auth_tokens.down,
    name: '20260607_auth_tokens',
  },
  {
    up: migration_20260607_saved_searches.up,
    down: migration_20260607_saved_searches.down,
    name: '20260607_saved_searches',
  },
  {
    up: migration_20260607_telegram.up,
    down: migration_20260607_telegram.down,
    name: '20260607_telegram',
  },
  {
    up: migration_20260607_cabinet_listings.up,
    down: migration_20260607_cabinet_listings.down,
    name: '20260607_cabinet_listings',
  },
  {
    up: migration_20260607_houses.up,
    down: migration_20260607_houses.down,
    name: '20260607_houses',
  },
  {
    up: migration_20260607_lands_draft.up,
    down: migration_20260607_lands_draft.down,
    name: '20260607_lands_draft',
  },
  {
    up: migration_20260608_search_queries.up,
    down: migration_20260608_search_queries.down,
    name: '20260608_search_queries',
  },
  {
    up: migration_20260608_search_queries_user.up,
    down: migration_20260608_search_queries_user.down,
    name: '20260608_search_queries_user',
  },
  {
    up: migration_20260608_seo_landings.up,
    down: migration_20260608_seo_landings.down,
    name: '20260608_seo_landings',
  },
  {
    up: migration_20260609_hnsw_index.up,
    down: migration_20260609_hnsw_index.down,
    name: '20260609_hnsw_index',
  },
  {
    up: migration_20260610_telegram_channels_status.up,
    down: migration_20260610_telegram_channels_status.down,
    name: '20260610_telegram_channels_status',
  },
  {
    up: migration_20260611_seo_landings_faq.up,
    down: migration_20260611_seo_landings_faq.down,
    name: '20260611_seo_landings_faq',
  },
];
