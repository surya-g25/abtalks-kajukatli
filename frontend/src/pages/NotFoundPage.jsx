import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-4">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold tracking-tight text-neutral-200">404</h1>
        <p className="text-lg text-neutral-400">Page not found</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-neutral-800 text-sm font-medium rounded hover:bg-neutral-700 transition"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}
