import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

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

export default async function AccountPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({ where: { id: session.userId } })
  if (!user) redirect('/login')

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' },
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
          <h1 className="font-display text-poster text-5xl md:text-7xl uppercase">Your Account</h1>
          <p className="font-script text-berry text-2xl md:text-3xl mt-4">
            hi, {user.name.split(' ')[0]} — {user.email}
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-12 md:h-16" />
      </section>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <h2 className="font-script text-4xl text-berry mb-6 -rotate-1">order history</h2>

        {orders.length === 0 ? (
          <div className="relative bg-cream rounded-2xl border-2 border-sun/70 p-10 text-center shadow-xl shadow-cocoa/15">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-sun/70 -rotate-2 rounded-sm shadow-sm" />
            <p className="font-hand text-cocoa-soft text-2xl mb-6">
              no orders yet. your stomach called, it wants attention.
            </p>
            <Link href="/menu" className="btn btn-primary">
              Browse the Menu
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li
                key={order.id}
                className="bg-cream rounded-2xl border-2 border-sun/70 p-6 flex justify-between items-center gap-4 shadow-lg shadow-cocoa/10"
              >
                <div>
                  <Link
                    href={`/order/${order.id}`}
                    className="font-extrabold text-cocoa text-lg hover:text-berry transition-colors"
                  >
                    Order #{order.id}
                  </Link>
                  <p className="text-cocoa-soft/70 text-sm mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-hand text-2xl text-sun-deep">₱{Number(order.total)}</p>
                  <p
                    className={`text-xs font-extrabold capitalize mt-1 inline-block px-3 py-1 rounded-full border ${
                      order.status === 'cancelled'
                        ? 'bg-berry text-cream border-berry'
                        : 'bg-sun text-cocoa border-cocoa/20'
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}