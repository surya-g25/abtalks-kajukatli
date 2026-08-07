import { useState } from 'react'
import Icon from '@/components/common/Icon'
import { cn } from '@/utils/cn'

export function Sidebar({ items = [], activeItem, onItemClick, className }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'glass-panel border-r border-neutral-800/80 min-h-screen flex flex-col transition-all duration-300 p-4',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
        {!collapsed && <span className="text-sm font-extrabold tracking-wider uppercase text-neutral-400">Navigation</span>}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition mx-auto"
          aria-label="Toggle Sidebar Collapse"
        >
          <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} size={18} />
        </button>
      </div>

      <nav className="flex-1 mt-6 space-y-1.5">
        {items.map((item) => {
          const isActive = activeItem === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onItemClick && onItemClick(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left',
                isActive
                  ? 'bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
              )}
            >
              {item.icon && <Icon name={item.icon} size={20} className="shrink-0" />}
              {!collapsed && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
