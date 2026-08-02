export const formatPrice = (n: number | string | null | undefined): string => {
  if (n === null || n === undefined) return '—'
  const num = Number(n)
  if (!Number.isFinite(num) || num <= 0) return '—'
  return Math.round(num).toLocaleString('ru-RU') + ' ₽'
}
