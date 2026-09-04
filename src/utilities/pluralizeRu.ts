/**
 * Russian noun pluralization by count. Russian has 3 grammatical
 * plural forms (not 2 like English), selected by the count's last
 * digit(s):
 *   1, 21, 31…      → one   («1 объект», «21 объект»)
 *   2-4, 22-24…     → few   («2 объекта», «23 объекта»)
 *   0, 5-20, 25-30…  → many  («0 объектов», «5 объектов», «11 объектов»)
 *
 * A naive `n === 1 ? one : many` check (seen scattered across this
 * codebase) gets every count in the "few" range wrong — e.g.
 * "3 объектов" instead of "3 объекта" — and "many" counts like 0 or
 * 11-14 also fall outside the simple English-style singular/plural
 * split.
 */
export const pluralizeRu = (
  n: number,
  [one, few, many]: [string, string, string],
): string => {
  const lastTwo = Math.abs(n) % 100
  const last = lastTwo % 10
  if (lastTwo >= 11 && lastTwo <= 14) return many
  if (last === 1) return one
  if (last >= 2 && last <= 4) return few
  return many
}
