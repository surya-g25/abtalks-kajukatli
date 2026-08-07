import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function BottomNav({ items = [], activeItem, onItemClick }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-panel border-t border-neutral-800/80 px-2 py-2 pb-safe">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = activeItem === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick && onItemClick(item.id)}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-xl text-xs font-medium transition-all',
                isActive ? 'text-amber-400 font-bold' : 'text-neutral-400 hover:text-neutral-200'
              )}
            >
              {item.icon && <Icon name={item.icon} size={20} />}
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav
