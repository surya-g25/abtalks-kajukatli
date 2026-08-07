import GlassCard from './GlassCard'
import Icon from '@/components/common/Icon'
import Badge from '@/components/ui/Badge'

export function MissionCard({
  title,
  description,
  xpReward,
  progress = 0,
  target = 1,
  status = 'active', // 'active' | 'completed' | 'locked'
  onClick,
  className,
  ...props
}) {
  const isCompleted = status === 'completed'
  const isLocked = status === 'locked'
  const percentage = Math.min(100, Math.max(0, Math.round((progress / target) * 100)))

  return (
    <GlassCard
      onClick={!isLocked ? onClick : undefined}
      hoverEffect={!isLocked}
      className={className}
      {...props}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl border shrink-0 transition-colors ${
              isCompleted
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                : isLocked
                ? 'bg-neutral-900 border-neutral-800 text-neutral-600'
                : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
            }`}
          >
            <Icon name={isCompleted ? 'CheckCircle2' : isLocked ? 'Lock' : 'Target'} size={22} />
          </div>
          <div>
            <h4 className={`text-base font-bold transition-colors ${isLocked ? 'text-neutral-500' : 'text-white'}`}>
              {title}
            </h4>
            {xpReward && !isLocked && (
              <span className="text-xs font-semibold text-amber-400">+{xpReward} XP</span>
            )}
          </div>
        </div>
        <Badge
          variant={isCompleted ? 'success' : isLocked ? 'neutral' : 'warning'}
          className="uppercase text-[10px]"
        >
          {status}
        </Badge>
      </div>

      {description && (
        <p className={`text-xs mt-3 leading-relaxed ${isLocked ? 'text-neutral-600' : 'text-neutral-400'}`}>
          {description}
        </p>
      )}

      {!isLocked && (
        <div className="mt-4">
          <div className="flex justify-between items-center text-[11px] font-bold text-neutral-400 mb-1.5">
            <span>Progress</span>
            <span>
              {progress}/{target}
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800/80">
            <div
              className={`h-full transition-all duration-500 rounded-full bg-gradient-to-r ${
                isCompleted ? 'from-emerald-500 to-teal-400' : 'from-amber-500 to-yellow-400'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </GlassCard>
  )
}

export default MissionCard
