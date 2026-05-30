import type { Metadata } from 'next'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ChevronLeft, User as UserIcon, Phone, MessageSquare } from 'lucide-react'
import { ReplyForm } from './ReplyForm'
import { MessageList, type ChatMessage } from './MessageList'

interface RouteParams {
  threadId: string
}

interface Args {
  params: Promise<RouteParams>
}

// Extracts plain text from a Lexical doc. Best-effort — supports the simple
// paragraph-with-text-children structure our forms produce.
const lexicalToText = (v: any): string => {
  if (!v) return ''
  if (typeof v === 'string') return v
  const root = v?.root
  if (!root?.children) return ''
  const collect = (nodes: any[]): string =>
    nodes
      .map((n) => {
        if (typeof n.text === 'string') return n.text
        if (Array.isArray(n.children)) return collect(n.children)
        return ''
      })
      .join('')
  return root.children
    .map((p: any) => collect(p?.children ?? []))
    .filter(Boolean)
    .join('\n')
}

export default async function ChatThreadPage({ params: paramsPromise }: Args) {
  const { threadId } = await paramsPromise
  const cookieStore = await cookies()
  const email = cookieStore.get('realty_email')?.value

  if (!email) notFound()

  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'messages',
    where: {
      and: [{ threadId: { equals: threadId } }, { email: { equals: email } }],
    },
    sort: 'createdAt',
    limit: 500,
    depth: 1,
    overrideAccess: true,
  })

  if (result.docs.length === 0) notFound()

  const first = result.docs[0] as any
  const realtor = first.realtor && typeof first.realtor === 'object' ? first.realtor : null

  return (
    <article className="pt-24 pb-24 container max-w-3xl">
      <Link
        href="/cabinet/chats"
        className="inline-flex items-center gap-1 text-body-sm text-on-surface-variant hover:text-on-surface mb-4"
      >
        <ChevronLeft className="w-4 h-4" />К списку переписок
      </Link>

      {/* Realtor header */}
      <header className="bg-card rounded-md shadow-e1 p-4 flex items-center gap-4 mb-4">
        {realtor?.photo?.url ? (
          <Image
            src={realtor.photo.url}
            alt={realtor.name ?? 'Риэлтор'}
            width={56}
            height={56}
            className="rounded-full object-cover shrink-0"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center shrink-0">
            <UserIcon className="w-6 h-6 text-on-surface-variant" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-title text-on-surface line-clamp-1">
            {realtor?.name ?? 'Риэлтор'}
          </div>
          {realtor?.agency ? (
            <div className="text-body-sm text-on-surface-variant line-clamp-1">
              {realtor.agency}
            </div>
          ) : null}
        </div>
        {realtor?.phone ? (
          <a
            href={`tel:${realtor.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-1 h-9 px-3 rounded-full border border-border text-body-sm hover:bg-surface-container transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {realtor.phone}
          </a>
        ) : null}
      </header>

      {/* Messages — SSR baseline; client poll picks up new realtor replies */}
      {(() => {
        const initial: ChatMessage[] = (result.docs as any[]).map((m) => ({
          id: m.id,
          subject: m.subject ?? '',
          direction: m.direction === 'outbound' ? 'outbound' : 'inbound',
          text: lexicalToText(m.message),
          attachmentUrl:
            m.attachment && typeof m.attachment === 'object'
              ? m.attachment.url ?? null
              : null,
          createdAt: m.createdAt,
        }))
        return <MessageList threadId={threadId} initial={initial} />
      })()}

      <ReplyForm
        threadId={threadId}
        realtorId={String(first.realtor?.id ?? first.realtor)}
        realtorName={realtor?.name ?? 'Риэлтор'}
        userName={first.name ?? ''}
        userEmail={email}
      />

      {result.docs.length === 0 ? (
        <div className="text-center py-10">
          <MessageSquare className="w-10 h-10 text-on-surface-variant/40 mx-auto" />
          <p className="text-body-sm text-on-surface-variant mt-2">Сообщений нет.</p>
        </div>
      ) : null}
    </article>
  )
}

export const metadata: Metadata = {
  title: 'Чат с риэлтором — Realty',
}
