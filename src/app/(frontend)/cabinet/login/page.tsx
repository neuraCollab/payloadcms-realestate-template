import type { Metadata } from 'next'
import React from 'react'
import { LoginForm } from './LoginForm'
import { MessageSquare } from 'lucide-react'
import { getConfiguredProviders } from '@/lib/auth/oauth/providers'

export default function CabinetLoginPage() {
  const providers = getConfiguredProviders()
  return (
    <div className="bg-card rounded-md shadow-e1 p-8 text-center max-w-md mx-auto">
      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
        <MessageSquare className="w-5 h-5" />
      </div>
      <h1 className="text-headline text-on-surface mb-1">Вход в кабинет</h1>
      <p className="text-body-sm text-on-surface-variant mb-6">
        Введите email, который вы использовали при отправке сообщения риэлтору —
        мы покажем все ваши переписки.
      </p>
      <LoginForm providers={providers} />
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Вход в кабинет — MegaDomic',
  description:
    'Войдите в личный кабинет MegaDomic, чтобы управлять избранным, ' +
    'сохранёнными поисками и перепиской с риэлторами.',
  // noindex наследуется из cabinet/layout.tsx — не дублируем.
}
