// app/(realestate)/layout.tsx
import Link from 'next/link'

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Навигация */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8 py-4">
            <Link href="/flats" className="text-gray-600 hover:text-blue-600 font-medium">
              Квартиры
            </Link>
            <Link href="/commercial" className="text-gray-600 hover:text-blue-600 font-medium">
              Коммерческая
            </Link>
            <Link href="/lands" className="text-gray-600 hover:text-blue-600 font-medium">
              Участки
            </Link>
            <Link
              href="/residential-complexes"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              ЖК
            </Link>
          </div>
        </div>
      </nav>

      {/* Контент */}
      <main className="container mx-auto px-4 py-8">{children}</main>
     
    </div>
  )
}
