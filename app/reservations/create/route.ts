import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function POST(request: Request) {
  const form = await request.formData()
  const name = String(form.get('name') ?? '').trim()
  const phone = String(form.get('phone') ?? '').trim()
  const notes = String(form.get('notes') ?? '').trim()
  const partySize = Number(form.get('partySize'))
  const storeId = Number(form.get('storeId'))
  const date = String(form.get('date') ?? '')
  const time = String(form.get('time') ?? '')

  if (!name || !phone || !date || !time) {
    return NextResponse.json({ error: 'Every required field matters.' }, { status: 400 })
  }
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > 20) {
    return NextResponse.json({ error: 'Party size must be between 1 and 20.' }, { status: 400 })
  }

  const when = new Date(`${date}T${time}:00`)
  if (Number.isNaN(when.getTime()) || when.getTime() < Date.now()) {
    return NextResponse.json({ error: 'Pick a time in the future.' }, { status: 400 })
  }

  const store = await prisma.store.findUnique({ where: { id: storeId } })
  if (!store) {
    return NextResponse.json({ error: 'Pick a store.' }, { status: 400 })
  }

  const session = await getSession()

  const reservation = await prisma.reservation.create({
    data: {
      name,
      phone,
      partySize,
      date: when,
      notes: notes || null,
      storeId,
      userId: session ? session.userId : null,
      status: 'pending',
    },
  })

  return NextResponse.redirect(
    new URL(`/reservations/confirmed?id=${reservation.id}`, request.url),
    303
  )
}