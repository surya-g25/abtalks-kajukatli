import { useState, useEffect } from 'react'
import PageWrapper from '@/components/layout-primitives/PageWrapper'
import GlassCard from '@/components/cards/GlassCard'
import Icon from '@/components/common/Icon'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import apiClient from '@/api/apiClient'

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState('xp')
  const [selectedCollege, setSelectedCollege] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [leaderboardData, setLeaderboardData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const tabs = [
    { id: 'xp', label: 'Global XP', icon: 'Globe' },
    { id: 'weekly', label: 'Weekly Growth', icon: 'Calendar' },
    { id: 'monthly', label: 'Monthly XP', icon: 'Zap' },
    { id: 'consistency', label: 'Consistency %', icon: 'Target' },
    { id: 'streak', label: 'Streak Length', icon: 'Flame' },
  ]

  const colleges = [
    { id: 'all', label: 'All Institutions' },
    { id: 'stanford', label: 'Stanford University' },
    { id: 'mit', label: 'MIT' },
    { id: 'abtalks', label: 'ABTalks Academy' },
    { id: 'berkeley', label: 'UC Berkeley' },
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

  // Filter leaderboard data by search string & college filter
  const filteredData = leaderboardData.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesSearch) return false

    if (selectedCollege === 'all') return true
    if (selectedCollege === 'abtalks') return true
    if (student.college) {
      return student.college.toLowerCase().includes(selectedCollege.toLowerCase())
    }
    return true
  })

  // Get user card
  const currentUserInfo = leaderboardData.find((s) => s.isYou)

  const topThree = leaderboardData.slice(0, 3)

  return (
    <PageWrapper
      title="Cohort & Global Leaderboards"
      description="Compete in real-time with fellow developers. Rankings calculate automatically from verified study metrics, streaks, and GitHub pushes."
      className="space-y-6 pt-2"
    >
      {/* Search & Filter Toolbar Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 shadow-inner">
        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-tight transition-all duration-200 shrink-0 ${
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

        {/* Search Input & College Dropdown Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <Icon name="Search" size={14} className="absolute left-3 top-2.5 text-neutral-500" />
            <input
              type="text"
              placeholder="Search student..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 pl-8 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-xs font-medium focus:outline-none focus:border-amber-500"
            />
          </div>

          <select
            value={selectedCollege}
            onChange={(e) => setSelectedCollege(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-semibold focus:outline-none focus:border-amber-500"
          >
            {colleges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Top 3 Podium Cards Showcase */}
      {topThree.length >= 3 && !searchQuery && selectedCollege === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* #2 Rank Silver */}
          <GlassCard className="p-5 border-2 border-neutral-400/30 bg-gradient-to-b from-neutral-900 to-neutral-950 text-center relative order-2 md:order-1">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-neutral-300 text-neutral-950 px-3 py-0.5 rounded-full text-[10px] font-black uppercase">
              🥈 2nd Place
            </span>
            <Avatar src={topThree[1]?.avatar} alt={topThree[1]?.name} size="lg" className="mx-auto mt-2 ring-4 ring-neutral-400/40" />
            <h4 className="text-base font-bold text-white mt-3">{topThree[1]?.name}</h4>
            <span className="text-xs font-mono font-extrabold text-amber-400 block mt-1">{topThree[1]?.points} pts</span>
          </GlassCard>

          {/* #1 Rank Gold */}
          <GlassCard className="p-6 border-2 border-amber-500/50 bg-gradient-to-b from-neutral-900 via-amber-950/20 to-neutral-950 text-center relative order-1 md:order-2 shadow-2xl scale-105">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-neutral-950 px-4 py-1 rounded-full text-xs font-black uppercase shadow-lg shadow-amber-500/30">
              👑 1st Champion
            </span>
            <Avatar src={topThree[0]?.avatar} alt={topThree[0]?.name} size="xl" className="mx-auto mt-2 ring-4 ring-amber-500/60 shadow-xl" />
            <h3 className="text-lg font-black text-white mt-3">{topThree[0]?.name}</h3>
            <span className="text-sm font-mono font-black text-amber-400 block mt-1">{topThree[0]?.points} pts</span>
          </GlassCard>

          {/* #3 Rank Bronze */}
          <GlassCard className="p-5 border-2 border-amber-800/40 bg-gradient-to-b from-neutral-900 to-neutral-950 text-center relative order-3">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white px-3 py-0.5 rounded-full text-[10px] font-black uppercase">
              🥉 3rd Place
            </span>
            <Avatar src={topThree[2]?.avatar} alt={topThree[2]?.name} size="lg" className="mx-auto mt-2 ring-4 ring-amber-700/40" />
            <h4 className="text-base font-bold text-white mt-3">{topThree[2]?.name}</h4>
            <span className="text-xs font-mono font-extrabold text-amber-400 block mt-1">{topThree[2]?.points} pts</span>
          </GlassCard>
        </div>
      )}

      {/* Main Leaderboard Table & User Standing Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Rankings list */}
        <div className="lg:col-span-2 space-y-3">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-10 h-10 rounded-full border-4 border-amber-500 border-t-transparent animate-spin" />
              <p className="text-xs text-neutral-400 font-bold">Calculating live leaderboard standings...</p>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-12 text-neutral-400 text-xs font-semibold bg-neutral-900/50 rounded-2xl border border-neutral-800">
              No matching student ranking records found.
            </div>
          ) : (
            filteredData.map((student) => {
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

        {/* Right Sidebar: User standing widget & Rules */}
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
                  You are holding <strong className="text-amber-400">#{currentUserInfo.rank}</strong> position globally. Submit today's mission to climb to <strong className="text-white">#3 Top Podium</strong>!
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
                <span>Points calculate live from daily mission submissions & verified GitHub commits.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">•</span>
                <span>Maintaining consecutive daily streaks grants a 1.25x XP point multiplier.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 font-bold shrink-0">•</span>
                <span>Rankings refresh every 15 minutes across all participating institutions.</span>
              </li>
            </ul>
          </GlassCard>
        </div>
      </div>
    </PageWrapper>
  )
}
