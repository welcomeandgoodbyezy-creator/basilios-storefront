import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export async function POST(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const session = await requireAdmin()
  const { id } = await ctx.params
  const userId = Number(id)

  if (userId === session.userId) redirect('/admin/users')

  const role = (await request.formData()).get('role') as string
  if (role === 'customer' || role === 'admin') {
    await prisma.user.update({ where: { id: userId }, data: { role } })
  }
  redirect('/admin/users')
}