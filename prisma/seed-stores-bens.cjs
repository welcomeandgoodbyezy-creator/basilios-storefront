const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.reservation.deleteMany()
  await prisma.store.deleteMany()
  await prisma.store.createMany({
    data: [
      {
        name: "Ben's Halo-Halo — Poblacion",
        address: 'Calle Niña, Poblacion, San Juan, Batangas',
        phone: '043-555-0101',
        openingHours: '10:00 - 22:00',
        latitude: 13.8267,
        longitude: 121.3967,
      },
      {
        name: "Ben's Halo-Halo — Laiya",
        address: 'Laiya Beach Rd, San Juan, Batangas',
        phone: '043-555-0102',
        openingHours: '9:00 - 21:00',
        latitude: 13.6634,
        longitude: 121.4376,
      },
    ],
  })
  console.log('stores seeded - san juan, batangas')
}

main().finally(() => prisma.$disconnect())