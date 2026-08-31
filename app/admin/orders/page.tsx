import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

const STATUSES = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled']

export default async function AdminOrdersPage() {
  await requireAdmin()

  const orders = await prisma.order.findMany({
    include: {
      user: true,
      orderItems: { include: { product: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-cream mb-8">Orders</h1>

      <div className="space-y-6">
        {orders.map((o) => (
          <div key={o.id} className="bg-brand-light rounded-2xl border border-white/10 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xl font-bold text-brand-cream">Order #{o.id}</p>
                <p className="text-brand-cream/60 text-sm mt-1">
                  {o.user.name} · {o.user.email}
                </p>
                <p className="text-brand-cream/50 text-xs mt-1">
                  {new Date(o.createdAt).toLocaleString()}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  o.status === 'completed'
                    ? 'bg-green-900/50 text-green-300'
                    : o.status === 'cancelled'
                      ? 'bg-red-900/50 text-red-300'
                      : 'bg-brand-amber/15 text-brand-amber'
                }`}
              >
                {o.status}
              </span>
            </div>

            <div className="border-t border-white/10 pt-4 mb-4">
              {o.orderItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm text-brand-cream/80 py-1">
                  <span>
                    {item.quantity}× {item.product.name}
                  </span>
                  <span>${(Number(item.price) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold text-brand-cream pt-2 border-t border-white/10 mt-2">
                <span>Total</span>
                <span>${Number(o.total).toFixed(2)}</span>
              </div>
            </div>

            <form action={`/admin/orders/${o.id}/update`} method="POST" className="flex gap-2">
              <select
                name="status"
                defaultValue={o.status}
                className="flex-1 bg-brand-dark border border-white/10 rounded-lg px-4 py-2 text-brand-cream"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-brand-amber text-brand-dark px-6 py-2 rounded-lg font-bold hover:bg-amber-500"
              >
                Update
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}