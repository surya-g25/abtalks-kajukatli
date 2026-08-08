import { useState, useEffect } from 'react'
import PageWrapper from '@/components/layout-primitives/PageWrapper'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import TodayMissionCard from '@/components/dashboard/TodayMissionCard'
import StreakCard from '@/components/dashboard/StreakCard'
import XPLevelCard from '@/components/dashboard/XPLevelCard'
import ContributionHeatmapSection from '@/components/dashboard/ContributionHeatmapSection'
import AchievementsSection from '@/components/dashboard/AchievementsSection'
import QuickStatsSection from '@/components/dashboard/QuickStatsSection'
import WeeklyAnalyticsSection from '@/components/dashboard/WeeklyAnalyticsSection'
import LeaderboardSection from '@/components/dashboard/LeaderboardSection'
import DeveloperJourneySection from '@/components/dashboard/DeveloperJourneySection'
import DailyMotivationSection from '@/components/dashboard/DailyMotivationSection'
import QuickActionsToolbar from '@/components/dashboard/QuickActionsToolbar'
import { fetchDashboardData } from '@/services/dashboardService'
import { DashboardSkeleton } from '@/components/ui/Skeletons'

export default function DashboardPage() {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function loadData() {
      try {
        const data = await fetchDashboardData()
        if (data && isMounted) {
          setDashboardData(data)
        }
      } catch (err) {
        console.error('Failed to load API dashboard data', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadData()
    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return (
      <PageWrapper
        title="Loading Dashboard..."
        description="Please wait while we compile your real-time developer statistics."
        className="space-y-6 pt-2"
      >
        <DashboardSkeleton />
      </PageWrapper>
    )
  }

  // Fallbacks if backend response lacks data
  const student = dashboardData?.student || {
    name: 'Alex Rivera',
    avatar: '',
    level: 12,
    xp: 2450,
    title: 'Code Alchemist',
    currentStreak: 14,
    longestStreak: 21,
    streakFreeze: { active: 1, available: 2 },
    xpInCurrentLevel: 850,
    xpForNextLevel: 1000,
  }

  const todayMission = dashboardData?.todayMission || null
  const leaderboard = dashboardData?.leaderboard || []
  const achievements = dashboardData?.achievements || []
  const statistics = dashboardData?.statistics || {
    completedChallenges: 28,
    githubCommits: 142,
    linkedinPosts: 18,
    hoursStudied: 64.5,
    xpEarned: 2450,
    averageCompletionRate: 94,
  }
  const progress = dashboardData?.progress || {
    activeDays: 42,
    missedDays: 3,
    currentStreak: 14,
    weeklyActivity: [],
    heatmapData: [],
  }

  return (
    <PageWrapper
      title="Student Dashboard"
      description="Track today's missions, daily learning streaks, XP growth, achievements, and leaderboard rank."
      className="space-y-6 pt-2"
    >
      {/* SECTION 1: Dashboard Header */}
      <DashboardHeader user={student} />

      {/* SECTION 2 & 3: Today's Mission (Hero) & Streak System */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <TodayMissionCard challenge={todayMission} />
        </div>
        <div className="lg:col-span-1">
          <StreakCard
            currentStreak={student.currentStreak}
            longestStreak={student.longestStreak}
            streakFreeze={student.streakFreeze}
          />
        </div>
      </div>

      {/* SECTION 4: XP & Level Progress */}
      <XPLevelCard
        level={student.level}
        currentXp={student.xp}
        xpInCurrentLevel={student.xpInCurrentLevel}
        xpForNextLevel={student.xpForNextLevel}
        title={student.title}
      />

      {/* SECTION 7: Quick Statistics */}
      <QuickStatsSection statistics={statistics} />

      {/* SECTION 8: Weekly Analytics */}
      <WeeklyAnalyticsSection weeklyActivity={progress.weeklyActivity} />

      {/* SECTION 5 & 6: Contribution Heatmap & Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContributionHeatmapSection progress={progress} />
        <AchievementsSection achievements={achievements} />
      </div>

      {/* SECTION 9 & 10: Leaderboard Preview & Developer Journey Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaderboardSection leaderboard={leaderboard} student={student} />
        <DeveloperJourneySection />
      </div>

      {/* SECTION 11: Daily Motivation & AI Insights */}
      <DailyMotivationSection />

      {/* SECTION 12: Quick Actions Toolbar */}
      <QuickActionsToolbar />
    </PageWrapper>
  )
}
