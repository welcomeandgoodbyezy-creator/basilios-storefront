'use client'

import { useState } from 'react'

export default function ProductImage({ src, name }: { src: string | null; name: string }) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand-light to-brand-dark">
        <span className="font-display text-2xl text-brand-amber/80 px-4 text-center">{name}</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
  )
}