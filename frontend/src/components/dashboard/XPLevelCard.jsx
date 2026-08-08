import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'
import LinearProgress from '@/components/progress/LinearProgress'

export function XPLevelCard({
  level = 12,
  currentXp = 2450,
  xpInCurrentLevel = 850,
  xpForNextLevel = 1000,
  title = 'Code Alchemist',
}) {
  const percentage = Math.round((xpInCurrentLevel / xpForNextLevel) * 100)
  const xpNeeded = xpForNextLevel - xpInCurrentLevel

  const xpSources = [
    { label: 'Challenges', xp: '1,400 XP', color: 'bg-amber-400' },
    { label: 'Commits', xp: '600 XP', color: 'bg-emerald-400' },
    { label: 'LinkedIn', xp: '300 XP', color: 'bg-blue-400' },
    { label: 'Streaks', xp: '150 XP', color: 'bg-purple-400' },
  ]

  return (
    <GlassCard className="relative overflow-hidden border border-neutral-800/80 p-6 flex flex-col justify-between shadow-2xl">
      {/* Background subtle glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Level & Rank Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            {/* Level Emblem Badge */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 via-amber-500 to-yellow-400 p-0.5 shadow-lg shadow-amber-500/20 shrink-0">
              <div className="w-full h-full bg-neutral-950 rounded-[14px] flex flex-col items-center justify-center">
                <span className="text-[9px] font-extrabold uppercase text-amber-400">Level</span>
                <span className="text-xl font-black text-white leading-none">{level}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">
                Rank Emblem
              </span>
              <h3 className="text-lg font-black text-white tracking-tight">{title}</h3>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">
              Total XP
            </span>
            <span className="text-xl font-mono font-black text-amber-400">
              {currentXp.toLocaleString()} <span className="text-xs text-neutral-400 font-sans">XP</span>
            </span>
          </div>
        </div>

        {/* XP Progress to Next Level */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs font-bold text-neutral-300 mb-2">
            <span>Progress to Level {level + 1}</span>
            <span className="text-amber-400 font-mono">
              {xpInCurrentLevel} / {xpForNextLevel} XP ({percentage}%)
            </span>
          </div>
          <LinearProgress progress={xpInCurrentLevel} total={xpForNextLevel} color="amber" size="md" />
          <p className="text-[11px] text-neutral-400 mt-2 flex items-center gap-1.5 font-semibold">
            <Icon name="Zap" size={13} className="text-amber-400" />
            <span>Only {xpNeeded} XP remaining to unlock Level {level + 1}!</span>
          </p>
        </div>
      </div>

      {/* XP Source Breakdown Pills */}
      <div className="mt-6 pt-4 border-t border-neutral-800/80">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-2.5">
          XP Earnings Breakdown
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {xpSources.map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[11px] font-semibold text-neutral-300">{item.label}</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-amber-400">{item.xp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Next Unlock Banner */}
      <div className="mt-4 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300 shrink-0">
          <Icon name="Lock" size={16} />
        </div>
        <div className="text-xs">
          <span className="font-extrabold text-purple-300 block">Level {level + 1} Unlock Preview</span>
          <span className="text-neutral-400">Unlocks "Custom Dashboard Themes" & "+500 Bonus XP"</span>
        </div>
      </div>
    </GlassCard>
  )
}

export default XPLevelCard
