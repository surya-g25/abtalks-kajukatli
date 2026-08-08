import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'

export function ChallengeDescription({ challenge }) {
  const skills = challenge?.skillsCovered || [
    'React 19',
    'Custom Hooks',
    'Async / Await',
    'Error Handling',
    'TypeScript',
    'State Machines',
  ]

  const learningGoals = challenge?.learningGoals || [
    'Design a reusable `useAsync` hook supporting `data`, `error`, `isLoading`, `isError`, and `isSuccess` states.',
    'Implement exponential backoff retry algorithms with configurable max retry attempts.',
    'Handle race conditions and memory leaks by implementing `AbortController` cleanup functions.',
    'Publish a clean GitHub repository with typed interfaces and unit test coverage.',
  ]

  const description = challenge?.description ||
    'Production applications must gracefully handle network latency, transient API failures, and rate limits. Your objective today is to construct an enterprise-grade React custom hook useAsync that executes asynchronous promises, handles error states gracefully, and automatically retries failed requests with customizable exponential backoff delays.'

  const problemStatement = challenge?.problemStatement ||
    'Standard useEffect data fetching often leads to unhandled rejection states, memory leaks on unmounted components, and lack of automatic retry support when third-party APIs experience intermittent dropped packets.'

  const expectedOutcome = challenge?.expectedOutcome ||
    'A fully tested useAsync(asyncFn, options) hook that returns { data, error, isLoading, retry, cancel } with automatic retry logic and unit test coverage.'

  const proTips = challenge?.proTips ||
    'Always pass an AbortController.signal to fetch calls inside the hook cleanup return function to prevent updating state on unmounted React components.'

  return (
    <GlassCard className="p-6 sm:p-7 border border-neutral-800/80 shadow-2xl space-y-6">
      {/* Objective */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Icon name="Target" size={20} className="text-amber-400" />
          <h2 className="text-xl font-black text-white tracking-tight">Challenge Objective</h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Problem Statement & Expected Outcome */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider">
            <Icon name="AlertTriangle" size={16} />
            <span>The Problem</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {problemStatement}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Icon name="CheckCircle2" size={16} />
            <span>Expected Outcome</span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            {expectedOutcome}
          </p>
        </div>
      </div>

      {/* Learning Goals */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Icon name="BookOpen" size={18} className="text-amber-400" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Learning Goals</h3>
        </div>
        <ul className="space-y-2">
          {learningGoals.map((goal, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
              <span className="w-4 h-4 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{goal}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Skills Covered Pills */}
      <div className="space-y-2 pt-2 border-t border-neutral-800/80">
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 block">
          Skills Covered
        </span>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-amber-400 hover:border-amber-500/30 transition"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Pro Tip */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
        <Icon name="Lightbulb" size={20} className="text-amber-400" />
        <div className="text-xs">
          <span className="font-extrabold text-amber-300 block mb-1">Pro Tip: Clean Up Subscriptions</span>
          <span className="text-neutral-300 leading-relaxed">
            {proTips}
          </span>
        </div>
      </div>
    </GlassCard>
  )
}

export default ChallengeDescription
