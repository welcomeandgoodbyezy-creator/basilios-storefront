'use client'

import { useRouter } from 'next/navigation'
import AddToCartButton from '@/components/AddToCartButton'

export default function AddAndGo({ product }: { product: any }) {
  const router = useRouter()

  return (
    <div
      onClickCapture={(e) => {
        const btn = (e.target as HTMLElement).closest('button')
        if (btn && /add/i.test(btn.textContent ?? '')) {
          setTimeout(() => router.push('/cart'), 200)
        }
      }}
    >
      <AddToCartButton product={product} />
    </div>
  )
}