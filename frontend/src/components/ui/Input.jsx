import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

export const Input = forwardRef(function Input(
  { label, error, helperText, leftIcon, rightIcon, className, id, type = 'text', ...props },
  ref
) {
  const inputId = id || props.name

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && <div className="absolute left-3 text-neutral-400 pointer-events-none">{leftIcon}</div>}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={cn(
            'w-full bg-neutral-900/80 border border-neutral-800 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-500 transition-all duration-200 outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/30',
            className
          )}
          {...props}
        />
        {rightIcon && <div className="absolute right-3 text-neutral-400">{rightIcon}</div>}
      </div>
      {error ? (
        <p className="text-xs text-red-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-neutral-500">{helperText}</p>
      ) : null}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
