import { Link, useLocation } from 'react-router-dom'
import Icon from '@/components/common/Icon'
import { mobileBottomNavigation } from '@/config/navigation'
import { cn } from '@/utils/cn'

export function MobileBottomNav() {
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 lg:hidden glass-panel border-t border-neutral-800/80 px-2 py-2 pb-safe">
      <div className="flex items-center justify-around">
        {mobileBottomNavigation.map((item) => {
          const isActive = location.pathname === item.route
          return (
            <Link
              key={item.id}
              to={item.route}
              className={cn(
                'flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all',
                isActive ? 'text-amber-400 font-extrabold' : 'text-neutral-400 hover:text-neutral-200'
              )}
            >
              <Icon name={item.icon} size={20} />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default MobileBottomNav
