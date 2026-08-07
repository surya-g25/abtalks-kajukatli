import Icon from '@/components/common/Icon'
import Button from '@/components/ui/Button'

export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center glass-panel rounded-2xl border border-red-500/20 bg-red-500/5">
      <div className="p-3.5 rounded-full bg-red-500/10 text-red-400 mb-3">
        <Icon name="AlertTriangle" size={32} />
      </div>
      <h4 className="text-base font-bold text-white">{title}</h4>
      {message && <p className="text-xs text-red-300 mt-1 max-w-sm">{message}</p>}
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-4">
          Try Again
        </Button>
      )}
    </div>
  )
}

export default ErrorState
