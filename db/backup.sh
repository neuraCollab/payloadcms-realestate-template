#!/usr/bin/env bash
# Refresh db/dump.sql from the running postgres container.
# Use this any time you've added/changed content in /admin and want to
# bake the current state into the repo for the next deployment.

set -euo pipefail

SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
REPO_ROOT="$( cd -- "$SCRIPT_DIR/.." &> /dev/null && pwd )"
DUMP_FILE="$SCRIPT_DIR/dump.sql"

if [ -f "$REPO_ROOT/.env" ]; then
  set -a
  # shellcheck disable=SC1091
  . "$REPO_ROOT/.env"
  set +a
fi

POSTGRES_USER="${POSTGRES_USER:-admin}"
POSTGRES_DB="${POSTGRES_DB:-mydb}"
CONTAINER="${POSTGRES_CONTAINER:-my_postgres}"

echo "→ Dumping $POSTGRES_DB from $CONTAINER…"
docker exec "$CONTAINER" pg_dump \
  -U "$POSTGRES_USER" \
  -d "$POSTGRES_DB" \
  --clean --if-exists --no-owner --no-privileges \
  > "$DUMP_FILE"

echo "✓ Wrote $(wc -l < "$DUMP_FILE") lines to $DUMP_FILE"
