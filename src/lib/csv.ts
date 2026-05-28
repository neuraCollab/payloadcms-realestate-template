// Minimal RFC-4180-ish CSV parser. Handles:
//   - quoted fields with embedded commas, quotes ("" → ") and newlines
//   - CR / LF / CRLF line endings
//   - empty trailing line
// Does NOT handle escapes outside double quotes, BOM removal, or non-comma delimiters.

export type CsvRow = Record<string, string>

const stripBom = (s: string) => (s.charCodeAt(0) === 0xfeff ? s.slice(1) : s)

const parseRows = (input: string): string[][] => {
  const rows: string[][] = []
  let field = ''
  let row: string[] = []
  let i = 0
  let inQuotes = false

  while (i < input.length) {
    const ch = input[i]

    if (inQuotes) {
      if (ch === '"') {
        if (input[i + 1] === '"') {
          // escaped quote
          field += '"'
          i += 2
          continue
        }
        inQuotes = false
        i++
        continue
      }
      field += ch
      i++
      continue
    }

    // not in quotes
    if (ch === '"') {
      inQuotes = true
      i++
      continue
    }
    if (ch === ',') {
      row.push(field)
      field = ''
      i++
      continue
    }
    if (ch === '\r' || ch === '\n') {
      // end of row
      row.push(field)
      field = ''
      rows.push(row)
      row = []
      // consume \r\n as one separator
      if (ch === '\r' && input[i + 1] === '\n') i += 2
      else i++
      continue
    }
    field += ch
    i++
  }
  // tail
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  // drop trailing empty rows
  while (rows.length > 0) {
    const last = rows[rows.length - 1]
    if (last.length === 1 && last[0] === '') rows.pop()
    else break
  }
  return rows
}

/**
 * Parses a CSV string with a header row, returning each subsequent row as an
 * object keyed by header columns (lower-cased and trimmed).
 */
export const parseCsv = (input: string): CsvRow[] => {
  const rows = parseRows(stripBom(input))
  if (rows.length === 0) return []
  const headers = rows[0].map((h) => h.trim().toLowerCase())
  const result: CsvRow[] = []
  for (let r = 1; r < rows.length; r++) {
    const cells = rows[r]
    if (cells.length === 0 || (cells.length === 1 && cells[0] === '')) continue
    const obj: CsvRow = {}
    for (let c = 0; c < headers.length; c++) {
      obj[headers[c]] = (cells[c] ?? '').trim()
    }
    result.push(obj)
  }
  return result
}
