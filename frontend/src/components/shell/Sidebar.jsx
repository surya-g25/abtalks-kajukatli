import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Icon from '@/components/common/Icon'
import Avatar from '@/components/ui/Avatar'
import { mainNavigation } from '@/config/navigation'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/utils/cn'

export function Sidebar({ className }) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, logout } = useAuth()

  return (
    <aside
      className={cn(
        'hidden lg:flex flex-col glass-panel border-r border-neutral-800/80 min-h-[calc(100vh-4rem)] transition-all duration-300 p-4 sticky top-16',
        collapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-800">
        {!collapsed && <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Navigation</span>}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition mx-auto"
          aria-label="Toggle Sidebar"
        >
          <Icon name={collapsed ? 'ChevronRight' : 'ChevronLeft'} size={18} />
        </button>
      </div>

      <nav className="flex-1 space-y-1.5">
        {mainNavigation
          .filter((item) => isAuthenticated || item.visibility !== 'private')
          .map((item) => {
            const isActive = location.pathname === item.route
            return (
              <Link
                key={item.id}
                to={item.route}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all',
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                )}
              >
                <Icon name={item.icon} size={18} className="shrink-0" />
                {!collapsed && <span>{item.title}</span>}
              </Link>
            )
          })}
      </nav>

      {isAuthenticated && (
        <div className="pt-4 border-t border-neutral-800 space-y-2">
          {!collapsed && user && (
            <div className="flex items-center gap-2.5 p-2 rounded-xl bg-neutral-900/60 border border-neutral-800/80">
              <Avatar src={user.avatar} alt={user.name} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-amber-400 font-mono font-semibold">Lvl {user.level || 1} • {user.xp || 0} XP</p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition"
          >
            <Icon name="LogOut" size={18} className="shrink-0" />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      )}
    </aside>
  )
}

export default Sidebar

