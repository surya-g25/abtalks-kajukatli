import GlassCard from './GlassCard'

export function LoadingCard({ className }) {
  return (
    <GlassCard className={`animate-pulse space-y-4 ${className}`}>
      <div className="h-4 bg-neutral-800 rounded w-1/3" />
      <div className="h-8 bg-neutral-800 rounded w-2/3" />
      <div className="h-3 bg-neutral-800/60 rounded w-full" />
    </GlassCard>
  )
}

export default LoadingCard
