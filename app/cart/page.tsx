'use client'

import Link from 'next/link'
import { useCart } from '@/components/CartContext'

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

const stepper =
  'w-9 h-9 rounded-full bg-sun border-2 border-cocoa/20 text-cocoa font-extrabold text-lg leading-none shadow-[2px_2px_0_0_rgba(89,55,28,0.3)] hover:translate-y-[1px] hover:shadow-[1px_1px_0_0_rgba(89,55,28,0.3)] transition-all'

export default function CartPage() {
  const { items, total, increment, decrement, remove, clear } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue via-[#cfeafb] to-peach relative overflow-hidden flex flex-col items-center justify-center px-4 text-center">
        <Cloud className="absolute top-12 left-10 w-44" />
        <Frond className="absolute -top-14 -right-10 w-56 rotate-180" />
        <Frond className="absolute -bottom-16 -left-10 w-56" />
        <h1 className="font-script text-5xl md:text-6xl text-berry mb-3">your cart is empty</h1>
        <p className="font-hand text-cocoa text-2xl mb-8">go find something delicious.</p>
        <Link href="/menu" className="btn btn-primary">
          Browse the Menu
        </Link>
      </div>
    )
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
          <h1 className="font-display text-poster text-5xl md:text-7xl uppercase">Your Cart</h1>
          <p className="font-script text-berry text-2xl md:text-3xl mt-4">
            the good stuff, stacked and ready
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-12 md:h-16" />
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <p className="font-hand text-berry text-2xl">
            {items.reduce((n, i) => n + i.quantity, 0)} thing
            {items.reduce((n, i) => n + i.quantity, 0) === 1 ? '' : 's'} you&apos;ll enjoy
          </p>
          <button
            type="button"
            onClick={clear}
            className="text-sm text-cocoa-soft/70 hover:text-berry font-extrabold transition-colors"
          >
            Clear cart
          </button>
        </div>

        <ul className="space-y-6 mb-10">
          {items.map((item, idx) => (
            <li
              key={item.productId}
              className={`relative flex items-center gap-4 bg-cream rounded-2xl border-2 border-sun/70 p-4 shadow-lg shadow-cocoa/10 ${
                idx % 2 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]'
              } hover:rotate-0 transition-transform`}
            >
              <div className="absolute -top-3 left-8 w-16 h-5 bg-sun/70 -rotate-3 rounded-sm shadow-sm" />
              <div className="w-20 h-20 rounded-xl overflow-hidden border-4 border-white shadow-md shadow-cocoa/20 shrink-0 bg-sun/30">
                {item.image && (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                )}
              </div>

              <div className="flex-grow min-w-0">
                <p className="font-display text-cocoa uppercase leading-snug truncate">{item.name}</p>
                <p className="font-hand text-sun-deep text-xl">₱{Number(item.price)}</p>
              </div>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => decrement(item.productId)} className={stepper}>
                  -
                </button>
                <span className="w-6 text-center text-cocoa font-extrabold">{item.quantity}</span>
                <button type="button" onClick={() => increment(item.productId)} className={stepper}>
                  +
                </button>
              </div>

              <p className="w-24 text-right font-hand text-2xl text-cocoa">
                ₱{Number(item.price) * item.quantity}
              </p>

              <button
                type="button"
                onClick={() => remove(item.productId)}
                className="text-cocoa-soft/50 hover:text-berry transition-colors text-sm font-extrabold"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* the till */}
        <div className="relative bg-cream rounded-2xl border-2 border-sun/70 p-6 shadow-xl shadow-cocoa/15">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-sun/70 -rotate-2 rounded-sm shadow-sm" />
          <div className="flex justify-between items-end text-lg mb-6">
            <span className="text-cocoa-soft font-extrabold">Subtotal</span>
            <span className="font-hand text-4xl text-sun-deep">₱{Number(total)}</span>
          </div>
          <Link href="/checkout" className="btn btn-primary w-full">
            Proceed to Checkout
          </Link>
          <p className="font-hand text-berry text-xl text-center mt-4 -rotate-1">
            payment at the counter or on delivery
          </p>
        </div>
      </div>

      {/* wood band */}
      <section className="planks relative overflow-hidden">
        <Frond className="absolute -bottom-14 -left-10 w-48" />
        <Frond className="absolute -bottom-14 -right-10 w-48 -scale-x-100" />
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="font-script text-sun text-2xl md:text-3xl mb-2">forgot something?</p>
          <h2 className="font-display text-2xl md:text-4xl text-cream uppercase mb-6">
            the wall has thirty more cravings
          </h2>
          <Link href="/menu" className="btn btn-primary">
            Back to the Menu
          </Link>
        </div>
      </section>
    </div>
  )
}