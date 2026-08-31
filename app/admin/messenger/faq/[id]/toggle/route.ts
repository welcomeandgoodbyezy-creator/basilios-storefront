import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await ctx.params
  const faq = await prisma.faqEntry.findUnique({ where: { id: Number(id) } })
  if (!faq) return NextResponse.json({ error: 'Not found.' }, { status: 404 })

  await prisma.faqEntry.update({ where: { id: faq.id }, data: { enabled: !faq.enabled } })
  return NextResponse.redirect(new URL('/admin/messenger/faq', request.url), 303)
}