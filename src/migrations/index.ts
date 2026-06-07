import * as migration_20260602_011706 from './20260602_011706';
import * as migration_20260606_233403 from './20260606_233403';
import * as migration_20260606_ai_embeddings from './20260606_ai_embeddings';
import * as migration_20260607_db_indexes from './20260607_db_indexes';

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
];
