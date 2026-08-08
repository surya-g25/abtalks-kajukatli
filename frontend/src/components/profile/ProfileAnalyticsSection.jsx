import { useState } from 'react'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import StatCard from '@/components/cards/StatCard'
import Icon from '@/components/common/Icon'
import {
  ChartContainer,
  AnalyticsHeader,
  ChartTooltip,
  ResponsiveChartWrapper,
} from '@/components/charts/ChartWrappers'

export function ProfileAnalyticsSection() {
  const [activeFilter, setActiveFilter] = useState('xp')

  const stats = [
    { title: 'Challenges Completed', value: '28', change: '+4 this week', isPositive: true, iconName: 'Target' },
    { title: 'GitHub Commits', value: '142', change: '+18 this week', isPositive: true, iconName: 'GitCommit' },
    { title: 'LinkedIn Posts', value: '18', change: '+2 this week', isPositive: true, iconName: 'Share2' },
    { title: 'Hours Studied', value: '64.5h', change: '+8.2h this week', isPositive: true, iconName: 'Clock' },
    { title: 'Projects Built', value: '6', change: '+1 this month', isPositive: true, iconName: 'Folder' },
    { title: 'Longest Streak', value: '21 Days', change: 'Personal Best', isPositive: true, iconName: 'Flame' },
    { title: 'Avg. Completion', value: '94%', change: '+2.5%', isPositive: true, iconName: 'TrendingUp' },
  ]

  const chartData = [
    { label: 'Week 1', xp: 450, commits: 24, consistency: 88 },
    { label: 'Week 2', xp: 720, commits: 38, consistency: 92 },
    { label: 'Week 3', xp: 1100, commits: 52, consistency: 95 },
    { label: 'Week 4', xp: 1650, commits: 78, consistency: 94 },
    { label: 'Week 5', xp: 2100, commits: 112, consistency: 98 },
    { label: 'Week 6', xp: 2450, commits: 142, consistency: 96 },
  ]

  const filters = [
    { label: 'XP Cumulative Growth', value: 'xp' },
    { label: 'GitHub Commits Volume', value: 'commits' },
    { label: 'Consistency Index %', value: 'consistency' },
  ]

  const headerStats = [
    { label: 'Total XP Earned', value: '2,450 XP' },
    { label: 'Verified Code Commits', value: '142 Commits' },
    { label: 'Cohort Rank', value: '#4 Overall' },
  ]

  return (
    <div className="space-y-6">
      {/* STEP 6: Quick Statistics Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1">
          <Icon name="BarChart2" size={18} className="text-amber-400" />
          <h3 className="text-lg font-black text-white tracking-tight">Developer Core Metrics</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {stats.map((s, idx) => (
            <StatCard
              key={idx}
              title={s.title}
              value={s.value}
              change={s.change}
              isPositive={s.isPositive}
              iconName={s.iconName}
            />
          ))}
        </div>
      </div>

      {/* STEP 7: Learning Analytics Recharts */}
      <ChartContainer className="shadow-2xl">
        <AnalyticsHeader
          title="Learning Progression & Growth Analytics"
          stats={headerStats}
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <ResponsiveChartWrapper height={280}>
          <ResponsiveContainer width="100%" height="100%">
            {activeFilter === 'xp' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="xpProfileGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="label" stroke="#737373" fontSize={11} tickLine={false} />
                <YAxis stroke="#737373" fontSize={11} tickLine={false} />
                <Tooltip content={<ChartTooltip formatter={(val) => `${val} XP`} />} />
                <Area
                  type="monotone"
                  dataKey="xp"
                  name="Cumulative XP"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#xpProfileGrad)"
                />
              </AreaChart>
            ) : activeFilter === 'commits' ? (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="label" stroke="#737373" fontSize={11} tickLine={false} />
                <YAxis stroke="#737373" fontSize={11} tickLine={false} />
                <Tooltip content={<ChartTooltip formatter={(val) => `${val} Commits`} />} />
                <Bar dataKey="commits" name="GitHub Commits" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            ) : (
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="consistencyProfileGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                <XAxis dataKey="label" stroke="#737373" fontSize={11} tickLine={false} />
                <YAxis stroke="#737373" fontSize={11} tickLine={false} domain={[70, 100]} />
                <Tooltip content={<ChartTooltip formatter={(val) => `${val}%`} />} />
                <Area
                  type="monotone"
                  dataKey="consistency"
                  name="Consistency Rate"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#consistencyProfileGrad)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </ResponsiveChartWrapper>
      </ChartContainer>
    </div>
  )
}

export default ProfileAnalyticsSection
