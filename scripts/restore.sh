#!/usr/bin/env bash
# Restores a backup archive produced by ./scripts/backup.sh.
#
#   Usage:  ./scripts/restore.sh backups/realty-YYYYMMDD-HHMMSS.tar.gz
#
# Drops & re-creates schema in the configured Postgres DB, then copies media.

set -euo pipefail

ARCHIVE="${1:-}"
if [[ -z "$ARCHIVE" || ! -f "$ARCHIVE" ]]; then
  echo "Usage: $0 <archive.tar.gz>"
  exit 1
fi

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "❌ .env not found at $ROOT_DIR — set up environment before restoring."
  exit 1
fi

# shellcheck disable=SC1091
set -a
source .env
set +a

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

tar -xzf "$ARCHIVE" -C "$WORKDIR"

echo "▸ Restoring Postgres…"
docker compose exec -T postgres \
  psql -U "${POSTGRES_USER:-postgres}" -d "${POSTGRES_DB:-postgres}" \
  < "$WORKDIR/db.sql"

if [[ -d "$WORKDIR/media" ]]; then
  echo "▸ Restoring media files…"
  mkdir -p "$ROOT_DIR/public/media"
  cp -r "$WORKDIR/media/." "$ROOT_DIR/public/media/"
fi

echo "✅ Restore complete. Restart the app: docker compose restart app"
