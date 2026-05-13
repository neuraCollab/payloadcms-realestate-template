'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Property, Media } from '@/payload-types'
import { Modal } from '@/components/ui/modal'
import { cn } from '@/utilities/ui'

interface PropertyGalleryProps {
  images: Property['images']
}

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-surface-container rounded-md flex items-center justify-center">
        <span className="text-on-surface-variant">Изображения недоступны</span>
      </div>
    )
  }

  const getImageUrl = (image: number | Media) => {
    if (typeof image === 'object' && image.url) {
      return image.url
    }
    return '/placeholder.jpg'
  }

  const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length)
  const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length)

  const overlayButton =
    'absolute top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-card/95 shadow-e2 hover:bg-card transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[16/9] bg-surface-container rounded-md overflow-hidden">
        <img
          src={getImageUrl(images[selectedImage]?.image)}
          alt={`Property image ${selectedImage + 1}`}
          className="w-full h-full object-cover cursor-zoom-in"
          onClick={() => setIsModalOpen(true)}
        />

        {images.length > 1 && (
          <>
            <button type="button" onClick={prevImage} aria-label="Предыдущее" className={cn(overlayButton, 'left-3')}>
              <ChevronLeft className="w-5 h-5 text-on-surface" />
            </button>
            <button type="button" onClick={nextImage} aria-label="Следующее" className={cn(overlayButton, 'right-3')}>
              <ChevronRight className="w-5 h-5 text-on-surface" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 right-3 bg-on-surface/70 text-card backdrop-blur-sm px-3 py-1 rounded-full text-label">
          {selectedImage + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {images.map((imageItem, index) => (
            <button
              key={imageItem.id || index}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`Изображение ${index + 1}`}
              aria-current={selectedImage === index}
              className={cn(
                'aspect-square rounded overflow-hidden transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                selectedImage === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100',
              )}
            >
              <img
                src={getImageUrl(imageItem.image)}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        size="xl"
        title={`${selectedImage + 1} / ${images.length}`}
      >
        <div className="relative">
          <img
            src={getImageUrl(images[selectedImage]?.image)}
            alt={`Property image ${selectedImage + 1}`}
            className="w-full max-h-[75vh] object-contain rounded"
          />
          {images.length > 1 && (
            <>
              <button type="button" onClick={prevImage} aria-label="Предыдущее" className={cn(overlayButton, 'left-3')}>
                <ChevronLeft className="w-5 h-5 text-on-surface" />
              </button>
              <button type="button" onClick={nextImage} aria-label="Следующее" className={cn(overlayButton, 'right-3')}>
                <ChevronRight className="w-5 h-5 text-on-surface" />
              </button>
            </>
          )}
        </div>
      </Modal>
    </div>
  )
}
