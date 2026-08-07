import PageWrapper from '@/components/layout-primitives/PageWrapper'

export default function SettingsPage() {
  return (
    <PageWrapper title="Settings" description="User settings shell">
      <div className="space-y-4 pt-4">
        <h1 className="text-2xl font-bold text-white">Settings Shell</h1>
        <p className="text-sm text-neutral-400">
          Settings Shell Placeholder. Ready for account preferences and notification settings.
        </p>
      </div>
    </PageWrapper>
  )
}
