import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await ctx.params
  const formData = await request.formData()
  const name = (formData.get('name') as string)?.trim()
  const description = (formData.get('description') as string)?.trim()

  if (name) {
    await prisma.category.update({
      where: { id: Number(id) },
      data: { name, description: description || null },
    })
  }
  redirect('/admin/categories')
}