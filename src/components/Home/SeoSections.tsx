import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface SeoBlock {
  heading?: string
  body?: string
  ctaLabel?: string
  ctaHref?: string
  highlightKeywords?: string
}

/**
 * Серверный рендер нишевых SEO-секций главной.
 * Контент приходит из глобала `home-seo` через payload.
 *
 * Каждая секция = одна H2 с body + CTA. Дизайн нейтральный, не
 * перебивает основной flow, но даёт поисковику ключевые слова и
 * семантическую структуру.
 */
export const SeoSections: React.FC<{ blocks: SeoBlock[] }> = ({ blocks }) => {
  if (!blocks?.length) return null

  return (
    <section className="px-4 py-6 md:py-8">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {blocks
          .filter((b): b is Required<Pick<SeoBlock, 'heading' | 'body' | 'ctaHref'>> & SeoBlock =>
            Boolean(b.heading && b.body && b.ctaHref),
          )
          .map((b, i) => (
            <article
              key={i}
              className="bg-card border border-border rounded-xl shadow-e1 p-6 md:p-8"
            >
              <h2 className="text-headline text-on-surface mb-3">
                {b.heading}
              </h2>
              <p className="text-body text-on-surface-variant max-w-3xl">
                {highlight(b.body, b.highlightKeywords)}
              </p>
              <Link
                href={b.ctaHref}
                className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-primary hover:gap-2 transition-all"
              >
                {b.ctaLabel || 'Смотреть объекты'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
      </div>
    </section>
  )
}

/**
 * Подсвечивает в тексте указанные ключевые слова <strong>. Только
 * целые слова, без регекс-инъекций.
 */
function highlight(text: string, keywords?: string): React.ReactNode {
  if (!keywords?.trim()) return text
  const list = keywords
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
  if (list.length === 0) return text

  const escaped = list.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const rx = new RegExp(`(${escaped.join('|')})`, 'giu')
  const parts = text.split(rx)
  return parts.map((p, i) =>
    rx.test(p) ? (
      <strong key={i} className="font-semibold text-on-surface">
        {p}
      </strong>
    ) : (
      <React.Fragment key={i}>{p}</React.Fragment>
    ),
  )
}
