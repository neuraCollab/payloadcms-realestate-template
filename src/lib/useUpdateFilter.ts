// src/lib/useUpdateFilter.ts
'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

/**
 * Обновляет один или несколько query-параметров, не трогая остальные
 */
export function useUpdateFilter() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return useCallback(
    (updates: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString())

      for (const [key, value] of Object.entries(updates)) {
        if (value === null || value === '' || value === 'all') {
          newParams.delete(key)
        } else {
          newParams.set(key, value)
        }
      }

      const queryString = newParams.toString()
      const url = queryString ? `${pathname}?${queryString}` : pathname

      router.replace(url, { scroll: false })
    },
    [router, pathname, searchParams]
  )
}