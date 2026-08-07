import { cn } from '@/utils/cn'
import Icon from '@/components/common/Icon'

export function Chip({ label, active, onClick, onRemove, icon, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer select-none',
        active
          ? 'bg-amber-500 text-neutral-950 border-amber-500 font-semibold shadow-md shadow-amber-500/20'
          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700 hover:text-white',
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation()
            onRemove()
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.stopPropagation()
              onRemove()
            }
          }}
          className="hover:opacity-80 p-0.5 rounded-full"
        >
          <Icon name="X" size={12} />
        </span>
      )}
    </button>
  )
}

export default Chip
