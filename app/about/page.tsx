import Link from 'next/link'

export const dynamic = 'force-dynamic'

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

const VALUES = [
  {
    title: 'cream first',
    note: 'the leche is never rushed. if the cream is not right, the day does not start.',
  },
  {
    title: 'fresh daily',
    note: 'mango, beans and banana cooked every morning. yesterday’s goes home with the crew.',
  },
  {
    title: 'a table for everyone',
    note: 'barangay captains and first-timers sit on the same chairs. the halo-halo does not discriminate.',
  },
]

export default function AboutPage() {
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
          <h1 className="font-display text-poster text-5xl md:text-7xl uppercase">Our Story</h1>
          <p className="font-script text-berry text-2xl md:text-3xl mt-4">
            from a stall in san juan to the wall you&apos;re reading
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-12 md:h-16" />
      </section>

      {/* the story */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-14 items-center">
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="relative bg-white rounded-2xl p-3 pb-14 shadow-2xl shadow-cocoa/25 -rotate-1 hover:rotate-0 transition-transform">
            <div className="absolute -top-3 left-10 w-24 h-7 bg-sun/70 -rotate-6 rounded-sm shadow-sm" />
            <div className="absolute -top-3 right-10 w-24 h-7 bg-sun/70 rotate-6 rounded-sm shadow-sm" />
            <img
              src="/art/hero.jpg"
              alt="The halo-halo lineup"
              className="w-full aspect-square object-cover rounded-xl"
            />
            <p className="font-hand text-berry text-2xl text-center absolute bottom-4 left-0 right-0 -rotate-2">
              the lineup that started it
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-script text-4xl md:text-5xl text-berry mb-6">one cooler box</h2>
          <p className="text-cocoa-soft text-lg leading-relaxed mb-5">
            Ben&apos;s started the way the best things in Batangas do — with one cooler box, a
            borrowed table, and a line that formed before the sign was even dry. The halo-halo
            recipe has not changed since: creamiest leche, sweet beans, province mango, and
            shaved ice that never gets rushed.
          </p>
          <p className="text-cocoa-soft text-lg leading-relaxed">
            The stall became a counter. The counter became a wall of posters — rice meals for
            the hungry, pasta for the kids, coolers for everybody. Today there are two counters
            in San Juan, and the same rule hangs in both: if it isn&apos;t worth lining up for,
            we don&apos;t serve it.
          </p>
        </div>
      </section>

      {/* values */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 pb-20">
        <div className="flex items-center justify-center gap-4 mb-12">
          <Sparkle className="w-7 -rotate-12" />
          <h2 className="font-display text-poster text-3xl md:text-5xl uppercase">the house rules</h2>
          <Sparkle className="w-7 rotate-12" />
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={`w-full sm:w-80 rounded-2xl border-2 border-sun/70 p-8 shadow-lg shadow-cocoa/10 hover:rotate-0 transition-transform ${
                i % 2 ? 'bg-[#e8f4fb] rotate-1' : 'bg-cream -rotate-1'
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-sun/70 -rotate-2 rounded-sm shadow-sm" />
              <h3 className="font-display text-2xl text-cocoa uppercase">{v.title}</h3>
              <p className="font-hand text-berry text-2xl mt-3 leading-snug">{v.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* wood band */}
      <section className="planks relative overflow-hidden">
        <Frond className="absolute -bottom-14 -left-10 w-48" />
        <Frond className="absolute -bottom-14 -right-10 w-48 -scale-x-100" />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="font-script text-sun text-2xl md:text-3xl mb-2">come say hi</p>
          <h2 className="font-display text-2xl md:text-4xl text-cream uppercase mb-6">
            the counter knows its regulars by heart
          </h2>
          <Link href="/stores" className="btn btn-primary">
            Find a Store
          </Link>
        </div>
      </section>
    </div>
  )
}