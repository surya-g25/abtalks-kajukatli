import GlassCard from '@/components/cards/GlassCard'

/**
 * Reusable Pulsing Skeleton Blocks
 */
export function SkeletonBlock({ className = '', height = 'h-4', width = 'w-full' }) {
  return (
    <div
      className={`animate-pulse bg-neutral-800/60 rounded-xl ${height} ${width} ${className}`}
    />
  )
}

/**
 * Generic Card loading state
 */
export function CardSkeleton() {
  return (
    <GlassCard className="p-5 border border-neutral-800/80 space-y-4">
      <div className="flex items-center gap-3">
        <SkeletonBlock height="h-10" width="w-10 animate-pulse bg-neutral-800/80" className="rounded-xl" />
        <div className="space-y-1.5 flex-1">
          <SkeletonBlock height="h-3" width="w-1/3" />
          <SkeletonBlock height="h-2.5" width="w-1/2" />
        </div>
      </div>
      <SkeletonBlock height="h-2" width="w-full" />
      <SkeletonBlock height="h-2" width="w-5/6" />
    </GlassCard>
  )
}

/**
 * Activity Heatmap Skeleton (7 rows x 9 columns)
 */
export function HeatmapSkeleton() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <SkeletonBlock height="h-4" width="w-1/3" />
        <SkeletonBlock height="h-6" width="w-48" />
      </div>
      <div className="grid grid-cols-9 gap-1.5 p-4 rounded-2xl bg-neutral-900/40 border border-neutral-900/60">
        {Array.from({ length: 63 }).map((_, i) => (
          <div key={i} className="aspect-square rounded bg-neutral-800/50 animate-pulse" />
        ))}
      </div>
    </div>
  )
}

/**
 * Leaderboard Rankings Skeleton
 */
export function LeaderboardSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <GlassCard key={i} className="p-4 flex items-center justify-between border border-neutral-900/80">
          <div className="flex items-center gap-3">
            <SkeletonBlock height="h-8" width="w-8" className="rounded-lg" />
            <SkeletonBlock height="h-8" width="w-8" className="rounded-full" />
            <div className="space-y-1.5">
              <SkeletonBlock height="h-3" width="w-24" />
              <SkeletonBlock height="h-2.5" width="w-12" />
            </div>
          </div>
          <SkeletonBlock height="h-5" width="w-16" />
        </GlassCard>
      ))}
    </div>
  )
}

/**
 * Challenges Screen Skeleton
 */
export function ChallengeSkeleton() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <GlassCard className="p-6 border border-neutral-900/80 space-y-4">
        <div className="flex items-center gap-2">
          <SkeletonBlock height="h-5" width="w-24" />
          <SkeletonBlock height="h-5" width="w-16" />
        </div>
        <SkeletonBlock height="h-8" width="w-3/4" />
        <SkeletonBlock height="h-4" width="w-full" />
        <div className="flex gap-4">
          <SkeletonBlock height="h-7" width="w-28" />
          <SkeletonBlock height="h-7" width="w-28" />
        </div>
      </GlassCard>

      {/* Grid details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
        <div className="lg:col-span-1">
          <GlassCard className="p-5 border border-neutral-900/80 space-y-4">
            <SkeletonBlock height="h-4" width="w-1/2" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <SkeletonBlock height="h-4" width="w-4" className="rounded" />
                <SkeletonBlock height="h-3" width="w-5/6" />
              </div>
            ))}
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

/**
 * Full Dashboard View Skeleton
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <GlassCard className="p-6 border border-neutral-900/80 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SkeletonBlock height="h-14" width="w-14" className="rounded-full" />
          <div className="space-y-2">
            <SkeletonBlock height="h-4" width="w-36" />
            <SkeletonBlock height="h-3" width="w-48" />
          </div>
        </div>
        <SkeletonBlock height="h-8" width="w-20" />
      </GlassCard>

      {/* Mission & Streak */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard className="p-6 border border-neutral-900/80 space-y-4">
            <SkeletonBlock height="h-4" width="w-1/4" />
            <SkeletonBlock height="h-6" width="w-3/4" />
            <SkeletonBlock height="h-3" width="w-full" />
            <SkeletonBlock height="h-3" width="w-5/6" />
          </GlassCard>
        </div>
        <div className="lg:col-span-1">
          <GlassCard className="p-6 border border-neutral-900/80 flex flex-col items-center space-y-4">
            <SkeletonBlock height="h-16" width="w-16" className="rounded-2xl" />
            <SkeletonBlock height="h-5" width="w-24" />
            <SkeletonBlock height="h-3" width="w-32" />
          </GlassCard>
        </div>
      </div>

      {/* Level */}
      <CardSkeleton />

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <GlassCard key={i} className="p-4 border border-neutral-900/80 space-y-2">
            <SkeletonBlock height="h-3" width="w-1/2" />
            <SkeletonBlock height="h-6" width="w-2/3" />
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
