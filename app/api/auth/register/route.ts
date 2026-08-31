import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, createSessionToken, SESSION_COOKIE } from '@/lib/auth'

export async function POST(request: Request) {
  const body = await request.json()
  const name = typeof body.name === 'string' ? body.name.trim() : ''
  const phone = String(body?.phone ?? '').trim()
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''
  

  if (!name || !email || password.length < 8) {
    return NextResponse.json(
      { error: 'Name, email, and a password of at least 8 characters are required.' },
      { status: 400 }
    )
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'That email does not look right.' }, { status: 400 })
  }

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return NextResponse.json(
      { error: 'An account with this email already exists.' },
      { status: 409 }
    )
  }

    const user = await prisma.user.create({
    data: { name, email, phone: phone || null, passwordHash: await hashPassword(password) },
  })

  const token = await createSessionToken(user.id, user.role)
  const response = NextResponse.json(
    { ok: true, user: { id: user.id, name: user.name, email: user.email } },
    { status: 201 }
  )
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}