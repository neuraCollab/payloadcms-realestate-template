// app/(realestate)/flats/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import ImageGallery from '@/components/ImageGallery' 
import { RichMessageForm } from '@/components/RichMessageForm'
import RichText from '@/components/RichText'
import Link from 'next/link'

export default async function FlatDetailPage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config })
  const { slug } = await params

  const flat = await payload.find({
    collection: 'flats',
    where: { slug: { equals: slug } },
  })

  if (!flat.docs.length) {
    notFound()
  }

  const data = flat.docs[0]
  if(data.realtor) {

    const reviews = await payload.find({
      collection: 'reviews',
      where: {
        realtor: { equals: data.realtor.id },
        status: { equals: 'approved' },
      },
      sort: '-createdAt',
    })
  }
  //   console.log('Reviews:', reviews.docs)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Заголовок и цена */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{data.title}</h1>
            <p className="text-gray-600 text-lg">{data.location?.address}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{data.price.toLocaleString()} ₽</div>
            {data.transactionType === 'rent' && <div className="text-gray-500">в месяц</div>}
          </div>
        </div>
      </div>
 

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Основной контент */}
        <div className="lg:col-span-2">
          {/* Галерея изображений */}
          <ImageGallery images={data.images} />

          {/* Характеристики */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Характеристики</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <div className="text-gray-500 text-sm">Комнат</div>
                <div className="font-semibold">
                  {data.rooms === 'studio' ? 'Студия' : `${data.rooms} комн.`}
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Общая площадь</div>
                <div className="font-semibold">{data.area?.total} м²</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Этаж</div>
                <div className="font-semibold">
                  {data.floorInfo?.floor}/{data.floorInfo?.totalFloors}
                </div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Тип дома</div>
                <div className="font-semibold">{getBuildingType(data.buildingType)}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Высота потолков</div>
                <div className="font-semibold">{data.ceilingHeight} м</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm">Год постройки</div>
                <div className="font-semibold">{data.yearBuilt}</div>
              </div>
            </div>
          </div>

          {/* Описание */}
          {data.description && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Описание</h2>
              <div className="prose max-w-none">
                {/* Рендеринг richText */}
                 <RichText className="max-w-[48rem] mx-auto" data={data.description} enableGutter={false} />
              </div>
            </div>
          )}
        </div>

        {/* Боковая панель */}
        <div className="space-y-6">
          {/* Контактная информация */}


<div className="bg-white rounded-lg shadow-sm p-6">
  {data.realtor && (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-3">Риелтор</h3>
      <Link href={`/realtors/${data.realtor.slug}`} className="block">
        <div className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          {data.realtor.photo && (
            <img
              src={data.realtor.photo.url}
              alt={data.realtor.name}
              className="w-16 h-16 rounded-full object-cover cursor-pointer"
            />
          )}
          <div>
            <div className="font-semibold text-blue-600 hover:underline">
              {data.realtor.name}
            </div>
            <div className="text-gray-600">{data.realtor.agency}</div>
            <div className="text-gray-600">{data.realtor.phone}</div>
          </div>
        </div>
      </Link>
    </div>
  )}

  <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>

  <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3">
    Показать телефон
  </button>

  {data.realtor ? (
    <Link href={`/realtors/${data.realtor.slug}`} className="block w-full">
      <button className="w-full border border-blue-600 text-blue-600 py-3 px-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
        Написать сообщение
      </button>
    </Link>
  ) : (
    <button
      className="w-full border border-gray-300 text-gray-500 py-3 px-4 rounded-lg font-semibold cursor-not-allowed"
      disabled
    >
      Написать сообщение
    </button>
  )}

  <div className="mt-12"></div>
</div>
          {/* Удобства */}
          {data.amenities && data.amenities.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Удобства</h3>
              <div className="space-y-2">
                {data.amenities.map((amenity: any, index: number) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span>{amenity.amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function getBuildingType(type: string): string {
  const types: { [key: string]: string } = {
    panel: 'Панельный',
    brick: 'Кирпичный',
    monolithic: 'Монолитный',
    block: 'Блочный',
    wood: 'Деревянный',
  }
  return types[type] || type
}
