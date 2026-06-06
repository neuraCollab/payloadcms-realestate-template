import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

// MegaDomic wordmark — light/dark варианты из /public.
// SVG имеет viewBox 520×120 → при h=44px ширина = ~190px, читается на
// ноутбуке. На совсем узких экранах подрезаем до 38px.
//
// Tailwind `dark:` через [data-theme="dark"] (см. tailwind.config.mjs).
export const Logo = ({ className, loading = 'eager', priority = 'high' }: Props) => {
  return (
    <span
      aria-label="MegaDomic"
      className={clsx('inline-flex items-center', className)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-light.svg"
        alt="MegaDomic"
        width={190}
        height={44}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="block dark:hidden h-9 sm:h-10 md:h-11 w-auto"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-dark.svg"
        alt=""
        aria-hidden="true"
        width={190}
        height={44}
        loading={loading}
        fetchPriority={priority}
        decoding="async"
        className="hidden dark:block h-9 sm:h-10 md:h-11 w-auto"
      />
    </span>
  )
}
