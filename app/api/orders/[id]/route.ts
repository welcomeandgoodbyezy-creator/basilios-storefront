import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Not logged in.' }, { status: 401 })
  }

  const { id } = await ctx.params
  const orderId = Number(id)
  if (Number.isNaN(orderId)) {
    return NextResponse.json({ error: 'Bad order id.' }, { status: 400 })
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { orderItems: { include: { product: true } } },
  })

  if (!order || order.userId !== session.userId) {
    return NextResponse.json({ error: 'Order not found.' }, { status: 404 })
  }

  return NextResponse.json({
    order: {
      id: order.id,
      status: order.status,
      total: order.total.toNumber(),
      createdAt: order.createdAt,
      items: order.orderItems.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.price.toNumber(),
      })),
    },
  })
}