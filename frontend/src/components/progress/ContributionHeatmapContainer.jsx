import { cn } from '@/utils/cn'

export function ContributionHeatmapContainer({
  data = [], // Array of numbers from 0-4 representing intensity, or object { count, level, date }
  cols = 24, // simplified default columns to look great on grids
  rows = 7,
  className,
  ...props
}) {
  // Pre-populate if empty
  const totalCells = cols * rows
  const cells = data.length > 0 ? data.slice(0, totalCells) : Array.from({ length: totalCells }, () => Math.floor(Math.random() * 5))

  const levelColorMap = {
    0: 'bg-neutral-900 border-neutral-950 hover:bg-neutral-800',
    1: 'bg-amber-950/40 border-amber-900/10 hover:bg-amber-950/60',
    2: 'bg-amber-700/30 border-amber-600/10 hover:bg-amber-700/50',
    3: 'bg-amber-500/50 border-amber-500/10 hover:bg-amber-500/70',
    4: 'bg-amber-505 bg-amber-500 border-amber-500/20 hover:bg-amber-400 shadow-md shadow-amber-500/10',
  }

  return (
    <div className={cn('glass-panel p-5 rounded-2xl border border-neutral-800/80 w-full', className)} {...props}>
      <div className="flex items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-bold text-white">Activity Heatmap</span>
          <span className="text-[10px] text-neutral-500 block mt-0.5">Track daily completions & streaks</span>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] font-bold text-neutral-500 select-none">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-neutral-900 border border-neutral-800" />
          <div className="w-2.5 h-2.5 rounded bg-amber-950/40" />
          <div className="w-2.5 h-2.5 rounded bg-amber-700/30" />
          <div className="w-2.5 h-2.5 rounded bg-amber-500/50" />
          <div className="w-2.5 h-2.5 rounded bg-amber-500" />
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-1 scrollbar-none">
        <div
          className="grid gap-1 min-w-[320px] justify-start"
          style={{
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            gridAutoFlow: 'column',
          }}
        >
          {cells.map((val, idx) => {
            const level = typeof val === 'number' ? val : val.level || 0
            const count = typeof val === 'object' ? val.count : undefined
            const date = typeof val === 'object' ? val.date : undefined

            return (
              <div
                key={idx}
                title={date ? `${date}: ${count || 0} contributions` : `Activity level: ${level}`}
                className={cn(
                  'w-3.5 h-3.5 rounded-[3px] border cursor-pointer transition-colors',
                  levelColorMap[level] || levelColorMap[0]
                )}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ContributionHeatmapContainer
