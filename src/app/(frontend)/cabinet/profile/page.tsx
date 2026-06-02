import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { User as UserIcon, Mail, Calendar, MessageSquare } from 'lucide-react'

// SSG skipped — DB unreachable at build-time inside docker compose.
export const dynamic = 'force-dynamic'

const formatDate = (iso?: string) => {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function CabinetProfilePage() {
  const cookieStore = await cookies()
  const email = cookieStore.get('realty_email')?.value
  if (!email) redirect('/cabinet/login')

  const payload = await getPayload({ config })

  // First-message timestamp ≈ "registration" date for this cabinet.
  const earliest = await payload.find({
    collection: 'messages',
    where: { email: { equals: email } },
    sort: 'createdAt',
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })

  const allMessages = await payload.find({
    collection: 'messages',
    where: { email: { equals: email } },
    limit: 0,
    depth: 0,
    overrideAccess: true,
  })

  const firstSeenAt = (earliest.docs[0] as any)?.createdAt
  const messageCount = allMessages.totalDocs

  return (
    <div className="max-w-2xl space-y-4">
      <div className="bg-card rounded-md shadow-e1 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <UserIcon className="w-7 h-7" />
          </div>
          <div className="min-w-0">
            <h1 className="text-headline text-on-surface">Профиль</h1>
            <p className="text-body-sm text-on-surface-variant line-clamp-1">{email}</p>
          </div>
        </div>

        <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Mail className="w-4 h-4 mt-0.5 text-on-surface-variant" />
            <div className="min-w-0">
              <dt className="text-label text-on-surface-variant uppercase">Email</dt>
              <dd className="text-body-sm text-on-surface line-clamp-1">{email}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Calendar className="w-4 h-4 mt-0.5 text-on-surface-variant" />
            <div className="min-w-0">
              <dt className="text-label text-on-surface-variant uppercase">С нами с</dt>
              <dd className="text-body-sm text-on-surface">
                {formatDate(firstSeenAt) ?? '—'}
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:col-span-2">
            <MessageSquare className="w-4 h-4 mt-0.5 text-on-surface-variant" />
            <div className="min-w-0">
              <dt className="text-label text-on-surface-variant uppercase">Всего сообщений</dt>
              <dd className="text-body-sm text-on-surface">
                {messageCount}{' '}
                <Link
                  href="/cabinet/chats"
                  className="text-primary hover:underline ml-1"
                >
                  открыть переписки →
                </Link>
              </dd>
            </div>
          </div>
        </dl>
      </div>

      <div className="bg-card rounded-md shadow-e1 p-6">
        <h2 className="text-title-lg text-on-surface mb-2">Уведомления</h2>
        <p className="text-body-sm text-on-surface-variant">
          Скоро здесь появятся настройки рассылок: новые сообщения от риэлторов,
          совпадения по сохранённым поискам, ценовые алерты.
        </p>
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Профиль — Realty',
}
