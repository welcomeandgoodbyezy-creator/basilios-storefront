import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

const field =
  'w-full rounded-xl bg-brand-dark border border-white/10 px-4 py-3 text-brand-cream placeholder:text-brand-cream/30 outline-none focus:border-brand-amber focus:ring-2 focus:ring-brand-amber/20 transition-all'

export default async function AdminFaqPage() {
  await requireAdmin()

  const faqs = await prisma.faqEntry.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <h1 className="text-3xl font-bold text-brand-cream mb-8">Messenger FAQ</h1>

      <form action="/admin/messenger/faq/create" method="POST" className="bg-brand-light rounded-2xl border border-white/10 p-6 mb-10 grid gap-4">
        <h2 className="font-display text-xl font-bold text-brand-cream">Add a question</h2>
        <input name="question" required placeholder="Question, e.g. Do you deliver?" className={field} />
        <textarea name="answer" required placeholder="The answer the bot gives" rows={3} className={field} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input name="category" placeholder="Category (default: general)" className={field} />
          <input name="keywords" placeholder="Keywords, comma separated: delivery, deliver" className={field} />
        </div>
        <button type="submit" className="bg-brand-amber text-brand-dark py-3 rounded-full font-bold hover:bg-amber-500 transition-colors w-fit px-8">
          Save FAQ
        </button>
      </form>

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className={`bg-brand-light rounded-2xl border p-5 ${f.enabled ? 'border-white/10' : 'border-white/5 opacity-50'}`}>
            <div className="flex justify-between gap-4 items-start">
              <div>
                <p className="font-bold text-brand-cream">{f.question}</p>
                <p className="text-sm text-brand-cream/70 mt-1">{f.answer}</p>
                <p className="text-xs text-brand-cream/40 mt-2">
                  {f.category} · {f.keywords.join(', ')}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <form action={`/admin/messenger/faq/${f.id}/toggle`} method="POST">
                  <button type="submit" className="px-4 py-2 rounded-full text-xs font-bold bg-brand-dark border border-white/10 text-brand-cream hover:text-brand-amber">
                    {f.enabled ? 'Disable' : 'Enable'}
                  </button>
                </form>
                <form action={`/admin/messenger/faq/${f.id}/delete`} method="POST">
                  <button type="submit" className="px-4 py-2 rounded-full text-xs font-bold bg-red-900/50 text-red-300 hover:bg-red-900">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}