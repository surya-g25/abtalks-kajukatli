import GlassCard from './GlassCard'
import Icon from '@/components/common/Icon'

export function FeatureCard({ title, description, iconName = 'Sparkles', badgeText, className }) {
  return (
    <GlassCard className={className}>
      <div className="flex items-start justify-between">
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <Icon name={iconName} size={24} />
        </div>
        {badgeText && (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-neutral-800 text-amber-300 border border-neutral-700">
            {badgeText}
          </span>
        )}
      </div>
      <h4 className="mt-4 text-lg font-bold text-white tracking-tight">{title}</h4>
      <p className="mt-2 text-sm text-neutral-400 leading-relaxed">{description}</p>
    </GlassCard>
  )
}

export default FeatureCard
