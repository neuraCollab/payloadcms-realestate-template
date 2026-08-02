'use client'
import React, { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/analytics'

interface Props {
  isAiSearch: boolean
  query?: string
}

const PageClient: React.FC<Props> = ({ isAiSearch, query }) => {
  const previousQuery = useRef<string | undefined>(query)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (isAiSearch && query && query !== previousQuery.current) {
      trackEvent('ai_search', { query })
      previousQuery.current = query
    }
  }, [isAiSearch, query])

  return <React.Fragment />
}

export default PageClient
