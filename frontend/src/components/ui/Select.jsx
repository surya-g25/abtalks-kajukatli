import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export const Select = forwardRef(function Select(
  { label, options = [], error, helperText, className, id, children, ...props },
  ref
) {
  const selectId = id || props.name

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={cn(
          'w-full bg-neutral-900/80 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 transition-all duration-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer disabled:opacity-50',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
          className
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-neutral-900 text-white">
            {opt.label}
          </option>
        ))}
        {children}
      </select>
      {error ? (
        <p className="text-xs text-red-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-neutral-500">{helperText}</p>
      ) : null}
    </div>
  )
})

Select.displayName = 'Select'
export default Select
