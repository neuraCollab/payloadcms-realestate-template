#!/usr/bin/env bash
# Production deployment.
#
# Без снимка — только пересобирает образ из текущего кода и
# перезапускает app. Полезно для обычного «code push → deploy».
#   ./scripts/deploy.sh
#
# Со снимком — дополнительно восстанавливает БД и media:
#   ./scripts/deploy.sh <snapshot.tar.gz>
#
# Steps:
#   1. Preflight (env, docker, compose)
#   2. [optional] Unpack snapshot, sanity-check SHA
#   3. Postgres up + wait healthy
#   4. [optional] Restore db.sql + media
#   5. docker build (с доступом к Postgres через --network=host) → realty-app:latest
#   6. App up + health-check
#
# Safe to re-run. Idempotent.

set -euo pipefail

ARCHIVE="${1:-}"
if [[ -n "$ARCHIVE" && ! -f "$ARCHIVE" ]]; then
  echo "❌ Snapshot не найден: $ARCHIVE"
  exit 1
fi
RESTORE_FROM_SNAPSHOT=0
if [[ -n "$ARCHIVE" ]]; then
  RESTORE_FROM_SNAPSHOT=1
fi

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"
if [[ $RESTORE_FROM_SNAPSHOT -eq 1 ]]; then
  ARCHIVE_ABS="$(realpath "$ARCHIVE")"
fi

# -------- Step 1: preflight --------
# Источник секретов: либо локальный .env, либо Infisical CLI.
# Infisical активируется автоматически если найдена `infisical` CLI
# + установлен INFISICAL_TOKEN (или есть .infisical.json).
# .env остаётся как fallback на случай если Infisical не настроен —
# для одноразовых ручных деплоев.
USE_INFISICAL=0
if command -v infisical &>/dev/null; then
  if [[ -n "${INFISICAL_TOKEN:-}" ]] || [[ -f .infisical.json ]]; then
    USE_INFISICAL=1
    echo "▸ Источник секретов: Infisical (.env не требуется)"
  fi
fi

if [[ $USE_INFISICAL -eq 0 ]]; then
  if [[ ! -f .env ]]; then
    echo "❌ Не найдены ни .env, ни Infisical (CLI или токен)."
    echo "   Варианты:"
    echo "     • Скопировать .env.example в .env и заполнить."
    echo "     • Установить Infisical CLI: см. docs/INFISICAL-SETUP.md"
    exit 1
  fi
  echo "▸ Источник секретов: .env (Infisical CLI не активна)"
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

# -------- Step 2: unpack snapshot (optional) --------
WORK=""
if [[ $RESTORE_FROM_SNAPSHOT -eq 1 ]]; then
  WORK="$(mktemp -d)"
  trap 'rm -rf "$WORK"' EXIT

  echo "▸ Unpacking snapshot..."
  tar -xzf "$ARCHIVE_ABS" -C "$WORK"

  if [[ ! -f "$WORK/db.sql" ]]; then
    echo "❌ archive is malformed: db.sql not found"
    exit 1
  fi

  cat "$WORK/MANIFEST.txt" 2>/dev/null || true

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
fi

# -------- Step 3: bring up Postgres (always) --------
# Загружаем секреты в окружение. Infisical CLI работает прозрачно —
# `infisical export --format=dotenv` отдаёт нам .env-формат, source'им как обычно.
if [[ $USE_INFISICAL -eq 1 ]]; then
  echo "▸ Loading secrets from Infisical..."
  # --format=dotenv-export даёт `export KEY=VALUE` строки, пригодные
  # для eval. Тише чем pipe в source.
  INFISICAL_SECRETS="$(infisical export --env="${INFISICAL_ENV:-prod}" --format=dotenv-export 2>/dev/null)"
  if [[ -z "$INFISICAL_SECRETS" ]]; then
    echo "❌ Infisical export вернул пусто. Проверьте INFISICAL_TOKEN/.infisical.json"
    exit 1
  fi
  set -a
  eval "$INFISICAL_SECRETS"
  set +a
