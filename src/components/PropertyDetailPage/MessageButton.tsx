'use client'
import React from 'react'
import { MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MessagePopup } from './MessagePopup'

interface Props {
  realtorId: string
  realtorName: string
  propertyTitle?: string
  propertyCollection?: string
  propertyId?: string
}

// Owns both the "Написать" trigger and the slide-in popup. Used inside the
// realtor card on the property detail page.
export const MessageButton: React.FC<Props> = ({
  realtorId,
  realtorName,
  propertyTitle,
  propertyCollection,
  propertyId,
}) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        className="flex-col h-auto py-2 gap-1"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="text-label">Написать</span>
      </Button>
      <MessagePopup
        open={open}
        onClose={() => setOpen(false)}
        realtorId={realtorId}
        realtorName={realtorName}
        propertyTitle={propertyTitle}
        propertyCollection={propertyCollection}
        propertyId={propertyId}
      />
    </>
  )
}
