import React from 'react'
import { Link } from '@/i18n/navigation'
import {
  ShieldCheck,
  MessageCircle,
  Wallet,
  Users,
  ArrowRight,
} from 'lucide-react'

// «Почему клиенты выбирают нас» — теперь функциональный блок.
// Каждая карточка — ссылка на релевантный раздел сайта.
// Текст в карточках описывает причину доверия и куда ведёт CTA.
type Reason = {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  title: string
  text: string
  cta: string
  href: string
}

const REASONS: Reason[] = [
  {
    Icon: ShieldCheck,
    title: 'Проверенные объявления',
    text: 'Каждый объект проходит модерацию и фильтр дубликатов. Только активные варианты — без устаревших и фиктивных.',
    cta: 'Смотреть каталог',
    href: '/flats',
  },
  {
    Icon: Users,
    title: 'Опытные риэлторы',
    text: 'Сотрудничаем с агентами, у которых десятки реальных сделок и публичные отзывы клиентов. Выбор по рейтингу и району.',
    cta: 'Найти риэлтора',
    href: '/agents',
  },
  {
    Icon: MessageCircle,
    title: 'Чат и история',
    text: 'Связь с агентом без передачи телефона. Все переписки сохраняются в личном кабинете — ничего не теряется.',
    cta: 'Открыть кабинет',
    href: '/cabinet/login',
  },
  {
    Icon: Wallet,
    title: 'Без скрытых комиссий',
    text: 'Стоимость услуг известна заранее. Калькулятор ипотеки, история цены и аналитика по району — у каждого объекта.',
    cta: 'Правила и условия',
    href: '/privacy',
  },
]

export const WhyUs = () => (
  <section className="px-4 py-10 md:py-14 bg-surface-container-low/40">
    <div className="max-w-6xl mx-auto">
      <header className="mb-6 md:mb-8 text-center max-w-2xl mx-auto">
        <h2 className="text-headline text-on-surface">Почему клиенты выбирают нас</h2>
        <p className="text-body-sm text-on-surface-variant mt-2">
          Доверие — это не лозунг. Это конкретные функции сайта, которыми удобно пользоваться.
        </p>
      </header>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {REASONS.map(({ Icon, title, text, cta, href }) => (
          <li key={title}>
            <Link
              href={href}
              className="group relative h-full flex flex-col bg-card border border-border rounded-xl shadow-e1 hover:shadow-e2 transition-shadow p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-md bg-primary/10 text-primary mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Icon className="w-5 h-5" strokeWidth={1.8} />
              </span>
              <h3 className="text-title text-on-surface">{title}</h3>
              <p className="text-body-sm text-on-surface-variant mt-1 flex-1">{text}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-body-sm font-medium text-primary group-hover:gap-1.5 transition-all">
                {cta}
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </section>
)
