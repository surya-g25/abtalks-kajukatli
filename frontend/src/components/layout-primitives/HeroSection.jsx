import { cn } from '@/utils/cn'

export function HeroSection({ children, className, glow = true, ...props }) {
  return (
    <div
      className={cn(
        'relative py-16 sm:py-24 lg:py-28 flex flex-col items-center justify-center text-center overflow-hidden border-b border-neutral-900/60 bg-neutral-950/20',
        className
      )}
      {...props}
    >
      {glow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[480px] h-80 sm:h-[480px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      )}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {children}
      </div>
    </div>
  )
}

export default HeroSection
