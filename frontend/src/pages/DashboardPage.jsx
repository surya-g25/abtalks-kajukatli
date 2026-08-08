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

import { useAuth } from '@/context/AuthContext'

export default function DashboardPage() {
  const { user: authUser } = useAuth()
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

  // Dynamic user data from DB or auth context
  const student = dashboardData?.student || {
    name: authUser?.name || 'Developer',
    avatar: authUser?.avatar || '',
    level: authUser?.level || 1,
    xp: authUser?.xp || 0,
    title: authUser?.title || 'Code Alchemist',
    currentStreak: authUser?.currentStreak || 0,
    longestStreak: authUser?.longestStreak || 0,
    streakFreeze: authUser?.streakFreeze || { active: 0, available: 0 },
    xpInCurrentLevel: (authUser?.xp || 0) % 1000,
    xpForNextLevel: 1000,
  }

  const todayMission = dashboardData?.todayMission || null
  const leaderboard = dashboardData?.leaderboard || []
  const achievements = dashboardData?.achievements || []
  const statistics = dashboardData?.statistics || {
    completedChallenges: 0,
    githubCommits: 0,
    linkedinPosts: 0,
    hoursStudied: 0,
    xpEarned: student.xp || 0,
    averageCompletionRate: 0,
  }
  const progress = dashboardData?.progress || {
    activeDays: student.currentStreak || 0,
    missedDays: 0,
    currentStreak: student.currentStreak || 0,
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
