# Demo Realty — setup on a new machine

Получи рабочую копию (dev + продовый деплой) с нуля. ~20 минут.

## 0. Что должно быть установлено

| Tool | Версия | Зачем |
|------|--------|-------|
| Node | 22.x | runtime для Next/Payload |
| pnpm | 10.3.0 | package manager |
| Docker | 24+ с compose v2 | postgres + prod build |
| Git | 2.40+ | |
| Infisical CLI | 0.30+ | секреты |

Установка на Windows (через scoop/chocolatey):
```powershell
scoop install nodejs-lts pnpm docker git
scoop bucket add org https://github.com/Infisical/scoop-infisical.git
scoop install infisical
```
macOS / Linux:
```bash
brew install node pnpm docker git
brew install infisical/get-cli/infisical
```

## 1. Доступы которые нужно получить у тимлида

Один раз перед началом:
- Приглашение в Infisical workspace `Demo Realty` (на твой email) — apply через
  https://app.infisical.com (региона **EU**)
- Read-доступ к GitHub репо
- (опц.) SSH key для прод-сервера — только тем кто деплоит руками

## 2. Клонируем + ставим зависимости

```bash
git clone https://github.com/neuraCollab/payloadcms-realestate-template.git
cd payloadcms-realestate-template
pnpm install --frozen-lockfile
```

## 3. Привязываем Infisical к проекту

```bash
infisical login
# браузер → подтвердить вход. Регион выбираем EU.

infisical init
# выбираем проект `Demo Realty` + env `dev` (для разработки)
# создаёт .infisical.json — он в .gitignore, не коммитим
```

Проверь что секреты подгружаются:
```bash
infisical secrets --env=dev | head
```

Если в команде ещё нет dev-окружения — попроси тимлида создать в Infisical
UI (Settings → Environments) и продублировать туда продовые значения.

## 4. Поднимаем dev

```bash
# postgres + pgvector через docker
docker compose up -d postgres

# wait ~5s для инициализации БД
infisical run --env=dev -- pnpm payload migrate

# dev-сервер
infisical run --env=dev -- pnpm dev
```

Открой http://localhost:3000 — главная.
Открой http://localhost:3000/admin — Payload админка, создай первого юзера.

## 5. (Опц.) Сидим тестовые данные

После создания первого admin'а:
```bash
SECRET=$(infisical secrets get CRON_SECRET --env=dev --plain)
curl -X POST http://localhost:3000/next/seed-home-seo -H "Authorization: Bearer $SECRET"
curl -X POST http://localhost:3000/next/seed-spb-listings -H "Authorization: Bearer $SECRET"
curl -X POST http://localhost:3000/next/seed-seo-posts -H "Authorization: Bearer $SECRET"
```

## 6. Полезные команды

```bash
# dev с инжекцией секретов
infisical run --env=dev -- pnpm dev

# typecheck + lint
pnpm typecheck
pnpm lint

# unit-тесты
pnpm test

# e2e (требует запущенный dev)
pnpm test:e2e

# создать новую миграцию после правок коллекций
infisical run --env=dev -- pnpm payload migrate:create

# применить pending миграции
infisical run --env=dev -- pnpm payload migrate
```

## 7. Деплой на прод

**Автоматически (рекомендуется):**
- `git push origin main` → GitHub Actions сам собирает образ + деплоит по SSH

**Вручную (если есть прод-SSH):**
```bash
ssh root@example.com
cd ~/payloadcms-realestate-template
./scripts/deploy.sh
```

Подробности: см. [docs/CI-CD-SETUP.md](docs/CI-CD-SETUP.md) и
[obsidian/недвижка/Infisical — централизованные секреты.md](obsidian/недвижка/Infisical%20—%20централизованные%20секреты.md).

## 8. Структура репо

```
src/
  collections/        # Payload коллекции (Flats, Houses, Lands, Commercial, Realtors, ...)
  globals/            # Singleton'ы (Header, Footer, LegalInfo)
  app/
    (frontend)/       # Next.js public pages
    (payload)/        # Payload admin + REST API
  lib/                # вспомогательное (embeddings, recommendations, seo, llm)
  migrations/         # SQL миграции — НЕ редактировать руками
scripts/
  deploy.sh           # ручной прод-деплой
  dc.sh               # обёртка docker compose с подгрузкой env
  snapshot.ps1        # снапшот БД + media для бэкапа
docs/                 # технические доки
obsidian/недвижка/    # русскоязычные note'ы для команды
```

## 9. Решение типичных проблем

| Симптом | Лечение |
|---------|---------|
| `relation "..." does not exist` | `pnpm payload migrate` |
| `missing secret key` | не запустил с `infisical run --env=dev --` |
| `connect ECONNREFUSED 5432` | `docker compose up -d postgres` |
| Infisical `not found` после migration | проверь регион (EU vs US) — в `.env` нужен `INFISICAL_API_URL=https://eu.infisical.com/api` |
| pnpm install падает на lockfile | `pnpm install --no-frozen-lockfile` (один раз) |
| build падает на `Invalid URL` | пустой `NEXT_PUBLIC_SERVER_URL` — задай в Infisical |

## 10. Куда смотреть детали

- Архитектура: [llms.txt](llms.txt) (быстрая ориентировка для AI-ассистентов)
- AI-ассистент / Claude Code: `CLAUDE.md`
- Развёрнутая инструкция по секретам: `obsidian/недвижка/Infisical — централизованные секреты.md`
- Чек-лист ручных шагов перед запуском: `obsidian/недвижка/Чек-лист — что сделать руками.md`
- CI/CD: `.github/workflows/deploy.yml`
- Постгрес/деплой: `scripts/deploy.sh`, `docker-compose.prod.yml`
