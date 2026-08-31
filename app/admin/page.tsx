import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  await requireAdmin()

  const [productCount, orderCount, userCount, pendingOrders] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
    prisma.order.count({ where: { status: 'pending' } }),
  ])

  return (
    <div>
      <h1 className="text-4xl font-bold text-brand-cream mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-brand-light rounded-2xl border border-white/10 p-6">
          <p className="text-brand-cream/60 text-sm">Total Products</p>
          <p className="text-3xl font-bold text-brand-amber mt-2">{productCount}</p>
        </div>
        <div className="bg-brand-light rounded-2xl border border-white/10 p-6">
          <p className="text-brand-cream/60 text-sm">Total Orders</p>
          <p className="text-3xl font-bold text-brand-amber mt-2">{orderCount}</p>
        </div>
        <div className="bg-brand-light rounded-2xl border border-white/10 p-6">
          <p className="text-brand-cream/60 text-sm">Pending Orders</p>
          <p className="text-3xl font-bold text-brand-amber mt-2">{pendingOrders}</p>
        </div>
        <div className="bg-brand-light rounded-2xl border border-white/10 p-6">
          <p className="text-brand-cream/60 text-sm">Total Users</p>
          <p className="text-3xl font-bold text-brand-amber mt-2">{userCount}</p>
        </div>
      </div>
    </div>
  )
}