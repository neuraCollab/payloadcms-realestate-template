# Тесты

Две независимых пирамиды: unit-тесты на pure-функции и Playwright e2e на
запущенное приложение.

## Unit-тесты

Не требуют запущенного сервера. Используют встроенный `node:test`.

```bash
pnpm test:unit
```

Покрывают:

| Файл | Что |
|------|-----|
| `tests/unit/marketAnalytics.test.ts` | aggregateStats / compareSubject / monthlyTrend |
| `tests/unit/csv.test.ts` | CSV-парсер (кавычки, BOM, CRLF, экранирование) |
| `tests/unit/cityUrls.test.ts` | parseFilterSlug + ALL_FILTER_SLUGS |
| `tests/unit/threadId.test.ts` | детерминированность + case-insensitive email |

## E2E

Перед запуском нужен поднятый dev-сервер на `http://localhost:3000`
(см. главный `README.md` — `docker compose up -d` или `pnpm dev`).

```bash
# Все спеки (chromium + mobile, кроме smoke которая только chromium)
pnpm test:e2e

# Только smoke (быстрый HTTP-чек)
pnpm test:e2e:smoke

# С UI-окном для отладки
pnpm test:e2e:headed

# После прогона
pnpm test:e2e:report
```

| Спека | Что |
|-------|-----|
| `tests/e2e/smoke.spec.ts` | HTTP 200 на всех публичных роутах + 404 на несуществующих |
| `tests/e2e/pages-content.spec.ts` | UI-контент на /home-v2, /about, /contact, /agents, /privacy, /terms, /404 |
| `tests/e2e/listings-and-search.spec.ts` | /flats sort + view toggle + advanced filters; /search submit URL-state; локализованные /kimry-URL'ы |
| `tests/e2e/property-detail.spec.ts` | детальная страница: галерея, favorite toggle, mortgage калькулятор, MessagePopup |
| `tests/e2e/cabinet.spec.ts` | login форма, sidebar, пустые состояния favorites/recent, cookie consent |
| `tests/e2e/api-contracts.spec.ts` | `/api/cabinet/session`, honeypot/validation на `/api/messages` и `/api/reviews`, `/api/cabinet/messages` без cookie → 401 |
| `tests/e2e/forms.spec.ts` (был раньше) | UI-проверки старых форм |
| `tests/e2e/realestate.spec.ts` (был раньше) | базовые сценарии каталога |

## CI-вариант

```bash
# В docker-compose стеке (после `docker compose up -d`)
pnpm test:e2e:smoke   # минимум — гарантирует что приложение поднялось
pnpm test:e2e         # полный прогон (5–10 мин на холодном dev-кеше)
```

Skip-логика: тесты на `/flats/[slug]` пропускаются автоматически, если в
БД нет квартир (свежая установка). Запусти seed перед прогоном:

```bash
curl -X POST http://localhost:3000/next/seed-cities
curl -X POST http://localhost:3000/next/seed-globals
curl -X POST http://localhost:3000/next/seed-pages
curl -X POST http://localhost:3000/next/seed-posts
curl -X POST http://localhost:3000/next/parse-listings?per=20
```
