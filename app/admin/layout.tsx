import Link from 'next/link'
import { requireAdmin } from '@/lib/adminAuth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAdmin()

  return (
    <div className="min-h-screen bg-brand-dark flex">
      <aside className="w-64 bg-brand-light border-r border-white/10 p-6">
        <Link href="/" className="text-2xl font-bold text-brand-amber mb-8 block">
          LUTO Admin
        </Link>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className="block px-4 py-2 rounded-lg text-brand-cream hover:bg-brand-dark hover:text-brand-amber transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="block px-4 py-2 rounded-lg text-brand-cream hover:bg-brand-dark hover:text-brand-amber transition-colors"
          >
            Products
          </Link>
          <Link
            href="/admin/categories"
            className="block px-4 py-2 rounded-lg text-brand-cream hover:bg-brand-dark hover:text-brand-amber transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/admin/orders"
            className="block px-4 py-2 rounded-lg text-brand-cream hover:bg-brand-dark hover:text-brand-amber transition-colors"
          >
            Orders
          </Link>
          <Link
            href="/admin/reservations"
            className="block px-4 py-2 rounded-lg text-brand-cream hover:bg-brand-dark hover:text-brand-amber transition-colors"
          >
            Reservations
          </Link>
          <Link
            href="/admin/customers"
            className="block px-4 py-2 rounded-lg text-brand-cream hover:bg-brand-dark hover:text-brand-amber transition-colors"
          >
            Customers
          </Link>
          <Link
            href="/admin/messenger"
            className="block px-4 py-2 rounded-lg text-brand-cream hover:bg-brand-dark hover:text-brand-amber transition-colors"
          >
            Messenger
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}