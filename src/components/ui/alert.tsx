import React from 'react'
import { CheckCircle2, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/utilities/ui'

type Variant = 'success' | 'error' | 'info'

interface AlertProps {
  variant?: Variant
  title?: React.ReactNode
  className?: string
  children?: React.ReactNode
}

const VARIANTS: Record<Variant, { icon: React.ComponentType<{ className?: string }>; surface: string; text: string }> = {
  success: { icon: CheckCircle2, surface: 'bg-primary-container', text: 'text-on-primary-container' },
  error:   { icon: AlertCircle, surface: 'bg-destructive/10', text: 'text-destructive' },
  info:    { icon: Info, surface: 'bg-surface-container', text: 'text-on-surface' },
}

export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, className, children }) => {
  const v = VARIANTS[variant]
  const Icon = v.icon
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn('flex items-start gap-3 rounded-md p-4', v.surface, v.text, className)}
    >
      <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" aria-hidden />
      <div className="flex-1 space-y-1">
        {title ? <p className="text-title">{title}</p> : null}
        {children ? <div className="text-body-sm">{children}</div> : null}
      </div>
    </div>
  )
}
