import { describe, it, expect } from 'vitest'
import { prisma } from '@/lib/prisma'
import { handleMessengerMessage } from '@/lib/messenger/brain'
import { POST } from '@/app/api/messenger/webhook/route'
import { makeWebhookRequest } from './helpers'

async function lastOutbound(psid: string): Promise<string> {
  const convo = await prisma.messengerConversation.findUnique({ where: { senderPsid: psid } })
  const msg = await prisma.messengerMessage.findFirst({
    where: { conversationId: convo!.id, direction: 'outbound' },
    orderBy: { createdAt: 'desc' },
  })
  return msg!.text
}

describe('brain — basic intents', () => {
  it('greets with the welcome message', async () => {
    await handleMessengerMessage('greet1', 'hello', 'm1')
    const reply = await lastOutbound('greet1')
    expect(reply.toLowerCase()).toContain('luto assistant')
  })

  it('answers hours from the Store record', async () => {
    await prisma.store.upsert({
      where: { id: 1 },
      create: { name: 'luto', address: '1 main st', latitude: 0, longitude: 0, openingHours: '10am to 10pm' },
      update: { openingHours: '10am to 10pm' },
    })
    await handleMessengerMessage('hours1', 'what are your hours?', 'm2')
    const reply = await lastOutbound('hours1')
    expect(reply).toContain('10am to 10pm')
  })

  it('answers menu price from the Product record', async () => {
    const cat = await prisma.category.upsert({
      where: { id: 1 },
      create: { name: 'test-cat' },
      update: {},
    })
    await prisma.product.create({
      data: { name: 'test dragon roll', price: 9.25, categoryId: cat.id, availability: true },
    })
    await handleMessengerMessage('menu1', 'how much is the test dragon roll?', 'm3')
    const reply = await lastOutbound('menu1')
    expect(reply).toContain('test dragon roll')
    expect(reply).toContain('9.25')
  })

  it('answers availability from the Product record', async () => {
    await handleMessengerMessage('avail1', 'is the ember beef bowl available?', 'm4')
    const reply = await lastOutbound('avail1')
    expect(reply.toLowerCase()).toMatch(/available|out of stock/)
  })

  it('matches a faq by keyword', async () => {
    await prisma.faqEntry.create({
      data: { question: 'do you deliver', answer: 'yes, within 5km', category: 'general', keywords: ['delivery'], enabled: true },
    })
    await handleMessengerMessage('faq1', 'do you deliver?', 'm5')
    const reply = await lastOutbound('faq1')
    expect(reply).toBe('yes, within 5km')
  })

  it('escalates unknown questions to human_required', async () => {
    await handleMessengerMessage('unk1', 'who is the prime minister of antarctica?', 'm6')
    const convo = await prisma.messengerConversation.findUnique({ where: { senderPsid: 'unk1' } })
    expect(convo!.status).toBe('human_required')
    const reply = await lastOutbound('unk1')
    expect(reply.toLowerCase()).toContain('forward')
  })
})

describe('brain — reservation flow', () => {
  it('starts the flow on reservation intent', async () => {
    await handleMessengerMessage('res1', 'i want to reserve a table', 'r1')
    const convo = await prisma.messengerConversation.findUnique({ where: { senderPsid: 'res1' } })
    expect(convo!.state).toBe('awaiting_date')
  })

  it('walks through date → time → party → name and creates a reservation', async () => {
    await prisma.store.upsert({
      where: { id: 1 },
      create: { name: 'luto', address: '1 main st', latitude: 0, longitude: 0, openingHours: '10am to 10pm' },
      update: {},
    })

    await handleMessengerMessage('walk1', 'i want to reserve a table', 'w1')
    await handleMessengerMessage('walk1', 'tomorrow', 'w2')
    await handleMessengerMessage('walk1', '7 pm', 'w3')
    await handleMessengerMessage('walk1', '4', 'w4')
    await handleMessengerMessage('walk1', 'test user', 'w5')

    const convo = await prisma.messengerConversation.findUnique({ where: { senderPsid: 'walk1' } })
    expect(convo!.state).toBe('idle')

    const reservation = await prisma.reservation.findFirst({
      where: { name: 'test user' },
      orderBy: { createdAt: 'desc' },
    })
    expect(reservation).toBeTruthy()
    expect(reservation!.partySize).toBe(4)

    const reply = await lastOutbound('walk1')
    expect(reply.toLowerCase()).toContain('done!')
  })

  it('cancels the flow on cancel command', async () => {
    await handleMessengerMessage('cancel1', 'reserve a table', 'c1')
    await handleMessengerMessage('cancel1', 'cancel', 'c2')
    const convo = await prisma.messengerConversation.findUnique({ where: { senderPsid: 'cancel1' } })
    expect(convo!.state).toBe('idle')
  })

  it('rejects past dates', async () => {
    await handleMessengerMessage('past1', 'reserve a table', 'p1')
    await handleMessengerMessage('past1', 'yesterday', 'p2')
    const reply = await lastOutbound('past1')
    expect(reply.toLowerCase()).toMatch(/didn't catch|past|try/)
  })
})

describe('webhook dedup', () => {
  it('processes the same message id only once', async () => {
    delete process.env.MESSENGER_APP_SECRET
    const body = {
      object: 'page',
      entry: [{ messaging: [{ sender: { id: 'dedup1' }, message: { mid: 'same-id', text: 'hello' } }] }],
    }
    await POST(makeWebhookRequest(body))
    await POST(makeWebhookRequest(body))

    const convo = await prisma.messengerConversation.findUnique({ where: { senderPsid: 'dedup1' } })
    const inbounds = await prisma.messengerMessage.count({
      where: { conversationId: convo!.id, direction: 'inbound' },
    })
    expect(inbounds).toBe(1)
  })
})