import Link from 'next/link'

export const dynamic = 'force-dynamic'

// edit me: one object per guest, newest first. real vips go here when they visit.
const GUESTS = [
  { name: 'Aling Nena', role: 'barangay captain', note: 'ordered: tocino, twice', day: 'today' },
  { name: 'Coach Ramon', role: 'little league champ coach', note: 'ordered: pancit canton (large)', day: 'today' },
  { name: 'DJ Marisol', role: 'morning radio voice', note: 'ordered: salty summer halo-halo', day: 'yesterday' },
  { name: 'The Bautista Twins', role: 'class valedictorians', note: 'ordered: ube macapuno, matching', day: 'yesterday' },
]

const FAVORITES = [
  { name: 'Original Halo-Halo', votes: '214 votes this month' },
  { name: 'Ube Macapuno', votes: '187 votes this month' },
  { name: 'Spicy Winter Halo-Halo', votes: '143 votes this month' },
  { name: 'BBQ Ribs', votes: 'savory crown, 129 votes' },
]

const RECORDS = [
  '214 glasses stacked this week',
  'ube con yelo sold out — twice',
  'longest merienda: 3 hours, table 6',
  'biggest single order: ₱1,204',
]

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
  } else if (/ribs|bbq|chicken|tapa|adobo|tocino/i.test(name)) {
    art = (
      <g {...stroke}>
        <path d="M14 20 a10 10 0 1 1 20 4 c-2 6 -8 8 -12 8 z" />
        <path d="M22 32 l-4 8" />
        <circle cx="17" cy="42" r="2" />
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
  } else {
    art = <path d="M24 8 l4 12 12 4 -12 4 -4 12 -4 -12 -12 -4 12 -4 z" {...stroke} />
  }
  return <svg viewBox="0 0 48 48" className={className}>{art}</svg>
}

const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

export default function HallOfFamePage() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

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
          <p className="font-hand text-berry text-2xl">{today}</p>
          <h1 className="font-display text-poster text-5xl md:text-7xl uppercase mt-1">
            Hall of Fame
          </h1>
          <p className="font-script text-berry text-2xl md:text-3xl mt-4">
            the wall where legends get their photo taken
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-12 md:h-16" />
      </section>

      {/* vip guest wall */}
      <section className="max-w-[90rem] mx-auto px-6 md:px-12 py-16">
        <div className="flex items-center justify-center gap-4 mb-3">
          <Sparkle className="w-7 -rotate-12" />
          <h2 className="font-display text-poster text-3xl md:text-5xl uppercase">
            guest of honors
          </h2>
          <Sparkle className="w-7 rotate-12" />
        </div>
        <p className="text-cocoa-soft text-center mb-12">
          celebrities, captains and champions who sat at our tables.
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {GUESTS.map((g, i) => (
            <div
              key={g.name}
              className={`relative w-full max-w-xs sm:w-64 bg-white rounded-2xl p-5 pb-6 text-center shadow-xl shadow-cocoa/20 hover:rotate-0 hover:-translate-y-1 transition-transform ${
                i % 2 ? 'rotate-2' : '-rotate-2'
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-sun/70 -rotate-2 rounded-sm shadow-sm" />
              <div className="w-28 h-28 mx-auto rounded-full bg-sun border-4 border-white shadow-md flex items-center justify-center">
                <span className="font-script text-4xl text-berry">{initials(g.name)}</span>
              </div>
              <h3 className="font-display text-cocoa uppercase text-lg mt-4 leading-snug">{g.name}</h3>
              <p className="text-cocoa-soft text-xs font-extrabold tracking-widest uppercase mt-1">
                {g.role}
              </p>
              <p className="font-hand text-berry text-xl mt-2">{g.note}</p>
              <p className="text-cocoa-soft/70 text-xs font-bold uppercase tracking-widest mt-2">
                {g.day}
              </p>
            </div>
          ))}

          {/* your photo here */}
          <div className="w-full max-w-xs sm:w-64 rounded-2xl border-4 border-dashed border-cocoa/30 bg-cream/60 p-5 pb-6 text-center flex flex-col items-center justify-center rotate-1 hover:rotate-0 transition-transform">
            <div className="w-28 h-28 rounded-full border-4 border-dashed border-cocoa/30 flex items-center justify-center">
              <span className="font-script text-3xl text-cocoa/50">you?</span>
            </div>
            <p className="font-hand text-cocoa text-2xl mt-4">your photo here</p>
            <p className="text-cocoa-soft text-xs font-bold uppercase tracking-widest mt-2">
              sign the guest book at the counter
            </p>
          </div>
        </div>
      </section>

      {/* people's favorites — printed tickets */}
      <section className="relative overflow-hidden bg-peach/60 py-16">
        <Frond className="absolute -top-12 -left-10 w-52 rotate-180 opacity-70" />
        <Frond className="absolute -top-12 -right-10 w-52 rotate-180 opacity-70" />
        <div className="max-w-[90rem] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-center gap-4 mb-3">
            <Sparkle className="w-7 -rotate-12" />
            <h2 className="font-display text-poster text-3xl md:text-5xl uppercase">
              people&apos;s favorites
            </h2>
            <Sparkle className="w-7 rotate-12" />
          </div>
          <p className="text-cocoa-soft text-center mb-12">voted at the counter, counted every night.</p>

          <div className="flex flex-wrap justify-center gap-10">
            {FAVORITES.map((f, i) => (
              <Link
                key={f.name}
                href="/menu"
                className={`relative w-full max-w-xs sm:w-72 bg-white rounded-2xl p-6 text-center shadow-xl shadow-cocoa/20 hover:rotate-0 hover:-translate-y-1 transition-transform ${
                  i % 2 ? 'rotate-2' : '-rotate-2'
                }`}
              >
                <Crown className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 -rotate-6" />
                <div className="w-24 h-24 mx-auto rounded-full bg-sun border-4 border-white shadow-[3px_3px_0_0_rgba(89,55,28,0.25)] flex items-center justify-center">
                  <Doodle name={f.name} className="w-12 h-12" />
                </div>
                <h3 className="font-display text-cocoa uppercase text-lg mt-4 text-center leading-snug">
                  {f.name}
                </h3>
                <p className="font-hand text-berry text-2xl text-center mt-1">{f.votes}</p>
              </Link>
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

      {/* cta */}
      <section className="planks relative overflow-hidden">
        <Frond className="absolute -bottom-14 -left-10 w-48" />
        <Frond className="absolute -bottom-14 -right-10 w-48 -scale-x-100" />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="font-script text-sun text-2xl md:text-3xl mb-2">think you belong on the wall?</p>
          <h2 className="font-display text-2xl md:text-4xl text-cream uppercase mb-6">
            finish a spicy winter halo-halo without crying
          </h2>
          <Link href="/menu" className="btn btn-primary">
            Accept the Challenge
          </Link>
        </div>
      </section>
    </div>
  )
}