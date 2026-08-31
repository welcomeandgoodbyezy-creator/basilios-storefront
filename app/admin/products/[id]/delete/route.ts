import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await ctx.params
  const productId = Number(id)

  if (!Number.isNaN(productId)) {
    // order items reference products — clear those rows first or postgres refuses
    await prisma.orderItem.deleteMany({ where: { productId } })
    await prisma.product.delete({ where: { id: productId } })
  }

  redirect('/admin/products')
}