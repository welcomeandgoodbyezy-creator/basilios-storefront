'use client'

export default function ConfirmDeleteForm({ action, label = 'item' }: { action: string; label?: string }) {
  return (
    <form
      action={action}
      method="POST"
      className="inline"
      onSubmit={(e) => {
        if (!confirm(`Delete this ${label}?`)) e.preventDefault()
      }}
    >
      <button type="submit" className="text-red-400 hover:underline">
        Delete
      </button>
    </form>
  )
}