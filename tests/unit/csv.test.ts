// Unit tests for the CSV parser used by the admin import endpoint.

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { parseCsv } from '../../src/lib/csv'

describe('parseCsv', () => {
  it('parses a simple header + rows', () => {
    const rows = parseCsv(
      `title,price\n"Квартира 1",1000000\n"Квартира 2",2000000\n`,
    )
    assert.equal(rows.length, 2)
    assert.equal(rows[0].title, 'Квартира 1')
    assert.equal(rows[0].price, '1000000')
    assert.equal(rows[1].title, 'Квартира 2')
  })

  it('lowercases the header columns', () => {
    const rows = parseCsv(`Title,Price\nA,1\n`)
    assert.deepEqual(rows[0], { title: 'A', price: '1' })
  })

  it('handles escaped quotes inside fields', () => {
    const rows = parseCsv(`title\n"He said ""hi"""\n`)
    assert.equal(rows[0].title, 'He said "hi"')
  })

  it('handles commas inside quoted fields', () => {
    const rows = parseCsv(`address\n"Ул. Тверская, 12"\n`)
    assert.equal(rows[0].address, 'Ул. Тверская, 12')
  })

  it('strips BOM from the start of the file', () => {
    const rows = parseCsv(`﻿a,b\n1,2\n`)
    assert.deepEqual(rows[0], { a: '1', b: '2' })
  })

  it('handles CRLF and trailing empty rows', () => {
    const rows = parseCsv(`a,b\r\n1,2\r\n\r\n`)
    assert.equal(rows.length, 1)
    assert.deepEqual(rows[0], { a: '1', b: '2' })
  })

  it('returns empty array for empty input', () => {
    assert.deepEqual(parseCsv(''), [])
  })
})
