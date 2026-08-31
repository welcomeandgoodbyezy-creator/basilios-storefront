import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdmin()
  const { id } = await params
  const category = await prisma.category.findUnique({ where: { id: Number(id) } })
  if (!category) notFound()

  return (
    <div className="max-w-xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/categories" className="text-brand-cream/60 hover:text-brand-amber">
          ← Back
        </Link>
        <h1 className="text-4xl font-bold text-brand-cream">Edit: {category.name}</h1>
      </div>

      <form
        action={`/admin/categories/${category.id}/update`}
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
            defaultValue={category.name}
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
            defaultValue={category.description ?? ''}
            className="w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-3 text-brand-cream outline-none focus:border-brand-amber"
          />
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