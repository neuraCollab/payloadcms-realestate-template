'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useUpdateFilter } from '@/lib/useUpdateFilter'

export function LandFilter() {
  const searchParams = useSearchParams()
  const updateFilter = useUpdateFilter()

  const landType = searchParams.get('landType') || 'all'
  const hasUtilities = searchParams.get('hasUtilities') || 'all'

  const [localType, setLocalType] = useState(landType)
  const [localUtils, setLocalUtils] = useState(hasUtilities)

  useEffect(() => {
    setLocalType(searchParams.get('landType') || 'all')
    setLocalUtils(searchParams.get('hasUtilities') || 'all')
  }, [searchParams])

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter({
        landType: localType === 'all' ? null : localType,
        hasUtilities: localUtils === 'all' ? null : localUtils,
      })
    }, 300)
    return () => clearTimeout(timeout)
  }, [localType, localUtils, updateFilter])

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm opacity-70">Назначение</label>
        <select
          value={localType}
          onChange={(e) => setLocalType(e.target.value)}
          className="select select-bordered w-full text-base"
        >
          <option value="all">Любое</option>
          <option value="residential">ИЖС</option>
          <option value="agricultural">Сельхоз</option>
          <option value="industrial">Промназначения</option>
          <option value="commercial">Коммерческое</option>
        </select>
      </div>

      <div>
        <label className="text-sm opacity-70">Коммуникации</label>
        <select
          value={localUtils}
          onChange={(e) => setLocalUtils(e.target.value)}
          className="select select-bordered w-full text-base"
        >
          <option value="all">Любые</option>
          <option value="yes">Есть</option>
          <option value="no">Нет</option>
        </select>
      </div>
    </div>
  )
}
