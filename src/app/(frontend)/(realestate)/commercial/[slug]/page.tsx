// app/(realestate)/commercials/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import ImageGallery from '@/components/ImageGallery'

export default async function CommercialDetailPage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const res = await payload.find({
    collection: 'commercial',
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
            {data.transactionType === 'rent' && <div className="text-gray-500">в месяц</div>}
            {data.priceType !== 'total' && (
              <div className="text-gray-500 text-sm">
                {data.priceType === 'per_sqm_month'
                  ? 'за м²/мес'
                  : data.priceType === 'per_sqm_year'
                    ? 'за м²/год'
                    : ''}
              </div>
            )}
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
                <div className="text-gray-500 text-sm">Тип объекта</div>
                <div className="font-semibold">{getCommercialTypeLabel(data.commercialType)}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Площадь</div>
                <div className="font-semibold">{data.area?.total} м²</div>
              </div>
              {data.area?.land && (
                <div>
                  <div className="text-gray-500 text-sm">Участок</div>
                  <div className="font-semibold">{data.area.land} соток</div>
                </div>
              )}
              {data.floor !== null && data.floor !== undefined && (
                <div>
                  <div className="text-gray-500 text-sm">Этаж</div>
                  <div className="font-semibold">{data.floor}</div>
                </div>
              )}
              {data.ceilingHeight && (
                <div>
                  <div className="text-gray-500 text-sm">Высота потолков</div>
                  <div className="font-semibold">{data.ceilingHeight} м</div>
                </div>
              )}
              {data.entranceType && (
                <div>
                  <div className="text-gray-500 text-sm">Вход</div>
                  <div className="font-semibold">{getEntranceTypeLabel(data.entranceType)}</div>
                </div>
              )}
              {data.condition && (
                <div>
                  <div className="text-gray-500 text-sm">Состояние</div>
                  <div className="font-semibold">{getConditionLabel(data.condition)}</div>
                </div>
              )}
            </div>
          </div>

          {/* Описание */}
          {data.description && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Описание</h2>
              <div className="prose max-w-none">
                {/* В реальном проекте здесь нужно рендерить richText правильно */}
                {/* Пока оставим как заглушку */}
                <div dangerouslySetInnerHTML={{ __html: data.description }} />
              </div>
            </div>
          )}

          {/* Коммуникации */}
          {data.utilities && data.utilities.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Коммуникации</h2>
              <div className="space-y-2">
                {data.utilities.map((util: any, i: number) => (
                  <div key={i} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span>{util.utility}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Контактная информация */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
            {data.contactInfo?.contactPerson && (
              <p className="mb-2">Контакт: {data.contactInfo.contactPerson}</p>
            )}
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

function getCommercialTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    office: 'Офис',
    retail: 'Торговая площадь',
    mall: 'Торговый центр',
    warehouse: 'Склад',
    manufacturing: 'Производство',
    'free-purpose': 'Своб. назначения',
    hotel: 'Гостиница',
    restaurant: 'Ресторан/кафе',
    'business-center': 'Бизнес-центр',
  }
  return labels[type] || type
}

function getEntranceTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    separate: 'Отдельный',
    'through-bc': 'Через бизнес-центр',
    'from-street': 'С улицы',
  }
  return labels[type] || type
}

function getConditionLabel(type: string): string {
  const labels: Record<string, string> = {
    finished: 'Отделка под ключ',
    rough: 'Черновая отделка',
    needs_renovation: 'Требует ремонта',
    'for-finishing': 'Под отделку',
  }
  return labels[type] || type
}