else
  # shellcheck disable=SC1091
  set -a
  source .env
  set +a
fi

echo "▸ Starting postgres..."
$COMPOSE up -d postgres

echo "▸ Waiting for postgres to become healthy..."
for i in {1..30}; do
  status="$($COMPOSE ps --format json postgres 2>/dev/null | grep -o '"Health":"healthy"' || true)"
  if [[ -n "$status" ]]; then break; fi
  sleep 2
done

# -------- Step 4: restore database + media (optional) --------
if [[ $RESTORE_FROM_SNAPSHOT -eq 1 ]]; then
  # Снимок от PowerShell иногда содержит UTF-16 BOM (0xff 0xfe). psql
  # выдаёт `invalid byte sequence for encoding "UTF8"`. Снимаем BOM
  # «на лету» через iconv/sed, после чего пайпим в psql.
  echo "▸ Restoring database..."
  if head -c2 "$WORK/db.sql" | grep -q $'\xff\xfe'; then
    echo "  ℹ detected UTF-16 BOM — converting to UTF-8 before restore"
    iconv -f UTF-16 -t UTF-8 "$WORK/db.sql" \
      | $COMPOSE exec -T postgres psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}"
  else
    # Также страхуемся от обычного UTF-8 BOM (0xef 0xbb 0xbf).
    sed -e '1s/^\xEF\xBB\xBF//' "$WORK/db.sql" \
      | $COMPOSE exec -T postgres psql -U "${POSTGRES_USER}" -d "${POSTGRES_DB}"
  fi

  echo "▸ Restoring media files..."
  if [[ -d "$WORK/media" ]]; then
    mkdir -p public/media
    if command -v rsync &>/dev/null; then
      rsync -a "$WORK/media/" public/media/
    else
      cp -r "$WORK/media/." public/media/
    fi
    echo "  ✓ copied $(find "$WORK/media" -type f | wc -l) files"
  else
    echo "  ⚠ no media/ dir in snapshot"
  fi
else
  echo "▸ Skip DB restore (no snapshot passed) — используем существующую БД."
fi

# -------- Step 5: build app image --------
# ВАЖНО: docker build, НЕ `compose build`. docker-compose.prod.yml
# не содержит секции build: для app — он рассчитывает на готовый
# realty-app:latest. Это сделано чтобы билд получил доступ к postgres
# через --network=host для generateStaticParams во время билда.
echo "▸ Building realty-app:latest (это 2–5 мин)..."
docker build \
  --network=host \
  --build-arg DATABASE_URI="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@127.0.0.1:5432/${POSTGRES_DB}" \
  --build-arg PAYLOAD_SECRET="${PAYLOAD_SECRET}" \
  --build-arg NEXT_PUBLIC_SERVER_URL="${NEXT_PUBLIC_SERVER_URL}" \
  --build-arg NEXT_PUBLIC_MAPBOX_TOKEN="${NEXT_PUBLIC_MAPBOX_TOKEN:-}" \
  --build-arg NEXT_PUBLIC_MAPBOX_STYLE="${NEXT_PUBLIC_MAPBOX_STYLE:-mapbox://styles/mapbox/streets-v12}" \
  --build-arg NEXT_PUBLIC_YANDEX_METRIKA_ID="${NEXT_PUBLIC_YANDEX_METRIKA_ID:-}" \
  --build-arg NEXT_PUBLIC_GA4_ID="${NEXT_PUBLIC_GA4_ID:-}" \
  --build-arg CRON_SECRET="${CRON_SECRET}" \
  --build-arg PREVIEW_SECRET="${PREVIEW_SECRET}" \
  -t realty-app:latest \
  .

# -------- Step 6: (re)start app --------
echo "▸ Starting app..."
# Принудительный recreate — даже если image-tag не поменялся.
$COMPOSE up -d --force-recreate app

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
