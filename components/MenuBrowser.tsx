'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'
import FeaturedSlider from '@/components/FeaturedSlider'
import DishCarousel from '@/components/DishCarousel'

type Product = {
  id: number
  name: string
  description: string | null
  price: number
  image: string | null
}

type Category = {
  id: number
  name: string
  description: string | null
  products: Product[]
}

function GridCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="group bg-brand-light rounded-2xl overflow-hidden border border-white/10 hover:border-brand-amber/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ProductImage src={product.image} name={product.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <span className="absolute bottom-3 right-3 bg-brand-amber text-brand-dark text-sm font-bold px-3 py-1 rounded-full">
          ${product.price.toFixed(2)}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-bold text-brand-cream group-hover:text-brand-amber transition-colors">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-brand-cream/60 text-sm mt-1 leading-relaxed">{product.description}</p>
        )}
      </div>
    </Link>
  )
}

export default function MenuBrowser({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const featured = useMemo(
    () =>
      categories
        .flatMap((c) => c.products)
        .filter((p) => p.image)
        .slice(0, 4),
    [categories]
  )

  const searching = query.trim().length > 0
  const q = query.trim().toLowerCase()

  const results = useMemo(() => {
    if (!searching) return []
    return categories
      .flatMap((c) => c.products)
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description ?? '').toLowerCase().includes(q)
      )
  }, [categories, q, searching])

  const sections = categories.filter((c) =>
    activeCategory ? c.name === activeCategory : true
  )

  return (
    <div>
      {!searching && <FeaturedSlider slides={featured} />}

      <div className="sticky top-16 z-40 bg-brand-dark/90 backdrop-blur-md py-4 border-b border-white/5 mb-12">
        <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu..."
            className="flex-1 rounded-full bg-brand-light border border-white/10 px-6 py-3 text-brand-cream outline-none focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/30 transition-all"
          />
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveCategory(null)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === null
                  ? 'bg-brand-amber text-brand-dark shadow-lg shadow-amber-900/40'
                  : 'bg-brand-light text-brand-cream/70 hover:text-brand-amber border border-white/10'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(activeCategory === c.name ? null : c.name)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCategory === c.name
                    ? 'bg-brand-amber text-brand-dark shadow-lg shadow-amber-900/40'
                    : 'bg-brand-light text-brand-cream/70 hover:text-brand-amber border border-white/10'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {searching ? (
        results.length === 0 ? (
          <p className="text-brand-cream/50 text-center py-16 font-display text-xl">
            Nothing matches. Try another craving.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((p) => (
              <GridCard key={p.id} product={p} />
            ))}
          </div>
        )
      ) : (
        sections.map((c) => (
          <section key={c.id} className="mb-14">
            <div className="flex items-baseline gap-4 mb-5">
              <h2 className="font-display text-3xl font-bold text-brand-amber">{c.name}</h2>
              {c.description && (
                <p className="text-brand-cream/50 text-sm">{c.description}</p>
              )}
            </div>
            <DishCarousel products={c.products} />
          </section>
        ))
      )}
    </div>
  )
}