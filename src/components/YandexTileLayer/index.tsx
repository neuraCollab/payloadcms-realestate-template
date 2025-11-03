// components/YandexTileLayer.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useLeafletContext } from '@react-leaflet/core'
import L from 'leaflet'

// Удаляем дефолтные иконки Leaflet (если не подключены)
delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})


export default function YandexTileLayer({ apiKey }: { apiKey: string }) {
  const context = useLeafletContext()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ymaps: any
    let yandexMap: any

    const initMap = async () => {
      // Загружаем API Яндекса
      await new Promise<void>((resolve) => {
        if ((window as any).ymaps) {
          resolve()
        } else {
          const script = document.createElement('script')
          script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
          script.onload = () => resolve()
          document.head.appendChild(script)
        }
      })

      ymaps = (window as any).ymaps
      await ymaps.ready()

      // Создаём контейнер
      const container = document.createElement('div')
      container.style.width = '100%'
      container.style.height = '100%'
      container.style.position = 'absolute'
      container.style.top = '0'
      container.style.left = '0'
      container.style.zIndex = '0'

      context.layerContainer.appendChild(container)

      // Инициализируем карту Яндекса
      yandexMap = new ymaps.Map(
        container,
        {
          center: [context.map.getCenter().lat, context.map.getCenter().lng],
          zoom: context.map.getZoom(),
          controls: [],
        },
        {
          suppressMapOpenBlock: true,
          yandexMapDisablePoiInteractivity: true,
        },
      )

      // Синхронизация с Leaflet
      context.map.on('moveend', () => {
        yandexMap.setCenter([context.map.getCenter().lat, context.map.getCenter().lng])
      })
      context.map.on('zoomend', () => {
        yandexMap.setZoom(context.map.getZoom())
      })

      // Обратная синхронизация (опционально)
      yandexMap.events.add('boundschange', () => {
        const center = yandexMap.getCenter()
        const zoom = yandexMap.getZoom()
        context.map.setView([center[0], center[1]], zoom, { animate: false })
      })
    }

    initMap()

    return () => {
      if (yandexMap) {
        yandexMap.destroy()
      }
    }
  }, [apiKey, context])

  return null
}
