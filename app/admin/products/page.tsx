import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import DeleteProductForm from '@/components/DeleteProductForm'

export const dynamic = 'force-dynamic'

export default async function AdminProducts() {
  await requireAdmin()

  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { name: 'asc' },
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-brand-cream">Products</h1>
        <Link
          href="/admin/products/new"
          className="bg-brand-amber text-brand-dark px-6 py-2 rounded-full font-semibold hover:bg-amber-500 transition-colors"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-brand-light rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-dark/50">
            <tr className="text-left text-sm text-brand-cream/60">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Available</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 text-brand-cream">{product.name}</td>
                <td className="px-6 py-4 text-brand-cream/60">{product.category.name}</td>
                <td className="px-6 py-4 text-brand-amber font-semibold">${product.price.toString()}</td>
                <td className="px-6 py-4">
                  {product.availability ? (
                    <span className="text-green-400">Yes</span>
                  ) : (
                    <span className="text-red-400">No</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-brand-amber hover:underline mr-4"
                  >
                    Edit
                  </Link>
                 <DeleteProductForm productId={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && (
          <p className="text-brand-cream/50 text-center py-12">No products yet.</p>
        )}
      </div>
    </div>
  )
}