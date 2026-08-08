import { useState } from 'react'
import PageWrapper from '@/components/layout-primitives/PageWrapper'
import ProfileHeader from '@/components/profile/ProfileHeader'
import DeveloperIdentityCard from '@/components/profile/DeveloperIdentityCard'
import JourneyTimelineSection from '@/components/profile/JourneyTimelineSection'
import AchievementGallery from '@/components/profile/AchievementGallery'
import ProfileContributionHeatmap from '@/components/profile/ProfileContributionHeatmap'
import ProfileAnalyticsSection from '@/components/profile/ProfileAnalyticsSection'
import PublicPortfolioSection from '@/components/profile/PublicPortfolioSection'

export default function ProfilePage() {
  const [student, setStudent] = useState({
    name: 'Alex Rivera',
    avatar: '',
    level: 12,
    xp: 2450,
    rank: 4,
    college: 'Stanford University • ABTalks Academy',
    github: 'alexrivera',
    linkedin: 'alexrivera',
    portfolio: 'alexrivera.dev',
    currentStreak: 14,
    joinedSince: 'Oct 2026',
    title: 'Code Alchemist',
  })

  const handleUpdateProfile = (updatedFields) => {
    setStudent((prev) => ({ ...prev, ...updatedFields }))
  }

  return (
    <PageWrapper
      title="Developer Profile & Public Identity"
      description="Unified developer profile combining GitHub contributions, LeetCode rank standings, Steam badges, and verified projects."
      className="space-y-6 pt-2"
    >
      {/* STEP 1: Profile Header */}
      <ProfileHeader student={student} onUpdateProfile={handleUpdateProfile} />

      {/* STEP 2 & STEP 8: Developer Identity Card & Public Portfolio */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <DeveloperIdentityCard
            level={student.level}
            currentXp={student.xp}
            overallRank={student.rank}
          />
        </div>
        <div className="lg:col-span-2">
          <PublicPortfolioSection />
        </div>
      </div>

      {/* STEP 6 & STEP 7: Statistics Grid & Learning Analytics Charts */}
      <ProfileAnalyticsSection />

      {/* STEP 5 & STEP 4: Contribution Heatmap & Achievement Gallery */}
      <ProfileContributionHeatmap />
      <AchievementGallery />

      {/* STEP 3: Journey Timeline */}
      <JourneyTimelineSection />
    </PageWrapper>
  )
}
