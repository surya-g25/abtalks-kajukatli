import { useState, useEffect } from 'react'
import PageWrapper from '@/components/layout-primitives/PageWrapper'
import GlassCard from '@/components/cards/GlassCard'
import Icon from '@/components/common/Icon'
import LinearProgress from '@/components/progress/LinearProgress'
import apiClient from '@/api/apiClient'

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    let isMounted = true
    async function loadAchievements() {
      try {
        const response = await apiClient.get('/achievements')
        if (response.data?.data && isMounted) {
          setAchievements(response.data.data)
        }
      } catch (err) {
        console.error('Failed to load achievements data', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadAchievements()
    return () => {
      isMounted = false
    }
  }, [])

  const categories = ['All', ...new Set(achievements.map((a) => a.category || 'General'))]

  const filteredAchievements = selectedCategory === 'All'
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory)

  const unlockedCount = achievements.filter((a) => a.unlocked).length
  const totalCount = achievements.length || 1
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100)

  const getRarityConfig = (rarity) => {
    switch (rarity) {
      case 'Legendary':
        return {
          border: 'border-yellow-500/40 bg-yellow-500/5',
          text: 'text-yellow-400',
          badge: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
          glow: 'from-yellow-500/5 to-transparent',
        }
      case 'Epic':
        return {
          border: 'border-purple-500/40 bg-purple-500/5',
          text: 'text-purple-400',
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          glow: 'from-purple-500/5 to-transparent',
        }
      case 'Rare':
        return {
          border: 'border-cyan-500/40 bg-cyan-500/5',
          text: 'text-cyan-400',
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
          glow: 'from-cyan-500/5 to-transparent',
        }
      default:
        return {
          border: 'border-neutral-800/80 bg-neutral-900/40',
          text: 'text-neutral-300',
          badge: 'bg-neutral-800 text-neutral-400 border-neutral-700',
          glow: 'from-neutral-800/5 to-transparent',
        }
    }
  }

  return (
    <PageWrapper
      title="Developer Badges & Milestones"
      description="Unlock unique badges as you build consistency, push commits, and complete cohort challenges."
      className="space-y-6 pt-2"
    >
      {/* Overview Stat Block */}
      <GlassCard className="p-6 border border-neutral-800/80 bg-gradient-to-br from-neutral-900 to-neutral-950 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon name="Award" size={22} className="text-amber-400" />
            <h2 className="text-lg font-black text-white tracking-tight">Your Achievements Progress</h2>
          </div>
          <p className="text-xs text-neutral-400 max-w-xl leading-relaxed">
            Every badge unlocked boosts your cohort credibility score. Maintain streaks and submit challenges on time to claim rarer badges!
          </p>
        </div>

        <div className="md:w-72 shrink-0 space-y-2.5">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-neutral-400">Total Progress</span>
            <span className="text-amber-400 font-mono">{unlockedCount} / {totalCount} ({completionPercentage}%)</span>
          </div>
          <LinearProgress progress={unlockedCount} total={totalCount} color="amber" size="md" />
        </div>
      </GlassCard>

      {/* Categories Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-amber-500 text-neutral-950 shadow-lg shadow-amber-500/10'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <div className="w-10 h-10 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
          <p className="text-xs text-neutral-400 font-bold">Compiling your achievement catalog...</p>
        </div>
      ) : filteredAchievements.length === 0 ? (
        <div className="text-center py-10 text-neutral-400 text-xs font-semibold">
          No achievements matching the criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAchievements.map((item) => {
            const config = getRarityConfig(item.rarity)
            const showProgress = item.totalTarget > 1

            return (
              <GlassCard
                key={item.title}
                className={`p-5 border flex flex-col justify-between relative overflow-hidden transition-all duration-300 group ${
                  item.unlocked
                    ? `${config.border} hover:scale-[1.02]`
                    : 'border-neutral-900 bg-neutral-950/60 opacity-60'
                }`}
              >
                {/* Rarity subtle glow */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${config.glow} rounded-full blur-2xl pointer-events-none`} />

                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className={`p-3 rounded-2xl border shrink-0 transition-transform duration-300 group-hover:scale-110 ${
                        item.unlocked
                          ? `${config.badge}`
                          : 'bg-neutral-900 border-neutral-800 text-neutral-600'
                      }`}
                    >
                      <Icon name={item.iconName || 'Award'} size={22} />
                    </div>

                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${config.badge}`}
                    >
                      {item.rarity}
                    </span>
                  </div>

                  <h3 className="text-sm font-black text-white tracking-tight">
                    {item.title}
                  </h3>

                  <p className="text-xs text-neutral-400 mt-2 leading-relaxed font-semibold">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-900">
                  {showProgress && !item.unlocked ? (
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold text-neutral-400 font-mono">
                        <span>Progress</span>
                        <span>{item.progress} / {item.totalTarget}</span>
                      </div>
                      <LinearProgress progress={item.progress} total={item.totalTarget} color="amber" size="xs" />
                    </div>
                  ) : item.unlocked ? (
                    <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-extrabold uppercase">
                      <Icon name="CheckCircle2" size={13} />
                      <span>
                        Unlocked {item.unlockedAt ? new Date(item.unlockedAt).toLocaleDateString() : 'Today'}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-bold uppercase">
                      <Icon name="Lock" size={13} />
                      <span>Locked</span>
                    </div>
                  )}
                </div>
              </GlassCard>
            )
          })}
        </div>
      )}
    </PageWrapper>
  )
}
