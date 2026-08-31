import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const img = (text: string) =>
  `https://placehold.co/600x400/1a1a1a/d48c00?text=${encodeURIComponent(text)}`

async function main() {
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  await prisma.category.create({
    data: {
      name: 'Burgers',
      description: 'Flame-grilled, never frozen.',
      products: {
        create: [
          { name: 'Smoky Luto Stack', description: 'Double beef, charred onion, smoked paprika aioli.', price: 8.95, image: img('Smoky Luto Stack') },
          { name: 'Crispy Chicken Fold', description: 'Buttermilk-crisped chicken, pickles, honey-hot sauce.', price: 7.5, image: img('Crispy Chicken Fold') },
        ],
      },
    },
  })

  await prisma.category.create({
    data: {
      name: 'Bowls',
      description: 'One bowl, no regrets.',
      products: {
        create: [
          { name: 'Garlic Butter Rice Bowl', description: 'Steamed rice, garlic butter, grilled chicken, scallion.', price: 6.95, image: img('Garlic Butter Rice Bowl') },
          { name: 'Ember Beef Bowl', description: 'Seared beef, roasted corn, chipotle crema.', price: 8.25, image: img('Ember Beef Bowl') },
        ],
      },
    },
  })

  await prisma.category.create({
    data: {
      name: 'Sides',
      description: 'The supporting cast that steals the show.',
      products: {
        create: [
          { name: 'Crackling Fries', description: 'Double-fried, sea salt, vinegar dust.', price: 3.25, image: img('Crackling Fries') },
          { name: 'Charred Corn Cups', description: 'Street corn, lime, cotija.', price: 3.75, image: img('Charred Corn Cups') },
        ],
      },
    },
  })

  await prisma.category.create({
    data: {
      name: 'Drinks',
      description: 'Cold enough to fog the cup.',
      products: {
        create: [
          { name: 'Calamansi Cooler', description: 'Filipino lime, cane sugar, crushed ice.', price: 2.95, image: img('Calamansi Cooler') },
          { name: 'Ube Shake', description: 'Purple yam, vanilla, cream.', price: 4.5, image: img('Ube Shake') },
        ],
      },
    },
  })

  console.log('seeded: 4 categories, 8 products')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())