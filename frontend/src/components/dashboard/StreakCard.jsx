import { motion } from 'framer-motion'
import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'
import Badge from '@/components/ui/Badge'

export function StreakCard({
  currentStreak = 14,
  longestStreak = 21,
  nextMilestone = 15,
  streakFreeze = { active: 1, available: 2 },
}) {
  return (
    <GlassCard className="relative overflow-hidden border border-amber-500/30 bg-gradient-to-br from-neutral-900/90 via-neutral-900 to-amber-950/30 shadow-2xl p-6">
      {/* Background ambient flame glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Animated Flame Container */}
        <div className="relative mb-4">
          {/* Flame aura pulsing circle */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 bg-gradient-to-t from-red-500 via-amber-500 to-yellow-300 rounded-full blur-xl"
          />

          <motion.div
            animate={{ y: [0, -4, 0], rotate: [0, 2, -2, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 p-0.5 flex items-center justify-center shadow-lg shadow-amber-500/30"
          >
            <div className="w-full h-full bg-neutral-950/80 rounded-[14px] flex items-center justify-center backdrop-blur-sm">
              <span className="text-4xl select-none filter drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
                🔥
              </span>
            </div>
          </motion.div>

          <span className="absolute -bottom-2 right-0 bg-neutral-950 border border-amber-500/40 text-amber-400 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
            Active
          </span>
        </div>

        {/* Current Streak Number */}
        <div className="mb-2">
          <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            {currentStreak} <span className="text-xl text-amber-400 font-extrabold">Days</span>
          </span>
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mt-1">
            Current Daily Streak
          </p>
        </div>

        {/* Motivational Message */}
        <div className="my-3 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
          ⚡ You're on fire! Keep going to lock in 15 days & unlock "Flame Master"!
        </div>

        {/* Streak Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-3 mt-3 text-left">
          <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-extrabold uppercase">
              <Icon name="Trophy" size={13} className="text-amber-400" />
              <span>Longest Streak</span>
            </div>
            <span className="text-base font-extrabold text-white mt-1 block">
              {longestStreak} Days
            </span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950/70 border border-neutral-800">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-extrabold uppercase">
              <Icon name="Target" size={13} className="text-amber-400" />
              <span>Next Milestone</span>
            </div>
            <span className="text-base font-extrabold text-white mt-1 block">
              {nextMilestone} Days
            </span>
          </div>
        </div>

        {/* Streak Freeze Banner */}
        <div className="w-full mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-neutral-300 font-semibold">
            <Icon name="Shield" size={16} className="text-cyan-400" />
            <span>Streak Freeze</span>
          </div>
          <Badge variant="info" className="text-[10px] font-bold">
            {streakFreeze.active} Active ({streakFreeze.available} Available)
          </Badge>
        </div>
      </div>
    </GlassCard>
  )
}

export default StreakCard
