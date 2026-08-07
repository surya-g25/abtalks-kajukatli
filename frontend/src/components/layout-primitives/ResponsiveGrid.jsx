import { cn } from '@/utils/cn'

export function ResponsiveGrid({ children, minWidth = '280px', gap = '1.5rem', className }) {
  return (
    <div
      className={cn('grid', className)}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
        gap,
      }}
    >
      {children}
    </div>
  )
}

export default ResponsiveGrid
