'use client'

import { useState } from 'react'
import type { Product } from '@prisma/client'
import { useCart } from '@/components/CartContext'

type ButtonProduct = Pick<Product, 'id' | 'name' | 'price' | 'image' | 'availability'>

export default function AddToCartButton({ product }: { product: ButtonProduct }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)

  if (!product.availability) {
    return (
      <button
        type="button"
        disabled
        className="w-full bg-gray-600 text-gray-400 py-3 rounded-full font-bold cursor-not-allowed"
      >
        Out of Stock
      </button>
    )
  }

  const price = Number(product.price)

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      add({
        productId: product.id,
        name: product.name,
        price,
        image: product.image,
      })
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="w-10 h-10 rounded-full bg-brand-dark border border-white/10 text-brand-cream hover:border-brand-amber hover:text-brand-amber transition-colors"
        >
          −
        </button>
        <span className="text-xl font-bold text-brand-cream w-12 text-center">{qty}</span>
        <button
          type="button"
          onClick={() => setQty(qty + 1)}
          className="w-10 h-10 rounded-full bg-brand-dark border border-white/10 text-brand-cream hover:border-brand-amber hover:text-brand-amber transition-colors"
        >
          +
        </button>
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="w-full bg-brand-amber text-brand-dark py-3 rounded-full font-bold hover:bg-amber-500 transition-colors"
      >
        Add {qty} to Cart
      </button>
    </div>
  )
}