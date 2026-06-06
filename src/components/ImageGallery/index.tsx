'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Modal } from '@/components/ui/modal'
import { cn } from '@/utilities/ui'
import { MOCK_GALLERY } from './placeholders'

interface ImageGalleryProps {
  images?: Array<{
    image: {
      id: string
      url: string
      alt?: string
      width?: number
      height?: number
    }
    alt?: string
  }>
}

// Минимум, на котором свайп считается «листанием» (а не случайным касанием).
const SWIPE_THRESHOLD = 40

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Если у объекта нет фото — подсовываем мок-набор, чтобы галерея
  // оставалась полнофункциональной для ревью UX и не выглядела пустой.
  const useMock = !images || images.length === 0
  const gallery = useMock ? MOCK_GALLERY : images

  const mainImage = gallery[selectedImage]!
  const mainImageUrl = mainImage.image?.url
  const next = () => setSelectedImage((p) => (p + 1) % gallery.length)
  const prev = () => setSelectedImage((p) => (p - 1 + gallery.length) % gallery.length)

  // Свайп на мобильном. touchstart/end + порог — без библиотек.
  const touchStartX = useRef<number | null>(null)
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return
    const endX = e.changedTouches[0]?.clientX
    if (endX == null) return
    const delta = endX - touchStartX.current
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      delta < 0 ? next() : prev()
    }
    touchStartX.current = null
  }

  return (
    <>
      <div className="space-y-3">
        <div
          className="relative bg-surface-container rounded-md overflow-hidden cursor-zoom-in select-none"
          onClick={() => setIsModalOpen(true)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-roledescription="carousel"
          aria-label="Галерея объекта"
        >
          {mainImageUrl ? (
            // Мок-картинки — data: URL, Image/next с remote loader тут лишний:
            // используем обычный <img>. Для настоящих файлов — next/Image.
            useMock ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mainImageUrl}
                alt={mainImage.alt || 'Изображение объекта'}
                className="w-full h-72 sm:h-96 object-cover"
                draggable={false}
              />
            ) : (
              <Image
                src={mainImageUrl}
                alt={mainImage.alt || 'Изображение объекта'}
                width={800}
                height={500}
                className="w-full h-72 sm:h-96 object-cover"
                priority
                draggable={false}
              />
            )
          ) : (
            <div className="w-full h-72 sm:h-96 flex items-center justify-center">
              <span className="text-on-surface-variant">Изображение не найдено</span>
            </div>
          )}

          {gallery.length > 1 && (
            <>
              {/* Десктоп-стрелки. На тач-устройствах работает свайп. */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  prev()
                }}
                aria-label="Предыдущее изображение"
                className="hidden md:inline-flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-card/90 shadow-e2 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="h-5 w-5 text-on-surface" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Следующее изображение"
                className="hidden md:inline-flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-card/90 shadow-e2 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="h-5 w-5 text-on-surface" />
              </button>

              <div className="absolute top-3 right-3 bg-on-surface/70 text-card backdrop-blur-sm px-3 py-1 rounded-full text-label">
                {selectedImage + 1} / {gallery.length}
              </div>

              {/* Точки-индикаторы на мобильном вместо стрелок. */}
              <div className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {gallery.map((_, i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === selectedImage
                        ? 'bg-card w-5'
                        : 'bg-card/60 w-1.5',
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {gallery.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {gallery.map((image, index) => (
              <button
                key={image.image?.id || index}
                onClick={() => setSelectedImage(index)}
                type="button"
                aria-label={`Изображение ${index + 1}`}
                aria-current={selectedImage === index}
                className={cn(
                  'flex-shrink-0 relative w-20 h-20 rounded overflow-hidden transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  selectedImage === index
                    ? 'ring-2 ring-primary'
                    : 'opacity-70 hover:opacity-100',
                )}
              >
                {image.image?.url ? (
                  useMock ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={image.image.url}
                      alt={image.alt || `Изображение ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={image.image.url}
                      alt={image.alt || `Изображение ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full bg-surface-container flex items-center justify-center">
                    <span className="text-on-surface-variant text-xs">No img</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        size="xl"
        title={`${selectedImage + 1} / ${gallery.length}`}
      >
        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {mainImageUrl &&
            (useMock ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={mainImageUrl}
                alt={mainImage.alt || 'Изображение объекта'}
                className="w-full max-h-[75vh] object-contain rounded"
              />
            ) : (
              <Image
                src={mainImageUrl}
                alt={mainImage.alt || 'Изображение объекта'}
                width={1200}
                height={800}
                className="w-full max-h-[75vh] object-contain rounded"
              />
            ))}

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                aria-label="Предыдущее изображение"
                className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/95 shadow-e2 hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronLeft className="h-5 w-5 text-on-surface" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Следующее изображение"
                className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/95 shadow-e2 hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <ChevronRight className="h-5 w-5 text-on-surface" />
              </button>
            </>
          )}
        </div>
      </Modal>
    </>
  )
}
