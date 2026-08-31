'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type Slide = {
  id: number
  name: string
  description: string | null
  price: number
  image: string | null
}

export default function FeaturedSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [slides.length])

  if (slides.length === 0) return null

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 mb-12">
      <div className="relative aspect-[21/9] min-h-[300px]">
        {slides.map((s, i) => (
          <Link
            key={s.id}
            href={`/product/${s.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {s.image && (
              <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-14">
              <p className="text-brand-amber font-bold tracking-[0.3em] uppercase text-xs mb-3">
                Chef&apos;s pick
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-black text-brand-cream mb-3">
                {s.name}
              </h2>
              {s.description && (
                <p className="text-brand-cream/80 max-w-md mb-5 leading-relaxed">{s.description}</p>
              )}
              <span className="inline-block bg-brand-amber text-brand-dark font-bold px-5 py-2 rounded-full w-fit">
                ${s.price.toFixed(2)}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 right-6 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? 'w-8 bg-brand-amber' : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  )
}