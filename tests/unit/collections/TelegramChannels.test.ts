import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { TelegramChannels } from '../../../src/collections/TelegramChannels/index'

describe('TelegramChannels Collection', () => {
  it('should have correct slug', () => {
    assert.equal(TelegramChannels.slug, 'telegram-channels')
  })

  it('should allow read access to everyone', () => {
    // @ts-ignore
    assert.equal(TelegramChannels.access.read(), true)
  })

  it('should restrict create/update to authenticated users', () => {
    // @ts-ignore
    assert.equal(TelegramChannels.access.create({ req: { user: { id: 1 } } }), true)
    // @ts-ignore
    assert.equal(TelegramChannels.access.create({ req: { user: null } }), false)
    // @ts-ignore
    assert.equal(TelegramChannels.access.update({ req: { user: { id: 1 } } }), true)
    // @ts-ignore
    assert.equal(TelegramChannels.access.update({ req: { user: null } }), false)
  })

  it('should restrict delete to admin role', () => {
    // @ts-ignore
    assert.equal(TelegramChannels.access.delete({ req: { user: { role: 'admin' } } }), true)
    // @ts-ignore
    assert.equal(TelegramChannels.access.delete({ req: { user: { role: 'user' } } }), false)
    // @ts-ignore
    assert.equal(TelegramChannels.access.delete({ req: { user: null } }), false)
  })

  it('should have a status select field', () => {
    const statusField = TelegramChannels.fields.find(f => 'name' in f && f.name === 'status')
    assert.ok(statusField, 'status field should exist')
    if (statusField && statusField.type === 'select') {
        assert.equal(statusField.type, 'select')
        assert.deepEqual(statusField.options, [
          { label: 'Активный', value: 'active' },
          { label: 'Неактивный', value: 'inactive' },
        ])
        assert.equal(statusField.defaultValue, 'active')
        assert.equal(statusField.required, true)
    } else {
        assert.fail('status field is not a select')
    }
  })

  it('should have required cityName, citySlug, and channelId fields', () => {
    const fields = TelegramChannels.fields

    const cityName = fields.find(f => 'name' in f && f.name === 'cityName')
    assert.ok(cityName)
    if (cityName && 'required' in cityName) assert.equal(cityName.required, true)

    const citySlug = fields.find(f => 'name' in f && f.name === 'citySlug')
    assert.ok(citySlug)
    if (citySlug && 'required' in citySlug) assert.equal(citySlug.required, true)

    const channelId = fields.find(f => 'name' in f && f.name === 'channelId')
    assert.ok(channelId)
    if (channelId && 'required' in channelId) assert.equal(channelId.required, true)
  })
})
