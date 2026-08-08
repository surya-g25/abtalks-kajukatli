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

export default function DashboardPage() {
  const [userData, setUserData] = useState({
    name: 'Alex Rivera',
    avatar: '',
    level: 12,
    xp: 2450,
  })

  useEffect(() => {
    let isMounted = true
    async function loadData() {
      try {
        const data = await fetchDashboardData()
        if (data && data.student && isMounted) {
          setUserData(data.student)
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

  return (
    <PageWrapper
      title="Student Dashboard"
      description="Track today's missions, daily learning streaks, XP growth, achievements, and leaderboard rank."
      className="space-y-6 pt-2"
    >
      {/* SECTION 1: Dashboard Header */}
      <DashboardHeader user={userData} />

      {/* SECTION 2 & 3: Today's Mission (Hero) & Streak System */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2">
          <TodayMissionCard />
        </div>
        <div className="lg:col-span-1">
          <StreakCard
            currentStreak={userData.currentStreak || 14}
            longestStreak={userData.longestStreak || 21}
          />
        </div>
      </div>

      {/* SECTION 4: XP & Level Progress */}
      <XPLevelCard
        level={userData.level || 12}
        currentXp={userData.xp || 2450}
        title={userData.title || 'Code Alchemist'}
      />

      {/* SECTION 7: Quick Statistics */}
      <QuickStatsSection />

      {/* SECTION 8: Weekly Analytics */}
      <WeeklyAnalyticsSection />

      {/* SECTION 5 & 6: Contribution Heatmap & Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContributionHeatmapSection />
        <AchievementsSection />
      </div>

      {/* SECTION 9 & 10: Leaderboard Preview & Developer Journey Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeaderboardSection />
        <DeveloperJourneySection />
      </div>

      {/* SECTION 11: Daily Motivation & AI Insights */}
      <DailyMotivationSection />

      {/* SECTION 12: Quick Actions Toolbar */}
      <QuickActionsToolbar />
    </PageWrapper>
  )
}
