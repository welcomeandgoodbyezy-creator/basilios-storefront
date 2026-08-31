import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const images: Record<string, string> = {
  'Smoky Luto Stack': '/images/smoky-luto-stack.jpg',
  'Crispy Chicken Fold': '/images/crispy-chicken-fold.jpg',
  'Ember Beef Bowl': '/images/ember-beef-bowl.jpg',
  'Garlic Butter Rice Bowl': '/images/garlic-butter-rice-bowl.jpg',
  'Crackling Fries': '/images/crackling-fries.jpg',
  'Charred Corn Cups': '/images/charred-corn-cups.jpg',
  'Ube Shake': '/images/ube-shake.jpg',
  'Calamansi Cooler': '/images/calamansi-cooler.jpg',
}

async function main() {
  for (const [name, image] of Object.entries(images)) {
    await prisma.product.updateMany({ where: { name }, data: { image } })
  }
  console.log('images attached to products')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())