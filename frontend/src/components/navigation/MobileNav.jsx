import Drawer from '@/components/ui/Drawer'
import Icon from '@/components/common/Icon'

export function MobileNav({ isOpen, onClose, items = [], activeItem, onItemClick }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="Navigation" side="left">
      <nav className="space-y-2 py-2">
        {items.map((item) => {
          const isActive = activeItem === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if (onItemClick) onItemClick(item.id)
                onClose()
              }}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${
                isActive
                  ? 'bg-amber-500/15 text-amber-400 font-bold border border-amber-500/30'
                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {item.icon && <Icon name={item.icon} size={20} />}
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </Drawer>
  )
}

export default MobileNav
