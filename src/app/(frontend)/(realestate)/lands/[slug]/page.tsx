// app/(realestate)/lands/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import ImageGallery from '@/components/ImageGallery'

export default async function LandDetailPage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const res = await payload.find({
    collection: 'lands',
    where: { slug: { equals: slug } },
  })

  if (!res.docs.length) {
    notFound()
  }

  const data = res.docs[0]

  return (
    <div className="max-w-6xl mx-auto">
      {/* Заголовок и цена */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-gray-600 text-lg">
              {data.location?.address || `${data.location?.district}, ${data.location?.city}`}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{data.price.toLocaleString()} ₽</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основной контент */}
        <div className="lg:col-span-2">
          {/* Галерея */}
          <ImageGallery images={data.images} />

          {/* Характеристики */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Характеристики</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-gray-500 text-sm">Назначение</div>
                <div className="font-semibold">{getPurposeLabel(data.purpose)}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Площадь</div>
                <div className="font-semibold">{data.area} соток</div>
              </div>
            </div>
          </div>

          {/* Коммуникации */}
          {data.communications && data.communications.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Коммуникации</h2>
              <div className="space-y-2">
                {data.communications.map((comm: any, i: number) => (
                  <div key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span>{comm.communication}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
              Показать телефон
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Написать сообщение
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function getPurposeLabel(purpose: string): string {
  const labels: Record<string, string> = {
    ijs: 'ИЖС',
    snt: 'СНТ/ДНП',
    lph: 'ЛПХ',
    commercial: 'Коммерческая',
    agricultural: 'Сельхоз',
  }
  return labels[purpose] || purpose
}
