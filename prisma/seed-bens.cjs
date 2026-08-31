const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const menu = [
  {
    name: 'Rice Meal',
    description: 'Served with garlic rice and your choice of sauce.',
    dishes: [
      ['BBQ Ribs', 258, 'bbq-ribs', 'Smoky grilled ribs, garlic rice, house sauce.'],
      ['Chicken BBQ', 202, 'chicken-bbq', 'Charred chicken quarter, garlic rice, sauce.'],
      ['Beef Tapa', 146, 'beef-tapa', 'Cured beef, garlic rice, tomato salsa.'],
      ['Adobo', 146, 'adobo', 'Classic chicken adobo, garlic rice, egg.'],
      ['Braised Beef', 146, 'braised-beef', 'Slow-braised beef, garlic rice, scallion.'],
      ['Tocino', 146, 'tocino', 'Sweet cured pork, garlic rice, atchara.'],
      ['Longganisa', 146, 'longganisa', 'Garlic sausage, garlic rice, tomato.'],
      ['Hotdog', 124, 'hotdog', 'Grilled hotdog, garlic rice, banana ketchup.'],
    ],
  },
  {
    name: 'Coolers',
    description: "Laguna's creamiest halo-halo and friends.",
    dishes: [
      ['Original Halo-Halo', 146, 'original-halo-halo', 'Shaved ice, leche, sweet beans, ube.'],
      ['Salty Summer Halo-Halo', 146, 'salty-summer', 'New! Salted cream, mango, cheese halo-halo.'],
      ['Macapuno Con Yelo', 157, 'macapuno-con-yelo', 'Macapuno, milk, shaved ice.'],
      ['Mais Con Yelo', 135, 'mais-con-yelo', 'Sweet corn, milk, shaved ice.'],
      ['Spicy Winter Halo-Halo', 146, 'spicy-winter', 'New! Chili-kissed pineapple halo-halo.'],
      ['Banana Con Yelo', 146, 'banana-con-yelo', 'Caramel banana, milk, shaved ice.'],
      ['Langka Con Yelo', 146, 'langka-con-yelo', 'Jackfruit, milk, shaved ice.'],
      ['Ube Con Yelo', 146, 'ube-con-yelo', 'New! Ube, milk, shaved ice.'],
      ['Ube Macapuno', 146, 'ube-macapuno', 'New! Ube and macapuno, creamiest leche.'],
    ],
  },
  {
    name: 'Pasta',
    description: 'Comfort plates and noodle bowls.',
    dishes: [
      ['Classic Spaghetti', 135, 'classic-spaghetti', 'Sweet-style filipino spaghetti, cheese.'],
      ['Spicy Chicken Pasta', 157, 'spicy-chicken-pasta', 'Chicken, spicy tomato cream.'],
      ['Tuna Pasta', 157, 'tuna-pasta', 'Tuna in creamy sauce, cheese.'],
      ['Bacon Broccoli in White Sauce', 157, 'bacon-broccoli', 'Bacon, broccoli, white sauce, cheese.'],
      ['Pancit Canton (Small)', 237, 'pancit-canton', 'Stir-fried noodles, chicken, veggies.'],
      ['Pancit Canton (Large)', 892, 'pancit-canton', 'Party-size stir-fried noodles.'],
      ['Chinese Chicken Lomi', 168, 'chinese-chicken-lomi', 'New! Thick noodle soup, chicken.'],
      ['Chinese Beef Lomi', 168, 'chinese-beef-lomi', 'New! Thick noodle soup, beef.'],
    ],
  },
  {
    name: 'Snack & Sandwiches',
    description: 'Pulutan and merienda bites.',
    dishes: [
      ['Beef Nachos', 258, 'beef-nachos', 'Chips, beef, cheese, fresh salsa, dips.'],
      ['Chicharap', 90, 'chicharap', 'Crispy pork cracklings, spiced vinegar.'],
      ['Crispy Chicken Fillet Sandwich', 124, 'crispy-chicken-sandwich', 'Fried chicken, lettuce, mayo, milk bread.'],
      ['Tuna Sandwich', 146, 'tuna-sandwich', 'Tuna salad, lettuce, milk bread.'],
      ['Fries', 90, 'fries', 'Cheese, plain, sour cream or bbq.'],
    ],
  },
  {
    name: 'Beverages',
    description: 'Cold drinks to finish.',
    dishes: [
      ['Houseblend', 79, 'beverages', 'Signature cold houseblend.'],
      ['Cucumber Lemonade', 79, 'beverages', 'Cool cucumber, fresh lemon.'],
      ['Orange Juice', 79, 'beverages', 'Fresh-squeezed orange.'],
    ],
  },
]

async function main() {
  // let go of anything gripping the old products (test orders)
  await prisma.orderItem.deleteMany().catch(() => {})
  await prisma.order.deleteMany().catch(() => {})
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  for (const cat of menu) {
    await prisma.category.create({
      data: {
        name: cat.name,
        description: cat.description,
        products: {
          create: cat.dishes.map(([name, price, img, description]) => ({
            name,
            price,
            description,
            image: `/art/dishes/${img}.jpg`,
          })),
        },
      },
    })
  }
  console.log('seeded', menu.reduce((n, c) => n + c.dishes.length, 0), 'dishes')
}

main().finally(() => prisma.$disconnect())