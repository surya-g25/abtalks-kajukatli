import { cn } from '@/utils/cn'
import Icon from '@/components/common/Icon'

export function MilestoneProgress({
  milestones = [], // e.g., [{ label: '10 Days', value: 10, xp: 50 }, { label: '30 Days', value: 30, xp: 205 }]
  progress = 0,
  max = 100,
  className,
  ...props
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((progress / max) * 100)))

  return (
    <div className={cn('w-full py-6 px-2 relative', className)} {...props}>
      {/* Progress track line */}
      <div className="relative w-full h-2 bg-neutral-900 rounded-full border border-neutral-800/80">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />

        {/* Milestones markers along the track */}
        {milestones.map((m, idx) => {
          const mPercent = Math.min(100, Math.max(0, (m.value / max) * 100))
          const isReached = progress >= m.value

          return (
            <div
              key={idx}
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${mPercent}%`, top: '50%' }}
            >
              {/* Milestone Indicator Circle */}
              <div
                className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-all duration-300 z-20 bg-neutral-950',
                  isReached
                    ? 'border-amber-500 text-amber-400 shadow-md shadow-amber-500/20'
                    : 'border-neutral-700 text-neutral-500 hover:border-neutral-500'
                )}
              >
                <Icon name={isReached ? 'Gift' : 'Lock'} size={10} />
              </div>

              {/* Hover Tooltip Box */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-8 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 z-30 min-w-[120px] text-center">
                <div className="glass-panel p-2 rounded-xl border border-neutral-800 text-[10px] shadow-xl text-neutral-200">
                  <p className="font-bold text-white leading-tight">{m.label}</p>
                  {m.xp && (
                    <p className="text-amber-400 font-semibold mt-0.5">+{m.xp} XP</p>
                  )}
                  {m.description && (
                    <p className="text-neutral-400 mt-1 leading-snug">{m.description}</p>
                  )}
                </div>
                {/* Tooltip arrow */}
                <div className="w-1.5 h-1.5 bg-neutral-900 border-r border-b border-neutral-800/80 rotate-45 mx-auto -mt-1" />
              </div>

              {/* Label underneath */}
              <span className={cn(
                'absolute left-1/2 -translate-x-1/2 top-7 text-[10px] font-bold tracking-wide whitespace-nowrap select-none',
                isReached ? 'text-amber-400' : 'text-neutral-500'
              )}>
                {m.value}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MilestoneProgress
