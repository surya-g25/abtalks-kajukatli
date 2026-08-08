import JourneyTimeline from '@/components/timeline/JourneyTimeline'
import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'

export function JourneyTimelineSection() {
  const stages = [
    {
      title: 'Joined ABTalks Platform',
      description: 'Registered verified developer identity & linked GitHub/LinkedIn handles.',
      date: 'Oct 01, 2026',
      status: 'completed',
      iconName: 'UserCheck',
    },
    {
      title: 'Completed First Challenge',
      description: 'Submitted verified code solution for JS Async fundamentals.',
      date: 'Oct 02, 2026',
      status: 'completed',
      iconName: 'Code',
    },
    {
      title: 'Reached 7 Day Streak',
      description: 'Locked in 7 consecutive active days & earned "7-Day Warrior" badge.',
      date: 'Oct 09, 2026',
      status: 'completed',
      iconName: 'Flame',
    },
    {
      title: '1,000 XP Milestone',
      description: 'Passed 1,000 XP threshold & promoted to Level 5 Developer.',
      date: 'Oct 15, 2026',
      status: 'completed',
      iconName: 'Zap',
    },
    {
      title: 'Entered Top 10% Leaderboard',
      description: 'Outranked 90% of cohort participants in verified code pushes.',
      date: 'Oct 22, 2026',
      status: 'completed',
      iconName: 'Trophy',
    },
    {
      title: 'Completed 60 Day Challenge Track (Active Mission)',
      description: 'Currently maintaining 14-day daily streak in React & Node.js architecture track.',
      date: 'Today',
      status: 'active',
      iconName: 'Target',
    },
  ]

  return (
    <GlassCard className="p-6 border border-neutral-800/80 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <Icon name="Compass" size={18} className="text-amber-400" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Developer Journey Timeline</h3>
        </div>
        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
          Milestone Progression
        </span>
      </div>

      <p className="text-xs text-neutral-400">
        A chronological roadmap of key achievements, level promotions, and streak milestones.
      </p>

      <div className="pt-2">
        <JourneyTimeline stages={stages} />
      </div>
    </GlassCard>
  )
}

export default JourneyTimelineSection
