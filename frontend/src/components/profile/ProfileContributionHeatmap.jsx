import { useState } from 'react'
import ContributionHeatmapContainer from '@/components/progress/ContributionHeatmapContainer'
import Icon from '@/components/common/Icon'

export function ProfileContributionHeatmap() {
  const [timeframe, setTimeframe] = useState('60d')

  // Generate 60 days of contribution matrix cells
  const daysData = Array.from({ length: 63 }, (_, i) => {
    const level = i % 7 === 0 ? 0 : i % 5 === 0 ? 1 : i % 3 === 0 ? 3 : i % 2 === 0 ? 4 : 2
    return {
      level,
      count: level * 2 + 1,
      date: `2026-06-${(i % 30) + 1}`,
    }
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={18} className="text-amber-400" />
            <h3 className="text-lg font-black text-white tracking-tight">GitHub-Inspired Contribution Matrix</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Verified commit pushes & challenge activity logged across the cohort.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-xl shrink-0 self-start sm:self-center">
          {['30d', '60d', '90d'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition ${
                timeframe === t
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <ContributionHeatmapContainer data={daysData} cols={9} rows={7} />
    </div>
  )
}

export default ProfileContributionHeatmap
