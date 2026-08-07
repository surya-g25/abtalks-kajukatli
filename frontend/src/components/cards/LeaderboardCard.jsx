import GlassCard from './GlassCard'
import Avatar from '@/components/ui/Avatar'

export function LeaderboardCard({ rank, name, points, avatar, className }) {
  const rankColors = {
    1: 'bg-amber-500 text-neutral-950 font-black ring-4 ring-amber-500/20',
    2: 'bg-neutral-300 text-neutral-950 font-extrabold',
    3: 'bg-amber-700 text-white font-extrabold',
  }

  return (
    <GlassCard className={`p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
              rankColors[rank] || 'bg-neutral-800 text-neutral-400 font-bold'
            }`}
          >
            #{rank}
          </span>
          <Avatar src={avatar} alt={name} size="sm" />
          <span className="text-sm font-bold text-white">{name}</span>
        </div>
        <span className="text-xs font-mono font-bold text-amber-400">{points} pts</span>
      </div>
    </GlassCard>
  )
}

export default LeaderboardCard
