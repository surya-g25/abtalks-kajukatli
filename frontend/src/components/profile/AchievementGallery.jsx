import { useState } from 'react'
import AchievementCard from '@/components/cards/AchievementCard'
import Icon from '@/components/common/Icon'

export function AchievementGallery() {
  const [filter, setFilter] = useState('all')

  const achievements = [
    { title: 'First Commit', description: 'Pushed your first verified code snippet.', iconName: 'GitCommit', unlocked: true, rarity: 'Common' },
    { title: '7 Day Warrior', description: 'Maintained a 7-day daily learning streak.', iconName: 'Flame', unlocked: true, rarity: 'Rare' },
    { title: '30 Day Legend', description: 'Complete 30 consecutive active days.', iconName: 'Crown', unlocked: false, rarity: 'Epic' },
    { title: '1,000 XP Club', description: 'Earned 1,000 total verified XP.', iconName: 'Zap', unlocked: true, rarity: 'Rare' },
    { title: 'Consistency Master', description: 'Finished 25 missions with 100% completion.', iconName: 'Trophy', unlocked: false, rarity: 'Legendary' },
    { title: 'Night Owl', description: 'Submitted a challenge between 12 AM and 4 AM.', iconName: 'Moon', unlocked: true, rarity: 'Common' },
    { title: 'Open Source Explorer', description: 'Contributed to an open repository challenge.', iconName: 'Globe', unlocked: false, rarity: 'Epic' },
    { title: 'LinkedIn Creator', description: 'Shared 5 learning milestones on LinkedIn.', iconName: 'Share2', unlocked: true, rarity: 'Rare' },
  ]

  const filteredAchievements = achievements.filter((a) => {
    if (filter === 'unlocked') return a.unlocked
    if (filter === 'locked') return !a.unlocked
    return true
  })

  const unlockedCount = achievements.filter((a) => a.unlocked).length

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="Award" size={18} className="text-amber-400" />
            <h3 className="text-lg font-black text-white tracking-tight">Steam-style Achievement Gallery</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            {unlockedCount} of {achievements.length} Badges Unlocked • {Math.round((unlockedCount / achievements.length) * 100)}% Complete
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-xl shrink-0 self-start sm:self-center">
          {['all', 'unlocked', 'locked'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg text-xs font-bold capitalize transition ${
                filter === f
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/10'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {filteredAchievements.map((item, idx) => (
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

export default AchievementGallery
