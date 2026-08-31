import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { sendMessengerText } from '@/lib/messenger/send'

async function log(kind: string, detail?: string) {
  await prisma.botEventLog.create({ data: { kind, detail } }).catch(() => {})
}

function matchKeywords(text: string, keywords: string[]): boolean {
  const lowered = text.toLowerCase()
  return keywords.some((k) => lowered.includes(k.toLowerCase()))
}

async function findFaq(text: string): Promise<string | null> {
  const faqs = await prisma.faqEntry.findMany({
    where: { enabled: true },
    orderBy: { createdAt: 'desc' },
  })

  for (const faq of faqs) {
    const questionWords = faq.question.toLowerCase().split(/\s+/)
    const textLower = text.toLowerCase()

    if (questionWords.some((w) => w.length > 3 && textLower.includes(w))) {
      return faq.answer
    }

    if (matchKeywords(text, faq.keywords)) {
      return faq.answer
    }
  }

  return null
}

async function handleHoursQuestion(): Promise<string | null> {
  const store = await prisma.store.findFirst({ orderBy: { id: 'asc' } })
  if (!store?.openingHours) return null

  return `We're open ${store.openingHours}. Come visit us at ${store.address}!`
}

async function handleMenuQuestion(text: string): Promise<string | null> {
  const categories = await prisma.category.findMany({
    include: { products: { where: { availability: true } } },
  })

  const lowered = text.toLowerCase()

  for (const cat of categories) {
    for (const prod of cat.products) {
      if (lowered.includes(prod.name.toLowerCase())) {
        return `${prod.name}: $${prod.price.toFixed(2)}${prod.description ? `. ${prod.description}` : ''}`
      }
    }
  }

  if (lowered.includes('menu') || lowered.includes('food') || lowered.includes('eat')) {
    const categoryNames = categories.map((c) => c.name).join(', ')
    return `We have ${categoryNames}. What would you like to try?`
  }

  return null
}

async function handleAvailabilityQuestion(text: string): Promise<string | null> {
  for (const cat of await prisma.category.findMany({ include: { products: true } })) {
    for (const prod of cat.products) {
      if (text.toLowerCase().includes(prod.name.toLowerCase())) {
        return prod.availability
          ? `Yes, ${prod.name} is available now!`
          : `Sorry, ${prod.name} is currently out of stock.`
      }
    }
  }

  return null
}

function isReservationIntent(text: string): boolean {
  const lowered = text.toLowerCase()
  return (
    lowered.includes('reserve') ||
    lowered.includes('booking') ||
    lowered.includes('table') ||
    lowered.includes('book a')
  )
}

function parseDate(input: string): Date | null {
  const lowered = input.toLowerCase().trim()
  const now = new Date()
  if (lowered === 'today') return now
  if (lowered === 'tomorrow') return new Date(now.getTime() + 86400000)
  const parsed = new Date(input)
  if (!isNaN(parsed.getTime())) return parsed
  return null
}

function parseTime(input: string): { h: number; m: number } | null {
  const match = input.toLowerCase().match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/)
  if (!match) return null
  let h = parseInt(match[1], 10)
  const m = match[2] ? parseInt(match[2], 10) : 0
  const suffix = match[3]
  if (suffix === 'pm' && h < 12) h += 12
  if (suffix === 'am' && h === 12) h = 0
  if (h > 23 || m > 59) return null
  return { h, m }
}

async function setFlow(conversationId: number, state: string, draft: any) {
  await prisma.messengerConversation.update({
    where: { id: conversationId },
    data: { state, draft },
  })
}

async function endFlow(conversationId: number) {
  await prisma.messengerConversation.update({
    where: { id: conversationId },
    data: { state: 'idle', draft: Prisma.JsonNull },
  })
}

type Conversation = {
  id: number
  state: string
  draft: Prisma.JsonValue | null
}

