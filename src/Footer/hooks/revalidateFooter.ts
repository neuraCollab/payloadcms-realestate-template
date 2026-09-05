import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import { routing } from '@/i18n/routing'

export const revalidateFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating footer`)

    for (const locale of routing.locales) {
      revalidateTag(`global_footer_${locale}`)
    }
  }

  return doc
}
