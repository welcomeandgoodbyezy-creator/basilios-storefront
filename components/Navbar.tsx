'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/components/CartContext'

const LINKS: [string, string][] = [
  ['Menu', '/menu'],
  ['Hall of Fame', '/hall-of-fame'],
  ['Stores', '/stores'],
  ['Reservations', '/reservations'],
  ['About', '/about'],
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [me, setMe] = useState<{ name: string; role: string } | null>(null)
  const pathname = usePathname()
  const router = useRouter()

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

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setMe(null)
    setOpen(false)
    router.push('/')
    router.refresh()
  }

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

  const authDesktop = me ? (
    <>
      <Link
        href="/account"
        className="hidden sm:block text-berry font-extrabold text-sm hover:underline"
      >
        hi, {me.name.split(' ')[0]}
      </Link>
      {me.role === 'admin' && (
        <Link
          href="/admin"
          className="hidden sm:block text-cocoa-soft font-extrabold text-sm hover:text-berry transition-colors"
        >
          Admin
        </Link>
      )}
      <button
        type="button"
        onClick={logout}
        className="hidden sm:block text-cocoa-soft/70 text-sm font-extrabold hover:text-berry transition-colors"
      >
        Logout
      </button>
    </>
  ) : (
    <Link
      href="/login"
      className="hidden sm:block text-berry font-extrabold text-sm hover:underline"
    >
      Login
    </Link>
  )

  return (
    <header className="sticky top-0 z-40 bg-sky/95 backdrop-blur border-b-2 border-sun shadow-sm shadow-cocoa/10">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="leading-none flex items-baseline gap-2" onClick={() => setOpen(false)}>
          <span className="font-script text-3xl text-berry">Ben&apos;s</span>
          <span className="hidden sm:block font-display text-[10px] tracking-[0.25em] text-cocoa uppercase">
            Halo-Halo Ice Cream
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {LINKS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-cocoa font-extrabold text-sm hover:text-berry transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {authDesktop}
          <Link
            href="/cart"
            className="bg-sun text-cocoa border-2 border-cocoa/20 rounded-full px-5 py-2 text-sm font-extrabold shadow-[3px_3px_0_0_#59371c] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#59371c] transition-all"
          >
            Cart ({count})
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden w-10 h-10 rounded-xl bg-cream border-2 border-sun/70 flex flex-col items-center justify-center gap-1.5"
          >
            <span className={`block h-0.5 w-5 bg-cocoa rounded transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-cocoa rounded transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-cocoa rounded transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      {open && (
        <nav className="md:hidden bg-cream border-t-2 border-sun/60 px-6 py-5 flex flex-col gap-4">
          {LINKS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-cocoa font-extrabold text-lg hover:text-berry transition-colors"
            >
              {label}
            </Link>
          ))}
          {me ? (
            <>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="text-berry font-extrabold text-lg hover:underline"
              >
                hi, {me.name.split(' ')[0]}
              </Link>
              {me.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="text-cocoa-soft font-extrabold text-lg hover:text-berry transition-colors"
                >
                  Admin
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="text-left text-cocoa-soft/70 font-extrabold text-lg hover:text-berry transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="text-berry font-extrabold text-lg hover:underline"
            >
              Login
            </Link>
          )}
        </nav>
      )}
    </header>
  )
}