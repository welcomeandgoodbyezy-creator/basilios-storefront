'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

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

const field =
  'w-full rounded-xl bg-white border-2 border-sun/70 px-4 py-3 text-cocoa placeholder:text-cocoa-soft/40 outline-none focus:border-sun-deep transition-all'

const label = 'block text-cocoa text-sm font-extrabold mb-2'

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setBusy(true)
    setError(null)
    const form = new FormData(e.currentTarget)
    const email = String(form.get('email') ?? '')
    const password = String(form.get('password') ?? '')

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: String(form.get('name') ?? ''),
        phone: String(form.get('phone') ?? ''),
        email,
        password,
      }),
    })
    const data = await res.json().catch(() => null)
    if (!res.ok) {
      setError(data?.error ?? 'Something went wrong.')
      setBusy(false)
      return
    }

    // account exists now — walk straight in, no second form
    const loginRes = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (loginRes.ok) {
      router.push('/')
      router.refresh()
    } else {
      router.push('/login')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen bg-sky dotted flex items-center justify-center px-4 py-16">
      <div className="relative w-full max-w-4xl bg-cream rounded-3xl border-2 border-sun/70 overflow-hidden grid md:grid-cols-2 shadow-2xl shadow-cocoa/25">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-sun/70 -rotate-2 rounded-sm shadow-sm z-10" />

        {/* left — the pitch */}
        <div className="relative bg-gradient-to-br from-blue via-[#cfeafb] to-peach p-10 flex flex-col overflow-hidden">
          <Frond className="absolute -top-12 -right-10 w-44 rotate-180 opacity-80" />
          <Frond className="absolute -bottom-14 -left-10 w-44 opacity-80" />
          <div className="relative">
            <p className="font-script text-5xl text-berry">Ben&apos;s</p>
            <p className="font-display text-[10px] tracking-[0.3em] text-cocoa uppercase mt-1">
              Halo-Halo Ice Cream
            </p>
          </div>
          <h1 className="font-display text-3xl font-black text-cocoa mt-8 uppercase">
            Join the <span className="text-sun-deep">merienda club.</span>
          </h1>
          <p className="text-cocoa-soft mt-3 leading-relaxed">
            Sign up now to unlock everything the counter has been holding for you.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-cocoa-soft font-semibold">
            <li className="flex gap-3 items-start">
              <span className="w-2 h-2 rounded-full bg-sun border border-cocoa/30 mt-1 shrink-0" />
              Live order tracking, from grill to door
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-2 h-2 rounded-full bg-sun border border-cocoa/30 mt-1 shrink-0" />
              Table reservations in three taps
            </li>
            <li className="flex gap-3 items-start">
              <span className="w-2 h-2 rounded-full bg-sun border border-cocoa/30 mt-1 shrink-0" />
              A cart that remembers you
            </li>
          </ul>
          <p className="font-hand text-berry text-2xl mt-auto pt-10 -rotate-2">
            first timer? the original halo-halo. always.
          </p>
        </div>

        {/* right — the form */}
        <form onSubmit={onSubmit} className="p-10 flex flex-col gap-4">
          <div>
            <label htmlFor="name" className={label}>
              Name <span className="text-berry">*</span>
            </label>
            <input id="name" name="name" required placeholder="Enter your name" className={field} />
          </div>
          <div>
            <label htmlFor="phone" className={label}>
              Contact number <span className="text-berry">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              required
              type="tel"
              placeholder="555-0123"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="email" className={label}>
              Email <span className="text-berry">*</span>
            </label>
            <input
              id="email"
              name="email"
              required
              type="email"
              placeholder="Enter your email"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="password" className={label}>
              Password <span className="text-berry">*</span>
            </label>
            <input
              id="password"
              name="password"
              required
              type="password"
              minLength={8}
              placeholder="At least 8 characters"
              className={field}
            />
          </div>

          {error && <p className="text-berry text-sm font-extrabold">{error}</p>}

          <button type="submit" disabled={busy} className="btn btn-primary w-full disabled:opacity-50 mt-1">
            {busy ? 'Creating...' : 'Create Account'}
          </button>

          <Link
            href="/login"
            className="text-sm text-cocoa-soft hover:text-berry transition-colors text-center font-extrabold"
          >
            Already have an account? Login
          </Link>
        </form>
      </div>
    </div>
  )
}