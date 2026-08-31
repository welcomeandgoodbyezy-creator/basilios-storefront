const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.update({
    where: { email: 'zakkai8888s@gmail.com' },
    data: { role: 'admin' },
  })
  console.log('promoted:', user.email, '->', user.role)
}

main().finally(() => prisma.$disconnect())