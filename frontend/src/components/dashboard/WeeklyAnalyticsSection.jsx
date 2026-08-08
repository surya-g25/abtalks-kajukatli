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
import {
  ChartContainer,
  AnalyticsHeader,
  ChartTooltip,
  ResponsiveChartWrapper,
} from '@/components/charts/ChartWrappers'

export function WeeklyAnalyticsSection({ weeklyActivity }) {
  const [activeFilter, setActiveFilter] = useState('xp')

  const defaultWeeklyData = [
    { day: 'Mon', xp: 250, tasks: 4, consistency: 90 },
    { day: 'Tue', xp: 320, tasks: 5, consistency: 95 },
    { day: 'Wed', xp: 180, tasks: 3, consistency: 85 },
    { day: 'Thu', xp: 400, tasks: 6, consistency: 100 },
    { day: 'Fri', xp: 350, tasks: 5, consistency: 92 },
    { day: 'Sat', xp: 500, tasks: 7, consistency: 100 },
    { day: 'Sun', xp: 450, tasks: 6, consistency: 98 },
  ]

  const weeklyData = weeklyActivity && weeklyActivity.length > 0 ? weeklyActivity : defaultWeeklyData

  const totalXp = weeklyData.reduce((acc, curr) => acc + (curr.xp || 0), 0)
  const avgTasks = (weeklyData.reduce((acc, curr) => acc + (curr.tasks || 0), 0) / weeklyData.length).toFixed(1)
  const avgConsistency = (weeklyData.reduce((acc, curr) => acc + (curr.consistency || 0), 0) / weeklyData.length).toFixed(1)

  const filters = [
    { label: 'XP Growth', value: 'xp' },
    { label: 'Daily Completion', value: 'tasks' },
    { label: 'Consistency %', value: 'consistency' },
  ]

  const stats = [
    { label: 'This Week XP', value: `${totalXp.toLocaleString()} XP` },
    { label: 'Avg Daily Tasks', value: `${avgTasks} Tasks` },
    { label: 'Consistency Index', value: `${avgConsistency}%` },
  ]

  return (
    <ChartContainer className="shadow-2xl">
      <AnalyticsHeader
        title="Weekly Activity & Growth Analytics"
        stats={stats}
        filters={filters}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <ResponsiveChartWrapper height={260}>
        <ResponsiveContainer width="100%" height="100%">
          {activeFilter === 'xp' ? (
            <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="day" stroke="#737373" fontSize={11} tickLine={false} />
              <YAxis stroke="#737373" fontSize={11} tickLine={false} />
              <Tooltip content={<ChartTooltip formatter={(val) => `${val} XP`} />} />
              <Area
                type="monotone"
                dataKey="xp"
                name="XP Earned"
                stroke="#f59e0b"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#xpGradient)"
              />
            </AreaChart>
          ) : activeFilter === 'tasks' ? (
            <BarChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="day" stroke="#737373" fontSize={11} tickLine={false} />
              <YAxis stroke="#737373" fontSize={11} tickLine={false} />
              <Tooltip content={<ChartTooltip formatter={(val) => `${val} Tasks`} />} />
              <Bar dataKey="tasks" name="Tasks Completed" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="consistencyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
              <XAxis dataKey="day" stroke="#737373" fontSize={11} tickLine={false} />
              <YAxis stroke="#737373" fontSize={11} tickLine={false} domain={[60, 100]} />
              <Tooltip content={<ChartTooltip formatter={(val) => `${val}%`} />} />
              <Area
                type="monotone"
                dataKey="consistency"
                name="Consistency Score"
                stroke="#6366f1"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#consistencyGradient)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </ResponsiveChartWrapper>
    </ChartContainer>
  )
}

export default WeeklyAnalyticsSection
