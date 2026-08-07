import { cn } from '@/utils/cn'

export function SectionHeader({
  title,
  description,
  actions,
  align = 'left',
  className,
  ...props
}) {
  const isCenter = align === 'center'

  return (
    <div
      className={cn(
        'flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10 w-full',
        isCenter && 'items-center text-center md:flex-col md:items-center',
        className
      )}
      {...props}
    >
      <div className={cn('space-y-2', isCenter ? 'max-w-2xl mx-auto' : 'max-w-3xl')}>
        {title}
        {description}
      </div>
      {actions && (
        <div className={cn('flex items-center gap-3 shrink-0', isCenter && 'justify-center')}>
          {actions}
        </div>
      )}
    </div>
  )
}

export default SectionHeader
