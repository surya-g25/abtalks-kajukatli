import { useState, useEffect } from 'react'
import PageWrapper from '@/components/layout-primitives/PageWrapper'
import ProfileHeader from '@/components/profile/ProfileHeader'
import DeveloperIdentityCard from '@/components/profile/DeveloperIdentityCard'
import JourneyTimelineSection from '@/components/profile/JourneyTimelineSection'
import AchievementGallery from '@/components/profile/AchievementGallery'
import ProfileContributionHeatmap from '@/components/profile/ProfileContributionHeatmap'
import ProfileAnalyticsSection from '@/components/profile/ProfileAnalyticsSection'
import PublicPortfolioSection from '@/components/profile/PublicPortfolioSection'
import { useAuth } from '@/context/AuthContext'
import * as authService from '@/services/authService'
import { toast } from 'sonner'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()

  const [student, setStudent] = useState({
    name: user?.name || 'Developer',
    avatar: user?.avatar || '',
    level: user?.level || 1,
    xp: user?.xp || 0,
    rank: user?.rank || 1,
    college: 'ABTalks Cohort Academy',
    github: user?.github || 'developer',
    linkedin: user?.linkedin || 'developer',
    portfolio: user?.portfolio || 'developer.dev',
    currentStreak: user?.currentStreak || 0,
    joinedSince: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Member',
    title: user?.title || 'Code Alchemist',
  })

  useEffect(() => {
    if (user) {
      setStudent({
        name: user.name || 'Developer',
        avatar: user.avatar || '',
        level: user.level || 1,
        xp: user.xp || 0,
        rank: user.rank || 1,
        college: 'ABTalks Cohort Academy',
        github: user.github || 'developer',
        linkedin: user.linkedin || 'developer',
        portfolio: user.portfolio || 'developer.dev',
        currentStreak: user.currentStreak || 0,
        joinedSince: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Active Member',
        title: user.title || 'Code Alchemist',
      })
    }
  }, [user])

  const handleUpdateProfile = async (updatedFields) => {
    try {
      const updated = await authService.updateProfile(updatedFields)
      setStudent((prev) => ({ ...prev, ...updated }))
      updateUser(updated)
      toast.success('Profile updated successfully!')
    } catch (err) {
      console.error('Failed to update profile:', err)
      toast.error(err.message || 'Profile update failed')
    }
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
