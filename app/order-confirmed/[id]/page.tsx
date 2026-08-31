import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ id: string }>
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

export default async function OrderConfirmedPage({ params }: Props) {
  const { id } = await params
  const orderId = Number(id)

  if (Number.isNaN(orderId)) redirect('/menu')

  const session = await getSession()
  if (!session) redirect('/login')

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { orderItems: { include: { product: true } } },
  })

  if (!order || order.userId !== session.userId) redirect('/menu')

  return (
    <div className="min-h-screen bg-sky dotted">
      {/* header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue via-[#cfeafb] to-sky">
        <div className="absolute -left-24 top-8 w-64 h-64 rounded-full bg-peach" />
        <div className="absolute -right-24 bottom-0 w-72 h-72 rounded-full bg-peach" />
        <Cloud className="absolute top-8 left-10 w-40 md:w-52" />
        <Frond className="absolute -top-14 -left-10 w-48 md:w-60 rotate-180" />
        <Frond className="absolute -top-14 -right-10 w-48 md:w-60 rotate-180" />
        <Sparkle className="absolute top-20 left-[20%] w-8 rotate-12" />
        <Sparkle className="absolute top-28 right-[22%] w-6 -rotate-12" />

        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-24 text-center">
          <h1 className="font-display text-poster text-5xl md:text-7xl uppercase">
            Order confirmed
          </h1>
          <p className="font-script text-berry text-2xl md:text-3xl mt-4">
            order #{order.id} is in the kitchen — status:{' '}
            <span className="bg-sun text-cocoa font-display text-lg px-4 py-1 rounded-full border-2 border-cocoa/20 inline-block -rotate-2 capitalize">
              {order.status}
            </span>
          </p>
        </div>
        <Wave className="absolute bottom-0 left-0 w-full h-12 md:h-16" />
      </section>

      <div className="max-w-2xl mx-auto px-4 py-14">
        {/* the receipt */}
        <div className="relative bg-cream rounded-2xl border-2 border-sun/70 p-6 shadow-xl shadow-cocoa/15 mb-8">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-7 bg-sun/70 -rotate-2 rounded-sm shadow-sm" />
          <p className="font-hand text-berry text-2xl mb-4 -rotate-1">what the kitchen got:</p>
          <ul className="space-y-3 mb-6">
            {order.orderItems.map((item) => (
              <li key={item.id} className="flex justify-between items-baseline gap-4">
                <span className="text-cocoa font-extrabold">
                  {item.quantity} × {item.product.name}
                </span>
                <span className="font-hand text-xl text-cocoa-soft">
                  ₱{item.price.toNumber() * item.quantity}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t-2 border-dashed border-cocoa/20 pt-4 flex justify-between items-end">
            <span className="text-cocoa-soft font-extrabold text-lg">Total</span>
            <span className="font-hand text-4xl text-sun-deep">₱{order.total.toNumber()}</span>
          </div>
        </div>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/account" className="btn btn-primary">
            View order history
          </Link>
          <Link href="/menu" className="btn btn-outline">
            Keep browsing
          </Link>
        </div>
      </div>

      {/* wood band */}
      <section className="planks relative overflow-hidden">
        <Frond className="absolute -bottom-14 -left-10 w-48" />
        <Frond className="absolute -bottom-14 -right-10 w-48 -scale-x-100" />
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <p className="font-script text-sun text-2xl md:text-3xl mb-2">tell your friends</p>
          <h2 className="font-display text-2xl md:text-4xl text-cream uppercase mb-6">
            the halo-halo slaps, and now you have proof
          </h2>
          <Link href="/hall-of-fame" className="btn btn-script">
            Hall of Fame
          </Link>
        </div>
      </section>
    </div>
  )
}