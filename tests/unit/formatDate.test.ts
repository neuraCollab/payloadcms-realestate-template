import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { formatDate } from '../../src/utilities/formatDate'

describe('formatDate', () => {
  it('formats a valid date string correctly', () => {
    // We use a time string around noon to avoid timezone shift issues
    const result = formatDate('2023-10-15T12:00:00')
    assert.equal(result, 'October 15, 2023')
  })

  it('formats a valid Date object correctly', () => {
    // 2023, 9 is October (0-indexed)
    const date = new Date(2023, 9, 15, 12, 0, 0)
    const result = formatDate(date)
    assert.equal(result, 'October 15, 2023')
  })

  it('formats an alternative date string format correctly', () => {
    const result = formatDate('10/15/2023')
    assert.equal(result, 'October 15, 2023')
  })

  it('returns "Invalid Date" when passed an invalid date string', () => {
    const result = formatDate('not-a-valid-date')
    assert.equal(result, 'Invalid Date')
  })
})
