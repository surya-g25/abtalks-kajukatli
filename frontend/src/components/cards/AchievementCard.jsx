import GlassCard from './GlassCard'
import Icon from '@/components/common/Icon'

export function AchievementCard({ title, description, unlocked = false, iconName = 'Award', className }) {
  return (
    <GlassCard className={className}>
      <div className="flex items-center gap-4">
        <div
          className={`p-3.5 rounded-2xl border transition-colors ${
            unlocked
              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
              : 'bg-neutral-900 border-neutral-800 text-neutral-600'
          }`}
        >
          <Icon name={iconName} size={28} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-base font-bold text-white">{title}</h4>
            <span
              className={`text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full ${
                unlocked ? 'bg-emerald-500/10 text-emerald-400' : 'bg-neutral-800 text-neutral-500'
              }`}
            >
              {unlocked ? 'Unlocked' : 'Locked'}
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-1">{description}</p>
        </div>
      </div>
    </GlassCard>
  )
}

export default AchievementCard
