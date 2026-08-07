import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function ProgressStepper({
  steps = [],
  currentStep = 0,
  vertical = false,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        'flex w-full',
        vertical ? 'flex-col gap-6' : 'items-center justify-between gap-4',
        className
      )}
      {...props}
    >
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep
        const isActive = idx === currentStep

        const title = typeof step === 'string' ? step : step.title
        const description = typeof step === 'string' ? null : step.description

        return (
          <div
            key={idx}
            className={cn(
              'flex items-center gap-3 relative flex-1',
              vertical ? 'w-full' : 'flex-col text-center sm:flex-row sm:text-left'
            )}
          >
            {/* Step circle */}
            <div
              className={cn(
                'w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-300 z-10 shrink-0 select-none',
                isCompleted
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : isActive
                  ? 'bg-amber-500/10 border-amber-500 text-amber-400 ring-4 ring-amber-500/10'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-500'
              )}
            >
              {isCompleted ? <Icon name="Check" size={14} /> : idx + 1}
            </div>

            {/* Step text */}
            <div className="flex flex-col">
              <span
                className={cn(
                  'text-xs font-bold tracking-wide transition-colors',
                  isActive ? 'text-white' : isCompleted ? 'text-neutral-350' : 'text-neutral-500'
                )}
              >
                {title}
              </span>
              {description && (
                <span className="text-[10px] text-neutral-500 mt-0.5 leading-relaxed">
                  {description}
                </span>
              )}
            </div>

            {/* Connecting line to next step */}
            {idx < steps.length - 1 && (
              <div
                className={cn(
                  'absolute bg-neutral-800 pointer-events-none',
                  vertical
                    ? 'left-4 top-8 bottom-0 w-[1px] -mb-6 h-[calc(100%+1.5rem-2rem)]'
                    : 'hidden sm:block left-[calc(50%+1.5rem)] right-0 top-4 h-[1px] w-[calc(100%-3rem)]'
                )}
              >
                <div
                  className={cn(
                    'h-full w-full transition-all duration-500 bg-neutral-800',
                    isCompleted && 'bg-emerald-500',
                    isActive && 'bg-amber-500'
                  )}
                  style={vertical ? { height: isCompleted ? '100%' : '0%' } : { width: isCompleted ? '100%' : '0%' }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default ProgressStepper
