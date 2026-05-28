import React from 'react'
import { Label } from '@/components/ui/label'
import { cn } from '@/utilities/ui'

interface FormFieldProps {
  label?: React.ReactNode
  htmlFor?: string
  hint?: React.ReactNode
  error?: React.ReactNode
  required?: boolean
  className?: string
  children: React.ReactNode
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  hint,
  error,
  required,
  className,
  children,
}) => {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {label ? (
        <Label htmlFor={htmlFor} className="text-body-sm font-medium text-on-surface">
          {label}
          {required ? <span className="text-destructive ml-0.5" aria-hidden>*</span> : null}
        </Label>
      ) : null}
      {children}
      {error ? (
        <p className="text-body-sm text-destructive" role="alert">{error}</p>
      ) : hint ? (
        <p className="text-body-sm text-on-surface-variant">{hint}</p>
      ) : null}
    </div>
  )
}
