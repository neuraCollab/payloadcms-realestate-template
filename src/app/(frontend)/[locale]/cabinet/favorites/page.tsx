import type { Metadata } from 'next'
import React from 'react'
import { FavoritesClient } from './FavoritesClient'

export default function FavoritesPage() {
  return <FavoritesClient />
}

export const metadata: Metadata = {
  title: 'Избранное — Demo Realty',
  description: 'Сохранённые объекты недвижимости.',
}
