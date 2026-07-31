import type { Metadata } from 'next'
import React from 'react'
import { RecentClient } from './RecentClient'

export default function CabinetRecentPage() {
  return <RecentClient />
}

export const metadata: Metadata = {
  title: 'Просмотренные — Demo Realty',
  description: 'История недавно просмотренных объявлений на одном экране.',
}
