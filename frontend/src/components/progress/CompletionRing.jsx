import CircularProgress from './CircularProgress'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function CompletionRing({
  progress = 0,
  total = 100,
  iconName = 'Check',
  size = 70,
  strokeWidth = 7,
  color = 'emerald',
  className,
  ...props
}) {
  const isCompleted = progress >= total

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} {...props}>
      <CircularProgress
        progress={progress}
        total={total}
        size={size}
        strokeWidth={strokeWidth}
        showValue={false}
        color={color}
      />
      <div className="absolute flex items-center justify-center">
        {iconName ? (
          <div className={cn(
            'transition-colors',
            isCompleted
              ? color === 'emerald' ? 'text-emerald-400' : 'text-amber-400'
              : 'text-neutral-500'
          )}>
            <Icon name={iconName} size={size * 0.35} />
          </div>
        ) : (
          <span className="text-[10px] font-black text-white">
            {Math.round((progress / total) * 100)}%
          </span>
        )}
      </div>
    </div>
  )
}

export default CompletionRing
