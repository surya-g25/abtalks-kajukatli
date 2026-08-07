import Icon from '@/components/common/Icon'
import Button from '@/components/ui/Button'

export function EmptyState({ title = 'No items found', description, iconName = 'PackageOpen', actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-neutral-800">
      <div className="p-4 rounded-2xl bg-neutral-900 border border-neutral-800 text-amber-400 mb-4">
        <Icon name={iconName} size={36} />
      </div>
      <h4 className="text-lg font-bold text-white">{title}</h4>
      {description && <p className="text-sm text-neutral-400 mt-1 max-w-sm">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction} className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
