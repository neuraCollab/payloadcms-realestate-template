'use client'
import React from 'react'

/**
 * Общие атомы для всех 4 форм объявлений (flats/houses/commercial/lands).
 * Держим в одном файле чтобы избежать копипасты CSS-классов.
 */

export const inputCls =
  'w-full h-11 px-3 rounded-md border border-border bg-card text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
export const selectCls = inputCls
export const textareaCls =
  'w-full px-3 py-2 rounded-md border border-border bg-card text-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

export const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-title-lg text-on-surface mb-3">{children}</h2>
)

export const Field: React.FC<{
  label: string
  error?: string
  children: React.ReactNode
  hint?: string
  required?: boolean
}> = ({ label, error, children, hint, required }) => (
  <label className="block">
    <span className="text-label text-on-surface-variant">
      {label} {required ? <span className="text-rose-600">*</span> : null}
    </span>
    <div className="mt-1">{children}</div>
    {hint ? <span className="text-label text-on-surface-variant mt-1 block">{hint}</span> : null}
    {error ? <span className="text-label text-rose-600 mt-1 block">{error}</span> : null}
  </label>
)

export const Honeypot: React.FC<{ value: string; onChange: (v: string) => void }> = ({
  value,
  onChange,
}) => (
  <input
    type="text"
    name="website"
    tabIndex={-1}
    autoComplete="off"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    aria-hidden="true"
    className="absolute -left-[9999px] w-px h-px"
  />
)

export const TopError: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="rounded-md bg-rose-50 border border-rose-200 text-rose-900 p-3 text-body-sm">
    {children}
  </div>
)

export const StickyActions: React.FC<{
  submitting: boolean
  isEdit: boolean
  hint?: string
}> = ({ submitting, isEdit, hint }) => (
  <div className="sticky bottom-3 flex items-center gap-3 bg-card border border-border shadow-e2 rounded-full p-2 pl-4">
    <span className="text-body-sm text-on-surface-variant flex-1">
      {hint ?? (isEdit ? 'Изменения сохранятся в черновик.' : 'Сохраним как черновик, потом загрузите фото.')}
    </span>
    <button
      type="submit"
      disabled={submitting}
      className="h-10 px-5 rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90 disabled:opacity-60"
    >
      {submitting ? 'Сохранение…' : 'Сохранить'}
    </button>
  </div>
)

/** Lexical doc → plain text (для edit-mode из БД). */
export function extractText(node: any): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join(' ')
  const parts: string[] = []
  if (typeof node.text === 'string') parts.push(node.text)
  if (Array.isArray(node.children)) parts.push(...node.children.map(extractText))
  if (node.root) parts.push(extractText(node.root))
  return parts.join(' ').replace(/\s+/g, ' ').trim()
}
