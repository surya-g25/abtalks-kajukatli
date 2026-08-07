import PageWrapper from '@/components/layout-primitives/PageWrapper'

export default function LandingPage() {
  return (
    <PageWrapper title="Home" description="ABTalks platform landing page shell">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-3">
        <h1 className="text-3xl font-extrabold text-white">ABTalks Platform</h1>
        <p className="text-sm text-neutral-400 max-w-md">
          Landing Page Shell Placeholder. Ready for Phase 4 design and content implementation.
        </p>
      </div>
    </PageWrapper>
  )
}
