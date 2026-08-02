#!/usr/bin/env bash
# Ежедневный дамп PostgreSQL (с поддержкой pgvector) и отправка в S3-хранилище.
# Использование: ./scripts/daily-backup.sh
#
# Требует установленного aws-cli и запущенного docker-контейнера с postgres.
# Параметры S3 читаются из .env:
# S3_ENDPOINT, S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION

set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ ! -f .env ]]; then
  echo "❌ .env не найден в $ROOT_DIR — сначала скопируйте .env.example."
  exit 1
fi

# Загружаем переменные окружения
set -a
# shellcheck disable=SC1091
source .env
set +a

# Проверка наличия необходимых S3-переменных
if [[ -z "${S3_BUCKET:-}" || -z "${AWS_ACCESS_KEY_ID:-}" || -z "${AWS_SECRET_ACCESS_KEY:-}" ]]; then
    echo "❌ Отсутствуют необходимые переменные окружения для S3 (S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)."
    exit 1
fi

TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

ARCHIVE_NAME="realty-db-$TIMESTAMP.sql.gz"
ARCHIVE_PATH="$WORKDIR/$ARCHIVE_NAME"

echo "▸ Создание дампа PostgreSQL (база: ${POSTGRES_DB:-postgres})..."
# pg_dump корректно обрабатывает расширения, включая pgvector
docker compose exec -T postgres \
  pg_dump \
    -U "${POSTGRES_USER:-postgres}" \
    -d "${POSTGRES_DB:-postgres}" \
    --no-owner --clean --if-exists | gzip > "$ARCHIVE_PATH"

SIZE="$(du -h "$ARCHIVE_PATH" | awk '{print $1}')"
echo "✅ Дамп успешно создан: $ARCHIVE_NAME ($SIZE)"

echo "▸ Отправка в S3-хранилище (bucket: $S3_BUCKET)..."
ENDPOINT_FLAG=""
if [[ -n "${S3_ENDPOINT:-}" ]]; then
    ENDPOINT_FLAG="--endpoint-url $S3_ENDPOINT"
fi

# Используем aws s3 cp для загрузки в бакет
aws s3 cp "$ARCHIVE_PATH" "s3://$S3_BUCKET/backups/$ARCHIVE_NAME" $ENDPOINT_FLAG

echo "✅ Бэкап успешно отправлен в безопасное хранилище."
