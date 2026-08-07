import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function TimelineItem({
  title,
  description,
  date,
  iconName = 'Circle',
  status = 'pending', // 'completed' | 'active' | 'pending'
  layout = 'vertical',
  className,
  ...props
}) {
  const isVertical = layout === 'vertical'
  const isCompleted = status === 'completed'
  const isActive = status === 'active'

  return (
    <div
      className={cn(
        'relative flex-1 group',
        isVertical ? 'w-full' : 'min-w-[200px] pt-4',
        className
      )}
      {...props}
    >
      {/* Node indicator */}
      <div
        className={cn(
          'absolute rounded-full border-2 flex items-center justify-center transition-all duration-300 bg-neutral-950 z-10',
          isVertical
            ? 'top-1 -left-[25px] sm:-left-[33px] w-4 h-4 sm:w-5 sm:h-5'
            : '-top-[9px] left-4 w-4 h-4 sm:w-5 sm:h-5',
          isCompleted
            ? 'border-emerald-500 text-emerald-400 shadow-md shadow-emerald-500/10'
            : isActive
            ? 'border-amber-500 text-amber-400 ring-4 ring-amber-500/15 shadow-md shadow-amber-500/15'
            : 'border-neutral-700 text-neutral-600'
        )}
      >
        <Icon name={isCompleted ? 'Check' : iconName} size={isVertical ? 10 : 9} />
      </div>

      {/* Date */}
      {date && (
        <span className="text-[10px] font-mono font-bold text-neutral-500 block mb-1 select-none">
          {date}
        </span>
      )}

      {/* Heading */}
      <h4
        className={cn(
          'text-sm font-bold transition-colors leading-tight',
          isActive ? 'text-amber-400' : isCompleted ? 'text-white' : 'text-neutral-555 text-neutral-500'
        )}
      >
        {title}
      </h4>

      {/* Description */}
      {description && (
        <p className={cn(
          'text-xs mt-1 leading-relaxed',
          isActive || isCompleted ? 'text-neutral-400' : 'text-neutral-550 text-neutral-500'
        )}>
          {description}
        </p>
      )}
    </div>
  )
}

export default TimelineItem
