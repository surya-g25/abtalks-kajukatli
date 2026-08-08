import StatCard from '@/components/cards/StatCard'
import Icon from '@/components/common/Icon'

export function QuickStatsSection({ statistics }) {
  const stats = [
    {
      title: 'Completed Challenges',
      value: (statistics?.completedChallenges || 0).toString(),
      change: '+1 this week',
      isPositive: true,
      iconName: 'Target',
    },
    {
      title: 'GitHub Commits',
      value: (statistics?.githubCommits || 0).toString(),
      change: '+3 this week',
      isPositive: true,
      iconName: 'GitCommit',
    },
    {
      title: 'LinkedIn Posts',
      value: (statistics?.linkedinPosts || 0).toString(),
      change: '+1 this week',
      isPositive: true,
      iconName: 'Share2',
    },
    {
      title: 'Hours Studied',
      value: `${statistics?.hoursStudied || 0}h`,
      change: '+2h this week',
      isPositive: true,
      iconName: 'Clock',
    },
    {
      title: 'XP Earned',
      value: (statistics?.xpEarned || 0).toLocaleString(),
      change: '+150 XP',
      isPositive: true,
      iconName: 'Zap',
    },
    {
      title: 'Avg. Completion Rate',
      value: `${statistics?.averageCompletionRate || 94}%`,
      change: '+1.5%',
      isPositive: true,
      iconName: 'TrendingUp',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-1">
        <Icon name="BarChart2" size={18} className="text-amber-400" />
        <h3 className="text-lg font-black text-white tracking-tight">Quick Statistics</h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            isPositive={stat.isPositive}
            iconName={stat.iconName}
          />
        ))}
      </div>
    </div>
  )
}

export default QuickStatsSection
