// Unit tests for threadId derivation.

import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { computeThreadId } from '../../src/lib/threadId'

describe('computeThreadId', () => {
  it('is deterministic for the same (realtor, email) pair', () => {
    const a = computeThreadId(42, 'ivan@example.com')
    const b = computeThreadId(42, 'ivan@example.com')
    assert.equal(a, b)
  })

  it('is case-insensitive on email', () => {
    const a = computeThreadId(42, 'Ivan@Example.COM')
    const b = computeThreadId(42, 'ivan@example.com')
    assert.equal(a, b)
  })

  it('differs across realtors with the same email', () => {
    const a = computeThreadId(42, 'ivan@example.com')
    const b = computeThreadId(43, 'ivan@example.com')
    assert.notEqual(a, b)
  })

  it('returns a 16-char hex string', () => {
    const id = computeThreadId(1, 'x@y.z')
    assert.match(id, /^[0-9a-f]{16}$/)
  })
})
