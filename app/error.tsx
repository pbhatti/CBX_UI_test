"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F6F6F6]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#121212] mb-4">
          Something went wrong!
        </h2>
        <p className="text-[#303030] mb-4">{error.message}</p>
        <button
          onClick={reset}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
