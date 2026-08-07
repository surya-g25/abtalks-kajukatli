import { cn } from '@/utils/cn'

export function ChartContainer({ title, description, actions, children, className, ...props }) {
  return (
    <div className={cn('glass-panel p-5 rounded-2xl border border-neutral-800/80 w-full', className)} {...props}>
      {(title || actions) && (
        <div className="flex items-center justify-between gap-4 mb-5 pb-3 border-b border-neutral-900/60">
          <div>
            {title && <h4 className="text-base font-bold text-white leading-tight">{title}</h4>}
            {description && <p className="text-xs text-neutral-400 mt-1">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      <div className="relative w-full overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export function AnalyticsHeader({ title, stats = [], filters = [], activeFilter, onFilterChange, className, ...props }) {
  return (
    <div className={cn('flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 w-full', className)} {...props}>
      <div>
        {title && <h2 className="text-xl font-extrabold text-white tracking-tight">{title}</h2>}
        {stats.length > 0 && (
          <div className="flex flex-wrap items-center gap-6 mt-3">
            {stats.map((s, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">{s.label}</span>
                <span className="text-lg font-black text-white mt-0.5">{s.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {filters.length > 0 && (
        <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-xl shrink-0 self-start md:self-center">
          {filters.map((f) => {
            const label = typeof f === 'string' ? f : f.label
            const value = typeof f === 'string' ? f : f.value
            const isActive = activeFilter === value

            return (
              <button
                key={value}
                type="button"
                onClick={() => onFilterChange?.(value)}
                className={cn(
                  'px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all',
                  isActive
                    ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/10'
                    : 'text-neutral-400 hover:text-white'
                )}
              >
                {label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function ChartLegend({ items = [], className, ...props }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-400 mt-4', className)} {...props}>
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color || '#f59e0b' }} />
          <span className="text-neutral-300">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export function ChartTooltip({ active, payload, label, formatter, className, ...props }) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className={cn('glass-panel p-3 rounded-xl border border-neutral-800/80 shadow-2xl text-xs space-y-1.5', className)} {...props}>
      {label && <p className="font-bold text-white pb-1 border-b border-neutral-900/60 mb-1">{label}</p>}
      {payload.map((item, idx) => {
        const val = formatter ? formatter(item.value, item.name, item) : item.value
        return (
          <div key={idx} className="flex items-center justify-between gap-4 font-semibold">
            <div className="flex items-center gap-1.5 text-neutral-400">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
              <span>{item.name}</span>
            </div>
            <span className="text-white font-mono font-bold">{val}</span>
          </div>
        )
      })}
    </div>
  )
}

export function ResponsiveChartWrapper({ height = 240, isLoading = false, children, className, ...props }) {
  return (
    <div
      className={cn('relative w-full overflow-hidden flex items-center justify-center', className)}
      style={{ height }}
      {...props}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-950/40 backdrop-blur-[2px] z-20 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  )
}
