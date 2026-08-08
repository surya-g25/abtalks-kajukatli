import { useState, useEffect } from 'react'
import PageWrapper from '@/components/layout-primitives/PageWrapper'
import GlassCard from '@/components/cards/GlassCard'
import Icon from '@/components/common/Icon'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import apiClient from '@/api/apiClient'

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('xp')
  const [leaderboardData, setLeaderboardData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const tabs = [
    { id: 'xp', label: 'Global XP', icon: 'Globe' },
    { id: 'weekly', label: 'Weekly Growth', icon: 'Calendar' },
    { id: 'monthly', label: 'Monthly XP', icon: 'Zap' },
    { id: 'consistency', label: 'Consistency %', icon: 'Target' },
    { id: 'streak', label: 'Streak Length', icon: 'Flame' },
  ]

  useEffect(() => {
    let isMounted = true
    async function fetchLeaderboard() {
      setIsLoading(true)
      try {
        const response = await apiClient.get(`/leaderboard?sortBy=${activeTab}`)
        if (response.data?.data && isMounted) {
          setLeaderboardData(response.data.data)
        }
      } catch (err) {
        console.error('Failed to fetch leaderboard data', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    fetchLeaderboard()
    return () => {
      isMounted = false
    }
  }, [activeTab])

  // Get user card
  const currentUserInfo = leaderboardData.find((s) => s.isYou)

  return (
    <PageWrapper
      title="Cohort Leaderboard"
      description="Compete in real-time with fellow developers. Rankings calculate automatically from verified study metrics, streaks, and GitHub pushes."
      className="space-y-6 pt-2"
    >
      {/* Tab Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 max-w-fit">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold tracking-tight transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 shadow-lg shadow-amber-500/10'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
              }`}
            >
              <Icon name={tab.icon} size={14} />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left/Middle Column: Rankings list */}
        <div className="lg:col-span-2 space-y-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-10 h-10 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
              <p className="text-xs text-neutral-400 font-bold">Recalculating rank standings...</p>
            </div>
          ) : leaderboardData.length === 0 ? (
            <div className="text-center py-10 text-neutral-400 text-xs font-semibold">
              No ranking records available.
            </div>
          ) : (
            leaderboardData.map((student) => {
              const isFirst = student.rank === 1
              const isSecond = student.rank === 2
              const isThird = student.rank === 3

              return (
                <GlassCard
                  key={student.rank}
                  className={`p-4 flex items-center justify-between border transition-all duration-300 ${
                    student.isYou
                      ? 'border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/30'
                      : 'border-neutral-800/80 hover:border-neutral-700/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 border ${
                        isFirst
                          ? 'bg-yellow-400 text-neutral-950 border-yellow-300 shadow-md shadow-yellow-400/20'
                          : isSecond
                          ? 'bg-neutral-300 text-neutral-950 border-neutral-200'
                          : isThird
                          ? 'bg-amber-700 text-white border-amber-600'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                      }`}
                    >
                      {student.rank}
                    </div>

                    <div className="relative group shrink-0">
                      <Avatar src={student.avatar} alt={student.name} size="sm" />
                      {isFirst && (
                        <span className="absolute -top-1.5 -right-1 bg-yellow-400 text-neutral-950 rounded-full p-0.5 border border-neutral-950 text-[8px] font-black">
                          👑
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white leading-none">
                          {student.name}
                        </span>
                        {student.isYou && (
                          <Badge variant="warning" className="px-1.5 py-0 text-[8px] font-black uppercase">
                            You
                          </Badge>
                        )}
                      </div>
                      <span className="text-[10px] text-neutral-400 mt-1 block">
                        {student.topPercentage}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-right">
                    <div>
                      <span className="text-sm font-mono font-black text-amber-400">
                        {student.points}
                      </span>
                      <span className="text-[10px] text-neutral-500 block uppercase font-bold tracking-wider">
                        Score
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-0.5 text-xs font-black px-2 py-0.5 rounded-lg border ${
                        student.weeklyChange.startsWith('+') && student.weeklyChange !== '+0'
                          ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                          : student.weeklyChange.startsWith('-')
                          ? 'bg-red-500/10 border-red-500/20 text-red-400'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                      }`}
                    >
                      <Icon
                        name={
                          student.weeklyChange.startsWith('+') && student.weeklyChange !== '+0'
                            ? 'TrendingUp'
                            : student.weeklyChange.startsWith('-')
                            ? 'TrendingDown'
                            : 'Minus'
                        }
                        size={12}
                      />
                      <span className="font-mono">{student.weeklyChange.replace(/[+-]/, '')}</span>
                    </div>
                  </div>
                </GlassCard>
              )
            })
          )}
        </div>

        {/* Right Column: User standing widget */}
        <div className="lg:col-span-1 space-y-6">
          {currentUserInfo && (
            <GlassCard className="p-6 border-2 border-amber-500/30 bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/20 shadow-2xl space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-neutral-800">
                <Icon name="Trophy" className="text-amber-400" size={20} />
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
                  Your Current Standing
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 block font-semibold">Your Rank</span>
                  <span className="text-3xl font-black text-white font-mono">#{currentUserInfo.rank}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block font-semibold">Percentile</span>
                  <span className="text-base font-extrabold text-amber-400 block">
                    {currentUserInfo.topPercentage}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2">
                <span className="text-[10px] font-extrabold uppercase text-neutral-400 block tracking-wider">
                  Promotion Status
                </span>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  You are currently holding <strong className="text-amber-400">#{currentUserInfo.rank}</strong> place. Earn at least <strong className="text-white">150 XP</strong> today to climb higher and lock in top tier rewards!
                </p>
              </div>

              <div className="pt-2">
                <Badge variant="warning" className="w-full justify-center py-1.5 font-bold uppercase tracking-wider">
                  🔥 {currentUserInfo.weeklyChange} Spot Movement This Week
                </Badge>
              </div>
            </GlassCard>
          )}

          {/* Leaderboard Rules */}
          <GlassCard className="p-6 border border-neutral-800/80 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-800">
              <Icon name="Info" size={16} className="text-amber-400" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-white">Leaderboard Rules</h4>
            </div>

            <ul className="space-y-3 text-xs text-neutral-400 font-medium">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">•</span>
                <span>Points are computed live from submissions and GitHub commit logs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">•</span>
                <span>Ranks are updated every time a challenge is submitted or checked.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">•</span>
                <span>Maintaining streaks grants streak multiplier points.</span>
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </PageWrapper>
  )
}
