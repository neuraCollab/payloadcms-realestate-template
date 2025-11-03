// components/ImageGallery.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'

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
      <div className="bg-gray-100 rounded-lg w-full h-64 flex items-center justify-center">
        <span className="text-gray-400">Нет изображений</span>
      </div>
    )
  }

  const mainImage = images[selectedImage]
  const mainImageUrl = mainImage.image?.url

  return (
    <>
      <div className="space-y-4">
        {/* Главное изображение */}
        <div
          className="relative bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in"
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
              <span className="text-gray-400">Изображение не найдено</span>
            </div>
          )}

          {/* Счетчик изображений */}
          {images.length > 1 && (
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Миниатюры */}
        {images.length > 1 && (
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={image.image?.id || index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 relative w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
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
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">No img</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Модальное окно для просмотра */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Кнопка закрытия */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-2xl z-10"
            >
              ✕
            </button>

            {/* Главное изображение в модалке */}
            {mainImageUrl && (
              <Image
                src={mainImageUrl}
                alt={mainImage.alt || 'Изображение объекта'}
                width={1200}
                height={800}
                className="max-w-full max-h-[80vh] object-contain"
              />
            )}

            {/* Навигация */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage((prev) => (prev > 0 ? prev - 1 : images.length - 1))
                  }
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) => (prev < images.length - 1 ? prev + 1 : 0))
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm"
                >
                  ›
                </button>

                {/* Индикатор */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        selectedImage === index
                          ? 'bg-white'
                          : 'bg-white bg-opacity-50 hover:bg-opacity-70'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
