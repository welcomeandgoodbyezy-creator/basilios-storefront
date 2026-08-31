import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

const ALLOWED = ['pending', 'confirmed', 'cancelled']

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  await requireAdmin()

  const { id } = await ctx.params
  const reservationId = Number(id)
  if (!Number.isInteger(reservationId)) {
    return NextResponse.json({ error: 'Bad reservation id.' }, { status: 400 })
  }

  const form = await request.formData()
  const status = String(form.get('status') ?? '')
  if (!ALLOWED.includes(status)) {
    return NextResponse.json({ error: 'Bad status.' }, { status: 400 })
  }

  await prisma.reservation.update({ where: { id: reservationId }, data: { status } })
  return NextResponse.redirect(new URL('/admin/reservations', request.url), 303)
}