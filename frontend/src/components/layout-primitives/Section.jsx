import { cn } from '@/utils/cn'

export function Section({ children, className, id, borderBottom = false }) {
  return (
    <section
      id={id}
      className={cn(
        'py-12 sm:py-16 lg:py-20 relative overflow-hidden',
        borderBottom && 'border-b border-neutral-800/80',
        className
      )}
    >
      {children}
    </section>
  )
}

export default Section
