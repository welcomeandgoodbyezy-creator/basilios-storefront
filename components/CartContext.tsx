'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type CartItem = {
  productId: number
  name: string
  price: number
  image: string | null
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  total: number
  add: (item: Omit<CartItem, 'quantity'>) => void
  increment: (productId: number) => void
  decrement: (productId: number) => void
  remove: (productId: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

const STORAGE_KEY = 'luto-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // corrupted storage starts fresh
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, loaded])

  const value = useMemo<CartContextValue>(() => {
    const add = (item: Omit<CartItem, 'quantity'>) =>
      setItems((prev) => {
        const existing = prev.find((p) => p.productId === item.productId)
        if (existing) {
          return prev.map((p) =>
            p.productId === item.productId ? { ...p, quantity: p.quantity + 1 } : p
          )
        }
        return [...prev, { ...item, quantity: 1 }]
      })

    const increment = (productId: number) =>
      setItems((prev) =>
        prev.map((p) =>
          p.productId === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      )

    const decrement = (productId: number) =>
      setItems((prev) =>
        prev
          .map((p) =>
            p.productId === productId ? { ...p, quantity: p.quantity - 1 } : p
          )
          .filter((p) => p.quantity > 0)
      )

    const remove = (productId: number) =>
      setItems((prev) => prev.filter((p) => p.productId !== productId))

    const clear = () => setItems([])

    const count = items.reduce((sum, p) => sum + p.quantity, 0)
    const total = items.reduce((sum, p) => sum + p.quantity * p.price, 0)

    return { items, count, total, add, increment, decrement, remove, clear }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}