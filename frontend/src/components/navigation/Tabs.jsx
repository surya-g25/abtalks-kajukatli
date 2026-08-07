import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export function Tabs({ tabs = [], activeTab, onChange, className }) {
  return (
    <div className={cn('flex items-center gap-1 p-1 bg-neutral-900/90 border border-neutral-800 rounded-xl max-w-fit', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-4 py-2 text-xs font-semibold rounded-lg transition-colors select-none outline-none cursor-pointer',
              isActive ? 'text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 bg-amber-500 rounded-lg shadow-md shadow-amber-500/20"
                transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
