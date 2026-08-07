import { cn } from '@/utils/cn'

const columnsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5',
  6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
}

export function GridWrapper({ children, cols = 3, gap = 'md', className, ...props }) {
  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-10',
  }

  return (
    <div
      className={cn(
        'grid w-full',
        columnsMap[cols] || columnsMap[3],
        gapClasses[gap] || gapClasses.md,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export default GridWrapper
