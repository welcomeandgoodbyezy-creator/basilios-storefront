import { NextResponse } from 'next/server'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { prisma } from '@/lib/prisma'
import { handleMessengerMessage } from '@/lib/messenger/brain'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token && token === process.env.MESSENGER_VERIFY_TOKEN) {
    return new NextResponse(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain' },
    })
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
}

export async function POST(request: Request) {
  const raw = await request.text()

  const secret = process.env.MESSENGER_APP_SECRET
  if (secret) {
    const signature = request.headers.get('x-hub-signature-256') ?? ''
    const expected =
      'sha256=' + createHmac('sha256', secret).update(raw).digest('hex')
    const a = Buffer.from(signature)
    const b = Buffer.from(expected)
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return NextResponse.json({ error: 'Bad signature' }, { status: 403 })
    }
  }

  let body: any
  try {
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'Bad body' }, { status: 400 })
  }

  if (body?.object !== 'page') {
    return NextResponse.json({ ok: true })
  }

  for (const entry of body.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      const messageId: string | undefined = event.message?.mid
      const text: string | undefined = event.message?.text
      const senderPsid: string | undefined = event.sender?.id

      if (!messageId || !text || !senderPsid) continue
      if (event.message?.is_echo) continue

      const duplicate = await prisma.messengerMessage.findUnique({
        where: { metaMessageId: messageId },
      })
      if (duplicate) continue

      await handleMessengerMessage(senderPsid, text, messageId)
    }
  }

  return NextResponse.json({ ok: true })
}