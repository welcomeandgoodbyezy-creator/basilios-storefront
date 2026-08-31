import { beforeAll, afterAll, beforeEach } from 'vitest'
import { prisma } from '@/lib/prisma'

beforeAll(async () => {
  // wipe messenger tables before the suite
  await prisma.messengerMessage.deleteMany()
  await prisma.messengerConversation.deleteMany()
  await prisma.botEventLog.deleteMany()
  await prisma.faqEntry.deleteMany()
})

beforeEach(async () => {
  // clean slate per test
  await prisma.messengerMessage.deleteMany()
  await prisma.messengerConversation.deleteMany()
  await prisma.botEventLog.deleteMany()
})

afterAll(async () => {
  await prisma.$disconnect()
})