'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/components/CartContext'

function HomeIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 11 L12 3 L21 11" />
      <path d="M5 10 V20 H19 V10" />
    </svg>
  )
}

function MenuIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 4 H20 V20 H4 Z" />
      <path d="M8 9 H16 M8 13 H16 M8 17 H13" />
    </svg>
  )
}

function CartIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 8 H19 L17.5 20 H6.5 Z" />
      <path d="M9 8 V6 A3 3 0 0 1 15 6 V8" />
    </svg>
  )
}

function PersonIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21 C4 16 8 14 12 14 C16 14 20 16 20 21" />
    </svg>
  )
}

export default function BottomNav() {
  const pathname = usePathname()
  const [me, setMe] = useState<{ name: string } | null>(null)

  useEffect(() => {
    let alive = true
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => alive && setMe(d.user ?? null))
      .catch(() => alive && setMe(null))
    return () => {
      alive = false
    }
  }, [pathname])

  const cart = useCart() as {
    items?: { qty?: number; quantity?: number }[]
    count?: number
    totalItems?: number
  }

  const count =
    typeof cart.count === 'number'
      ? cart.count
      : typeof cart.totalItems === 'number'
        ? cart.totalItems
        : Array.isArray(cart.items)
          ? cart.items.reduce((n, it) => n + (it.qty ?? it.quantity ?? 1), 0)
          : 0

  const tabs = [
    { href: '/', label: 'Home', icon: HomeIcon, match: (p: string) => p === '/' },
    { href: '/menu', label: 'Menu', icon: MenuIcon, match: (p: string) => p.startsWith('/menu') || p.startsWith('/product') },
    { href: '/cart', label: 'Cart', icon: CartIcon, match: (p: string) => p.startsWith('/cart') || p.startsWith('/checkout'), badge: count },
    {
      href: me ? '/account' : '/login',
      label: me ? 'Account' : 'Login',
      icon: PersonIcon,
      match: (p: string) => p.startsWith('/account') || p.startsWith('/login') || p.startsWith('/register'),
    },
  ]

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-cream/95 backdrop-blur border-t-2 border-sun shadow-[0_-4px_12px_rgba(89,55,28,0.15)]">
      <div className="grid grid-cols-4">
        {tabs.map((t) => {
          const active = t.match(pathname)
          const Icon = t.icon
          return (
            <Link
              key={t.label}
              href={t.href}
              className={`relative flex flex-col items-center gap-1 py-2.5 ${
                active ? 'text-berry' : 'text-cocoa-soft/70'
              }`}
            >
              <span className="relative">
                <Icon className="w-6 h-6" />
                {typeof t.badge === 'number' && t.badge > 0 && (
                  <span className="absolute -top-2 -right-3 min-w-[18px] h-[18px] px-1 rounded-full bg-sun border border-cocoa/20 text-cocoa text-[10px] font-extrabold flex items-center justify-center">
                    {t.badge}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-extrabold tracking-wide">{t.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}