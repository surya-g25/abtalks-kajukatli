import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import Icon from '@/components/common/Icon'
import Button from '@/components/ui/Button'
import Textarea from '@/components/ui/Textarea'
import { generateAIContent } from '@/services/aiService'

export function AIAssistantDrawer({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('workspace') // 'workspace' | 'study' | 'career'
  const [activeTool, setActiveTool] = useState('reflection') // reflection, summary, resume, linkedin, helper, suggestions, weekly, coach
  const [draftText, setDraftText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [linkedinLength, setLinkedinLength] = useState('medium')

  const categories = [
    { id: 'workspace', label: 'Day Workspace', icon: 'FolderOpen' },
    { id: 'study', label: 'Study Aid', icon: 'BookOpen' },
    { id: 'career', label: 'Career & Reports', icon: 'Briefcase' },
  ]

  const tools = {
    workspace: [
      { id: 'reflection', label: 'Daily Reflection', icon: 'Sparkles', type: 'reflection' },
      { id: 'summary', label: 'Learning Summary', icon: 'FileText', type: 'summary' },
      { id: 'resume', label: 'Resume Accomplishment', icon: 'Award', type: 'resume' },
      { id: 'linkedin', label: 'LinkedIn Post', icon: 'Share2', type: 'linkedin' },
    ],
    study: [
      { id: 'helper', label: 'Challenge Helper', icon: 'HelpCircle', type: 'helper' },
      { id: 'suggestions', label: 'Improvement Advice', icon: 'TrendingUp', type: 'suggestions' },
    ],
    career: [
      { id: 'weekly', label: 'Weekly Report', icon: 'Calendar', type: 'weekly-report' },
      { id: 'coach', label: 'Career Coach', icon: 'UserCheck', type: 'career-coach' },
    ],
  }

  // Load content when tool changes
  useEffect(() => {
    if (!isOpen) return
    setDraftText('')
    setCopied(false)
  }, [activeTool, isOpen])

  const handleGenerate = async (force = false) => {
    setIsGenerating(true)
    setCopied(false)
    try {
      const type = tools[activeCategory].find((t) => t.id === activeTool)?.type
      const options = {
        dayNumber: 14,
        length: activeTool === 'linkedin' ? linkedinLength : undefined,
      }
      const text = await generateAIContent(type, options, force)
      setDraftText(text || '')
      toast.success('Draft generated successfully!')
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Generation failed.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    if (!draftText) return
    navigator.clipboard.writeText(draftText)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = () => {
    toast.success('Changes saved successfully!')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-neutral-950/60 backdrop-blur-xs"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[480px] bg-neutral-950/90 backdrop-blur-xl border-l border-neutral-800 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/40">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Icon name="Sparkles" size={18} className="animate-pulse" />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase text-white tracking-wider">
                    ABTalks AI Co-Pilot
                  </h2>
                  <span className="text-[10px] text-purple-300 font-semibold block">
                    Real-time Context-Aware Helper
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border border-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-950 transition"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Category Select tabs */}
            <div className="p-3 bg-neutral-950/50 border-b border-neutral-900 grid grid-cols-3 gap-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setActiveTool(tools[cat.id][0].id)
                    }}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1 rounded-xl text-[10px] sm:text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                        : 'text-neutral-500 hover:text-neutral-300 border border-transparent'
                    }`}
                  >
                    <Icon name={cat.icon} size={13} />
                    <span>{cat.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Content Body: Sidebar Tools & Output */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {/* Tool Selection Buttons */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-400 block mb-1">
                  Select Productivity Tool
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {tools[activeCategory].map((tool) => {
                    const isActive = activeTool === tool.id
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs font-semibold transition ${
                          isActive
                            ? 'bg-neutral-900 border-purple-500/40 text-purple-300'
                            : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700 text-neutral-400'
                        }`}
                      >
                        <Icon name={tool.icon} size={14} className={isActive ? 'text-purple-400' : 'text-neutral-500'} />
                        <span className="truncate">{tool.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* LinkedIn Options */}
              {activeTool === 'linkedin' && (
                <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-900 space-y-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-neutral-400 block">
                    Post Target Length
                  </span>
                  <div className="flex gap-2">
                    {['short', 'medium', 'long'].map((len) => (
                      <button
                        key={len}
                        onClick={() => setLinkedinLength(len)}
                        className={`flex-1 py-1 rounded-lg text-[10px] font-extrabold uppercase border transition ${
                          linkedinLength === len
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                            : 'bg-neutral-900 border-transparent text-neutral-400 hover:bg-neutral-800'
                        }`}
                      >
                        {len}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trigger Button if empty */}
              {!draftText && !isGenerating && (
                <div className="flex flex-col items-center justify-center p-8 border border-dashed border-neutral-800 rounded-2xl text-center space-y-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center">
                    <Icon name="Cpu" size={18} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white">Draft Content for Day 14</h3>
                    <p className="text-[10px] text-neutral-400 max-w-[280px] leading-normal">
                      The AI will analyze your completed checklists, XP metrics, and Day 14 problem specs.
                    </p>
                  </div>
                  <Button
                    onClick={() => handleGenerate(false)}
                    variant="outline"
                    size="sm"
                    className="font-bold gap-1.5"
                  >
                    <Icon name="Sparkles" size={13} className="text-purple-400" />
                    <span>Generate Workspace Draft</span>
                  </Button>
                </div>
              )}

              {/* Loading State */}
              {isGenerating && (
                <div className="p-8 border border-neutral-800 rounded-2xl flex flex-col items-center justify-center space-y-3 bg-neutral-950/40">
                  <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
                  <span className="text-xs font-bold text-neutral-400">ABTalks AI is compiling insights...</span>
                </div>
              )}

              {/* Generated Text Area Editor */}
              {draftText && !isGenerating && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5"
                >
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-300">
                      Edit Draft Output
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleGenerate(true)}
                        className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 rounded-lg transition"
                        title="Regenerate"
                      >
                        <Icon name="RefreshCw" size={12} />
                      </button>
                      <button
                        onClick={handleCopy}
                        className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 rounded-lg transition flex items-center gap-1 text-[10px] px-2 font-bold"
                      >
                        <Icon name={copied ? 'Check' : 'Copy'} size={12} className={copied ? 'text-emerald-400' : ''} />
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <Textarea
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    rows={12}
                    className="w-full text-xs font-mono bg-neutral-950 border-purple-500/20 text-neutral-200 leading-relaxed shadow-inner"
                  />

                  <div className="flex justify-between items-center pt-2">
                    <p className="text-[10px] text-neutral-500 italic">
                      ✔ You can edit or tweak the draft before saving/sharing.
                    </p>
                    {['reflection', 'summary'].includes(activeTool) && (
                      <Button
                        onClick={handleSave}
                        variant="primary"
                        size="xs"
                        className="font-bold"
                      >
                        <span>Save to Log</span>
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-900/20 text-[10px] text-neutral-400 text-center font-semibold">
              🎯 Copilot mode actively reads Day 14 hook metrics to compile contextual tips.
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
