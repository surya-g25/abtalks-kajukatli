import { cn } from '@/utils/cn'

const badgeVariants = {
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  error: 'bg-red-500/10 text-red-400 border-red-500/20',
  info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  neutral: 'bg-neutral-800 text-neutral-300 border-neutral-700',
  gradient: 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border-amber-500/30',
}

export function Badge({ children, variant = 'neutral', className, icon, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border backdrop-blur-sm tracking-wide',
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}

export default Badge
