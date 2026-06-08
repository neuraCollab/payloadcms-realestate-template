'use client'
import React from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'

interface Props {
  listingId: string | number
  /** Какая коллекция владеет объявлением — нужно для роута API. */
  collection: 'flats' | 'houses' | 'commercial' | 'lands'
  initialImages: Array<{ image?: any }>
}

const MAX_PHOTOS = 10
const MAX_SIZE_MB = 5

export const PhotoUploader: React.FC<Props> = ({ listingId, collection, initialImages }) => {
  const [images, setImages] = React.useState(initialImages ?? [])
  const [uploading, setUploading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const upload = async (files: File[]) => {
    setError(null)
    if (images.length + files.length > MAX_PHOTOS) {
      setError(`Максимум ${MAX_PHOTOS} фото. Сейчас: ${images.length}.`)
      return
    }
    for (const f of files) {
      if (f.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`Файл «${f.name}» больше ${MAX_SIZE_MB} МБ.`)
        return
      }
      if (!f.type.startsWith('image/')) {
        setError(`Файл «${f.name}» — не изображение.`)
        return
      }
    }

    setUploading(true)
    const fd = new FormData()
    for (const f of files) fd.append('file', f)

    try {
      const res = await fetch(`/api/cabinet/listings/${listingId}/photos?collection=${collection}`, {
        method: 'POST',
        body: fd,
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message ?? 'Не удалось загрузить.')
        return
      }
      // Подгружаем актуальный список фото.
      const updated = await fetch(
        `/api/cabinet/listings/${listingId}?collection=${collection}`,
      ).then((r) => r.json())
      setImages(updated.doc?.images ?? [])
    } catch (err: any) {
      setError(err?.message ?? 'Сеть недоступна.')
    } finally {
      setUploading(false)
    }
  }

  const removePhoto = async (mediaId: string | number) => {
    if (!confirm('Удалить фото?')) return
    setError(null)
    const res = await fetch(
      `/api/cabinet/listings/${listingId}/photos?mediaId=${mediaId}&collection=${collection}`,
      { method: 'DELETE' },
    )
    if (res.ok) {
      setImages((it) =>
        it.filter((x) => String(x?.image?.id ?? x?.image) !== String(mediaId)),
      )
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((it: any, i) => {
          const url = it?.image?.url ?? null
          const mid = it?.image?.id ?? it?.image
          return (
            <div
              key={mid ?? i}
              className="relative aspect-[4/3] bg-surface-container rounded-md overflow-hidden border border-border"
            >
              {url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-on-surface-variant">
                  <ImageIcon className="w-6 h-6" />
                </div>
              )}
              {mid ? (
                <button
                  type="button"
                  onClick={() => removePhoto(mid)}
                  className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-card/90 shadow-e1 inline-flex items-center justify-center hover:bg-card"
                  aria-label="Удалить"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              ) : null}
            </div>
          )
        })}

        {images.length < MAX_PHOTOS ? (
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="aspect-[4/3] rounded-md border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 flex flex-col items-center justify-center gap-2 text-on-surface-variant disabled:opacity-60"
          >
            <Upload className="w-5 h-5" />
            <span className="text-body-sm">
              {uploading ? 'Загрузка…' : `Добавить (${images.length}/${MAX_PHOTOS})`}
            </span>
          </button>
        ) : null}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const list = Array.from(e.target.files ?? [])
          if (list.length > 0) upload(list)
          e.target.value = '' // reset чтобы можно было загрузить тот же файл повторно
        }}
      />

      {error ? (
        <div className="text-body-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-md p-3">
          {error}
        </div>
      ) : null}

      <p className="text-label text-on-surface-variant">
        До {MAX_PHOTOS} фото · до {MAX_SIZE_MB} МБ каждое · JPG/PNG/WEBP/AVIF
      </p>
    </div>
  )
}
