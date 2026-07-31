import http from 'k6/http';
import { check, sleep } from 'k6';

// Конфигурация нагрузки: 100 одновременных пользователей
export const options = {
  vus: 100,
  duration: '30s', // Длительность теста - 30 секунд (можно настроить)
  thresholds: {
    // 95% запросов должны выполняться быстрее 2 секунд
    http_req_duration: ['p(95)<2000'],
    // Процент ошибок не должен превышать 1%
    http_req_failed: ['rate<0.01'],
  },
};

// Разнообразные поисковые запросы для AI-поиска
const searchQueries = [
  'квартира в центре с балконом',
  '2-комнатная квартира до 5 миллионов',
  'офис 100 квадратов',
  'дом с участком за городом',
  'студия рядом с метро',
  'коммерческое помещение под ресторан',
  'квартира с хорошим ремонтом',
  'новостройка с паркингом',
];

export default function () {
  // Выбираем случайный запрос из списка
  const randomQuery = searchQueries[Math.floor(Math.random() * searchQueries.length)];

  // Формируем URL для эндпоинта AI-поиска
  const url = `http://localhost:3000/api/ai-search?q=${encodeURIComponent(randomQuery)}&limit=10`;

  // Отправляем GET-запрос
  const res = http.get(url);

  // Проверяем успешность ответа (статус 200)
  check(res, {
    'is status 200': (r) => r.status === 200,
    'has data in response': (r) => {
        try {
            const body = JSON.parse(r.body);
            return body && Array.isArray(body.docs);
        } catch(e) {
            return false;
        }
    }
  });

  // Небольшая пауза между запросами (симуляция поведения реального пользователя)
  // Время можно варьировать или убрать, если нужна максимальная агрессивная нагрузка
  sleep(Math.random() * 2 + 1); // случайная пауза от 1 до 3 секунд
}
