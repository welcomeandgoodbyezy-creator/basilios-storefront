'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/CartContext'

type Me = { id: number; name: string; email: string; role: string } | null

function Frond({ className }: { className: string }) {
  const leaf = (rot: number, len: number, fill: string) => (
    <path
      d={`M0 0 Q ${len * 0.16} ${-len * 0.4} 0 ${-len} Q ${-len * 0.16} ${-len * 0.4} 0 0`}
      fill={fill}
      transform={`rotate(${rot})`}
    />
  )
  return (
    <svg viewBox="-100 -100 200 200" className={className} aria-hidden>
      <g transform="translate(0 92)">
        {leaf(-70, 118, '#46a04c')}
        {leaf(-46, 148, '#2e8b3d')}
        {leaf(-23, 168, '#46a04c')}
        {leaf(0, 178, '#2e8b3d')}
        {leaf(23, 168, '#46a04c')}
        {leaf(46, 148, '#2e8b3d')}
        {leaf(70, 118, '#46a04c')}
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

function Wave({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 1440 90" className={className} preserveAspectRatio="none" aria-hidden>
      <path
        d="M0,50 C120,90 240,10 360,45 C480,80 600,20 720,50 C840,85 960,15 1080,50 C1200,85 1320,25 1440,55 L1440,90 L0,90 Z"
        fill="#fff8e3"
      />
    </svg>
  )
}

function Gate({
  title,
  note,
  cta,
  href,
}: {
  title: string
  note: string
  cta: string
  href: string
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue via-[#cfeafb] to-peach relative overflow-hidden flex flex-col items-center justify-center px-4 text-center">
      <Cloud className="absolute top-12 left-10 w-44" />
      <Frond className="absolute -top-14 -right-10 w-56 rotate-180" />
      <Frond className="absolute -bottom-16 -left-10 w-56" />
      <h1 className="font-script text-5xl md:text-6xl text-berry mb-3">{title}</h1>
      <p className="font-hand text-cocoa text-2xl mb-8">{note}</p>
      <Link href={href} className="btn btn-primary">
        {cta}
      </Link>
    </div>
  )
}

export default function CheckoutPage() {
  const { items, total, clear } = useCart()
  const router = useRouter()
  const [me, setMe] = useState<Me | 'loading'>('loading')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => setMe(d.user))
      .catch(() => setMe(null))
  }, [])

  if (me === 'loading') {
    return <div className="min-h-screen bg-sky" />
  }

  if (!me) {
    return (
      <Gate
        title="log in to check out"
        note="your cart is waiting. your identity is required."
        cta="Log in"
        href="/login"
      />
    )
  }

  if (items.length === 0) {
    return (
      <Gate
        title="nothing to check out"
        note="the wall fixes that real quick."
        cta="Browse the Menu"
        href="/menu"
      />
    )
  }

  async function placeOrder() {
    setBusy(true)
    setError('')
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      setError(data.error ?? 'Something went wrong.')
      setBusy(false)
      return
    }
    clear()
    router.push(`/order-confirmed/${data.orderId}`)
  }

  return (
    <div className="min-h-screen bg-sky dotted">
      {/* header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue via-[#cfeafb] to-sky">
        <div className="absolute -left-24 top-8 w-64 h-64 rounded-full bg-peach" />
        <div className="absolute -right-24 bottom-0 w-72 h-72 rounded-full bg-peach" />
        <Cloud className="absolute top-8 left-10 w-40 md:w-52" />
        <Frond className="absolute -top-14 -left-10 w-48 md:w-60 rotate-180" />
        <Frond className="absolute -top-14 -right-10 w-48 md:w-60 rotate-180" />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-24 text-center">
          <h1 className="font-display text-poster text-5xl md:text-7xl uppercase">Checkout</h1>
          <p className="font-script text-berry text-2xl md:text-3xl mt-4">
            almost yours, {me.name.split(' ')[0]}
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-12 md:h-16" />
      </section>

      <div className="max-w-2xl mx-auto px-4 py-14">
        {/* the receipt */}
        <div className="relative bg-cream rounded-2xl border-2 border-sun/70 p-6 shadow-xl shadow-cocoa/15 mb-8">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-sun/70 -rotate-2 rounded-sm shadow-sm" />
          <p className="font-hand text-berry text-2xl mb-4 -rotate-1">the haul:</p>
          <ul className="space-y-3 mb-6">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between items-baseline gap-4">
                <span className="text-cocoa font-extrabold">
                  {item.quantity} × {item.name}
                </span>
                <span className="font-hand text-xl text-cocoa-soft">
                  ₱{Number(item.price) * item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t-2 border-dashed border-cocoa/20 pt-4 flex justify-between items-end">
            <span className="text-cocoa-soft font-extrabold text-lg">Total</span>
            <span className="font-hand text-4xl text-sun-deep">₱{Number(total)}</span>
          </div>
        </div>

        {error && (
          <p className="text-berry font-extrabold text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="button"
          onClick={placeOrder}
          disabled={busy}
          className="btn btn-primary w-full disabled:opacity-50"
        >
          {busy ? 'Placing order...' : 'Place order'}
        </button>
        <p className="font-hand text-cocoa-soft text-xl text-center mt-4 rotate-[-0.5deg]">
          final prices get checked against the counter when you order
        </p>
      </div>

      {/* wood band */}
      <section className="planks relative overflow-hidden">
        <Frond className="absolute -bottom-14 -left-10 w-48" />
        <Frond className="absolute -bottom-14 -right-10 w-48 -scale-x-100" />
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="font-script text-sun text-2xl md:text-3xl mb-2">how it works</p>
          <h2 className="font-display text-2xl md:text-4xl text-cream uppercase">
            pay at the counter, or on delivery
          </h2>
        </div>
      </section>
    </div>
  )
}