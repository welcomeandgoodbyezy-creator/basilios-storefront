import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function AdminMessengerPage() {
  await requireAdmin()

  const connected = Boolean(
    process.env.MESSENGER_PAGE_ACCESS_TOKEN && process.env.MESSENGER_VERIFY_TOKEN
  )

  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const [totalConversations, messagesToday, escalations, recent] = await Promise.all([
    prisma.messengerConversation.count(),
    prisma.messengerMessage.count({ where: { createdAt: { gte: todayStart } } }),
    prisma.messengerConversation.count({ where: { status: 'human_required' } }),
    prisma.messengerConversation.findMany({
      orderBy: { lastActivityAt: 'desc' },
      take: 8,
      include: { messages: { orderBy: { createdAt: 'desc' }, take: 1 } },
    }),
  ])

  const escalated = await prisma.messengerConversation.findMany({
    where: { status: 'human_required' },
    orderBy: { lastActivityAt: 'desc' },
    take: 8,
    include: { messages: { orderBy: { createdAt: 'desc' }, take: 2 } },
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-brand-cream">Messenger</h1>
        <span
          className={`px-4 py-2 rounded-full text-sm font-bold ${
            connected ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
          }`}
        >
          {connected ? 'Connected' : 'Not connected'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-brand-light rounded-2xl border border-white/10 p-6">
          <p className="text-brand-cream/60 text-sm">Conversations</p>
          <p className="text-3xl font-bold text-brand-amber mt-1">{totalConversations}</p>
        </div>
        <div className="bg-brand-light rounded-2xl border border-white/10 p-6">
          <p className="text-brand-cream/60 text-sm">Messages today</p>
          <p className="text-3xl font-bold text-brand-amber mt-1">{messagesToday}</p>
        </div>
        <div className="bg-brand-light rounded-2xl border border-white/10 p-6">
          <p className="text-brand-cream/60 text-sm">Human escalations</p>
          <p className="text-3xl font-bold text-brand-amber mt-1">{escalations}</p>
        </div>
      </div>

      {escalated.length > 0 && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-bold text-red-300 mb-4">Needs a human</h2>
          <div className="space-y-3">
            {escalated.map((c) => (
              <div key={c.id} className="bg-brand-light rounded-2xl border border-red-500/30 p-5">
                <p className="text-brand-cream/50 text-xs mb-2">
                  sender {c.senderPsid} · {new Date(c.lastActivityAt).toLocaleString()}
                </p>
                {c.messages.map((m) => (
                  <p key={m.id} className="text-sm text-brand-cream/80">
                    <span className="text-brand-amber font-bold">{m.direction}:</span> {m.text}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-brand-cream">Recent conversations</h2>
          <Link
            href="/admin/messenger/faq"
            className="bg-brand-amber text-brand-dark px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-500 transition-colors"
          >
            Manage FAQ
          </Link>
        </div>
        <div className="space-y-3">
          {recent.map((c) => (
            <div key={c.id} className="bg-brand-light rounded-2xl border border-white/10 p-5">
              <div className="flex justify-between text-xs text-brand-cream/50 mb-2">
                <span>sender {c.senderPsid}</span>
                <span>{new Date(c.lastActivityAt).toLocaleString()}</span>
              </div>
              {c.messages.map((m) => (
                <p key={m.id} className="text-sm text-brand-cream/80 truncate">{m.text}</p>
              ))}
              <p className="text-xs mt-2">
                <span
                  className={`px-2 py-0.5 rounded-full font-bold ${
                    c.status === 'human_required'
                      ? 'bg-red-900/50 text-red-300'
                      : 'bg-green-900/50 text-green-300'
                  }`}
                >
                  {c.status}
                </span>
                <span className="text-brand-cream/40 ml-2">state: {c.state}</span>
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}