import GlassCard from './GlassCard'

export function ProgressCard({ title, progress = 0, total = 100, unit = '%', className }) {
  const percentage = Math.min(100, Math.max(0, Math.round((progress / total) * 100)))

  return (
    <GlassCard className={className}>
      <div className="flex items-center justify-between text-sm font-semibold mb-2">
        <span className="text-neutral-300">{title}</span>
        <span className="text-amber-400 font-bold">
          {progress} / {total} {unit}
        </span>
      </div>
      <div className="w-full h-2.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </GlassCard>
  )
}

export default ProgressCard
