import GlassCard from './GlassCard'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function MetricCard({
  title,
  value,
  subValue,
  change,
  isPositive = true,
  iconName,
  status,
  className,
  ...props
}) {
  return (
    <GlassCard className={cn('p-5 flex flex-col justify-between', className)} {...props}>
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">{title}</span>
          {iconName && (
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400">
              <Icon name={iconName} size={18} />
            </div>
          )}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{value}</span>
          {change && (
            <span
              className={cn(
                'text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5',
                isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
              )}
            >
              <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={12} />
              {change}
            </span>
          )}
        </div>
      </div>

      {(subValue || status) && (
        <div className="mt-4 pt-3 border-t border-neutral-900/60 flex items-center justify-between text-xs text-neutral-500 font-semibold">
          <span>{subValue}</span>
          {status && (
            <span className="text-amber-500 font-bold">{status}</span>
          )}
        </div>
      )}
    </GlassCard>
  )
}

export default MetricCard
