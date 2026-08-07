import Icon from '@/components/common/Icon'

export function NoDataState({ message = 'No data available' }) {
  return (
    <div className="flex items-center justify-center p-6 text-center text-neutral-500 gap-2">
      <Icon name="Database" size={18} />
      <span className="text-xs font-medium">{message}</span>
    </div>
  )
}

export default NoDataState
