import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'
import LinearProgress from '@/components/progress/LinearProgress'

export function ChallengeRewardPreview({ baseXP = 150, streakBonus = 50, firstTryBonus = 50 }) {
  const totalXP = baseXP + streakBonus + firstTryBonus

  return (
    <GlassCard className="p-6 border border-neutral-800/80 shadow-2xl space-y-5">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <Icon name="Gift" size={18} className="text-amber-400" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Completion Reward Preview</h3>
        </div>
        <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
          +{totalXP} XP Total
        </span>
      </div>

      {/* XP Breakdown pills */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <span className="text-[10px] font-bold text-neutral-400 uppercase block">Base Mission</span>
          <span className="text-base font-mono font-extrabold text-amber-400 mt-0.5 block">+{baseXP} XP</span>
        </div>
        <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <span className="text-[10px] font-bold text-neutral-400 uppercase block">14d Streak</span>
          <span className="text-base font-mono font-extrabold text-emerald-400 mt-0.5 block">+{streakBonus} XP</span>
        </div>
        <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
          <span className="text-[10px] font-bold text-neutral-400 uppercase block">Perfect Score</span>
          <span className="text-base font-mono font-extrabold text-purple-400 mt-0.5 block">+{firstTryBonus} XP</span>
        </div>
      </div>

      {/* Level Progress Impact */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-bold">
          <span className="text-neutral-300">Impact on Level 12 Progress</span>
          <span className="text-amber-400 font-mono">2,450 → 2,700 XP</span>
        </div>
        <LinearProgress progress={2700} total={3000} color="amber" size="md" />
        <span className="text-[10px] text-neutral-400 block text-right font-semibold">
          Only 300 XP remaining to unlock Level 13!
        </span>
      </div>

      {/* Badge Unlock Announcement */}
      <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
          <Icon name="Award" size={20} />
        </div>
        <div className="text-xs">
          <span className="font-extrabold text-amber-300 block">Badge Unlock Alert</span>
          <span className="text-neutral-300">Submitting today unlocks the <strong className="text-white">"Flame Master"</strong> & <strong className="text-white">"Async Ace"</strong> achievement badges.</span>
        </div>
      </div>
    </GlassCard>
  )
}

export default ChallengeRewardPreview
