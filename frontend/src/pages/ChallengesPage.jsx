import { useState } from 'react'
import PageWrapper from '@/components/layout-primitives/PageWrapper'
import ChallengeHero from '@/components/challenge/ChallengeHero'
import ChallengeDescription from '@/components/challenge/ChallengeDescription'
import ChallengeProgressTracker from '@/components/challenge/ChallengeProgressTracker'
import ChallengeSubmissionPanel from '@/components/challenge/ChallengeSubmissionPanel'
import ChallengeResources from '@/components/challenge/ChallengeResources'
import ChallengeChecklist from '@/components/challenge/ChallengeChecklist'
import ChallengeAIAssistant from '@/components/challenge/ChallengeAIAssistant'
import ChallengeRewardPreview from '@/components/challenge/ChallengeRewardPreview'
import RelatedChallenges from '@/components/challenge/RelatedChallenges'
import CompletionCelebrationModal from '@/components/challenge/CompletionCelebrationModal'

export default function ChallengesPage() {
  const [challengeProgress, setChallengeProgress] = useState(80)
  const [showCelebration, setShowCelebration] = useState(false)

  const handleSubmissionSuccess = () => {
    setChallengeProgress(100)
    setShowCelebration(true)
  }

  return (
    <PageWrapper
      title="Day 14 Mission — Build a Custom Hook for Async Data Fetching"
      description="Complete today's coding mission, verify unit tests, share your progress on LinkedIn, and submit to earn +150 XP."
      className="space-y-6 pt-2"
    >
      {/* SECTION 1: Challenge Hero */}
      <ChallengeHero progress={challengeProgress} />

      {/* SECTION 3: Workflow Step Progress Tracker */}
      <ChallengeProgressTracker currentStep={challengeProgress === 100 ? 6 : 2} />

      {/* SECTION 2 & 6: Challenge Description Spec & Interactive Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <ChallengeDescription />
        </div>
        <div className="lg:col-span-1">
          <ChallengeChecklist onProgressUpdate={setChallengeProgress} />
        </div>
      </div>

      {/* SECTION 5 & 7: Learning Resources & AI Assistant Helper Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ChallengeResources />
        <ChallengeAIAssistant />
      </div>

      {/* SECTION 4: Submission Form Panel */}
      <ChallengeSubmissionPanel onSubmitSuccess={handleSubmissionSuccess} />

      {/* SECTION 8 & 9: Reward Preview & Related Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ChallengeRewardPreview />
        <RelatedChallenges />
      </div>

      {/* SECTION 10: Completion Celebration Modal */}
      <CompletionCelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
      />
    </PageWrapper>
  )
}
