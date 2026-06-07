'use client'
import React from 'react'
import { Phone } from 'lucide-react'
import { ContactDialog } from './ContactDialog'

interface Props {
  realtorId?: string | number
  propertyCollection: string
  propertyId: string | number
  propertyTitle: string
  /** Если true — рисуется как полноразмерная primary-кнопка. */
  prominent?: boolean
}

/**
 * Заглавная CTA «Заказать звонок» — ставится на детальной странице
 * объявления. Открывает ContactDialog с 4 каналами связи.
 */
export const ContactCTA: React.FC<Props> = ({
  realtorId,
  propertyCollection,
  propertyId,
  propertyTitle,
  prominent = true,
}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          prominent
            ? 'w-full inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground text-body font-semibold hover:bg-primary/90 transition-colors'
            : 'inline-flex h-10 px-4 items-center gap-2 rounded-full border border-primary text-primary text-body-sm font-medium hover:bg-primary/5'
        }
      >
        <Phone className="w-4 h-4" />
        Связаться с риэлтором
      </button>
      <ContactDialog
        open={open}
        onClose={() => setOpen(false)}
        realtorId={realtorId}
        propertyCollection={propertyCollection}
        propertyId={propertyId}
        propertyTitle={propertyTitle}
      />
    </>
  )
}
