import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

const ALLOWED = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  await requireAdmin()

  const { id } = await ctx.params
  const orderId = Number(id)
  if (!Number.isInteger(orderId)) {
    return NextResponse.json({ error: 'Bad order id.' }, { status: 400 })
  }

  const form = await request.formData()
  const status = String(form.get('status') ?? '')
  if (!ALLOWED.includes(status)) {
    return NextResponse.json({ error: 'Bad status.' }, { status: 400 })
  }

  await prisma.order.update({ where: { id: orderId }, data: { status } })
  return NextResponse.redirect(new URL('/admin/orders', request.url), 303)
}