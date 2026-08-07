import Icon from '@/components/common/Icon'
import Button from '@/components/ui/Button'

export function SuccessState({ title = 'Success!', message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
      <div className="p-3.5 rounded-full bg-emerald-500/10 text-emerald-400 mb-3">
        <Icon name="CheckCircle2" size={36} />
      </div>
      <h4 className="text-lg font-bold text-white">{title}</h4>
      {message && <p className="text-sm text-emerald-200 mt-1 max-w-sm">{message}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction} className="mt-5">
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default SuccessState
