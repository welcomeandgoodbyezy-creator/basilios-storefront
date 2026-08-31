import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import StoreMap from '@/components/StoreMap'

export const dynamic = 'force-dynamic'

function Sun() {
  return (
    <svg viewBox="0 0 200 200" className="absolute -top-8 -right-8 w-44 md:w-56 opacity-90" aria-hidden>
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

export default async function StoresPage() {
  const stores = await prisma.store.findMany({ orderBy: { name: 'asc' } })

  return (
    <div className="min-h-screen bg-sky dotted">
      {/* header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue via-[#cfeafb] to-sky">
        <div className="absolute -left-24 top-8 w-64 h-64 rounded-full bg-peach" />
        <div className="absolute -right-24 bottom-0 w-72 h-72 rounded-full bg-peach" />
        <Sun />
        <Cloud className="absolute top-8 left-10 w-40 md:w-52" />
        <Frond className="absolute -top-14 -left-10 w-48 md:w-60 rotate-180" />
        <Frond className="absolute -top-14 -right-10 w-48 md:w-60 rotate-180" />

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-24 text-center">
          <h1 className="font-display text-poster text-5xl md:text-7xl uppercase">Find a Store</h1>
          <p className="font-script text-berry text-2xl md:text-3xl mt-4">
            two stalls, one beach town — san juan, batangas
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-12 md:h-16" />
      </section>

      <section className="max-w-[90rem] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-10 items-start">
          {/* map, framed like a photo */}
          <div className="relative bg-white rounded-2xl p-3 shadow-2xl shadow-cocoa/25">
            <div className="absolute -top-3 left-10 w-24 h-7 bg-sun/70 -rotate-6 rounded-sm shadow-sm z-10" />
            <div className="absolute -top-3 right-10 w-24 h-7 bg-sun/70 rotate-6 rounded-sm shadow-sm z-10" />
            <div className="rounded-xl overflow-hidden h-[480px]">
              <StoreMap
                stores={stores.map((s) => ({
                  id: s.id,
                  name: s.name,
                  address: s.address,
                  latitude: s.latitude.toNumber(),
                  longitude: s.longitude.toNumber(),
                }))}
              />
            </div>
            <p className="font-hand text-berry text-2xl text-center mt-3 -rotate-1">
              scroll to zoom, drag to wander
            </p>
          </div>

          {/* store cards, taped notes */}
          <div className="space-y-8">
            {stores.map((store, i) => (
              <div
                key={store.id}
                className={`relative bg-cream rounded-2xl border-2 border-sun/70 p-6 shadow-lg shadow-cocoa/10 hover:rotate-0 transition-transform ${
                  i % 2 ? 'rotate-1' : '-rotate-1'
                }`}
              >
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-sun/70 -rotate-2 rounded-sm shadow-sm" />
                <h2 className="font-display text-xl text-cocoa uppercase leading-snug">{store.name}</h2>
                <p className="text-cocoa-soft text-sm mt-2">{store.address}</p>
                {store.phone && <p className="text-cocoa-soft text-sm mt-1 font-extrabold">{store.phone}</p>}
                {store.openingHours && (
                  <p className="font-hand text-berry text-2xl mt-2">open {store.openingHours}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* wood band */}
      <section className="planks relative overflow-hidden">
        <Frond className="absolute -bottom-14 -left-10 w-48" />
        <Frond className="absolute -bottom-14 -right-10 w-48 -scale-x-100" />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="font-script text-sun text-2xl md:text-3xl mb-2">merienda o&apos;clock</p>
          <h2 className="font-display text-2xl md:text-4xl text-cream uppercase mb-6">
            the beach is five minutes from the laiya stall
          </h2>
          <Link href="/reservations" className="btn btn-primary">
            Reserve a Table
          </Link>
        </div>
      </section>
    </div>
  )
}