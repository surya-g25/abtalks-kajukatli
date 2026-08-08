import Icon from '@/components/common/Icon'
import Badge from '@/components/ui/Badge'
import GlassCard from '@/components/cards/GlassCard'
import CompletionRing from '@/components/progress/CompletionRing'

export function ChallengeHero({
  dayNumber = 14,
  title = 'Build a Custom Hook for Async Data Fetching with Auto-retry',
  category = 'React & Async Logic',
  difficulty = 'Intermediate',
  timeEstimate = '45 mins',
  xpReward = 150,
  progress = 80,
}) {
  return (
    <GlassCard className="relative overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/30 p-6 sm:p-8 shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20">
              Day {dayNumber} Mission
            </span>
            <Badge variant="warning" className="text-xs font-bold">
              {category}
            </Badge>
            <Badge variant="info" className="text-xs font-bold">
              ⚡ {difficulty}
            </Badge>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
            {title}
          </h1>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Master async lifecycle state management, exponential backoff strategy, cancellation tokens, and automated retry error handling in modern React applications.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-400 pt-2">
            <div className="flex items-center gap-2 bg-neutral-950/70 px-3.5 py-2 rounded-xl border border-neutral-800">
              <Icon name="Clock" size={16} className="text-amber-400" />
              <span>Est. Time: <strong className="text-white">{timeEstimate}</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-950/70 px-3.5 py-2 rounded-xl border border-neutral-800">
              <Icon name="Zap" size={16} className="text-amber-400" />
              <span>Reward: <strong className="text-amber-400 font-mono">+{xpReward} XP</strong></span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-950/70 px-3.5 py-2 rounded-xl border border-neutral-800">
              <Icon name="ShieldCheck" size={16} className="text-emerald-400" />
              <span>Verified Certificate Skill</span>
            </div>
          </div>
        </div>

        {/* Right Completion Progress Ring */}
        <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80 shrink-0 self-center lg:self-auto min-w-[160px]">
          <CompletionRing percentage={progress} size={90} strokeWidth={8} color="amber">
            <div className="text-center">
              <span className="text-xl font-black text-white font-mono">{progress}%</span>
              <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-400 block">Done</span>
            </div>
          </CompletionRing>
          <span className="text-xs font-bold text-amber-400 mt-2">
            {progress === 100 ? '🎉 Mission Complete!' : 'In Progress'}
          </span>
        </div>
      </div>
    </GlassCard>
  )
}

export default ChallengeHero
