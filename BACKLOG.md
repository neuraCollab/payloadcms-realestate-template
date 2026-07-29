# Backlog

## [1] Добавить аналитику для действий \`phone_reveal\`, \`message_sent\`, \`ai_search\`

**Тип:** feature
**Приоритет:** high
**Файлы:**
- \`src/components/MaskedPhone/index.tsx\`
- \`src/components/PropertyDetailPage/MessagePopup.tsx\`
- \`src/app/(frontend)/search/page.tsx\`
- \`src/app/(frontend)/search/page.client.tsx\`

**Контекст:**
В файле \`docs/ANALYTICS-SETUP.md\` есть TODO: "после задач #4, #5 из аудита — phone_reveal, message_sent, lead_callback".
Событие \`lead_callback\` уже интегрировано (см. \`ContactDialog.tsx\`). Однако, \`phone_reveal\` (раскрытие номера телефона), \`message_sent\` (отправка сообщения риэлтору) и \`ai_search\` (AI-запрос в поиске) не триггерятся.

**Что нужно сделать:**
1. \`MaskedPhone/index.tsx\`: импортировать \`trackEvent\` из \`@/lib/analytics\`. В \`onClick\` кнопки добавить \`trackEvent('phone_reveal')\`. Для передачи коллекции и id можно добавить опциональные пропсы \`collection?: string\` и \`propertyId?: string\`, чтобы передавать их в событие (как описано в документации).
2. \`MessagePopup.tsx\`: после успешной отправки сообщения (внутри \`handleSubmit\`, перед/после \`setSent(true)\`) добавить вызов \`trackEvent('message_sent', { collection: propertyCollection, id: String(propertyId) })\`.
3. \`search/page.client.tsx\`: добавить \`useEffect\`, который проверяет пропс (например \`isAiSearch: boolean\`) и вызывает \`trackEvent('ai_search')\`. В \`search/page.tsx\` прокинуть этот пропс в \`PageClient\`.

**Критерии приёмки:**
- Вызов \`trackEvent('phone_reveal')\` срабатывает при клике на замаскированный номер.
- Вызов \`trackEvent('message_sent')\` срабатывает при успешной отправке формы сообщения.
- Вызов \`trackEvent('ai_search')\` срабатывает при открытии страницы поиска с AI-режимом (наличие \`ai=1\` в query-параметрах).
- Все существующие тесты остаются зелёными.

**Оценка сложности:** small (< 30 мин)

---

## [2] Устранить ошибки линтера: модуль \`lib/\`

**Тип:** tech-debt
**Приоритет:** medium
**Файлы:**
- \`src/lib/embeddings/serialize.ts\`
- \`src/lib/embeddings/store.ts\`
- \`src/lib/recommend/index.ts\`
- \`src/lib/seo/generate.ts\`
- \`src/lib/telegram/client.ts\`
И другие файлы внутри \`src/lib/\`.

**Контекст:**
В модуле \`lib/\` сосредоточено много бизнес-логики с использованием \`any\`. Команда \`pnpm lint\` падает (\`Command failed with exit code 1\`) из-за обилия предупреждений и ошибок.

**Что нужно сделать:**
1. Прописать строгие типы для принимаемых и возвращаемых значений функций.
2. Если тип невозможно вывести из-за Payload CMS, использовать \`@ts-expect-error\` или \`eslint-disable\` с комментарием.

**Критерии приёмки:**
- Запуск \`pnpm lint\` не выдает ошибок для папки \`src/lib/\`.

**Оценка сложности:** medium (30–90 мин)

---

## [3] Устранить ошибки линтера: UI компоненты и конфигурация Payload

**Тип:** tech-debt
**Приоритет:** medium
**Файлы:**
- \`src/Header/MobileNav.tsx\`
- \`src/app/(frontend)/(sitemaps)/*\`
- \`src/migrations/*\`
- \`src/utilities/*\`
И другие файлы вне \`src/lib/\`.

**Контекст:**
Остаточные ошибки линтера в UI-слое, миграциях и роутах Next.js.

**Что нужно сделать:**
1. Убрать/типизировать неиспользуемые переменные (например, \`ALL_FILTER_SLUGS\` в \`src/app/(frontend)/[slug]/[filterSlug]/page.tsx\`, неиспользуемые \`payload\` и \`req\` в миграциях).
2. Заменить \`any\` на конкретные типы компонентов или роутов.

**Критерии приёмки:**
- \`pnpm lint\` завершается успешно для всего проекта (exit code 0).

**Оценка сложности:** medium (30–90 мин)

---

## [4] Автоматизировать seed-данных для E2E-тестов

**Тип:** test
**Приоритет:** medium
**Файлы:**
- \`tests/e2e/smoke.spec.ts\`
- \`playwright.config.ts\` или скрипт в \`scripts/\`

**Контекст:**
Тесты в Playwright (smoke-тест и UI-тесты) падают (Connection Refused или 404), так как они зависят от запущенного сервера и, что более важно, от наличия данных в базе (например, \`/home-v2\`, \`/flats/non-existing-slug\`, \`/robots.txt\`). Сейчас данные заливаются вручную через `curl` (согласно \`README.md\`).

**Что нужно сделать:**
1. Реализовать глобальный \`globalSetup\` в Playwright, который будет отправлять POST-запросы к эндпоинтам сидирования (\`/next/seed-cities\`, \`/next/seed-globals\`, \`/next/seed-pages\`, \`/next/seed-posts\`, \`/next/parse-listings?per=20\`), либо создать npm-скрипт.
2. Проверять доступность dev-сервера перед запуском E2E-тестов. В `playwright.config.ts` раскомментировать или настроить \`webServer\` для автоматического запуска \`pnpm dev\` или `docker compose up`.

**Критерии приёмки:**
- Вызов \`pnpm test:e2e:smoke\` (и \`pnpm test:e2e\`) работает в чистом репозитории (поднимает сервер, заливает данные, прогоняет тесты).
- Smoke-тесты проходят успешно и возвращают ожидаемые HTTP-статусы.

**Оценка сложности:** medium (30–90 мин)

---

## [5] Обработка ошибок в API-роутах (swallowed errors)

**Тип:** bug
**Приоритет:** medium
**Файлы:**
- \`src/app/(payload)/api/telegram/webhook/route.ts\`
- \`src/app/(payload)/api/leads/route.ts\`
И другие роуты в \`src/app/(payload)/api/\`, использующие \`catch\` блоки.

**Контекст:**
В некоторых API-роутах (например, в \`/api/telegram/webhook\`, \`/api/leads\`) блоки \`catch\` используют \`console.error\`, но в некоторых местах возвращают 200 OK или глушат ошибку без информирования клиента, либо используют \`any\` для типизации ошибки. Это может скрывать реальные проблемы интеграции и усложнять отладку на проде.

**Что нужно сделать:**
1. Провести аудит \`catch (e)\` в \`src/app/(payload)/api/*\`.
2. В случае ошибки возвращать корректный HTTP статус код (например, \`500 Internal Server Error\` или \`400 Bad Request\`) вместо \`return new Response('OK')\` (если это не продиктовано требованиями webhook-провайдера, как в Telegram, где иногда нужно вернуть 200, чтобы он не слал повторно, но нужно как минимум логировать).
3. Избегать конструкций \`catch {}\`, полностью проглатывающих ошибку. Если игнорирование ошибки обосновано, добавить комментарий.

**Критерии приёмки:**
- Обработка ошибок во всех API роутах явная, ошибки логируются.
- Клиент получает корректный HTTP-статус при сбоях (кроме случаев спецификации webhook-ов).
- Тесты API (api-contracts.spec.ts) остаются успешными.

**Оценка сложности:** medium (30–90 мин)

---
## Сводка

- **High:** 1 (1 feature)
- **Medium:** 4 (2 tech-debt, 1 test, 1 bug)
- **Low:** 0
- **Total:** 5 задач

## Требуют уточнения
- В документации (`docs/ANALYTICS-SETUP.md`) указано `ai_search: AI-запрос в hero-поиск (/search?ai=1 -> результат)`. Нужно ли отправлять событие только один раз при загрузке страницы с `ai=1` (через клиентский `useEffect`), или также при выполнении самого поиска из Hero-блока на клиенте, когда происходит навигация?
- Следует ли в e2e тестах автоматически поднимать docker-compose стек для Postgres, если он не запущен локально, или предполагается, что разработчик/CI сам запускает \`docker compose up\` перед \`pnpm test:e2e\` (в \`README.md\` описано, что для CI нужно сначала поднять docker-compose).
