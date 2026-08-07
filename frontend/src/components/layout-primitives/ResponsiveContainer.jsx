import { cn } from '@/utils/cn'

const sizeClasses = {
  xs: 'max-w-xl',
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-full',
}

export function ResponsiveContainer({ children, size = 'lg', className, ...props }) {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size] || sizeClasses.lg,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default ResponsiveContainer
