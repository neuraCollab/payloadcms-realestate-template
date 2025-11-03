// app/realtors/[slug]/page.tsx
import { getPayload } from 'payload'
import config from '@/payload.config'
import { notFound } from 'next/navigation'
import { RealtorReviewForm } from '@/components/Forms/RealtorReviewForm'
import Image from 'next/image'
import { RichMessageForm } from '@/components/RichMessageForm'

export default async function RealtorProfilePage({ params }: { params: { slug: string } }) {
  const payload = await getPayload({ config })
  const { slug } = params

  // Находим риелтора (пользователя с ролью realtor и нужным slug)
  const users = await payload.find({
    collection: 'users',
    where: {
      slug: { equals: slug },
      role: { equals: 'realtor' },
    },
    depth: 1,
  })

  if (!users.docs.length) {
    notFound()
  }

  const realtor = users.docs[0]

  // Загружаем одобренные отзывы
  const reviews = await payload.find({
    collection: 'reviews',
    where: {
      realtor: { equals: realtor.id },
      status: { equals: 'approved' },
    },
    sort: '-createdAt',
    limit: 20,
  })

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Шапка профиля */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-center md:text-left">
        <div className="flex flex-col items-center md:flex-row gap-6">
          {realtor.photo && (
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-100">
              <Image
                src={realtor.photo.url}
                alt={realtor.name}
                width={128}
                height={128}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{realtor.name}</h1>
            {realtor.agency && (
              <p className="text-lg text-gray-600 mt-1">{realtor.agency}</p>
            )}
            {realtor.phone && (
              <p className="text-gray-700 mt-2">Телефон: {realtor.phone}</p>
            )}
            {realtor.bio && (
              <p className="text-gray-600 mt-3 max-w-2xl">{realtor.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Отзывы */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-6">Отзывы ({reviews.totalDocs})</h2>

        {reviews.docs.length > 0 ? (
          <div className="space-y-6">
            {reviews.docs.map((review) => (
              <div key={review.id} className="bg-white p-5 rounded-lg shadow-sm border">
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xl ${
                        i < review.rating ? 'text-yellow-500' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-gray-500 text-sm">
                    от {review.authorName}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Пока нет отзывов.</p>
        )}
      </div>

      <RichMessageForm
          realtorId={realtor.id}
          realtorName={realtor.name}
          propertyTitle={realtor.title}
        />

      {/* Форма */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Оставить отзыв</h2>
        <RealtorReviewForm realtorId={realtor.id} />
      </div>
    </div>
  )
}

// Генерация статических путей (для SSG)
export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const realtors = await payload.find({
    collection: 'users',
    where: { role: { equals: 'realtor' } },
    limit: 100,
  })

  return realtors.docs.map((user) => ({
    slug: user.slug,
  }))
}