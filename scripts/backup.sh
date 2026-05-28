#!/usr/bin/env bash
# Creates a portable snapshot of the running app: Postgres dump + media files +
# .env. Output: backups/realty-YYYYMMDD-HHMMSS.tar.gz
#
#   Usage:  ./scripts/backup.sh
#
# Requires the docker-compose stack to be running (postgres + app).

set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "❌ .env not found at $ROOT_DIR — copy .env.example first."
  exit 1
fi

# shellcheck disable=SC1091
set -a
source .env
set +a

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

OUT_DIR="$ROOT_DIR/backups"
mkdir -p "$OUT_DIR"
ARCHIVE="$OUT_DIR/realty-$TIMESTAMP.tar.gz"

echo "▸ Postgres dump…"
docker compose exec -T postgres \
  pg_dump \
    -U "${POSTGRES_USER:-postgres}" \
    -d "${POSTGRES_DB:-postgres}" \
    --no-owner --clean --if-exists \
  > "$WORKDIR/db.sql"

echo "▸ Media files…"
if [[ -d "$ROOT_DIR/public/media" ]]; then
  cp -r "$ROOT_DIR/public/media" "$WORKDIR/media"
else
  mkdir "$WORKDIR/media"
  echo "(no media directory yet)" > "$WORKDIR/media/README.txt"
fi

echo "▸ .env (sanitized)…"
# Remove explicit secrets but keep config knobs so the restore knows the schema.
grep -vE '^(PAYLOAD_SECRET|POSTGRES_PASSWORD|CRON_SECRET|PREVIEW_SECRET|SMTP_PASS|RESEND_API_KEY)=' .env \
  > "$WORKDIR/.env.template" || true

echo "▸ Packaging…"
( cd "$WORKDIR" && tar -czf "$ARCHIVE" db.sql media .env.template )

SIZE="$(du -h "$ARCHIVE" | awk '{print $1}')"
echo "✅ Backup ready: $ARCHIVE ($SIZE)"
echo
echo "To restore on another host, run:"
echo "  ./scripts/restore.sh $ARCHIVE"
