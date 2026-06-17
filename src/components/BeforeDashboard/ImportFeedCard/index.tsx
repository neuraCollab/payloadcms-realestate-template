'use client'

import React, { useCallback, useState } from 'react'
import { toast } from '@payloadcms/ui'
import './index.scss'

interface RowResult {
  externalId: string
  collection?: string
  status: 'created' | 'skipped' | 'error'
  reason?: string
}

interface ImportResponse {
  success?: boolean
  error?: string
  dryRun?: boolean
  format?: string
  totals?: { offers: number; created: number; skipped: number; errored: number }
  results?: RowResult[]
}

const baseClass = 'import-feed-card'

export const ImportFeedCard: React.FC = () => {
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<ImportResponse | null>(null)

  const runImport = useCallback(
    async (dryRun: boolean) => {
      if (!url.trim() && !file) {
        toast.error('Укажите URL фида или выберите файл')
        return
      }
      setLoading(true)
      setResult(null)
      try {
        let res: Response
        if (file) {
          const form = new FormData()
          form.append('file', file)
          res = await fetch(`/api/admin/import-feed?dryRun=${dryRun}`, {
            method: 'POST',
            credentials: 'include',
            body: form,
          })
        } else {
          res = await fetch(`/api/admin/import-feed?dryRun=${dryRun}`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url.trim() }),
          })
        }
        const data: ImportResponse = await res.json()
        if (!res.ok) {
          toast.error(data.error || 'Импорт не удался')
          setResult(data)
          return
        }
        setResult(data)
        const t = data.totals
        toast.success(
          dryRun
            ? `Проверка: ${t?.created ?? 0} можно создать, ${t?.skipped ?? 0} пропущено, ${t?.errored ?? 0} с ошибками`
            : `Импортировано: ${t?.created ?? 0} создано, ${t?.skipped ?? 0} пропущено, ${t?.errored ?? 0} с ошибками`,
        )
      } catch (e) {
        toast.error(e instanceof Error ? e.message : 'Импорт не удался')
      } finally {
        setLoading(false)
      }
    },
    [url, file],
  )

  return (
    <div className={baseClass}>
      <h4>Импорт фида (XML/YML)</h4>
      <p className={`${baseClass}__hint`}>
        Загрузите свой фид в формате Яндекс.Недвижимости (<code>realty-feed</code>) или Avito (
        <code>Ads</code>) — укажите ссылку на него или прикрепите файл. Повторная загрузка того же
        фида ничего не дублирует.
      </p>
      <div className={`${baseClass}__row`}>
        <input
          type="url"
          placeholder="https://agency.example.com/feed.yml"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading || !!file}
          className={`${baseClass}__input`}
        />
        <span className={`${baseClass}__or`}>или</span>
        <input
          type="file"
          accept=".xml,.yml,text/xml,application/xml"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          disabled={loading}
        />
      </div>
      <div className={`${baseClass}__actions`}>
        <button
          type="button"
          className={`${baseClass}__btn`}
          disabled={loading}
          onClick={() => runImport(true)}
        >
          Проверить (dry-run)
        </button>
        <button
          type="button"
          className={`${baseClass}__btn ${baseClass}__btn--primary`}
          disabled={loading}
          onClick={() => runImport(false)}
        >
          {loading ? 'Импортирую…' : 'Импортировать'}
        </button>
      </div>
      {result?.totals ? (
        <div className={`${baseClass}__summary`}>
          Формат: {result.format === 'yandex' ? 'Яндекс.Недвижимость' : 'Avito'} · офферов:{' '}
          {result.totals.offers} · создано: {result.totals.created} · пропущено:{' '}
          {result.totals.skipped} · ошибок: {result.totals.errored}
          {result.results && result.results.some((r) => r.status === 'error') ? (
            <ul className={`${baseClass}__errors`}>
              {result.results
                .filter((r) => r.status === 'error')
                .slice(0, 10)
                .map((r, i) => (
                  <li key={i}>
                    {r.externalId}: {r.reason}
                  </li>
                ))}
            </ul>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export default ImportFeedCard
