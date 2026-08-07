import { useState } from 'react'
import { cn } from '@/utils/cn'

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
}

const statusMap = {
  online: 'bg-emerald-500 ring-neutral-950',
  offline: 'bg-neutral-500 ring-neutral-950',
  busy: 'bg-red-500 ring-neutral-950',
}

export function Avatar({ src, alt = 'User', initials, size = 'md', status, className }) {
  const [imageError, setImageError] = useState(false)

  const fallbackInitials = initials || alt.slice(0, 2).toUpperCase()

  return (
    <div className="relative inline-block shrink-0">
      <div
        className={cn(
          'relative rounded-full overflow-hidden bg-neutral-800 border border-neutral-700/60 flex items-center justify-center font-bold text-neutral-300 select-none shadow-sm',
          sizeMap[size],
          className
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{fallbackInitials}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-3 h-3 rounded-full ring-2',
            statusMap[status]
          )}
        />
      )}
    </div>
  )
}

export default Avatar
