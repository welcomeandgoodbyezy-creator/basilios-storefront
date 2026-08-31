import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(request: Request) {
  await requireAdmin()
  const form = await request.formData()
  const question = String(form.get('question') ?? '').trim()
  const answer = String(form.get('answer') ?? '').trim()
  const category = String(form.get('category') ?? '').trim() || 'general'
  const keywords = String(form.get('keywords') ?? '')
    .split(',')
    .map((k) => k.trim().toLowerCase())
    .filter(Boolean)

  if (!question || !answer) {
    return NextResponse.json({ error: 'Question and answer are required.' }, { status: 400 })
  }

  await prisma.faqEntry.create({ data: { question, answer, category, keywords } })
  return NextResponse.redirect(new URL('/admin/messenger/faq', request.url), 303)
}