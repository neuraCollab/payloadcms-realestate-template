// utilities/geocode.ts
interface GeocodeResult {
  lat: number
  lng: number
  displayName: string
  address: {
    road?: string
    house_number?: string
    city?: string
    state?: string
    postcode?: string
    country?: string
  }
}

interface GeocodeError {
  error: string
  message: string
}

/**
 * Геокодирование адреса с использованием OpenStreetMap Nominatim API
 * Бесплатный и не требует API ключа
 */
export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  if (!address || address.trim().length === 0) {
    console.warn('Geocoding: Empty address provided')
    return null
  }

  try {
    // Кодируем адрес для URL
    const encodedAddress = encodeURIComponent(address.trim())

    // URL для Nominatim API
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1&addressdetails=1`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RealEstateApp/1.0 (your-email@example.com)', // Требуется Nominatim
        'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`Geocoding: No results found for address: ${address}`)
      return null
    }

    const result = data[0]

    return {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      displayName: result.display_name,
      address: {
        road: result.address?.road,
        house_number: result.address?.house_number,
        city: result.address?.city || result.address?.town || result.address?.village,
        state: result.address?.state,
        postcode: result.address?.postcode,
        country: result.address?.country,
      },
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}

/**
 * Обратное геокодирование - получение адреса по координатам
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'RealEstateApp/1.0 (your-email@example.com)',
        'Accept-Language': 'ru-RU,ru;q=0.9,en;q=0.8',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (!data.display_name) {
      return null
    }

    return data.display_name
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return null
  }
}

/**
 * Пакетное геокодирование нескольких адресов
 * С задержкой для соблюдения лимитов API
 */
export async function batchGeocode(addresses: string[]): Promise<(GeocodeResult | null)[]> {
  const results: (GeocodeResult | null)[] = []

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i]

    // Добавляем задержку 1 секунда между запросами для соблюдения лимитов Nominatim
    if (i > 0) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }

    const result = await geocodeAddress(address || '')
    results.push(result)
  }

  return results
}

/**
 * Валидация координат
 */
export function isValidCoordinates(lat: number, lng: number): boolean {
  return (
    typeof lat === 'number' &&
    typeof lng === 'number' &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  )
}

/**
 * Расчет расстояния между двумя точками в км (формула Haversine)
 */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Радиус Земли в км
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return Math.round(distance * 100) / 100 // Округляем до 2 знаков
}

/**
 * Альтернативный геокодер через Яндекс (требуется API ключ)
 */
export async function yandexGeocode(
  address: string,
  apiKey?: string,
): Promise<GeocodeResult | null> {
  if (!apiKey) {
    console.warn('Yandex Geocoding: API key required')
    return null
  }

  try {
    const encodedAddress = encodeURIComponent(address.trim())
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&geocode=${encodedAddress}&apikey=${apiKey}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Yandex geocoding HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    const found = data.response?.GeoObjectCollection?.featureMember

    if (!found || found.length === 0) {
      return null
    }

    const geoObject = found[0].GeoObject
    const [lng, lat] = geoObject.Point.pos.split(' ').map(parseFloat)

    return {
      lat,
      lng,
      displayName: geoObject.name,
      address: {
        road: geoObject.name,
        city: geoObject.description,
      },
    }
  } catch (error) {
    console.error('Yandex geocoding error:', error)
    return null
  }
}

/**
 * Умный геокодер - пробует разные сервисы
 */
export async function smartGeocode(
  address: string,
  options?: { yandexApiKey?: string },
): Promise<GeocodeResult | null> {
  // Сначала пробуем Nominatim (бесплатно)
  let result = await geocodeAddress(address)

  // Если не нашли или низкое качество, пробуем Яндекс (если есть ключ)
  if (!result && options?.yandexApiKey) {
    result = await yandexGeocode(address, options.yandexApiKey)
  }

  return result
}

/**
 * Нормализация адреса для улучшения качества геокодирования
 */
export function normalizeAddress(address: string): string {
  return address
    .trim()
    .replace(/\s+/g, ' ') // Убираем множественные пробелы
    .replace(/,/g, ', ') // Стандартизируем запятые
    .replace(/\s*,\s*/g, ', ') // Убираем пробелы вокруг запятых
    .replace(/г\./gi, 'г. ') // Стандартизируем "г."
    .replace(/ул\./gi, 'ул. ') // Стандартизируем "ул."
    .replace(/пр\./gi, 'пр. ') // Стандартизируем "пр."
    .replace(/д\./gi, 'д. ') // Стандартизируем "д."
    .replace(/к\./gi, 'к. ') // Стандартизируем "к."
    .replace(/\s+/g, ' ') // Снова убираем множественные пробелы
    .trim()
}

// Пример использования:
/*
// Базовое геокодирование
const result = await geocodeAddress('Москва, Тверская улица, 1');
if (result) {
  console.log('Координаты:', result.lat, result.lng);
  console.log('Адрес:', result.displayName);
}

// Обратное геокодирование
const address = await reverseGeocode(55.7558, 37.6173);
console.log('Адрес по координатам:', address);

// Расчет расстояния
const distance = calculateDistance(55.7558, 37.6173, 59.9343, 30.3351);
console.log('Расстояние Москва-СПб:', distance, 'км');
*/
