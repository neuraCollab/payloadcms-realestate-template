import Link from 'next/link'
import { Home, Search, MapPin as MapIcon, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

const QUICK_LINKS = [
  { href: '/flats', label: 'Квартиры', icon: Home },
  { href: '/search', label: 'Поиск', icon: Search },
  { href: '/agents', label: 'Агенты', icon: MapIcon },
  { href: '/contact', label: 'Контакты', icon: Phone },
]

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center space-y-6 max-w-lg">
        <p className="text-display text-primary font-bold tracking-tight">404</p>
        <h1 className="text-headline text-on-surface">Страница не найдена</h1>
        <p className="text-body text-on-surface-variant">
          Возможно, ссылка устарела или объект больше не публикуется. Попробуйте начать
          с одного из разделов ниже — или вернитесь на главную.
        </p>
        <div className="flex flex-wrap gap-2 justify-center pt-2">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-card shadow-e1 hover:shadow-e2 text-body-sm text-on-surface transition-shadow"
            >
              <l.icon className="w-4 h-4" />
              {l.label}
            </Link>
          ))}
        </div>
        <Button asChild className="mt-4">
          <Link href="/">На главную</Link>
        </Button>
      </div>
    </div>
  )
}
