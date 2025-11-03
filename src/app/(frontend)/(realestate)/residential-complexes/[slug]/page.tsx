// app/(realestate)/residential-complexes/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import ImageGallery from '@/components/ImageGallery'

export default async function ResidentialComplexDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const res = await payload.find({
    collection: 'residential-complexes',
    where: { slug: { equals: slug } },
  })

  if (!res.docs.length) {
    notFound()
  }

  const data = res.docs[0]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Заголовок и мета */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
            <p className="text-gray-600 text-lg">
              {data.location?.address ||
                `${data.location?.district}, ${data.location?.city}`}
            </p>
          </div>
          <div className="text-right">
            <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
              {getTypeLabel(data.type)}
            </div>
            <div className="mt-2 inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
              {getStatusLabel(data.status)}
            </div>
          </div>
        </div>

        {data.developer && (
          <div className="mt-4">
            <span className="text-gray-600">Застройщик:</span>{' '}
            <span className="font-semibold">{data.developer}</span>
          </div>
        )}

        {data.completionDate && data.status !== 'completed' && (
          <div className="mt-2">
            <span className="text-gray-600">Срок сдачи:</span>{' '}
            <span className="font-semibold">
              {new Date(data.completionDate).toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
              })}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основной контент */}
        <div className="lg:col-span-2">
          {/* Галерея */}
          <ImageGallery images={data.images} />

          {/* Описание */}
          {data.description && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Описание</h2>
              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              </div>
            </div>
          )}

          {/* Инфраструктура */}
          {data.infrastructure && data.infrastructure.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Инфраструктура</h2>
              <div className="space-y-2">
                {data.infrastructure.map((item: any, i: number) => (
                  <div key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span>{item.item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Контактная информация (заглушка) */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
              Показать телефон
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Написать сообщение
            </button>
          </div>

          {/* Статус и класс (дублируем для удобства) */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Основное</h3>
            <div className="space-y-3">
              <div>
                <div className="text-gray-500 text-sm">Статус</div>
                <div className="font-semibold">{getStatusLabel(data.status)}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Класс</div>
                <div className="font-semibold">{getTypeLabel(data.type)}</div>
              </div>
              {data.completionDate && (
                <div>
                  <div className="text-gray-500 text-sm">Срок сдачи</div>
                  <div className="font-semibold">
                    {new Date(data.completionDate).toLocaleDateString('ru-RU', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    planning: 'Планируется',
    'under-construction': 'Строится',
    completed: 'Сдан',
  }
  return labels[status] || status
}

function getTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    economy: 'Эконом',
    comfort: 'Комфорт',
    business: 'Бизнес',
    premium: 'Премиум',
  }
  return labels[type] || type
}