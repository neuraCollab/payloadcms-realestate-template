# Настройка аналитики (Yandex Metrika + GA4)

Шаги для тебя — заполнить вручную через админ-консоли провайдеров,
вернуть готовые id в `.env`, пересобрать app.

## 1. Yandex Metrika

1. https://metrika.yandex.ru/list → «+ Добавить счётчик»
2. Имя счётчика: `MegaDomic`, адрес `https://megadomic.ru`.
3. **Включить** обязательно:
   - Вебвизор (запись сессий)
   - Карта кликов
   - Точный показатель отказов
4. Скопировать **id счётчика** (8-значное число, например `12345678`).
5. На сервере в `.env`:
   ```
   NEXT_PUBLIC_YANDEX_METRIKA_ID=12345678
   ```

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

1. https://analytics.google.com → Admin → Create Property.
2. Property name: `MegaDomic`, time zone: `Europe/Moscow`, currency: RUB.
3. Reporting → Data Streams → Web → Stream name: `megadomic.ru`.
4. Скопировать **Measurement ID** (формат `G-XXXXXXXXXX`).
5. На сервере в `.env`:
   ```
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```

### Конверсии для отслеживания

В GA4 → Admin → Conversions → New conversion event:
- `phone_reveal`
- `message_sent`
- `lead_callback`
- `ai_search`

Имена должны точно совпадать с теми что выше. Через 24 часа после
первых событий — пометить их как «Conversion» в UI.

## 3. Перезапуск с новыми переменными

```bash
cd ~/payloadcms-realestate-template
# .env уже содержит оба id (см. выше)
./scripts/deploy.sh    # пересобирает app с NEXT_PUBLIC_* в bundle
```

NEXT_PUBLIC_* запекаются на этапе build, поэтому без rebuild новые
значения не подхватятся даже после `restart`.

## 4. Проверка что счётчики установлены

```bash
curl -s https://megadomic.ru/ | grep -oE 'metrika.yandex|googletagmanager'
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
