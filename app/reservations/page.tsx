import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const TIME_SLOTS = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00',
  '16:00', '17:00', '18:00', '19:00', '20:00', '21:00',
]

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

const field =
  'w-full rounded-xl bg-white border-2 border-sun/70 px-4 py-3 text-cocoa outline-none focus:border-sun-deep transition-colors placeholder:text-cocoa-soft/50'

const label = 'block text-cocoa text-sm font-extrabold mb-2'

export default async function ReservationsPage() {
  const stores = await prisma.store.findMany({ orderBy: { name: 'asc' } })
  const today = new Date().toISOString().split('T')[0]

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
          <p className="font-hand text-berry text-2xl">book a table</p>
          <h1 className="font-display text-poster text-5xl md:text-7xl uppercase mt-1">
            Reservations
          </h1>
          <p className="font-script text-berry text-2xl md:text-3xl mt-4">
            hold a table before the smell of the grill decides for you
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-12 md:h-16" />
      </section>

      {/* form, taped to the wall */}
      <section className="max-w-2xl mx-auto px-4 py-16">
        <form
          action="/reservations/create"
          method="POST"
          className="relative bg-cream rounded-2xl border-2 border-sun/70 p-8 space-y-6 shadow-xl shadow-cocoa/15"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-sun/70 -rotate-2 rounded-sm shadow-sm" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={label}>Name</label>
              <input id="name" name="name" required placeholder="Who's hungry?" className={field} />
            </div>
            <div>
              <label htmlFor="phone" className={label}>Phone</label>
              <input id="phone" name="phone" required type="tel" placeholder="555-0123" className={field} />
            </div>
          </div>

          <div>
            <label htmlFor="storeId" className={label}>Store</label>
            <select id="storeId" name="storeId" className={field}>
              {stores.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="date" className={label}>Date</label>
              <input id="date" name="date" required type="date" min={today} className={field} />
            </div>
            <div>
              <label htmlFor="time" className={label}>Time</label>
              <select id="time" name="time" className={field}>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="partySize" className={label}>Guests</label>
              <input
                id="partySize"
                name="partySize"
                required
                type="number"
                min={1}
                max={20}
                defaultValue={2}
                className={field}
              />
            </div>
          </div>

          <div>
            <label htmlFor="notes" className={label}>
              Special requests <span className="text-cocoa-soft/60">(optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Birthday, window seat, allergic to regret..."
              className={field}
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Reserve the Table
          </button>
        </form>
      </section>

      {/* wood band */}
      <section className="planks relative overflow-hidden">
        <Frond className="absolute -bottom-14 -left-10 w-48" />
        <Frond className="absolute -bottom-14 -right-10 w-48 -scale-x-100" />
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <p className="font-script text-sun text-2xl md:text-3xl mb-2">too hungry to wait?</p>
          <h2 className="font-display text-2xl md:text-4xl text-cream uppercase mb-6">
            walk in — the counter always saves a stool
          </h2>
          <Link href="/menu" className="btn btn-primary">
            See the Menu
          </Link>
        </div>
      </section>
    </div>
  )
}