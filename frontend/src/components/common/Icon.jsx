import * as Icons from 'lucide-react'
import { cn } from '@/utils/cn'

export default function Icon({ name, size = 20, className, strokeWidth = 2, ...props }) {
  const LucideIcon = Icons[name] || Icons.HelpCircle

  return (
    <LucideIcon
      size={size}
      strokeWidth={strokeWidth}
      className={cn('inline-block shrink-0 text-current transition-colors', className)}
      {...props}
    />
  )
}
