import { describe, it, expect, vi } from 'vitest'
import { GET, POST } from '@/app/api/messenger/webhook/route'
import { makeVerifyRequest, makeWebhookRequest } from './helpers'

describe('webhook GET (verification)', () => {
  it('returns the challenge when token matches', async () => {
    process.env.MESSENGER_VERIFY_TOKEN = 'test_token'
    const req = makeVerifyRequest('test_token', 'challenge_123')
    const res = await GET(req)
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('challenge_123')
  })

  it('returns 403 when token does not match', async () => {
    process.env.MESSENGER_VERIFY_TOKEN = 'test_token'
    const req = makeVerifyRequest('wrong_token', 'challenge_123')
    const res = await GET(req)
    expect(res.status).toBe(403)
  })
})

describe('webhook POST (signature)', () => {
  it('rejects when signature is missing and secret is set', async () => {
    process.env.MESSENGER_APP_SECRET = 'test_secret'
    const req = makeWebhookRequest({ object: 'page', entry: [] })
    const res = await POST(req)
    expect(res.status).toBe(403)
  })

  it('rejects when signature is wrong', async () => {
    process.env.MESSENGER_APP_SECRET = 'test_secret'
    const req = makeWebhookRequest({ object: 'page', entry: [] }, { secret: 'wrong_secret' })
    const res = await POST(req)
    expect(res.status).toBe(403)
  })

  it('accepts when signature is correct', async () => {
    process.env.MESSENGER_APP_SECRET = 'test_secret'
    const req = makeWebhookRequest(
      { object: 'page', entry: [{ messaging: [] }] },
      { secret: 'test_secret' }
    )
    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
  })

  it('returns 400 on bad JSON', async () => {
    delete process.env.MESSENGER_APP_SECRET
    const req = new Request('http://localhost/api/messenger/webhook', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: 'not json',
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})