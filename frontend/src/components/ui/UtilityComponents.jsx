import Avatar from './Avatar'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function Tag({ children, variant = 'neutral', className, ...props }) {
  const variants = {
    neutral: 'bg-neutral-900 border-neutral-800 text-neutral-400',
    amber: 'bg-amber-500/5 border-amber-500/10 text-amber-400',
    emerald: 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400',
    rose: 'bg-red-500/5 border-red-500/10 text-red-400',
    sky: 'bg-sky-500/5 border-sky-500/10 text-sky-400',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border tracking-wider uppercase select-none',
        variants[variant] || variants.neutral,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function Pill({ children, variant = 'neutral', className, ...props }) {
  const variants = {
    neutral: 'bg-neutral-800 border-neutral-700 text-neutral-300',
    gradient: 'bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border-amber-500/30',
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    rose: 'bg-red-500/10 border-red-500/20 text-red-400',
    sky: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider select-none',
        variants[variant] || variants.neutral,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export function Counter({ count = 0, pulse = false, className, ...props }) {
  if (count <= 0) return null

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[9px] font-black bg-amber-500 text-neutral-950 select-none shadow-sm shadow-amber-500/20',
        pulse && 'relative flex h-3.5 w-3.5', // wrapper if animated
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
      )}
      <span className="relative z-10">{count > 99 ? '99+' : count}</span>
    </span>
  )
}

export function StatGroup({ children, className, ...props }) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function IconWrapper({
  iconName,
  size = 'md', // 'sm' | 'md' | 'lg'
  shape = 'squircle', // 'circle' | 'squircle'
  color = 'amber', // 'amber' | 'emerald' | 'rose' | 'sky' | 'neutral'
  className,
  ...props
}) {
  const sizeClasses = {
    sm: 'p-1.5 rounded-lg text-xs',
    md: 'p-2.5 rounded-xl text-sm',
    lg: 'p-3.5 rounded-2xl text-base',
  }

  const shapeClasses = {
    circle: 'rounded-full',
    squircle: '', // handled by size defaults
  }

  const colorClasses = {
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-450 text-emerald-450 text-emerald-400',
    rose: 'bg-red-500/10 border-red-500/20 text-red-400',
    sky: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
    neutral: 'bg-neutral-900 border-neutral-800 text-neutral-400',
  }

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  }

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center border shrink-0',
        sizeClasses[size],
        shape === 'circle' && shapeClasses.circle,
        colorClasses[color] || colorClasses.amber,
        className
      )}
      {...props}
    >
      <Icon name={iconName} size={iconSizes[size] || 18} />
    </div>
  )
}

export function AvatarGroup({
  avatars = [], // array of { src, alt } or strings
  limit = 4,
  size = 'sm', // 'sm' | 'md'
  className,
  ...props
}) {
  const displayAvatars = avatars.slice(0, limit)
  const remaining = Math.max(0, avatars.length - limit)

  return (
    <div className={cn('flex items-center -space-x-2.5 select-none', className)} {...props}>
      {displayAvatars.map((avatar, idx) => {
        const src = typeof avatar === 'string' ? avatar : avatar.src
        const alt = typeof avatar === 'string' ? 'User' : avatar.alt || 'User'

        return (
          <Avatar
            key={idx}
            src={src}
            alt={alt}
            size={size}
            className="ring-2 ring-neutral-950 shrink-0"
          />
        )
      })}
      {remaining > 0 && (
        <div
          className={cn(
            'rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center font-bold text-neutral-400 ring-2 ring-neutral-950 text-[10px] shrink-0',
            size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}

export function SectionDivider({ iconName, className, ...props }) {
  return (
    <div className={cn('relative flex items-center justify-center w-full my-8 py-2', className)} {...props}>
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-neutral-800" />
      </div>
      {iconName && (
        <div className="relative z-10 px-3 bg-neutral-950 text-neutral-500 border border-neutral-800 p-1.5 rounded-lg">
          <Icon name={iconName} size={14} />
        </div>
      )}
    </div>
  )
}
