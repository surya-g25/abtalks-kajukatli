import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function GlassCard({ children, className, hoverEffect = true, onClick, ...props }) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -3 } : undefined}
      onClick={onClick}
      className={cn(
        'glass-panel p-6 rounded-2xl border border-neutral-800/80 transition-all duration-200',
        hoverEffect && 'hover:border-amber-500/30 hover:shadow-xl hover:shadow-amber-500/5',
        onClick && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export default GlassCard
