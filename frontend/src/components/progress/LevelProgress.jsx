import LinearProgress from './LinearProgress'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function LevelProgress({
  tier = 'Bronze',
  points = 0,
  nextTier = 'Silver',
  pointsToNextTier = 500,
  progress = 0,
  className,
  ...props
}) {
  const tierColors = {
    Bronze: 'text-amber-700 bg-amber-700/10 border-amber-700/20',
    Silver: 'text-neutral-300 bg-neutral-300/10 border-neutral-300/20',
    Gold: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    Platinum: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
    Diamond: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20',
  }

  return (
    <div className={cn('glass-panel p-5 rounded-2xl border border-neutral-800/80 w-full', className)} {...props}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">Rank League</span>
          <span className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-extrabold border mt-1 select-none',
            tierColors[tier] || tierColors.Bronze
          )}>
            <Icon name="Award" size={16} />
            {tier}
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">Accumulated Points</span>
          <span className="text-xl font-black text-white font-mono">{points} <span className="text-xs text-neutral-500 font-semibold">pts</span></span>
        </div>
      </div>

      <LinearProgress
        progress={progress}
        total={100}
        color={tier === 'Gold' || tier === 'Bronze' ? 'amber' : tier === 'Platinum' ? 'sky' : tier === 'Diamond' ? 'indigo' : 'sky'}
        size="md"
      />

      {pointsToNextTier > 0 && nextTier && (
        <div className="mt-3 flex justify-between items-center text-[10px] font-semibold text-neutral-500">
          <span>Progress to {nextTier} League</span>
          <span className="text-neutral-400">{pointsToNextTier} pts remaining</span>
        </div>
      )}
    </div>
  )
}

export default LevelProgress
