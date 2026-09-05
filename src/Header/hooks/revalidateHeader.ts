import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { routing } from '@/i18n/routing'

export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`)

    for (const locale of routing.locales) {
      revalidateTag(`global_header_${locale}`)
    }
  }

  return doc
}
