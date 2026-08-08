import JourneyTimeline from '@/components/timeline/JourneyTimeline'
import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'

export function DeveloperJourneySection() {
  const stages = [
    {
      title: 'Joined ABTalks Platform',
      description: 'Setup developer profile & connected GitHub account.',
      date: 'Oct 01, 2026',
      status: 'completed',
      iconName: 'UserCheck',
    },
    {
      title: 'Solved First Challenge',
      description: 'Successfully passed automated unit tests for JavaScript Basics.',
      date: 'Oct 02, 2026',
      status: 'completed',
      iconName: 'Code',
    },
    {
      title: 'Reached 7-Day Streak',
      description: 'Unlocked "7-Day Warrior" badge & +100 Bonus XP.',
      date: 'Oct 09, 2026',
      status: 'completed',
      iconName: 'Flame',
    },
    {
      title: 'Earned 1,000 XP Milestone',
      description: 'Promoted to Level 5 Intermediate Developer.',
      date: 'Oct 15, 2026',
      status: 'completed',
      iconName: 'Zap',
    },
    {
      title: 'Entered Top 20% Leaderboard',
      description: 'Outranked 80% of active cohort participants.',
      date: 'Oct 22, 2026',
      status: 'completed',
      iconName: 'Trophy',
    },
    {
      title: 'Level 12 Code Alchemist (Today)',
      description: 'Currently solving React Async Custom Hooks & auto-retry logic.',
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
          <h3 className="text-lg font-black text-white tracking-tight">Developer Journey</h3>
        </div>
        <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
          Level 12 Journey
        </span>
      </div>

      <p className="text-xs text-neutral-400">
        Track your personal evolution from registration to senior mastery.
      </p>

      <div className="pt-2">
        <JourneyTimeline stages={stages} />
      </div>
    </GlassCard>
  )
}

export default DeveloperJourneySection
