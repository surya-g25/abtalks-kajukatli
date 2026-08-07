import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export const Checkbox = forwardRef(function Checkbox(
  { label, checked, onChange, id, className, ...props },
  ref
) {
  const checkboxId = id || props.name

  return (
    <label htmlFor={checkboxId} className="inline-flex items-center gap-2.5 cursor-pointer select-none group">
      <input
        ref={ref}
        type="checkbox"
        id={checkboxId}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        {...props}
      />
      <div
        className={cn(
          'w-4 h-4 rounded border border-neutral-700 bg-neutral-900 peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-all flex items-center justify-center peer-focus:ring-2 peer-focus:ring-amber-500/40 group-hover:border-neutral-500',
          className
        )}
      >
        <svg
          className="w-3 h-3 text-neutral-950 opacity-0 peer-checked:opacity-100 transition-opacity"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={3}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      {label && <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{label}</span>}
    </label>
  )
})

Checkbox.displayName = 'Checkbox'
export default Checkbox
