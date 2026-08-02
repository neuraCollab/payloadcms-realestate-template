#!/usr/bin/env bash
# Captures the full state of the local Realty dev stack into a single archive
# that can be uploaded to a production server and restored there.
#
# Bundles:
#   - Postgres dump via pg_dump from the running compose container
#   - public/media/ (uploaded images & files)
#   - .env.template (secrets stripped)
#   - the current git commit SHA so the server checks out the matching code
#
# Usage:
#   ./scripts/snapshot.sh

set -euo pipefail

OUT_DIR="backups"

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "❌ .env not found at $ROOT_DIR. Create it from .env.example first."
  exit 1
fi

# Need docker compose running for pg_dump
if ! docker compose ps --status running --quiet >/dev/null 2>&1; then
  echo "❌ docker compose stack isn't running. Start with: docker compose up -d"
  exit 1
fi

# Locate the postgres service
if ! docker compose ps -q postgres >/dev/null 2>&1; then
  echo "❌ postgres service isn't in the compose project."
  exit 1
fi

# Read POSTGRES_USER / POSTGRES_DB from .env
set -a
# shellcheck disable=SC1091
source .env
set +a

pgUser="${POSTGRES_USER:-}"
pgDb="${POSTGRES_DB:-}"

if [[ -z "$pgUser" || -z "$pgDb" ]]; then
  echo "❌ POSTGRES_USER / POSTGRES_DB missing from .env"
  exit 1
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
STAGE="$(mktemp -d)"

# Ensure staging dir is cleaned up on exit
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$OUT_DIR"

echo -e "\033[36m▸ Postgres dump ($pgDb)...\033[0m"
DUMP_PATH="$STAGE/db.sql"

docker compose exec -T postgres pg_dump -U "$pgUser" -d "$pgDb" --no-owner --clean --if-exists > "$DUMP_PATH"

DUMP_SIZE="$(wc -c < "$DUMP_PATH" | tr -d ' ')"
if [[ ! -f "$DUMP_PATH" ]] || [[ "$DUMP_SIZE" -lt 1024 ]]; then
  echo "❌ pg_dump produced an empty file. Check that the database has data and that compose is running."
  exit 1
fi

echo -e "\033[36m▸ Media files (public/media/)...\033[0m"
if [[ -d "public/media" ]]; then
  cp -R "public/media" "$STAGE/media"
else
  mkdir -p "$STAGE/media"
  echo "no media yet" > "$STAGE/media/README.txt"
fi

echo -e "\033[36m▸ .env.template (secrets stripped)...\033[0m"
grep -vE '^\s*(PAYLOAD_SECRET|POSTGRES_PASSWORD|CRON_SECRET|PREVIEW_SECRET|SMTP_PASS|RESEND_API_KEY)=' .env \
  > "$STAGE/.env.template" || true

echo -e "\033[36m▸ Git commit SHA...\033[0m"
SHA="$(git rev-parse HEAD 2>/dev/null || echo unknown)"
echo "$SHA" > "$STAGE/COMMIT_SHA.txt"

echo -e "\033[36m▸ Manifest...\033[0m"
cat <<MANIFEST > "$STAGE/MANIFEST.txt"
Realty production snapshot
Created: $(date '+%Y-%m-%d %H:%M:%S')
DB:      $pgDb
User:    $pgUser
Commit:  $SHA
MANIFEST

ARCHIVE="$OUT_DIR/realty-snapshot-$STAMP.tar.gz"
ARCHIVE_ABS="$ROOT_DIR/$ARCHIVE"
if command -v realpath >/dev/null 2>&1; then
  ARCHIVE_ABS="$(realpath -m "$ARCHIVE" 2>/dev/null || echo "$ROOT_DIR/$ARCHIVE")"
fi

echo -e "\033[36m▸ Packing → $ARCHIVE\033[0m"
tar -czf "$ARCHIVE_ABS" -C "$STAGE" .

SIZE="$(du -h "$ARCHIVE_ABS" | awk '{print $1}')"

echo ""
echo -e "\033[32m✅ Snapshot ready: $ARCHIVE_ABS ($SIZE)\033[0m"
echo ""
echo -e "\033[33mUpload to the server and run there:\033[0m"
echo "  scp '$ARCHIVE_ABS' user@server:/srv/realty/"
echo "  ssh user@server"
echo "  cd /srv/realty"
echo "  ./scripts/deploy.sh realty-snapshot-$STAMP.tar.gz"
