import { cookies } from 'next/headers'
import { redirect } from '@/i18n/navigation'
import { getLocale } from 'next-intl/server'

import type { User } from '../payload-types'
import { getClientSideURL } from './getURL'

export const getMeUser = async (args?: {
  nullUserRedirect?: string
  validUserRedirect?: string
}): Promise<{
  token: string
  user: User
}> => {
  const { nullUserRedirect, validUserRedirect } = args || {}
  const cookieStore = await cookies()
  const token = cookieStore.get('payload-token')?.value

  const meUserReq = await fetch(`${getClientSideURL()}/api/users/me`, {
    headers: {
      Authorization: `JWT ${token}`,
    },
  })

  const {
    user,
  }: {
    user: User
  } = await meUserReq.json()

  const locale = await getLocale()

  if (validUserRedirect && meUserReq.ok && user) {
    redirect({ href: validUserRedirect, locale })
  }

  if (nullUserRedirect && (!meUserReq.ok || !user)) {
    redirect({ href: nullUserRedirect, locale })
  }

  // Token will exist here because if it doesn't the user will be redirected
  return {
    token: token!,
    user,
  }
}
