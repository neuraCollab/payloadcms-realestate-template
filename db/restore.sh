#!/usr/bin/env bash
# Restore the Postgres database from db/dump.sql into the running
# `postgres` Docker Compose service.
#
# Usage (from the repo root):
#   ./db/restore.sh
#
# Prerequisites:
#   - Docker + Docker Compose are running.
#   - `docker compose up -d postgres` has been executed at least once
#     (the postgres container is healthy and listening).
#   - .env is present so the script picks up POSTGRES_USER / _DB.
#
# Effect:
#   - All existing tables/data in $POSTGRES_DB are dropped and replaced.
#     The dump was produced with --clean --if-exists.
#
# Safe to re-run.

set -euo pipefail

# Resolve absolute path of this script's directory.
SCRIPT_DIR="$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
REPO_ROOT="$( cd -- "$SCRIPT_DIR/.." &> /dev/null && pwd )"
DUMP_FILE="$SCRIPT_DIR/dump.sql"

if [ ! -f "$DUMP_FILE" ]; then
  echo "✗ Dump not found at $DUMP_FILE" >&2
  exit 1
fi

# Load env so we know the DB name and user.
if [ -f "$REPO_ROOT/.env" ]; then
  # shellcheck disable=SC1091
  set -a
  . "$REPO_ROOT/.env"
  set +a
fi

POSTGRES_USER="${POSTGRES_USER:-admin}"
POSTGRES_DB="${POSTGRES_DB:-mydb}"
SERVICE="${POSTGRES_SERVICE:-postgres}"
CONTAINER="${POSTGRES_CONTAINER:-my_postgres}"

# Wait until postgres is ready.
echo "→ Waiting for $CONTAINER to be ready…"
until docker exec "$CONTAINER" pg_isready -U "$POSTGRES_USER" -d "$POSTGRES_DB" -q; do
  sleep 1
done

echo "→ Restoring $DUMP_FILE into $POSTGRES_DB as $POSTGRES_USER…"
docker exec -i "$CONTAINER" psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -v ON_ERROR_STOP=0 < "$DUMP_FILE"

echo "✓ Restore complete."
