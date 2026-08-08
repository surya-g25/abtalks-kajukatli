import { Link } from 'react-router-dom'
import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'

export function QuickActionsToolbar() {
  const actions = [
    { title: 'Continue Challenge', icon: 'Code', route: '/challenges', primary: true },
    { title: 'Leaderboard', icon: 'Trophy', route: '/leaderboard' },
    { title: 'Achievements', icon: 'Award', route: '/achievements' },
    { title: 'My Profile', icon: 'User', route: '/profile' },
    { title: 'Full Analytics', icon: 'BarChart2', route: '/dashboard' },
  ]

  return (
    <GlassCard className="p-5 border border-neutral-800/80 shadow-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Zap" size={18} className="text-amber-400" />
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Quick Actions</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((act, idx) => (
          <Link key={idx} to={act.route}>
            <div
              className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all duration-200 group ${
                act.primary
                  ? 'bg-amber-500 border-amber-400 text-neutral-950 hover:bg-amber-400 shadow-lg shadow-amber-500/20'
                  : 'bg-neutral-950/70 border-neutral-800 text-neutral-300 hover:border-amber-500/40 hover:text-white'
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 transition ${
                  act.primary ? 'bg-neutral-950/20 text-neutral-950' : 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-neutral-950'
                }`}
              >
                <Icon name={act.icon} size={18} />
              </div>
              <span className={`text-xs font-bold ${act.primary ? 'text-neutral-950' : ''}`}>
                {act.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </GlassCard>
  )
}

export default QuickActionsToolbar
