import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'
import LinearProgress from '@/components/progress/LinearProgress'

export function DeveloperIdentityCard({
  level = 12,
  currentXp = 2450,
  targetXp = 3000,
  completionRate = 94,
  consistencyScore = 96,
  overallRank = 4,
  profileCompletion = 100,
}) {
  const percentage = Math.round((currentXp / targetXp) * 100)

  return (
    <GlassCard className="p-6 border border-neutral-800/80 shadow-2xl space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <Icon name="Shield" size={18} className="text-amber-400" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Developer Identity Summary</h3>
        </div>
        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
          Level {level} Verified
        </span>
      </div>

      {/* Main XP Progress to Next Level */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-neutral-300">Level {level} → Level {level + 1} Progress</span>
          <span className="text-amber-400 font-mono">
            {currentXp} / {targetXp} XP ({percentage}%)
          </span>
        </div>
        <LinearProgress progress={currentXp} total={targetXp} color="amber" size="md" />
        <span className="text-[10px] text-neutral-400 block text-right font-semibold">
          {targetXp - currentXp} XP to level promotion
        </span>
      </div>

      {/* Identity Metric Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
        <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">Overall Rank</span>
          <span className="text-xl font-black text-white font-mono mt-1 block">#{overallRank}</span>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">Completion %</span>
          <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">{completionRate}%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">Consistency</span>
          <span className="text-xl font-black text-amber-400 font-mono mt-1 block">{consistencyScore}%</span>
        </div>

        <div className="p-3.5 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">Profile Setup</span>
          <span className="text-xl font-black text-purple-400 font-mono mt-1 block">{profileCompletion}%</span>
        </div>
      </div>
    </GlassCard>
  )
}

export default DeveloperIdentityCard
