import { cn } from '@/utils/cn'

export function CircularProgress({
  progress = 0,
  total = 100,
  size = 60,
  strokeWidth = 6,
  showValue = true,
  color = 'amber', // 'amber' | 'emerald' | 'rose' | 'sky'
  className,
  ...props
}) {
  const percentage = Math.min(100, Math.max(0, Math.round((progress / total) * 100)))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference

  const colorVariants = {
    amber: 'stroke-amber-500',
    emerald: 'stroke-emerald-500',
    rose: 'stroke-rose-500',
    sky: 'stroke-sky-500',
  }

  return (
    <div
      className={cn('relative inline-flex items-center justify-center select-none', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-neutral-800 fill-none"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={cn('fill-none transition-all duration-550 ease-out', colorVariants[color] || colorVariants.amber)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {showValue && (
        <span className="absolute text-[10px] font-extrabold text-white">
          {percentage}%
        </span>
      )}
    </div>
  )
}

export default CircularProgress
