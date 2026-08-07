import { cn } from '@/utils/cn'

export function Timeline({ children, layout = 'vertical', className, ...props }) {
  const isVertical = layout === 'vertical'

  return (
    <div
      className={cn(
        'relative w-full flex',
        isVertical ? 'flex-col pl-4 sm:pl-6 border-l border-neutral-800 space-y-8' : 'flex-row items-stretch justify-between overflow-x-auto gap-6 pb-4 border-b border-neutral-800',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default Timeline
