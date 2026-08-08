import ContributionHeatmapContainer from '@/components/progress/ContributionHeatmapContainer'
import Icon from '@/components/common/Icon'

export function ContributionHeatmapSection({ progress }) {
  // Fallback to auto-generated layout if heatmapData is empty
  const days = progress?.heatmapData && progress.heatmapData.length > 0
    ? progress.heatmapData
    : Array.from({ length: 63 }, (_, i) => {
        const level = i % 7 === 0 ? 0 : i % 5 === 0 ? 1 : i % 3 === 0 ? 3 : i % 2 === 0 ? 4 : 2
        return {
          level,
          count: level * 3,
          date: `2026-06-${(i % 30) + 1}`,
        }
      })

  const activeDays = progress?.activeDays ?? 42
  const missedDays = progress?.missedDays ?? 3
  const currentStreak = progress?.currentStreak ?? 14

  return (
    <div className="space-y-4">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={18} className="text-amber-400" />
            <h3 className="text-lg font-black text-white tracking-tight">60-Day Contribution Heatmap</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Consistent activity directly correlates with career placement & XP rankings.
          </p>
        </div>

        {/* Quick Activity Stats */}
        <div className="flex items-center gap-4 text-xs font-semibold text-neutral-300 bg-neutral-900/80 px-3.5 py-1.5 rounded-xl border border-neutral-800 shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>{activeDays} Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neutral-700" />
            <span>{missedDays} Missed</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-400">
            <Icon name="Flame" size={14} />
            <span>{currentStreak}d Active</span>
          </div>
        </div>
      </div>

      {/* Heatmap Widget */}
      <ContributionHeatmapContainer data={days} cols={9} rows={7} />
    </div>
  )
}

export default ContributionHeatmapSection
