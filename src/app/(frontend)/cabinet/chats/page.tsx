import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { MessageSquare, User as UserIcon, ChevronRight } from 'lucide-react'

// SSG skipped — DB unreachable at build-time inside docker compose.
export const dynamic = 'force-dynamic'

const pluralizeBeseda = (n: number) => {
  const last = n % 10
  const lastTwo = n % 100
  if (lastTwo >= 11 && lastTwo <= 14) return 'бесед'
  if (last === 1) return 'беседа'
  if (last >= 2 && last <= 4) return 'беседы'
  return 'бесед'
}

interface ThreadSummary {
  threadId: string
  realtorName: string
  realtorPhotoUrl: string | null
  realtorSlug?: string
  lastSubject: string
  lastSentAt: string
  totalMessages: number
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

export default async function ChatListPage() {
  const cookieStore = await cookies()
  const email = cookieStore.get('realty_email')?.value

  if (!email) {
    return (
      <div>
        <div className="text-center bg-card rounded-md shadow-e1 p-10">
          <MessageSquare className="w-12 h-12 text-on-surface-variant/40 mx-auto mb-3" />
          <h1 className="text-headline text-on-surface mb-2">Личный кабинет</h1>
          <p className="text-body text-on-surface-variant max-w-md mx-auto">
            Ваши переписки появятся здесь после первого отправленного сообщения риэлтору.
            Откройте любое объявление и нажмите «Написать».
          </p>
          <div className="mt-6 flex justify-center gap-2 flex-wrap">
            <Link
              href="/flats"
              className="inline-flex h-10 px-5 items-center rounded-full bg-primary text-primary-foreground text-body-sm font-medium hover:bg-primary/90"
            >
              К каталогу квартир
            </Link>
            <Link
              href="/cabinet/login"
              className="inline-flex h-10 px-5 items-center rounded-full border border-border text-body-sm font-medium text-on-surface hover:bg-surface-container"
            >
              Я уже писал — войти
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const payload = await getPayload({ config })

  // All messages where this email participates as the user. To find both
  // inbound (from us) and outbound (from realtor) we filter by email field —
  // direction=outbound messages still carry the user's email for routing.
  const result = await payload.find({
    collection: 'messages',
    where: { email: { equals: email } },
    sort: '-createdAt',
    limit: 500,
    depth: 1,
    overrideAccess: true,
  })

  // Group by threadId, build per-thread summary.
  const map = new Map<string, ThreadSummary>()
  for (const m of result.docs as any[]) {
    const tid: string | undefined = m.threadId
    if (!tid) continue
    if (map.has(tid)) {
      const cur = map.get(tid)!
      cur.totalMessages += 1
      continue
    }
    const realtor = m.realtor && typeof m.realtor === 'object' ? m.realtor : null
    map.set(tid, {
      threadId: tid,
      realtorName: realtor?.name ?? 'Риэлтор',
      realtorPhotoUrl: realtor?.photo?.url ?? null,
      realtorSlug: realtor?.slug,
      lastSubject: m.subject ?? 'Без темы',
      lastSentAt: m.createdAt,
      totalMessages: 1,
    })
  }

  const threads = Array.from(map.values())

  return (
    <div>
      <header className="mb-6 flex items-end justify-between gap-3 flex-wrap">
        <div>
          <h1 className="text-headline text-on-surface">Мои переписки</h1>
          <p className="text-body-sm text-on-surface-variant">
            {email} · {threads.length} {pluralizeBeseda(threads.length)}
          </p>
        </div>
      </header>

      {threads.length === 0 ? (
        <div className="text-center bg-card rounded-md shadow-e1 p-10">
          <p className="text-body text-on-surface-variant">Переписок пока нет.</p>
        </div>
      ) : (
        <ul className="space-y-2">
          {threads.map((t) => (
            <li key={t.threadId}>
              <Link
                href={`/cabinet/chats/${t.threadId}`}
                className="group flex items-center gap-4 bg-card rounded-md shadow-e1 p-4 hover:shadow-e2 transition-shadow"
              >
                {t.realtorPhotoUrl ? (
                  <Image
                    src={t.realtorPhotoUrl}
                    alt={t.realtorName}
                    width={48}
                    height={48}
                    className="rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0">
                    <UserIcon className="w-5 h-5 text-on-surface-variant" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-title text-on-surface group-hover:text-primary line-clamp-1">
                      {t.realtorName}
                    </span>
                    <span className="text-label text-on-surface-variant whitespace-nowrap">
                      {formatDate(t.lastSentAt)}
                    </span>
                  </div>
                  <div className="text-body-sm text-on-surface-variant line-clamp-1">
                    {t.lastSubject}
                  </div>
                  <div className="text-label text-on-surface-variant mt-0.5">
                    {t.totalMessages}{' '}
                    {t.totalMessages === 1 ? 'сообщение' : 'сообщений'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-on-surface-variant shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Мои переписки — Demo Realty',
  description: 'История общения с риэлторами в одном месте.',
}
