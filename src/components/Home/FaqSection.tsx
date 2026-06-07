import React from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question?: string
  answer?: string
}

/**
 * FAQ-секция с `<details>` — нативный disclosure, доступный без JS.
 * Дополнительно отдаём JSON-LD FAQPage — это даёт шанс попасть в
 * Featured Snippets / People Also Ask в выдаче.
 *
 * Не показываем секцию если меньше 2 вопросов — иначе schema невалидна.
 */
export const FaqSection: React.FC<{
  intro?: string
  items: FaqItem[]
}> = ({ intro = 'Частые вопросы', items }) => {
  const valid = items.filter(
    (i): i is { question: string; answer: string } =>
      Boolean(i.question?.trim() && i.answer?.trim()),
  )
  if (valid.length < 2) return null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: valid.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    })),
  }

  return (
    <section className="px-4 py-6 md:py-8 bg-surface-container-low/40">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-headline text-on-surface mb-4 md:mb-5">{intro}</h2>
        <div className="space-y-2">
          {valid.map((item, i) => (
            <details
              key={i}
              className="group bg-card border border-border rounded-md overflow-hidden"
            >
              <summary className="cursor-pointer list-none flex items-center justify-between gap-3 p-4 hover:bg-surface-container-low/50 transition-colors">
                <h3 className="text-title text-on-surface">{item.question}</h3>
                <ChevronDown className="w-4 h-4 text-on-surface-variant flex-shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 -mt-1 text-body-sm text-on-surface-variant">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  )
}
