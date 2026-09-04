'use client'
import React from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  React.useEffect(() => {
    // Could send to Sentry / Logtail here when wired up.
    // eslint-disable-next-line no-console
    console.error('App error boundary:', error)
  }, [error])

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center space-y-5 max-w-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 text-rose-700">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h1 className="text-headline text-on-surface">Что-то пошло не так</h1>
        <p className="text-body text-on-surface-variant">
          Мы записали ошибку и уже работаем над её устранением. Попробуйте перезагрузить
          страницу или вернитесь на главную.
        </p>
        {error.digest ? (
          <p className="text-label text-on-surface-variant font-mono">
            Код ошибки: {error.digest}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-2 justify-center pt-2">
          <Button onClick={reset}>
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Повторить
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">На главную</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
