import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const ORDER = ['Rice Meal', 'Coolers', 'Pasta', 'Snack & Sandwiches', 'Beverages']

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

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

export default async function MenuPage() {
  const categories = await prisma.category.findMany({
    include: { products: true },
  })

  const sorted = [
    ...ORDER.map((n) => categories.find((c) => c.name === n)).filter(Boolean),
    ...categories.filter((c) => !ORDER.includes(c.name)),
  ] as typeof categories

  return (
    <div className="min-h-screen bg-sky dotted relative">
      {/* side clusters — leaves with friends */}
      <div className="pointer-events-none fixed -left-10 top-1/4 hidden xl:block opacity-60 z-0">
        <div className="relative w-40 h-40">
          <Frond className="absolute inset-0 w-32 rotate-90" />
          <Frond className="absolute -top-8 -left-4 w-20 rotate-[130deg] opacity-80" />
          <Sparkle className="absolute top-24 left-24 w-7 rotate-12" />
        </div>
      </div>
      <div className="pointer-events-none fixed -right-10 top-1/2 hidden xl:block opacity-60 z-0">
        <div className="relative w-40 h-40">
          <Frond className="absolute inset-0 w-32 -rotate-90" />
          <Frond className="absolute -top-8 -right-4 w-20 -rotate-[130deg] opacity-80" />
          <Sparkle className="absolute top-24 right-24 w-7 -rotate-12" />
        </div>
      </div>
      <div className="pointer-events-none fixed left-8 bottom-20 hidden xl:block opacity-70 z-0">
        <Cloud className="w-24" />
      </div>
      <div className="pointer-events-none fixed right-10 top-24 hidden xl:block opacity-70 z-0">
        <Cloud className="w-20" />
      </div>

      {/* header — poster sky */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue via-[#cfeafb] to-sky">
        <div className="absolute -left-24 top-8 w-64 h-64 rounded-full bg-peach" />
        <div className="absolute -right-24 bottom-0 w-72 h-72 rounded-full bg-peach" />
        <Sun />
        <Cloud className="absolute top-8 left-10 w-40 md:w-52" />
        <Frond className="absolute -top-14 -left-10 w-48 md:w-60 rotate-180" />
        <Frond className="absolute -top-14 -right-10 w-48 md:w-60 rotate-180" />

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-24 text-center">
          <h1 className="font-display text-poster text-5xl md:text-7xl uppercase">The Menu</h1>
          <p className="font-script text-berry text-2xl md:text-3xl mt-4">
            straight off the wall, into your hands
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-12 md:h-16" />
      </section>

      {/* sticky section nav */}
      <nav className="sticky top-16 z-30 bg-sky/90 backdrop-blur border-b-2 border-sun/60">
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {sorted.map((c) => (
            <a
              key={c.id}
              href={`#${slug(c.name)}`}
              className="whitespace-nowrap bg-cream border-2 border-sun/70 text-cocoa rounded-full px-5 py-2 text-sm font-extrabold hover:bg-sun transition-colors"
            >
              {c.name}
            </a>
          ))}
        </div>
      </nav>

      {/* sections */}
      {sorted.map((cat) => (
        <section key={cat.id} id={slug(cat.name)} className="max-w-[90rem] mx-auto px-6 md:px-12 py-14 scroll-mt-32 relative">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-4">
              <Sparkle className="w-7 -rotate-12 opacity-80" />
              <h2 className="font-display text-poster text-4xl md:text-5xl uppercase">{cat.name}</h2>
              <Sparkle className="w-7 rotate-12 opacity-80" />
            </div>
            {cat.description && (
              <p className="font-hand text-berry text-2xl mt-2">{cat.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {cat.products.map((p, i) => {
              const isNew = p.description?.startsWith('New!')
              const desc = isNew ? p.description!.replace(/^New!\s*/, '') : p.description
              return (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className={`group block rounded-2xl border-2 border-sun/70 p-5 hover:border-sun-deep hover:-translate-y-1 hover:rotate-0 hover:shadow-xl hover:shadow-cocoa/15 transition-all duration-300 ${
                    i % 2 ? 'bg-[#e8f4fb] rotate-1' : 'bg-cream -rotate-1'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={p.image ?? '/art/hero.jpg'}
                      alt={p.name}
                      className="w-full h-44 object-cover rounded-xl border-4 border-white shadow-md shadow-cocoa/20"
                    />
                    {isNew && (
                      <span className="absolute -top-3 -right-2 bg-sun text-berry font-display text-sm px-3 py-1 rounded-full border-2 border-berry rotate-6">
                        New!
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-cocoa uppercase mt-4 leading-snug group-hover:text-berry transition-colors">
                    {p.name}
                  </h3>
                  {desc && <p className="text-cocoa-soft/80 text-sm mt-1 leading-relaxed">{desc}</p>}
                  <div className="flex items-end justify-between mt-3">
                    <span className="font-hand text-3xl text-sun-deep">₱{Number(p.price)}</span>
                    <span className="text-berry text-sm font-extrabold group-hover:underline">
                      Order →
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}