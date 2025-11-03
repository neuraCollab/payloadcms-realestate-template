'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useUpdateFilter } from '@/lib/useUpdateFilter'

export function ResidentialComplexFilter() {
  const searchParams = useSearchParams()
  const updateFilter = useUpdateFilter()

  const status = searchParams.get('status') || 'all'
  const type = searchParams.get('type') || 'all'

  const [localStatus, setLocalStatus] = useState(status)
  const [localType, setLocalType] = useState(type)

  useEffect(() => {
    setLocalStatus(searchParams.get('status') || 'all')
    setLocalType(searchParams.get('type') || 'all')
  }, [searchParams])

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter({
        status: localStatus === 'all' ? null : localStatus,
        type: localType === 'all' ? null : localType,
      })
    }, 300)

    return () => clearTimeout(timeout)
  }, [localStatus, localType, updateFilter])

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm opacity-70">Статус</label>
        <select
          value={localStatus}
          onChange={(e) => setLocalStatus(e.target.value)}
          className="select select-bordered w-full text-base"
        >
          <option value="all">Любой</option>
          <option value="planning">Планируется</option>
          <option value="under-construction">Строится</option>
          <option value="completed">Сдан</option>
        </select>
      </div>

      <div>
        <label className="text-sm opacity-70">Класс</label>
        <select
          value={localType}
          onChange={(e) => setLocalType(e.target.value)}
          className="select select-bordered w-full text-base"
        >
          <option value="all">Любой</option>
          <option value="economy">Эконом</option>
          <option value="comfort">Комфорт</option>
          <option value="business">Бизнес</option>
          <option value="premium">Премиум</option>
        </select>
      </div>
    </div>
  )
}
