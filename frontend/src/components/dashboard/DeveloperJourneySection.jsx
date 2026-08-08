import JourneyTimeline from '@/components/timeline/JourneyTimeline'
import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'
import { useAuth } from '@/context/AuthContext'

export function DeveloperJourneySection() {
  const { user } = useAuth()
  const level = user?.level || 1
  const streak = user?.currentStreak || 0
  const xp = user?.xp || 0
  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Member'

  const stages = [
    {
      title: 'Joined ABTalks Platform',
      description: 'Setup developer profile & connected account.',
      date: joinedDate,
      status: 'completed',
      iconName: 'UserCheck',
    },
    {
      title: 'Solved First Challenge',
      description: 'Passed initial coding missions.',
      date: 'Completed',
      status: xp > 0 ? 'completed' : 'upcoming',
      iconName: 'Code',
    },
    {
      title: 'Streak Milestone',
      description: `Built an active ${streak} day learning streak.`,
      date: streak > 0 ? 'Active' : 'Pending',
      status: streak >= 3 ? 'completed' : streak > 0 ? 'active' : 'upcoming',
      iconName: 'Flame',
    },
    {
      title: `Level ${level} Developer (Current)`,
      description: `Accumulated ${xp.toLocaleString()} total XP.`,
      date: 'Today',
      status: 'active',
      iconName: 'Zap',
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
          Level {level} Journey
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
