import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ user: null })

  const user = await prisma.user.findUnique({ where: { id: session.userId } })
  if (!user) return NextResponse.json({ user: null })

  return NextResponse.json({
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  })
}
