'use client'

export default function DeleteProductForm({ productId }: { productId: number }) {
  return (
    <form
      action={`/admin/products/${productId}/delete`}
      method="POST"
      className="inline"
      onSubmit={(e) => {
        if (!confirm('Delete this product?')) {
          e.preventDefault()
        }
      }}
    >
      <button type="submit" className="text-red-400 hover:underline">
        Delete
      </button>
    </form>
  )
}