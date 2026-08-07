import { cn } from '@/utils/cn'

export function SectionTitle({
  children,
  className,
  as: Component = 'h2',
  gradient = false,
  size = 'lg',
  ...props
}) {
  const sizeClasses = {
    sm: 'text-lg sm:text-xl',
    md: 'text-xl sm:text-2xl lg:text-3xl',
    lg: 'text-2xl sm:text-3xl lg:text-4xl',
    xl: 'text-3xl sm:text-4xl lg:text-5xl',
  }

  return (
    <Component
      className={cn(
        'font-extrabold tracking-tight',
        gradient
          ? 'bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 bg-clip-text text-transparent'
          : 'text-white',
        sizeClasses[size] || sizeClasses.lg,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export default SectionTitle
