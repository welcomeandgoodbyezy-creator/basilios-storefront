import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, createSessionToken, SESSION_COOKIE } from '@/lib/auth'

export async function POST(request: Request) {
  const body = await request.json()
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
  const password = typeof body.password === 'string' ? body.password : ''

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Wrong email or password.' }, { status: 401 })
  }

  const token = await createSessionToken(user.id, user.role)
  const response = NextResponse.json({
    ok: true,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return response
}