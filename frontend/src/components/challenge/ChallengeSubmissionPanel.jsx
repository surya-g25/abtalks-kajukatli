import { useState } from 'react'
import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import Input from '@/components/ui/Input'

export function ChallengeSubmissionPanel({ onSubmitSuccess }) {
  const [githubRepo, setGithubRepo] = useState('alexrivera/react-async-retry-hook')
  const [commitHash, setCommitHash] = useState('https://github.com/alexrivera/react-async-retry-hook/commit/a8f9c12')
  const [linkedinUrl, setLinkedinUrl] = useState('alexrivera/posts/react-async-hook-day14')
  const [reflection, setReflection] = useState(
    'Building the exponential backoff logic reinforced how important state machine predictability is when managing asynchronous lifecycle states in React hooks.'
  )

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const minReflectionLength = 20

  const handleValidation = () => {
    const errs = {}
    if (!githubRepo.trim()) {
      errs.githubRepo = 'GitHub repository username/repo is required.'
    }
    if (!commitHash.trim()) {
      errs.commitHash = 'Commit URL or hash is required.'
    }
    if (!linkedinUrl.trim()) {
      errs.linkedinUrl = 'LinkedIn post username/URL is required.'
    }
    if (!reflection.trim() || reflection.length < minReflectionLength) {
      errs.reflection = `Reflection must be at least ${minReflectionLength} characters.`
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!handleValidation()) return

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      onSubmitSuccess?.()
    }, 1200)
  }

  return (
    <GlassCard className="p-6 sm:p-8 border-2 border-amber-500/30 bg-gradient-to-br from-neutral-900 via-neutral-900 to-amber-950/20 shadow-2xl space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="Send" size={20} className="text-amber-400" />
            <h2 className="text-xl font-black text-white tracking-tight">Challenge Submission Panel</h2>
          </div>
          <p className="text-xs text-neutral-400 mt-1">
            Submit your repository, proof of LinkedIn share, and reflection to lock in your XP.
          </p>
        </div>
        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          +150 XP Waiting
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* GitHub Repo */}
        <div>
          <label className="text-xs font-bold text-neutral-300 uppercase tracking-wide block mb-1.5">
            GitHub Repository (username/repo)
          </label>
          <div className="relative">
            <div className="absolute left-3 top-2.5 text-neutral-400">
              <Icon name="Github" size={16} />
            </div>
            <input
              type="text"
              value={githubRepo}
              onChange={(e) => setGithubRepo(e.target.value)}
              placeholder="username/repository-name"
              className={`w-full bg-neutral-950 border text-white rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono focus:outline-none transition-all ${
                errors.githubRepo ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-500'
              }`}
            />
          </div>
          {errors.githubRepo && <p className="text-[10px] text-red-400 font-semibold mt-1">{errors.githubRepo}</p>}
        </div>

        {/* Commit Hash / URL */}
        <div>
          <Input
            label="Verified Commit URL / Hash"
            value={commitHash}
            onChange={(e) => setCommitHash(e.target.value)}
            placeholder="https://github.com/username/repo/commit/..."
            error={errors.commitHash}
          />
        </div>

        {/* LinkedIn Post URL */}
        <div>
          <label className="text-xs font-bold text-neutral-300 uppercase tracking-wide block mb-1.5">
            LinkedIn Post Handle / URL
          </label>
          <div className="relative">
            <div className="absolute left-3 top-2.5 text-neutral-400">
              <Icon name="Linkedin" size={16} />
            </div>
            <input
              type="text"
              value={linkedinUrl}
              onChange={(e) => setLinkedinUrl(e.target.value)}
              placeholder="username/posts/post-id"
              className={`w-full bg-neutral-950 border text-white rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono focus:outline-none transition-all ${
                errors.linkedinUrl ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-amber-500'
              }`}
            />
          </div>
          {errors.linkedinUrl && <p className="text-[10px] text-red-400 font-semibold mt-1">{errors.linkedinUrl}</p>}
        </div>

        {/* Reflection & Notes */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-bold text-neutral-300 uppercase tracking-wide">
              Personal Reflection & Key Takeaways
            </label>
            <span className={`text-[10px] font-mono font-bold ${reflection.length >= minReflectionLength ? 'text-emerald-400' : 'text-neutral-500'}`}>
              {reflection.length} / {minReflectionLength} min chars
            </span>
          </div>
          <Textarea
            rows={4}
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="What key insights did you gain while solving today's challenge? What was the hardest part?"
            error={errors.reflection}
          />
        </div>

        {/* Submit Action CTA */}
        <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-neutral-800/80">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Icon name="CheckCircle2" size={16} className="text-emerald-400" />
            <span>Submission triggers automated test verification & XP release.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="w-full sm:w-auto font-black justify-center shadow-xl shadow-amber-500/20 group"
          >
            <span>Submit Challenge & Claim +150 XP</span>
            <Icon name="ArrowRight" size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </form>
    </GlassCard>
  )
}

export default ChallengeSubmissionPanel
