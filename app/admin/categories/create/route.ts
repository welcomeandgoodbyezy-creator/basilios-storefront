import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(request: Request) {
  await requireAdmin()
  const formData = await request.formData()
  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim()

  if (name) {
    await prisma.category.create({ data: { name, description: description || null } })
  }
  redirect('/admin/categories')
}