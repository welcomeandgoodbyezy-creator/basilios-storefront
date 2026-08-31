import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export default async function NewProductPage() {
  await requireAdmin()

  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="text-brand-cream/60 hover:text-brand-amber">
          ← Back
        </Link>
        <h1 className="text-4xl font-bold text-brand-cream">New Product</h1>
      </div>

      <form action="/admin/products/create" method="POST" className="bg-brand-light rounded-2xl border border-white/10 p-8 space-y-6">
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
          <textarea
            id="description"
            name="description"
            rows={3}
            className="w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-3 text-brand-cream outline-none focus:border-brand-amber"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-brand-cream mb-2">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            required
            className="w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-3 text-brand-cream outline-none focus:border-brand-amber"
          />
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-semibold text-brand-cream mb-2">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            required
            className="w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-3 text-brand-cream outline-none focus:border-brand-amber"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-semibold text-brand-cream mb-2">
            Image URL
          </label>
          <input
            id="image"
            name="image"
            type="url"
            placeholder="https://..."
            className="w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-3 text-brand-cream outline-none focus:border-brand-amber"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="availability"
            name="availability"
            type="checkbox"
            defaultChecked
            className="w-5 h-5 rounded"
          />
          <label htmlFor="availability" className="text-sm font-semibold text-brand-cream">
            Available
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-amber text-brand-dark py-3 rounded-full font-bold hover:bg-amber-500 transition-colors"
        >
          Create Product
        </button>
      </form>
    </div>
  )
}