import { cn } from '@/utils/cn'

export function PageSection({ children, className, id, borderBottom = false, borderTop = false, ...props }) {
  return (
    <section
      id={id}
      className={cn(
        'py-12 sm:py-16 lg:py-20 relative overflow-hidden w-full',
        borderTop && 'border-t border-neutral-800/80',
        borderBottom && 'border-b border-neutral-800/80',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

export default PageSection
