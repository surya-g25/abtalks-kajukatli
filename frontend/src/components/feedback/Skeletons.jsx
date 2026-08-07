import Skeleton from './Skeleton'

export function CardSkeleton({ className, ...props }) {
  return (
    <div className={`glass-panel p-5 rounded-2xl border border-neutral-800 space-y-4 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>
      <Skeleton className="h-7 w-1/2" />
      <Skeleton className="h-3 w-5/6" />
    </div>
  )
}

export function ChartSkeleton({ className, ...props }) {
  return (
    <div className={`glass-panel p-5 rounded-2xl border border-neutral-800 space-y-4 w-full ${className}`} {...props}>
      <div className="flex justify-between items-center mb-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <Skeleton className="h-8 w-20 rounded-lg" />
      </div>
      {/* Mock chart grid and bars */}
      <div className="h-44 w-full flex items-end gap-2 pt-6 border-b border-neutral-800 border-l border-neutral-800/40 px-2">
        <Skeleton className="h-1/3 flex-1 rounded-t-md" />
        <Skeleton className="h-2/3 flex-1 rounded-t-md" />
        <Skeleton className="h-1/2 flex-1 rounded-t-md" />
        <Skeleton className="h-4/5 flex-1 rounded-t-md" />
        <Skeleton className="h-3/5 flex-1 rounded-t-md" />
        <Skeleton className="h-1/4 flex-1 rounded-t-md" />
        <Skeleton className="h-full flex-1 rounded-t-md bg-amber-500/20" />
      </div>
    </div>
  )
}

export function ListSkeleton({ count = 3, className, ...props }) {
  return (
    <div className={`space-y-3 w-full ${className}`} {...props}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex items-center justify-between p-3.5 glass-panel rounded-xl border border-neutral-800">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full" />
            <div className="space-y-1.5">
              <Skeleton className="h-3.5 w-24" />
              <Skeleton className="h-2.5 w-16" />
            </div>
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  )
}

export function ProfileSkeleton({ className, ...props }) {
  return (
    <div className={`glass-panel p-6 rounded-2xl border border-neutral-800 text-center flex flex-col items-center space-y-4 ${className}`} {...props}>
      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="space-y-2 w-full flex flex-col items-center">
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-4 w-1/5 rounded-full" />
      </div>
      <div className="w-full space-y-1.5">
        <Skeleton className="h-2.5 w-5/6 mx-auto" />
        <Skeleton className="h-2.5 w-4/6 mx-auto" />
      </div>
    </div>
  )
}

export function LeaderboardSkeleton({ count = 5, className, ...props }) {
  return (
    <div className={`space-y-3 w-full ${className}`} {...props}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex items-center justify-between p-4 glass-panel rounded-xl border border-neutral-800">
          <div className="flex items-center gap-3.5">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
          <Skeleton className="h-3.5 w-12" />
        </div>
      ))}
    </div>
  )
}

export function ChallengeSkeleton({ className, ...props }) {
  return (
    <div className={`glass-panel p-5 rounded-2xl border border-neutral-800 flex flex-col justify-between min-h-[220px] ${className}`} {...props}>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
      </div>
      <div className="flex items-center justify-between border-t border-neutral-900/60 pt-4 mt-6">
        <div className="flex gap-4">
          <Skeleton className="h-3.5 w-14" />
          <Skeleton className="h-3.5 w-12" />
        </div>
        <Skeleton className="h-7 w-16 rounded-md" />
      </div>
    </div>
  )
}

export function DashboardSkeleton({ className, ...props }) {
  return (
    <div className={`space-y-6 w-full ${className}`} {...props}>
      {/* 3 cards top */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
      {/* Large chart + sidebar list layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartSkeleton />
        </div>
        <div>
          <ListSkeleton count={4} />
        </div>
      </div>
    </div>
  )
}
