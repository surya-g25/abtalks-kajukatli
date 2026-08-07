import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export const Textarea = forwardRef(function Textarea(
  { label, error, helperText, rows = 4, maxLength, value, className, id, ...props },
  ref
) {
  const textareaId = id || props.name

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={textareaId} className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {label}
        </label>
      )}
      <div className="relative">
        <textarea
          ref={ref}
          id={textareaId}
          rows={rows}
          maxLength={maxLength}
          value={value}
          className={cn(
            'w-full bg-neutral-900/80 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 transition-all duration-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50 resize-y min-h-[90px]',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
            className
          )}
          {...props}
        />
        {maxLength && typeof value === 'string' && (
          <div className="text-[10px] text-neutral-500 text-right mt-1">
            {value.length} / {maxLength}
          </div>
        )}
      </div>
      {error ? (
        <p className="text-xs text-red-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-neutral-500">{helperText}</p>
      ) : null}
    </div>
  )
})

Textarea.displayName = 'Textarea'
export default Textarea
