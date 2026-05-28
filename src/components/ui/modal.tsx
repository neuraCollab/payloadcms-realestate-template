'use client'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import React from 'react'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: React.ReactNode
  description?: React.ReactNode
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  showClose?: boolean
}

const SIZES: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw] h-[95vh]',
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  size = 'md',
  className,
  showClose = true,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-card text-on-surface rounded-lg shadow-e3 w-[calc(100%-2rem)] max-h-[90vh] overflow-auto',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            SIZES[size],
            className,
          )}
        >
          {(title || showClose) && (
            <div className="flex items-start justify-between gap-4 p-6 pb-2">
              <div className="space-y-1">
                {title ? <Dialog.Title className="text-title-lg">{title}</Dialog.Title> : null}
                {description ? (
                  <Dialog.Description className="text-body-sm text-on-surface-variant">
                    {description}
                  </Dialog.Description>
                ) : null}
              </div>
              {showClose ? (
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon" aria-label="Закрыть">
                    <X className="h-4 w-4" />
                  </Button>
                </Dialog.Close>
              ) : null}
            </div>
          )}
          <div className="px-6 pb-6">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
