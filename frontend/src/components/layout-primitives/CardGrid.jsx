import { cn } from '@/utils/cn'

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
}

export function CardGrid({ children, cols = 3, className }) {
  return (
    <div className={cn('grid gap-6', colsMap[cols] || colsMap[3], className)}>
      {children}
    </div>
  )
}

export default CardGrid
