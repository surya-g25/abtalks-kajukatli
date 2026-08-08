import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'

export function DailyMotivationSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Daily Quote Card */}
      <GlassCard className="p-5 border border-amber-500/20 bg-gradient-to-br from-neutral-900/90 to-amber-950/20 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Icon name="Quote" size={18} />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              Quote of the Day
            </span>
          </div>
          <p className="text-sm font-semibold text-neutral-200 italic leading-relaxed">
            "The expert in anything was once a beginner."
          </p>
        </div>
        <p className="text-xs font-bold text-neutral-400 mt-4 text-right">— Helen Hayes</p>
      </GlassCard>

      {/* Learning Tip Card */}
      <GlassCard className="p-5 border border-emerald-500/20 bg-gradient-to-br from-neutral-900/90 to-emerald-950/20 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Icon name="Lightbulb" size={18} />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
              Pro Learning Tip
            </span>
          </div>
          <p className="text-xs font-medium text-neutral-300 leading-relaxed">
            Use <code className="px-1.5 py-0.5 rounded bg-neutral-950 text-emerald-400 font-mono text-[11px]">useCallback</code> to preserve function references across re-renders when passing callbacks to optimized child components.
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px] text-neutral-400 font-bold">
          <span>Topic: React Performance</span>
          <span className="text-emerald-400">Level: Intermediate</span>
        </div>
      </GlassCard>

      {/* AI Mentor Suggestion Placeholder */}
      <GlassCard className="p-5 border border-indigo-500/20 bg-gradient-to-br from-neutral-900/90 to-indigo-950/20 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Icon name="Sparkles" size={18} />
            </div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
              AI Mentor Suggestion
            </span>
          </div>
          <p className="text-xs font-medium text-neutral-300 leading-relaxed">
            "You completed the async data fetching exercise 40% faster than average! Based on your strength in hooks, we recommend tackling <strong className="text-white">State Management Patterns</strong> next."
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between text-[11px]">
          <span className="text-neutral-400 font-bold">Personalized AI Insights</span>
          <span className="text-indigo-400 font-bold hover:underline cursor-pointer">Ask AI Mentor</span>
        </div>
      </GlassCard>
    </div>
  )
}

export default DailyMotivationSection
