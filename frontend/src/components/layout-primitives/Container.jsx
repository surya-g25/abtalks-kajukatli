import { cn } from '@/utils/cn'

const maxWidthMap = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  full: 'max-w-full',
}

export function Container({ children, maxWidth = 'lg', className }) {
  return (
    <div className={cn('w-full mx-auto px-4 sm:px-6 lg:px-8', maxWidthMap[maxWidth], className)}>
      {children}
    </div>
  )
}

export default Container
