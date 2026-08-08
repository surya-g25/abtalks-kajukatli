import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/common/Icon'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'

export function DashboardHeader({ user = { name: 'Alex Rivera', avatar: '', level: 12, xp: 2450 } }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [greeting, setGreeting] = useState('Welcome back')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  // Keyboard shortcut Cmd+K / Ctrl+K trigger
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setShowSearchModal((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const mockNotifications = [
    { id: 1, title: 'Streak Milestone!', text: 'You hit a 14-day streak. 🔥', time: '10m ago', unread: true },
    { id: 2, title: 'Achievement Unlocked', text: 'Earned "Night Owl" badge.', time: '2h ago', unread: true },
    { id: 3, title: 'Leaderboard Update', text: 'You moved up 2 spots to #4!', time: '1d ago', unread: false },
  ]

  const quickLinks = [
    { title: "Today's Mission", icon: 'Target', route: '/dashboard' },
    { title: 'Async Hooks Challenge', icon: 'Code', route: '/challenges' },
    { title: 'Leaderboard', icon: 'Trophy', route: '/leaderboard' },
    { title: 'Achievements', icon: 'Award', route: '/achievements' },
    { title: 'My Profile', icon: 'User', route: '/profile' },
  ]

  const filteredLinks = searchQuery
    ? quickLinks.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : quickLinks

  return (
    <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-neutral-800/80 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left: User Profile & Dynamic Greeting */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Link to="/profile">
              <Avatar
                src={user.avatar}
                alt={user.name}
                size="lg"
                className="ring-4 ring-amber-500/20 hover:ring-amber-500/50 transition-all duration-300 transform group-hover:scale-105"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
            </Link>
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {greeting}, {user.name.split(' ')[0]}! <span className="inline-block animate-bounce">👋</span>
              </h1>
              <Badge variant="warning" className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                Lv. {user.level} • Code Alchemist
              </Badge>
            </div>
            <p className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
              <span>Ready to crush today's mission?</span>
              <span className="w-1 h-1 rounded-full bg-neutral-600" />
              <span className="text-amber-400 font-mono font-bold">{user.xp.toLocaleString()} XP</span>
            </p>
          </div>
        </div>

        {/* Right: Quick Search, Notifications & Profile Button */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          {/* Quick Search Button */}
          <button
            type="button"
            onClick={() => setShowSearchModal(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all text-xs font-semibold shadow-inner"
            aria-label="Quick Search"
          >
            <Icon name="Search" size={16} className="text-neutral-500" />
            <span className="hidden sm:inline">Quick Search...</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-bold text-neutral-400 bg-neutral-800 border border-neutral-700 rounded-md">
              ⌘K
            </kbd>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700 transition-all shadow-sm"
              aria-label="Notifications"
            >
              <Icon name="Bell" size={18} />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-neutral-950 animate-pulse" />
            </button>

            {/* Notifications Popover */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 sm:w-88 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-50 p-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                    <span className="text-xs font-extrabold text-white uppercase tracking-wider">Notifications</span>
                    <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full">
                      2 Unread
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 max-h-64 overflow-y-auto pr-1">
                    {mockNotifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-xl border text-xs transition ${
                          n.unread
                            ? 'bg-neutral-800/80 border-amber-500/30 text-white'
                            : 'bg-neutral-900/50 border-neutral-800/80 text-neutral-400'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-400">{n.title}</span>
                          <span className="text-[10px] text-neutral-500">{n.time}</span>
                        </div>
                        <p className="mt-1 text-neutral-300">{n.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-neutral-800 text-center">
                    <button
                      type="button"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-neutral-400 hover:text-amber-400 transition font-semibold"
                    >
                      Close Notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Shortcut Link */}
          <Link
            to="/profile"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 hover:bg-amber-500/20 transition text-xs font-bold"
          >
            <Icon name="User" size={16} />
            <span className="hidden sm:inline">Profile</span>
          </Link>
        </div>
      </div>

      {/* Quick Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-3xl p-5 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Icon name="Search" size={18} className="text-amber-400" />
                  <span>Quick Navigation & Search</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSearchModal(false)}
                  className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800"
                >
                  <Icon name="X" size={18} />
                </button>
              </div>

              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Type to search actions, challenges, pages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="mt-4 space-y-2 max-h-60 overflow-y-auto">
                {filteredLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.route}
                    onClick={() => setShowSearchModal(false)}
                    className="flex items-center justify-between p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/60 hover:border-amber-500/40 hover:bg-neutral-800/50 transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-neutral-950 transition">
                        <Icon name={link.icon} size={16} />
                      </div>
                      <span className="text-sm font-semibold text-neutral-200 group-hover:text-white">
                        {link.title}
                      </span>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-neutral-600 group-hover:text-amber-400 transition" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DashboardHeader
