'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { useUpdateFilter } from '@/lib/useUpdateFilter'

export function CommercialFilter() {
  const searchParams = useSearchParams()
  const updateFilter = useUpdateFilter()

  const transactionType = searchParams.get('transactionType') || 'all'
  const commercialType = searchParams.get('commercialType') || 'all'

  const [localTx, setLocalTx] = useState(transactionType)
  const [localType, setLocalType] = useState(commercialType)

  useEffect(() => {
    setLocalTx(searchParams.get('transactionType') || 'all')
    setLocalType(searchParams.get('commercialType') || 'all')
  }, [searchParams])

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter({
        transactionType: localTx === 'all' ? null : localTx,
        commercialType: localType === 'all' ? null : localType,
      })
    }, 300)
    return () => clearTimeout(timeout)
  }, [localTx, localType, updateFilter])

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm opacity-70">Сделка</label>
        <select
          value={localTx}
          onChange={(e) => setLocalTx(e.target.value)}
          className="select select-bordered w-full text-base"
        >
          <option value="all">Любая</option>
          <option value="sale">Продажа</option>
          <option value="rent">Аренда</option>
        </select>
      </div>

      <div>
        <label className="text-sm opacity-70">Тип</label>
        <select
          value={localType}
          onChange={(e) => setLocalType(e.target.value)}
          className="select select-bordered w-full text-base"
        >
          <option value="all">Любой</option>
          <option value="office">Офис</option>
          <option value="retail">Торговое</option>
          <option value="warehouse">Склад</option>
          <option value="free-purpose">Своб. назначения</option>
          <option value="catering">Общепит</option>
        </select>
      </div>
    </div>
  )
}