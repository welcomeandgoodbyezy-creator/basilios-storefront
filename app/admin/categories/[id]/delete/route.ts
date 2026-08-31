import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const id = Number((await ctx.params).id)

  const productCount = await prisma.product.count({ where: { categoryId: id } })
  if (productCount > 0) {
    redirect('/admin/categories?error=has-products')
  }

  await prisma.category.delete({ where: { id } })
  redirect('/admin/categories')
}