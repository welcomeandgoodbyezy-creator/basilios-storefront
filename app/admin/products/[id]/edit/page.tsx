import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditProductPage({ params }: Props) {
  await requireAdmin()
  const { id } = await params
  const productId = Number(id)

  const product = Number.isNaN(productId)
    ? null
    : await prisma.product.findUnique({ where: { id: productId } })

  if (!product) notFound()

  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="text-brand-cream/60 hover:text-brand-amber">
          ← Back
        </Link>
        <h1 className="text-4xl font-bold text-brand-cream">Edit: {product.name}</h1>
      </div>

      <form
        action={`/admin/products/${product.id}/update`}
        method="POST"
        className="bg-brand-light rounded-2xl border border-white/10 p-8 space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-brand-cream mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            defaultValue={product.name}
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
            defaultValue={product.description ?? ''}
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
            defaultValue={product.price.toString()}
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
            defaultValue={String(product.categoryId)}
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
            defaultValue={product.image ?? ''}
            className="w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-3 text-brand-cream outline-none focus:border-brand-amber"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="availability"
            name="availability"
            type="checkbox"
            defaultChecked={product.availability}
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
          Save Changes
        </button>
      </form>
    </div>
  )
}