import { Link } from 'react-router-dom'
import Icon from '@/components/common/Icon'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { mainNavigation } from '@/config/navigation'
import { useAuth } from '@/context/AuthContext'

export function Header({ onMobileMenuToggle, onAiToggle, user: propUser }) {
  const { user: authUser, isAuthenticated, logout } = useAuth()
  const activeUser = authUser || propUser

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-neutral-800/80 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
            aria-label="Toggle Mobile Navigation"
          >
            <Icon name="Menu" size={20} />
          </button>
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-base shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              AB
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
              ABTalks
            </span>
          </Link>
        </div>

        {/* Center: Main Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {mainNavigation
            .filter((item) => isAuthenticated || item.visibility !== 'private')
            .map((item) => (
              <Link
                key={item.id}
                to={item.route}
                className="text-xs font-semibold uppercase tracking-wider text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-2"
              >
                <Icon name={item.icon} size={15} />
                <span>{item.title}</span>
              </Link>
            ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5">
          {/* Toggle AI Co-Pilot Drawer */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={onAiToggle}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800/80 transition relative"
              aria-label="Toggle AI Co-Pilot"
              title="Toggle AI Co-Pilot Drawer"
            >
              <Icon name="Sparkles" size={18} className="text-purple-400 animate-pulse" />
            </button>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to="/profile" className="flex items-center gap-2 text-xs font-semibold text-neutral-200 hover:text-white">
                <Avatar src={activeUser?.avatar} alt={activeUser?.name || 'User'} size="sm" />
                <span className="hidden sm:inline-block max-w-[120px] truncate">{activeUser?.name}</span>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-xs text-neutral-400 hover:text-red-400"
                title="Log Out"
              >
                <Icon name="LogOut" size={16} />
                <span className="hidden md:inline-block">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-xs font-semibold">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="sm" className="text-xs font-semibold shadow-amber-500/20">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

