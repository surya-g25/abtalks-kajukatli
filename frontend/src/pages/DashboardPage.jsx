import PageWrapper from '@/components/layout-primitives/PageWrapper'

export default function DashboardPage() {
  return (
    <PageWrapper title="Dashboard" description="User personal dashboard shell">
      <div className="space-y-4 pt-4">
        <h1 className="text-2xl font-bold text-white">Dashboard Shell</h1>
        <p className="text-sm text-neutral-400">
          User Dashboard Shell Placeholder. Ready for Phase 4 metric and widget integration.
        </p>
      </div>
    </PageWrapper>
  )
}
