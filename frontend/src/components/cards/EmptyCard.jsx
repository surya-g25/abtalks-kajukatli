import GlassCard from './GlassCard'
import Icon from '@/components/common/Icon'

export function EmptyCard({ message = 'No data available', iconName = 'Inbox', className }) {
  return (
    <GlassCard className={`text-center py-10 ${className}`}>
      <div className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500 inline-block mb-3">
        <Icon name={iconName} size={32} />
      </div>
      <p className="text-sm font-medium text-neutral-400">{message}</p>
    </GlassCard>
  )
}

export default EmptyCard
