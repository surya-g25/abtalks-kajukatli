import { useState } from 'react'
import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'
import Button from '@/components/ui/Button'

export function ChallengeAIAssistant() {
  const [activeOutput, setActiveOutput] = useState('')
  const [outputTitle, setOutputTitle] = useState('')
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateOutput = (type) => {
    setIsGenerating(true)
    setCopied(false)

    setTimeout(() => {
      setIsGenerating(false)
      if (type === 'linkedin') {
        setOutputTitle('Generated LinkedIn Post')
        setActiveOutput(
          `🚀 Day 14 of ABTalks Challenge: Built a Custom React Hook for Async Data Fetching with Auto-Retry!\n\nToday I mastered:\n✔ Managing loading, error, and success state transitions cleanly\n✔ Implementing exponential backoff algorithms for network retry policies\n✔ Preventing component unmount memory leaks using AbortController\n\nBig thanks to #ABTalks for the hands-on engineering challenges! 💻⚡\n#ReactJS #WebDevelopment #Frontend #JavaScript`
        )
      } else if (type === 'summary') {
        setOutputTitle('Today\'s Learning Summary')
        setActiveOutput(
          `• Abstracted complex promise resolution state machines into a reusable useAsync custom hook.\n• Controlled exponential delay math (e.g. 1s -> 2s -> 4s retry intervals).\n• Sealed memory leaks by connecting AbortSignal listeners to component unmount effects.`
        )
      } else if (type === 'resume') {
        setOutputTitle('Resume Accomplishment Bullet')
        setActiveOutput(
          `"Engineered a production-ready custom React hook (useAsync) with automated exponential backoff retries and AbortController request cancellation, reducing unhandled async UI errors by 35%."`
        )
      } else if (type === 'explain') {
        setOutputTitle('Concept Explanation: Exponential Backoff')
        setActiveOutput(
          `Exponential backoff is a retry strategy that waits progressively longer between each attempt (e.g., 100ms, 200ms, 400ms, 800ms) to avoid overwhelming failing APIs during outages.`
        )
      }
    }, 600)
  }

  const copyToClipboard = () => {
    if (!activeOutput) return
    navigator.clipboard.writeText(activeOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <GlassCard className="p-6 border border-purple-500/30 bg-gradient-to-br from-neutral-900 via-neutral-900 to-purple-950/20 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
            <Icon name="Sparkles" size={18} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">AI Learning Co-Pilot</h3>
            <span className="text-[10px] text-purple-300 font-semibold block">Instant Content & Learning Generators</span>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
          AI Helper Ready
        </span>
      </div>

      {/* Action Trigger Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => generateOutput('linkedin')}
          className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-purple-500/40 text-left transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <Icon name="Share2" size={16} className="text-blue-400" />
            <span className="text-xs font-bold text-neutral-200 group-hover:text-white">LinkedIn Post</span>
          </div>
          <Icon name="ChevronRight" size={14} className="text-neutral-600 group-hover:text-purple-400 transition" />
        </button>

        <button
          type="button"
          onClick={() => generateOutput('summary')}
          className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-purple-500/40 text-left transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <Icon name="FileText" size={16} className="text-amber-400" />
            <span className="text-xs font-bold text-neutral-200 group-hover:text-white">Learning Summary</span>
          </div>
          <Icon name="ChevronRight" size={14} className="text-neutral-600 group-hover:text-purple-400 transition" />
        </button>

        <button
          type="button"
          onClick={() => generateOutput('resume')}
          className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-purple-500/40 text-left transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <Icon name="Award" size={16} className="text-emerald-400" />
            <span className="text-xs font-bold text-neutral-200 group-hover:text-white">Resume Bullet</span>
          </div>
          <Icon name="ChevronRight" size={14} className="text-neutral-600 group-hover:text-purple-400 transition" />
        </button>

        <button
          type="button"
          onClick={() => generateOutput('explain')}
          className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800 hover:border-purple-500/40 text-left transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-2">
            <Icon name="HelpCircle" size={16} className="text-purple-400" />
            <span className="text-xs font-bold text-neutral-200 group-hover:text-white">Explain Concept</span>
          </div>
          <Icon name="ChevronRight" size={14} className="text-neutral-600 group-hover:text-purple-400 transition" />
        </button>
      </div>

      {/* Generated Output Display Box */}
      {isGenerating ? (
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center gap-2 text-xs text-purple-300 font-semibold">
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span>AI is drafting your content...</span>
        </div>
      ) : activeOutput ? (
        <div className="p-4 rounded-xl bg-neutral-950 border border-purple-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-purple-300">{outputTitle}</span>
            <Button
              variant="outline"
              size="xs"
              onClick={copyToClipboard}
              className="text-[10px] font-bold"
            >
              <Icon name={copied ? 'Check' : 'Copy'} size={12} />
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </Button>
          </div>
          <pre className="text-xs font-mono text-neutral-300 whitespace-pre-wrap leading-relaxed bg-neutral-900/60 p-3 rounded-lg border border-neutral-800">
            {activeOutput}
          </pre>
        </div>
      ) : null}
    </GlassCard>
  )
}

export default ChallengeAIAssistant
