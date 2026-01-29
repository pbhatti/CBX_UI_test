export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#F6F6F6]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-[#121212] mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-[#303030] mb-4">
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          className="inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 transition-colors"
        >
          Go back home
        </a>
      </div>
    </div>
  )
}
