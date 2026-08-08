import AchievementCard from '@/components/cards/AchievementCard'
import Icon from '@/components/common/Icon'
import { Link } from 'react-router-dom'

export function AchievementsSection({ achievements }) {
  const defaultAchievements = [
    { title: 'First Commit', description: 'Pushed your first verified code snippet.', iconName: 'GitCommit', unlocked: true },
    { title: '7-Day Warrior', description: 'Maintained a 7-day daily learning streak.', iconName: 'Flame', unlocked: true },
    { title: '30-Day Legend', description: 'Complete 30 consecutive active days.', iconName: 'Crown', unlocked: false },
    { title: 'Consistency King', description: 'Finished 25 missions with 100% completion.', iconName: 'Trophy', unlocked: false },
    { title: 'Night Owl', description: 'Submitted a challenge between 12 AM and 4 AM.', iconName: 'Moon', unlocked: true },
    { title: 'LinkedIn Creator', description: 'Shared 5 learning milestones on LinkedIn.', iconName: 'Share2', unlocked: true },
    { title: 'Open Source Explorer', description: 'Contributed to an open repository challenge.', iconName: 'Globe', unlocked: false },
  ]

  const displayAchievements = achievements && achievements.length > 0 ? achievements : defaultAchievements
  const unlockedCount = displayAchievements.filter((item) => item.unlocked).length
  const totalCount = displayAchievements.length || 1
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100)

  // Show only 3 recent/unlocked achievements to keep dashboard tidy
  const previewList = displayAchievements.slice(0, 3)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="Award" size={18} className="text-amber-400" />
            <h3 className="text-lg font-black text-white tracking-tight">Recent Achievements</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            {unlockedCount} of {totalCount} Badges Unlocked • {completionPercentage}% Completion
          </p>
        </div>

        <Link
          to="/achievements"
          className="text-xs font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-1"
        >
          <span>View All</span>
          <Icon name="ChevronRight" size={15} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {previewList.map((item, idx) => (
          <AchievementCard
            key={idx}
            title={item.title}
            description={item.description}
            unlocked={item.unlocked}
            iconName={item.iconName}
          />
        ))}
      </div>
    </div>
  )
}

export default AchievementsSection