async function handleReservationFlow(conversation: Conversation, text: string): Promise<string> {
  const draft: Record<string, unknown> = (conversation.draft as Record<string, unknown>) ?? {}

  if (/cancel|never ?mind|stop|forget it/i.test(text)) {
    await endFlow(conversation.id)
    await log('reservation_cancelled', `conversation ${conversation.id}`)
    return 'No problem — I cancelled the reservation. Anything else I can help with?'
  }

  switch (conversation.state) {
    case 'awaiting_date': {
      const d = parseDate(text)
      if (!d) return "I didn't catch that date. Try something like 'tomorrow' or 'august 25'."
      draft.dateISO = d.toISOString()
      await setFlow(conversation.id, 'awaiting_time', draft)
      return 'What time would you like the table?'
    }

    case 'awaiting_time': {
      const t = parseTime(text)
      if (!t) return "I didn't catch that time. Try something like '7 pm' or '19:30'."
      const base = new Date(String(draft.dateISO))
      base.setHours(t.h, t.m, 0, 0)
      draft.dateTimeISO = base.toISOString()
      await setFlow(conversation.id, 'awaiting_party', draft)
      return 'How many people will be joining?'
    }

    case 'awaiting_party': {
      const n = parseInt(text, 10)
      if (isNaN(n) || n < 1 || n > 20)
        return 'Party size should be between 1 and 20. How many people?'
      draft.partySize = n
      await setFlow(conversation.id, 'awaiting_name', draft)
      return 'And the name for the reservation?'
    }

    case 'awaiting_name': {
      const name = text.trim()
      if (name.length < 2) return 'Please give me the name for the reservation.'

      const when = new Date(String(draft.dateTimeISO))
      if (when.getTime() < Date.now()) {
        await setFlow(conversation.id, 'awaiting_date', {})
        return 'That time is already in the past. What date would you like instead?'
      }

      const partySize = Number(draft.partySize)
      const store = await prisma.store.findFirst({ orderBy: { id: 'asc' } })
      if (!store) {
        await endFlow(conversation.id)
        return 'Sorry, we have no store configured yet. Please call us directly.'
      }

      await log('reservation_attempt', `${name} / ${when.toISOString()} / ${partySize}`)

      try {
        const reservation = await prisma.reservation.create({
          data: {
            name,
            phone: null,
            partySize,
            date: when,
            status: 'pending',
            storeId: store.id,
          },
        })

        await endFlow(conversation.id)
        await log('reservation_success', `reservation #${reservation.id}`)

        return `Done! Table for ${partySize} at ${store.name} on ${when.toLocaleString()}, under the name ${name}. Your reservation is pending confirmation — we'll hold it for 15 minutes past the slot.`
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') {
          await setFlow(conversation.id, 'awaiting_time', draft)
          return 'That exact slot is already booked under that name. What other time works for you?'
        }
        await endFlow(conversation.id)
        await log('reservation_error', e instanceof Error ? e.message : 'unknown')
        return 'Something went wrong on our side. Please try again or call the store directly.'
      }
    }

    default:
      await endFlow(conversation.id)
      return 'Let me help you with something else. Ask me about hours, the menu, or reservations.'
  }
}

export async function handleMessengerMessage(psid: string, text: string, messageId: string) {
  const conversation = await prisma.messengerConversation.upsert({
    where: { senderPsid: psid },
    create: { senderPsid: psid },
    update: { lastActivityAt: new Date() },
  })

  await prisma.messengerMessage.create({
    data: {
      conversationId: conversation.id,
      direction: 'inbound',
      metaMessageId: messageId,
      text,
    },
  })

  await log('inbound', text.slice(0, 200))

  let reply: string | null = null
  let intent = 'unknown'

  // mid-flow: the state machine owns the conversation
  if (conversation.state !== 'idle') {
    reply = await handleReservationFlow(conversation, text)
    intent = 'reservation_flow'
  }

  // 1. greeting
  if (!reply && text.match(/^(hi|hello|hey|good morning|good evening)/i)) {
    reply =
      'Hello! I am the LUTO assistant. I can help with opening hours, the menu, and reservations. What would you like to know?'
    intent = 'greeting'
  }

  // 2. faq table (admin-managed answers)
  if (!reply) {
    const faq = await findFaq(text)
    if (faq) {
      reply = faq
      intent = 'faq'
    }
  }

  // 3. live data: hours
  if (!reply && text.match(/hour|open|close|time/i)) {
    const hours = await handleHoursQuestion()
    if (hours) {
      reply = hours
      intent = 'hours'
    }
  }

  // 4. live data: menu
  if (!reply && text.match(/menu|food|eat|price|how much/i)) {
    const menu = await handleMenuQuestion(text)
    if (menu) {
      reply = menu
      intent = 'menu'
    }
  }

  // 5. live data: availability
  if (!reply && text.match(/available|stock|have/i)) {
    const avail = await handleAvailabilityQuestion(text)
    if (avail) {
      reply = avail
      intent = 'availability'
    }
  }

  // 6. reservation intent → start the flow
  if (!reply && isReservationIntent(text)) {
    reply = "I can help you reserve a table! What date would you like? (e.g., tomorrow, august 25)"
    await setFlow(conversation.id, 'awaiting_date', {})
    intent = 'reservation_start'
  }

  // 7. fallback → escalate
  if (!reply) {
    reply = "I'm not sure about that. I'll forward your question to the restaurant staff."
    await prisma.messengerConversation.update({
      where: { id: conversation.id },
      data: { status: 'human_required' },
    })
    await log('escalation', psid)
    intent = 'escalation'
  }

  await prisma.messengerMessage.create({
    data: { conversationId: conversation.id, direction: 'outbound', text: reply, intent },
  })
  await log('outbound', reply.slice(0, 200))

  try {
    await sendMessengerText(psid, reply)
  } catch (e) {
    await log('meta_error', e instanceof Error ? e.message : 'unknown send error')
  }
}