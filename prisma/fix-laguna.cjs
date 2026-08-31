const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const cats = await prisma.category.findMany()
  for (const c of cats) {
    if ((c.description || '').includes('Laguna')) {
      await prisma.category.update({
        where: { id: c.id },
        data: { description: c.description.replace('Laguna', "Batangas") },
      })
      console.log('fixed:', c.name)
    }
  }
}

main().finally(() => prisma.$disconnect())