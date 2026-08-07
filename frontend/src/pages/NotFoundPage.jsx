import { Link } from 'react-router-dom'
import PageWrapper from '@/components/layout-primitives/PageWrapper'

export default function NotFoundPage() {
  return (
    <PageWrapper title="404 Page Not Found" description="The requested route does not exist.">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <h1 className="text-6xl font-extrabold text-neutral-200 tracking-tight">404</h1>
        <p className="text-base text-neutral-400">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded-xl transition shadow-lg shadow-amber-500/20"
        >
          Back to Home
        </Link>
      </div>
    </PageWrapper>
  )
}
