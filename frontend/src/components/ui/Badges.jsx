import Badge from './Badge'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function XPBadge({ amount = 0, className, ...props }) {
  return (
    <Badge
      variant="gradient"
      icon={<Icon name="Zap" size={12} className="text-amber-400" />}
      className={cn('font-mono font-bold select-none', className)}
      {...props}
    >
      +{amount} XP
    </Badge>
  )
}

export function LevelBadge({ level = 1, tier = 'Bronze', className, ...props }) {
  const tierColor = {
    Bronze: 'border-amber-700 bg-amber-700/10 text-amber-500',
    Silver: 'border-neutral-400 bg-neutral-400/10 text-neutral-350 text-neutral-300',
    Gold: 'border-amber-550 border-amber-500 bg-amber-500/10 text-amber-400',
    Platinum: 'border-sky-550 border-sky-500 bg-sky-500/10 text-sky-400',
    Diamond: 'border-indigo-550 border-indigo-500 bg-indigo-500/10 text-indigo-400',
  }

  return (
    <Badge
      variant="neutral"
      icon={<Icon name="Award" size={12} />}
      className={cn('font-bold tracking-wide select-none', tierColor[tier] || tierColor.Bronze, className)}
      {...props}
    >
      Lv. {level}
    </Badge>
  )
}

export function AchievementBadge({ label, unlocked = false, className, ...props }) {
  return (
    <Badge
      variant={unlocked ? 'gradient' : 'neutral'}
      icon={<Icon name={unlocked ? 'Trophy' : 'Lock'} size={12} />}
      className={cn('font-bold tracking-wide select-none', !unlocked && 'opacity-60', className)}
      {...props}
    >
      {label}
    </Badge>
  )
}

export function StreakBadge({ count = 0, className, ...props }) {
  return (
    <Badge
      variant="gradient"
      icon={<Icon name="Flame" size={12} className="text-orange-500 animate-pulse" />}
      className={cn('font-mono font-bold border-orange-500/30 text-orange-400 select-none', className)}
      {...props}
    >
      {count} Days
    </Badge>
  )
}

export function RankBadge({ rank, className, ...props }) {
  const isTopThree = typeof rank === 'number' && rank <= 3
  const rankStyle = {
    1: 'bg-amber-500 border-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 font-black',
    2: 'bg-neutral-300 border-neutral-300 text-neutral-950 font-extrabold',
    3: 'bg-amber-700 border-amber-700 text-white font-extrabold',
  }

  return (
    <Badge
      variant="neutral"
      icon={<Icon name="Crown" size={12} />}
      className={cn(
        'font-bold tracking-wide select-none',
        isTopThree ? rankStyle[rank] : 'bg-neutral-800 text-neutral-300 border-neutral-700',
        className
      )}
      {...props}
    >
      {typeof rank === 'number' ? `#${rank}` : rank}
    </Badge>
  )
}

export function DifficultyBadge({ difficulty = 'medium', className, ...props }) {
  const cleanDifficulty = difficulty.toLowerCase()
  const variants = {
    easy: 'success',
    medium: 'warning',
    hard: 'error',
    expert: 'gradient',
  }

  return (
    <Badge
      variant={variants[cleanDifficulty] || 'warning'}
      className={cn('uppercase text-[10px] tracking-wider font-extrabold select-none', className)}
      {...props}
    >
      {difficulty}
    </Badge>
  )
}

export function StatusBadge({ status = 'active', className, ...props }) {
  const cleanStatus = status.toLowerCase()

  const statusConfig = {
    active: { variant: 'info', icon: 'Clock' },
    completed: { variant: 'success', icon: 'CheckCircle2' },
    in_progress: { variant: 'warning', icon: 'Activity' },
    locked: { variant: 'neutral', icon: 'Lock' },
    pending: { variant: 'neutral', icon: 'HelpCircle' },
  }

  const config = statusConfig[cleanStatus] || statusConfig.pending

  return (
    <Badge
      variant={config.variant}
      icon={<Icon name={config.icon} size={11} />}
      className={cn('uppercase text-[10px] tracking-wider font-bold select-none', className)}
      {...props}
    >
      {status.replace('_', ' ')}
    </Badge>
  )
}
