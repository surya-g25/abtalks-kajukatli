import ProgressStepper from '@/components/progress/ProgressStepper'
import GlassCard from '@/components/cards/GlassCard'
import Icon from '@/components/common/Icon'

export function ChallengeProgressTracker({ currentStep = 2 }) {
  const steps = [
    { title: 'Read Challenge', description: 'Review problem statement & constraints' },
    { title: 'Build Project', description: 'Write custom hook & state machine' },
    { title: 'Test', description: 'Verify retry policy & cancellation' },
    { title: 'Push GitHub', description: 'Commit code to public repository' },
    { title: 'LinkedIn Post', description: 'Share learnings with community' },
    { title: 'Reflection', description: 'Write personal code reflection' },
    { title: 'Submit', description: 'Claim +150 XP & unlock badge' },
  ]

  return (
    <GlassCard className="p-5 sm:p-6 border border-neutral-800/80 shadow-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="GitPullRequest" size={18} className="text-amber-400" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Workflow Step Progress</h3>
        </div>
        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full">
          Step {currentStep + 1} of {steps.length}
        </span>
      </div>

      <div className="pt-2 overflow-x-auto pb-2 scrollbar-none">
        <ProgressStepper steps={steps} currentStep={currentStep} />
      </div>
    </GlassCard>
  )
}

export default ChallengeProgressTracker
