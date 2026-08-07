import GlassCard from './GlassCard'
import Icon from '@/components/common/Icon'
import Button from '@/components/ui/Button'

export function ChallengeCard({
  title,
  description,
  difficulty = 'medium',
  xpReward,
  duration,
  participants,
  status = 'start', // 'start' | 'in_progress' | 'completed' | 'locked'
  category,
  onClick,
  className,
  ...props
}) {
  const isLocked = status === 'locked'

  const difficultyColors = {
    easy: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    hard: 'bg-red-500/10 text-red-400 border-red-500/20',
    expert: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  }

  return (
    <GlassCard
      onClick={!isLocked ? onClick : undefined}
      hoverEffect={!isLocked}
      className={`flex flex-col justify-between min-h-[220px] ${className}`}
      {...props}
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          {category && (
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-500">
              {category}
            </span>
          )}
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wide ${
                difficultyColors[difficulty.toLowerCase()] || difficultyColors.medium
              }`}
            >
              {difficulty}
            </span>
          </div>
        </div>

        <h4 className={`mt-3 text-lg font-bold tracking-tight leading-snug ${isLocked ? 'text-neutral-500' : 'text-white'}`}>
          {title}
        </h4>

        {description && (
          <p className="mt-2 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-neutral-900/60 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400">
          {xpReward && (
            <span className="flex items-center gap-1 text-amber-400">
              <Icon name="Zap" size={14} />
              {xpReward} XP
            </span>
          )}
          {duration && (
            <span className="flex items-center gap-1">
              <Icon name="Clock" size={14} />
              {duration}
            </span>
          )}
          {participants !== undefined && (
            <span className="flex items-center gap-1">
              <Icon name="Users" size={14} />
              {participants}
            </span>
          )}
        </div>

        <div>
          {isLocked ? (
            <div className="p-2 bg-neutral-900 text-neutral-600 rounded-lg">
              <Icon name="Lock" size={16} />
            </div>
          ) : status === 'completed' ? (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400">
              <Icon name="CheckCircle2" size={16} />
              Completed
            </span>
          ) : (
            <Button
              variant={status === 'in_progress' ? 'outline' : 'primary'}
              size="sm"
              className="font-bold py-1.5"
            >
              {status === 'in_progress' ? 'Continue' : 'Start'}
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

export default ChallengeCard
