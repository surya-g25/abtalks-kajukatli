import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'
import Button from '@/components/ui/Button'

export function EmptyState({
  title = 'No Data Found',
  description = 'There is currently no activity recorded here.',
  iconName = 'Inbox',
  actionLabel = '',
  onAction = null,
}) {
  return (
    <GlassCard className="p-8 sm:p-12 border border-neutral-900 bg-neutral-950/60 rounded-3xl flex flex-col items-center justify-center text-center space-y-5 max-w-lg mx-auto relative overflow-hidden shadow-2xl">
      {/* Subtle inner background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Icon */}
      <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 text-neutral-500 flex items-center justify-center relative shadow-inner">
        <Icon name={iconName} size={28} className="stroke-[1.5]" />
        <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-neutral-950 border-2 border-neutral-900 rounded-full flex items-center justify-center text-[7px]">
          🔒
        </span>
      </div>

      {/* Text Details */}
      <div className="space-y-2 relative z-10">
        <h3 className="text-base font-black text-white tracking-tight">{title}</h3>
        <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-semibold">
          {description}
        </p>
      </div>

      {/* Action Button */}
      {actionLabel && onAction && (
        <div className="pt-2 relative z-10">
          <Button onClick={onAction} variant="outline" size="sm" className="font-bold">
            {actionLabel}
          </Button>
        </div>
      )}
    </GlassCard>
  )
}

export default EmptyState
