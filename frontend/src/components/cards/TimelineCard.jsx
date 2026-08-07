import GlassCard from './GlassCard'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function TimelineCard({
  title,
  subtitle,
  date,
  description,
  iconName = 'Circle',
  status = 'pending', // 'completed' | 'active' | 'pending'
  className,
  ...props
}) {
  const statusBorderColor = {
    completed: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5',
    active: 'border-amber-500/35 text-amber-400 bg-amber-500/5 shadow-lg shadow-amber-500/5',
    pending: 'border-neutral-800 text-neutral-500 bg-neutral-900',
  }

  return (
    <GlassCard
      className={cn(
        'relative border-l-4 transition-all duration-200',
        status === 'active'
          ? 'border-l-amber-500 border border-amber-500/20'
          : status === 'completed'
          ? 'border-l-emerald-500 border border-emerald-500/20'
          : 'border-l-neutral-700 border border-neutral-800/80',
        className
      )}
      {...props}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-lg border shrink-0', statusBorderColor[status])}>
            <Icon name={iconName} size={16} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white leading-tight">{title}</h4>
            {subtitle && (
              <span className="text-xs font-semibold text-neutral-400">{subtitle}</span>
            )}
          </div>
        </div>
        {date && (
          <span className="text-[11px] font-mono font-bold text-neutral-500 bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-full shrink-0 self-start sm:self-center">
            {date}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-neutral-405 text-neutral-400 leading-relaxed pl-1">
          {description}
        </p>
      )}
    </GlassCard>
  )
}

export default TimelineCard
