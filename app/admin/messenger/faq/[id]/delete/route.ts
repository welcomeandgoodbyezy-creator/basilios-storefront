import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await ctx.params
  await prisma.faqEntry.deleteMany({ where: { id: Number(id) } })
  return NextResponse.redirect(new URL('/admin/messenger/faq', request.url), 303)
}