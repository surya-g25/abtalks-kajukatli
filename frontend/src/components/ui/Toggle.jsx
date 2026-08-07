import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export default function Toggle({ enabled, onChange, label, className }) {
  return (
    <label className="inline-flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        onClick={() => onChange(!enabled)}
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors duration-200 outline-none focus:ring-2 focus:ring-amber-500/40 p-0.5',
          enabled ? 'bg-amber-500' : 'bg-neutral-800 border border-neutral-700',
          className
        )}
      >
        <motion.div
          animate={{ x: enabled ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={cn(
            'w-5 h-5 rounded-full shadow-md',
            enabled ? 'bg-neutral-950' : 'bg-neutral-400'
          )}
        />
      </button>
      {label && <span className="text-sm font-medium text-neutral-300">{label}</span>}
    </label>
  )
}
