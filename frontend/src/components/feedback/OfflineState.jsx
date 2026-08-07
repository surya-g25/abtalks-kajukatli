import Icon from '@/components/common/Icon'

export function OfflineState({ message = 'You are currently offline. Check your internet connection.' }) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-medium">
      <Icon name="WifiOff" size={20} className="shrink-0" />
      <span>{message}</span>
    </div>
  )
}

export default OfflineState
