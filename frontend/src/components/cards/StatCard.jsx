import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'
import Icon from '@/components/common/Icon'

export function StatCard({ title, value, change, isPositive = true, iconName, className }) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={cn(
        'glass-panel p-5 rounded-2xl border border-neutral-800/80 hover:border-neutral-700 transition-all shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">{title}</span>
        {iconName && (
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <Icon name={iconName} size={20} />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{value}</span>
        {change && (
          <span
            className={cn(
              'text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1',
              isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
            )}
          >
            <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={14} />
            {change}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default StatCard
