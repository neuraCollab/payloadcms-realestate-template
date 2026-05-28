'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Modal } from '@/components/ui/modal'
import { cn } from '@/utilities/ui'

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

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="bg-surface-container rounded-md w-full h-64 flex items-center justify-center">
        <span className="text-on-surface-variant">Нет изображений</span>
      </div>
    )
  }

  const mainImage = images[selectedImage]
  const mainImageUrl = mainImage.image?.url
  const next = () => setSelectedImage((prev) => (prev + 1) % images.length)
  const prev = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)

  return (
    <>
      <div className="space-y-3">
        <div
          className="relative bg-surface-container rounded-md overflow-hidden cursor-zoom-in"
          onClick={() => setIsModalOpen(true)}
        >
          {mainImageUrl ? (
            <Image
              src={mainImageUrl}
              alt={mainImage.alt || 'Изображение объекта'}
              width={800}
              height={500}
              className="w-full h-96 object-cover"
              priority
            />
          ) : (
            <div className="w-full h-96 flex items-center justify-center">
              <span className="text-on-surface-variant">Изображение не найдено</span>
            </div>
          )}

          {images.length > 1 && (
            <div className="absolute top-3 right-3 bg-on-surface/70 text-card backdrop-blur-sm px-3 py-1 rounded-full text-label">
              {selectedImage + 1} / {images.length}
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
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
                  <Image
                    src={image.image.url}
                    alt={image.alt || `Изображение ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
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
        title={`${selectedImage + 1} / ${images.length}`}
      >
        <div className="relative">
          {mainImageUrl && (
            <Image
              src={mainImageUrl}
              alt={mainImage.alt || 'Изображение объекта'}
              width={1200}
              height={800}
              className="w-full max-h-[75vh] object-contain rounded"
            />
          )}

          {images.length > 1 && (
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
