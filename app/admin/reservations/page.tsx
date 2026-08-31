import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export default async function AdminReservationsPage() {
  await requireAdmin()

  const reservations = await prisma.reservation.findMany({
    include: { store: true },
    orderBy: { date: 'asc' },
  })

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-cream mb-8">Reservations</h1>

      {reservations.length === 0 ? (
        <p className="text-brand-cream/60">No reservations yet. The tables are waiting.</p>
      ) : (
        <ul className="space-y-4">
          {reservations.map((r) => (
            <li
              key={r.id}
              className="bg-brand-light rounded-2xl border border-white/10 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <p className="font-bold text-brand-cream">
                  #{r.id} — {r.name} <span className="text-brand-cream/50 font-normal">({r.phone})</span>
                </p>
                <p className="text-brand-cream/70 text-sm mt-1">
                  {r.store.name} ·{' '}
                  {new Date(r.date).toLocaleString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}{' '}
                  · {r.partySize} {r.partySize === 1 ? 'guest' : 'guests'}
                </p>
                {r.notes && <p className="text-brand-cream/50 text-sm mt-1 italic">“{r.notes}”</p>}
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    r.status === 'confirmed'
                      ? 'bg-green-900/50 text-green-300'
                      : r.status === 'cancelled'
                        ? 'bg-red-900/50 text-red-300'
                        : 'bg-brand-amber/15 text-brand-amber'
                  }`}
                >
                  {r.status}
                </span>
                <form action={`/admin/reservations/${r.id}/update`} method="POST" className="flex gap-2">
                  <select
                    name="status"
                    defaultValue={r.status}
                    className="bg-brand-dark border border-white/10 rounded-lg px-3 py-2 text-brand-cream text-sm"
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-brand-amber text-brand-dark px-4 py-2 rounded-lg text-sm font-bold hover:bg-amber-500"
                  >
                    Update
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}