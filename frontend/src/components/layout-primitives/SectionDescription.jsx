import { cn } from '@/utils/cn'

export function SectionDescription({ children, className, size = 'md', ...props }) {
  const sizeClasses = {
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
  }

  return (
    <p
      className={cn(
        'text-neutral-400 font-medium leading-relaxed max-w-3xl',
        sizeClasses[size] || sizeClasses.md,
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export default SectionDescription
