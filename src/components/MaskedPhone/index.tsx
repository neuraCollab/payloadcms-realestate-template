'use client'
import React from 'react'
import { Phone, Eye } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { trackEvent } from '@/lib/analytics'

interface Props {
  phone: string
  /** 'inline' = compact pill; 'button' = full button look. Default 'button'. */
  variant?: 'inline' | 'button'
  className?: string
  label?: string
  collection?: string
  propertyId?: string
}

// Keeps the last `keep` digits and a +country prefix visible; the middle is
// masked with '*'. E.g. "+79991234567" → "+7 (999) ***-**-67".
const maskPhone = (raw: string, keep = 2): string => {
  const digits = raw.replace(/\D/g, '')
  if (digits.length < keep + 1) return raw
  const tail = digits.slice(-keep)
  const country = digits.startsWith('7') || digits.startsWith('8') ? '+7' : `+${digits[0]}`
  return `${country} (***) ***-**-${tail}`
}

/**
 * Hides a phone number until clicked. Two reasons:
 *  1) anti-spam: scrapers won't pick the digits up
 *  2) tracking: we know who clicked to see it
 *
 * After reveal it becomes a real <a href="tel:…"> for one-tap dialing.
 */
export const MaskedPhone: React.FC<Props> = ({
  phone,
  variant = 'button',
  className,
  label,
  collection,
  propertyId,
}) => {
  const [revealed, setRevealed] = React.useState(false)

  if (!phone) return null

  if (revealed) {
    return (
      <a
        href={`tel:${phone.replace(/\s/g, '')}`}
        className={cn(
          variant === 'button'
            ? 'inline-flex items-center gap-1.5 h-10 px-4 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 transition-colors'
            : 'inline-flex items-center gap-1 text-body-sm text-primary hover:underline',
          className,
        )}
      >
        <Phone className="w-4 h-4" />
        {phone}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (!revealed) {
          trackEvent('phone_reveal', { collection, id: propertyId })
        }
        setRevealed(true)
      }}
      aria-label="Показать телефон"
      className={cn(
        variant === 'button'
          ? 'inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-border bg-card text-body-sm font-medium text-on-surface hover:bg-surface-container transition-colors'
          : 'inline-flex items-center gap-1 text-body-sm text-primary hover:underline cursor-pointer',
        className,
      )}
    >
      <Phone className="w-4 h-4 text-on-surface-variant" />
      <span className="font-mono">{maskPhone(phone)}</span>
      <Eye className="w-3.5 h-3.5 text-on-surface-variant" />
      {label ? <span className="ml-1 text-on-surface-variant">{label}</span> : null}
    </button>
  )
}
