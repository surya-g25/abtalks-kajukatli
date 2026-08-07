import { cn } from '@/utils/cn'

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn('animate-pulse rounded-lg bg-neutral-800/80', className)}
      {...props}
    />
  )
}

export default Skeleton
