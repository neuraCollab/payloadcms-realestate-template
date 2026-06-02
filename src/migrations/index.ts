import * as migration_20260602_011706 from './20260602_011706';

export const migrations = [
  {
    up: migration_20260602_011706.up,
    down: migration_20260602_011706.down,
    name: '20260602_011706'
  },
];
