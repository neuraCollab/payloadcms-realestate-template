#!/usr/bin/env bash
# Production deployment from a snapshot.tar.gz produced by snapshot.ps1
# (or scripts/backup.sh on a Linux host).
#
# Steps:
#   1. Verify env, docker, archive
#   2. Pull latest code (matching the snapshot commit if present)
#   3. Build the production image
#   4. Bring up postgres (only), wait for healthy
#   5. Restore db.sql + media files
#   6. Bring up the app
#   7. Health-check
#
# Usage:
#   ./scripts/deploy.sh <snapshot.tar.gz>
#
# Safe to re-run. Idempotent.

set -euo pipefail

ARCHIVE="${1:-}"
if [[ -z "$ARCHIVE" || ! -f "$ARCHIVE" ]]; then
  echo "❌ Usage: $0 <snapshot.tar.gz>"
  exit 1
fi

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"
ARCHIVE_ABS="$(realpath "$ARCHIVE")"

# -------- Step 1: preflight --------
if [[ ! -f .env ]]; then
  echo "❌ .env not found at $ROOT_DIR"
  echo "   Copy .env.example to .env and fill in production secrets first."
  exit 1
fi

if ! command -v docker &>/dev/null; then
  echo "❌ docker not installed"
  exit 1
fi

COMPOSE="docker compose -f docker-compose.prod.yml"

# -------- Step 2: unpack snapshot --------
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "▸ Unpacking snapshot..."
tar -xzf "$ARCHIVE_ABS" -C "$WORK"

if [[ ! -f "$WORK/db.sql" ]]; then
  echo "❌ archive is malformed: db.sql not found"
  exit 1
fi

cat "$WORK/MANIFEST.txt" 2>/dev/null || true

# -------- Step 3: sync git to the snapshot's commit if available --------
if [[ -f "$WORK/COMMIT_SHA.txt" ]]; then
  SHA="$(cat "$WORK/COMMIT_SHA.txt" | tr -d '[:space:]')"
  if [[ "$SHA" != 'unknown' && -d .git ]]; then
    echo "▸ Syncing code to commit $SHA..."
    git fetch --all --quiet || true
    git checkout "$SHA" --quiet 2>/dev/null || \
      echo "  ⚠ Could not checkout $SHA — staying on current HEAD"
  fi
fi

# -------- Step 4: bring up Postgres (only) --------
echo "▸ Starting postgres..."
$COMPOSE up -d postgres

echo "▸ Waiting for postgres to become healthy..."
for i in {1..30}; do
  status="$($COMPOSE ps --format json postgres 2>/dev/null | grep -o '"Health":"healthy"' || true)"
  if [[ -n "$status" ]]; then break; fi
  sleep 2
done

# -------- Step 5: restore database + media --------
# shellcheck disable=SC1091
set -a
source .env
set +a

echo "▸ Restoring database..."
$COMPOSE exec -T postgres \
  psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" \
  < "$WORK/db.sql"

echo "▸ Restoring media files..."
if [[ -d "$WORK/media" ]]; then
  mkdir -p public/media
  # rsync is nicer (incremental, preserves perms) but cp is universal
  if command -v rsync &>/dev/null; then
    rsync -a "$WORK/media/" public/media/
  else
    cp -r "$WORK/media/." public/media/
  fi
  echo "  ✓ copied $(find "$WORK/media" -type f | wc -l) files"
else
  echo "  ⚠ no media/ dir in snapshot"
fi

# -------- Step 6: build & start the app --------
echo "▸ Building app image (this can take 2-5 min on first run)..."
$COMPOSE build app

echo "▸ Starting app..."
$COMPOSE up -d app

# -------- Step 7: health check --------
echo "▸ Waiting for app to respond..."
for i in {1..60}; do
  if curl -fsS -o /dev/null http://127.0.0.1:3000/ 2>/dev/null; then
    echo ""
    echo "✅ Deployment complete."
    echo ""
    echo "App is responding at http://127.0.0.1:3000/"
    echo "Configure your reverse proxy (nginx/Caddy) to forward HTTPS traffic"
    echo "from your domain to that port."
    echo ""
    echo "Logs:  $COMPOSE logs -f app"
    echo "Stop:  $COMPOSE down"
    exit 0
  fi
  sleep 2
done

echo "⚠ App didn't respond after 2 minutes. Check logs:"
echo "  $COMPOSE logs --tail 100 app"
exit 1
