import { cn } from '@/utils/cn'

export function FlexLayout({
  children,
  direction = 'row',
  align = 'center',
  justify = 'between',
  gap = '4',
  wrap = false,
  className,
}) {
  const dirClasses = direction === 'col' ? 'flex-col' : 'flex-row'
  const alignClasses = `items-${align}`
  const justifyClasses = `justify-${justify}`
  const gapClasses = `gap-${gap}`
  const wrapClasses = wrap ? 'flex-wrap' : 'flex-nowrap'

  return (
    <div className={cn('flex', dirClasses, alignClasses, justifyClasses, gapClasses, wrapClasses, className)}>
      {children}
    </div>
  )
}

export default FlexLayout
