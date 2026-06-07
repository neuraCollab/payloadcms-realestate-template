import type { Metadata } from 'next'
import React from 'react'
import { cookies } from 'next/headers'
import { CabinetShell } from './CabinetShell'

export default async function CabinetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const email = cookieStore.get('realty_email')?.value ?? null

  return <CabinetShell email={email}>{children}</CabinetShell>
}

export const metadata: Metadata = {
  title: 'Кабинет — MegaDomic',
  // Личный кабинет — приватный контент за cookie-сессией. От индекса
  // закрываем полностью (и не следуем по ссылкам — внутри только
  // личные данные пользователя).
  robots: { index: false, follow: false },
}
