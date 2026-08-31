
import { prisma } from '@/lib/prisma'
import { requireAdmin } from '@/lib/adminAuth'

export const dynamic = 'force-dynamic'

export default async function AdminUsers() {
  const session = await requireAdmin()
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } })

  return (
    <div>
      <h1 className="text-4xl font-bold text-brand-cream mb-8">Users</h1>
      <div className="bg-brand-light rounded-2xl border border-white/10 overflow-hidden">
        <table className="w-full">
          <thead className="bg-brand-dark/50">
            <tr className="text-left text-sm text-brand-cream/60">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Joined</th>
              <th className="px-6 py-4">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-brand-cream">{user.name}</td>
                <td className="px-6 py-4 text-brand-cream/60">{user.email}</td>
                <td className="px-6 py-4 text-brand-cream/60">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <form
                    action={`/admin/users/${user.id}/update`}
                    method="POST"
                    className="flex gap-2 items-center"
                  >
                    <select
                      name="role"
                      defaultValue={user.role}
                      disabled={user.id === session.userId}
                      className="rounded-xl bg-brand-dark border border-white/10 px-3 py-2 text-sm text-brand-cream outline-none focus:border-brand-amber"
                    >
                      <option value="customer">customer</option>
                      <option value="admin">admin</option>
                    </select>
                    {user.id !== session.userId && (
                      <button type="submit" className="text-brand-amber hover:underline text-sm">
                        Set
                      </button>
                    )}
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-brand-cream/40 text-sm mt-4">
        You cannot change your own role — no accidental self-lockout.
      </p>
    </div>
  )
}