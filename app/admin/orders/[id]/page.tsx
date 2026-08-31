import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

const STATUSES = ['pending', 'preparing', 'ready', 'delivered', 'cancelled']

export default async function AdminOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params

  const order = await prisma.order.findUnique({
    where: { id: Number(id) },
    include: {
      user: { select: { name: true, email: true } },
      orderItems: { include: { product: true } },
    },
  })
  if (!order) notFound()

  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/orders" className="text-brand-cream/60 hover:text-brand-amber">
          ← Back
        </Link>
        <h1 className="text-4xl font-bold text-brand-cream">Order #{order.id}</h1>
      </div>

      <div className="bg-brand-light rounded-2xl border border-white/10 p-6 mb-6">
        <p className="text-brand-cream">
          {order.user.name} <span className="text-brand-cream/50">({order.user.email})</span>
        </p>
        <p className="text-brand-cream/60 text-sm mt-1">
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      <ul className="space-y-3 mb-6">
        {order.orderItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between bg-brand-light rounded-xl p-4 border border-white/10"
          >
            <span className="text-brand-cream">
              {item.quantity} × {item.product.name}
            </span>
            <span className="text-brand-cream/70">
              ${(item.price.toNumber() * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex justify-between text-lg mb-8 bg-brand-light rounded-xl p-4 border border-white/10">
        <span className="text-brand-cream/70">Total</span>
        <span className="font-bold text-brand-cream">${order.total.toNumber().toFixed(2)}</span>
      </div>

      <form
        action={`/admin/orders/${order.id}/update`}
        method="POST"
        className="bg-brand-light rounded-2xl border border-white/10 p-6 flex gap-4 items-end"
      >
        <div className="flex-1">
          <label htmlFor="status" className="block text-sm font-semibold text-brand-cream mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={order.status}
            className="w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-3 text-brand-cream outline-none focus:border-brand-amber"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-brand-amber text-brand-dark px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition-colors"
        >
          Update
        </button>
      </form>
    </div>
  )
}