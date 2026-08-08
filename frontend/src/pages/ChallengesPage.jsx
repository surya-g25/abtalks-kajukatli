import { useState, useEffect } from 'react'
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
import { fetchChallengeByDay } from '@/services/challengeService'
import { ChallengeSkeleton } from '@/components/ui/Skeletons'

export default function ChallengesPage() {
  const [challenge, setChallenge] = useState(null)
  const [challengeProgress, setChallengeProgress] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    async function loadChallenge() {
      try {
        const data = await fetchChallengeByDay(14) // Day 14
        if (data && isMounted) {
          setChallenge(data)
          setChallengeProgress(data.progress || 0)
        }
      } catch (err) {
        console.error('Failed to load active challenge', err)
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    loadChallenge()
    return () => {
      isMounted = false
    }
  }, [])

  const handleSubmissionSuccess = () => {
    setChallengeProgress(100)
    setShowCelebration(true)
  }

  if (isLoading) {
    return (
      <PageWrapper
        title="Loading Challenge..."
        description="Please wait while we prepare your coding mission workspace."
        className="space-y-6 pt-2"
      >
        <ChallengeSkeleton />
      </PageWrapper>
    )
  }

  const titleText = challenge ? `Day ${challenge.dayNumber} Mission — ${challenge.title}` : 'Day 14 Mission — Build a Custom Hook'

  return (
    <PageWrapper
      title={titleText}
      description="Complete today's coding mission, verify unit tests, share your progress on LinkedIn, and submit to earn XP."
      className="space-y-6 pt-2"
    >
      {/* SECTION 1: Challenge Hero */}
      <ChallengeHero challenge={challenge} progress={challengeProgress} />

      {/* SECTION 3: Workflow Step Progress Tracker */}
      <ChallengeProgressTracker currentStep={challengeProgress === 100 ? 6 : Math.max(1, Math.round((challengeProgress / 100) * 6))} />

      {/* SECTION 2 & 6: Challenge Description Spec & Interactive Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <ChallengeDescription challenge={challenge} />
        </div>
        <div className="lg:col-span-1">
          <ChallengeChecklist challenge={challenge} onProgressUpdate={setChallengeProgress} />
        </div>
      </div>

      {/* SECTION 5 & 7: Learning Resources & AI Assistant Helper Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ChallengeResources challenge={challenge} />
        <ChallengeAIAssistant />
      </div>

      {/* SECTION 4: Submission Form Panel */}
      <ChallengeSubmissionPanel challenge={challenge} onSubmitSuccess={handleSubmissionSuccess} />

      {/* SECTION 8 & 9: Reward Preview & Related Challenges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <ChallengeRewardPreview challenge={challenge} />
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
