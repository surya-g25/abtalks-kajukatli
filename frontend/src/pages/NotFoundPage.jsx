import { Link } from 'react-router-dom'
import PageWrapper from '@/components/layout-primitives/PageWrapper'
import Icon from '@/components/common/Icon'
import Button from '@/components/ui/Button'

export default function NotFoundPage() {
  return (
    <PageWrapper
      title="Page Not Found"
      description="The requested link is broken or does not exist."
    >
      <div className="relative flex flex-col items-center justify-center min-h-[65vh] text-center px-4 overflow-hidden rounded-3xl border border-neutral-900 bg-neutral-950/60 p-8 sm:p-12 shadow-2xl">
        {/* Decorative Grid Mesh Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 text-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/5">
            <Icon name="AlertTriangle" size={28} className="stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-7xl font-black text-white tracking-tighter">404</h1>
            <h2 className="text-lg font-bold text-neutral-200">Lost in Cyberspace</h2>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed font-semibold">
              The page you are looking for does not exist, has been archived, or moved to a private repository.
            </p>
          </div>

          <div className="pt-2">
            <Link to="/dashboard">
              <Button variant="primary" size="md" className="font-extrabold gap-2">
                <Icon name="ArrowLeft" size={15} />
                <span>Return to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}
