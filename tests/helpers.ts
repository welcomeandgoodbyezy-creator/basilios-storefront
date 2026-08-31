import { createHmac } from 'node:crypto'

export function makeWebhookRequest(
  body: object,
  opts: { secret?: string; token?: string } = {}
) {
  const raw = JSON.stringify(body)
  const headers: Record<string, string> = {
    'content-type': 'application/json',
  }

  if (opts.secret) {
    const sig = 'sha256=' + createHmac('sha256', opts.secret).update(raw).digest('hex')
    headers['x-hub-signature-256'] = sig
  }

  return new Request('http://localhost/api/messenger/webhook', {
    method: 'POST',
    headers,
    body: raw,
  })
}

export function makeVerifyRequest(token: string, challenge: string) {
  return new Request(
    `http://localhost/api/messenger/webhook?hub.mode=subscribe&hub.verify_token=${token}&hub.challenge=${challenge}`,
    { method: 'GET' }
  )
}