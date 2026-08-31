import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.store.deleteMany()

  await prisma.store.createMany({
    data: [
      {
        name: 'LUTO Downtown',
        address: '18 Flame St, Downtown',
        latitude: 40.7128,
        longitude: -74.006,
        phone: '555-0101',
        openingHours: '10:00 - 22:00',
      },
      {
        name: 'LUTO Midtown',
        address: '220 Ember Ave, Midtown',
        latitude: 40.7549,
        longitude: -73.984,
        phone: '555-0102',
        openingHours: '10:00 - 23:00',
      },
      {
        name: 'LUTO Brooklyn',
        address: '7 Charcoal Rd, Brooklyn',
        latitude: 40.6782,
        longitude: -73.9442,
        phone: '555-0103',
        openingHours: '11:00 - 22:00',
      },
    ],
  })

  console.log('seeded: 3 stores')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())