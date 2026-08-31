'use client'

import { useRef } from 'react'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'

type Product = {
  id: number
  name: string
  description: string | null
  price: number
  image: string | null
}

export default function DishCarousel({ products }: { products: Product[] }) {
  const track = useRef<HTMLDivElement>(null)

  const slide = (dir: number) => {
    track.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  return (
    <div className="relative group/rail">
      <div
        ref={track}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
      >
        {products.map((p) => (
          <Link
            key={p.id}
            href={`/product/${p.id}`}
            className="group w-72 shrink-0 snap-start bg-brand-light rounded-2xl overflow-hidden border border-white/10 hover:border-brand-amber/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 transition-all duration-300"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <ProductImage src={p.image} name={p.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 right-3 bg-brand-amber text-brand-dark text-sm font-bold px-3 py-1 rounded-full">
                ${p.price.toFixed(2)}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-bold text-brand-cream group-hover:text-brand-amber transition-colors">
                {p.name}
              </h3>
              {p.description && (
                <p className="text-brand-cream/60 text-sm mt-1 line-clamp-2 leading-relaxed">
                  {p.description}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>

      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => slide(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-brand-dark/90 border border-white/10 rounded-full p-2.5 text-brand-cream hover:text-brand-amber hover:border-brand-amber opacity-0 group-hover/rail:opacity-100 transition-all"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
          <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        type="button"
        aria-label="Scroll right"
        onClick={() => slide(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-brand-dark/90 border border-white/10 rounded-full p-2.5 text-brand-cream hover:text-brand-amber hover:border-brand-amber opacity-0 group-hover/rail:opacity-100 transition-all"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}