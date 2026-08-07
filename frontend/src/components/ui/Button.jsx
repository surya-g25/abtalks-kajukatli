import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const variantStyles = {
  primary: 'bg-amber-500 hover:bg-amber-600 text-neutral-950 font-semibold shadow-lg shadow-amber-500/20 focus:ring-2 focus:ring-amber-500/50',
  secondary: 'bg-neutral-800 hover:bg-neutral-700 text-white font-medium focus:ring-2 focus:ring-neutral-600',
  outline: 'border border-neutral-700 hover:border-neutral-500 text-neutral-200 hover:bg-neutral-900 focus:ring-2 focus:ring-neutral-700',
  ghost: 'text-neutral-300 hover:text-white hover:bg-neutral-800/60 focus:ring-2 focus:ring-neutral-800',
  glass: 'glass-card glass-card-hover text-white focus:ring-2 focus:ring-amber-500/40',
  danger: 'bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-600/20 focus:ring-2 focus:ring-red-500',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs rounded-md gap-1.5',
  md: 'px-4 py-2 text-sm rounded-lg gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2.5',
  icon: 'p-2.5 rounded-lg shrink-0',
}

export const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled = false,
    className,
    type = 'button',
    onClick,
    ...props
  },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 outline-none select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none cursor-pointer',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  )
})

Button.displayName = 'Button'
export default Button
