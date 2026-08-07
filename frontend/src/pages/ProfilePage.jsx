import PageWrapper from '@/components/layout-primitives/PageWrapper'

export default function ProfilePage() {
  return (
    <PageWrapper title="Profile" description="User profile shell">
      <div className="space-y-4 pt-4">
        <h1 className="text-2xl font-bold text-white">Profile Shell</h1>
        <p className="text-sm text-neutral-400">
          User Profile Shell Placeholder. Ready for profile management and user detail views.
        </p>
      </div>
    </PageWrapper>
  )
}
