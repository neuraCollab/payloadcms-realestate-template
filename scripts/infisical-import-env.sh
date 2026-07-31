#!/usr/bin/env bash
# Одноразовая миграция: переносит секреты из локального .env в Infisical.
# Запускать ПОСЛЕ:
#   1. Регистрации в Infisical (https://app.infisical.com)
#   2. Создания проекта Demo Realty + environment 'prod'
#   3. Логина: `infisical login` (или infisical login --machine-identity)
#
# Использование:
#   ./scripts/infisical-import-env.sh [path-to-.env]
#
# Безопасно к повторному запуску — Infisical обновит существующие
# значения, не создаст дубли.

set -euo pipefail

ENV_FILE="${1:-.env}"
TARGET_ENV="${INFISICAL_ENV:-prod}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "❌ Не найден $ENV_FILE"
  exit 1
fi

if ! command -v infisical &>/dev/null; then
  echo "❌ Infisical CLI не установлена. См. docs/INFISICAL-SETUP.md → пункт 'Установка CLI'"
  exit 1
fi

echo "▸ Импорт $ENV_FILE в Infisical environment='$TARGET_ENV'..."

# Пропускаем пустые строки и комментарии. Для каждой KEY=VALUE дёргаем
# `infisical secrets set`. Это в одну сессию, авторизация уже сделана
# через `infisical login` в текущем терминале.
imported=0
skipped=0
while IFS='=' read -r key value; do
  # Очищаем
  key="$(echo "$key" | tr -d '[:space:]')"
  # Пропускаем комментарии и пустые
  [[ -z "$key" ]] && continue
  [[ "$key" == \#* ]] && continue
  # Удаляем кавычки если значение в '' или ""
  value="${value%\"}"
  value="${value#\"}"
  value="${value%\'}"
  value="${value#\'}"
  if [[ -z "$value" ]]; then
    echo "  - пропускаем $key (пустое значение)"
    skipped=$((skipped + 1))
    continue
  fi

  infisical secrets set "$key=$value" --env="$TARGET_ENV" >/dev/null
  echo "  ✓ $key"
  imported=$((imported + 1))
done < "$ENV_FILE"

echo ""
echo "✅ Импортировано: $imported, пропущено: $skipped"
echo ""
echo "Следующий шаг:"
echo "  1. Открыть https://app.infisical.com → проверить значения"
echo "  2. Создать service-token для прод-сервера (см. INFISICAL-SETUP.md)"
echo "  3. Установить INFISICAL_TOKEN в .env сервера ИЛИ положить .infisical.json"
echo "  4. Удалить старый .env (после убеждения что всё работает)"
