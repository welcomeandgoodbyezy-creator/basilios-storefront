'use client'

import { useEffect, useState, use } from 'react'
import Link from 'next/link'

type OrderData = {
  id: number
  status: string
  total: number
  createdAt: string
  items: { name: string; quantity: number; price: number }[]
}

const STEPS = ['pending', 'preparing', 'ready', 'delivered']

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

export default function OrderTrackingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [order, setOrder] = useState<OrderData | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true

    async function load() {
      const res = await fetch(`/api/orders/${id}`)
      if (!res.ok) {
        if (alive) setError('We could not find this order.')
        return
      }
      const data = await res.json()
      if (alive) setOrder(data.order)
    }

    load()
    const timer = setInterval(load, 5000)
    return () => {
      alive = false
      clearInterval(timer)
    }
  }, [id])

  if (error) {
    return (
      <div className="min-h-screen bg-sky dotted flex flex-col items-center justify-center px-4">
        <p className="font-hand text-berry text-3xl mb-6">{error}</p>
        <Link href="/menu" className="btn btn-primary">
          Browse the Menu
        </Link>
      </div>
    )
  }

  if (!order) {
    return <div className="min-h-screen bg-sky" />
  }

  const stepIndex = STEPS.indexOf(order.status)
  const cancelled = order.status === 'cancelled'

  return (
    <div className="min-h-screen bg-sky dotted">
      <section className="relative overflow-hidden bg-gradient-to-b from-blue via-[#cfeafb] to-sky">
        <div className="absolute -left-24 top-8 w-64 h-64 rounded-full bg-peach" />
        <div className="absolute -right-24 bottom-0 w-72 h-72 rounded-full bg-peach" />
        <Cloud className="absolute top-8 left-10 w-40 md:w-52" />
        <Frond className="absolute -top-14 -left-10 w-48 md:w-60 rotate-180" />
        <Frond className="absolute -top-14 -right-10 w-48 md:w-60 rotate-180" />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-24 text-center">
          <h1 className="font-display text-poster text-5xl md:text-7xl uppercase">
            Order #{order.id}
          </h1>
          <p className="font-script text-berry text-2xl md:text-3xl mt-4">
            placed {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-12 md:h-16" />
      </section>

      <div className="max-w-2xl mx-auto px-4 py-14">
        {cancelled ? (
          <p className="bg-berry text-cream rounded-2xl px-6 py-4 mb-10 font-extrabold text-center">
            This order was cancelled.
          </p>
        ) : (
          <div className="bg-cream rounded-2xl border-2 border-sun/70 p-6 mb-10 shadow-xl shadow-cocoa/15">
            <div className="flex items-center">
              {STEPS.map((step, i) => (
                <div
                  key={step}
                  className={`flex items-center ${i < STEPS.length - 1 ? 'flex-1' : ''}`}
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full border-2 ${
                        i <= stepIndex ? 'bg-sun border-cocoa/30' : 'bg-white/70 border-cocoa/15'
                      }`}
                    />
                    <span
                      className={`mt-2 text-xs font-extrabold capitalize ${
                        i <= stepIndex ? 'text-berry' : 'text-cocoa-soft/50'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 mb-6 rounded ${
                        i < stepIndex ? 'bg-sun' : 'bg-cocoa/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="font-hand text-cocoa-soft text-xl text-center mt-4 -rotate-1">
              this page checks for updates every 5 seconds
            </p>
          </div>
        )}

        <div className="relative bg-cream rounded-2xl border-2 border-sun/70 p-6 shadow-xl shadow-cocoa/15">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-sun/70 -rotate-2 rounded-sm shadow-sm" />
          <ul className="space-y-3 mb-6">
            {order.items.map((item) => (
              <li key={item.name} className="flex justify-between items-baseline gap-4">
                <span className="text-cocoa font-extrabold">
                  {item.quantity} × {item.name}
                </span>
                <span className="font-hand text-xl text-cocoa-soft">
                  ₱{item.price * item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t-2 border-dashed border-cocoa/20 pt-4 flex justify-between items-end">
            <span className="text-cocoa-soft font-extrabold text-lg">Total</span>
            <span className="font-hand text-4xl text-sun-deep">₱{order.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}