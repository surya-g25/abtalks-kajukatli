import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'
import Badge from '@/components/ui/Badge'
import { Link } from 'react-router-dom'

export function RelatedChallenges() {
  const challenges = [
    {
      day: 13,
      title: 'State Management with Context & Reducers',
      category: 'React Architecture',
      xp: '+120 XP',
      status: 'completed',
      date: 'Yesterday',
    },
    {
      day: 15,
      title: 'Optimizing Re-renders with Memo & Selectors',
      category: 'Performance',
      xp: '+180 XP',
      status: 'upcoming',
      date: 'Tomorrow',
    },
    {
      day: 16,
      title: 'Building a Virtualized Long List Component',
      category: 'UI Engineering',
      xp: '+200 XP',
      status: 'locked',
      date: 'In 2 Days',
    },
  ]

  return (
    <GlassCard className="p-6 border border-neutral-800/80 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <Icon name="Layers" size={18} className="text-amber-400" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Related & Track Schedule</h3>
        </div>
        <Link to="/challenges" className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1">
          <span>All Challenges</span>
          <Icon name="ChevronRight" size={14} />
        </Link>
      </div>

      <div className="space-y-3">
        {challenges.map((c, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition ${
              c.status === 'completed'
                ? 'bg-neutral-950/60 border-emerald-500/20'
                : c.status === 'upcoming'
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-neutral-950/40 border-neutral-800 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-black shrink-0 ${
                  c.status === 'completed'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : c.status === 'upcoming'
                    ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                    : 'bg-neutral-900 text-neutral-600 border border-neutral-800'
                }`}
              >
                Day {c.day}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white line-clamp-1">{c.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-neutral-400 font-semibold">{c.category}</span>
                  <span className="text-neutral-700">•</span>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">{c.xp}</span>
                </div>
              </div>
            </div>

            <Badge
              variant={c.status === 'completed' ? 'success' : c.status === 'upcoming' ? 'warning' : 'neutral'}
              className="uppercase text-[9px] shrink-0"
            >
              {c.status}
            </Badge>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

export default RelatedChallenges
