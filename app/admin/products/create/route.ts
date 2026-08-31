import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(request: Request) {
  await requireAdmin()

  const formData = await request.formData()
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const price = parseFloat(formData.get('price') as string)
  const categoryId = parseInt(formData.get('categoryId') as string)
  const image = formData.get('image') as string
  const availability = formData.get('availability') === 'on'

  if (!name || !price || !categoryId) {
    return NextResponse.json({ error: 'Name, price, and category are required.' }, { status: 400 })
  }

  await prisma.product.create({
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