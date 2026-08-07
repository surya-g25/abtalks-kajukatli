import { cn } from '@/utils/cn'

export function Display({ children, className, ...props }) {
  return (
    <h1
      className={cn('text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight', className)}
      {...props}
    >
      {children}
    </h1>
  )
}

export function HeadingXL({ children, className, ...props }) {
  return (
    <h2
      className={cn('text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug', className)}
      {...props}
    >
      {children}
    </h2>
  )
}

export function HeadingLG({ children, className, ...props }) {
  return (
    <h3
      className={cn('text-xl sm:text-2xl font-bold tracking-tight text-white', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

export function HeadingMD({ children, className, ...props }) {
  return (
    <h4
      className={cn('text-lg sm:text-xl font-semibold text-neutral-100', className)}
      {...props}
    >
      {children}
    </h4>
  )
}

export function HeadingSM({ children, className, ...props }) {
  return (
    <h5
      className={cn('text-base font-semibold text-neutral-200', className)}
      {...props}
    >
      {children}
    </h5>
  )
}

export function BodyLarge({ children, className, ...props }) {
  return (
    <p className={cn('text-base sm:text-lg text-neutral-300 leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

export function Body({ children, className, ...props }) {
  return (
    <p className={cn('text-sm sm:text-base text-neutral-400 leading-relaxed', className)} {...props}>
      {children}
    </p>
  )
}

export function Caption({ children, className, ...props }) {
  return (
    <span className={cn('text-xs text-neutral-500 font-medium', className)} {...props}>
      {children}
    </span>
  )
}

export function Label({ children, className, ...props }) {
  return (
    <label className={cn('text-xs font-semibold uppercase tracking-wider text-neutral-400', className)} {...props}>
      {children}
    </label>
  )
}
