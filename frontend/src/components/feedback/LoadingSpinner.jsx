import { cn } from '@/utils/cn'

const sizeStyles = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-3',
}

export function LoadingSpinner({ size = 'md', className }) {
  return (
    <div
      className={cn(
        'border-neutral-700 border-t-amber-500 rounded-full animate-spin shrink-0',
        sizeStyles[size],
        className
      )}
    />
  )
}

export default LoadingSpinner
