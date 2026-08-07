import GlassCard from './GlassCard'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function AnalyticsCard({
  title,
  value,
  subValue,
  data = [], // e.g. [{ label: 'Success Rate', value: '88%' }]
  iconName,
  className,
  ...props
}) {
  return (
    <GlassCard className={cn('p-5 flex flex-col justify-between', className)} {...props}>
      <div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-450 text-neutral-400">{title}</span>
          {iconName && (
            <div className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-amber-400">
              <Icon name={iconName} size={18} />
            </div>
          )}
        </div>
        <div className="mt-3">
          <span className="text-3xl font-black text-white tracking-tight">{value}</span>
          {subValue && (
            <p className="text-xs text-neutral-400 mt-1 font-medium">{subValue}</p>
          )}
        </div>
      </div>

      {data.length > 0 && (
        <div className="mt-5 pt-4 border-t border-neutral-900/60 space-y-2.5">
          {data.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span className="text-neutral-400 font-medium">{item.label}</span>
              <span className="text-white font-mono font-bold">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  )
}

export default AnalyticsCard
