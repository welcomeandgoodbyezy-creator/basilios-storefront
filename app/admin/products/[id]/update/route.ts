import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await ctx.params
  const productId = Number(id)

  const formData = await request.formData()
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const categoryId = parseInt(formData.get('categoryId') as string)
  const image = formData.get('image') as string
  const availability = formData.get('availability') === 'on'

  if (Number.isNaN(productId) || !name || !price || !categoryId) {
    redirect('/admin/products')
  }

  await prisma.product.update({
    where: { id: productId },
    data: {
      name,
      description: description || null,
      price,
      categoryId,
      image: image || null,
      availability,
    },
  })

  redirect('/admin/products')
}