import { cn } from '@/utils/cn'

export function Divider({ label, orientation = 'horizontal', className }) {
  if (orientation === 'vertical') {
    return <div className={cn('w-[1px] bg-neutral-800 self-stretch my-1', className)} />
  }

  return (
    <div className={cn('relative flex items-center w-full my-4', className)}>
      <div className="flex-grow border-t border-neutral-800" />
      {label && (
        <span className="px-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 bg-neutral-950">
          {label}
        </span>
      )}
      <div className="flex-grow border-t border-neutral-800" />
    </div>
  )
}

export default Divider
