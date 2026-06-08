'use client'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

interface Props {
  checked: boolean
  onChange: (next: boolean) => void
  /** Optional legend prefix — e.g. "Отправляя сообщение,". */
  prefix?: string
  /** URL to the privacy policy. Default /privacy. */
  privacyUrl?: string
  /** URL to terms of service (optional second link). */
  termsUrl?: string
  id?: string
  className?: string
}

/**
 * Чекбокс согласия на обработку персональных данных.
 *
 * По 152-ФЗ:
 *  - НЕ должен быть отмечен по умолчанию (поэтому `checked` — controlled prop)
 *  - Должен ссылаться на актуальную Политику обработки ПДн
 *  - Пока не отмечен — submit-кнопка формы должна быть disabled
 */
export const ConsentCheckbox: React.FC<Props> = ({
  checked,
  onChange,
  prefix,
  privacyUrl = '/privacy',
  termsUrl,
  id = 'consent-pdn',
  className,
}) => {
  return (
    <div className={cn('flex items-start gap-2', className)}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required
        className="mt-0.5 w-4 h-4 accent-primary cursor-pointer shrink-0"
        aria-required="true"
      />
      <label
        htmlFor={id}
        className="text-label text-on-surface-variant leading-snug cursor-pointer select-none"
      >
        {prefix ? `${prefix} ` : ''}я согласен на{' '}
        <Link
          href={privacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          обработку персональных данных
        </Link>
        {termsUrl ? (
          <>
            {' и '}
            <Link
              href={termsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              условиями использования
            </Link>
          </>
        ) : null}
        . Также соглашаюсь с использованием{' '}
        <Link
          href={`${privacyUrl}#ai-recommendations`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          рекомендательной системы
        </Link>
        {' '}для подбора объявлений.
      </label>
    </div>
  )
}
