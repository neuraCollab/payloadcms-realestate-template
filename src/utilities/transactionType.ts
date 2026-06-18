/**
 * Shared mapping from `transactionType` ('sale' | 'rent' | 'daily') to the
 * badge/suffix shown on cards and detail pages. Centralised because every
 * call site used to special-case only 'rent', which left 'daily' (Sutochno
 * mock listings) either unlabeled or mislabeled as 'Продажа'.
 */
export const getTransactionBadge = (transactionType: string | undefined): string | undefined => {
  if (transactionType === 'sale') return 'Продажа'
  if (transactionType === 'rent') return 'Аренда'
  if (transactionType === 'daily') return 'Посуточно'
  return undefined
}

export const getPriceSuffix = (transactionType: string | undefined): string | undefined => {
  if (transactionType === 'rent') return '/ мес'
  if (transactionType === 'daily') return '/ сутки'
  return undefined
}
