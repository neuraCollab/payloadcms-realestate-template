import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { authenticated } from '../../src/access/authenticated'

describe('authenticated access control', () => {
  it('returns true when user exists', () => {
    const args = {
      req: {
        user: { id: '1', email: 'test@example.com' }
      }
    } as any

    assert.equal(authenticated(args), true)
  })

  it('returns false when user is null', () => {
    const args = {
      req: {
        user: null
      }
    } as any

    assert.equal(authenticated(args), false)
  })

  it('returns false when user is undefined', () => {
    const args = {
      req: {
        user: undefined
      }
    } as any

    assert.equal(authenticated(args), false)
  })
})
