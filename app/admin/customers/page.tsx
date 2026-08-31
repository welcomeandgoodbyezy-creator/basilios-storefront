import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export default async function AdminCustomersPage() {
  await requireAdmin()

  const customers = await prisma.user.findMany({
    where: { role: 'customer' },
    include: { orders: true, reservations: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-cream mb-8">Customers</h1>

      <div className="bg-brand-light rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-dark border-b border-white/10">
            <tr>
              <th className="text-left px-6 py-4 text-brand-cream/60 text-sm font-semibold">Name</th>
              <th className="text-left px-6 py-4 text-brand-cream/60 text-sm font-semibold">Email</th>
              <th className="text-left px-6 py-4 text-brand-cream/60 text-sm font-semibold">Orders</th>
              <th className="text-left px-6 py-4 text-brand-cream/60 text-sm font-semibold">Reservations</th>
              <th className="text-left px-6 py-4 text-brand-cream/60 text-sm font-semibold">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-white/5 hover:bg-brand-dark/50">
                <td className="px-6 py-4 text-brand-cream">{c.name}</td>
                <td className="px-6 py-4 text-brand-cream/70 text-sm">{c.email}</td>
                <td className="px-6 py-4 text-brand-cream/70">{c.orders.length}</td>
                <td className="px-6 py-4 text-brand-cream/70">{c.reservations.length}</td>
                <td className="px-6 py-4 text-brand-cream/50 text-sm">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}