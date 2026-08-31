import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function ReservationConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const { id } = await searchParams
  const reservationId = Number(id)
  const reservation = Number.isInteger(reservationId)
    ? await prisma.reservation.findUnique({ where: { id: reservationId }, include: { store: true } })
    : null

  if (!reservation) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
        <p className="text-brand-cream/70">Reservation not found.</p>
      </div>
    )
  }

  const rows: [string, string][] = [
    ['Reference', `#${reservation.id}`],
    ['Store', reservation.store.name],
    ['When', new Date(reservation.date).toLocaleString(undefined, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })],
    ['Party', `${reservation.partySize} ${reservation.partySize === 1 ? 'guest' : 'guests'}`],
    ['Status', reservation.status],
  ]

  return (
    <div className="min-h-screen bg-brand-dark py-16 px-4">
      <div className="max-w-xl mx-auto text-center">
        <p className="text-brand-amber font-bold tracking-[0.3em] uppercase text-sm mb-3">
          Table held
        </p>
        <h1 className="font-display text-4xl font-black text-brand-cream mb-8">
          See you soon, {reservation.name}.
        </h1>

        <div className="bg-brand-light rounded-2xl border border-white/10 p-8 text-left space-y-4">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between gap-4">
              <span className="text-brand-cream/60 text-sm capitalize">{label}</span>
              <span className="text-brand-cream font-semibold text-sm text-right capitalize">{value}</span>
            </div>
          ))}
        </div>

        <p className="text-brand-cream/60 mt-6 text-sm">
          We hold tables for 15 minutes past the slot. Running late? Call the store.
        </p>

        <Link
          href="/menu"
          className="inline-block mt-8 bg-brand-amber text-brand-dark px-8 py-3 rounded-full font-bold hover:bg-amber-500 transition-colors"
        >
          Browse the Menu While You Wait
        </Link>
      </div>
    </div>
  )
}