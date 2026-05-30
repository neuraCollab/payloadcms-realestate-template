'use client'
import React from 'react'

export interface ChatMessage {
  id: string | number
  subject: string
  direction: 'inbound' | 'outbound'
  text: string
  attachmentUrl: string | null
  createdAt: string
}

interface Props {
  threadId: string
  initial: ChatMessage[]
  /** Poll interval in ms. Default 15s. */
  intervalMs?: number
}

const formatTime = (iso: string) =>
  new Date(iso).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })

/**
 * Renders the message bubbles for a thread + polls /api/cabinet/messages
 * every `intervalMs` for new ones. New incoming messages slide in without a
 * full page reload, so a realtor's reply appears live (within the poll window).
 *
 * Polling pauses while the tab is hidden to avoid pointless network noise.
 */
export const MessageList: React.FC<Props> = ({
  threadId,
  initial,
  intervalMs = 15_000,
}) => {
  const [messages, setMessages] = React.useState<ChatMessage[]>(initial)
  const endRef = React.useRef<HTMLDivElement>(null)

  // Keep refs to the latest message createdAt for the polling guard.
  const lastCreatedAtRef = React.useRef<string>(
    initial.length > 0 ? initial[initial.length - 1].createdAt : new Date(0).toISOString(),
  )

  React.useEffect(() => {
    let cancelled = false
    let timer: ReturnType<typeof setTimeout> | null = null

    const tick = async () => {
      if (cancelled || document.hidden) {
        timer = setTimeout(tick, intervalMs)
        return
      }
      try {
        const res = await fetch(
          `/api/cabinet/messages?threadId=${encodeURIComponent(threadId)}&sinceCreatedAt=${encodeURIComponent(
            lastCreatedAtRef.current,
          )}`,
          { cache: 'no-store' },
        )
        if (res.ok) {
          const data = await res.json()
          const fresh: ChatMessage[] = data?.items ?? []
          if (fresh.length > 0) {
            setMessages((prev) => {
              // Dedupe by id (SSR-shipped messages may overlap with the first poll).
              const seen = new Set(prev.map((m) => String(m.id)))
              const merged = [...prev]
              for (const m of fresh) {
                if (!seen.has(String(m.id))) merged.push(m)
              }
              return merged
            })
            lastCreatedAtRef.current = fresh[fresh.length - 1].createdAt
          }
        }
      } catch {
        /* network blip — keep polling */
      }
      if (!cancelled) timer = setTimeout(tick, intervalMs)
    }

    timer = setTimeout(tick, intervalMs)
    return () => {
      cancelled = true
      if (timer) clearTimeout(timer)
    }
  }, [threadId, intervalMs])

  // Auto-scroll to bottom when new messages arrive.
  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length])

  return (
    <div className="space-y-3 mb-6">
      {messages.map((m) => {
        const isOutbound = m.direction === 'outbound'
        return (
          <div
            key={m.id}
            className={`flex ${isOutbound ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-e1 ${
                isOutbound
                  ? 'bg-card rounded-bl-sm text-on-surface'
                  : 'bg-primary rounded-br-sm text-primary-foreground'
              }`}
            >
              {m.subject && !isOutbound ? (
                <div
                  className={`text-label mb-1 ${
                    isOutbound ? 'text-on-surface-variant' : 'text-primary-foreground/80'
                  }`}
                >
                  {m.subject}
                </div>
              ) : null}
              <div className="text-body-sm whitespace-pre-wrap">{m.text}</div>
              {m.attachmentUrl ? (
                <a
                  href={m.attachmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-2 inline-flex items-center gap-1 text-label underline ${
                    isOutbound ? 'text-primary' : 'text-primary-foreground'
                  }`}
                >
                  Вложение
                </a>
              ) : null}
              <div
                className={`text-label mt-1 ${
                  isOutbound ? 'text-on-surface-variant' : 'text-primary-foreground/70'
                }`}
              >
                {formatTime(m.createdAt)}
              </div>
            </div>
          </div>
        )
      })}
      <div ref={endRef} />
    </div>
  )
}
