import { cn } from '@/utils/cn'

export function LinearProgress({
  progress = 0,
  total = 100,
  showValue = false,
  unit = '%',
  label,
  size = 'md',
  color = 'amber', // 'amber' | 'emerald' | 'rose' | 'sky' | 'indigo'
  className,
  ...props
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((progress / total) * 100)))

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  const colorClasses = {
    amber: 'from-amber-500 to-amber-450 bg-amber-500/10 text-amber-400',
    emerald: 'from-emerald-500 to-emerald-450 bg-emerald-500/10 text-emerald-400',
    rose: 'from-rose-500 to-rose-450 bg-rose-500/10 text-rose-455 text-red-400',
    sky: 'from-sky-500 to-sky-450 bg-sky-500/10 text-sky-400',
    indigo: 'from-indigo-500 to-indigo-450 bg-indigo-500/10 text-indigo-400',
  }

  const textColors = {
    amber: 'text-amber-400',
    emerald: 'text-emerald-450 text-emerald-400',
    rose: 'text-rose-400',
    sky: 'text-sky-455 text-sky-400',
    indigo: 'text-indigo-400',
  }

  return (
    <div className={cn('w-full', className)} {...props}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs font-bold text-neutral-400 mb-1.5">
          {label && <span className="text-neutral-300">{label}</span>}
          {showValue && (
            <span className={cn(textColors[color] || 'text-amber-400')}>
              {progress} / {total} {unit}
            </span>
          )}
        </div>
      )}
      <div className={cn('w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-800/80', sizeClasses[size])}>
        <div
          className={cn(
            'h-full transition-all duration-500 rounded-full bg-gradient-to-r',
            colorClasses[color]?.split(' ')[0] + ' ' + colorClasses[color]?.split(' ')[1]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default LinearProgress
