import { useState } from 'react'
import { motion } from 'framer-motion'
import Icon from '@/components/common/Icon'
import GlassCard from '@/components/cards/GlassCard'

export function ChallengeChecklist({ onProgressUpdate }) {
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Read Instructions & Requirements Spec', completed: true },
    { id: 2, label: 'Setup React Project Boilerplate & Files', completed: true },
    { id: 3, label: 'Write useAsync Hook State Machine Logic', completed: true },
    { id: 4, label: 'Implement Exponential Backoff Retry Policy', completed: true },
    { id: 5, label: 'Run Unit Tests & Verify AbortController', completed: true },
    { id: 6, label: 'Push Commits to Public GitHub Repository', completed: true },
    { id: 7, label: 'Post Learning Reflection on LinkedIn (#ABTalks)', completed: false },
    { id: 8, label: 'Submit Final Code & Claim XP Reward', completed: false },
  ])

  const toggleTask = (id) => {
    setTasks((prev) => {
      const updated = prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      const count = updated.filter((t) => t.completed).length
      const percentage = Math.round((count / updated.length) * 100)
      onProgressUpdate?.(percentage)
      return updated
    })
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const percentage = Math.round((completedCount / tasks.length) * 100)

  return (
    <GlassCard className="p-6 border border-neutral-800/80 shadow-2xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2">
            <Icon name="CheckSquare" size={18} className="text-amber-400" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">Interactive Mission Checklist</h3>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">Click tasks as you complete them to track live progress.</p>
        </div>
        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
          {completedCount} / {tasks.length} ({percentage}%)
        </span>
      </div>

      <div className="space-y-2.5">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            whileHover={{ x: 3 }}
            onClick={() => toggleTask(task.id)}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
              task.completed
                ? 'bg-neutral-900/90 border-emerald-500/30 text-neutral-200'
                : 'bg-neutral-950/50 border-neutral-800 hover:border-neutral-700 text-neutral-400'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition shrink-0 ${
                task.completed
                  ? 'bg-emerald-500 border-emerald-400 text-neutral-950 shadow-md shadow-emerald-500/20'
                  : 'border-neutral-700 bg-neutral-900'
              }`}
            >
              {task.completed && <Icon name="Check" size={14} className="stroke-[3]" />}
            </div>
            <span className={`text-xs font-semibold select-none ${task.completed ? 'line-through text-neutral-400' : 'text-neutral-200'}`}>
              {task.label}
            </span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

export default ChallengeChecklist
