#!/usr/bin/env bash
# Wrapper для docker compose, чтобы не словить "POSTGRES_USER is not set"
# warning при ручных операциях (logs, ps, restart, exec).
#
# Использование:
#   ./scripts/dc.sh logs -f app
#   ./scripts/dc.sh ps
#   ./scripts/dc.sh restart app
#
# Сорсит .env (для INFISICAL_TOKEN/URL), затем через Infisical CLI
# (если есть) подгружает боевые секреты в текущий шелл. Не падает
# если Infisical нет — просто работает на .env.

set -euo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ -f .env ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

if command -v infisical &>/dev/null && \
   { [[ -n "${INFISICAL_TOKEN:-}" ]] || [[ -f .infisical.json ]]; }; then
  set -a
  eval "$(infisical export --env="${INFISICAL_ENV:-prod}" --format=dotenv-export)"
  set +a
fi

exec docker compose -f docker-compose.prod.yml "$@"
