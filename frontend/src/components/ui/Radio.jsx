import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export const Radio = forwardRef(function Radio(
  { label, checked, onChange, id, className, ...props },
  ref
) {
  const radioId = id || props.name

  return (
    <label htmlFor={radioId} className="inline-flex items-center gap-2.5 cursor-pointer select-none group">
      <input
        ref={ref}
        type="radio"
        id={radioId}
        checked={checked}
        onChange={onChange}
        className="sr-only peer"
        {...props}
      />
      <div
        className={cn(
          'w-4 h-4 rounded-full border border-neutral-700 bg-neutral-900 peer-checked:border-amber-500 transition-all flex items-center justify-center peer-focus:ring-2 peer-focus:ring-amber-500/40 group-hover:border-neutral-500',
          className
        )}
      >
        <div className="w-2 h-2 rounded-full bg-amber-500 opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
      {label && <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{label}</span>}
    </label>
  )
})

Radio.displayName = 'Radio'
export default Radio
