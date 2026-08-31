import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

type RequestedItem = {
  productId: number
  quantity: number
}

export async function POST(request: Request) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'You must be logged in to place an order.' }, { status: 401 })
  }

  const body = await request.json().catch(() => null)
  const rawItems = body && Array.isArray(body.items) ? body.items : []

  if (rawItems.length === 0) {
    return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 })
  }

  const requested: RequestedItem[] = rawItems
    .map((i: { productId?: unknown; quantity?: unknown }) => ({
      productId: Number(i?.productId),
      quantity: Math.floor(Number(i?.quantity)),
    }))
    .filter(
      (i: RequestedItem) =>
        Number.isInteger(i.productId) &&
        i.productId > 0 &&
        Number.isInteger(i.quantity) &&
        i.quantity > 0 &&
        i.quantity <= 99
    )

  if (requested.length === 0) {
    return NextResponse.json({ error: 'No valid items in the request.' }, { status: 400 })
  }

  const products = await prisma.product.findMany({
    where: { id: { in: requested.map((r) => r.productId) }, availability: true },
  })
  const productMap = new Map(products.map((p) => [p.id, p]))

  for (const r of requested) {
    if (!productMap.has(r.productId)) {
      return NextResponse.json({ error: 'One of the items is no longer available.' }, { status: 409 })
    }
  }

  let total = 0
  for (const r of requested) {
    const p = productMap.get(r.productId)!
    total += p.price.toNumber() * r.quantity
  }
  total = Math.round(total * 100) / 100

  const order = await prisma.$transaction((tx) =>
    tx.order.create({
      data: {
        userId: session.userId,
        status: 'pending',
        total,
        orderItems: {
          create: requested.map((r) => {
            const p = productMap.get(r.productId)!
            return { productId: r.productId, quantity: r.quantity, price: p.price }
          }),
        },
      },
      include: { orderItems: true },
    })
  )

  return NextResponse.json({ ok: true, orderId: order.id }, { status: 201 })
}