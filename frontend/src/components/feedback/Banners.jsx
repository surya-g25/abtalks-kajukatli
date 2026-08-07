import { useState } from 'react'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function SuccessBanner({ message, description, onClose, className, ...props }) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border bg-emerald-500/5 border-emerald-500/20 text-emerald-250 w-full shadow-sm',
        className
      )}
      {...props}
    >
      <div className="p-1 rounded-lg bg-emerald-500/10 text-emerald-450 text-emerald-400 shrink-0">
        <Icon name="CheckCircle2" size={16} />
      </div>
      <div className="flex-1 space-y-1">
        <h5 className="text-xs font-extrabold text-white leading-tight">{message}</h5>
        {description && <p className="text-[11px] text-emerald-400/80 leading-normal">{description}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={handleClose}
          className="text-emerald-400/60 hover:text-emerald-405 p-0.5 rounded cursor-pointer"
        >
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  )
}

export function WarningBanner({ message, description, onClose, className, ...props }) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border bg-amber-500/5 border-amber-500/20 text-amber-250 w-full shadow-sm',
        className
      )}
      {...props}
    >
      <div className="p-1 rounded-lg bg-amber-500/10 text-amber-400 shrink-0">
        <Icon name="AlertTriangle" size={16} />
      </div>
      <div className="flex-1 space-y-1">
        <h5 className="text-xs font-extrabold text-white leading-tight">{message}</h5>
        {description && <p className="text-[11px] text-amber-300/80 leading-normal">{description}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={handleClose}
          className="text-amber-400/60 hover:text-amber-450 p-0.5 rounded cursor-pointer"
        >
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  )
}

export function InfoBanner({ message, description, onClose, className, ...props }) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  return (
    <div
      className={cn(
        'flex items-start gap-3 p-4 rounded-xl border bg-sky-500/5 border-sky-500/20 text-sky-200 w-full shadow-sm',
        className
      )}
      {...props}
    >
      <div className="p-1 rounded-lg bg-sky-500/10 text-sky-400 shrink-0">
        <Icon name="Info" size={16} />
      </div>
      <div className="flex-1 space-y-1">
        <h5 className="text-xs font-extrabold text-white leading-tight">{message}</h5>
        {description && <p className="text-[11px] text-sky-300/80 leading-normal">{description}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={handleClose}
          className="text-sky-400/60 hover:text-sky-400 p-0.5 rounded cursor-pointer"
        >
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  )
}

export function MotivationalBanner({ message = 'Keep up the momentum!', description, actionLabel, onAction, className, ...props }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden p-5 rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-neutral-900 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl',
        className
      )}
      {...props}
    >
      {/* Decorative ambient background blur */}
      <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-start gap-3.5 z-10">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-400 text-neutral-950 shrink-0 shadow-lg shadow-amber-500/20">
          <Icon name="Flame" size={20} className="animate-pulse" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-extrabold text-white tracking-tight">{message}</h4>
          {description && <p className="text-xs text-neutral-400 max-w-lg leading-relaxed">{description}</p>}
        </div>
      </div>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold rounded-xl text-xs shadow-md shadow-amber-500/20 transition-all hover:scale-102 shrink-0 cursor-pointer self-start sm:self-center"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
