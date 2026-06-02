#!/usr/bin/env bash
# Полный production-пайплайн с доступом к Postgres на этапе сборки.
#
# Этапы:
#   1. preflight  — .env, docker, snapshot
#   2. postgres   — поднять и дождаться healthy
#   3. restore    — psql < db.sql + cp media/
#   4. build      — docker build --network=<compose-net> с DATABASE_URI
#                   указывающим на postgres-сервис → generateStaticParams
#                   и prerender отрабатывают как положено
#   5. up         — docker compose up -d app (использует готовый image)
#   6. health     — curl /
#
# Скрипт идемпотентен — повторный запуск с тем же снимком возвращает
# систему к этому состоянию.

set -euo pipefail

ARCHIVE="${1:-}"
if [[ -z "$ARCHIVE" || ! -f "$ARCHIVE" ]]; then
  echo "❌ Usage: $0 <snapshot.tar.gz>"
  exit 1
fi

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"
ARCHIVE_ABS="$(realpath "$ARCHIVE")"

IMAGE_TAG="realty-app:latest"
COMPOSE_FILE="docker-compose.prod.yml"
# Хост-порт постгреса, проброшен compose'ом на 127.0.0.1. Используется
# build-стадией через --network=host (BuildKit не умеет в кастомные сети).
BUILD_DB_HOST="127.0.0.1"
BUILD_DB_PORT="5432"

# ---------- Step 1: preflight ----------
if [[ ! -f .env ]]; then
  echo "❌ .env not found at $ROOT_DIR"
  echo "   Copy .env.example to .env and fill in production secrets first."
  exit 1
fi

if ! command -v docker &>/dev/null; then
  echo "❌ docker not installed"
  exit 1
fi

if docker compose version &>/dev/null; then
  COMPOSE="docker compose -f $COMPOSE_FILE"
elif command -v docker-compose &>/dev/null; then
  COMPOSE="docker-compose -f $COMPOSE_FILE"
  echo "  ℹ Using legacy docker-compose (v1)"
else
  echo "❌ Neither 'docker compose' plugin nor legacy 'docker-compose' installed."
  exit 1
fi

# Load env vars for use in this script
# shellcheck disable=SC1091
set -a
source .env
set +a

# ---------- Step 2: unpack snapshot ----------
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

echo "▸ Unpacking snapshot..."
tar -xzf "$ARCHIVE_ABS" -C "$WORK"

if [[ ! -f "$WORK/db.sql" ]]; then
  echo "❌ archive is malformed: db.sql not found"
  exit 1
fi

cat "$WORK/MANIFEST.txt" 2>/dev/null || true

# ---------- Step 3: bring up Postgres ----------
echo "▸ Starting postgres..."
$COMPOSE up -d postgres

echo "▸ Waiting for postgres to become healthy..."
for i in {1..60}; do
  status="$($COMPOSE ps --format json postgres 2>/dev/null | grep -o '"Health":"healthy"' || true)"
  if [[ -n "$status" ]]; then break; fi
  if [[ $i -eq 60 ]]; then echo "❌ postgres did not become healthy in 2 min"; exit 1; fi
  sleep 2
done

# ---------- Step 4: restore database + media ----------
echo "▸ Restoring database..."
$COMPOSE exec -T postgres \
  psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" \
  < "$WORK/db.sql" >/dev/null 2>&1 || {
    # psql exits non-zero on warnings — re-run to capture real errors
    echo "  (psql reported issues; full output:)"
    $COMPOSE exec -T postgres psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" < "$WORK/db.sql"
  }

echo "▸ Restoring media files..."
if [[ -d "$WORK/media" ]]; then
  mkdir -p public/media
  if command -v rsync &>/dev/null; then
    rsync -a "$WORK/media/" public/media/
  else
    cp -r "$WORK/media/." public/media/
  fi
  echo "  ✓ copied $(find "$WORK/media" -type f | wc -l) files"
fi

# ---------- Step 5: build app image with DB access ----------
# Build-стадия должна достучаться до postgres-контейнера. BuildKit
# поддерживает только host/none/default network mode, поэтому идём через
# host-сеть, а compose проброшен postgres на 127.0.0.1:5432.
echo "▸ Verifying postgres is reachable on $BUILD_DB_HOST:$BUILD_DB_PORT..."
for i in {1..30}; do
  if (echo > /dev/tcp/${BUILD_DB_HOST}/${BUILD_DB_PORT}) >/dev/null 2>&1; then
    echo "  ✓ reachable"
    break
  fi
  if [[ $i -eq 30 ]]; then
    echo "❌ Cannot reach postgres on ${BUILD_DB_HOST}:${BUILD_DB_PORT}."
    echo "   Check that docker-compose.prod.yml exposes port 5432 on 127.0.0.1."
    exit 1
  fi
  sleep 1
done

echo "▸ Building app image with build-time DB access..."
echo "  (this is the slow step — 5-10 min depending on RAM)"

docker build \
  --network=host \
  --build-arg DATABASE_URI="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${BUILD_DB_HOST}:${BUILD_DB_PORT}/${POSTGRES_DB}" \
  --build-arg PAYLOAD_SECRET="${PAYLOAD_SECRET}" \
  --build-arg NEXT_PUBLIC_SERVER_URL="${NEXT_PUBLIC_SERVER_URL}" \
  --build-arg NEXT_PUBLIC_MAPBOX_TOKEN="${NEXT_PUBLIC_MAPBOX_TOKEN:-}" \
  --build-arg NEXT_PUBLIC_MAPBOX_STYLE="${NEXT_PUBLIC_MAPBOX_STYLE:-mapbox://styles/mapbox/streets-v12}" \
  --build-arg CRON_SECRET="${CRON_SECRET}" \
  --build-arg PREVIEW_SECRET="${PREVIEW_SECRET}" \
  -t "$IMAGE_TAG" \
  -f Dockerfile \
  .

# ---------- Step 6: start the app ----------
echo "▸ Starting app..."
$COMPOSE up -d app

# ---------- Step 7: health check ----------
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
