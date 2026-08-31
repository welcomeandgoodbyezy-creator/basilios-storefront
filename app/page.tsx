import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const TICKER = [
  'halo-halo', 'coolers', 'rice meals', 'pasta', 'snack & sandwiches',
  'beverages', 'merienda o\'clock', 'new: ube con yelo',
]

const HALL = [
  { name: 'Original Halo-Halo', title: 'most-ordered today' },
  { name: 'Spicy Winter Halo-Halo', title: 'bravest bite of the day' },
  { name: 'Ube Macapuno', title: "the crew's pick" },
]

const RECORDS = [
  '214 glasses stacked this week',
  'ube con yelo sold out — twice',
  'longest merienda: 3 hours, table 6',
  'biggest single order: ₱1,204',
]

function Sun() {
  return (
    <svg viewBox="0 0 200 200" className="absolute -top-10 -right-10 w-56 md:w-72 opacity-90" aria-hidden>
      <g stroke="#ffb347" strokeWidth="10" strokeLinecap="round">
        <line x1="100" y1="10" x2="100" y2="38" />
        <line x1="100" y1="162" x2="100" y2="190" />
        <line x1="10" y1="100" x2="38" y2="100" />
        <line x1="162" y1="100" x2="190" y2="100" />
        <line x1="36" y1="36" x2="56" y2="56" />
        <line x1="144" y1="144" x2="164" y2="164" />
        <line x1="36" y1="164" x2="56" y2="144" />
        <line x1="144" y1="56" x2="164" y2="36" />
      </g>
      <circle cx="100" cy="100" r="52" fill="#ffd23f" />
      <circle cx="100" cy="100" r="52" fill="none" stroke="#fff" strokeWidth="6" opacity="0.7" />
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

function Sparkle({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        d="M24 6 l4 14 14 4 -14 4 -4 14 -4 -14 -12 -4 12 -4 z"
        fill="#ffd23f"
        stroke="#a4232e"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Crown({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 64 40" className={className} aria-hidden>
      <path
        d="M4 34 L8 12 L20 22 L32 4 L44 22 L56 12 L60 34 Z"
        fill="#ffd23f"
        stroke="#a4232e"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="29" r="3" fill="#a4232e" />
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

function Doodle({ name, className = 'w-9 h-9' }: { name: string; className?: string }) {
  const stroke = { fill: 'none', stroke: '#59371c', strokeWidth: 3, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  let art
  if (/halo|ube|macapuno|con yelo|langka|mais/i.test(name)) {
    art = (
      <g {...stroke}>
        <path d="M14 10 h20 l-3 28 h-14 z" />
        <path d="M16 18 h16" />
        <path d="M17 26 h14" />
        <path d="M24 10 q4 -5 7 -7" />
      </g>
    )
  } else if (/cool/i.test(name)) {
    art = (
      <g {...stroke}>
        <path d="M16 10 h16 l-3 28 h-10 z" />
        <line x1="26" y1="10" x2="31" y2="3" />
        <path d="M17 18 h14" />
      </g>
    )
  } else if (/rice/i.test(name)) {
    art = (
      <g {...stroke}>
        <path d="M10 26 a14 12 0 0 0 28 0 z" />
        <path d="M18 18 q2 -4 0 -8" />
        <path d="M28 18 q2 -4 0 -8" />
      </g>
    )
  } else if (/pasta/i.test(name)) {
    art = (
      <g {...stroke}>
        <path d="M10 26 a14 12 0 0 0 28 0 z" />
        <path d="M14 22 q3 -5 6 0 q3 5 6 0 q3 -5 6 0" />
      </g>
    )
  } else if (/snack|sandwich/i.test(name)) {
    art = (
      <g {...stroke}>
        <path d="M9 32 L24 14 L39 32 Z" />
        <path d="M15 28 h18" />
      </g>
    )
  } else if (/beverage|drink/i.test(name)) {
    art = (
      <g {...stroke}>
        <path d="M13 14 h18 v14 a8 8 0 0 1 -8 8 h-2 a8 8 0 0 1 -8 -8 z" />
        <path d="M31 18 h4 a4 4 0 0 1 0 9 h-4" />
      </g>
    )
  } else {
    art = <path d="M24 8 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4 z" {...stroke} />
  }
  return <svg viewBox="0 0 48 48" className={className}>{art}</svg>
}

export default async function HomePage() {
  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } })
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-sky">
      {/* hero — poster sky */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue via-[#cfeafb] to-peach">
        <div className="absolute -left-28 top-16 w-80 h-80 rounded-full bg-peach" />
        <div className="absolute -right-32 bottom-10 w-96 h-96 rounded-full bg-peach" />
        <Sun />
        <Cloud className="absolute top-10 left-10 w-44 md:w-64" />
        <Cloud className="absolute top-36 right-1/3 w-36 opacity-70" />
        <Frond className="absolute -top-14 -left-10 w-56 md:w-72 rotate-180" />
        <Frond className="absolute -top-14 -right-10 w-56 md:w-72 rotate-180" />
        <Sparkle className="absolute top-24 left-[16%] w-9 rotate-12 opacity-90" />
        <Sparkle className="absolute top-56 left-[46%] w-6 -rotate-12 opacity-70" />
        <Sparkle className="absolute bottom-44 right-[30%] w-8 rotate-6 opacity-80" />

        <div className="relative max-w-[90rem] mx-auto px-6 md:px-12 pt-20 pb-32 md:pt-28 md:pb-40 grid md:grid-cols-2 gap-14 items-center">
          <div className="text-center md:text-left">
            <p className="inline-block bg-berry text-cream rounded-full px-5 py-1.5 text-sm font-extrabold tracking-widest uppercase mb-6">
             Batangas &apos; creamiest halo-halo
            </p>
            <h1 className="font-script text-7xl md:text-8xl text-berry mb-2">Ben&apos;s</h1>
            <h2 className="font-display text-poster text-5xl md:text-6xl uppercase mb-6">
              Halo-Halo Ice Cream
            </h2>
            <p className="text-cocoa-soft text-lg md:text-xl leading-relaxed max-w-lg mx-auto md:mx-0 mb-9">
              Shaved ice, creamiest leche, sweet beans and mango — layered tall in a cold
              glass. Plus rice meals, pasta and snacks for when the craving isn&apos;t sweet.
            </p>
            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
              <Link href="/menu" className="btn btn-primary">See the Menu</Link>
              <Link href="/stores" className="btn btn-outline">Find a Store</Link>
            </div>
          </div>

          <div className="relative">
            <img
              src="/art/hero.jpg"
              alt="Ben's halo-halo lineup"
              className="rounded-3xl border-8 border-white shadow-2xl shadow-cocoa/30 rotate-2 w-full object-cover"
            />
            <p className="font-hand text-berry text-3xl absolute -bottom-10 left-6 -rotate-6">
              try the spicy winter halo-halo!
            </p>
          </div>
        </div>

        <Wave className="absolute bottom-0 left-0 w-full h-14 md:h-20" />
      </section>

      {/* categories — pinned notes, compact on phones */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 py-20">
        <h2 className="font-display text-poster text-4xl md:text-6xl text-center uppercase mb-12">
          What are you craving?
        </h2>
        <div className="flex flex-wrap justify-center gap-7">
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href="/menu"
              className={`group relative w-full sm:w-[calc(50%-14px)] lg:w-[calc(25%-21px)] rounded-2xl border-2 border-sun/70 p-5 sm:p-9 hover:border-sun-deep hover:-translate-y-1 hover:rotate-0 hover:shadow-xl hover:shadow-cocoa/15 transition-all duration-300 ${
                i % 2 ? 'bg-[#e8f4fb] rotate-1' : 'bg-cream -rotate-1'
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-sun/70 -rotate-2 rounded-sm shadow-sm" />
              <div className="flex items-start gap-4 sm:block">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-sun border-2 border-cocoa/20 flex items-center justify-center shrink-0 shadow-[3px_3px_0_0_rgba(89,55,28,0.25)] group-hover:rotate-6 transition-transform">
                  <Doodle name={cat.name} className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl sm:text-2xl text-cocoa group-hover:text-berry transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-cocoa-soft/80 mt-1 sm:mt-2 text-sm leading-relaxed">
                    {cat.description ?? 'Explore the menu.'}
                  </p>
                  <p className="text-berry mt-3 sm:mt-5 text-sm font-extrabold">Explore →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* hall of fame — printed tickets, no blurry photos */}
      <section className="relative overflow-hidden bg-peach/60 py-20">
        <Frond className="absolute -top-12 -left-10 w-52 rotate-180 opacity-70" />
        <Frond className="absolute -top-12 -right-10 w-52 rotate-180 opacity-70" />
        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
          <div className="text-center">
            <p className="font-hand text-berry text-2xl">{today}</p>
            <h2 className="font-display text-poster text-4xl md:text-6xl uppercase mt-1">
              hall of fame
            </h2>
            <p className="font-script text-berry text-2xl mt-3">
              today&apos;s legends, straight from the counter
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-10 mt-14">
            {HALL.map((h, i) => (
              <div
                key={h.name}
                className={`relative w-full max-w-xs sm:w-72 bg-white rounded-2xl p-6 text-center shadow-xl shadow-cocoa/20 hover:rotate-0 hover:-translate-y-1 transition-transform ${
                  i % 2 ? 'rotate-2' : '-rotate-2'
                }`}
              >
                <Crown className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 -rotate-6" />
                <div className="w-24 h-24 mx-auto rounded-full bg-sun border-4 border-white shadow-[3px_3px_0_0_rgba(89,55,28,0.25)] flex items-center justify-center">
                  <Doodle name={h.name} className="w-12 h-12" />
                </div>
                <h3 className="font-display text-cocoa uppercase text-lg mt-4 text-center leading-snug">
                  {h.name}
                </h3>
                <p className="font-hand text-berry text-2xl text-center mt-1">{h.title}</p>
              </div>
            ))}
          </div>

          {/* record board */}
          <div className="flex flex-wrap justify-center gap-5 mt-16">
            {RECORDS.map((r, i) => (
              <div
                key={r}
                className={`bg-cream border-2 border-sun/70 rounded-full px-7 py-3 shadow-[4px_4px_0_0_rgba(89,55,28,0.2)] ${
                  i % 2 ? 'rotate-1' : '-rotate-1'
                }`}
              >
                <span className="font-hand text-2xl text-cocoa">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stall-sign ticker */}
      <div className="marquee bg-berry text-cream -rotate-1 scale-x-105 border-y-4 border-sun py-3 overflow-hidden shadow-lg shadow-cocoa/20">
        <div className="marquee-track flex items-center">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} className="flex items-center font-display uppercase tracking-widest text-sm md:text-base">
              <span className="mx-6">{t}</span>
              <span className="text-sun text-xl leading-none">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* poster wall */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 py-20">
        <h2 className="font-script text-3xl md:text-5xl text-berry text-center mb-3">
          straight off the wall
        </h2>
        <p className="text-cocoa-soft text-center mb-10">the full menu, just like in-store.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { src: '/art/rice-meal.jpg', alt: 'Rice Meal menu', rot: '-rotate-2' },
            { src: '/art/coolers.jpg', alt: 'Coolers menu', rot: 'rotate-1' },
            { src: '/art/pasta.jpg', alt: 'Pasta menu', rot: '-rotate-1' },
            { src: '/art/snacks.jpg', alt: 'Snack and Sandwiches menu', rot: 'rotate-2' },
          ].map((p) => (
            <Link
              key={p.src}
              href="/menu"
              className={`relative block rounded-xl border-4 border-white shadow-lg shadow-cocoa/20 ${p.rot} hover:rotate-0 hover:scale-[1.03] transition-transform duration-300`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-sun/70 -rotate-3 rounded-sm shadow-sm z-10" />
              <img src={p.src} alt={p.alt} className="w-full h-full object-cover rounded-lg" />
            </Link>
          ))}
        </div>
      </section>

      {/* wood band */}
      <section className="planks relative overflow-hidden">
        <Frond className="absolute -bottom-14 -left-10 w-48" />
        <Frond className="absolute -bottom-14 -right-10 w-48 -scale-x-100" />
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <p className="font-script text-sun text-3xl md:text-4xl mb-3">merienda o&apos;clock</p>
          <h2 className="font-display text-3xl md:text-5xl text-cream uppercase mb-8">
            Book a table before the halo-halo runs out
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/reservations" className="btn btn-primary">Reserve a Table</Link>
            <Link href="/about" className="btn btn-script">Our Story</Link>
          </div>
        </div>
      </section>
    </div>
  )
}