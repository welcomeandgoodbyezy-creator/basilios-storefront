
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import ConfirmDeleteForm from '@/components/ConfirmDeleteForm'

export const dynamic = 'force-dynamic'

export default async function AdminCategories({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  await requireAdmin()
  const params = await searchParams

  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <h1 className="text-4xl font-bold text-brand-cream mb-8">Categories</h1>

      {params.error === 'has-products' && (
        <p className="bg-red-900/40 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 mb-6 text-sm">
          That category still has products. Move or delete them first.
        </p>
      )}

      <form
        action="/admin/categories/create"
        method="POST"
        className="bg-brand-light rounded-2xl border border-white/10 p-6 mb-8 grid grid-cols-1 md:grid-cols-[1fr_2fr_auto] gap-4 items-end"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brand-cream mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-3 text-brand-cream outline-none focus:border-brand-amber"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-brand-cream mb-2">
            Description
          </label>
          <input
            id="description"
            name="description"
            className="w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-3 text-brand-cream outline-none focus:border-brand-amber"
          />
        </div>
        <button
          type="submit"
          className="bg-brand-amber text-brand-dark px-6 py-3 rounded-full font-semibold hover:bg-amber-500 transition-colors"
        >
          Add
        </button>
      </form>

      <div className="bg-brand-light rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-dark/50">
            <tr className="text-left text-sm text-brand-cream/60">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Products</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td className="px-6 py-4 text-brand-cream">{cat.name}</td>
                <td className="px-6 py-4 text-brand-cream/60">{cat.description ?? ''}</td>
                <td className="px-6 py-4 text-brand-cream/60">{cat._count.products}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/categories/${cat.id}/edit`}
                    className="text-brand-amber hover:underline mr-4"
                  >
                    Edit
                  </Link>
                  <ConfirmDeleteForm action={`/admin/categories/${cat.id}/delete`} label="category" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}