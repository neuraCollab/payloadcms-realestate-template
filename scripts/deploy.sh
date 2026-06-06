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

# Detect compose: prefer the v2 plugin (`docker compose`), fall back to
# the legacy standalone binary (`docker-compose`).
if docker compose version &>/dev/null; then
  COMPOSE="docker compose -f docker-compose.prod.yml"
elif command -v docker-compose &>/dev/null; then
  COMPOSE="docker-compose -f docker-compose.prod.yml"
  echo "  ℹ Using legacy docker-compose (v1). Consider installing the plugin:"
  echo "    sudo apt install docker-compose-plugin"
else
  echo "❌ Neither 'docker compose' plugin nor legacy 'docker-compose' is installed."
  echo "   Install with:  sudo apt install docker-compose-plugin"
  exit 1
fi

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

# -------- Step 3: check git SHA matches (informational only) --------
# We deliberately don't auto-checkout: that requires interactive HTTPS auth
# or SSH keys on the server. Manage code state with `git pull` before running
# this script — the snapshot is only data + media.
if [[ -f "$WORK/COMMIT_SHA.txt" ]] && [[ -d .git ]]; then
  SHA="$(cat "$WORK/COMMIT_SHA.txt" | tr -d '[:space:]')"
  CURRENT="$(git rev-parse HEAD 2>/dev/null || echo unknown)"
  if [[ "$SHA" != 'unknown' && "$SHA" != "$CURRENT" ]]; then
    echo "  ⚠ Snapshot was made at $SHA"
    echo "    Server is on        $CURRENT"
    echo "    If migrations diverge, you may need to:"
    echo "      git fetch && git checkout $SHA"
    echo "    and re-run this script."
    echo ""
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
