'use client'
import React from 'react'
import Link from 'next/link'
import { ArrowUpRight, Building2, Home as HomeIcon, Trees, Briefcase } from 'lucide-react'

export type TilePreview = {
  imageUrl: string
  price: number | null
  city: string | null
}

// Строковый ключ вместо передачи компонента — server-компонент не
// может пробрасывать функции в client (React 19/Next 15).
export type TileIconKey = 'flats' | 'house' | 'land' | 'commercial'

const ICONS: Record<TileIconKey, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  flats: Building2,
  house: HomeIcon,
  land: Trees,
  commercial: Briefcase,
}

// SEO-описания — релевантный человеку текст. На мобильном всегда в
// DOM как sr-only (видят поисковики и скринридеры). На десктопе
// проступают на hover поверх превью.
const SEO_DESCRIPTION: Record<TileIconKey, string> = {
  flats: 'Квартиры в новостройках и вторичке. Прозрачные сделки, честные цены.',
  house: 'Дома, таунхаусы и коттеджи. Загородная недвижимость с документами.',
  land: 'Земельные участки ИЖС, СНТ и ЛПХ. Для жизни, дачи и инвестиций.',
  commercial:
    'Офисы, торговля, склады и общепит. Аренда и покупка без скрытых комиссий.',
}

// Когда в коллекции пока нет ни одного документа (цена/город неизвестны),
// показываем короткую заглушку вместо пустого места — иначе плитка
// выглядит «битой» на фоне соседей с ценой.
const FALLBACK_SUBTITLE: Record<TileIconKey, string> = {
  flats: 'Смотреть каталог',
  house: 'Смотреть каталог',
  land: 'Смотреть каталог',
  commercial: 'Смотреть каталог',
}

type Props = {
  index: number
  label: string
  href: string
  iconKey: TileIconKey
  /** Тематическая PNG-иллюстрация в правом нижнем углу карточки. */
  cornerIcon: string
  preview: TilePreview
}

const formatPrice = (n: number | null) =>
  n == null
    ? null
    : new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        maximumFractionDigits: 0,
      }).format(n)

// IntersectionObserver навешивает класс .is-revealed → keyframe
// md-bounce-spin (globals.css). prefers-reduced-motion отключает.
const useRevealOnce = () => {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  React.useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add('is-revealed')
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

export const CategoryTileClient: React.FC<Props> = ({
  index,
  label,
  href,
  iconKey,
  cornerIcon,
  preview,
}) => {
  const iconRef = useRevealOnce()
  const priceText = formatPrice(preview.price)
  const IconBig = ICONS[iconKey]
  const description = SEO_DESCRIPTION[iconKey]

  return (
    <li className="md-reveal" style={{ animationDelay: `${200 + index * 80}ms` }}>
      <Link
        href={href}
        className="group relative block aspect-[5/4] sm:aspect-[4/3] md:max-h-[200px] rounded-xl bg-card border border-border overflow-hidden shadow-e1 hover:shadow-e2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-shadow"
      >
        {/* Hover-фон (десктоп): фоновое фото проступает поверх card-bg. */}
        <span
          aria-hidden="true"
          className="hidden md:block absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundImage: `url(${preview.imageUrl})` }}
        />
        {/* Тёмная подложка для читаемости текста поверх фото. */}
        <span
          aria-hidden="true"
          className="hidden md:block absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Стрелка-индикатор перехода. */}
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 z-20 inline-flex w-9 h-9 items-center justify-center rounded-full bg-surface-container/90 text-on-surface group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" strokeWidth={2.4} />
        </span>

        {/* Иконка категории — слева сверху. Анимируется при появлении. */}
        <span
          ref={iconRef}
          className="md-category-icon absolute top-3 left-3 z-20 inline-flex w-11 h-11 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white transition-colors"
        >
          <IconBig className="w-5 h-5" strokeWidth={1.8} />
        </span>

        {/* Нижний блок текста — заголовок + меняющийся подзаголовок.
            На hover (md+) меняем под-текст с цена/город на SEO-описание.
            Сам label «Квартиры» остаётся виден всегда — он белеет
            из-за тёмной подложки. */}
        <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-4 flex flex-col gap-0.5">
          <span className="text-title-lg text-on-surface md:group-hover:text-white transition-colors leading-tight">
            {label}
          </span>

          {/* Под-текст: до hover — цена/город. На hover — SEO-описание.
              Размещаем оба варианта в одном grid'е (одна и та же
              ячейка), переключаем opacity. Так высота плитки
              стабильная и текст не съезжает. */}
          <span className="relative block min-h-[2.4em]">
            <span className="absolute inset-0 text-label text-on-surface-variant md:group-hover:opacity-0 transition-opacity duration-200 line-clamp-1">
              {priceText
                ? `от ${priceText}${preview.city ? ` · ${preview.city}` : ''}`
                : FALLBACK_SUBTITLE[iconKey]}
            </span>

            {/* SEO-описание поверх (md+). На мобильном — sr-only ниже. */}
            <span
              aria-hidden="true"
              className="hidden md:block absolute inset-0 text-body-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 line-clamp-2"
            >
              {description}
            </span>
          </span>

          <span className="sr-only md:hidden">{description}</span>
        </div>

        {/* Тематическая PNG-иллюстрация в правом нижнем углу — видна на
            всех брейкпоинтах без наведения, чтобы суть категории была
            понятна сразу. На десктопе гаснет под hover-фото объекта. */}
        <span
          aria-hidden="true"
          className="absolute right-2 bottom-2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-contain bg-no-repeat bg-bottom-right opacity-85 md:group-hover:opacity-0 transition-opacity duration-300 z-0 pointer-events-none"
          style={{ backgroundImage: `url(${cornerIcon})` }}
        />
      </Link>
    </li>
  )
}
