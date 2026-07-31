# Настройка аналитики (Yandex Metrika + GA4)

Счётчики уже зашиты в код как production-defaults:
- **Yandex Metrika**: `109710917`
- **GA4**: `G-L7KQ9W2PJ8`

После `./scripts/deploy.sh` они начнут собирать данные автоматически.
Переменные `NEXT_PUBLIC_YANDEX_METRIKA_ID` / `NEXT_PUBLIC_GA4_ID` в `.env`
нужны только если хочешь подменить id для dev/staging-окружения.

## 1. Yandex Metrika

Счётчик `109710917` уже работает. В админке Метрики:

1. Открыть https://metrika.yandex.ru/dashboard?id=109710917
2. Убедиться что включены: Вебвизор, Карта кликов, Точный показатель отказов.

### Цели для отслеживания

В Метрике → Настройка → Цели → создать 4 JavaScript-цели:

| Goal ID         | Что трекает                          | Когда вызывается              |
|-----------------|--------------------------------------|-------------------------------|
| `phone_reveal`  | Клик «Показать телефон»              | Property detail page          |
| `message_sent`  | Отправка сообщения риэлтору          | MessagePopup → submit         |
| `lead_callback` | «Заказать звонок» отправлена         | CallbackForm → submit         |
| `ai_search`     | AI-запрос в hero-поиск               | /search?ai=1 → результат      |

Эти goal id уже зашиты в код через `trackEvent(name, params)` — просто
создаёшь их в админке Метрики с тем же id.

## 2. Google Analytics 4

Поток `G-L7KQ9W2PJ8` уже работает. В админке GA4:

1. https://analytics.google.com → выбрать property с этим ID.
2. Подтвердить что хост `example.com` в Data Streams → Web.

### Конверсии для отслеживания

В GA4 → Admin → Conversions → New conversion event:
- `phone_reveal`
- `message_sent`
- `lead_callback`
- `ai_search`

Имена должны точно совпадать с теми что выше. Через 24 часа после
первых событий — пометить их как «Conversion» в UI.

## 3. Деплой

```bash
cd ~/payloadcms-realestate-template
git pull origin main
./scripts/deploy.sh    # пересобирает app, защёлкивает счётчики в bundle
```

NEXT_PUBLIC_* (и хардкод-defaults) запекаются на этапе build —
после rebuild появятся сразу. Никакого .env-редактирования больше
не нужно.

## 4. Проверка что счётчики установлены

```bash
curl -s https://example.com/ | grep -oE 'metrika.yandex|googletagmanager'
# Должно вернуть оба источника
```

В админке Метрики/GA4 — «Сводка» / «Realtime» — должны появиться
первые посещения за 5–10 минут.

## 5. Что трекается из коробки

`/lib/analytics.ts` экспортирует `trackEvent(name, params)` — один вызов
шлёт событие обоим провайдерам. Уже встроено в:

- (TODO после задач #4, #5 из аудита) — phone_reveal, message_sent,
  lead_callback. Эти места появятся отдельными коммитами.

Если нужно добавить свой trigger в новом компоненте:

```ts
'use client'
import { trackEvent } from '@/lib/analytics'

// внутри обработчика
trackEvent('listing_share', { collection: 'flats', id: listing.id })
```
