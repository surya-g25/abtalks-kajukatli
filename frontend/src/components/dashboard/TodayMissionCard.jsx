import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Icon from '@/components/common/Icon'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import GlassCard from '@/components/cards/GlassCard'
import { updateChallengeProgress } from '@/services/challengeService'

export function TodayMissionCard({ challenge }) {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (challenge && challenge.tasks) {
      setTasks(challenge.tasks.map((t) => ({ id: t.id, text: t.text, completed: t.completed })))
    } else {
      setTasks([
        { id: 1, text: 'Read Problem Statement & Requirements', completed: true },
        { id: 2, text: 'Write Custom useAsync Hook Logic', completed: true },
        { id: 3, text: 'Test Exponential Backoff & Auto-retry', completed: true },
        { id: 4, text: 'Push Commits to GitHub Repository', completed: true },
        { id: 5, text: 'Post Reflection on LinkedIn (#ABTalks)', completed: false },
      ])
    }
  }, [challenge])

  const toggleTask = async (id) => {
    const updated = tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    setTasks(updated)

    if (challenge) {
      try {
        await updateChallengeProgress(challenge.dayNumber || 14, updated)
      } catch (err) {
        console.error('Failed to sync checklist changes with server:', err)
      }
    }
  }

  const completedCount = tasks.filter((t) => t.completed).length
  const totalTasks = tasks.length || 1
  const progressPercentage = Math.round((completedCount / totalTasks) * 100)

  const title = challenge?.title || 'Build a Custom Hook for Async Data Fetching with Auto-retry'
  const category = challenge?.category || 'React & Async Logic'
  const xpReward = challenge?.xpReward || 150
  const timeEstimate = challenge?.timeEstimate || '45 mins'
  const difficulty = challenge?.difficulty || 'Intermediate'

  return (
    <GlassCard className="relative overflow-hidden border-2 border-amber-500/30 bg-gradient-to-br from-neutral-900/90 via-neutral-900/60 to-amber-950/20 shadow-2xl p-6 sm:p-7">
      {/* Decorative top accent glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-800/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20">
              Today's Mission
            </span>
            <Badge variant="info" className="text-[10px] font-bold">
              {category}
            </Badge>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            {title}
          </h2>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">Reward</span>
            <span className="text-sm font-mono font-extrabold text-amber-400">+{xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Mission Meta Info */}
      <div className="py-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-400">
        <div className="flex items-center gap-1.5 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800">
          <Icon name="Clock" size={15} className="text-amber-400" />
          <span>Est. {timeEstimate}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800">
          <Icon name="Shield" size={15} className="text-indigo-400" />
          <span>{difficulty}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-neutral-950/60 px-3 py-1.5 rounded-xl border border-neutral-800">
          <Icon name="CheckCircle2" size={15} className="text-emerald-400" />
          <span>{completedCount} of {totalTasks} Completed</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-xs font-bold text-neutral-300 mb-2">
          <span>Mission Progress</span>
          <span className="text-amber-400 font-mono">{progressPercentage}%</span>
        </div>
        <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800 p-0.5">
          <motion.div
            className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Mission Checklist */}
      <div className="space-y-2.5 mb-6">
        <span className="text-xs font-extrabold uppercase tracking-wider text-neutral-400 block mb-2">
          Mission Checklist
        </span>
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
              className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                task.completed
                  ? 'bg-emerald-500 border-emerald-400 text-neutral-950 shadow-md shadow-emerald-500/20'
                  : 'border-neutral-700 bg-neutral-900'
              }`}
            >
              {task.completed && <Icon name="Check" size={14} className="stroke-[3]" />}
            </div>
            <span className={`text-xs font-semibold select-none ${task.completed ? 'line-through text-neutral-400' : 'text-neutral-200'}`}>
              {task.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Action CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <p className="text-xs text-neutral-400 italic text-center sm:text-left">
          {progressPercentage === 100
            ? '🎉 All tasks completed! Great work today.'
            : 'Complete the remaining task to lock in your daily streak!'}
        </p>
        <Link to="/challenges" className="w-full sm:w-auto">
          <Button variant="primary" size="md" className="w-full sm:w-auto justify-center font-extrabold group">
            <span>Continue Challenge</span>
            <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </GlassCard>
  )
}

export default TodayMissionCard
