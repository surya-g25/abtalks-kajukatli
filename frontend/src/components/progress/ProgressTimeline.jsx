import { cn } from '@/utils/cn'

export function ProgressTimeline({
  items = [],
  className,
  ...props
}) {
  return (
    <div className={cn('relative pl-6 border-l border-neutral-800 space-y-6 w-full', className)} {...props}>
      {items.map((item, idx) => {
        const isCompleted = item.status === 'completed'
        const isActive = item.status === 'active'

        return (
          <div key={item.id || idx} className="relative">
            {/* Timeline bullet indicator */}
            <div
              className={cn(
                'absolute -left-[31px] top-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-300',
                isCompleted
                  ? 'bg-emerald-500 border-emerald-500 shadow-md shadow-emerald-500/20'
                  : isActive
                  ? 'bg-amber-500 border-amber-500 ring-4 ring-amber-500/10 shadow-md shadow-amber-500/20'
                  : 'bg-neutral-950 border-neutral-700'
              )}
            >
              {isCompleted && (
                <div className="w-1 h-1 bg-neutral-950 rounded-full" />
              )}
              {isActive && (
                <div className="w-1 h-1 bg-neutral-950 rounded-full" />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <span className={cn(
                  'text-xs font-bold transition-colors',
                  isActive ? 'text-amber-400' : isCompleted ? 'text-white' : 'text-neutral-500'
                )}>
                  {item.label}
                </span>
                {item.description && (
                  <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
              {item.date && (
                <span className="text-[10px] font-mono text-neutral-500 sm:self-center">
                  {item.date}
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProgressTimeline
