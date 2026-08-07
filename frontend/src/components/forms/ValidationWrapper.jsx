import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function ValidationWrapper({
  error,
  success,
  warning,
  children,
  className,
  ...props
}) {
  return (
    <div className={cn('flex flex-col gap-1 w-full', className)} {...props}>
      {children}
      {error && (
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-red-400 mt-1">
          <Icon name="AlertCircle" size={12} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && !error && (
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-400 mt-1">
          <Icon name="CheckCircle" size={12} className="shrink-0" />
          <span>{success}</span>
        </div>
      )}
      {warning && !error && !success && (
        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-amber-400 mt-1">
          <Icon name="AlertTriangle" size={12} className="shrink-0" />
          <span>{warning}</span>
        </div>
      )}
    </div>
  )
}

export default ValidationWrapper
