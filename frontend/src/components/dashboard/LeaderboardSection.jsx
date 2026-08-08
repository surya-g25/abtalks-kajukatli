import { Link } from 'react-router-dom'
import LeaderboardCard from '@/components/cards/LeaderboardCard'
import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'

export function LeaderboardSection({ leaderboard, student }) {
  const defaultStudents = [
    { rank: 1, name: 'Sarah Chen', points: '3,890', avatar: '', weeklyChange: '+1', topPercentage: 'Top 1%' },
    { rank: 2, name: 'Marcus Vance', points: '3,450', avatar: '', weeklyChange: '+0', topPercentage: 'Top 2%' },
    { rank: 3, name: 'Devon Lane', points: '3,120', avatar: '', weeklyChange: '-1', topPercentage: 'Top 3%' },
    { rank: 4, name: 'Alex Rivera (You)', points: '2,450', avatar: '', weeklyChange: '+2', topPercentage: 'Top 5%', isYou: true },
    { rank: 5, name: 'Priya Sharma', points: '2,210', avatar: '', weeklyChange: '+1', topPercentage: 'Top 8%' },
  ]

  const topStudents = leaderboard && leaderboard.length > 0 ? leaderboard : defaultStudents

  // Find user's dynamic rank
  const myLeaderboardInfo = topStudents.find((s) => s.isYou) || {
    rank: student?.rank || 4,
    weeklyChange: student?.weeklyChange || '+2',
    topPercentage: 'Top 5%',
  }

  // Display top 5 students in leaderboard preview
  const previewList = topStudents.slice(0, 5)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="Trophy" size={18} className="text-amber-400" />
            <h3 className="text-lg font-black text-white tracking-tight">Leaderboard Preview</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">Top performing students this week</p>
        </div>

        <Link
          to="/leaderboard"
          className="text-xs font-bold text-amber-400 hover:text-amber-300 transition flex items-center gap-1"
        >
          <span>Full Leaderboard</span>
          <Icon name="ChevronRight" size={15} />
        </Link>
      </div>

      {/* Your Rank Summary Card */}
      <GlassCard className="border border-amber-500/30 bg-amber-500/10 p-4 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 font-black text-sm flex items-center justify-center shadow-md shadow-amber-500/20 animate-pulse">
            #{myLeaderboardInfo.rank}
          </div>
          <div>
            <span className="text-xs font-bold text-white block">Your Global Rank</span>
            <span className="text-[10px] text-amber-400 font-semibold">{myLeaderboardInfo.topPercentage} of all active students</span>
          </div>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-extrabold">
          <Icon name="TrendingUp" size={14} />
          <span>{myLeaderboardInfo.weeklyChange} spots</span>
        </div>
      </GlassCard>

      {/* Top 5 Students List */}
      <div className="space-y-2">
        {previewList.map((stud) => (
          <div
            key={stud.rank}
            className={stud.isYou ? 'ring-2 ring-amber-500/50 rounded-2xl shadow-lg' : ''}
          >
            <LeaderboardCard
              rank={stud.rank}
              name={stud.name}
              points={stud.points}
              avatar={stud.avatar}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeaderboardSection
