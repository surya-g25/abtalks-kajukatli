import LinearProgress from './LinearProgress'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function XPProgress({
  currentXp = 0,
  targetXp = 1000,
  level = 1,
  className,
  ...props
}) {
  const xpNeeded = Math.max(0, targetXp - currentXp)

  return (
    <div className={cn('glass-panel p-5 rounded-2xl border border-neutral-800/80 w-full', className)} {...props}>
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
            <Icon name="Zap" size={18} />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">Current Level</span>
            <span className="text-base font-extrabold text-white">Lv. {level}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">XP Earned</span>
          <span className="text-sm font-mono font-bold text-amber-400">
            {currentXp} <span className="text-neutral-500">/ {targetXp} XP</span>
          </span>
        </div>
      </div>

      <LinearProgress
        progress={currentXp}
        total={targetXp}
        color="amber"
        size="md"
      />

      {xpNeeded > 0 && (
        <div className="mt-2.5 text-[10px] font-semibold text-neutral-500 flex items-center gap-1">
          <Icon name="Info" size={12} className="text-neutral-600" />
          <span>{xpNeeded} XP remaining to Level {level + 1}</span>
        </div>
      )}
    </div>
  )
}

export default XPProgress
