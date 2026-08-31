const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const email = 'llagasemmanuelle@gmail.com'
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    console.log('no such user')
    return
  }

  const orders = await prisma.order.findMany({ where: { userId: user.id } })
  for (const o of orders) {
    await prisma.orderItem.deleteMany({ where: { orderId: o.id } })
  }
  await prisma.order.deleteMany({ where: { userId: user.id } })
  await prisma.reservation.deleteMany({ where: { userId: user.id } })
  await prisma.user.delete({ where: { id: user.id } })
  console.log('deleted', email)
}

main().finally(() => prisma.$disconnect())