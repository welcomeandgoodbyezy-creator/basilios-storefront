import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import ProductImage from '@/components/ProductImage'
import AddAndGo from '@/components/AddAndGo'

export const dynamic = 'force-dynamic'

function Frond({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden>
      <g fill="#3f8f46">
        <path d="M10 190 Q60 120 40 40 Q90 110 60 190 Z" opacity="0.9" />
        <path d="M40 190 Q100 130 110 30 Q140 120 80 190 Z" opacity="0.75" />
        <path d="M80 190 Q150 140 180 60 Q180 150 120 190 Z" opacity="0.6" />
      </g>
    </svg>
  )
}

function Cloud({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 200 80" className={className} aria-hidden>
      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="60" cy="55" rx="55" ry="22" />
        <ellipse cx="110" cy="40" rx="45" ry="26" />
        <ellipse cx="150" cy="55" rx="45" ry="20" />
      </g>
    </svg>
  )
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: { category: true },
  })

  if (!product) notFound()

  let related = await prisma.product.findMany({
    where: { categoryId: product.categoryId, NOT: { id: product.id } },
    take: 3,
  })
  if (related.length < 3) {
    const more = await prisma.product.findMany({
      where: { NOT: { id: product.id }, categoryId: { not: product.categoryId } },
      take: 3 - related.length,
    })
    related = [...related, ...more]
  }

  const isNew = product.description?.startsWith('New!')
  const desc = isNew ? product.description!.replace(/^New!\s*/, '') : product.description

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffefb8] via-sky to-sky relative overflow-hidden">
      <Cloud className="absolute top-16 right-10 w-44 opacity-80" />
      <Frond className="absolute -top-8 -left-10 w-44 -rotate-12 opacity-80" />
      <Frond className="absolute top-40 -right-10 w-44 rotate-90 opacity-60" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 relative">
        <Link href="/menu" className="font-hand text-berry text-2xl hover:underline">
          ← back to the menu
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mt-8 items-start">
          {/* photo, taped to the page */}
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="relative bg-white rounded-2xl p-3 pb-14 shadow-2xl shadow-cocoa/25 rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="absolute -top-3 left-10 w-24 h-7 bg-sun/70 -rotate-6 rounded-sm shadow-sm" />
              <div className="absolute -top-3 right-10 w-24 h-7 bg-sun/70 rotate-6 rounded-sm shadow-sm" />
              <div className="aspect-square rounded-xl overflow-hidden">
                <ProductImage src={product.image} name={product.name} />
              </div>
              <p className="font-hand text-berry text-2xl text-center absolute bottom-4 left-0 right-0 -rotate-2">
                {product.category.name.toLowerCase()}, served fresh
              </p>
              {isNew && (
                <span className="absolute -top-5 -right-3 bg-sun text-berry font-display text-lg px-4 py-1.5 rounded-full border-2 border-berry rotate-6 shadow-md">
                  New!
                </span>
              )}
            </div>
          </div>

          {/* the pitch */}
          <div>
            <p className="inline-block bg-berry text-cream rounded-full px-4 py-1 text-xs font-extrabold tracking-widest uppercase mb-4">
              {product.category.name}
            </p>
            <h1 className="font-display text-poster text-5xl md:text-6xl uppercase leading-none mb-5">
              {product.name}
            </h1>
            <p className="text-cocoa-soft text-lg leading-relaxed mb-8 max-w-md">
              {desc ?? 'No description available.'}
            </p>

            <div className="bg-cream rounded-2xl border-2 border-sun/70 p-6 mb-5 shadow-lg shadow-cocoa/10 max-w-md">
              <p className="font-hand text-5xl text-sun-deep mb-4">₱{Number(product.price)}</p>
              <AddAndGo product={product} />
            </div>

            {product.availability ? (
              <p className="text-leaf text-sm font-extrabold">✓ available now</p>
            ) : (
              <p className="text-berry text-sm font-extrabold">✗ back soon</p>
            )}
          </div>
        </div>

        {/* complete the meal */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-script text-3xl md:text-4xl text-berry text-center mb-2">
              complete the meal
            </h2>
            <p className="text-cocoa-soft text-center mb-8">goes great with these.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/product/${r.id}`}
                  className="group bg-cream rounded-2xl border-2 border-sun/70 p-4 hover:border-sun-deep hover:-translate-y-1 hover:shadow-xl hover:shadow-cocoa/15 transition-all duration-300"
                >
                  <img
                    src={r.image ?? '/art/hero.jpg'}
                    alt={r.name}
                    className="w-full h-32 object-cover rounded-xl border-4 border-white shadow-md shadow-cocoa/20"
                  />
                  <h3 className="font-display text-cocoa uppercase mt-3 leading-snug group-hover:text-berry transition-colors">
                    {r.name}
                  </h3>
                  <p className="font-hand text-2xl text-sun-deep mt-1">₱{Number(r.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* wood band */}
      <section className="planks relative overflow-hidden">
        <Frond className="absolute -bottom-8 -left-8 w-40 opacity-40" />
        <Frond className="absolute -bottom-8 -right-8 w-40 -scale-x-100 opacity-40" />
        <div className="max-w-4xl mx-auto px-4 py-14 text-center">
          <p className="font-script text-sun text-2xl md:text-3xl mb-2">too many choices?</p>
          <h2 className="font-display text-2xl md:text-4xl text-cream uppercase mb-6">
            come taste the whole wall in person
          </h2>
          <Link href="/stores" className="btn btn-primary">
            Find a Store
          </Link>
        </div>
      </section>
    </div>
  )
}