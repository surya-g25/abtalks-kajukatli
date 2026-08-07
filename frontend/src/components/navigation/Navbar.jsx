import Icon from '@/components/common/Icon'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'

export function Navbar({ brandName = 'ABTalks', navItems = [], user, onMobileMenuToggle }) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-neutral-800/80 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
            aria-label="Toggle Navigation Menu"
          >
            <Icon name="Menu" size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-neutral-950 font-black text-lg shadow-md shadow-amber-500/20">
              AB
            </div>
            <span className="text-lg font-extrabold tracking-tight text-white">{brandName}</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href || '#'}
              className="text-sm font-medium text-neutral-400 hover:text-amber-400 transition-colors flex items-center gap-2"
            >
              {item.icon && <Icon name={item.icon} size={16} />}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* User / Actions */}
        <div className="flex items-center gap-3">
          {user ? (
            <Avatar src={user.avatar} alt={user.name} size="sm" />
          ) : (
            <Button variant="primary" size="sm">
              Get Started
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
